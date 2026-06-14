import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import { eq, sql } from 'drizzle-orm';
import { getAuth } from '../../../lib/auth';
import { getDb } from '../../../lib/server/db';
import { user } from '../../../lib/server/auth-schema';
import { serverEnv } from '../../../lib/server/env';

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * Bootstrap primul admin din variabilele de mediu. Self-locking: funcționează
 * DOAR când nu există niciun user. Creează userul programatic prin `$context`
 * (funcționează chiar dacă înregistrarea publică e dezactivată), apoi îl ridică
 * la rol `admin`. Parola din ADMIN_SETUP_PASSWORD/ADMIN_PASSWORD sau una generată.
 */
export const POST: APIRoute = async () => {
  const db = getDb();
  if (!db) return json({ ok: false, error: 'DATABASE_URL lipsește.' }, 500);

  const [{ n }] = await db.select({ n: sql<number>`count(*)::int` }).from(user);
  if (n > 0) return json({ ok: false, error: 'Deja inițializat (există useri).' }, 409);

  const email = serverEnv('ADMIN_EMAIL')?.trim().toLowerCase();
  if (!email) return json({ ok: false, error: 'ADMIN_EMAIL lipsește.' }, 400);
  const name = serverEnv('ADMIN_NAME') || 'Admin';

  let password = serverEnv('ADMIN_SETUP_PASSWORD') || serverEnv('ADMIN_PASSWORD');
  let generated = false;
  if (!password) {
    password = randomBytes(12).toString('base64url');
    generated = true;
  }

  try {
    const ctx = await getAuth().$context;
    const created = await ctx.internalAdapter.createUser({
      email,
      name,
      emailVerified: true,
    });
    const hashed = await ctx.password.hash(password);
    await ctx.internalAdapter.createAccount({
      userId: created.id,
      providerId: 'credential',
      accountId: created.id,
      password: hashed,
    });
    await db.update(user).set({ role: 'admin' }).where(eq(user.id, created.id));
  } catch (err) {
    console.error('[auth/setup] eșec:', err);
    return json({ ok: false, error: 'Crearea adminului a eșuat.' }, 500);
  }

  if (generated) {
    console.info(`[auth/setup] Admin creat: ${email} — parolă generată: ${password}`);
  }
  return json({ ok: true, email, ...(generated ? { password } : {}) });
};
