/**
 * Perchboard sales backend (runs inside the main Cloudflare Worker).
 *
 * Flow:
 *   1. Buyer pays in the Paddle overlay on /perch/.
 *   2. Paddle calls POST /api/paddle/webhook (transaction.completed). We verify the
 *      signature, create a license key, store it in KV and email it with a download link.
 *   3. The buyer lands on /welcome/?_ptxn=txn_… which polls GET /api/perch/order and shows
 *      the same key + download button right away (it also fulfils the order itself if the
 *      webhook is slow, by asking Paddle's API whether the transaction is paid).
 *   4. The installer is served from R2 by GET /api/perch/download?t=<signed token>.
 *   5. The app activates with POST /api/perch/activate, which returns an Ed25519-signed
 *      license the app can verify offline from then on.
 *   6. Refunds (adjustment approved) revoke the key.
 *   7. One key = one computer. The first activation binds the key to the app's device id;
 *      the same device can reinstall and re-activate freely, another device is refused.
 *      Moving to a new computer: POST /api/perch/move emails the buyer a one-hour link that
 *      frees the key (at most once a week, so a shared key can't hop between machines).
 *   8. GET/POST /api/perch/admin (Bearer PERCH_ADMIN_TOKEN) looks up who bought and which
 *      computer a key is on, and can free a key for a support case.
 *
 * Every binding and secret is optional at boot; routes answer 503 with a clear message
 * until the piece they need is configured (see docs/PERCHBOARD_SALES_SETUP.md).
 */

interface KV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, opts?: { expirationTtl?: number }): Promise<void>;
}

interface R2Object {
  body: ReadableStream;
  size: number;
  httpEtag: string;
}

interface R2Bucket {
  get(key: string): Promise<R2Object | null>;
}

export interface PerchEnv {
  PERCH_KV?: KV;
  PERCH_DOWNLOADS?: R2Bucket;
  PADDLE_ENV?: string; // "sandbox" | "production"
  PADDLE_WEBHOOK_SECRET?: string;
  PADDLE_API_KEY?: string;
  PERCH_PRICE_IDS?: string; // optional comma list; only these prices get a license
  RESEND_API_KEY?: string;
  MAIL_FROM?: string; // e.g. "Perchboard <licenses@nadhebe.com>"
  SUPPORT_EMAIL?: string;
  LICENSE_PRIVATE_KEY?: string; // Ed25519 PKCS#8, base64
  DOWNLOAD_SIGNING_SECRET?: string;
  PERCH_INSTALLER_KEY?: string; // R2 object key, default Perchboard-Setup.exe
  PERCH_DOWNLOAD_URL?: string; // fallback when the installer is hosted elsewhere
  SITE_URL?: string;
  PERCH_ADMIN_TOKEN?: string; // secret for /api/perch/admin
}

interface License {
  key: string;
  txn: string;
  email: string;
  customerId: string;
  priceIds: string[];
  createdAt: string;
  revoked: boolean;
  revokedAt?: string;
  device?: string; // device id of the one computer this key is active on
  deviceName?: string;
  activatedAt?: string;
  movedAt?: string; // last time the key was freed for a new computer
  moves?: number;
}

const SITE = 'https://nadhebe.com';
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });

const enc = new TextEncoder();

