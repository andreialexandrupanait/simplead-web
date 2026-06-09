// Seed idempotent cu pachete placeholder. Prețurile de mentenanță vin din
// pagina /mentenanta existentă; pachetele de servicii sunt drafturi marcate
// [confirmă: ...] pe care Andrei le editează din /admin/pachete.
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.info('[seed] DATABASE_URL lipsește: sărim seed-ul.');
  process.exit(0);
}

const PACKAGES = [
  // Planuri de mentenanță (prețurile existente de pe /mentenanta).
  {
    kind: 'maintenance',
    slug: 'mentenanta-standard',
    name: 'Mentenanță Standard',
    description: 'Siguranță esențială: site-ul tău actualizat, salvat și sub supraveghere.',
    price_cents: 5000,
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
    price_cents: 9000,
    currency: 'EUR',
    interval: 'monthly',
    features: ['Backup zilnic', 'Securitate avansată', '3h modificări incluse'],
    sort: 20,
  },
  // Add-on-uri de mentenanță (prețurile existente de pe /mentenanta).
  {
    kind: 'addon',
    slug: 'addon-suport',
    name: '+2 ore suport tehnic',
    description: 'Ore suplimentare de intervenții și modificări, în același abonament.',
    price_cents: 4000,
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
    price_cents: 10000,
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
    price_cents: 3000,
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
    price_cents: 2500,
    currency: 'EUR',
    interval: 'monthly',
    features: [],
    sort: 40,
  },
  // Pachete de servicii: DRAFTURI. Andrei confirmă conținutul și prețurile.
  {
    kind: 'service',
    slug: 'site-prezentare',
    name: 'Site de prezentare',
    description:
      '[confirmă: descriere + preț] Site de prezentare pe design propriu, optimizat pentru viteză și SEO, gata de lansare.',
    price_cents: 0,
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
    price_cents: 0,
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
    price_cents: 0,
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

const sql = postgres(url, { max: 1 });
try {
  let inserted = 0;
  for (const p of PACKAGES) {
    const result = await sql`
      insert into packages (kind, slug, name, description, price_cents, currency, interval, features, sort)
      values (${p.kind}, ${p.slug}, ${p.name}, ${p.description}, ${p.price_cents}, ${p.currency},
              ${p.interval}, ${sql.json(p.features)}, ${p.sort})
      on conflict (slug) do nothing
    `;
    inserted += result.count;
  }
  console.info(
    `[seed] Gata: ${inserted} pachete inserate, ${PACKAGES.length - inserted} existau deja.`,
  );
} catch (err) {
  console.error('[seed] Seed-ul a eșuat:', err);
  process.exit(1);
} finally {
  await sql.end();
}
