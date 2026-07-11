/**
 * Cele 6 servicii (piloni). `icon` mapează la set-ul SVG din
 * src/components/ui/ServiceIcon.astro. Slug-urile corespund cu
 * src/data/nav.ts (servicesNav).
 *
 * Conținut original Simplead. Procesul („Cum lucrăm") e specific fiecărui
 * serviciu, iar FAQ-urile sunt rescrise în vocea Simplead (date/neuromarketing,
 * un singur partener) - nu mai sunt preluate de la terți.
 */
import type { Faq, AppTopic } from './content';

export type ServiceIcon = 'marketing' | 'grafica' | 'web' | 'mentenanta' | 'social' | 'ai';

/** Cheie scurtă de serviciu — leagă pagina de prețuri (serviceAnchors) și de clienți (LogoWall). */
export type ServiceKey = 'mentenanta' | 'ux-ui' | 'grafica' | 'social-media' | 'consultanta' | 'ai';

/** O capabilitate (card) pe pagina de detaliu serviciu. `icon` = markup SVG intern. */
export interface ServiceCapability {
  title: string;
  icon: string;
  desc: string;
  items: string[];
}

/** Un pas din procesul de lucru (acordeon pe pagina de detaliu). */
export interface ServiceProcessStep {
  n: string;
  title: string;
  body: string;
}

/** Caz / dovadă socială pe pagina de detaliu. */
export interface ServiceCaseStudy {
  statBig: string;
  statBigAccent: string;
  statCap: string;
  quote: string;
  body: string;
  client: string;
  clientNote: string;
  clientLogo: string;
}

/** S2 „Pentru cine" — un card: problemă + consecința ei („Te costă") + iconiță. */
export interface ForWhomItem {
  /** Inner SVG path (viewBox 0 0 24 24, stroke). */
  icon: string;
  problem: string;
  cost: string;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  /** Cheie scurtă (preț + clienți + cross-link). */
  key: ServiceKey;
  /** S2 „Pentru cine" — 3 situații de auto-identificare (paginile pilon). */
  forWhom?: ForWhomItem[];
  /** S9 „Servicii înrudite" — cheile celor 3 servicii cross-link. */
  related?: ServiceKey[];
  title: string;
  /** Sumar scurt (cardul de pe Acasă / hub). */
  summary: string;
  /** Titlu/claim pe pagina dedicată. */
  claim: string;
  /** A doua linie (mică) sub claim, în CTA-ul paginii. */
  claimSub: string;
  /** Descriere lungă (pagina dedicată). */
  description: string;
  /** Ce include - listă de bullet-uri. */
  includes: string[];
  /** Etichete scurte (cardurile hub din /servicii). */
  tags: string[];
  /** Imagine hero / card hub (placeholder Unsplash - de înlocuit cu real). */
  image: string;
  /** Titlul H1 pe pagina de detaliu (partea simplă + partea cu accent). */
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  capabilities: ServiceCapability[];
  capHead: { eyebrow: string; title: string; titleAccent: string; sub: string };
  process?: ServiceProcessStep[];
  caseStudy?: ServiceCaseStudy;
  /** Teme „în detaliu" (AppShowcase) — opțional, pentru pagini bogate (ex. consultanță). */
  topics?: AppTopic[];
  /** Modele de colaborare — carduri (refolosesc shape-ul de capabilitate). Opțional. */
  engagement?: ServiceCapability[];
  faqs: Faq[];
}

// Iconițe SVG (inner markup) pentru capabilități.
const ICON = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><path d="M4 9h16M4 15h16M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  bolt: '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12z"/>',
  megaphone: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 0 1-5.8-1.6"/>',
  target:
    '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 14l3-4 3 2 4-6"/>',
  shapes:
    '<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="11.5" r="2.5"/><circle cx="17" cy="15" r="3"/>',
  image:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  camera: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  shield:
    '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  support:
    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M18 19a2 2 0 0 0 2-2v-3h-3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2zM6 19a2 2 0 0 1-2-2v-3h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z"/>',
  brain:
    '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V15a3 3 0 0 0 4 2.8A3 3 0 0 0 12 19a3 3 0 0 0 3-1.2 3 3 0 0 0 4-2.8v-3.2A3 3 0 0 0 18 6a3 3 0 0 0-3-3 3 3 0 0 0-3 1.5A3 3 0 0 0 9 3z"/>',
  cog: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a7.8 7.8 0 0 0 0-2l1.6-1.3-1.6-2.8-2 .6a7.6 7.6 0 0 0-1.7-1l-.3-2H10.6l-.3 2a7.6 7.6 0 0 0-1.7 1l-2-.6L5 9.7 6.6 11a7.8 7.8 0 0 0 0 2L5 14.3l1.6 2.8 2-.6a7.6 7.6 0 0 0 1.7 1l.3 2h2.8l.3-2a7.6 7.6 0 0 0 1.7-1l2 .6 1.6-2.8L19.4 13z"/>',
  spark:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
} as const;