function b64url(bytes: ArrayBuffer | Uint8Array): string {
  const arr = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  for (const b of arr) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function fromB64url(s: string): Uint8Array {
  const pad = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(pad);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

function fromB64(s: string): Uint8Array {
  return Uint8Array.from(atob(s.trim()), (c) => c.charCodeAt(0));
}

const toHex = (buf: ArrayBuffer) => [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmacHex(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return toHex(await crypto.subtle.sign('HMAC', key, enc.encode(message)));
}

// ── license keys ──────────────────────────────────────────────────────────

// Crockford base32 without I, L, O, U: easy to read aloud and type.
const KEY_ALPHABET = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';

export function generateLicenseKey(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  const chars = [...bytes].map((b) => KEY_ALPHABET[b & 31]);
  const groups = [0, 5, 10, 15].map((i) => chars.slice(i, i + 5).join(''));
  return `PERCH-${groups.join('-')}`;
}

const normalizeKey = (k: string) => k.trim().toUpperCase().replace(/\s+/g, '');

async function signLicense(env: PerchEnv, lic: License, device?: string): Promise<string | null> {
  if (!env.LICENSE_PRIVATE_KEY) return null;
  const key = await crypto.subtle.importKey('pkcs8', fromB64(env.LICENSE_PRIVATE_KEY), { name: 'Ed25519' }, false, ['sign']);
  const payload = {
    v: 1,
    product: 'perchboard',
    key: lic.key,
    email: lic.email,
    txn: lic.txn,
    issued: new Date().toISOString(),
    device: device ? device.slice(0, 80) : undefined,
  };
  const body = b64url(enc.encode(JSON.stringify(payload)));
  const sig = await crypto.subtle.sign({ name: 'Ed25519' }, key, enc.encode(body));
  return `${body}.${b64url(sig)}`;
}

// ── download links ────────────────────────────────────────────────────────

const downloadSecret = (env: PerchEnv) => env.DOWNLOAD_SIGNING_SECRET || env.PADDLE_WEBHOOK_SECRET || '';

async function downloadUrl(env: PerchEnv, txn: string): Promise<string> {
  const exp = Date.now() + 365 * 24 * 3600 * 1000;
  const body = b64url(enc.encode(JSON.stringify({ txn, exp })));
  const sig = await hmacHex(downloadSecret(env), body);
  return `${env.SITE_URL || SITE}/api/perch/download?t=${body}.${sig}`;
}

async function readDownloadToken(env: PerchEnv, token: string): Promise<string | null> {
  const [body, sig] = token.split('.');
  if (!body || !sig || !downloadSecret(env)) return null;
  if (!safeEqual(await hmacHex(downloadSecret(env), body), sig)) return null;
  try {
    const { txn, exp } = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    return typeof txn === 'string' && exp > Date.now() ? txn : null;
  } catch {
    return null;
  }
}

// ── Paddle ────────────────────────────────────────────────────────────────

// PADDLE_ENV has no default: an unset or misspelled value must never send calls to the wrong account.
function paddleApi(env: PerchEnv): string {
  if (env.PADDLE_ENV === 'production') return 'https://api.paddle.com';
  if (env.PADDLE_ENV === 'sandbox') return 'https://sandbox-api.paddle.com';
  throw new Error(`PADDLE_ENV must be "sandbox" or "production" (got "${env.PADDLE_ENV ?? ''}")`);
}

async function paddleGet(env: PerchEnv, path: string): Promise<any | null> {
  if (!env.PADDLE_API_KEY) return null;
  const res = await fetch(`${paddleApi(env)}${path}`, {
    headers: { Authorization: `Bearer ${env.PADDLE_API_KEY}` },
  });
  if (!res.ok) {
    console.error('[perch] Paddle API', path, res.status, await res.text());
    return null;
  }
  return ((await res.json()) as any).data;
}

/** Paddle-Signature: "ts=1671552777;h1=<hex>[;h1=<hex>]", HMAC-SHA256 over "<ts>:<raw body>". */
export async function verifyPaddleSignature(secret: string, header: string | null, raw: string): Promise<boolean> {
  if (!secret || !header) return false;
  const parts = header.split(';').map((p) => p.split('='));
  const ts = parts.find(([k]) => k === 'ts')?.[1];
  const sigs = parts.filter(([k]) => k === 'h1').map(([, v]) => v);
  if (!ts || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(ts)) > 300) return false;
  const expected = await hmacHex(secret, `${ts}:${raw}`);
  return sigs.some((s) => safeEqual(s, expected));
}

function wantedPrices(env: PerchEnv): string[] {
  return (env.PERCH_PRICE_IDS || '').split(',').map((s) => s.trim()).filter(Boolean);
}

/** Create (once) the license for a paid transaction and email it. Safe to call repeatedly. */
async function fulfil(env: PerchEnv, txn: any): Promise<License | null> {
  const kv = env.PERCH_KV!;
  const existing = await kv.get(`lic:${txn.id}`);
  if (existing) return JSON.parse(existing);

  const priceIds: string[] = (txn.items || []).map((i: any) => i.price?.id || i.price_id).filter(Boolean);
  const wanted = wantedPrices(env);
  if (wanted.length && !priceIds.some((p) => wanted.includes(p))) {
    console.log('[perch] transaction is not for Perchboard, skipping', txn.id, priceIds);
    return null;
  }

  let email: string = txn.customer?.email || '';
  if (!email && txn.customer_id) {
    const customer = await paddleGet(env, `/customers/${txn.customer_id}`);
    email = customer?.email || '';
  }

  const lic: License = {
    key: generateLicenseKey(),
    txn: txn.id,
    email: email.toLowerCase(),
    customerId: txn.customer_id || '',
    priceIds,
    createdAt: new Date().toISOString(),
    revoked: false,
  };
  await kv.put(`lic:${lic.txn}`, JSON.stringify(lic));
  await kv.put(`key:${lic.key}`, lic.txn);
  if (lic.email) {
    const list: string[] = JSON.parse((await kv.get(`cust:${lic.email}`)) || '[]');
    if (!list.includes(lic.txn)) list.push(lic.txn);
    await kv.put(`cust:${lic.email}`, JSON.stringify(list));
    await sendLicenseEmail(env, lic);
  } else {
    console.error('[perch] no email for transaction; license stored but not emailed', lic.txn);
  }
  console.log('[perch] license issued', lic.txn, lic.key.slice(0, 11) + '…');
  return lic;
}

async function revoke(env: PerchEnv, txnId: string) {
  const raw = await env.PERCH_KV!.get(`lic:${txnId}`);
  if (!raw) return;
  const lic: License = JSON.parse(raw);
  if (lic.revoked) return;
  lic.revoked = true;
  lic.revokedAt = new Date().toISOString();
  await env.PERCH_KV!.put(`lic:${txnId}`, JSON.stringify(lic));
  console.log('[perch] license revoked after refund', txnId);
}

// ── email ─────────────────────────────────────────────────────────────────

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

async function sendLicenseEmail(env: PerchEnv, lic: License): Promise<boolean> {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) {
    console.error('[perch] RESEND_API_KEY / MAIL_FROM not set; license email not sent', lic.txn);
    return false;
  }
  const link = await downloadUrl(env, lic.txn);
  const support = env.SUPPORT_EMAIL || 'support@nadhebe.com';
  const site = env.SITE_URL || SITE;
  // Email clients block scripts, so "Copy key" opens a tiny page that copies it. The key
  // (and the download token) ride in the URL fragment, which browsers never send to a server.
  const copyLink = `${site}/perch/key/#${encodeURIComponent(lic.key)}&t=${encodeURIComponent(link.split('?t=')[1] || '')}`;
  const key = escapeHtml(lic.key);
  const muted = 'color:#475569';
  const html = `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;color:#0f172a">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f1f5f9"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="560" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:560px;background:#ffffff;border:1px solid #e2e8f0;border-radius:18px">
<tr><td style="padding:36px 32px 8px">
<p style="margin:0 0 6px;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0284c7;font-weight:700">Perchboard for Windows</p>
<h1 style="margin:0 0 14px;font-size:28px;line-height:1.2;font-weight:800">Welcome to Perchboard.</h1>
<p style="margin:0;font-size:16px;line-height:1.65;${muted}">Thank you for choosing Perchboard. From today, nothing you copy gets lost. Your text, links, images and files stay one glance away, right at the edge of your screen.</p>
</td></tr>
<tr><td style="padding:24px 32px 0">
<p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:.08em;color:#64748b;font-weight:700">Your lifetime license key</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td style="padding:18px 16px;background:#f0f9ff;border:1px dashed #0284c7;border-radius:12px;font-family:Consolas,'SFMono-Regular',Menlo,monospace;font-size:20px;line-height:1.3;font-weight:700;letter-spacing:.06em;white-space:nowrap;text-align:center;color:#0f172a">${key}</td>
</tr></table>
<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px"><tr>
<td style="border:1px solid #0284c7;border-radius:999px;white-space:nowrap"><a href="${copyLink}" style="display:inline-block;padding:8px 18px;font-size:14px;font-weight:700;color:#0284c7;text-decoration:none;white-space:nowrap">Copy key</a></td>
<td style="padding-left:12px;font-size:13px;line-height:1.5;color:#64748b">Works on one computer. Reinstalling on the same computer is always free.</td>
</tr></table>
</td></tr>
<tr><td style="padding:28px 32px 0">
<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:#0284c7;border-radius:999px">
<a href="${link}" style="display:inline-block;padding:14px 28px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none">Download Perchboard</a>
</td></tr></table>
</td></tr>
<tr><td style="padding:28px 32px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size:15px;line-height:1.6;${muted}">
<tr><td valign="top" style="width:28px;padding:0 0 10px;font-weight:800;color:#0284c7">1.</td><td style="padding:0 0 10px">Run the installer (Windows 10 or 11).</td></tr>
<tr><td valign="top" style="width:28px;padding:0 0 10px;font-weight:800;color:#0284c7">2.</td><td style="padding:0 0 10px">Perchboard opens and asks for your key. Click <b>Paste</b>, then <b>Activate</b>.</td></tr>
<tr><td valign="top" style="width:28px;padding:0 0 10px;font-weight:800;color:#0284c7">3.</td><td style="padding:0 0 10px">Press the shortcut or move your mouse to the screen edge, and your clipboard is there.</td></tr>
</table>
</td></tr>
<tr><td style="padding:20px 32px 32px">
<p style="margin:0 0 14px;font-size:16px;line-height:1.65;color:#0f172a">Every great idea starts with something you copied. Now you will never lose one again. Enjoy Perchboard.</p>
<p style="margin:0;font-size:15px;color:#0f172a;font-weight:600">The Perchboard team at Nadhebe</p>
</td></tr>
<tr><td style="padding:18px 32px;border-top:1px solid #e2e8f0;font-size:12px;line-height:1.6;color:#64748b">
Order ${escapeHtml(lic.txn)} · Your receipt and invoice come separately from Paddle, our reseller. Questions or a refund within 14 days? Reply to this email or write to <a href="mailto:${support}" style="color:#0284c7">${support}</a>. · <a href="${site}/perch/" style="color:#0284c7">nadhebe.com/perch</a>
</td></tr>
</table></td></tr></table></body></html>`;
  const text = `Welcome to Perchboard.\n\nThank you for choosing Perchboard. From today, nothing you copy gets lost. Your text, links, images and files stay one glance away, right at the edge of your screen.\n\nYour lifetime license key:\n${lic.key}\n(Works on one computer. Reinstalling on the same computer is always free.)\n\nDownload Perchboard: ${link}\n\n1. Run the installer (Windows 10 or 11).\n2. Perchboard opens and asks for your key. Click Paste, then Activate.\n3. Press the shortcut or move your mouse to the screen edge, and your clipboard is there.\n\nEvery great idea starts with something you copied. Now you will never lose one again. Enjoy Perchboard.\n\nThe Perchboard team at Nadhebe\n\nOrder ${lic.txn}. Questions? ${support} · ${site}/perch/`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [lic.email],
      reply_to: support,
      subject: 'Welcome to Perchboard. Your license key is inside',
      html,
      text,
    }),
  });
  if (!res.ok) console.error('[perch] Resend error', res.status, await res.text());
  return res.ok;
}

