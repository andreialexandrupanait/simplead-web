import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { and, eq, isNull } from 'drizzle-orm';
import { serverEnv } from './env';
import { safeEqual, verifyPassword } from './crypto';
import { getDb } from './db';
import { passwordResetTokens } from './schema';
import { findAdminByEmail, touchLastLogin } from './admin-users';
import { getIntegration } from './settings';

export const SESSION_COOKIE = 'sa_admin';
const SESSION_TTL_S = 7 * 24 * 60 * 60; // 7 zile (implicit, fără „ține-mă minte")
export const REMEMBER_TTL_S = 30 * 24 * 60 * 60; // 30 zile (cu „ține-mă minte")
const RESET_TTL_MS = 60 * 60 * 1000; // 1 oră

/** Admin-ul e utilizabil doar cu secret de sesiune setat. Credențialele pot veni
 * din DB (`admin_users`) sau, ca bootstrap, din env. */
export function isAdminConfigured(): boolean {
  return Boolean(
    serverEnv('SESSION_SECRET') &&
    serverEnv('ADMIN_EMAIL') &&
    (serverEnv('ADMIN_PASSWORD_HASH') || serverEnv('ADMIN_PASSWORD')),
  );
}

/** Login cu Google e disponibil doar dacă există client OAuth configurat
 * (în /admin/integrari sau în env). */
export async function isGoogleConfigured(): Promise<boolean> {
  const g = await getIntegration('google');
  return Boolean(g.clientId.value && g.clientSecret.value);
}

function b64url(buf: Buffer): string {
  return buf.toString('base64url');
}

function sign(payload: string, secret: string): string {
  return b64url(createHmac('sha256', secret).update(payload).digest());
}

export type SessionPayload = { sub: string; email?: string };

/**
 * Token de sesiune stateless: `base64url(json).semnătură HMAC-SHA256`.
 * `sub` = id-ul adminului din DB (uuid) sau `'admin'` pentru sesiunea de
 * bootstrap din env. `ttlS` controlează expirarea (remember-me).
 */
export function createSessionToken(
  opts: { sub?: string; email?: string; ttlS?: number } = {},
): string | null {
  const secret = serverEnv('SESSION_SECRET');
  if (!secret) return null;
  const now = Math.floor(Date.now() / 1000);
  const ttl = opts.ttlS ?? SESSION_TTL_S;
  const payload = b64url(
    Buffer.from(
      JSON.stringify({ sub: opts.sub ?? 'admin', email: opts.email, iat: now, exp: now + ttl }),
      'utf8',
    ),
  );
  return `${payload}.${sign(payload, secret)}`;
}

/** Decodează un token valid (semnătură + expirare) → payload, altfel null. */
export function getSessionPayload(token: string | undefined): SessionPayload | null {
  if (!token) return null;
  const secret = serverEnv('SESSION_SECRET');
  if (!secret) return null;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return null;
  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expected, 'utf8');
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return null;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      sub?: string;
      email?: string;
      exp?: number;
    };
    if (!data.sub || typeof data.exp !== 'number' || data.exp <= Date.now() / 1000) return null;
    return { sub: data.sub, email: data.email };
  } catch {
    return null;
  }
}

/** Variantă booleană (folosită de middleware): token valid și neexpirat. */
export function verifySessionToken(token: string | undefined): boolean {
  return getSessionPayload(token) !== null;
}

