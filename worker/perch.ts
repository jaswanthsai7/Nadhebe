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

const paddleApi = (env: PerchEnv) =>
  (env.PADDLE_ENV || 'sandbox') === 'production' ? 'https://api.paddle.com' : 'https://sandbox-api.paddle.com';

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
  const html = `<!doctype html><html><body style="margin:0;background:#f8fafc;font-family:-apple-system,Segoe UI,Helvetica,Arial,sans-serif;color:#0f172a">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 12px"><tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:32px">
<tr><td>
<p style="margin:0 0 4px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#0284c7;font-weight:700">Perchboard for Windows</p>
<h1 style="margin:0 0 16px;font-size:24px">Thanks for buying Perchboard!</h1>
<p style="margin:0 0 20px;font-size:15px;line-height:1.6;color:#475569">Here is your lifetime license key and download. Keep this email: you can download Perchboard again from the same link any time.</p>
<p style="margin:0 0 6px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#64748b;font-weight:700">Your license key</p>
<p style="margin:0 0 24px;padding:14px 16px;background:#f1f5f9;border:1px dashed #0284c7;border-radius:10px;font-family:Consolas,Menlo,monospace;font-size:18px;font-weight:700;letter-spacing:.04em">${escapeHtml(lic.key)}</p>
<p style="margin:0 0 28px"><a href="${link}" style="display:inline-block;background:#0284c7;color:#fff;text-decoration:none;font-weight:700;padding:12px 22px;border-radius:999px">Download Perchboard (.exe)</a></p>
<ol style="margin:0 0 24px;padding-left:20px;font-size:14px;line-height:1.7;color:#475569">
<li>Run the installer (Windows 10 or 11, 64-bit).</li>
<li>Open Perchboard → Settings → License.</li>
<li>Paste your key and click Activate.</li>
</ol>
<p style="margin:0;font-size:13px;color:#64748b">Order ${escapeHtml(lic.txn)} · Your receipt and invoice come separately from Paddle, our reseller. Questions or a refund within 14 days? Reply to this email or write to <a href="mailto:${support}" style="color:#0284c7">${support}</a>.</p>
</td></tr></table></td></tr></table></body></html>`;
  const text = `Thanks for buying Perchboard!\n\nYour license key: ${lic.key}\n\nDownload: ${link}\n\n1. Run the installer (Windows 10 or 11, 64-bit).\n2. Open Perchboard > Settings > License.\n3. Paste your key and click Activate.\n\nOrder ${lic.txn}. Questions? ${support}`;
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: env.MAIL_FROM,
      to: [lic.email],
      reply_to: support,
      subject: 'Your Perchboard license key and download',
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
    if (obj) {
      return new Response(obj.body, {
        headers: {
          'Content-Type': 'application/vnd.microsoft.portable-executable',
          'Content-Disposition': `attachment; filename="${name.split('/').pop()}"`,
          'Content-Length': String(obj.size),
          ETag: obj.httpEtag,
          'Cache-Control': 'private, no-store',
        },
      });
    }
  }
  if (env.PERCH_DOWNLOAD_URL) return Response.redirect(env.PERCH_DOWNLOAD_URL, 302);
  return notReady('Installer download');
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

async function activate(request: Request, env: PerchEnv): Promise<Response> {
  if (!env.PERCH_KV) return notReady('License storage');
  const { key, device } = (await request.json().catch(() => ({}))) as { key?: string; device?: string };
  const k = normalizeKey(key || '');
  if (!/^PERCH(-[0-9A-Z]{5}){4}$/.test(k)) return json({ success: false, valid: false, error: 'That does not look like a Perchboard key.' }, 400);
  const txnId = await env.PERCH_KV.get(`key:${k}`);
  const raw = txnId ? await env.PERCH_KV.get(`lic:${txnId}`) : null;
  if (!raw) return json({ success: false, valid: false, error: 'License key not found.' }, 404);
  const lic: License = JSON.parse(raw);
  if (lic.revoked) return json({ success: false, valid: false, error: 'This license was refunded.' }, 403);
  return json({ success: true, valid: true, email: maskEmail(lic.email), license: await signLicense(env, lic, device) });
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
  try {
    if (p === '/api/paddle/webhook' && m === 'POST') return await webhook(request, env);
    if (p === '/api/perch/order' && m === 'GET') return await order(url, env);
    if (p === '/api/perch/download' && m === 'GET') return await download(url, env);
    if (p === '/api/perch/resend' && m === 'POST') return await resend(request, env);
    if (p === '/api/perch/activate' && m === 'POST') return await activate(request, env);
    if (p === '/api/waitlist' && m === 'POST') return await waitlist(request, env);
  } catch (err: any) {
    console.error('[perch] route error', p, err?.stack || err);
    return json({ success: false, error: 'Something went wrong. Please try again.' }, 500);
  }
  return null;
}