// ── routes ────────────────────────────────────────────────────────────────

const notReady = (what: string) => json({ success: false, error: `${what} is not configured yet.` }, 503);

async function webhook(request: Request, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV || !env.PADDLE_WEBHOOK_SECRET) return notReady('Paddle webhook');
  const raw = await request.text();
  if (!(await verifyPaddleSignature(env.PADDLE_WEBHOOK_SECRET, request.headers.get('Paddle-Signature'), raw))) {
    return json({ success: false, error: 'Invalid signature' }, 401);
  }
  const event = JSON.parse(raw);
  const type: string = event.event_type;
  const data = event.data || {};
  if (type === 'transaction.completed' || (type === 'transaction.paid' && data.status === 'paid')) {
    await fulfil(env, data);
  } else if ((type === 'adjustment.created' || type === 'adjustment.updated') && data.action === 'refund' && data.status === 'approved') {
    await revoke(env, data.transaction_id);
  }
  // Always 200 for events we do not act on, so Paddle does not retry them.
  return json({ success: true });
}

const maskEmail = (e: string) => e.replace(/^(.)(.*)(@.*)$/, (_, a, b, c) => a + '•'.repeat(Math.min(6, b.length)) + c);

async function order(url: URL, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  const txnId = url.searchParams.get('txn') || '';
  if (!/^txn_[a-z0-9]{10,40}$/i.test(txnId)) return json({ success: false, error: 'Unknown order' }, 400);

  let raw = await env.PERCH_KV.get(`lic:${txnId}`);
  let lic: License | null = raw ? JSON.parse(raw) : null;
  if (!lic) {
    // The webhook may not have arrived yet: ask Paddle directly.
    const txn = await paddleGet(env, `/transactions/${txnId}`);
    if (txn && (txn.status === 'completed' || txn.status === 'paid')) lic = await fulfil(env, txn);
    if (!lic) return json({ success: true, status: 'pending' });
  }
  if (lic.revoked) return json({ success: true, status: 'refunded' });
  // The page link is only good for a few weeks; after that the email is the source of truth.
  if (Date.now() - Date.parse(lic.createdAt) > 30 * 24 * 3600 * 1000) {
    return json({ success: true, status: 'expired', email: maskEmail(lic.email) });
  }
  return json({
    success: true,
    status: 'ready',
    licenseKey: lic.key,
    email: maskEmail(lic.email),
    downloadUrl: await downloadUrl(env, lic.txn),
  });
}

