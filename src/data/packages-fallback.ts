/**
 * Fallback pentru pagina /pachete când baza de date lipsește sau e căzută.
 * Oglindește seed-ul (scripts/seed.mjs). Prețuri fixe, în EUR.
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
  /** Grupare pe /pachete: '' | 'web' | 'grafica-marketing'. */
  category: string;
  /** Text-callout vizibil pe card (ex. precizarea despre logo). */
  note: string;
  sort: number;
}

export const fallbackPackages: DisplayPackage[] = [
  // Pachete web (dominante).
  {
    kind: 'service',
    slug: 'site-prezentare',
    name: 'Site de prezentare',
    description: 'Site nou, croit pe afacerea ta.',
    priceCents: 150000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'Design pe identitatea ta',
      'Gata în 2-4 săptămâni',
      'Optimizat SEO + viteză',
      'Îl punem live noi',
    ],
    category: 'web',
    note: '',
    sort: 20,
  },
  {
    kind: 'service',
    slug: 'magazin-online',
    name: 'Magazin online',
    description: 'Magazin care chiar vinde, nu doar arată.',
    priceCents: 250000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'WooCommerce, urcăm noi produsele',
      'Plăți cu cardul',
      'Livrare configurată',
      'Training să te descurci',
    ],
    category: 'web',
    note: '',
    sort: 30,
  },
  {
    kind: 'service',
    slug: 'ux-ui-redesign',
    name: 'UX/UI Redesign',
    description: 'Îți iei site-ul de la zero la respect.',
    priceCents: 90000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'Redesign complet',
      'Mai rapid, mai clar',
      'Optimizat SEO + viteză',
      'Mutăm noi conținutul',
    ],
    category: 'web',
    note: '',
    sort: 10,
  },
  // Pachete grafică & marketing (secundare).
  {
    kind: 'service',
    slug: 'identitate-vizuala',
    name: 'Identitate vizuală',
    description: 'Brandul tău, coerent peste tot.',
    priceCents: 45000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'Paletă culori + tipografie',
      'Brand kit editabil',
      'Aplicat pe materiale',
    ],
    category: 'grafica-marketing',
    note: 'Logo-uri nu facem. Te punem în legătură cu specialiști și construim identitatea în jurul lui.',
    sort: 40,
  },
  {
    kind: 'service',
    slug: 'pachet-grafica',
    name: 'Grafică publicitară',
    description: 'Vizualuri care opresc scrollul.',
    priceCents: 35000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'Pentru web + print',
      'Revizii incluse',
      'Fișiere finale + editabile',
    ],
    category: 'grafica-marketing',
    note: '',
    sort: 50,
  },
  {
    kind: 'service',
    slug: 'strategie-marketing',
    name: 'Strategie marketing',
    description: 'Un plan, nu intuiție.',
    priceCents: 90000,
    currency: 'EUR',
    interval: 'one_time',
    features: [
      'Poziționare + concurență',
      'Canale + plan de acțiune',
      'Document + prezentare',
    ],
    category: 'grafica-marketing',
    note: '',
    sort: 60,
  },
  // Planuri de mentenanță.
  {
    kind: 'maintenance',
    slug: 'mentenanta-standard',
    name: 'Mentenanță Standard',
    description: 'Backup, update-uri și mici modificări, le ținem noi.',
    priceCents: 7500,
    currency: 'EUR',
    interval: 'monthly',
    features: ['Backup săptămânal', 'Actualizări CMS', 'Securitate', '1h modificări incluse'],
    category: '',
    note: '',
    sort: 10,
  },
  {
    kind: 'maintenance',
    slug: 'mentenanta-premium',
    name: 'Mentenanță Premium',
    description: 'Te monitorizăm continuu și sărim primii când apare ceva.',
    priceCents: 12000,
    currency: 'EUR',
    interval: 'monthly',
    features: [
      'Monitorizare continuă',
      'Securitate avansată',
      '3h modificări incluse',
      'Priority support',
    ],
    category: '',
    note: '',
    sort: 20,
  },
  // Add-on-uri de mentenanță.
  {
    kind: 'addon',
    slug: 'addon-suport',
    name: '+2 ore suport tehnic',
    description: 'Ore suplimentare de intervenții și modificări, în același abonament.',
    priceCents: 4000,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    category: '',
    note: '',
    sort: 10,
  },
  {
    kind: 'addon',
    slug: 'addon-seo',
    name: 'SEO continuu',
    description: 'Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare.',
    priceCents: 15000,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    category: '',
    note: '',
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
    category: '',
    note: '',
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
    category: '',
    note: '',
    sort: 40,
  },
];
