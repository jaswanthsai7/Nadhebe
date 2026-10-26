# Perchboard sales setup

Full friendly guide: https://claude.ai/artifact/Cy99tMbeZrzRBB9uqwDNmV

## Flow
1. Buyer pays in the Paddle overlay on /perch/ (Paddle = merchant of record: tax, receipts, refunds).
2. Paddle calls `POST /api/paddle/webhook` (transaction.completed / transaction.paid). `worker/perch.ts` verifies the signature, creates `PERCH-XXXXX-XXXXX-XXXXX-XXXXX`, stores it in KV and emails it via Resend.
3. Buyer lands on `/welcome/?_ptxn=txn_…`, which polls `GET /api/perch/order` and shows key + download (it fulfils the order itself if the webhook is late).
4. `GET /api/perch/download?t=…` streams the installer from R2 (signed link, paid + not refunded only).
5. The app calls `POST /api/perch/activate {key, device}` and receives an Ed25519-signed license to verify offline.
6. Refund (adjustment approved) revokes the key. `POST /api/perch/resend {email}` re-sends lost keys (rate limited).

## Accounts / keys
| What | Where it goes |
| --- | --- |
| Paddle client token, price IDs | `.env` (`PUBLIC_PADDLE_*`, baked in at build) |
| Paddle webhook secret, API key | `npx wrangler secret put PADDLE_WEBHOOK_SECRET` / `PADDLE_API_KEY` |
| Resend API key (domain nadhebe.com verified) | `npx wrangler secret put RESEND_API_KEY` |
| License private key (`node scripts/perch-license-keys.mjs`) | `npx wrangler secret put LICENSE_PRIVATE_KEY` |
| KV namespace `PERCH_KV`, R2 bucket `perchboard-downloads` | uncomment in `wrangler.toml` |

Webhook URL: `https://nadhebe.com/api/paddle/webhook`, events `transaction.completed`, `transaction.paid`, `adjustment.created`, `adjustment.updated`.

Go live: `PUBLIC_PADDLE_ENV=production` in `.env`, `PADDLE_ENV = "production"` in `wrangler.toml`, live secrets, rebuild, deploy.
Debug: `npx wrangler tail` (lines start with `[perch]`).

## Shipping a new version (installer + in-app updates)
The app checks `https://nadhebe.com/api/perch/update/latest.yml` (electron-updater generic feed, set in the app's
`package.json` `build.publish`). `latest.yml` is public; the installer it names is only served when the request
carries a key that is active on that computer (`X-Perch-Key` / `X-Perch-Device`, same rule as `/activate`).
Downloads are full files only (the app sets `disableDifferentialDownload`), so no blockmap upload is needed.

1. In the app repo bump `version` in `package.json` (e.g. 1.0.1), then `npm run package:win`.
   It writes `release/Perchboard-Setup-1.0.1.exe` and `release/latest.yml`.
2. Upload, from the app repo (installer first, `latest.yml` last so no one is pointed at a missing file):
   ```
   npx wrangler r2 object put perchboard-downloads/updates/Perchboard-Setup-1.0.1.exe --file=release/Perchboard-Setup-1.0.1.exe --remote
   npx wrangler r2 object put perchboard-downloads/Perchboard-Setup.exe --file=release/Perchboard-Setup-1.0.1.exe --remote
   npx wrangler r2 object put perchboard-downloads/updates/latest.yml --file=release/latest.yml --content-type=text/yaml --remote
   ```
   (`wrangler` must run with this repo's `wrangler.toml` account; run the commands from the Nadhebe folder with full paths if needed.)
3. Check: `curl -s https://nadhebe.com/api/perch/update/latest.yml` shows the new version.
4. Every new build has a new hash, so antivirus reputation starts from zero for it: sign it before upload once a code
   signing certificate is set up, and resubmit unsigned builds to Microsoft/McAfee as false positives.