async function download(url: URL, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  const txnId = await readDownloadToken(env, url.searchParams.get('t') || '');
  if (!txnId) return new Response('This download link is invalid or has expired. Use "Resend my license" on nadhebe.com/perch to get a new one.', { status: 403 });
  const raw = await env.PERCH_KV.get(`lic:${txnId}`);
  if (!raw || JSON.parse(raw).revoked) return new Response('This license is not active.', { status: 403 });

  const name = env.PERCH_INSTALLER_KEY || 'Perchboard-Setup.exe';
  if (env.PERCH_DOWNLOADS) {
    const obj = await env.PERCH_DOWNLOADS.get(name);
    if (obj) return fileResponse(obj, 'Perchboard-Setup.exe');
  }
  if (env.PERCH_DOWNLOAD_URL) return Response.redirect(env.PERCH_DOWNLOAD_URL, 302);
  return notReady('Installer download');
}

/**
 * Streams an R2 object as a plain download. octet-stream + no-transform keeps
 * Cloudflare from compressing it (which would drop Content-Length, so browsers
 * could not tell when the file had fully arrived).
 */
function fileResponse(obj: R2Object, filename: string): Response {
  return new Response(obj.body, {
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': String(obj.size),
      ETag: obj.httpEtag,
      'Cache-Control': 'private, no-store, no-transform',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}

// ── app updates (electron-updater generic feed) ───────────────────────────
// R2 layout: updates/latest.yml and updates/Perchboard-Setup-<version>.exe, both written
// by `npm run package:win` in the app repo (see docs/PERCHBOARD_SALES_SETUP.md).
// latest.yml is public (it only names the version); the installer is only served to a
// key that is active on the requesting computer, the same rule as /activate.

const UPDATE_FILE_RE = /^Perchboard-Setup-\d+\.\d+\.\d+(?:-[0-9A-Za-z.]+)?\.exe$/;

async function update(request: Request, env: PerchEnv, file: string): Promise<Response> {
  if (!env.PERCH_DOWNLOADS) return notReady('Updates');
  if (file === 'latest.yml') {
    const obj = await env.PERCH_DOWNLOADS.get('updates/latest.yml');
    if (!obj) return new Response('No update published.', { status: 404 });
    return new Response(obj.body, {
      headers: { 'Content-Type': 'text/yaml; charset=utf-8', 'Cache-Control': 'no-store' },
    });
  }
  if (!UPDATE_FILE_RE.test(file)) return new Response('Not found.', { status: 404 });
  if (!env.PERCH_KV) return notReady('License storage');
  const key = normalizeKey(request.headers.get('X-Perch-Key') || '');
  const device = request.headers.get('X-Perch-Device') || '';
  const lic = /^PERCH(-[0-9A-Z]{5}){4}$/.test(key) && DEVICE_RE.test(device) ? await findLicense(env, key) : null;
  if (!lic || lic.revoked || lic.device !== device) {
    return new Response('Updates need an active Perchboard license on this computer.', { status: 403 });
  }
  const obj = await env.PERCH_DOWNLOADS.get(`updates/${file}`);
  if (!obj) return new Response('Not found.', { status: 404 });
  return fileResponse(obj, file);
}

async function resend(request: Request, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  const { email } = (await request.json().catch(() => ({}))) as { email?: string };
  const addr = (email || '').trim().toLowerCase();
  const generic = json({ success: true, message: 'If that email bought Perchboard, the license is on its way.' });
  if (!addr || addr.length > 254 || !addr.includes('@')) return generic;
  if (await env.PERCH_KV.get(`rl:resend:${addr}`)) return generic;
  await env.PERCH_KV.put(`rl:resend:${addr}`, '1', { expirationTtl: 600 });
  const txns: string[] = JSON.parse((await env.PERCH_KV.get(`cust:${addr}`)) || '[]');
  for (const t of txns) {
    const raw = await env.PERCH_KV.get(`lic:${t}`);
    if (!raw) continue;
    const lic: License = JSON.parse(raw);
    if (!lic.revoked) await sendLicenseEmail(env, lic);
  }
  return generic;
}

const MOVE_COOLDOWN_MS = 7 * 24 * 3600 * 1000;
const DEVICE_RE = /^[A-Za-z0-9_-]{16,128}$/;

async function findLicense(env: PerchEnv, key: string): Promise<License | null> {
  const txnId = await env.PERCH_KV!.get(`key:${key}`);
  const raw = txnId ? await env.PERCH_KV!.get(`lic:${txnId}`) : null;
  return raw ? (JSON.parse(raw) as License) : null;
}

const saveLicense = (env: PerchEnv, lic: License) => env.PERCH_KV!.put(`lic:${lic.txn}`, JSON.stringify(lic));

async function activate(request: Request, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  const { key, device, deviceName } = (await request.json().catch(() => ({}))) as { key?: string; device?: string; deviceName?: string };
  const k = normalizeKey(key || '');
  if (!/^PERCH(-[0-9A-Z]{5}){4}$/.test(k)) return json({ success: false, valid: false, error: 'That does not look like a Perchboard key.' }, 400);
  if (!device || !DEVICE_RE.test(device)) return json({ success: false, valid: false, error: 'Missing device id. Please update Perchboard.' }, 400);
  const lic = await findLicense(env, k);
  if (!lic) return json({ success: false, valid: false, error: 'License key not found.' }, 404);
  if (lic.revoked) return json({ success: false, valid: false, error: 'This license was refunded.' }, 403);
  if (lic.device && lic.device !== device) {
    return json(
      {
        success: false,
        valid: false,
        code: 'other_device',
        error: `This key is already active on another computer${lic.deviceName ? ` (${lic.deviceName})` : ''}. To move it here, use "Move license to this computer" and confirm from your email.`,
      },
      409,
    );
  }
  if (!lic.device) {
    // First activation, or the first one after a move: bind the key to this computer.
    lic.device = device;
    lic.deviceName = (deviceName || '').replace(/[^\w .()-]/g, '').slice(0, 60) || undefined;
    lic.activatedAt = new Date().toISOString();
    await saveLicense(env, lic);
  }
  return json({ success: true, valid: true, email: maskEmail(lic.email), license: await signLicense(env, lic, device) });
}

// ── moving a license to a new computer ────────────────────────────────────

async function moveLink(env: PerchEnv, key: string): Promise<string> {
  const body = b64url(enc.encode(JSON.stringify({ key, move: 1, exp: Date.now() + 3600 * 1000 })));
  return `${env.SITE_URL || SITE}/api/perch/move?t=${body}.${await hmacHex(downloadSecret(env), body)}`;
}

async function readMoveToken(env: PerchEnv, token: string): Promise<string | null> {
  const [body, sig] = token.split('.');
  if (!body || !sig || !downloadSecret(env)) return null;
  if (!safeEqual(await hmacHex(downloadSecret(env), body), sig)) return null;
  try {
    const { key, move, exp } = JSON.parse(new TextDecoder().decode(fromB64url(body)));
    return move === 1 && typeof key === 'string' && exp > Date.now() ? key : null;
  } catch {
    return null;
  }
}

const page = (title: string, msg: string, status = 200) =>
  new Response(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)}</title>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#f8fafc;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0f172a">
<main style="max-width:440px;margin:24px;padding:32px;background:#fff;border:1px solid #e2e8f0;border-radius:16px">
<h1 style="margin:0 0 12px;font-size:22px">${escapeHtml(title)}</h1><p style="margin:0;font-size:15px;line-height:1.6;color:#475569">${escapeHtml(msg)}</p>
<p style="margin:20px 0 0"><a href="/perch/" style="color:#0284c7">Back to Perchboard</a></p></main></body>`,
    { status, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' } },
  );

async function sendMoveEmail(env: PerchEnv, lic: License): Promise<void> {
  if (!env.RESEND_API_KEY || !env.MAIL_FROM) return;
  const link = await moveLink(env, lic.key);
  const where = lic.deviceName ? ` from ${escapeHtml(lic.deviceName)}` : '';
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [lic.email],
      reply_to: env.SUPPORT_EMAIL || 'support@nadhebe.com',
      subject: 'Move your Perchboard license to a new computer',
      html: `<p>Someone asked to move your Perchboard license${where} to a new computer.</p><p><a href="${link}">Yes, free my license</a> (link works for 1 hour).</p><p>After that, open Perchboard on the new computer and click Activate. Perchboard will stop working on the old one. If this wasn't you, ignore this email.</p>`,
      text: `Someone asked to move your Perchboard license${where} to a new computer.\n\nConfirm (link works for 1 hour): ${link}\n\nThen open Perchboard on the new computer and click Activate. If this wasn't you, ignore this email.`,
    }),
  });
  if (!res.ok) console.error('[perch] Resend error (move)', res.status, await res.text());
}

