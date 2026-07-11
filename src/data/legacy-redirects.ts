/**
 * Redirect-uri 301 de la vechea structură WordPress la noul site Astro.
 *
 * Pe WordPress articolele stăteau la rădăcină (`/{slug}/`), acum sunt sub
 * `/blog/{slug}`; existau și pagini de categorie (`/categorie/…`, `/category/…`),
 * arhive pe dată (`/2020/04/`), autor (`/author/andrei/`) și feed (`/feed/`).
 * Toate acele URL-uri sunt indexate în Google / au backlink-uri, deci dau 404.
 *
 * Rezolvatorul e PUR (fără DB): middleware-ul îi pasează setul de slug-uri de
 * articol publicate, ca `/{slug}/` → `/blog/{slug}` să fie data-driven (acoperă
 * automat toate articolele, inclusiv cele viitoare). E izolat aici ca să fie
 * ușor de testat (`tests/legacy-redirects.test.ts`).
 */

/** Pagini vechi cu mapare 1:1 (chei normalizate: lowercase, fără trailing slash). */
export const LEGACY_EXACT: Record<string, string> = {
  '/despre-noi': '/despre',
  '/cu-ce-ne-ocupam': '/servicii',
  '/studii-de-caz': '/portofoliu',
  '/clienti': '/portofoliu',
  '/oferta-speciala': '/pachete',
  '/testimoniale': '/despre',
  '/politica-de-confidentialitate': '/confidentialitate',
  '/politica-de-cookies': '/cookies',
  '/politica-cookies': '/cookies',
  '/termeni-si-conditii': '/termeni',
  '/disclaimer': '/termeni',
  '/articole': '/blog',
  '/feed': '/rss.xml',
  '/comments/feed': '/rss.xml',
  // Articol vechi șters/necomigrat, dar cu potențiale backlink-uri.
  '/o-noua-etapa-pentru-simplead-in-2025': '/blog',
  // Vechea bază de portofoliu era scrisă greșit („portfoliu"); rutele noi folosesc
  // „portofoliu". Baza goală + proiectele individuale care au echivalent nou:
  '/portfoliu': '/portofoliu',
  '/portfoliu/identitate-vizuala-feaa-galati': '/portofoliu/branding-feaa-galati',
  '/clienti/blitzstudio': '/portofoliu/identitate-blitzstudio',
  '/clienti/facultatea-de-economie-si-administrarea-afacerilor': '/portofoliu/branding-feaa-galati',
  // Vechile pagini de servicii WordPress fără echivalent 1:1 nou. NU folosim un
  // catch-all pe /servicii/* — ar prinde paginile de serviciu noi (valide).
  '/servicii/branding': '/servicii/grafica-publicitara',
  '/servicii/mentenanta-web': '/mentenanta',
  '/servicii/web-development': '/servicii/ux-ui-web-design',
  '/servicii/optimizare-seo': '/servicii',
  '/servicii/poze-fotografii': '/servicii',
};

/**
 * Categorii WordPress → slugul categoriei noi (vezi `@data/categories` +
 * `slugify`). Valoare goală = fără echivalent, redirect spre `/blog`.
 */
const CATEGORY_MAP: Record<string, string> = {
  brand: 'branding',
  marketing: 'marketing-digital',
  webdesign: 'web-ux',
  design: 'grafica',
  resurse: '',
  general: '',
  uncategorized: '',
};

export interface LegacyRule {
  re: RegExp;
  to: (m: RegExpMatchArray) => string;
}

/** Reguli pe pattern (evaluate în ordine, după mapările exacte). */
export const LEGACY_RULES: LegacyRule[] = [
  // Categorii: /categorie/brand/ , /category/brand/ (+ /page/N ignorat).
  // Paginarea veche nu se păstrează: numărul de articole s-a redus la migrare,
  // deci /page/N vechi ar da lanț de redirect-uri. Pagina 1 a categoriei e
  // oricum o landing mai bună.
  {
    re: /^\/(?:categorie|category)\/([a-z0-9-]+)(?:\/page\/\d+)?$/,
    to: (m) => {
      const target = CATEGORY_MAP[m[1]];
      return target ? `/blog/category/${target}` : '/blog';
    },
  },
  // Paginarea vechiului index: /articole/page/N → /blog/page/N.
  {
    re: /^\/articole\/page\/(\d+)$/,
    to: (m) => (m[1] === '1' ? '/blog' : `/blog/page/${m[1]}`),
  },
  // Arhive de autor: /author/andrei/ (+ /page/N) → /blog.
  { re: /^\/author\/[a-z0-9-]+(?:\/page\/\d+)?$/, to: () => '/blog' },
  // Arhive pe dată: /YYYY/ , /YYYY/MM/ , /YYYY/MM/DD/ (+ /page/N) → /blog.
  { re: /^\/\d{4}(?:\/\d{2}(?:\/\d{2})?)?(?:\/page\/\d+)?$/, to: () => '/blog' },
  // Vechile pagini individuale de portofoliu/clienți → portofoliul nou. „portfoliu"
  // e spelling-ul vechi (typo), iar /clienti nu e rută nouă — deci catch-all-ul e
  // sigur. Mapările 1:1 către proiecte existente sunt în LEGACY_EXACT (au prioritate).
  { re: /^\/(?:clienti|portfoliu)\/[a-z0-9-]+$/, to: () => '/portofoliu' },
];

/** Normalizează un path: lowercase + fără trailing slash (păstrează „/"). */
export function normalizeLegacyPath(pathname: string): string {
  const lower = pathname.toLowerCase();
  const trimmed = lower.length > 1 ? lower.replace(/\/+$/, '') : lower;
  return trimmed || '/';
}

/**
 * Întoarce ținta 301 pentru un URL vechi, sau `null` dacă nu se aplică niciun
 * redirect (calea e servită normal mai departe).
 *
 * @param pathname calea cerută (ex. `/blog-uri-de-design/`)
 * @param slugSet slug-urile de articol publicate, pentru `/{slug}` → `/blog/{slug}`
 */
export function resolveLegacyRedirect(pathname: string, slugSet: Set<string>): string | null {
  const p = normalizeLegacyPath(pathname);
  if (p === '/') return null;

  const exact = LEGACY_EXACT[p];
  if (exact) return exact;

  for (const rule of LEGACY_RULES) {
    const m = p.match(rule.re);
    if (m) return rule.to(m);
  }

  // Articol la rădăcină: /{slug} → /blog/{slug} (doar dacă slugul chiar există).
  const single = p.match(/^\/([a-z0-9-]+)$/);
  if (single && slugSet.has(single[1])) return `/blog/${single[1]}`;

  return null;
}
