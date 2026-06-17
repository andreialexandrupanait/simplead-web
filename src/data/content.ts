/**
 * Date de conținut pentru secțiunile de pe Acasă + pagini.
 * Cifrele/valorile marcate TODO trebuie confirmate de client.
 */

/** Bara de statistici din hero (4 cifre - valori din design, de confirmat). */
export interface Stat {
  value: string;
  suffix?: string;
  label: string;
}
export const stats: Stat[] = [
  { value: '5', suffix: '+', label: 'Ani de experiență' }, // TODO: confirmă
  { value: '120', suffix: '+', label: 'Proiecte finalizate' }, // TODO
  { value: '60', suffix: '+', label: 'Clienți mulțumiți' }, // TODO
  { value: '15', suffix: '+', label: 'Parteneri' }, // TODO
];

/** Pilonii din hero (3 puncte cu bifă). */
export const heroPillars: string[] = [
  'Marketing bazat pe date și neuromarketing',
  'Grafică, web & branding, un singur partener',
  'Decizii măsurate, nu presupuneri',
];

/** Serviciile afișate pe orbita din hero (8 noduri, în ordinea din design). */
export interface OrbitNode {
  label: string;
  icon: string; // cheie în setul de iconițe orbitale
}
export const orbitNodes: OrbitNode[] = [
  { label: 'Copywriting', icon: 'pen' },
  { label: 'Branding', icon: 'globe' },
  { label: 'Web Design', icon: 'window' },
  { label: 'Social Media', icon: 'share' },
  { label: 'SEO', icon: 'search' },
  { label: 'Ads', icon: 'megaphone' },
  { label: 'Foto-Video', icon: 'camera' },
  { label: 'eCommerce', icon: 'cart' },
];

/** Diferențiator „Nu ghicim. Măsurăm." - cele 3 puncte. */
export interface Differentiator {
  title: string;
  text: string;
}
export const differentiators: Differentiator[] = [
  {
    title: 'Atenție vizuală',
    text: 'Vedem exact unde se uită publicul tău și ce ignoră.',
  },
  {
    title: 'Date & conversii',
    text: 'Măsurăm ce funcționează și ajustăm în timp real.',
  },
  {
    title: 'Decizii justificate',
    text: 'Fiecare alegere de design are un „de ce", nu doar un „mie îmi place".',
  },
];

/** Procesul în 5 pași - cu detalii pentru tab-urile interactive (din design). */
export interface ProcessStep {
  n: number;
  title: string;
  text: string;
  bullets: string[];
}
export const processSteps: ProcessStep[] = [
  {
    n: 1,
    title: 'Întâlnire',
    text: 'Pornim de la tine. Ne așezăm la masă, fizic sau online, și ascultăm. Vrem să înțelegem afacerea, obiectivele și ce te frământă, înainte să propunem orice.',
    bullets: [
      'Discuție fără obligații',
      'Înțelegem obiectivele tale',
      'Stabilim bugetul și termenele',
    ],
  },
  {
    n: 2,
    title: 'Analiză',
    text: 'Studiem terenul. Cercetăm publicul, concurența și ce ai deja. Aici intră partea de date și neuromarketing, ca deciziile să nu fie pe ghicite.',
    bullets: [
      'Audit al prezenței actuale',
      'Analiza publicului și concurenței',
      'Heatmaps și date de comportament',
    ],
  },
  {
    n: 3,
    title: 'Strategie',
    text: 'Transformăm concluziile într-un plan concret, pe obiective măsurabile. Știi exact ce facem, pe ce canale și cu ce rezultat țintim.',
    bullets: [
      'Direcție creativă și mesaje',
      'Canale și calendar de execuție',
      'KPI și buget pe obiective',
    ],
  },
  {
    n: 4,
    title: 'Acțiune',
    text: 'Punem totul în mișcare: design, web, campanii. Lucrăm transparent, cu update-uri regulate, ca să știi mereu unde suntem.',
    bullets: ['Design și producție de conținut', 'Dezvoltare web', 'Lansare campanii'],
  },
  {
    n: 5,
    title: 'Rezultate',
    text: 'Măsurăm și optimizăm. Urmărim rezultatele, raportăm transparent și ajustăm continuu, pentru că treaba nu se termină la lansare.',
    bullets: [
      'Rapoarte clare, pe înțelesul tău',
      'Optimizare continuă',
      'Recomandări pentru pasul următor',
    ],
  },
];