async function move(request: Request, url: URL, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  if (request.method === 'GET') {
    const key = await readMoveToken(env, url.searchParams.get('t') || '');
    if (!key) return page('Link expired', 'This link is invalid or older than 1 hour. Ask for a new one from the Perchboard app.', 400);
    const lic = await findLicense(env, key);
    if (!lic || lic.revoked) return page('License not active', 'This license was refunded or does not exist.', 404);
    if (lic.device) {
      lic.device = undefined;
      lic.deviceName = undefined;
      lic.movedAt = new Date().toISOString();
      lic.moves = (lic.moves || 0) + 1;
      await saveLicense(env, lic);
    }
    return page('License freed', 'Open Perchboard on your new computer and click Activate. It will stop working on the old one.');
  }
  // POST {key}: the app asks to move. Always the same answer, so it can't be used to probe keys.
  const { key } = (await request.json().catch(() => ({}))) as { key?: string };
  const generic = json({ success: true, message: 'Check the email you bought with and confirm the move. The link works for 1 hour.' });
  const k = normalizeKey(key || '');
  if (!/^PERCH(-[0-9A-Z]{5}){4}$/.test(k)) return generic;
  const lic = await findLicense(env, k);
  if (!lic || lic.revoked || !lic.device) return generic;
  if (lic.movedAt && Date.now() - Date.parse(lic.movedAt) < MOVE_COOLDOWN_MS) {
    return json({ success: false, error: 'This license was moved in the last 7 days. Contact support if you need help.' }, 429);
  }
  if (await env.PERCH_KV.get(`rl:move:${k}`)) return generic;
  await env.PERCH_KV.put(`rl:move:${k}`, '1', { expirationTtl: 600 });
  await sendMoveEmail(env, lic);
  return generic;
}

