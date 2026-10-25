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
