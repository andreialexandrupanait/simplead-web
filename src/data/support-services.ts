/**
 * Catalog de servicii tehnice/suport (catalogul de pe /servicii, sub piloni).
 * Paginile de detaliu folosesc EXACT șablonul paginilor de servicii pilon
 * (ServiceHero + CapabilitiesGrid + ServiceProcess + FaqSection + CtaNotch),
 * ca să fie 100% native site-ului.
 *
 * ➕ CUM ADAUGI UN SERVICIU NOU:
 *   1. Copiezi un obiect din `supportServices` și-i schimbi `slug`, `category`,
 *      `title`, textele. Atât: cardul din catalog + pagina de detaliu
 *      (/servicii/{slug}) se generează automat.
 *   2. `category` trebuie să fie unul dintre id-urile din `supportCategories`.
 *   3. `icon` (cardul din catalog) = o cheie din `SUPPORT_ICON`.
 *   4. `capabilities[].icon` = markup SVG (poți folosi tot din `SUPPORT_ICON`).
 *
 * Conținutul e o primă variantă publicabilă; se rafinează ulterior cu informații reale.
 */
import type { Faq } from './content';

export interface SupportCapability {
  title: string;
  /** Markup SVG inner (set:html). */
  icon: string;
  desc: string;
  items: string[];
}

export interface SupportProcessStep {
  n: string;
  title: string;
  body: string;
}

export interface SupportService {
  slug: string;
  category: SupportCategoryId;
  title: string;
  /** Descrierea de pe cardul din catalog. */
  cardSummary: string;
  /** Cheie în SUPPORT_ICON (cardul din catalog). */
  icon: SupportIconKey;
  /** Imagine hero (pagina de detaliu). */
  image: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroSub: string;
  /** Antetul grilei de capabilități. */
  capHead: { eyebrow: string; title: string; titleAccent: string; sub: string };
  /** Ce acoperim (3 carduri). */
  capabilities: SupportCapability[];
  /** Cum decurge (acordeon). */
  process: SupportProcessStep[];
  faqs: Faq[];
  /** Titlul CTA-ului final. */
  claim: string;
}

export type SupportCategoryId = 'web-hosting' | 'securitate-email' | 'suport-rapid';

export const supportCategories: { id: SupportCategoryId; label: string; sub: string }[] = [
  {
    id: 'web-hosting',
    label: 'Site & Web',
    sub: 'Site-ul tău reparat, mutat și construit — fără bătăi de cap tehnice.',
  },
  {
    id: 'securitate-email',
    label: 'Securitate & Email',
    sub: 'Domeniu protejat, emailuri în inbox, site rapid și sigur.',
  },
  {
    id: 'suport-rapid',
    label: 'Suport rapid',
    sub: 'Când arde sau când e o singură treabă de rezolvat, intervenim pe loc.',
  },
];

/** Iconițe (inner SVG, viewBox 0 0 24 24, stroke). */
export type SupportIconKey =
  | 'support'
  | 'server'
  | 'refresh'
  | 'spark'
  | 'shield'
  | 'mail'
  | 'bolt'
  | 'wrench';

export const SUPPORT_ICON: Record<SupportIconKey, string> = {
  support:
    '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M18 19a2 2 0 0 0 2-2v-3h-3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2zM6 19a2 2 0 0 1-2-2v-3h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z"/>',
  server:
    '<rect x="3" y="3" width="18" height="8" rx="2"/><rect x="3" y="13" width="18" height="8" rx="2"/><path d="M7 7h.01M7 17h.01"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  spark:
    '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
  shield:
    '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  bolt: '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12z"/>',
  wrench:
    '<path d="M14.7 6.3a4 4 0 0 0-5.4 5.2L4 16.8 7.2 20l5.3-5.3a4 4 0 0 0 5.2-5.4l-2.5 2.5-2.3-2.3 2.3-2.3z"/>',
};

const IMG = (id: string) => `https://images.unsplash.com/${id}?w=900&q=78&auto=format&fit=crop`;

