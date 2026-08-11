// Generează secretele necesare pentru .env:
//   pnpm gen:key                      → APP_ENCRYPTION_KEY + SESSION_SECRET
//   pnpm gen:key --password "parola"  → și ADMIN_PASSWORD_HASH
import { randomBytes, scryptSync } from 'node:crypto';

console.log(`APP_ENCRYPTION_KEY=${randomBytes(32).toString('hex')}`);
console.log(`SESSION_SECRET=${randomBytes(32).toString('hex')}`);
console.log(`PUBLISH_TOKEN=${randomBytes(32).toString('hex')}`);

const idx = process.argv.indexOf('--password');
if (idx !== -1) {
  const password = process.argv[idx + 1];
  if (!password) {
    console.error('Folosire: pnpm gen:key --password "parola-ta"');
    process.exit(1);
  }
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, { N: 16384, r: 8, p: 1 });
  console.log(`ADMIN_PASSWORD_HASH=scrypt:${salt.toString('base64')}:${hash.toString('base64')}`);
}