// ── admin: who bought, which computer, free a key ─────────────────────────

async function admin(request: Request, url: URL, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV || !env.PERCH_ADMIN_TOKEN) return notReady('Admin');
  const auth = request.headers.get('Authorization') || '';
  if (!safeEqual(auth, `Bearer ${env.PERCH_ADMIN_TOKEN}`)) return json({ success: false, error: 'Unauthorized' }, 401);
  if (request.method === 'POST') {
    const { key, action } = (await request.json().catch(() => ({}))) as { key?: string; action?: string };
    const lic = await findLicense(env, normalizeKey(key || ''));
    if (!lic) return json({ success: false, error: 'Key not found' }, 404);
    if (action !== 'free') return json({ success: false, error: 'Unknown action' }, 400);
    lic.device = undefined;
    lic.deviceName = undefined;
    lic.movedAt = undefined; // support override: no cooldown
    await saveLicense(env, lic);
    return json({ success: true, license: lic });
  }
  const email = (url.searchParams.get('email') || '').trim().toLowerCase();
  const key = normalizeKey(url.searchParams.get('key') || '');
  const txn = url.searchParams.get('txn') || '';
  let txns: string[] = [];
  if (email) txns = JSON.parse((await env.PERCH_KV.get(`cust:${email}`)) || '[]');
  else if (key) txns = [(await env.PERCH_KV.get(`key:${key}`)) || ''];
  else if (txn) txns = [txn];
  const licenses = [];
  for (const t of txns.filter(Boolean)) {
    const raw = await env.PERCH_KV.get(`lic:${t}`);
    if (raw) licenses.push(JSON.parse(raw));
  }
  return json({ success: true, licenses });
}

