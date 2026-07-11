/**
 * Alocarea rutelor care au o variantă de redesign (v2). Modul pur (fără DB) ca
 * să poată fi importat în middleware fără cost. Căile sunt normalizate (fără
 * slash final, exceptând rădăcina) — vezi `normalizePath` din `@data/sections`.
 *
 * Doar rutele de aici sunt rescrise intern către `src/pages/v2/*` pentru
 * vizitatorii din varianta B. Restul (portofoliu, articol de blog, legal, 404,
 * admin, api…) rămân pe varianta A pentru toată lumea.
 */

/** Paginile „finale" cu design nou (mapare 1:1 către un fișier din `src/pages/v2`). */
const V2_EXACT = new Set<string>([
  '/', // Homepage (v6)
  '/despre',
  '/servicii',
  '/pachete',
  '/blog',
  '/contact',
  '/mentenanta',
  '/intrebari-frecvente',
]);

/**
 * Slug-urile de servicii redirecționate 301 din astro.config.mjs. Trebuie EXCLUSE
 * din v2, altfel middleware-ul le-ar rescrie înainte ca redirect-ul din config să
 * apuce să ruleze (middleware-ul rulează înaintea routing-ului Astro).
 */
const LEGACY_SERVICE_SLUGS = new Set<string>([
  '/servicii/marketing',
  '/servicii/web-design',
  '/servicii/grafica',
  '/servicii/mentenanta',
  '/servicii/mentenanta-website',
]);

/** True dacă ruta (normalizată) are o variantă v2 de servit. */
export function hasV2(norm: string): boolean {
  if (V2_EXACT.has(norm)) return true;
  // Paginile de detaliu servicii au v2, mai puțin slug-urile legacy redirecționate.
  if (norm.startsWith('/servicii/') && !LEGACY_SERVICE_SLUGS.has(norm)) return true;
  return false;
}

/** Calea internă v2 pentru o rută publică normalizată. */
export function v2Path(norm: string): string {
  return '/v2' + (norm === '/' ? '' : norm);
}

/** Elimină prefixul `/v2` → calea publică curată (pentru canonical/OG/301). */
export function stripV2(pathname: string): string {
  return pathname.replace(/^\/v2(?=\/|$)/, '') || '/';
}
