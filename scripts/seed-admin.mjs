// Inserează adminul inițial în tabelul `admin_users` din variabilele de mediu
// (ADMIN_EMAIL + ADMIN_PASSWORD_HASH, sau ADMIN_PASSWORD pe care îl hash-uim aici
// cu aceiași parametri scrypt ca `src/lib/server/crypto.ts`).
//
// Idempotent: dacă există deja un admin cu acel email, nu face nimic. Fără
// DATABASE_URL / fără credențiale, iese curat (0) — login-ul cade oricum pe env.
import { randomBytes, scryptSync } from 'node:crypto';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.info('[seed-admin] DATABASE_URL lipsește: sărim seed-ul de admin.');
  process.exit(0);
}

const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
if (!email) {
  console.info('[seed-admin] ADMIN_EMAIL lipsește: nimic de inserat.');
  process.exit(0);
}

// Aceiași parametri ca scryptHash() din crypto.ts.
const SCRYPT = { N: 16384, r: 8, p: 1 };
function scryptHash(password) {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, 32, SCRYPT);
  return `scrypt:${salt.toString('base64')}:${hash.toString('base64')}`;
}

let passwordHash = process.env.ADMIN_PASSWORD_HASH?.trim() || null;
if (!passwordHash) {
  const plain = process.env.ADMIN_PASSWORD?.trim();
  if (plain) passwordHash = scryptHash(plain);
}
if (!passwordHash) {
  console.info('[seed-admin] Nici ADMIN_PASSWORD_HASH, nici ADMIN_PASSWORD: nimic de inserat.');
  process.exit(0);
}

const name = process.env.ADMIN_NAME?.trim() || '';

const sql = postgres(url, { max: 1 });
try {
  const existing = await sql`select id from admin_users where email = ${email} limit 1`;
  if (existing.length > 0) {
    console.info(`[seed-admin] Adminul ${email} există deja: nimic de făcut.`);
  } else {
    await sql`
      insert into admin_users (email, name, password_hash, status)
      values (${email}, ${name}, ${passwordHash}, 'active')
    `;
    console.info(`[seed-admin] Admin creat: ${email}`);
  }
} catch (err) {
  console.error('[seed-admin] Seed-ul de admin a eșuat:', err);
  process.exit(1);
} finally {
  await sql.end();
}
