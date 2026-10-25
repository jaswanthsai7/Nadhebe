// Generates the Ed25519 key pair used to sign Perchboard licenses.
//
//   node scripts/perch-license-keys.mjs
//
// PRIVATE key → `npx wrangler secret put LICENSE_PRIVATE_KEY` (paste it, never commit it).
// PUBLIC key  → embed in the Perchboard app to verify licenses offline.
// Run this ONCE. Generating a new pair later invalidates every license the app has stored.
import { generateKeyPairSync } from 'node:crypto';

const { privateKey, publicKey } = generateKeyPairSync('ed25519');
const pkcs8 = privateKey.export({ type: 'pkcs8', format: 'der' }).toString('base64');
const spki = publicKey.export({ type: 'spki', format: 'der' });
// The raw 32-byte public key is the last 32 bytes of the SPKI encoding.
const raw = spki.subarray(spki.length - 32).toString('base64');

console.log('\nLICENSE_PRIVATE_KEY (secret, for Cloudflare):\n' + pkcs8);
console.log('\nPublic key for the app (raw Ed25519, base64):\n' + raw);
console.log('\nPublic key (SPKI DER, base64), if your app library prefers it:\n' + spki.toString('base64') + '\n');