async function waitlist(request: Request, env: PerchEnv): Promise<Response> {
  const body = (await request.json().catch(() => null)) as { email?: string; platform?: string; source?: string } | null;
  if (!body) return json({ success: false, error: 'Invalid JSON request payload.' }, 400);
  const email = (body.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return json({ success: false, error: 'Please provide a valid email address.' }, 422);
  }
  const platform = ['windows', 'macos', 'ios', 'both'].includes(body.platform || '') ? body.platform : 'macos';
  const entry = {
    email,
    platform,
    source: (body.source || 'perch_landing').slice(0, 40),
    timestamp: new Date().toISOString(),
    country: request.headers.get('cf-ipcountry') || '',
  };
  if (env.PERCH_KV) await env.PERCH_KV.put(`wait:${email}`, JSON.stringify(entry));
  console.log('[PERCHBOARD_WAITLIST_SIGNUP]', JSON.stringify(entry));
  return json({ success: true, message: "You're on the list. We'll email you when Perchboard for macOS is ready." });
}

/** Returns a Response for Perchboard routes, or null when the path is not ours. */
export async function handlePerch(request: Request, env: PerchEnv, url: URL): Promise<Response | null> {
  const p = url.pathname.replace(/\/+$/, '');
  const m = request.method;
  if ((p === '/api/paddle/webhook' || p === '/api/perch/order') && env.PADDLE_ENV !== 'sandbox' && env.PADDLE_ENV !== 'production') {
    console.error('[perch] PADDLE_ENV must be "sandbox" or "production"; refusing to talk to Paddle.');
    return notReady('PADDLE_ENV');
  }
  try {
    if (p === '/api/paddle/webhook' && m === 'POST') return await webhook(request, env);
    if (p === '/api/perch/order' && m === 'GET') return await order(url, env);
    if (p === '/api/perch/download' && m === 'GET') return await download(url, env);
    if (p.startsWith('/api/perch/update/') && m === 'GET') return await update(request, env, decodeURIComponent(p.slice('/api/perch/update/'.length)));
    if (p === '/api/perch/resend' && m === 'POST') return await resend(request, env);
    if (p === '/api/perch/activate' && m === 'POST') return await activate(request, env);
    if (p === '/api/perch/move' && (m === 'POST' || m === 'GET')) return await move(request, url, env);
    if (p === '/api/perch/admin' && (m === 'GET' || m === 'POST')) return await admin(request, url, env);
    if (p === '/api/waitlist' && m === 'POST') return await waitlist(request, env);
  } catch (err: any) {
    console.error('[perch] route error', p, err?.stack || err);
    return json({ success: false, error: 'Something went wrong. Please try again.' }, 500);
  }
  return null;
}
