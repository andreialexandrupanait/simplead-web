/**
 * Cele 4 direcții de servicii. `icon` mapează la un set de iconițe SVG inline
 * (vezi src/components/ui/ServiceIcon.astro). Conținut din Copy_site_Simplead.md
 * + noul export (Servicii-Web-Design.html pentru template-ul bogat de serviciu).
 *
 * Web Design este complet (conținut real din export). Marketing / Grafică /
 * Mentenanță au conținut funcțional derivat din `includes`/`description` —
 * marcat `TODO: confirmă conținut` acolo unde trebuie validat de client.
 */
import type { Faq } from './content';

export type ServiceIcon = 'marketing' | 'grafica' | 'web' | 'mentenanta';

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
  /** Cifra mare (text simplu, fără accent). */
  statBig: string;
  /** Partea cu accent gradient din cifra mare. */
  statBigAccent: string;
  statCap: string;
  quote: string;
  body: string;
  client: string;
  clientNote: string;
  /** Logo „word" scurt (ex: „UGAL"). */
  clientLogo: string;
}

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: string;
  /** Sumar scurt (cardul de pe Acasă). */
  summary: string;
  /** Titlu/claim pe pagina dedicată. */
  claim: string;
  /** Descriere lungă (pagina dedicată). */
  description: string;
  /** Ce include — listă de bullet-uri. */
  includes: string[];
  /** Etichete scurte (cardurile hub din /servicii). */
  tags: string[];
  /** Imagine hero / card hub (placeholder Unsplash — de înlocuit cu real). */
  image: string;
  /** Titlul H1 pe pagina de detaliu (partea simplă + partea cu accent). */
  heroTitle: string;
  heroTitleAccent: string;
  /** Subtitlul hero pe pagina de detaliu. */
  heroSub: string;
  /** Capabilități (carduri). */
  capabilities: ServiceCapability[];
  /** Antet pentru secțiunea de capabilități. */
  capHead: { eyebrow: string; title: string; titleAccent: string; sub: string };
  /** Pași de proces; dacă lipsește, pagina folosește procesul generic. */
  process?: ServiceProcessStep[];
  /** Caz / dovadă socială (opțional). */
  caseStudy?: ServiceCaseStudy;
  /** Întrebări frecvente specifice serviciului. */
  faqs: Faq[];
}

// Iconițe SVG (inner markup) pentru capabilități, reutilizate mai jos.
const ICON = {
  layout: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M4 9h16M4 15h16M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  bolt: '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12z"/>',
  megaphone: '<path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 0 1-5.8-1.6"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>',
  chart: '<path d="M3 3v18h18"/><path d="M7 14l3-4 3 2 4-6"/>',
  shapes: '<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="11.5" r="2.5"/><circle cx="17" cy="15" r="3"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/>',
  camera: '<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/>',
  refresh: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
  support: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M18 19a2 2 0 0 0 2-2v-3h-3a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2zM6 19a2 2 0 0 1-2-2v-3h3a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2z"/>',
} as const;

