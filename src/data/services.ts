/**
 * Cele 6 servicii (piloni). `icon` mapează la set-ul SVG din
 * src/components/ui/ServiceIcon.astro. Slug-urile corespund cu
 * src/data/nav.ts (servicesNav).
 *
 * Conținut real, derivat din Copy_site_Simplead.md, pentru: mentenanță,
 * ux/ui, grafică, social media, consultanță. AI pentru business e nou —
 * marcat [COPY] acolo unde Andrei trebuie să confirme.
 */
import type { Faq } from './content';

export type ServiceIcon = 'marketing' | 'grafica' | 'web' | 'mentenanta' | 'social' | 'ai';

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

export interface Service {
  slug: string;
  icon: ServiceIcon;
  title: string;
  /** Sumar scurt (cardul de pe Acasă / hub). */
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
  heroSub: string;
  capabilities: ServiceCapability[];
  capHead: { eyebrow: string; title: string; titleAccent: string; sub: string };
  process?: ServiceProcessStep[];
  caseStudy?: ServiceCaseStudy;
  faqs: Faq[];
}

// Iconițe SVG (inner markup) pentru capabilități.
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
  brain: '<path d="M9 3a3 3 0 0 0-3 3 3 3 0 0 0-1 5.8V15a3 3 0 0 0 4 2.8A3 3 0 0 0 12 19a3 3 0 0 0 3-1.2 3 3 0 0 0 4-2.8v-3.2A3 3 0 0 0 18 6a3 3 0 0 0-3-3 3 3 0 0 0-3 1.5A3 3 0 0 0 9 3z"/>',
  cog: '<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13a7.8 7.8 0 0 0 0-2l1.6-1.3-1.6-2.8-2 .6a7.6 7.6 0 0 0-1.7-1l-.3-2H10.6l-.3 2a7.6 7.6 0 0 0-1.7 1l-2-.6L5 9.7 6.6 11a7.8 7.8 0 0 0 0 2L5 14.3l1.6 2.8 2-.6a7.6 7.6 0 0 0 1.7 1l.3 2h2.8l.3-2a7.6 7.6 0 0 0 1.7-1l2 .6 1.6-2.8L19.4 13z"/>',
  spark: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18"/>',
} as const;