export const services: Service[] = [
  // ============================ 1. MENTENANȚĂ WEBSITE ============================
  {
    slug: 'mentenanta-website',
    icon: 'mentenanta',
    key: 'mentenanta',
    title: 'Mentenanță website',
    summary:
      'Tu te ocupi de afacere, noi de partea tehnică: actualizări, securitate, backup și monitorizare continuă.',
    claim: 'Tu te ocupi de afacere.',
    claimSub: 'Noi ne ocupăm de site.',
    description:
      'Îți monitorizăm site-ul continuu: actualizări, securitate, backup și optimizare de viteză, ca tu să te ocupi doar de afacere.',
    includes: [
      'Actualizări și backup-uri regulate',
      'Securitate și monitorizare uptime',
      'Mici modificări și suport prioritar',
      'Monitorizare continuă a site-ului',
      'Rapoarte de performanță',
    ],
    tags: ['Actualizări', 'Securitate', 'Backup', 'Monitorizare'],
    image:
      '/service-heroes/photo-1518770660439-4636190af475.webp',
    heroTitle: 'Tu te ocupi de afacere, ',
    heroTitleAccent: 'noi de partea tehnică',
    heroSub:
      'Ne ocupăm de actualizări, securitate, backup-uri, suport și de monitorizarea continuă a site-ului tău.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'Liniște tehnică, ',
      titleAccent: 'pe umerii noștri',
      sub: 'Trei zone de lucru care, împreună, țin site-ul la zi și te anunță înainte să apară o problemă.',
    },
    capabilities: [
      {
        title: 'Actualizări & Backup',
        icon: ICON.refresh,
        desc: 'Site-ul tău rămâne mereu la zi, cu copii de siguranță regulate, fără surprize.',
        items: [
          'Actualizări platformă & pluginuri',
          'Backup-uri regulate',
          'Restaurare rapidă la nevoie',
          'Verificări periodice',
        ],
      },
      {
        title: 'Securitate & Monitorizare',
        icon: ICON.shield,
        desc: 'Monitorizăm site-ul și îl protejăm, ca să rămână sigur și disponibil.',
        items: [
          'Monitorizare uptime',
          'Protecție & întărire securitate',
          'Scanare amenințări',
          'Optimizare viteză continuă',
        ],
      },
      {
        title: 'Suport & Monitorizare',
        icon: ICON.support,
        desc: 'Mici modificări, suport prioritar și monitorizare continuă a site-ului, plus rapoarte clare.',
        items: [
          'Mici modificări de conținut',
          'Suport prioritar',
          'Monitorizare continuă a site-ului',
          'Rapoarte de performanță',
        ],
      },
    ],
    caseStudy: {
      statBig: 'Simply',
      statBigAccent: 'professional',
      statCap: 'Clienți care ne încredințează partea tehnică, pe termen lung.',
      quote: '„Simply professional. Trustworthy, honest and creative."',
      body: 'O colaborare bazată pe încredere, în care partea tehnică nu mai e o grijă. Ne ocupăm de tot ce ține de funcționarea site-ului, ca afacerea să meargă mai departe fără opriri.',
      client: 'Bogdan Drăgan',
      clientNote: 'FEAA Galați',
      clientLogo: 'FE',
    },
    faqs: [
      {
        q: 'Ce intră într-un abonament de mentenanță?',
        body: [
          'Actualizări de platformă și module, backup-uri regulate, monitorizare de securitate și uptime, plus mici modificări și suport prioritar. La final primești un raport clar, fără jargon.',
        ],
      },
      {
        q: 'Ce rol are supravegherea automată?',
        body: [
          'Îl folosim pentru supraveghere non-stop, prinderea din vreme a problemelor și sarcinile repetitive: ca să intervenim mai repede și să prevenim, nu doar să reparăm. Deciziile importante rămân la oameni.',
        ],
      },
      {
        q: 'Preluați și site-uri făcute de altcineva?',
        body: [
          'Da. Ne uităm întâi la site-ul actual, identificăm riscurile și abia apoi îți propunem un plan de mentenanță potrivit pentru el.',
        ],
      },
      {
        q: 'Ce se întâmplă dacă pică site-ul?',
        body: [
          'Urmărim disponibilitatea și intervenim imediat. Cu backup-urile regulate putem readuce rapid site-ul la o versiune funcțională.',
        ],
      },
    ],
  },

  // ============================ 2. UX/UI & WEB DESIGN ============================
  {
    slug: 'ux-ui-web-design',
    icon: 'web',
    key: 'ux-ui',
    forWhom: [
      {
        icon: ICON.bolt,
        problem: 'Ai un site vechi și lent, care te trage în jos.',
        cost: 'Vizitatori care pleacă în câteva secunde și bani aruncați pe promovare.',
      },
      {
        icon: ICON.cog,
        problem: 'E greu de modificat singur, depinzi de altcineva pentru orice.',
        cost: 'Timp pierdut și o factură la fiecare schimbare mică.',
      },
      {
        icon: ICON.chart,
        problem: 'Arată bine, dar nu aduce clienți.',
        cost: 'Trafic irosit și vânzări care ajung direct la concurență.',
      },
    ],
    related: ['mentenanta', 'grafica', 'consultanta'],
    title: 'UX/UI & web design',
    summary:
      'Site-uri și magazine online rapide, clare, unde oamenii găsesc ce caută și știu ce să apese.',
    claim: 'Site-uri care chiar îți aduc clienți.',
    claimSub: 'Hai să construim unul împreună.',
    description:
      'Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și pornite de la cum aleg oamenii (neuromarketing).',
    includes: [
      'UX/UI design validat pe atenția vizuală',
      'Site-uri de prezentare (WordPress)',
      'Magazine online (WooCommerce)',
      'Optimizare pentru viteză și mobil',
      'SEO de bază la lansare',
    ],
    tags: ['UX/UI', 'WordPress', 'WooCommerce', 'SEO'],
    image:
      '/service-heroes/photo-1551434678-e076c223a692.webp',
    heroTitle: 'Site-uri și magazine online unde ',
    heroTitleAccent: 'oamenii găsesc ce caută și cumpără',
    heroSub:
      'De la site-uri de prezentare la magazine online: construim platforme rapide, clare și ușor de administrat. Plac oamenilor, le place și Google, și sunt gândite să aducă clienți.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la idee la ',
      titleAccent: 'rezultate',
      sub: 'Trei zone de lucru care, împreună, fac un site să arate bine și să muncească pentru tine.',
    },
    capabilities: [
      {
        title: 'UX/UI Design',
        icon: ICON.layout,
        desc: 'Structură clară și un design care ghidează vizitatorul exact unde vrei tu, pornit de la cum se uită și aleg oamenii (neuromarketing).',
        items: [
          'Arhitectură de conținut',
          'Wireframe & prototip',
          'Design responsive & mobile-first',
          'Ierarhie vizuală pe atenție',
          'Accesibilitate de bază',
        ],
      },
      {
        title: 'WordPress & WooCommerce',
        icon: ICON.globe,
        desc: 'Site-uri de prezentare și magazine online pe care le administrezi ușor, fără să depinzi de noi pentru orice modificare.',
        items: [
          'Site-uri de prezentare (WordPress)',
          'Magazine online (WooCommerce)',
          'Editare ușoară a conținutului',
          'Integrări plăți & curierat',
          'Structură scalabilă',
        ],
      },
      {
        title: 'SEO & Viteză',
        icon: ICON.bolt,
        desc: 'Un site rapid, găsit de Google și pregătit să convertească din prima zi.',
        items: [
          'Optimizare pentru viteză',
          'SEO de bază la lansare',
          'Optimizare mobil',
          'Tracking & conversii',
          'Bune practici tehnice',
        ],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Brief & obiective',
        body: 'Pornim de la afacerea ta: ce vrei să obții, cui te adresezi și ce trebuie să facă efectiv site-ul. Stabilim împreună structura, conținutul, bugetul și termenele: ca să lucrăm pe obiective clare.',
      },
      {
        n: '02',
        title: 'Arhitectură & wireframe',
        body: 'Înainte de design, așezăm scheletul: ce pagini, ce informație unde și pe ce drum trece vizitatorul. Aici intră prima dată partea de atenție vizuală, ca structura să ghideze spre acțiune.',
      },
      {
        n: '03',
        title: 'Design pe brand',
        body: 'Ducem scheletul într-un design clar, pe identitatea ta, gândit pe conversii și pe cum decid oamenii, dincolo de estetică.',
      },
      {
        n: '04',
        title: 'Dezvoltare & integrări',
        body: 'Construim site-ul: rapid, responsive și ușor de administrat de tine. Conectăm plăți, formulare, curierat sau orice altă unealtă de care ai nevoie.',
      },
      {
        n: '05',
        title: 'Lansare & optimizare',
        body: 'Testăm pe dispozitive și browsere, punem site-ul online cu SEO de bază făcut, apoi urmărim datele și ajustăm. Și rămânem aproape, cu mentenanță și suport.',
      },
    ],
    caseStudy: {
      statBig: '72+',
      statBigAccent: 'de proiecte',
      statCap: 'Afaceri care au ales Simplead pentru web și marketing.',
      quote: '„Platformă digitală de turism gastronomic"',
      body: 'Am dezvoltat un ecosistem digital complet pentru promovarea turismului gastronomic local, incluzând aplicații web și mobile, sistem de management al conținutului și funcționalități multilingve. Colaborarea a fost profesionistă, iar rezultatele au depășit așteptările.',
      client: 'Universitatea „Dunărea de Jos" din Galați',
      clientNote: 'Proiect Cross2Map',
      clientLogo: 'UGAL',
    },
    faqs: [
      {
        q: 'Cu ce construiți site-urile?',
        body: [
          'De obicei pe WordPress și WooCommerce, ca să le poți administra singur, fără să depinzi de noi pentru fiecare modificare. Când proiectul cere altceva, folosim soluții la comandă. Tehnologia o alegem după nevoia ta, nu invers.',
        ],
      },
      {
        q: 'În cât timp e gata un site?',
        body: [
          'Depinde de cât de complex e. Un site de prezentare se face de obicei în câteva săptămâni, un magazin online durează ceva mai mult. La prima discuție primești o estimare concretă, nu una „de complezență".',
        ],
      },
      {
        q: 'Cât costă?',
        body: [
          'Depinde de tip (site de prezentare, magazin online sau redesign) și de cât de complex e. Prețul exact îl stabilim după ce înțelegem ce ai nevoie. Vezi pachetele pe pagina Pachete.',
        ],
      },
      {
        q: 'Site-ul iese optimizat pentru Google?',
        body: [
          'Da. Pleacă la drum cu SEO de bază pus la punct (structură, viteză, versiune de mobil, meta), iar dacă vrei, continuăm cu o strategie SEO dedicată.',
        ],
      },
      {
        q: 'Aveți deja un site, îl puteți reface?',
        body: [
          'Sigur. Ne uităm la ce ai acum și îți spunem onest dacă merită îmbunătățit sau reconstruit de la zero. Păstrăm ce funcționează și schimbăm ce te ține pe loc.',
        ],
      },
    ],
  },

  // ============================ 3. GRAFICĂ PUBLICITARĂ ============================
  {
    slug: 'grafica-publicitara',
    icon: 'grafica',
    key: 'grafica',
    forWhom: [
      {
        icon: ICON.shapes,
        problem: 'Brandul tău arată diferit pe fiecare canal.',
        cost: 'Pari neîngrijit și greu de ținut minte de către clienți.',
      },
      {
        icon: ICON.image,
        problem: 'Materialele sunt făcute „de oricine", fără o linie clară.',
        cost: 'Mesaje slabe și o imagine care nu inspiră încredere.',
      },
      {
        icon: ICON.target,
        problem: 'Ai nevoie de o identitate coerentă, ușor de recunoscut.',
        cost: 'Fără ea, te confunzi cu zeci de concurenți la fel.',
      },
    ],
    related: ['ux-ui', 'social-media', 'consultanta'],
    title: 'Grafică publicitară',
    summary:
      'Identitate vizuală, materiale de promovare și grafică publicitară care te fac ușor de recunoscut, la fel peste tot.',
    claim: 'O imagine coerentă, ușor de recunoscut.',
    claimSub: 'Pornim de la o discuție.',
    description:
      'De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar fundamentat pe cum se uită și decid oamenii.',
    includes: [
      'Identitate vizuală & branding (sistem vizual, brand guide)',
      'Grafică publicitară (print, outdoor, social media)',
      'Materiale de prezentare (broșuri, cărți de vizită, prezentări)',
      'Design pornit de la unde se uită oamenii (heatmaps)',
    ],
    tags: ['Branding', 'Print', 'Outdoor', 'Neuromarketing'],
    image:
      '/service-heroes/photo-1561070791-2526d30994b5.webp',
    heroTitle: 'O imagine coerentă, ',
    heroTitleAccent: 'ușor de recunoscut',
    heroSub:
      'De la identitate vizuală și materiale de promovare, până la print și grafică publicitară. Simplu, dar pornit de la cum se uită și decid oamenii.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la identitate la ',
      titleAccent: 'materiale care vând',
      sub: 'Trei zone de lucru care, împreună, îți construiesc o imagine coerentă și ușor de recunoscut.',
    },
    capabilities: [
      {
        title: 'Identitate vizuală & Branding',
        icon: ICON.shapes,
        desc: 'Un brand coerent, de la regulile de folosire la aplicații, recognoscibil peste tot.',
        items: [
          'Sistem vizual coerent',
          'Brand guide complet',
          'Paletă, tipografie & elemente grafice',
          'Aplicații pe materiale',
        ],
      },
      {
        title: 'Grafică publicitară & Print',
        icon: ICON.image,
        desc: 'Materiale de promovare gândite să atragă atenția potrivită.',
        items: [
          'Print, outdoor & social media',
          'Grafică promoțională',
          'Adaptare coerentă pe canale',
          'Layout pornit de la unde se uită oamenii (heatmaps)',
        ],
      },
      {
        title: 'Materiale de prezentare',
        icon: ICON.layout,
        desc: 'Materialele cu care te prezinți, coerente între ele și gata de folosit.',
        items: [
          'Broșuri, cărți de vizită, prezentări',
          'Machete pentru print & online',
          'Layout & punere în pagină',
          'Punere în pagină gândită pe atenția cititorului',
        ],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Brief creativ',
        body: 'Pornim de la brandul tău, publicul lui și mesajul care contează. Strângem referințe și stabilim ce trebuie să comunice materialele, înainte să desenăm ceva.',
      },
      {
        n: '02',
        title: 'Concept & direcție',
        body: 'Propunem direcția vizuală: ton, paletă, tipografie, atmosferă. Alegem împreună drumul, ca să nu pierdem timp pe variante care nu te reprezintă.',
      },
      {
        n: '03',
        title: 'Execuție vizuală',
        body: 'Ducem conceptul în materiale concrete (identitate vizuală, grafică publicitară, print și materiale de prezentare), coerente între ele și gata de folosit.',
      },
      {
        n: '04',
        title: 'Mesaj clar',
        body: 'Ne asigurăm că materialele transmit exact ce trebuie: aplicăm principii din neuromarketing, ca mesajul important să fie ușor de văzut și de înțeles.',
      },
      {
        n: '05',
        title: 'Livrare',
        body: 'Predăm fișierele în toate formatele de care ai nevoie: print (CMYK, la rezoluția corectă) și online, plus regulile de folosire, ca totul să rămână coerent.',
      },
    ],
    caseStudy: {
      statBig: '10+',
      statBigAccent: 'ani',
      statCap: 'Experiență în foto-video și creație vizuală pentru branduri.',
      quote: '„Originalitate și claritate în soluțiile propuse."',
      body: 'Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră.',
      client: 'Silviu Costiniuc',
      clientNote: 'Echipamente-medicale.ro',
      clientLogo: 'EM',
    },
    faqs: [
      {
        q: 'Faceți și logo?',
        body: [
          'Pentru logo lucrăm cu parteneri dedicați. Noi ne ocupăm de identitatea vizuală din jurul lui (sistem vizual, brand guide, paletă, tipografie și aplicații pe materiale), ca brandul să arate coerent peste tot.',
        ],
      },
      {
        q: 'Vă ocupați și de foto-video?',
        body: [
          'Foto-video îl acoperim prin colaboratori, ca să ai tot ce-ți trebuie dintr-un loc. Nu e focusul nostru, dar te punem în legătură cu un fotograf cu experiență când proiectul cere.',
        ],
      },
      {
        q: 'Cum folosiți neuromarketingul în design?',
        body: [
          'Pornim de la cum percep și decid oamenii când văd un material și aplicăm principiile astea când îl punem în pagină. Așa mesajul principal e clar și ușor de prins, dincolo de cât de bine arată.',
        ],
      },
      {
        q: 'Primesc materialele și pentru print, și pentru online?',
        body: [
          'Da. Le predăm în formatele potrivite fiecărui canal: print (CMYK, rezoluție corectă) și online (web/social), gata de pus în folosință.',
        ],
      },
      {
        q: 'Cât costă?',
        body: [
          'Depinde de ce ai nevoie: un set de materiale, o identitate vizuală completă sau grafică recurentă lunară. Îți dăm o estimare concretă după o scurtă discuție. Vezi pachetele pe pagina Pachete.',
        ],
      },
    ],
  },

  // ============================ 4. SOCIAL MEDIA ============================
  {
    slug: 'social-media',
    icon: 'social',
    key: 'social-media',
    forWhom: [
      {
        icon: ICON.megaphone,
        problem: 'Postezi haotic, fără un plan în spate.',
        cost: 'Efort irosit pe conținut care nu duce nicăieri.',
      },
      {
        icon: ICON.support,
        problem: 'Ai o prezență „moartă", fără reacție din partea publicului.',
        cost: 'Un cont care nu-ți aduce nici clienți, nici încredere.',
      },
      {
        icon: ICON.chart,
        problem: 'Nu știi ce conținut îți aduce de fapt clienți.',
        cost: 'Bani și timp investiți în postări la întâmplare.',
      },
    ],
    related: ['grafica', 'consultanta', 'ux-ui'],
    title: 'Social media',
    summary: 'Conținut și prezență care aduc clienți reali, construite pe date.',
    claim: 'Prezență constantă, conținut care prinde.',
    claimSub: 'Hai să discutăm despre canalele tale.',
    description:
      'Administrăm prezența ta în social media cu strategie clară și conținut coerent: ce postezi, cum arăți și cum răspunzi. Construim o prezență care ține pe termen lung, pe canalele unde se află publicul tău.',
    includes: [
      'Strategie & calendar editorial',
      'Administrare conturi (Facebook, Instagram, TikTok, YouTube)',
      'Creație de conținut (vizual + copywriting)',
      'Community management & interacțiune',
      'Raportare și optimizare',
    ],
    tags: ['Strategie', 'Conținut', 'Comunitate', 'Raportare'],
    image:
      '/service-heroes/photo-1611162617474-5b21e879e113.webp',
    heroTitle: 'Social media care aduce ',
    heroTitleAccent: 'clienți, nu doar aprecieri',
    heroSub:
      'Prezență coerentă pe canalele unde se află publicul tău, conținut care prinde și o comunitate îngrijită. Cu măsurare reală, ca să știi ce aduce clienți.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la conținut la ',
      titleAccent: 'clienți reali',
      sub: 'Trei zone de lucru care, împreună, transformă atenția în rezultate.',
    },
    capabilities: [
      {
        title: 'Strategie & Conținut',
        icon: ICON.megaphone,
        desc: 'Un plan clar pe obiective și o prezență coerentă pe canalele potrivite.',
        items: [
          'Strategie de conținut',
          'Calendar editorial',
          'Creație vizuală & copywriting',
          'Administrare conturi',
        ],
      },
      {
        title: 'Publicare & Comunitate',
        icon: ICON.support,
        desc: 'Ținem prezența vie și constantă: publicăm la timp, răspundem, moderăm, menținem tonul.',
        items: [
          'Publicare constantă, după un plan',
          'Răspuns la comentarii & mesaje',
          'Moderare & ton consecvent',
          'Comunitate activă, nu doar postări',
        ],
      },
      {
        title: 'Analiză & Optimizare',
        icon: ICON.chart,
        desc: 'Măsurăm ce funcționează și ajustăm cu decizii pe date.',
        items: [
          'Tracking conversii & evenimente',
          'Rapoarte clare, pe înțelesul tău',
          'Heatmaps & atenție vizuală',
          'Optimizare continuă',
        ],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Audit & obiective',
        body: 'Ne uităm la ce ai acum, la concurență și la publicul tău, apoi stabilim obiective clare: ce vrei să obții din social media, dincolo de aprecieri.',
      },
      {
        n: '02',
        title: 'Strategie & calendar',
        body: 'Construim direcția de conținut și un calendar editorial pe canalele unde chiar se află publicul tău, ca să nu postăm „de dragul de a posta".',
      },
      {
        n: '03',
        title: 'Producție de conținut',
        body: 'Creăm vizualul și textul, coerente cu brandul, gata de publicat pe calendarul stabilit.',
      },
      {
        n: '04',
        title: 'Publicare & comunitate',
        body: 'Publicăm constant, conform planului, și ținem prezența vie: răspundem, ajustăm și menținem un ton consecvent, ca brandul să fie recognoscibil.',
      },
      {
        n: '05',
        title: 'Raportare & optimizare',
        body: 'Măsurăm ce funcționează cu date reale, raportăm clar, fără jargon, și optimizăm de la o lună la alta. Decizii pe cifre, nu pe impresii.',
      },
    ],
    caseStudy: {
      statBig: 'al doilea',
      statBigAccent: 'proiect',
      statCap: 'Clienți care revin pentru o nouă colaborare cu Simplead.',
      quote: '„Profesionalism, fairplay, pricepere, asumare."',
      body: 'Cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
      client: 'Ștefan Chelmu',
      clientNote: 'Blitzstudio',
      clientLogo: 'BS',
    },
    faqs: [
      {
        q: 'Pe ce rețele lucrați?',
        body: [
          'În principal Facebook, Instagram și TikTok, plus YouTube când are sens. Alegem canalele după publicul tău și obiectiv, nu „pe toate, ca să fie".',
        ],
      },
      {
        q: 'Creați conținutul sau doar îl publicați?',
        body: [
          'Îl creăm (vizual și text) și îl publicăm pe un calendar editorial clar. Dacă ai deja materiale bune, le integrăm în plan.',
        ],
      },
      {
        q: 'Câte postări includeți pe lună?',
        body: [
          'Pachetul de bază (2 canale) include 8-12 postări pe lună, iar cel complet (3 canale + rapoarte) 16-20. Calendarul editorial îl stabilim împreună, pe obiectivele tale.',
        ],
      },
      {
        q: 'Cât costă administrarea de social media?',
        body: [
          'Depinde de câte canale gestionăm și de cât conținut și raportare îți trebuie. Stabilim pachetul potrivit după o discuție despre obiectivele tale. Vezi pachetele pe pagina Pachete.',
        ],
      },
    ],
  },

  // ============================ 5. CONSULTANȚĂ DE MARKETING ============================
  {
    slug: 'consultanta-marketing',
    icon: 'marketing',
    key: 'consultanta',
    forWhom: [
      {
        icon: ICON.chart,
        problem: 'Dai bani pe marketing fără să știi ce funcționează.',
        cost: 'Buget ars pe canale care nu-ți aduc nimic înapoi.',
      },
      {
        icon: ICON.brain,
        problem: 'Iei decizii pe instinct, nu pe date.',
        cost: 'Greșeli scumpe pe care le-ai fi putut evita.',
      },
      {
        icon: ICON.target,
        problem: 'Vrei un plan clar, nu execuție haotică.',
        cost: 'Fără direcție, fiecare lună pornește de la zero.',
      },
    ],
    related: ['ux-ui', 'social-media', 'grafica'],
    title: 'Consultanță de marketing',
    summary:
      'Decizii pe date și neuromarketing, nu pe presupuneri. Strategie, poziționare și un plan clar de creștere.',
    claim: 'Marketing pe care te poți baza.',
    claimSub: 'Pornim cu un audit.',
    description:
      'Te ajutăm să iei deciziile de marketing potrivite, pornite de la date și de la analiza atenției vizuale (neuromarketing). Strategie, poziționare și un plan clar de creștere, pe obiective măsurabile.',
    includes: [
      'Strategie de marketing și de brand',
      'Audit și analiză (Analytics, tracking conversii)',
      'Neuromarketing: analiza atenției vizuale',
      'Poziționare și mesaje',
      'Plan de creștere pe obiective măsurabile',
    ],
    tags: ['Strategie', 'Neuromarketing', 'Analiză', 'Poziționare'],
    image:
      '/service-heroes/photo-1460925895917-afdab827c52f.webp',
    heroTitle: 'Marketing bazat pe ',
    heroTitleAccent: 'cercetare, nu pe noroc',
    // TODO[de confirmat]: formularea despre pregătirea academică (doctor vs doctorand, cine).
    heroSub:
      'Strategie și decizii pornite de la date și de la cum decid oamenii (neuromarketing). Pui bugetul exact unde mișcă acul, cu cineva care are și pregătire academică în marketing.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la presupuneri la ',
      titleAccent: 'decizii pe date',
      sub: 'Trei zone de lucru care, împreună, îți dau un marketing pe care te poți baza.',
    },
    capabilities: [
      {
        title: 'Strategie & Poziționare',
        icon: ICON.target,
        desc: 'Un plan clar de marketing și o poziționare care te diferențiază, pe obiective măsurabile.',
        items: [
          'Strategie de marketing & brand',
          'Poziționare și mesaje',
          'Public-țintă & canale',
          'Plan de creștere',
        ],
      },
      {
        title: 'Neuromarketing & Atenție vizuală',
        icon: ICON.brain,
        desc: 'Aplicăm ce știm din neuromarketing despre cum percep și aleg oamenii, ca mesajele și designul tău să comunice clar și să convingă.',
        items: [
          'Analiza atenției vizuale',
          'Analiză a ierarhiei vizuale',
          'Optimizare pe principii de neuromarketing',
          'Recomandări aplicate pe design și mesaj',
        ],
      },
      {
        title: 'Analiză & Raportare',
        icon: ICON.chart,
        desc: 'Date reale din Analytics și tracking de conversii, traduse în decizii clare.',
        items: [
          'Audit de marketing',
          'Tracking conversii & evenimente',
          'Rapoarte pe înțelesul tău',
          'Recomandări prioritizate',
        ],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Discuție & audit',
        body: 'Pornim de la unde ești: ce ai încercat, ce funcționează și ce nu. Ne uităm la datele existente și la prezența ta actuală, ca să avem o imagine reală.',
      },
      {
        n: '02',
        title: 'Cercetare',
        body: 'Studiem publicul, concurența și piața. Aici intră partea de neuromarketing (analiza atenției vizuale) și datele din Analytics, ca să lucrăm cu fapte, nu cu impresii.',
      },
      {
        n: '03',
        title: 'Strategie pe obiective',
        body: 'Transformăm concluziile într-o strategie clară: poziționare, mesaje, canale și obiective măsurabile. Știi exact ce urmărim și de ce.',
      },
      {
        n: '04',
        title: 'Plan de execuție',
        body: 'Îți dăm un plan concret, prioritizat, cu pași pe care îi poți urma, singur sau împreună cu noi, dacă vrei și partea de execuție.',
      },
      {
        n: '05',
        title: 'Măsurare & ajustare',
        body: 'Urmărim rezultatele cu date reale și ajustăm pe parcurs. Marketingul bun nu e o singură decizie, ci o serie de decizii corectate la timp.',
      },
    ],
    caseStudy: {
      statBig: 'doctorat',
      statBigAccent: 'în marketing',
      statCap: 'Cercetarea academică ajunge direct în proiectele tale.',
      quote: '„Originalitate și claritate în soluțiile propuse."',
      body: 'Decizii fundamentate pe cercetare, nu pe gust. Combinăm experiența academică în neuromarketing cu execuția practică, pentru rezultate pe care le poți măsura.',
      client: 'Andrei Panait',
      clientNote: 'panaitandrei.ro',
      clientLogo: 'AP',
    },
    // Secțiunea „Cum lucrăm, în detaliu" (AppShowcase) — miezul concret al paginii.
    topics: [
      {
        id: 'audit',
        icon: ICON.chart,
        eyebrow: 'Audit & diagnoză',
        title: 'Unde ești ',
        titleAccent: 'acum',
        intro:
          'Înainte de orice plan, ne uităm la realitate: ce ai deja, ce aduce rezultate și ce doar consumă buget. Pornim de la date, nu de la impresii.',
        cards: [
          {
            title: 'Audit al prezenței digitale',
            body: [
              'Trecem prin site, canale și conținut: ce comunici, cât de clar și unde pierzi oameni pe drum.',
              'Notăm problemele concrete, în ordinea în care merită rezolvate.',
            ],
          },
          {
            title: 'Analiza datelor existente',
            body: [
              'Ne uităm la trafic, surse, comportament și conversii (Analytics, tracking), ca să vedem ce funcționează cu adevărat, nu ce pare că funcționează.',
            ],
          },
          {
            title: 'Benchmark față de concurență',
            body: [
              'Comparăm poziționarea și mesajele tale cu ale concurenței directe, ca să vedem unde te diferențiezi și unde ești în urmă.',
            ],
          },
        ],
        faqs: [
          {
            q: 'Ce primesc la final?',
            body: [
              'Un raport de audit clar, cu problemele prioritizate și primii pași recomandați, pe înțelesul tău, fără jargon.',
            ],
          },
        ],
      },
      {
        id: 'public',
        icon: ICON.brain,
        eyebrow: 'Cercetare & public',
        title: 'Cui te ',
        titleAccent: 'adresezi',
        intro:
          'Marketingul bun pleacă de la oameni reali, nu de la „toată lumea". Definim cui vorbești, ce nevoi are și ce îl oprește să cumpere.',
        cards: [
          {
            title: 'Segmente și nevoi',
            body: [
              'Construim profilul publicului tău: cine e, ce caută, ce obiecții are și ce l-ar convinge să aleagă tocmai pe tine.',
            ],
          },
          {
            title: 'Atenția vizuală (neuromarketing)',
            body: [
              'Ne uităm la unde se duce privirea pe materialele tale cheie și cum reacționează oamenii, ca mesajul important să se vadă primul, nu să se piardă.',
            ],
          },
          {
            title: 'Concurență și piață',
            body: [
              'Analizăm ce fac alții și unde e loc de diferențiere, ca să nu te pierzi în zgomot.',
            ],
          },
        ],
        faqs: [
          {
            q: 'E nevoie să am deja date despre clienți?',
            body: [
              'Nu neapărat. Lucrăm cu ce ai; unde lipsesc datele, le strângem prin cercetare și analiză.',
            ],
          },
        ],
      },
      {
        id: 'strategie',
        icon: ICON.target,
        eyebrow: 'Strategie & poziționare',
        title: 'Planul, pe ',
        titleAccent: 'obiective',
        intro:
          'Transformăm concluziile într-o direcție clară: ce spui, cui, pe ce canale și cu ce rezultat țintești. Fără execuție haotică.',
        cards: [
          {
            title: 'Poziționare și mesaje',
            body: [
              'Stabilim cum te diferențiezi și traducem asta în mesaje pe care publicul tău le înțelege și le ține minte.',
            ],
          },
          {
            title: 'Canale și calendar',
            body: [
              'Alegem canalele care chiar îți aduc rezultate, cu un calendar realist și priorități clare, nu „să fim peste tot".',
            ],
          },
          {
            title: 'Obiective măsurabile (KPI)',
            body: [
              'Fixăm de la început ce urmărim și cum arată succesul, ca să nu mergem pe simțite.',
            ],
          },
        ],
        faqs: [
          {
            q: 'Strategia e doar un document sau ne și ajutați?',
            body: [
              'Primești un document de strategie clar. Și, dacă vrei, mergem mai departe împreună cu execuția. Tu alegi.',
            ],
          },
        ],
      },
      {
        id: 'masurare',
        icon: ICON.refresh,
        eyebrow: 'Măsurare & optimizare',
        title: 'Ținem ',
        titleAccent: 'scorul',
        intro:
          'Marketingul bun nu e o singură decizie, ci o serie de decizii corectate la timp. Măsurăm, învățăm și ajustăm.',
        cards: [
          {
            title: 'Tracking corect',
            body: [
              'Punem la punct urmărirea conversiilor și a evenimentelor importante, ca cifrele pe care le vezi să fie reale și de încredere.',
            ],
          },
          {
            title: 'Dashboard și rapoarte',
            body: [
              'Aduni metricile care contează într-un singur loc, cu rapoarte pe înțelesul tău, nu tablouri pline de cifre fără sens.',
            ],
          },
          {
            title: 'Optimizare continuă',
            body: [
              'Revedem periodic rezultatele și ajustăm direcția, ca bugetul să meargă tot mai bine în timp.',
            ],
          },
        ],
        faqs: [
          {
            q: 'Cât de des vedem rezultatele?',
            body: [
              'La retainer lunar primești un review lunar cu ce s-a întâmplat și ce ajustăm. La proiectele punctuale stabilim un moment de recalibrare.',
            ],
          },
        ],
      },
    ],
    faqs: [
      {
        q: 'Ce înseamnă „marketing pe neuromarketing"?',
        body: [
          'Înseamnă că pornim de la cum decid oamenii: analizăm unde se duce atenția pe materialele tale (analiza atenției vizuale) și ne uităm la date reale din Analytics. Așa pui bugetul acolo unde chiar mișcă acul.',
        ],
      },
      {
        q: 'Faceți doar consultanță sau și execuție?',
        body: [
          'Cum ai nevoie. Putem livra doar strategia și recomandările, sau să ducem mai departe și execuția (web, grafică, social media), fiind un singur partener pentru tot.',
        ],
      },
      {
        q: 'Pentru cine e potrivită consultanța?',
        body: [
          'Pentru orice afacere care vrea să crească cu decizii informate, de la firme mici la organizații mai mari. Pornim de la obiectivele tale, nu de la un șablon aplicat la toți.',
        ],
      },
      {
        q: 'Cât durează un audit?',
        body: [
          'De obicei 1-2 săptămâni, în funcție de cât de mult ai deja pus la punct și de câte canale analizăm.',
        ],
      },
      {
        q: 'Cu ce rămân după colaborare?',
        body: [
          'Cu livrabile concrete pe care le poți folosi: raportul de audit, documentul de strategie, planul pe canale și, unde e cazul, dashboard-ul de măsurare, nu doar o discuție.',
        ],
      },
      {
        q: 'Cât costă?',
        body: [
          'Depinde dacă vrei un audit + strategie punctual sau un retainer lunar continuu. Îți dăm o estimare după ce înțelegem unde ești și ce vrei să obții. Vezi pachetele pe pagina Pachete.',
        ],
      },
    ],
  },

  // ============================ 6. AI PENTRU BUSINESS ============================
  {
    slug: 'ai-pentru-business',
    icon: 'ai',
    key: 'ai',
    forWhom: [
      {
        icon: ICON.refresh,
        problem: 'Faci aceleași sarcini manuale în fiecare săptămână.',
        cost: 'Ore pierdute pe muncă pe care o poate face un sistem.',
      },
      {
        icon: ICON.bolt,
        problem: 'Uiți de follow-up-uri și de pașii repetitivi.',
        cost: 'Lead-uri scăpate și clienți care nu mai revin.',
      },
      {
        icon: ICON.cog,
        problem: 'Vrei timp înapoi, fără să angajezi pe cineva nou.',
        cost: 'Crești cu costuri fixe în loc de automatizări.',
      },
    ],
    related: ['mentenanta', 'consultanta', 'ux-ui'],
    title: 'AI pentru business',
    summary:
      'Automatizări, monitorizare și conținut asistate de AI: acolo unde îți cumpără timp, nu unde dă bine pe hârtie.',
    claim: 'Timp câștigat în fiecare săptămână.',
    claimSub: 'Hai să vedem ce automatizăm la tine.',
    description:
      'Nu vindem „AI" ca slogan. Ne uităm la procesele tale, găsim munca repetitivă care îți mănâncă timpul și o automatizăm: lead-uri, rapoarte, monitorizare, prime versiuni de conținut. Deciziile și relația cu clienții rămân la oameni.',
    includes: [
      'Automatizarea proceselor repetitive',
      'Monitorizare continuă, cu alerte înainte să observe clienții',
      'Conținut asistat: draft-uri rapide, rafinate de oameni',
      'Integrări cu uneltele pe care le folosești deja',
      'Consultanță onestă: unde merită AI-ul și unde nu',
    ],
    tags: ['Automatizări', 'Monitorizare AI', 'Conținut', 'Integrări'],
    image:
      '/service-heroes/photo-1677442136019-21780ecad995.webp',
    heroTitle: 'AI pentru business, ',
    heroTitleAccent: 'folosit cu cap',
    heroSub:
      'Îl folosim acolo unde e categoric mai bun decât omul: muncă repetitivă, supraveghere non-stop și prime versiuni de conținut. Restul rămâne la oameni.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'AI integrat în ',
      titleAccent: 'fluxurile tale',
      sub: 'Trei direcții în care AI-ul îți economisește ore în fiecare săptămână și prinde problemele înainte să le simtă clienții.',
    },
    capabilities: [
      {
        title: 'Automatizări',
        icon: ICON.cog,
        desc: 'Munca pe care o faci la fel în fiecare săptămână, făcută de sistem: fără uitări, fără „n-am apucat".',
        items: [
          'Lead-uri din formulare: evidență + notificare + confirmare automată către client',
          'Rapoarte periodice generate și trimise singure',
          'Programări cu confirmare și reamintire automată',
          'Integrări între uneltele pe care le folosești deja',
        ],
      },
      {
        title: 'Monitorizare cu AI',
        icon: ICON.spark,
        desc: 'Un ochi care nu obosește pe site-ul și sistemele tale: tu afli primul, nu clienții.',
        items: [
          'Site-ul urmărit non-stop: disponibilitate, viteză, certificat SSL',
          'Alerte imediate când ceva iese din parametri',
          'Probleme prinse devreme, înainte să devină urgențe',
          'Rapoarte clare despre ce s-a întâmplat și ce s-a făcut',
        ],
      },
      {
        title: 'Conținut asistat',
        icon: ICON.bolt,
        desc: 'AI-ul propune, omul rafinează și semnează: drumul de la pagina goală la publicat, scurtat serios.',
        items: [
          'Prime versiuni pentru postări, descrieri și articole',
          'Variante de mesaj pentru testare',
          'Adaptarea aceluiași conținut pe canale diferite',
          'Verificare și voce umană înainte de publicare, de fiecare dată',
        ],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Discuție despre procese',
        body: 'Pornim de la cum lucrezi azi: ce sarcini se repetă, ce îți mănâncă timp și unde apar erorile. Fără asta, „AI" rămâne doar un cuvânt.',
      },
      {
        n: '02',
        title: 'Identificăm ce se automatizează',
        body: 'Separăm munca repetitivă de cea care cere context uman și îți spunem onest unde merită AI și unde nu. Uneori răspunsul corect e „aici nu ai nevoie".',
      },
      {
        n: '03',
        title: 'Construim & integrăm',
        body: 'Punem automatizările la treabă și le conectăm cu uneltele pe care le folosești deja, ca să se potrivească în fluxul tău, nu invers.',
      },
      {
        n: '04',
        title: 'Testare & control uman',
        body: 'Verificăm că totul merge cum trebuie și păstrăm omul în buclă pentru deciziile importante și verificarea finală. AI-ul propune, omul confirmă.',
      },
      {
        n: '05',
        title: 'Monitorizare & optimizare',
        body: 'Urmărim cum se comportă în timp, prindem din vreme ce nu merge și îmbunătățim pe parcurs. Tu primești un rezumat clar, nu un sistem de care trebuie să ai grijă.',
      },
    ],
    // Activează secțiunea de dovadă socială pe pagina AI. Conținutul (statistică +
    // testimoniale) e comun, din src/data/testimonials.ts — câmpurile de mai jos
    // nu se mai randează momentan.
    caseStudy: {
      statBig: '12h',
      statBigAccent: '/săptămână',
      statCap: 'recuperate din munca repetitivă după automatizare.',
      quote: '„Rapoartele și confirmările se trimit singure, nu mai scapă niciun lead."',
      body: 'Am automatizat preluarea lead-urilor și raportarea săptămânală, cu monitorizare non-stop a site-ului. Oamenii iau deciziile; sistemul duce munca repetitivă, fără uitări.',
      client: 'Client demo',
      clientNote: 'de înlocuit cu o recomandare reală',
      clientLogo: 'AI',
    },
    faqs: [
      {
        q: 'AI-ul înlocuiește oamenii din echipă?',
        body: [
          'Nu, și nici nu îl folosim așa. Preia munca repetitivă: sortat, copiat, supravegheat, prime versiuni. Deciziile, relația cu clienții și verificarea finală rămân la oameni, fiindcă acolo contează contextul pe care doar ei îl au.',
        ],
      },
      {
        q: 'Cum știu dacă afacerea mea are nevoie de AI?',
        body: [
          'Regula simplă: dacă faci sarcini la fel, măcar săptămânal, e loc de automatizare. Pornim de la o discuție despre procesele tale și îți spunem cinstit unde ajută și unde nu merită.',
        ],
      },
      {
        q: 'Cât costă un proiect de AI pentru business?',
        body: [
          'Depinde de procesele pe care le automatizăm și de integrările necesare. După ce le mapăm împreună, îți dăm un preț exact. Vezi pachetele pe pagina Pachete.',
        ],
      },
      {
        q: 'Cât timp economisesc, de fapt?',
        body: [
          'Depinde de cât de repetitive sunt sarcinile, dar clienții recuperează de obicei câteva ore bune pe săptămână din munca de rutină. La audit îți spunem realist ce se poate automatiza la tine.',
        ],
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/**
 * URL-ul canonic al unui serviciu. `mentenanta-website` are pagină proprie la
 * `/mentenanta` (cu calculator); `/servicii/mentenanta-website` e doar un redirect
 * 301 în astro.config, deci NU trebuie linkat direct (ar fi un hop inutil, semnalat
 * de Screaming Frog). Un singur loc pentru regula asta.
 */
export function serviceHref(slug: string): string {
  return slug === 'mentenanta-website' ? '/mentenanta' : `/servicii/${slug}`;
}

/** Celelalte servicii (pentru secțiunea „Alte servicii"). */
export function relatedServices(slug: string): Service[] {
  return services.filter((s) => s.slug !== slug);
}

/** Serviciile corespunzătoare unor chei, în ordinea cheilor (pentru cross-link S9). */
export function servicesByKeys(keys: ServiceKey[]): Service[] {
  return keys.map((k) => services.find((s) => s.key === k)).filter((s): s is Service => Boolean(s));
}
