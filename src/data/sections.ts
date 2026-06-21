/**
 * Liste canonice pentru vizibilitatea conținutului controlată din /admin/setari.
 * Modul pur (fără dependențe de server/DB) ca să poată fi importat și în
 * `admin-schemas.ts` fără să tragă Drizzle în bundle.
 */

/** Secțiunile de pe homepage care pot fi arătate/ascunse din admin. */
export const HOME_SECTIONS = [
  { key: 'hero', label: 'Hero' },
  { key: 'services', label: 'Servicii' },
  { key: 'differentiator', label: 'De ce Simplead' },
  { key: 'process', label: 'Proces' },
  { key: 'case-studies', label: 'Studii de caz' },
  { key: 'maintenance', label: 'Mentenanță' },
  { key: 'ai', label: 'AI pentru business' },
  { key: 'testimonials', label: 'Ce spun clienții' },
  { key: 'cta', label: 'CTA final' },
] as const;

/** Paginile principale care pot fi marcate „în construcție" din admin. */
export const TOGGLEABLE_PAGES = [
  { path: '/servicii', label: 'Servicii' },
  { path: '/pachete', label: 'Pachete' },
  { path: '/portofoliu', label: 'Portofoliu' },
  { path: '/despre', label: 'Despre' },
  { path: '/blog', label: 'Blog' },
  { path: '/resurse', label: 'Resurse' },
  { path: '/contact', label: 'Contact' },
  { path: '/mentenanta', label: 'Mentenanță' },
  { path: '/servicii-rapide', label: 'Servicii rapide' },
  { path: '/instrumente', label: 'Instrumente' },
  { path: '/suport', label: 'Suport tehnic' },
  { path: '/cere-suport', label: 'Cere suport' },
] as const;

export const SECTION_KEYS: string[] = HOME_SECTIONS.map((s) => s.key);
export const PAGE_PATHS: string[] = TOGGLEABLE_PAGES.map((p) => p.path);

/** Normalizează o cale pentru comparație (fără slash final, exceptând rădăcina). */
export function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) return pathname.slice(0, -1);
  return pathname;
}
