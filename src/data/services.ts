/**
 * Cele 6 servicii (piloni). `icon` mapează la set-ul SVG din
 * src/components/ui/ServiceIcon.astro. Slug-urile corespund cu
 * src/data/nav.ts (servicesNav).
 *
 * Conținut original Simplead. Procesul („Cum lucrăm") e specific fiecărui
 * serviciu, iar FAQ-urile sunt rescrise în vocea Simplead (date/neuromarketing,
 * un singur partener) - nu mai sunt preluate de la terți.
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
      'Tu te ocupi de afacere, eu de partea tehnică: actualizări, securitate, backup și monitorizare continuă.',
    claim: 'Tu te ocupi de afacere, eu de partea tehnică.',
    description:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap. Îl monitorizez continuu, îl actualizez și îl optimizez, ca tu să te concentrezi pe ce contează.',
    includes: [
      'Actualizări și backup-uri regulate',
      'Securitate și monitorizare uptime',
      'Mici modificări și suport prioritar',
      'Monitorizare continuă a site-ului',
      'Rapoarte de performanță',
    ],
    tags: ['Actualizări', 'Securitate', 'Backup', 'Monitorizare'],
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=78&auto=format&fit=crop',
    heroTitle: 'Tu te ocupi de afacere, ',
    heroTitleAccent: 'eu de partea tehnică',
    heroSub:
      'Site-ul tău rămâne rapid, sigur și actualizat, fără bătăi de cap. Mă ocup de actualizări, securitate, backup-uri, suport și de monitorizarea continuă a site-ului.',
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
        q: 'Cum intră AI-ul în mentenanță?',
        body: [
          'Îl folosim pentru supraveghere non-stop, prinderea din vreme a problemelor și sarcinile repetitive — ca să intervenim mai repede și să prevenim, nu doar să reparăm. Deciziile importante rămân la oameni.',
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
    title: 'UX/UI & web design',
    summary:
      'Site-uri și magazine online rapide, clare și gândite să transforme vizitatorii în clienți.',
    claim: 'Site-uri care transformă vizitatori în clienți.',
    description:
      'Realizăm site-uri de prezentare și magazine online rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și validate cu principii de neuromarketing.',
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
      'De la site-uri de prezentare la magazine online: construim platforme rapide, clare și ușor de administrat. Frumoase pentru oameni, prietenoase cu Google și gândite pe conversii, nu pe presupuneri.',
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
        desc: 'Structură clară și un design care ghidează vizitatorul exact unde vrei tu, validat cu principii de neuromarketing.',
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
        body: 'Pornim de la afacerea ta: ce vrei să obții, cui te adresezi și ce trebuie să facă efectiv site-ul. Stabilim împreună structura, conținutul, bugetul și termenele — ca să lucrăm pe obiective, nu pe presupuneri.',
      },
      {
        n: '02',
        title: 'Arhitectură & wireframe',
        body: 'Înainte de design, așezăm scheletul: ce pagini, ce informație unde și pe ce drum trece vizitatorul. Aici intră prima dată partea de atenție vizuală, ca structura să ghideze spre acțiune.',
      },
      {
        n: '03',
        title: 'Design pe brand',
        body: 'Ducem scheletul într-un design clar, pe identitatea ta, gândit pe conversii și validat cu principii de neuromarketing — nu doar „să arate bine".',
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
        q: 'Site-ul iese optimizat pentru Google?',
        body: [
          'Da. Pleacă la drum cu SEO de bază pus la punct — structură, viteză, versiune de mobil, meta — iar dacă vrei, continuăm cu o strategie SEO dedicată.',
        ],
      },
      {
        q: 'Aveți deja un site — îl puteți reface?',
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
    title: 'Grafică publicitară',
    summary:
      'Identitate vizuală, materiale de promovare și foto-video care te fac memorabil și coerent.',
    claim: 'Imagine coerentă, care te face memorabil.',
    description:
      'De la logo și identitate vizuală completă, până la materiale de promovare și conținut foto-video. Totul gândit simplu, dar cu impact și optimizat vizual cu neuromarketing.',
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
      'De la logo și identitate vizuală completă, până la materiale de promovare și conținut foto-video. Totul gândit simplu, dar cu impact și validat vizual cu neuromarketing.',
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
        desc: 'Un brand coerent, de la logo la regulile de folosire, recognoscibil peste tot.',
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
        body: 'Ducem conceptul în materiale concrete — logo, identitate, grafică de campanie, print sau foto-video — coerente între ele și gata de folosit.',
      },
      {
        n: '04',
        title: 'Validare cu neuromarketing',
        body: 'Verificăm ierarhia vizuală și unde se duce atenția, cu heatmaps și principii de neuromarketing. Așa ne asigurăm că mesajul important se vede primul, nu se pierde.',
      },
      {
        n: '05',
        title: 'Livrare',
        body: 'Predăm fișierele în toate formatele de care ai nevoie — print (CMYK, la rezoluția corectă) și online — plus regulile de folosire, ca totul să rămână coerent.',
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
        q: 'Faceți doar logo sau identitate completă?',
        body: [
          'Și una, și alta. Putem livra doar logo-ul, dar recomandăm un sistem vizual complet (brand guide) — paletă, tipografie, reguli — ca brandul să arate la fel de bine peste tot, nu doar pe logo.',
        ],
      },
      {
        q: 'Vă ocupați și de foto-video?',
        body: [
          'Da. Lucrăm cu un fotograf cu peste 10 ani de experiență: fotografie de produs și de brand, conținut video pentru social media și post-producție.',
        ],
      },
      {
        q: 'Ce e „design validat cu neuromarketing"?',
        body: [
          'Înseamnă că nu ne oprim la „arată bine". Verificăm cu heatmaps și principii de neuromarketing unde se uită oamenii, ca mesajul principal să fie primul observat.',
        ],
      },
      {
        q: 'Primesc materialele și pentru print, și pentru online?',
        body: [
          'Da. Le predăm în formatele potrivite fiecărui canal — print (CMYK, rezoluție corectă) și online (web/social) — gata de pus în folosință.',
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
      'Administrăm prezența ta în social media cu o strategie clară, conținut coerent și campanii plătite gândite pe conversii, nu pe afișări.',
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
        desc: 'Măsurăm ce funcționează și ajustăm: decizii pe date, nu pe presupuneri.',
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
        body: 'Creăm vizualul și textul, coerente cu brandul, și pregătim eventualele campanii plătite gândite pe conversii, nu pe afișări.',
      },
      {
        n: '04',
        title: 'Publicare & comunitate',
        body: 'Publicăm pe calendar și ținem prezența vie: răspundem, ajustăm și menținem un ton consecvent, ca brandul să fie recognoscibil.',
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
          'Îl creăm — vizual și text — și îl publicăm pe un calendar editorial clar. Dacă ai deja materiale bune, le integrăm în plan.',
        ],
      },
      {
        q: 'Cât costă administrarea de social media?',
        body: [
          'Depinde de câte canale acoperim, cât de des postăm și de bugetul de campanii. Nu lucrăm cu prețuri de raft: pornim de la o discuție și o ofertă pe obiectivele tale.',
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
      'Decizii pe date și neuromarketing, nu pe presupuneri. Studio condus de un doctor în marketing.',
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
      'Validăm fiecare decizie cu date și neuromarketing, inclusiv eye-tracking și heatmaps prin expoze.app. Studio condus de Andrei Panait, doctor în marketing.',
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
        desc: 'Testăm atenția cu eye-tracking și heatmaps prin expoze.app: vedem ce funcționează înainte de lansare.',
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
    process: [
      {
        n: '01',
        title: 'Discuție & audit',
        body: 'Pornim de la unde ești: ce ai încercat, ce funcționează și ce nu. Ne uităm la datele existente și la prezența ta actuală, ca să avem o imagine reală.',
      },
      {
        n: '02',
        title: 'Cercetare',
        body: 'Studiem publicul, concurența și piața. Aici intră partea de neuromarketing — atenție vizuală, heatmaps — și datele din Analytics, ca să lucrăm cu fapte, nu cu impresii.',
      },
      {
        n: '03',
        title: 'Strategie pe obiective',
        body: 'Transformăm concluziile într-o strategie clară: poziționare, mesaje, canale și obiective măsurabile. Știi exact ce urmărim și de ce.',
      },
      {
        n: '04',
        title: 'Plan de execuție',
        body: 'Îți dăm un plan concret, prioritizat, cu pași pe care îi poți urma — singur sau împreună cu noi, dacă vrei și partea de execuție.',
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
    faqs: [
      {
        q: 'Ce înseamnă „marketing pe neuromarketing"?',
        body: [
          'Înseamnă că validăm deciziile înainte și după lansare: analizăm atenția vizuală (eye-tracking, heatmaps prin expoze.app) și ne uităm la date reale din Analytics. Așa pui bugetul acolo unde chiar mișcă acul.',
        ],
      },
      {
        q: 'Faceți doar consultanță sau și execuție?',
        body: [
          'Cum ai nevoie. Putem livra doar strategia și recomandările, sau să ducem mai departe și execuția — web, grafică, social media — fiind un singur partener pentru tot.',
        ],
      },
      {
        q: 'Pentru cine e potrivită consultanța?',
        body: [
          'Pentru orice afacere care vrea să crească cu decizii informate, de la firme mici la organizații mai mari. Pornim de la obiectivele tale, nu de la un șablon aplicat la toți.',
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
      'Automatizări, monitorizare și conținut asistate de AI: acolo unde îți cumpără timp, nu unde dă bine pe hârtie.',
    claim: 'AI folosit cu cap: economisești timp și bani.',
    description:
      'Nu vindem „AI" ca slogan. Ne uităm la procesele tale, găsim munca repetitivă care îți mănâncă timpul și o automatizăm: lead-uri, rapoarte, monitorizare, prime versiuni de conținut. Deciziile și relația cu clienții rămân la oameni.',
    includes: [
      'Automatizarea proceselor repetitive',
      'Monitorizare continuă, cu alerte înainte să observe clienții',
      'Conținut asistat: draft-uri rapide, rafinate de oameni',
      'Integrări cu uneltele pe care le folosești deja',
      'Consultanță onestă: unde merită AI-ul și unde nu',
    ],
    tags: ['Automatizări', 'Mentenanță AI', 'Conținut', 'Integrări'],
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=900&q=78&auto=format&fit=crop',
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
    faqs: [
      {
        q: 'AI-ul înlocuiește oamenii din echipă?',
        body: [
          'Nu — și nici nu îl folosim așa. Preia munca repetitivă: sortat, copiat, supravegheat, prime versiuni. Deciziile, relația cu clienții și verificarea finală rămân la oameni, fiindcă acolo contează contextul pe care doar ei îl au.',
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
          'Depinde de procesele pe care le automatizăm și de cât de adânc se integrează cu uneltele tale. Nu lucrăm cu prețuri de raft: pornim de la o discuție și o ofertă pe obiective.',
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
