# Perchboard app: license activation (Windows)

What the Perchboard Windows app must do so that **one key works on one computer**, reinstalls keep working,
and nobody can unlock it without a real purchase. The server side is already in `worker/perch.ts`.

## 1. Device id

Make a stable id for this computer, the same after uninstall and reinstall:

```
device = hex( SHA-256( MachineGuid + "|perchboard" ) )   // 64 chars
MachineGuid = registry HKLM\SOFTWARE\Microsoft\Cryptography\MachineGuid
deviceName  = Environment.MachineName   // shown to the buyer, e.g. "Silver-Laptop"
```

Never send the raw MachineGuid, only the hash.

## 2. Activate (Settings > License > Activate)

```
POST https://nadhebe.com/api/perch/activate
{ "key": "PERCH-XXXXX-XXXXX-XXXXX-XXXXX", "device": "<hash>", "deviceName": "<name>" }
```

| Answer | Meaning | App does |
| --- | --- | --- |
| 200 `{ valid: true, license }` | Key is on this computer | Save `license` to `%APPDATA%\Perchboard\license.dat`, unlock |
| 409 `code: "other_device"` | Key is active on another computer | Show the error text and a **Move license to this computer** button |
| 403 | Refunded | Lock, show "This license was refunded" |
| 404 / 400 | Wrong key | Show the error text |

## 3. Move to a new computer

The button calls `POST https://nadhebe.com/api/perch/move { "key": "…" }`. The buyer gets an email with a
1-hour link; after clicking it they press Activate again on the new computer. Allowed once every 7 days.

## 4. Check the saved license (offline)

`license` = `base64url(payload).base64url(signature)`. Verify the Ed25519 signature over the first part with the
**public key** printed by `node scripts/perch-license-keys.mjs` (embed it in the app). Then check
`payload.product == "perchboard"` and `payload.device == <this computer's hash>`. A copied license.dat fails on
another computer because the device does not match.

## 5. Re-check online

Every 7 days (when online) call activate again with the same key and device and replace `license.dat`.
If it answers 409 (moved to another computer) or 403 (refunded), lock the app. If offline, keep working for up to
30 days since the last successful check, then ask to go online once.