/** Stack tehnologic (secțiunea „Cu ce lucrăm"). `logo` = URL (simpleicons CDN) sau local. */
export interface Tool {
  name: string;
  logo: string;
}
export interface ToolCategory {
  label: string;
  tools: Tool[];
}
export const toolCategories: ToolCategory[] = [
  {
    label: 'Design',
    tools: [
      { name: 'Figma', logo: 'https://cdn.simpleicons.org/figma' },
      { name: 'Photoshop', logo: '/tools/photoshop.svg' },
      { name: 'Illustrator', logo: '/tools/illustrator.svg' },
      { name: 'InDesign', logo: '/tools/indesign.svg' },
      { name: 'Premiere Pro', logo: '/tools/premiere.svg' },
      { name: 'CorelDRAW', logo: 'https://cdn.simpleicons.org/coreldraw' },
    ],
  },
  {
    label: 'Web',
    tools: [
      { name: 'WordPress', logo: 'https://cdn.simpleicons.org/wordpress' },
      { name: 'WooCommerce', logo: 'https://cdn.simpleicons.org/woocommerce' },
      { name: 'Elementor', logo: 'https://cdn.simpleicons.org/elementor' },
    ],
  },
  {
    label: 'Marketing',
    tools: [
      { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads' },
      { name: 'Search Console', logo: 'https://cdn.simpleicons.org/googlesearchconsole' },
      { name: 'Tag Manager', logo: 'https://cdn.simpleicons.org/googletagmanager' },
      { name: 'Google Analytics 4', logo: 'https://cdn.simpleicons.org/googleanalytics' },
      { name: 'MailerLite', logo: '/tools/mailerlite.svg' },
    ],
  },
  {
    label: 'Frontend',
    tools: [
      { name: 'React', logo: 'https://cdn.simpleicons.org/react' },
      { name: 'Vue.js', logo: 'https://cdn.simpleicons.org/vuedotjs' },
      { name: 'Next.js', logo: 'https://cdn.simpleicons.org/nextdotjs' },
      { name: 'TypeScript', logo: 'https://cdn.simpleicons.org/typescript' },
      { name: 'Tailwind CSS', logo: 'https://cdn.simpleicons.org/tailwindcss' },
    ],
  },
  {
    label: 'Backend',
    tools: [
      { name: 'Node.js', logo: 'https://cdn.simpleicons.org/nodedotjs' },
      { name: 'PHP', logo: 'https://cdn.simpleicons.org/php' },
      { name: 'Laravel', logo: 'https://cdn.simpleicons.org/laravel' },
      { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
    ],
  },
  {
    label: 'Bază de date',
    tools: [
      { name: 'MySQL', logo: 'https://cdn.simpleicons.org/mysql' },
      { name: 'PostgreSQL', logo: 'https://cdn.simpleicons.org/postgresql' },
      { name: 'Redis', logo: 'https://cdn.simpleicons.org/redis' },
    ],
  },
  {
    label: 'AI',
    tools: [
      { name: 'Claude', logo: 'https://cdn.simpleicons.org/claude' },
      { name: 'OpenAI', logo: '/tools/openai.svg' },
    ],
  },
];

/** Notă onestă afișată la secțiunea de unelte: dezvoltarea e făcută în mare parte cu AI. */
export const toolsAiNote =
  'Cea mai mare parte din dezvoltare — frontend, backend, baze de date — o construim asistat de AI. Fără vrăjeală: îl folosim acolo unde ne face mai rapizi și mai buni.';

/** Întrebări frecvente (FAQ). `body` paragrafe; `list` listă opțională. */
export interface Faq {
  q: string;
  body: string[];
  list?: string[];
}
export const faqs: Faq[] = [
  {
    q: 'Ce servicii oferiți, mai exact?',
    body: [
      'Suntem un singur partener pentru tot ce ține de imaginea și promovarea afacerii tale: de la identitate vizuală, până la campanii și site. Iată ce acoperim:',
    ],
    list: [
      'Marketing & social media',
      'Campanii plătite (Meta & Google Ads)',
      'Identitate vizuală & branding',
      'Grafică publicitară & print',
      'Site-uri & magazine online',
      'Foto-video de produs',
      'Copywriting & conținut',
      'Mentenanță & suport tehnic',
    ],
  },
  {
    q: 'Ce înseamnă „bazat pe date și neuromarketing"?',
    body: [
      'Înseamnă că nu ne bazăm pe „mie îmi place". Testăm deciziile de design cu instrumente de neuromarketing (analiza atenției vizuale, hărți termice) și le validăm cu date reale din Analytics și tracking de conversii, înainte și după lansare. Așa cheltui bugetul acolo unde chiar contează.',
    ],
  },
  {
    q: 'Cum decurge colaborarea, de la prima discuție?',
    body: [
      'Simplu, în 5 pași: întâlnire (fără obligații) → analiză → strategie → execuție → rezultate. Primești un plan clar, pe obiective, și update-uri regulate. Tu te ocupi de afacere, noi de restul.',
    ],
  },
  {
    q: 'Cât costă un proiect?',
    body: [
      'Depinde de obiective și de amploarea proiectului: de aceea pornim mereu de la o discuție și o ofertă personalizată, nu de la un preț de raft. Spune-ne ce ai nevoie și îți facem o propunere clară, cu buget pe obiective.',
    ],
  },
  {
    q: 'Lucrați și cu afaceri mici sau la început de drum?',
    body: [
      'Da, exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără bătăi de cap și fără limbaj corporatist.',
    ],
  },
];

/**
 * FAQ general aprobat (Andrei) - 11 întrebări. Folosit pe pagina Mentenanță
 * și candidat pentru schema FAQPage (GEO). Text aprobat, nemodificat.
 */
export const generalFaqs: Faq[] = [
  {
    q: 'Oferiți mentenanță web lunară?',
    body: [
      'Da: pachete cu actualizări de platformă & module, backup-uri regulate, monitorizare securitate, timp de intervenție garantat. Tu pe afacere, noi pe partea tehnică.',
    ],
  },
  {
    q: 'Cât durează un website de prezentare?',
    body: [
      'Depinde de complexitate; în general 2-4 săptămâni (design, dezvoltare, testare, lansare).',
    ],
  },
  {
    q: 'Ce include un pachet de branding/creație grafică?',
    body: [
      'Personalizat; poate include logo, manual de identitate, cărți de vizită, semnături email, grafică social media, materiale publicitare.',
    ],
  },
  {
    q: 'Pot să-mi actualizez singur site-ul după lansare?',
    body: ['Da; construite pe CMS ușor de folosit + scurt training.'],
  },
  {
    q: 'Site-urile sunt optimizate pentru mobil?',
    body: ['Da, 100%; design responsiv pe orice dispozitiv.'],
  },
  {
    q: 'Oferiți găzduire & înregistrare domeniu?',
    body: [
      'Ne concentrăm pe design/dezvoltare, dar te ajutăm să alegi hosting și să înregistrezi domeniul; le putem gestiona noi.',
    ],
  },
  {
    q: 'Care sunt pașii pentru a începe?',
    body: [
      'Mesaj/apel → întâlnire (fizic/online) → propunere personalizată → contract + avans → treabă.',
    ],
  },
  {
    q: 'Realizați magazine online?',
    body: [
      'Da; magazine rapide, sigure, integrate cu sisteme de plată cu cardul și curierat din România.',
    ],
  },
  {
    q: 'Cum se face plata?',
    body: [
      'Dezvoltare web & branding: avans 40-50% la semnare, rest la finalizare. Mentenanța: lunar.',
    ],
  },
  {
    q: 'Oferiți suport tehnic la probleme?',
    body: ['Da; prioritar pentru clienții cu pachet de mentenanță; altfel, la tarif orar.'],
  },
  {
    q: 'Puteți reface un site existent?',
    body: ['Da; audit + redesign, optimizare viteză și UX, păstrând ce funcționează.'],
  },
];

/** FAQ specific paginii /pachete (timeline, hosting, redesign, tehnologii, taxe). */
export const packagesFaqs: Faq[] = [
  {
    q: 'Cât durează, de la start la lansare?',
    body: [
      'Un site de prezentare e gata în 2-4 săptămâni. Dacă vorbim de o platformă cu funcții pe comandă, integrări și panou de administrare, socotește între 2 și 6 luni, depinde cât de complex e ce ai în cap.',
    ],
  },
  {
    q: 'Vă ocupați și de găzduire și de mentenanță?',
    body: [
      'Da. Ne ocupăm de găzduire, mentenanță lunară, securitate și actualizări, plus suport când apare ceva. După ce site-ul e live rămânem alături de tine, nu îți dăm fișierele și succes.',
    ],
  },
  {
    q: 'Puteți reface un site pe care îl am deja?',
    body: [
      'Sigur. Refacem din temelii un site care arată sau merge prost și migrăm de pe WordPress, Joomla sau alt CMS spre ceva modern și rapid. Ce funcționează deja păstrăm.',
    ],
  },
  {
    q: 'Cu ce lucrați, mai exact?',
    body: [
      'Depinde de proiect. La interfață mergem pe React, Next.js sau Vue, iar în spate pe Node.js, Python sau PHP/Laravel. Alegem ce se potrivește treabei tale, nu te punem să te pliezi pe o tehnologie anume.',
    ],
  },
  {
    q: 'Sunt costuri ascunse?',
    body: [
      'Nu. Prețul din pachet e cel pe care îl plătești, fără surprize la final. Simplead nu e plătitor de TVA.',
    ],
  },
];

/**
 * Aplicația proprie de monitorizare „SimpleAd Manager" - secțiunile pe teme de pe
 * pagina Mentenanță (stil simplenet „Viteza ca o fundație"): coloana stângă =
 * intro sticky (etichetă + titlu + paragraf + link-uri către celelalte teme),
 * coloana dreaptă = carduri cu detalii + un FAQ propriu temei.
 * Conținut derivat din funcționalitățile aplicației (FUNCTIONALITATI.md).
 */
export interface AppCard {
  title: string;
  body: string[];
}
export interface AppTopic {
  /** ancoră pentru link-urile de navigare între teme. */
  id: string;
  /** inner-SVG (24×24, stroke) pentru iconița din etichetă. */
  icon: string;
  eyebrow: string;
  title: string;
  titleAccent: string;
  intro: string;
  cards: AppCard[];
  faqs: Faq[];
}
export const appTopics: AppTopic[] = [
  {
    id: 'monitorizare',
    icon: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
    eyebrow: 'Monitorizare',
    title: 'Site-ul tău, sub observație ',
    titleAccent: 'non-stop',
    intro:
      'Aplicația noastră internă, SimpleAd Manager, urmărește continuu sănătatea site-ului tău. În clipa în care ceva nu mai e în regulă, suntem anunțați automat, de cele mai multe ori înainte să observi tu sau clienții tăi.',
    cards: [
      {
        title: 'Uptime și disponibilitate',
        body: [
          'Verificăm site-ul automat, la intervale configurabile (HTTP/HTTPS), urmărim valabilitatea certificatului SSL și detectăm chiar și „ecranul alb".',
          'Când ceva pică, primim alertă imediat (email, Slack, Discord, Telegram sau webhook) și intervenim.',
        ],
      },
      {
        title: 'Performanță și Core Web Vitals',
        body: [
          'Rulăm teste de viteză (PageSpeed/Lighthouse) pe mai multe pagini și urmărim Core Web Vitals (LCP, CLS) în timp, cu praguri și istoric.',
          'Așa vedem din vreme dacă site-ul începe să încetinească și putem acționa înainte să te coste vizitatori.',
        ],
      },
      {
        title: 'DNS, domenii și email',
        body: [
          'Detectăm modificările de DNS, cu valori înainte/după, și verificăm protecția email-ului (SPF, DKIM, DMARC).',
          'Astfel afli rapid dacă cineva îți schimbă configurația sau dacă mesajele tale riscă să ajungă în spam.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cât de repede aflu dacă pică site-ul?',
        body: [
          'Verificăm site-ul automat, la intervale scurte. Când ceva nu răspunde cum trebuie, primim alertă imediat și intervenim, de cele mai multe ori înainte să observi tu sau clienții tăi.',
        ],
      },
      {
        q: 'Ce monitorizează exact SimpleAd Manager?',
        body: [
          'Disponibilitatea (uptime) și certificatul SSL, starea de securitate, actualizările disponibile, backup-urile, viteza și Core Web Vitals, audit SEO periodic, plus DNS și protecția email. Practic, toată sănătatea tehnică a site-ului într-un singur loc.',
        ],
      },
    ],
  },
  {
    id: 'securitate',
    icon: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/>',
    eyebrow: 'Securitate',
    title: 'Protecție și plasă de siguranță, ',
    titleAccent: 'la fiecare nivel',
    intro:
      'Te apărăm proactiv de probleme și păstrăm mereu o cale de întoarcere. Scanăm vulnerabilitățile, întărim site-ul și facem backup-uri pe care le putem restaura într-un singur click.',
    cards: [
      {
        title: 'Scanare și întărire',
        body: [
          'Scanăm constant punctele slabe: WordPress neactualizat, debug expus, user „admin" implicit, permisiuni greșite de fișiere, XML-RPC.',
          'Acolo unde se poate, aplicăm măsuri de întărire (hardening), ca site-ul să fie mai greu de spart.',
        ],
      },
      {
        title: 'Backup și restaurare',
        body: [
          'Facem backup automat și programat (bază de date + fișiere), cu stocare incrementală și copii în mai multe locuri (S3, Dropbox, local).',
          'Dacă e nevoie, restaurăm site-ul la o versiune funcțională cu un singur click.',
        ],
      },
      {
        title: 'Comunicare securizată',
        body: [
          'Legătura dintre aplicație și site-ul tău este semnată criptografic (HMAC-SHA256) și protejată împotriva interceptării și a reluării atacurilor.',
          'Practic, doar aplicația noastră poate da comenzi site-ului tău, nimeni altcineva.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Datele și backup-urile mele sunt în siguranță?',
        body: [
          'Da. Backup-urile sunt copiate în mai multe locuri (S3, Dropbox, local), iar comunicarea dintre aplicație și site este semnată și protejată. Datele rămân ale tale și le putem restaura oricând.',
        ],
      },
      {
        q: 'Ce se întâmplă dacă site-ul cade sau e infectat?',
        body: [
          'Monitorizăm disponibilitatea și intervenim. Cu backup-urile regulate putem restaura rapid site-ul la o versiune funcțională și curată, iar pentru infecții oferim suport dedicat de curățare.',
        ],
      },
    ],
  },
  {
    id: 'automatizare',
    icon: '<path d="M13 2L4.5 13H11l-1 9 8.5-11H12z"/>',
    eyebrow: 'Automatizare',
    title: 'Probleme rezolvate din timp, ',
    titleAccent: 'rapoarte clare',
    intro:
      'Multe lucruri se rezolvă automat, înainte să devină probleme. Iar tu primești lunar un raport clar, fără jargon tehnic, cu tot ce s-a întâmplat cu site-ul tău.',
    cards: [
      {
        title: 'Actualizări sigure',
        body: [
          'Nu actualizăm „pe încredere": facem backup, o captură înainte, aplicăm update-ul, încă o captură după și comparăm vizual cele două.',
          'Dacă apare o problemă, revenim automat la versiunea anterioară (rollback), fără întreruperi pentru tine.',
        ],
      },
      {
        title: 'Răspuns automat la incidente',
        body: [
          'Pentru situațiile clare avem scenarii predefinite plus un diagnostic asistat de AI care încearcă să rezolve singur problema: site căzut, bază de date critică, plugin vulnerabil.',
          'Deciziile importante rămân la noi, iar tu primești un rezumat cu ce s-a întâmplat.',
        ],
      },
      {
        title: 'Rapoarte și notificări',
        body: [
          'Lunar primești un raport PDF personalizat (cu logo) care adună uptime, securitate, actualizări, backup, performanță și SEO.',
          'Plus alerte în timp real pe canalul preferat, cu ore de liniște ca să nu te deranjăm noaptea degeaba.',
        ],
      },
    ],
    faqs: [
      {
        q: 'Cum vă asigurați că o actualizare nu strică site-ul?',
        body: [
          'Înainte de orice update facem backup și o captură a site-ului, aplicăm actualizarea, facem o nouă captură și le comparăm vizual. Dacă apare o diferență sau o eroare, revenim automat la versiunea anterioară, fără ca tu să simți întreruperi.',
        ],
      },
      {
        q: 'Primesc rapoarte? Ce conțin?',
        body: [
          'Da. Lunar primești un raport PDF personalizat (cu logo) care adună uptime, securitate, actualizările făcute, backup-urile, performanța și evoluția SEO. Vezi clar, fără jargon, ce s-a întâmplat cu site-ul tău.',
        ],
      },
    ],
  },
];

/** Testimoniale. */
export interface Testimonial {
  quote: string;
  author: string;
  company: string;
}
export const testimonials: Testimonial[] = [
  {
    quote:
      'Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
    author: 'Ștefan Chelmu',
    company: 'Blitzstudio',
  },
  {
    quote:
      'Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră. I-am recomandat cu mare încredere și altor colegi.',
    author: 'Silviu Costiniuc',
    company: 'Echipamente-medicale.ro',
  },
  {
    quote: 'Simply professional. Trustworthy, honest and creative.',
    author: 'Bogdan Drăgan',
    company: 'FEAA Galați',
  },
];

/**
 * Studii de caz pe taburi (homepage, stil HubSpot). Fiecare tab = o categorie
 * cu un studiu de caz (imagine + citat + autor + link + 2 statistici).
 * Cifrele marcate sunt estimative/placeholder - de confirmat de Andrei.
 */
export interface CaseStat {
  value: string;
  label: string;
}
export interface HomeCaseStudy {
  /** Eticheta tabului. */
  tab: string;
  /** Inițiale pentru placeholder-ul de imagine (până la poze reale). */
  logo: string;
  /** URL imagine opțional; gol = placeholder grafic. */
  image: string;
  imageAlt: string;
  quote: string;
  author: string;
  role: string;
  href: string;
  stats: CaseStat[];
}
export const homeCaseStudies: HomeCaseStudy[] = [
  {
    tab: 'Web & eCommerce',
    logo: 'EM',
    image: '',
    imageAlt: 'Proiect web Echipamente-medicale.ro',
    quote:
      'Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră.',
    author: 'Silviu Costiniuc',
    role: 'Echipamente-medicale.ro',
    href: '/portofoliu',
    stats: [
      { value: '3 săpt.', label: 'de la brief la lansare' }, // TODO: confirmă
      { value: '100%', label: 'responsiv, pe orice dispozitiv' },
    ],
  },
  {
    tab: 'Branding & creație',
    logo: 'BS',
    image: '',
    imageAlt: 'Proiect de branding Blitzstudio',
    quote:
      'Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
    author: 'Ștefan Chelmu',
    role: 'Blitzstudio',
    href: '/portofoliu',
    stats: [
      { value: '2', label: 'proiecte împreună' },
      { value: '100%', label: 'ar recomanda mai departe' }, // TODO: confirmă
    ],
  },
  {
    tab: 'Mentenanță & suport',
    logo: 'FE',
    image: '',
    imageAlt: 'Mentenanță website FEAA Galați',
    quote: 'Simply professional. Trustworthy, honest and creative.',
    author: 'Bogdan Drăgan',
    role: 'FEAA Galați',
    href: '/portofoliu',
    stats: [
      { value: '99.9%', label: 'uptime monitorizat' }, // TODO: confirmă
      { value: '5+ ani', label: 'parteneriat continuu' }, // TODO: confirmă
    ],
  },
];

/** Clienți & parteneri (nume; logo-uri de adăugat ulterior). */
export const clients: string[] = [
  'FEAA Galați',
  'Blitzstudio',
  'Echipamente-medicale.ro',
  // TODO: adaugă restul + logo-uri
];

/** Valorile companiei (pagina Despre). */
export const values: string[] = ['Simplu', 'Onest', 'Creativ', 'Bazat pe rezultate'];

/** „Ce ne face diferiți" (pagina Despre). */
export const aboutDifferentiators: Differentiator[] = [
  {
    title: 'Știință, nu presupuneri',
    text: 'Folosim neuromarketing (analiza atenției vizuale, heatmaps) și date reale ca să luăm decizii.',
  },
  {
    title: 'Simplu de la cap la coadă',
    text: 'Un proces clar și un singur partener pentru grafică, web și marketing.',
  },
  {
    title: 'De partea afacerilor mici',
    text: 'Îți dăm instrumentele cu care concurezi cu jucătorii mari.',
  },
];

/** Pași „Cum începem colaborarea" (hub /servicii). */
export interface StartStep {
  n: string;
  title: string;
  text: string;
}
export const startSteps: StartStep[] = [
  {
    n: '01',
    title: 'Ne scrii',
    text: 'Completezi formularul sau ne suni. Ne spui pe scurt unde vrei să ajungi.',
  },
  {
    n: '02',
    title: 'Discutăm',
    text: 'Stabilim o întâlnire fără obligații și înțelegem nevoile, bugetul și termenele.',
  },
  {
    n: '03',
    title: 'Primești oferta',
    text: 'Îți trimitem o propunere clară, cu plan pe obiective și buget transparent.',
  },
  {
    n: '04',
    title: 'Începem',
    text: 'Punem totul în mișcare și te ținem la curent la fiecare pas.',
  },
];

/** Bullet-urile din panelul „De ce Simplead?" (hero hub /servicii). */
export const whyPanel: string[] = [
  'Un singur partener pentru grafică, web și marketing',
  'Decizii bazate pe date și neuromarketing',
  'Proces simplu, cu efort minim din partea ta',
  'Condus de Andrei Panait, doctor în marketing',
];

/** Statisticile compacte din hero-ul hub /servicii (valoare + sufix accent + etichetă). */
export interface HubStat {
  value: string;
  em: string;
  label: string;
}
export const svcHubStats: HubStat[] = [
  { value: 'zeci', em: '', label: 'proiecte' }, // TODO: nr. exact (confirmă Andrei)
  { value: '10', em: '+', label: 'ani experiență' },
  { value: 'Dr.', em: '', label: 'în marketing' },
];

/** FAQ specific paginii hub /servicii (diferit de FAQ-ul de pe Acasă). */
export const servicesFaqs: Faq[] = [
  {
    q: 'Pot lua un singur serviciu sau trebuie pachetul întreg?',
    body: [
      'Cum vrei tu. Poți începe cu un singur lucru — doar site-ul sau doar social media — și adăugăm restul când ai nevoie. Avantajul e că, fiind un singur partener, totul rămâne coerent.',
    ],
  },
  {
    q: 'Ce înseamnă „pe date și neuromarketing"?',
    body: [
      'Înseamnă că nu mergem pe „mie îmi place". Testăm deciziile cu instrumente de neuromarketing (atenție vizuală, heatmaps) și le validăm cu date reale din Analytics și tracking de conversii, înainte și după lansare.',
    ],
  },
  {
    q: 'Cât costă o colaborare cu Simplead?',
    body: [
      'Depinde de obiective și de amploarea proiectului — de aceea pornim mereu de la o discuție și o ofertă pe obiective, nu de la un preț de raft. Spune-ne ce ai nevoie și primești o propunere clară.',
    ],
  },
  {
    q: 'În cât timp se văd primele rezultate?',
    body: [
      'Depinde de serviciu: un site se vede în câteva săptămâni, o campanie dă primele semnale în câteva zile, iar brandingul construiește pe termen lung. La prima discuție îți dăm așteptări realiste, nu promisiuni.',
    ],
  },
  {
    q: 'Lucrați și cu afaceri mici sau la început de drum?',
    body: [
      'Da, exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără bătăi de cap și fără limbaj corporatist.',
    ],
  },
];