export const services: Service[] = [
  // ============================ 1. MENTENANȚĂ WEBSITE ============================
  {
    slug: 'mentenanta-website',
    icon: 'mentenanta',
    title: 'Mentenanță website',
    summary:
      'Tu te ocupi de afacere, noi de partea tehnică — actualizări, securitate și suport cu AI.',
    claim: 'Tu te ocupi de afacere, noi de partea tehnică.',
    description:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap. Monitorizăm, actualizăm și optimizăm — tot mai mult cu ajutorul AI — ca tu să te concentrezi pe ce contează.',
    includes: [
      'Actualizări și backup-uri regulate',
      'Securitate și monitorizare uptime',
      'Mici modificări și suport prioritar',
      'Optimizare și mentenanță asistată de AI',
      'Rapoarte de performanță',
    ],
    tags: ['Actualizări', 'Securitate', 'Backup', 'Suport cu AI'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Tu te ocupi de afacere, ',
    heroTitleAccent: 'noi de partea tehnică',
    heroSub:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap. Ne ocupăm de actualizări, securitate, backup-uri și suport — tot mai mult cu ajutorul AI.',
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
        title: 'Suport & Mentenanță cu AI',
        icon: ICON.support,
        desc: 'Mici modificări, suport prioritar și optimizări asistate de AI, plus rapoarte clare.',
        items: [
          'Mici modificări de conținut',
          'Suport prioritar',
          'Optimizări asistate de AI',
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
        q: 'Ce include un abonament de mentenanță?',
        body: [
          'Actualizări de platformă și pluginuri, backup-uri regulate, monitorizare de securitate și uptime, plus mici modificări și suport prioritar. La final primești și un raport clar.',
        ],
      },
      {
        q: 'Cum folosiți AI în mentenanță?',
        body: [
          'Folosim AI pentru monitorizare, detectarea timpurie a problemelor și optimizări repetitive — ca să intervenim mai repede și să prevenim, nu doar să reparăm. Deciziile importante rămân la oameni.',
        ],
      },
      {
        q: 'Faceți mentenanță și pentru site-uri create de altcineva?',
        body: [
          'Da. Analizăm întâi site-ul actual, identificăm riscurile și apoi îți propunem un plan de mentenanță potrivit.',
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

  // ============================ 2. UX/UI & WEB DESIGN ============================
  {
    slug: 'ux-ui-web-design',
    icon: 'web',
    title: 'UX/UI & web design',
    summary:
      'Site-uri și magazine online rapide, clare și gândite să transforme vizitatorii în clienți.',
    claim: 'Site-uri care transformă vizitatori în clienți.',
    description:
      'Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google — și validate cu principii de neuromarketing.',
    includes: [
      'UX/UI design validat pe atenția vizuală',
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

  // ============================ 3. GRAFICĂ PUBLICITARĂ ============================
  {
    slug: 'grafica-publicitara',
    icon: 'grafica',
    title: 'Grafică publicitară',
    summary:
      'Identitate vizuală, materiale de promovare și foto-video care te fac memorabil și coerent.',
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
    tags: ['Branding', 'Print', 'Outdoor', 'Foto-Video'],
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

  // ============================ 4. SOCIAL MEDIA ============================
  {
    slug: 'social-media',
    icon: 'social',
    title: 'Social media',
    summary: 'Conținut și prezență care aduc clienți, nu doar aprecieri. Construite pe date.',
    claim: 'Prezență în social media care aduce clienți, nu doar aprecieri.',
    description:
      'Administrăm prezența ta în social media cu o strategie clară, conținut coerent și campanii plătite gândite pe conversii — nu pe afișări.',
    includes: [
      'Strategie & calendar editorial',
      'Administrare conturi (Facebook, Instagram, TikTok, YouTube)',
      'Creație de conținut (vizual + copywriting)',
      'Campanii plătite (Meta Ads, TikTok Ads)',
      'Raportare și optimizare',
    ],
    tags: ['Strategie', 'Conținut', 'Meta & TikTok Ads', 'Raportare'],
    image:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Social media care aduce ',
    heroTitleAccent: 'clienți, nu doar aprecieri',
    heroSub:
      'Prezență coerentă pe canalele unde se află publicul tău, conținut care prinde și campanii plătite gândite pe conversii. Cu măsurare reală, nu cu presupuneri.',
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
        title: 'Campanii plătite',
        icon: ICON.target,
        desc: 'Reclame pe Meta și TikTok gândite pe conversii, cu buget controlat.',
        items: [
          'Meta Ads (Facebook & Instagram)',
          'TikTok Ads',
          'Targetare & creative testing',
          'Optimizare buget & licitare',
        ],
      },
      {
        title: 'Analiză & Optimizare',
        icon: ICON.chart,
        desc: 'Măsurăm ce funcționează și ajustăm — decizii pe date, nu pe presupuneri.',
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
        q: 'Pe ce canale lucrați?',
        body: [
          'În principal Facebook, Instagram și TikTok, iar la nevoie YouTube. Alegem canalele în funcție de unde se află publicul tău și de obiectiv.',
        ],
      },
      {
        q: 'Creați și conținutul, sau doar îl postați?',
        body: [
          'Creăm conținutul — vizual și text — și îl publicăm pe un calendar editorial clar. Putem integra și materiale pe care le ai deja.',
        ],
      },
      {
        q: 'Cât costă administrarea de social media?',
        body: [
          'Depinde de numărul de canale, frecvența postărilor și de bugetul de campanii. Pornim mereu de la o discuție și o ofertă pe obiective. [COPY: confirmă pachete/prețuri]',
        ],
      },
    ],
  },

  // ============================ 5. CONSULTANȚĂ DE MARKETING ============================
  {
    slug: 'consultanta-marketing',
    icon: 'marketing',
    title: 'Consultanță de marketing',
    summary:
      'Decizii pe date și neuromarketing — nu pe presupuneri. Studio condus de un doctor în marketing.',
    claim: 'Marketing fundamentat pe cercetare, nu pe noroc.',
    description:
      'Te ajutăm să iei deciziile de marketing potrivite, validate cu date și neuromarketing. Strategie, analiză a atenției vizuale (eye-tracking & heatmaps) și un plan clar de creștere.',
    includes: [
      'Strategie de marketing și de brand',
      'Audit și analiză (Analytics, tracking conversii)',
      'Neuromarketing: eye-tracking & heatmaps (expoze.app)',
      'Poziționare și mesaje',
      'Plan de creștere pe obiective măsurabile',
    ],
    tags: ['Strategie', 'Neuromarketing', 'Analiză', 'Poziționare'],
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Marketing fundamentat pe ',
    heroTitleAccent: 'cercetare, nu pe noroc',
    heroSub:
      'Validăm fiecare decizie cu date și neuromarketing — inclusiv eye-tracking și heatmaps prin expoze.app. Studio condus de Andrei Panait, doctor în marketing.',
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
        desc: 'Un plan clar de marketing și o poziționare care te diferențiază — pe obiective măsurabile.',
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
        desc: 'Testăm atenția cu eye-tracking și heatmaps prin expoze.app — vedem ce funcționează înainte de lansare.',
        items: [
          'Eye-tracking & heatmaps (expoze.app)',
          'Analiză a ierarhiei vizuale',
          'Optimizare pe principii de neuromarketing',
          'Validare pre-lansare',
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
    faqs: [
      {
        q: 'Ce înseamnă „marketing bazat pe neuromarketing"?',
        body: [
          'Validăm deciziile cu instrumente de analiză a atenției vizuale (eye-tracking, heatmaps prin expoze.app) și cu date reale din Analytics — înainte și după lansare. Așa investești acolo unde chiar aduce rezultate.',
        ],
      },
      {
        q: 'Lucrați doar consultanță sau și execuție?',
        body: [
          'Amândouă. Putem livra doar strategia și recomandările, sau să ne ocupăm și de execuție (web, grafică, social media) — în funcție de ce ai nevoie.',
        ],
      },
      {
        q: 'Pentru ce tip de afaceri e potrivită consultanța?',
        body: [
          'Pentru afaceri care vor să crească cu decizii informate — de la firme mici la organizații mai mari. Pornim de la obiectivele tale, nu de la un șablon.',
        ],
      },
    ],
  },

  // ============================ 6. AI PENTRU BUSINESS ============================
  {
    slug: 'ai-pentru-business',
    icon: 'ai',
    title: 'AI pentru business',
    summary:
      'Automatizări, mentenanță și conținut asistate de AI — acolo unde îți aduc valoare reală.',
    claim: 'AI folosit cu cap — economisești timp și bani.',
    description:
      'Nu vindem „AI" ca slogan. Identificăm unde îți aduce valoare reală și îl integrăm în fluxurile tale: automatizări, mentenanță inteligentă și producție de conținut asistată. [COPY: confirmă scope-ul exact al serviciului]',
    includes: [
      'Automatizarea proceselor repetitive',
      'Mentenanță și monitorizare asistate de AI',
      'Producție de conținut asistată (text, vizual)',
      'Integrări cu uneltele pe care le folosești deja',
      'Consultanță: unde merită (și unde nu) să folosești AI',
    ],
    tags: ['Automatizări', 'Mentenanță AI', 'Conținut', 'Integrări'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'AI pentru business, ',
    heroTitleAccent: 'folosit cu cap',
    heroSub:
      'Îl folosim acolo unde îți aduce valoare reală — automatizări, mentenanță inteligentă și conținut asistat. Restul rămâne la oameni. [COPY: rafinează propunerea]',
    capHead: {
      eyebrow: 'Ce oferim',
      title: 'AI integrat în ',
      titleAccent: 'fluxurile tale',
      sub: '[COPY] Trei direcții în care AI-ul îți economisește timp și reduce erorile.',
    },
    capabilities: [
      {
        title: 'Automatizări',
        icon: ICON.cog,
        desc: 'Fluxuri repetitive automatizate, ca să câștigi timp și să reduci erorile. [COPY]',
        items: [
          'Automatizarea sarcinilor repetitive',
          'Integrări între unelte',
          'Notificări & raportare automată',
          '[COPY: exemple concrete]',
        ],
      },
      {
        title: 'Mentenanță cu AI',
        icon: ICON.spark,
        desc: 'Monitorizare și optimizări asistate de AI pentru site-ul și sistemele tale. [COPY]',
        items: [
          'Monitorizare inteligentă',
          'Detectare timpurie a problemelor',
          'Optimizări asistate',
          '[COPY: detalii]',
        ],
      },
      {
        title: 'Conținut asistat',
        icon: ICON.bolt,
        desc: 'Idei, drafturi și variante generate cu AI, rafinate de oameni. [COPY]',
        items: [
          'Drafturi & idei de conținut',
          'Variante pentru testare',
          'Adaptare pe canale',
          '[COPY: detalii]',
        ],
      },
    ],
    faqs: [
      {
        q: 'Înlocuiește AI-ul oamenii din echipă?',
        body: [
          'Nu. Folosim AI ca să accelerăm munca repetitivă și să eliberăm timp pentru deciziile care contează. Calitatea și deciziile importante rămân la oameni. [COPY: confirmă mesajul]',
        ],
      },
      {
        q: 'De unde știu dacă afacerea mea are nevoie de AI?',
        body: [
          'Pornim de la o discuție: ne uităm la procesele tale și identificăm unde AI-ul aduce valoare reală — și unde nu merită. [COPY]',
        ],
      },
      {
        q: 'Cât costă un proiect de AI pentru business?',
        body: ['[COPY: confirmă modelul de preț și pachetele.]'],
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
