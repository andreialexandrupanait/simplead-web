import type { AstroCookies } from 'astro';

/**
 * Mesaje flash pentru admin (toast după un POST + redirect 303): cookie de
 * scurtă durată, citit și șters de AdminLayout la următorul render.
 */

const FLASH_COOKIE = 'sa_flash';

export type Flash = { kind: 'ok' | 'error'; msg: string };

export function setFlash(cookies: AstroCookies, flash: Flash): void {
  cookies.set(FLASH_COOKIE, JSON.stringify(flash), {
    path: '/admin',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 30,
  });
}

export function takeFlash(cookies: AstroCookies): Flash | null {
  const raw = cookies.get(FLASH_COOKIE)?.value;
  if (!raw) return null;
  cookies.delete(FLASH_COOKIE, { path: '/admin' });
  try {
    const parsed = JSON.parse(raw) as Flash;
    if (parsed && (parsed.kind === 'ok' || parsed.kind === 'error') && parsed.msg) return parsed;
    return null;
  } catch {
    return null;
  }
}
