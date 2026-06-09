import { createHmac, timingSafeEqual } from 'node:crypto';
import type { AstroCookies } from 'astro';
import { serverEnv } from './env';
import { safeEqual, verifyPassword } from './crypto';

export const SESSION_COOKIE = 'sa_admin';
const SESSION_TTL_S = 7 * 24 * 60 * 60; // 7 zile

/** Admin-ul e utilizabil doar cu secret de sesiune + credențiale setate. */
export function isAdminConfigured(): boolean {
  return Boolean(
    serverEnv('SESSION_SECRET') &&
    serverEnv('ADMIN_EMAIL') &&
    (serverEnv('ADMIN_PASSWORD_HASH') || serverEnv('ADMIN_PASSWORD')),
  );
}

function b64url(buf: Buffer): string {
  return buf.toString('base64url');
}

function sign(payload: string, secret: string): string {
  return b64url(createHmac('sha256', secret).update(payload).digest());
}

/** Token de sesiune stateless: `base64url(json).semnătură HMAC-SHA256`. */
export function createSessionToken(): string | null {
  const secret = serverEnv('SESSION_SECRET');
  if (!secret) return null;
  const now = Math.floor(Date.now() / 1000);
  const payload = b64url(
    Buffer.from(JSON.stringify({ sub: 'admin', iat: now, exp: now + SESSION_TTL_S }), 'utf8'),
  );
  return `${payload}.${sign(payload, secret)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const secret = serverEnv('SESSION_SECRET');
  if (!secret) return false;
  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;
  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(signature, 'utf8');
  const expBuf = Buffer.from(expected, 'utf8');
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return false;
  try {
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8')) as {
      sub?: string;
      exp?: number;
    };
    return data.sub === 'admin' && typeof data.exp === 'number' && data.exp > Date.now() / 1000;
  } catch {
    return false;
  }
}

export function setSessionCookie(cookies: AstroCookies, token: string): void {
  cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    path: '/',
    maxAge: SESSION_TTL_S,
  });
}

export function clearSessionCookie(cookies: AstroCookies): void {
  cookies.delete(SESSION_COOKIE, { path: '/' });
}

/** Verificare credențiale în timp constant (email + scrypt sau plaintext dev). */
export function verifyAdminCredentials(email: string, password: string): boolean {
  const adminEmail = serverEnv('ADMIN_EMAIL');
  if (!adminEmail) return false;
  const emailOk = safeEqual(email.trim().toLowerCase(), adminEmail.trim().toLowerCase());

  const hash = serverEnv('ADMIN_PASSWORD_HASH');
  let passwordOk = false;
  if (hash) {
    passwordOk = verifyPassword(password, hash);
  } else {
    const plain = serverEnv('ADMIN_PASSWORD');
    passwordOk = Boolean(plain) && safeEqual(password, plain!);
  }
  return emailOk && passwordOk;
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
