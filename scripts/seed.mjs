// Seed cu catalogul de pachete (prețuri fixe, EUR). Oglindește
// src/data/packages-fallback.ts. Sincronizează din cod: pe slug existent face
// UPDATE (atenție: suprascrie edițiile din /admin pe pachetele cu acel slug).
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
    description: 'Site nou, croit pe afacerea ta — fie o pagină, fie cincizeci.',
    price_cents: 150000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    feature_groups: [
      {
        heading: 'Ce facem, pe scurt',
        items: [
          'Structura site-ului pe pagini',
          'Grafică inițială generată cu AI',
          'Prelucrare grafică în Figma',
          'Implementare în WordPress',
        ],
      },
      {
        heading: 'SEO & optimizare',
        items: [
          'SEO on-page || Titluri, meta, structură, sitemap și indexare în Google',
          'Analytics, Search Console, GTM || Creăm și configurăm conturile (GA4, GSC, GTM) și tracking-ul de conversii',
          'Optimizat pe viteză și mobil || Cache, CDN, imagini optimizate și scor bun pe mobil',
        ],
      },
      {
        heading: 'Conținut & publicare',
        items: [
          'Meniu, header și footer',
          'Pagini legale + formular de contact || Confidențialitate, termeni, formular de contact și newsletter',
          'Verificări finale || Responsiveness pe toate dispozitivele, backup și securitate',
        ],
      },
    ],
    category: 'web',
    note: '',
    sort: 20,
  },
  {
    kind: 'service',
    slug: 'magazin-online',
    name: 'Magazin online',
    description: 'Magazin online care chiar vinde, nu doar arată — de la câteva produse la mii.',
    price_cents: 250000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    feature_groups: [
      {
        heading: 'Magazin WooCommerce',
        items: [
          'Construit pe WooCommerce (WordPress)',
          'Catalog de produse || Le urcăm noi pe primele, cu categorii, filtre și căutare',
          'Pagini de produs care vând || Imagini, descriere, preț și buton de comandă clar, gândite pe conversii',
          'Stocuri și disponibilitate || Vezi în timp real ce ai pe stoc',
        ],
      },
      {
        heading: 'Vânzare & plată',
        items: [
          'Plată cu cardul și curierat || Sisteme de plată cu cardul și curierat din România, configurate',
          'Facturare automată || Facturi emise automat (SmartBill)',
          'Coș și checkout optimizat || Checkout scurt și clar, gândit să reducă abandonul coșului',
        ],
      },
      {
        heading: 'Operare & predare',
        items: [
          'Conturi clienți și comenzi',
          'Training pe administrare || Te învățăm să adaugi produse și să gestionezi comenzile',
          'Tot din site de prezentare',
        ],
      },
    ],
    category: 'web',
    note: 'Prețul variază după numărul de produse și integrările third-party (curieri, ERP/facturare, feed-uri Google/marketplace). Îți dăm prețul exact după ce înțelegem ce ai de vândut.',
    sort: 30,
  },
  {
    kind: 'service',
    slug: 'ux-ui-redesign',
    name: 'UX/UI Redesign',
    description: 'Ne uităm la stadiul actual al site-ului tău și îi verificăm integritatea.',
    price_cents: 90000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    feature_groups: [
      {
        heading: 'Audit & strategie',
        items: [
          'Verificăm viteză, structură, SEO || Audit complet: viteză, structură, SEO, securitate și ce merită păstrat',
          'Analiză UX pe paginile cheie || Ce funcționează, ce încurcă vizitatorul și ce schimbăm',
          'Reparăm sau reconstruim, onest || Îți spunem sincer dacă merită reparat sau e mai bine de la zero',
          'Plan de migrare a conținutului',
        ],
      },
      {
        heading: 'Design & UX',
        items: [
          'Redesign complet pe identitatea ta',
          'Structură clară, pe conversii || Reorganizăm informația ca vizitatorul să ajungă ușor la acțiune',
          'Responsive, mobile-first',
        ],
      },
      {
        heading: 'Implementare & lansare',
        items: [
          'Reconstruit în WordPress',
          'Migrarea conținutului existent || Mutăm texte, imagini și pagini fără să pierzi poziții în Google',
          'Publicare și configurare tehnică || Domeniu, email, redirecturi 301 și indexare, fără downtime',
        ],
      },
    ],
    category: 'web',
    note: 'După un audit al site-ului actual îți spunem prețul exact. Dacă infrastructura e încărcată (zeci de plugin-uri, cod vechi), uneori e mai rapid și mai ieftin să reconstruim decât să cârpim — îți recomandăm varianta corectă, nu cea mai scumpă.',
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
      'Paletă de culori + tipografie',
      'Brand kit editabil (Canva/Figma) || Fișiere editabile, gata de folosit în Canva sau Figma',
      "Reguli de folosire (do & don't) || Cum se folosesc corect culorile, fonturile și logo-ul",
      'Aplicat pe materialele tale',
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
      'Vizualuri pentru social media + ads || Postări, story-uri și reclame, coerente cu brandul',
      'Materiale print (flyere, roll-up, cărți) || Flyere, roll-up, cărți de vizită și afișe, pregătite pentru tipar',
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
      'Poziționare + analiză concurență || Unde te situezi față de concurență și cum te diferențiezi',
      'Public-țintă + mesaje cheie',
      'Canale + plan de acțiune || Pe ce canale comunici și ce pași urmezi, lună de lună',
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
    features: [
      'Backup săptămânal',
      'Actualizări CMS',
      'Securitate',
      '1h modificări incluse || O oră de modificări de conținut incluse în fiecare lună',
    ],
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
      'Monitorizare continuă || Supraveghere 24/7, prindem problemele înainte să le vezi tu',
      'Securitate avansată',
      '3h modificări incluse || Trei ore de modificări de conținut incluse în fiecare lună',
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
  // Lucrări punctuale la preț fix (apar pe /servicii-rapide). Prețuri de pornire,
  // editabile din /admin/pachete.
  {
    kind: 'fix-service',
    slug: 'optimizare-viteza',
    name: 'Optimizare viteză site',
    description: 'Site mai rapid: cache, imagini, scripturi și scor mai bun pe mobil.',
    price_cents: 12000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [
      'Audit de viteză (PageSpeed/Core Web Vitals) || Măsurăm încărcarea pe mobil și desktop',
      'Cache + compresie + lazy-load imagini',
      'Curățare scripturi și plugin-uri grele',
      'Raport înainte/după',
    ],
    category: '',
    note: '',
    sort: 10,
  },
  {
    kind: 'fix-service',
    slug: 'configurare-email-pro',
    name: 'Configurare email profesional',
    description: 'Email pe domeniul tău, cu livrabilitate corectă (nu mai ajunge în spam).',
    price_cents: 9000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'fixed',
    features: [
      'Setup Google Workspace sau Microsoft 365',
      'Înregistrări SPF, DKIM, DMARC || Autentificarea care ține emailul departe de spam',
      'Migrarea emailurilor existente (opțional)',
      'Test de livrabilitate',
    ],
    category: '',
    note: '',
    sort: 20,
  },
  {
    kind: 'fix-service',
    slug: 'securizare-malware',
    name: 'Securizare & scanare malware',
    description: 'Curățăm site-ul infectat și îl securizăm ca să nu se repete.',
    price_cents: 13000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [
      'Scanare și curățare malware',
      'Hardening (parole, permisiuni, plugin-uri)',
      'Firewall și reguli de protecție',
      'Backup și monitorizare după curățare',
    ],
    category: '',
    note: 'Prețul final depinde de gravitatea infecției și de mărimea site-ului.',
    sort: 30,
  },
  {
    kind: 'fix-service',
    slug: 'migrare-site',
    name: 'Migrare site',
    description: 'Mutăm site-ul pe alt hosting sau domeniu, fără downtime și fără pierderi.',
    price_cents: 15000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [
      'Migrare fișiere + bază de date',
      'Configurare DNS și domeniu',
      'Redirecturi 301, fără pierderi SEO || Păstrăm pozițiile în Google după mutare',
      'Verificare SSL și funcționare',
    ],
    category: '',
    note: '',
    sort: 40,
  },
  {
    kind: 'fix-service',
    slug: 'setup-cloudflare',
    name: 'Setup & optimizare Cloudflare',
    description: 'CDN, cache și protecție prin Cloudflare, configurate corect.',
    price_cents: 8000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'fixed',
    features: [
      'Conectare domeniu la Cloudflare',
      'Cache și reguli de performanță',
      'WAF și protecție de bază',
      'SSL și redirecturi corecte',
    ],
    category: '',
    note: '',
    sort: 50,
  },
];

const sql = postgres(url, { max: 1 });
try {
  for (const p of PACKAGES) {
    const pricing = p.pricing ?? 'fixed';
    const featureGroups = p.feature_groups ?? null;
    await sql`
      insert into packages (kind, slug, name, description, price_cents, currency, interval, features, feature_groups, pricing, category, note, sort)
      values (${p.kind}, ${p.slug}, ${p.name}, ${p.description}, ${p.price_cents}, ${p.currency},
              ${p.interval}, ${sql.json(p.features)}, ${featureGroups ? sql.json(featureGroups) : null}, ${pricing}, ${p.category}, ${p.note}, ${p.sort})
      on conflict (slug) do update set
        kind = excluded.kind,
        name = excluded.name,
        description = excluded.description,
        price_cents = excluded.price_cents,
        currency = excluded.currency,
        interval = excluded.interval,
        features = excluded.features,
        feature_groups = excluded.feature_groups,
        pricing = excluded.pricing,
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
