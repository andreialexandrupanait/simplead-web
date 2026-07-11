import type { AstroCookies } from 'astro';
import { getDb } from './db';
import { abExposure } from './schema';

/**
 * Atribuirea variantei A/B pentru testul de redesign al site-ului.
 *
 * Varianta A = site-ul live actual (neatins). Varianta B = redesign-ul, servit
 * din arborele paralel `src/pages/v2/*` printr-un `rewrite()` intern (URL-ul
 * public rămâne curat). Vezi `src/data/ab-pages.ts` + `src/middleware.ts`.
 *
 * Cookie sticky ~90 de zile, valoare non-sensibilă (`a`/`b`), NU httpOnly ca să
 * poată fi citit și din client dacă e nevoie. Boții sunt fixați pe A (anti-cloaking).
 */

export type Variant = 'a' | 'b';

/** Cookie-ul principal de atribuire (sticky, alocat 50/50 la prima vizită). */
export const AB_COOKIE = 'sa_ab';
/** Cookie de „forțare" setat de override-ul QA `?v=` — supraviețuiește kill-switch-ului. */
export const AB_FORCE_COOKIE = 'sa_ab_force';

const MAX_AGE = 60 * 60 * 24 * 90; // ~90 de zile

/** Validează valoarea cookie-ului; orice altceva → null (realocare). */
export function readVariant(cookies: AstroCookies, name = AB_COOKIE): Variant | null {
  const v = cookies.get(name)?.value;
  return v === 'a' || v === 'b' ? v : null;
}

/** Scrie un cookie de variantă cu atributele standard. */
export function setVariantCookie(cookies: AstroCookies, name: string, variant: Variant): void {
  cookies.set(name, variant, {
    path: '/',
    httpOnly: false,
    sameSite: 'lax',
    secure: import.meta.env.PROD,
    maxAge: MAX_AGE,
  });
}

/** Alocare 50/50. Math.random e ok aici: runtime Node pe un request real. */
export function assignVariant(): Variant {
  return Math.random() < 0.5 ? 'a' : 'b';
}

/**
 * Crawler-e cunoscute → fixate pe varianta A (control), fără Set-Cookie. Astfel
 * Google vede mereu același HTML canonical și nu apare „cloaking"/flip-flop în index.
 */
const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|googlebot|bingbot|duckduckbot|baiduspider|yandex|applebot|petalbot|semrush|ahrefs|mj12bot|dotbot|facebookexternalhit|facebot|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|bytespider|gptbot|claudebot|claude-web|ccbot|google-inspectiontool|chrome-lighthouse|headlesschrome|pingdom|uptimerobot/i;

export function isBot(ua: string): boolean {
  return BOT_RE.test(ua);
}

/**
 * Înregistrează o expunere (un vizitator nou alocat) pentru statisticile din
 * /admin/experiment. Fire-and-forget + fail-safe: nu blochează și nu aruncă
 * niciodată în calea request-ului (fără DB / la eroare, pur și simplu renunță).
 */
export function recordExposure(variant: Variant, path: string): void {
  const db = getDb();
  if (!db) return;
  void (async () => {
    try {
      await db.insert(abExposure).values({ variant, path });
    } catch (err) {
      console.warn('[ab] recordExposure a eșuat:', err);
    }
  })();
}
