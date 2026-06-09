/**
 * Fallback pentru pagina /pachete când baza de date lipsește sau e căzută.
 * Oglindește seed-ul (scripts/seed.mjs). Prețurile 0 = draft de confirmat,
 * afișat cu marcaj [confirmă: ...] conform regulilor din docs/brand-voice.md.
 */
export interface DisplayPackage {
  kind: 'service' | 'maintenance' | 'addon';
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  interval: 'one_time' | 'monthly' | 'yearly';
  features: string[];
  sort: number;
}

export const fallbackPackages: DisplayPackage[] = [
  {
    kind: 'maintenance',
    slug: 'mentenanta-standard',
    name: 'Mentenanță Standard',
    description: 'Siguranță esențială: site-ul tău actualizat, salvat și sub supraveghere.',
    priceCents: 5000,
    currency: 'EUR',
    interval: 'monthly',
    features: ['Backup săptămânal', 'Actualizări CMS', '1h modificări incluse'],
    sort: 10,
  },
  {
    kind: 'maintenance',
    slug: 'mentenanta-premium',
    name: 'Mentenanță Premium',
    description: 'Performanță maximă: monitorizare continuă și intervenții prioritare.',
    priceCents: 9000,
    currency: 'EUR',
    interval: 'monthly',
    features: ['Backup zilnic', 'Securitate avansată', '3h modificări incluse'],
    sort: 20,
  },
  {
    kind: 'addon',
    slug: 'addon-suport',
    name: '+2 ore suport tehnic',
    description: 'Ore suplimentare de intervenții și modificări, în același abonament.',
    priceCents: 4000,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    sort: 10,
  },
  {
    kind: 'addon',
    slug: 'addon-seo',
    name: 'Optimizare SEO continuă',
    description: 'Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare.',
    priceCents: 10000,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    sort: 20,
  },
  {
    kind: 'addon',
    slug: 'addon-hosting',
    name: 'Găzduire premium dedicată',
    description: 'Server NVMe rapid, securitate extra.',
    priceCents: 3000,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    sort: 30,
  },
  {
    kind: 'addon',
    slug: 'addon-analytics',
    name: 'Raportare avansată Analytics',
    description: 'Rapoarte trafic & conversii + sugestii.',
    priceCents: 2500,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    sort: 40,
  },
  {
    kind: 'service',
    slug: 'site-prezentare',
    name: 'Site de prezentare',
    description:
      '[confirmă: descriere + preț] Site de prezentare pe design propriu, optimizat pentru viteză și SEO, gata de lansare.',
    priceCents: 0,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      '[confirmă: număr pagini incluse]',
      'Design pe identitatea ta vizuală',
      'Optimizare SEO de bază',
      'Formular de contact + analytics',
    ],
    sort: 10,
  },
  {
    kind: 'service',
    slug: 'identitate-vizuala',
    name: 'Identitate vizuală',
    description:
      '[confirmă: descriere + preț] Logo, culori, fonturi și regulile de folosire, într-un brand kit complet.',
    priceCents: 0,
    currency: 'EUR',
    interval: 'one_time',
    features: ['Logo + variante', 'Paletă de culori și fonturi', 'Brand kit livrat'],
    sort: 20,
  },
  {
    kind: 'service',
    slug: 'pachet-grafica',
    name: 'Pachet grafică publicitară',
    description:
      '[confirmă: descriere + preț] Materiale grafice pentru campanii: bannere, vizualuri social media, print.',
    priceCents: 0,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      '[confirmă: număr vizualuri incluse]',
      'Formate web + print',
      'Două runde de revizii',
    ],
    sort: 30,
  },
];