export const services: Service[] = [
  {
    slug: 'marketing',
    icon: 'marketing',
    title: 'Marketing',
    summary:
      'Strategie, social media și campanii care aduc clienți, nu doar aprecieri. Construite pe date și neuromarketing.',
    claim: 'Marketing digital care aduce clienți, nu doar aprecieri.',
    description:
      'Construim și executăm strategii pe obiective clare, măsurabile. Combinăm creativitatea cu datele și neuromarketingul, ca bugetul tău să meargă acolo unde contează.',
    includes: [
      'Strategie de marketing și de brand',
      'Administrare social media (Facebook, Instagram, TikTok, YouTube)',
      'Campanii plătite (Meta Ads, Google Ads)',
      'Conținut și copywriting',
      'Analiză, raportare și optimizare (Analytics, tracking conversii)',
      'Consultanță de marketing, inclusiv neuromarketing',
    ],
    tags: ['Strategie', 'Social Media', 'Meta & Google Ads', 'Analytics'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Marketing digital care aduce ',
    heroTitleAccent: 'clienți, nu doar aprecieri',
    heroSub:
      'Strategie, social media și campanii plătite construite pe obiective clare și măsurabile. Combinăm creativitatea cu datele și neuromarketingul, ca fiecare leu din buget să meargă acolo unde contează.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la strategie la ',
      titleAccent: 'rezultate măsurabile',
      sub: 'Trei zone de lucru care, împreună, transformă atenția în clienți reali.',
    },
    capabilities: [
      {
        title: 'Strategie & Social Media',
        icon: ICON.megaphone,
        desc: 'Un plan clar pe obiective și o prezență coerentă pe canalele unde se află publicul tău.',
        items: [
          'Strategie de marketing și de brand',
          'Administrare social media',
          'Calendar editorial & conținut',
          'Copywriting orientat pe acțiune',
        ],
      },
      {
        title: 'Campanii plătite',
        icon: ICON.target,
        desc: 'Reclame pe Meta și Google gândite pe conversii, nu pe afișări — cu buget controlat.',
        items: [
          'Meta Ads (Facebook & Instagram)',
          'Google Ads (Search & Display)',
          'TikTok Ads',
          'Optimizare buget & licitare',
        ],
      },
      {
        title: 'Analiză & Neuromarketing',
        icon: ICON.chart,
        desc: 'Măsurăm ce funcționează și ajustăm în timp real — decizii bazate pe date, nu pe presupuneri.',
        items: [
          'Tracking conversii & evenimente',
          'Rapoarte clare, pe înțelesul tău',
          'Heatmaps & atenție vizuală',
          'Optimizare continuă',
        ],
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
        q: 'Cum stabiliți strategia de marketing?',
        body: [
          'Pornim de la obiectivele tale de business și de la public, nu de la „ce e la modă". Analizăm ce ai deja, concurența și canalele potrivite, apoi construim un plan pe obiective măsurabile, cu buget și calendar clare.',
        ],
      },
      {
        q: 'Pe ce canale faceți campanii plătite?',
        body: [
          'În principal Meta (Facebook & Instagram) și Google Ads, iar la nevoie TikTok Ads. Alegem canalul în funcție de unde se află publicul tău și de obiectiv — vânzări, lead-uri sau notorietate.',
        ],
      },
      {
        q: 'Ce înseamnă „bazat pe date și neuromarketing"?',
        body: [
          'Validăm deciziile cu instrumente de analiză a atenției vizuale și cu date reale din Analytics și tracking de conversii — înainte și după lansare. Așa cheltui bugetul acolo unde chiar aduce rezultate.',
        ],
      },
      {
        q: 'Cât costă o campanie de marketing?',
        body: [
          'Depinde de obiective și de canalele alese — de aceea pornim mereu de la o discuție și o ofertă personalizată. Spune-ne ce vrei să obții și îți facem o propunere cu buget pe obiective.',
        ],
      },
    ],
  },
  {
    slug: 'grafica',
    icon: 'grafica',
    title: 'Grafică',
    summary:
      'Identitate vizuală, materiale de promovare și foto-video care te fac memorabil și coerent peste tot.',
    claim: 'Imagine coerentă, care te face memorabil.',
    description:
      'De la logo și identitate vizuală completă, până la materiale de promovare și conținut foto-video. Totul gândit simplu, dar cu impact — și optimizat vizual cu neuromarketing.',
    includes: [
      'Identitate vizuală & branding (logo, brand guide)',
      'Grafică publicitară (print, outdoor, social media)',
      'Materiale de prezentare (broșuri, cărți de vizită, prezentări)',
      'Foto & video (fotograf cu peste 10 ani experiență)',
      'Design validat cu heatmaps și ierarhie vizuală',
    ],
    tags: ['Branding', 'Print', 'Social Media', 'Foto-Video'],
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Imagine coerentă, ',
    heroTitleAccent: 'care te face memorabil',
    heroSub:
      'De la logo și identitate vizuală completă, până la materiale de promovare și conținut foto-video. Totul gândit simplu, dar cu impact — și validat vizual cu neuromarketing.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'De la identitate la ',
      titleAccent: 'materiale care vând',
      sub: 'Trei zone de lucru care, împreună, îți construiesc o imagine coerentă și memorabilă.',
    },
    capabilities: [
      {
        title: 'Identitate vizuală & Branding',
        icon: ICON.shapes,
        desc: 'Un brand coerent, de la logo la regulile de folosire — recognoscibil peste tot.',
        items: [
          'Logo & sistem vizual',
          'Brand guide complet',
          'Paletă, tipografie & elemente grafice',
          'Aplicații pe materiale',
        ],
      },
      {
        title: 'Grafică publicitară & Print',
        icon: ICON.image,
        desc: 'Materiale de promovare și prezentare gândite să atragă atenția potrivită.',
        items: [
          'Print, outdoor & social media',
          'Broșuri, cărți de vizită, prezentări',
          'Grafică pentru campanii',
          'Design validat cu heatmaps',
        ],
      },
      {
        title: 'Foto & Video',
        icon: ICON.camera,
        desc: 'Conținut foto-video profesionist, realizat de un fotograf cu peste 10 ani experiență.',
        items: [
          'Fotografie de produs & brand',
          'Conținut video pentru social',
          'Editare & post-producție',
          'Direcție creativă',
        ],
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
        q: 'Realizați doar logo sau și identitate completă?',
        body: [
          'Amândouă. Putem livra doar un logo, dar recomandăm un sistem vizual complet (brand guide) — cu paletă, tipografie și reguli de folosire — ca brandul tău să arate coerent peste tot.',
        ],
      },
      {
        q: 'Faceți și fotografie / video?',
        body: [
          'Da. Avem un fotograf cu peste 10 ani de experiență și ne ocupăm de fotografie de produs și brand, conținut video pentru social media și post-producție.',
        ],
      },
      {
        q: 'Ce înseamnă „design validat cu neuromarketing"?',
        body: [
          'Verificăm ierarhia vizuală și atenția cu heatmaps și principii de neuromarketing, ca materialele să comunice clar mesajul important — nu doar „să arate bine".',
        ],
      },
      {
        q: 'Pot primi materialele în formate pentru print și online?',
        body: [
          'Sigur. Livrăm fișierele în formatele de care ai nevoie, atât pentru print (CMYK, la rezoluție corectă), cât și pentru online (web/social).',
        ],
      },
    ],
  },
  {
    slug: 'web-design',
    icon: 'web',
    title: 'Web Design',
    summary:
      'Site-uri și magazine online rapide, clare și gândite să transforme vizitatorii în clienți.',
    claim: 'Site-uri care transformă vizitatori în clienți.',
    description:
      'Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google.',
    includes: [
      'UX/UI design',
      'Site-uri de prezentare (WordPress)',
      'Magazine online (WooCommerce)',
      'Optimizare pentru viteză și mobil',
      'SEO de bază la lansare',
    ],
    tags: ['UX/UI', 'WordPress', 'WooCommerce', 'SEO'],
    image:
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Site-uri și magazine online care ',
    heroTitleAccent: 'transformă vizitatori în clienți',
    heroSub:
      'De la site-uri de prezentare la magazine online — construim platforme rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și gândite pe conversii, nu pe presupuneri.',
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
        desc: 'Structură clară și un design care ghidează vizitatorul exact unde vrei tu — validat cu principii de neuromarketing.',
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
        title: 'Discovery & Analiză',
        body: 'Înțelegem obiectivele de business, publicul-țintă și cerințele funcționale. Definim structura, conținutul și estimăm bugetul și termenele.',
      },
      {
        n: '02',
        title: 'Design UI/UX',
        body: 'Construim wireframe-uri și apoi designul vizual — clar, pe brandul tău și gândit pe conversii, nu doar „să arate bine".',
      },
      {
        n: '03',
        title: 'Dezvoltare & Integrare',
        body: 'Transformăm designul într-un site real: rapid, responsive și ușor de administrat. Integrăm plăți, formulare și alte unelte de care ai nevoie.',
      },
      {
        n: '04',
        title: 'Testare & QA',
        body: 'Verificăm totul pe dispozitive și browsere diferite — viteză, formulare, linkuri — ca lansarea să fie fără surprize.',
      },
      {
        n: '05',
        title: 'Lansare & Suport',
        body: 'Punem site-ul online, îl optimizăm pentru Google și rămânem alături de tine cu mentenanță și suport.',
      },
    ],
    caseStudy: {
      statBig: 'zeci',
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
        q: 'Ce tehnologii folosiți pentru site-uri?',
        body: [
          'Lucrăm în principal cu WordPress și WooCommerce — ușor de administrat de către tine. Pentru proiecte speciale folosim și soluții la comandă. Alegem tehnologia în funcție de nevoile tale, nu invers.',
        ],
      },
      {
        q: 'Cât durează realizarea unui website?',
        body: [
          'Depinde de complexitate. Un site de prezentare durează de obicei câteva săptămâni, un magazin online ceva mai mult. La prima discuție îți dăm o estimare clară de timp.',
        ],
      },
      {
        q: 'Oferiți și hosting și mentenanță?',
        body: [
          'Da. Ne putem ocupa de găzduire, actualizări, backup-uri și suport, ca site-ul să rămână rapid și sigur — tu te ocupi de afacere.',
        ],
      },
      {
        q: 'Site-urile sunt optimizate pentru SEO?',
        body: [
          'Da. Livrăm cu SEO de bază la lansare (structură, viteză, mobil, meta) și putem continua cu o strategie SEO dedicată.',
        ],
      },
      {
        q: 'Puteți moderniza un site existent?',
        body: [
          'Sigur. Analizăm site-ul actual și îți propunem fie o îmbunătățire, fie o reconstrucție — în funcție de ce e mai eficient pentru tine.',
        ],
      },
    ],
  },
  {
    slug: 'mentenanta',
    icon: 'mentenanta',
    title: 'Mentenanță',
    summary:
      'Avem grijă de partea tehnică — actualizări, securitate, suport — ca tu să te ocupi de afacere.',
    claim: 'Tu te ocupi de afacere, noi de partea tehnică.',
    description:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap.',
    includes: [
      'Actualizări și backup-uri regulate',
      'Securitate și monitorizare',
      'Mici modificări și suport prioritar',
      'Rapoarte de performanță',
    ],
    tags: ['Actualizări', 'Securitate', 'Backup', 'Suport'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Tu te ocupi de afacere, ',
    heroTitleAccent: 'noi de partea tehnică',
    heroSub:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap. Ne ocupăm de actualizări, securitate, backup-uri și suport — ca tu să te concentrezi pe ce contează.',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'Liniște tehnică, ',
      titleAccent: 'fără bătăi de cap',
      sub: 'Trei zone de lucru care, împreună, îți țin site-ul rapid, sigur și mereu la zi.',
    },
    capabilities: [
      {
        title: 'Actualizări & Backup',
        icon: ICON.refresh,
        desc: 'Site-ul tău rămâne mereu la zi, cu copii de siguranță regulate — fără surprize.',
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
        title: 'Suport & Rapoarte',
        icon: ICON.support,
        desc: 'Mici modificări și suport prioritar, plus rapoarte clare despre ce se întâmplă.',
        items: [
          'Mici modificări de conținut',
          'Suport prioritar',
          'Rapoarte de performanță',
          'Recomandări pentru pasul următor',
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
        q: 'Ce include un abonament de mentenanță?',
        body: [
          'Actualizări de platformă și pluginuri, backup-uri regulate, monitorizare de securitate și uptime, plus mici modificări și suport prioritar. La final primești și un raport clar.',
        ],
      },
      {
        q: 'Faceți mentenanță și pentru site-uri create de altcineva?',
        body: [
          'Da. Analizăm întâi site-ul actual, identificăm riscurile și apoi îți propunem un plan de mentenanță potrivit.',
        ],
      },
      {
        q: 'Cât de repede răspundeți la o solicitare?',
        body: [
          'Pentru clienții cu abonament oferim suport prioritar. Timpul exact de răspuns îl stabilim în funcție de pachet, la începutul colaborării.',
        ],
      },
      {
        q: 'Ce se întâmplă dacă site-ul cade?',
        body: [
          'Monitorizăm disponibilitatea și intervenim. Cu backup-urile regulate putem restaura rapid site-ul la o versiune funcțională.',
        ],
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

/** Celelalte servicii (pentru secțiunea „Alte servicii"). */
export function relatedServices(slug: string): Service[] {
  return services.filter((s) => s.slug !== slug);
}
