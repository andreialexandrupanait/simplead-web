// Seed cu catalogul de pachete (prețuri fixe, EUR). Oglindește
// src/data/packages-fallback.ts. Sincronizează din cod: pe slug existent face
// UPDATE (atenție: suprascrie edițiile din /admin pe pachetele cu acel slug).
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.info('[seed] DATABASE_URL lipsește: sărim seed-ul.');
  process.exit(0);
}

const PACKAGES = [
  // Pachete web (dominante).
  {
    kind: 'service',
    slug: 'site-prezentare',
    name: 'Site de prezentare',
    description: 'Site nou, croit pe afacerea ta.',
    price_cents: 150000,
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
    price_cents: 250000,
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
    price_cents: 90000,
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
    price_cents: 45000,
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
    price_cents: 35000,
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
    price_cents: 90000,
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
    price_cents: 7500,
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
    price_cents: 12000,
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
    price_cents: 4000,
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
    price_cents: 15000,
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
    price_cents: 3000,
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
    price_cents: 2500,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    category: '',
    note: '',
    sort: 40,
  },
];

const sql = postgres(url, { max: 1 });
try {
  for (const p of PACKAGES) {
    await sql`
      insert into packages (kind, slug, name, description, price_cents, currency, interval, features, category, note, sort)
      values (${p.kind}, ${p.slug}, ${p.name}, ${p.description}, ${p.price_cents}, ${p.currency},
              ${p.interval}, ${sql.json(p.features)}, ${p.category}, ${p.note}, ${p.sort})
      on conflict (slug) do update set
        kind = excluded.kind,
        name = excluded.name,
        description = excluded.description,
        price_cents = excluded.price_cents,
        currency = excluded.currency,
        interval = excluded.interval,
        features = excluded.features,
        category = excluded.category,
        note = excluded.note,
        sort = excluded.sort
    `;
  }
  console.info(`[seed] Gata: ${PACKAGES.length} pachete sincronizate din cod.`);
} catch (err) {
  console.error('[seed] Seed-ul a eșuat:', err);
  process.exit(1);
} finally {
  await sql.end();
}