export const supportServices: SupportService[] = [
  // ===================== WEB & HOSTING =====================
  {
    slug: 'wordpress-support',
    category: 'web-hosting',
    title: 'Suport WordPress',
    cardSummary:
      'Reparăm conflicte de plugin, erori fatale și site-uri căzute, și ținem WordPress-ul tău actualizat și sigur.',
    icon: 'support',
    image: IMG('photo-1551434678-e076c223a692'),
    heroTitle: 'Suport WordPress, ',
    heroTitleAccent: 'fără bătăi de cap.',
    heroSub:
      'Când WordPress-ul se blochează în cel mai prost moment, intervenim noi: diagnosticăm problema, o reparăm și îți explicăm ce s-a întâmplat. Tu te ții de afacere, noi de site.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Ce rezolvăm pe ',
      titleAccent: 'WordPress',
      sub: 'De la urgențe la întreținerea de zi cu zi, ne ocupăm de partea tehnică ca site-ul tău să meargă.',
    },
    capabilities: [
      {
        title: 'Reparare & depanare',
        icon: SUPPORT_ICON.support,
        desc: 'Când ceva s-a stricat, găsim cauza și o reparăm.',
        items: [
          'Ecran alb și erori fatale',
          'Conflicte de plugin sau temă',
          'Erori 500 și pagini căzute',
        ],
      },
      {
        title: 'Întreținere & securitate',
        icon: SUPPORT_ICON.shield,
        desc: 'Ținem site-ul actualizat, salvat și protejat.',
        items: [
          'Update-uri de WordPress, teme și plugin-uri',
          'Backup și restore',
          'Curățare după hack',
        ],
      },
      {
        title: 'WooCommerce & funcționalități',
        icon: SUPPORT_ICON.refresh,
        desc: 'Magazinul și funcțiile importante, puse la punct.',
        items: ['Checkout și plăți reparate', 'Emailuri de comandă', 'Optimizare viteză'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Ne dai contextul și accesul',
        body: 'Îmi spui domeniul, ce s-a întâmplat și de când, plus accesul de care e nevoie (admin, hosting sau FTP).',
      },
      {
        n: '02',
        title: 'Ne apucăm de rezolvat',
        body: 'Găsim cauza și o reparăm. Poți urmări pe ecran sau ne lași să lucrăm și revenim când e gata.',
      },
      {
        n: '03',
        title: 'Rămâi cu un site care merge',
        body: 'Testăm tot și, dacă mai apare ceva pe aceeași problemă, revenim fără discuții.',
      },
    ],
    faqs: [
      {
        q: 'Puteți repara site-ul dacă nu mai avem acces în admin?',
        body: [
          'Da. Lucrăm și prin hosting sau FTP/SFTP. De multe ori tocmai pierderea accesului în admin e problema pe care o rezolvăm.',
        ],
      },
      {
        q: 'Lucrați cu page buildere (Elementor, Divi, Beaver)?',
        body: ['Da, lucrăm cu cele mai folosite page buildere și cu teme custom.'],
      },
      {
        q: 'Faceți și update-uri și mentenanță continuă?',
        body: [
          'Da. Dacă vrei să nu mai ajungi în situații de urgență, îți putem ține site-ul sub mentenanță lunară.',
        ],
      },
      {
        q: 'Cât de repede răspundeți?',
        body: [
          'Pentru situațiile urgente intervenim cât de repede putem în timpul programului. Spune-ne contextul și îți dăm un timp realist.',
        ],
      },
    ],
    claim: 'Suport WordPress când ai nevoie de el.',
  },
  {
    slug: 'migrare-site',
    category: 'web-hosting',
    title: 'Migrare site',
    cardSummary:
      'Mutăm site-ul pe alt hosting, domeniu sau platformă fără downtime și fără să pierzi date sau poziții în Google.',
    icon: 'refresh',
    image: IMG('photo-1561070791-2526d30994b5'),
    heroTitle: 'Migrare site, ',
    heroTitleAccent: 'fără downtime.',
    heroSub:
      'Schimbi hosting-ul, domeniul sau platforma? Mutăm tot (fișiere, bază de date, emailuri, redirecturi) și verificăm înainte să facem schimbarea live, ca vizitatorii să nu simtă nimic.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Mutăm tot, ',
      titleAccent: 'în siguranță',
      sub: 'Plus verificarea de dinainte și de după, ca să nu pierzi nimic pe drum.',
    },
    capabilities: [
      {
        title: 'Mutare completă',
        icon: SUPPORT_ICON.refresh,
        desc: 'Tot ce ține de site se mută, nu doar fișierele.',
        items: ['Fișiere și bază de date', 'Emailuri de pe domeniu', 'Conținut și media'],
      },
      {
        title: 'Fără downtime',
        icon: SUPPORT_ICON.shield,
        desc: 'Schimbarea o facem live abia când e totul gata.',
        items: ['Pregătire pe staging', 'Testare înainte de live', 'Schimbare DNS controlată'],
      },
      {
        title: 'SEO păstrat',
        icon: SUPPORT_ICON.spark,
        desc: 'Traficul și pozițiile rămân pe loc.',
        items: ['Redirecturi 301', 'Structură de linkuri', 'Verificare după mutare'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Pregătim mutarea',
        body: 'Inventariem ce mutăm (site, bază de date, emailuri, redirecturi) și pregătim totul pe staging.',
      },
      {
        n: '02',
        title: 'Mutăm și testăm',
        body: 'Copiem tot pe noul server și verificăm pagini, formulare, plăți și emailuri înainte de live.',
      },
      {
        n: '03',
        title: 'Facem live după confirmare',
        body: 'Schimbăm DNS-ul când ești de acord și monitorizăm imediat după, ca să prindem orice scapă.',
      },
    ],
    faqs: [
      {
        q: 'Cât durează o migrare?',
        body: [
          'Depinde de mărimea site-ului. Un site obișnuit se mută rapid; unul mare, cu magazin, cere mai mult. Îți dăm o estimare după ce ne uităm.',
        ],
      },
      {
        q: 'Pierd pozițiile în Google?',
        body: [
          'Nu, dacă migrarea e făcută cu redirecturi corecte. Tocmai de aceea le tratăm cu atenție și verificăm după mutare.',
        ],
      },
      {
        q: 'Site-ul rămâne jos în timpul mutării?',
        body: [
          'Nu. Pregătim totul în paralel și schimbăm live abia la final, ca vizitatorii să nu simtă mutarea.',
        ],
      },
    ],
    claim: 'Mutăm site-ul, tu nu pierzi nimic.',
  },
  {
    slug: 'site-astro-ai',
    category: 'web-hosting',
    title: 'Site-uri Astro cu AI',
    cardSummary:
      'Construim site-uri rapide pe Astro, cu AI în fluxul de lucru ca să livrăm mai repede cod curat și ușor de întreținut.',
    icon: 'spark',
    image: IMG('photo-1677442136019-21780ecad995'),
    heroTitle: 'Site-uri Astro, ',
    heroTitleAccent: 'construite cu AI.',
    heroSub:
      'Site-uri statice rapide, sigure și ieftine de găzduit, construite pe Astro. Folosim AI în fluxul de lucru ca să ajungem mai repede la rezultat, dar structura și deciziile de design rămân la noi.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Un site rapid, ',
      titleAccent: 'construit cu cap',
      sub: 'AI-ul ne ajută să mergem mai repede, dar design-ul și deciziile rămân la noi.',
    },
    capabilities: [
      {
        title: 'Site rapid pe Astro',
        icon: SUPPORT_ICON.spark,
        desc: 'Pagini statice care se încarcă instant.',
        items: ['Pagini statice, instant', 'Cost de hosting mic', 'SEO tehnic'],
      },
      {
        title: 'Construit cu AI în flux',
        icon: SUPPORT_ICON.bolt,
        desc: 'Mai repede pe părțile repetitive, fără rabat la calitate.',
        items: ['Cod curat, predabil', 'Livrare mai rapidă', 'Deciziile le ținem noi'],
      },
      {
        title: 'Livrare & integrare',
        icon: SUPPORT_ICON.refresh,
        desc: 'Punem site-ul live și ți-l predăm gata de folosit.',
        items: ['Cloudflare / CDN', 'Predare și instruire', 'Ușor de actualizat'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Stabilim structura',
        body: 'Vorbim despre ce conținut și ce pagini ai nevoie și cum trebuie să fie organizate.',
      },
      {
        n: '02',
        title: 'Construim cu AI în flux',
        body: 'Folosim AI ca să mergem mai repede pe părțile repetitive, dar design-ul și deciziile le ținem noi.',
      },
      {
        n: '03',
        title: 'Livrăm și predăm',
        body: 'Punem site-ul live, îl conectăm la hosting/CDN și îți arătăm cum îl actualizezi singur.',
      },
    ],
    faqs: [
      {
        q: 'Ce e Astro și de ce un site static?',
        body: [
          'Astro construiește site-uri statice: pagini gata făcute, foarte rapide, sigure și ieftine de găzduit. Ideal pentru site-uri de prezentare, blog și landing.',
        ],
      },
      {
        q: 'Folosiți AI, dar cine decide cum arată?',
        body: [
          'AI-ul ne ajută să lucrăm mai repede pe părțile repetitive. Structura, design-ul și deciziile finale rămân la noi.',
        ],
      },
      {
        q: 'Pot actualiza singur site-ul după?',
        body: [
          'Da. Îți predăm un site curat și îți arătăm cum modifici conținutul fără să strici nimic.',
        ],
      },
    ],
    claim: 'Un site rapid, gata mai repede.',
  },
  // ===================== SECURITATE & EMAIL =====================
  {
    slug: 'cloudflare-support',
    category: 'securitate-email',
    title: 'Suport Cloudflare',
    cardSummary:
      'Configurăm și optimizăm Cloudflare: DNS, SSL, cache, reguli și protecție anti-atac, ca site-ul să fie rapid și protejat.',
    icon: 'shield',
    image: IMG('photo-1611162617474-5b21e879e113'),
    heroTitle: 'Suport Cloudflare, ',
    heroTitleAccent: 'rapid și protejat.',
    heroSub:
      'Cloudflare poate face site-ul mai rapid și mai sigur, dacă e configurat corect. Ne ocupăm de DNS, SSL, cache, reguli și protecție, ca tu să nu te lupți cu panoul.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Cloudflare, ',
      titleAccent: 'configurat corect',
      sub: 'Viteză și securitate, fără să blochezi clienții reali.',
    },
    capabilities: [
      {
        title: 'Viteză & cache',
        icon: SUPPORT_ICON.spark,
        desc: 'Conținutul ajunge repede la vizitatori.',
        items: ['Cache și CDN', 'Optimizare performanță', 'Reguli de cache'],
      },
      {
        title: 'Securitate',
        icon: SUPPORT_ICON.shield,
        desc: 'Oprim abuzul fără să blocăm traficul real.',
        items: ['Firewall / WAF', 'Protecție anti-DDoS', 'Reguli anti-bot'],
      },
      {
        title: 'DNS & cont',
        icon: SUPPORT_ICON.server,
        desc: 'Domeniul și contul, puse curat.',
        items: ['DNS și SSL', 'Configurare cont', 'Schimbare domeniu'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Ne uităm la cont și domeniu',
        body: 'Vedem cum e configurat acum și ce vrei să obții: viteză, securitate sau ambele.',
      },
      {
        n: '02',
        title: 'Configurăm corect',
        body: 'Punem la punct DNS, SSL, cache și regulile de protecție, fără să blocăm traficul real.',
      },
      {
        n: '03',
        title: 'Verificăm și îți explicăm',
        body: 'Testăm viteza și protecția și îți lăsăm pe scurt ce am setat, ca să știi ce ai.',
      },
    ],
    faqs: [
      {
        q: 'Am nevoie de un cont Cloudflare plătit?',
        body: [
          'De cele mai multe ori planul gratuit acoperă ce ai nevoie. Dacă un plan plătit chiar îți aduce un plus, îți spunem direct.',
        ],
      },
      {
        q: 'Cloudflare chiar face site-ul mai rapid?',
        body: [
          'Da, configurat corect: cache și CDN apropie conținutul de vizitatori și descarcă serverul tău.',
        ],
      },
      {
        q: 'Mă ajutați și dacă sunt sub atac acum?',
        body: ['Da. Putem activa rapid protecția și regulile de firewall ca să oprim abuzul.'],
      },
    ],
    claim: 'Cloudflare configurat cum trebuie.',
  },
  {
    slug: 'dmarc',
    category: 'securitate-email',
    title: 'Configurare & monitorizare DMARC',
    cardSummary:
      'Setăm SPF, DKIM și DMARC ca emailurile tale să ajungă în inbox, nu în spam, și monitorizăm cine trimite în numele domeniului.',
    icon: 'mail',
    image: IMG('photo-1460925895917-afdab827c52f'),
    heroTitle: 'DMARC configurat și ',
    heroTitleAccent: 'monitorizat.',
    heroSub:
      'Protejăm domeniul tău de email și îl ajutăm să ajungă în inbox. Setăm SPF, DKIM și DMARC corect, apoi monitorizăm rapoartele ca să prindem abuzurile și problemele de livrare.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Email autentificat, ',
      titleAccent: 'în inbox',
      sub: 'Configurare corectă plus monitorizare, ca să nu rămâi cu rapoarte pe care nu le citește nimeni.',
    },
    capabilities: [
      {
        title: 'Autentificare email',
        icon: SUPPORT_ICON.mail,
        desc: 'Toate înregistrările puse și aliniate.',
        items: ['SPF, DKIM, DMARC', 'Aliniere servicii', 'Configurare pe domeniu'],
      },
      {
        title: 'Anti-spoofing',
        icon: SUPPORT_ICON.shield,
        desc: 'Oprim falsurile trimise în numele tău.',
        items: ['Oprire falsuri', 'Politică treptată', 'Enforcement sigur'],
      },
      {
        title: 'Monitorizare',
        icon: SUPPORT_ICON.spark,
        desc: 'Citim rapoartele și prindem problemele.',
        items: ['Citire rapoarte', 'Alerte de abuz', 'Livrare în inbox'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Analizăm domeniul',
        body: 'Vedem ce înregistrări ai acum și cine trimite email în numele tău, legitim sau nu.',
      },
      {
        n: '02',
        title: 'Setăm și aliniem',
        body: 'Configurăm SPF, DKIM și DMARC și aliniem toate serviciile care trimit pentru tine.',
      },
      {
        n: '03',
        title: 'Monitorizăm și înăsprim',
        body: 'Urmărim rapoartele, prindem abuzurile și creștem treptat politica până la enforcement sigur.',
      },
    ],
    faqs: [
      {
        q: 'Ce înseamnă, pe scurt, DMARC?',
        body: [
          'E o regulă pe domeniul tău care spune ce să facă serverele cu emailurile ce par a fi de la tine, dar nu sunt. Împreună cu SPF și DKIM, oprește falsurile și îți crește livrarea.',
        ],
      },
      {
        q: 'O să-mi blocați emailurile reale?',
        body: [
          'Nu. Tocmai de aceea creștem politica treptat și monitorizăm rapoartele, ca enforcement-ul să prindă doar falsurile.',
        ],
      },
      {
        q: 'Merge și dacă trimit din mai multe locuri?',
        body: [
          'Da, aliniem toate serviciile (workspace, newsletter, facturare) ca să treacă autentificarea.',
        ],
      },
    ],
    claim: 'Emailuri în inbox, domeniu protejat.',
  },
  // ===================== SUPORT RAPID =====================
  {
    slug: 'suport-urgenta',
    category: 'suport-rapid',
    title: 'Suport de urgență',
    cardSummary:
      'Site căzut, hack sau eroare critică? Intervenim rapid în timpul programului ca să te repunem pe picioare.',
    icon: 'bolt',
    image: IMG('photo-1518770660439-4636190af475'),
    heroTitle: 'Suport de urgență, ',
    heroTitleAccent: 'când arde.',
    heroSub:
      'Când site-ul e jos sau ceva critic s-a stricat, fiecare oră contează. Intervenim cât de repede putem, oprim focul și apoi ne uităm la cauză, ca să nu se repete.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'Te repunem ',
      titleAccent: 'pe picioare',
      sub: 'Întâi te aducem online, apoi ne uităm la cauză ca să nu se repete.',
    },
    capabilities: [
      {
        title: 'Repunere online',
        icon: SUPPORT_ICON.bolt,
        desc: 'Prioritatea e să te aducem înapoi, repede.',
        items: ['Site căzut', 'Erori critice', 'Restore din backup'],
      },
      {
        title: 'Securitate de urgență',
        icon: SUPPORT_ICON.shield,
        desc: 'Oprim ce face rău chiar acum.',
        items: ['Hack și malware', 'Curățare', 'Blocare atac'],
      },
      {
        title: 'Magazin & email',
        icon: SUPPORT_ICON.refresh,
        desc: 'Reparăm ce te costă vânzări acum.',
        items: ['Checkout reparat', 'Emailuri de comandă', 'DNS / SSL urgent'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Ne contactezi cu contextul',
        body: 'Spui ce s-a întâmplat, de când și ne dai accesul necesar ca să putem intra repede.',
      },
      {
        n: '02',
        title: 'Oprim focul',
        body: 'Prioritatea e să te repunem online: stabilizăm site-ul și oprim ce face rău acum.',
      },
      {
        n: '03',
        title: 'Stabilizăm și prevenim',
        body: 'După ce e online, ne uităm la cauză și îți spunem ce să faci ca să nu se repete.',
      },
    ],
    faqs: [
      {
        q: 'Cât de repede interveniți?',
        body: [
          'Pentru urgențe intervenim cât de repede putem în timpul programului. Scrie-ne contextul și îți dăm imediat un timp realist.',
        ],
      },
      {
        q: 'Lucrați și pe site-uri care nu sunt făcute de voi?',
        body: ['Da. Pentru urgențe intrăm și pe site-uri construite de altcineva.'],
      },
      {
        q: 'Ce faceți dacă nu se poate repara pe loc?',
        body: [
          'Te repunem online cât mai repede (de exemplu dintr-un backup) și apoi rezolvăm cauza în liniște, fără să mai stai jos.',
        ],
      },
    ],
    claim: 'Când arde, intervenim repede.',
  },
  {
    slug: 'quick-fix',
    category: 'suport-rapid',
    title: 'Sesiune Quick Fix',
    cardSummary:
      'O problemă mică, rezolvată într-o singură sesiune scurtă: o modificare, un bug, o setare. Direct la subiect.',
    icon: 'wrench',
    image: IMG('photo-1551434678-e076c223a692'),
    heroTitle: 'Sesiune Quick Fix, ',
    heroTitleAccent: 'o problemă, o sesiune.',
    heroSub:
      'Ai o singură treabă de rezolvat și nu vrei un proiect întreg? Într-o sesiune scurtă ne uităm împreună și o rezolvăm pe loc, sau îți spunem clar dacă cere mai mult.',
    capHead: {
      eyebrow: 'Ce acoperim',
      title: 'O treabă, ',
      titleAccent: 'dusă la capăt',
      sub: 'Direct la subiect, fără să deschizi un proiect întreg.',
    },
    capabilities: [
      {
        title: 'Fix-uri punctuale',
        icon: SUPPORT_ICON.wrench,
        desc: 'O singură problemă, rezolvată în sesiune.',
        items: ['Modificări mici', 'Bug-uri izolate', 'Setări'],
      },
      {
        title: 'Clarificare rapidă',
        icon: SUPPORT_ICON.support,
        desc: 'Un răspuns clar, de la cineva care a mai văzut-o.',
        items: ['A doua opinie', 'Întrebări tehnice', 'Verificări'],
      },
      {
        title: 'Transparent',
        icon: SUPPORT_ICON.spark,
        desc: 'Îți spunem din start ce se poate și ce nu.',
        items: ['Rezolvăm în sesiune', 'Sau spunem ce cere', 'Fără surprize'],
      },
    ],
    process: [
      {
        n: '01',
        title: 'Ne spui ce vrei rezolvat',
        body: 'O singură problemă, descrisă pe scurt, plus accesul de care e nevoie.',
      },
      {
        n: '02',
        title: 'Ne uităm împreună',
        body: 'Într-o sesiune scurtă mergem direct la subiect și încercăm să rezolvăm pe loc.',
      },
      {
        n: '03',
        title: 'Rezolvăm sau îți spunem ce cere',
        body: 'Dacă se poate, o rezolvăm în sesiune. Dacă cere mai mult, îți spunem clar cât și cum.',
      },
    ],
    faqs: [
      {
        q: 'Cât durează o sesiune Quick Fix?',
        body: [
          'E o sesiune scurtă, pe o singură problemă. Dacă treaba e mai mare, îți spunem din start.',
        ],
      },
      {
        q: 'Ce se întâmplă dacă problema cere mai mult?',
        body: [
          'Îți spunem clar ce presupune și cât, fără surprize. Decizi tu dacă mergem mai departe.',
        ],
      },
      {
        q: 'Lucrați pe orice site?',
        body: [
          'Pentru fix-uri punctuale lucrăm și pe site-uri făcute de altcineva, cât timp avem acces.',
        ],
      },
    ],
    claim: 'O problemă, o sesiune, rezolvat.',
  },
];

/** Serviciile dintr-o categorie, în ordinea din `supportServices`. */
export function supportByCategory(id: SupportCategoryId): SupportService[] {
  return supportServices.filter((s) => s.category === id);
}