export function setSessionCookie(
  cookies: AstroCookies,
  token: string,
  opts: { maxAge?: number } = {},
): void {
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
    // Fără maxAge → cookie de sesiune (dispare la închiderea browserului).
    ...(opts.maxAge ? { maxAge: opts.maxAge } : {}),
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

/**
 * Verifică email + parolă. Caută întâi în `admin_users` (DB); dacă nu găsește
 * acolo, cade pe credențialele din env (bootstrap/recovery, `sub: 'admin'`).
 * Întoarce identitatea pentru token sau null. Comparații în timp constant.
 */
export async function verifyAdminCredentials(
  email: string,
  password: string,
): Promise<{ sub: string; email: string } | null> {
  const cleanEmail = email.trim().toLowerCase();

  // 1) Cont din DB.
  const user = await findAdminByEmail(cleanEmail);
  if (user && user.status === 'active' && user.passwordHash) {
    if (verifyPassword(password, user.passwordHash)) {
      await touchLastLogin(user.id);
      return { sub: user.id, email: user.email };
    }
    return null;
  }

  // 2) Bootstrap din env (când nu există încă cont în DB pentru acest email).
  if (user) return null; // există în DB dar fără parolă / dezactivat → respinge
  const adminEmail = serverEnv('ADMIN_EMAIL');
  if (!adminEmail) return null;
  const emailOk = safeEqual(cleanEmail, adminEmail.trim().toLowerCase());
  const hash = serverEnv('ADMIN_PASSWORD_HASH');
  let passwordOk = false;
  if (hash) {
    passwordOk = verifyPassword(password, hash);
  } else {
    const plain = serverEnv('ADMIN_PASSWORD');
    passwordOk = Boolean(plain) && safeEqual(password, plain!);
  }
  return emailOk && passwordOk ? { sub: 'admin', email: adminEmail.trim().toLowerCase() } : null;
}

// ---- Token-uri de resetare parolă ---------------------------------------

const sha256 = (raw: string) => createHash('sha256').update(raw).digest('hex');

/**
 * Creează un token de resetare pentru `userId`: întoarce plaintext-ul (intră
 * doar în linkul din email); în DB salvăm doar SHA-256, cu expirare 1h.
 * Întoarce null dacă DB-ul nu e disponibil.
 */
export async function createResetToken(userId: string): Promise<string | null> {
  const db = getDb();
  if (!db) return null;
  const raw = randomBytes(32).toString('hex');
  try {
    await db.insert(passwordResetTokens).values({
      userId,
      tokenHash: sha256(raw),
      expiresAt: new Date(Date.now() + RESET_TTL_MS),
    });
    return raw;
  } catch (err) {
    console.warn('[auth] createResetToken a eșuat:', err);
    return null;
  }
}

/**
 * Consumă un token de resetare: valid (există, neexpirat, nefolosit) → marchează
 * `usedAt` și întoarce `userId`. Single-use. Orice problemă → null.
 */
export async function consumeResetToken(raw: string): Promise<string | null> {
  const db = getDb();
  if (!db || !raw) return null;
  try {
    const hash = sha256(raw);
    const rows = await db
      .select()
      .from(passwordResetTokens)
      .where(and(eq(passwordResetTokens.tokenHash, hash), isNull(passwordResetTokens.usedAt)))
      .limit(1);
    const row = rows[0];
    if (!row) return null;
    if (row.expiresAt.getTime() <= Date.now()) return null;
    await db
      .update(passwordResetTokens)
      .set({ usedAt: new Date() })
      .where(eq(passwordResetTokens.id, row.id));
    return row.userId;
  } catch (err) {
    console.warn('[auth] consumeResetToken a eșuat:', err);
    return null;
  }
}

// Rate limit pe login: 5 încercări eșuate / 15 minute / IP.
// In-memory e suficient: serverul standalone rulează într-un singur proces.
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

export function checkLoginRateLimit(ip: string): boolean {
  const entry = failures.get(ip);
  if (!entry) return true;
  if (Date.now() > entry.resetAt) {
    failures.delete(ip);
    return true;
  }
  return entry.count < MAX_FAILURES;
}

export function recordFailedLogin(ip: string): void {
  const entry = failures.get(ip);
  if (!entry || Date.now() > entry.resetAt) {
    failures.set(ip, { count: 1, resetAt: Date.now() + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function clearFailedLogins(ip: string): void {
  failures.delete(ip);
}
