/**
 * Fallback pentru pagina /pachete când baza de date lipsește sau e căzută.
 * Oglindește seed-ul (scripts/seed.mjs). Prețuri fixe, în EUR.
 */
/** Grup de beneficii (ex. „La început" vs „Lunar"). */
export interface FeatureGroup {
  heading: string;
  items: string[];
}

export interface DisplayPackage {
  kind: 'service' | 'maintenance' | 'addon';
  slug: string;
  name: string;
  description: string;
  priceCents: number;
  currency: string;
  interval: 'one_time' | 'monthly' | 'yearly';
  features: string[];
  /** Beneficii grupate; când e prezent, înlocuiește `features` la randare. */
  featureGroups?: FeatureGroup[] | null;
  /** Mod preț/CTA: 'fixed' (implicit) | 'from' („de la") | 'quote' (fără preț). */
  pricing?: 'fixed' | 'from' | 'quote';
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
    description: 'Site nou, croit pe afacerea ta — fie o pagină, fie cincizeci.',
    priceCents: 150000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    featureGroups: [
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
    priceCents: 250000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    featureGroups: [
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
    priceCents: 90000,
    currency: 'EUR',
    interval: 'one_time',
    pricing: 'from',
    features: [],
    featureGroups: [
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
    priceCents: 45000,
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
    priceCents: 35000,
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
    priceCents: 90000,
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
    priceCents: 7500,
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
    priceCents: 12000,
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
