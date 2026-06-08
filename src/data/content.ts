/**
 * Date de conținut pentru secțiunile de pe Acasă + pagini.
 * Cifrele/valorile marcate TODO trebuie confirmate de client.
 */

/** Bara de statistici din hero (4 cifre — valori din design, de confirmat). */
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
  'Grafică, web & branding — un singur partener',
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

/** Diferențiator „Nu ghicim. Măsurăm." — cele 3 puncte. */
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

/** Procesul în 5 pași — cu detalii pentru tab-urile interactive (din design). */
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
    text: 'Pornim de la tine. Ne așezăm la masă — fizic sau online — și ascultăm. Vrem să înțelegem afacerea, obiectivele și ce te frământă, înainte să propunem orice.',
    bullets: ['Discuție fără obligații', 'Înțelegem obiectivele tale', 'Stabilim bugetul și termenele'],
  },
  {
    n: 2,
    title: 'Analiză',
    text: 'Studiem terenul. Cercetăm publicul, concurența și ce ai deja. Aici intră partea de date și neuromarketing — ca deciziile să nu fie pe ghicite.',
    bullets: ['Audit al prezenței actuale', 'Analiza publicului și concurenței', 'Heatmaps și date de comportament'],
  },
  {
    n: 3,
    title: 'Strategie',
    text: 'Transformăm concluziile într-un plan concret, pe obiective măsurabile. Știi exact ce facem, pe ce canale și cu ce rezultat țintim.',
    bullets: ['Direcție creativă și mesaje', 'Canale și calendar de execuție', 'KPI și buget pe obiective'],
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
    text: 'Măsurăm și optimizăm. Urmărim rezultatele, raportăm transparent și ajustăm continuu — pentru că treaba nu se termină la lansare.',
    bullets: ['Rapoarte clare, pe înțelesul tău', 'Optimizare continuă', 'Recomandări pentru pasul următor'],
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
      { name: 'After Effects', logo: '/tools/aftereffects.svg' },
      { name: 'Premiere Pro', logo: '/tools/premiere.svg' },
    ],
  },
  {
    label: 'Web',
    tools: [
      { name: 'WordPress', logo: 'https://cdn.simpleicons.org/wordpress' },
      { name: 'WooCommerce', logo: 'https://cdn.simpleicons.org/woocommerce' },
      { name: 'Elementor', logo: 'https://cdn.simpleicons.org/elementor' },
      { name: 'HTML / CSS', logo: 'https://cdn.simpleicons.org/html5' },
      { name: 'PHP', logo: 'https://cdn.simpleicons.org/php' },
      { name: 'Webflow', logo: 'https://cdn.simpleicons.org/webflow' },
    ],
  },
  {
    label: 'Marketing & Ads',
    tools: [
      { name: 'Meta Ads', logo: 'https://cdn.simpleicons.org/meta' },
      { name: 'Google Ads', logo: 'https://cdn.simpleicons.org/googleads' },
      { name: 'TikTok Ads', logo: 'https://cdn.simpleicons.org/tiktok' },
      { name: 'Mailchimp', logo: 'https://cdn.simpleicons.org/mailchimp' },
      { name: 'Canva', logo: '/tools/canva.svg' },
      { name: 'CapCut', logo: '/tools/capcut.svg' },
    ],
  },
  {
    label: 'Analiză & Neuromarketing',
    tools: [
      { name: 'Google Analytics', logo: 'https://cdn.simpleicons.org/googleanalytics' },
      { name: 'Search Console', logo: 'https://cdn.simpleicons.org/googlesearchconsole' },
      { name: 'Hotjar', logo: 'https://cdn.simpleicons.org/hotjar' },
      { name: 'Looker Studio', logo: 'https://cdn.simpleicons.org/looker' },
      { name: 'Meta Pixel', logo: 'https://cdn.simpleicons.org/meta' },
      { name: 'Tag Manager', logo: 'https://cdn.simpleicons.org/googletagmanager' },
    ],
  },
];

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
      'Suntem un singur partener pentru tot ce ține de imaginea și promovarea afacerii tale — de la identitate vizuală, până la campanii și site. Iată ce acoperim:',
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
      'Înseamnă că nu ne bazăm pe „mie îmi place". Testăm deciziile de design cu instrumente de neuromarketing (analiza atenției vizuale, hărți termice) și le validăm cu date reale din Analytics și tracking de conversii — înainte și după lansare. Așa cheltui bugetul acolo unde chiar contează.',
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
      'Depinde de obiective și de amploarea proiectului — de aceea pornim mereu de la o discuție și o ofertă personalizată, nu de la un preț de raft. Spune-ne ce ai nevoie și îți facem o propunere clară, cu buget pe obiective.',
    ],
  },
  {
    q: 'Lucrați și cu afaceri mici sau la început de drum?',
    body: [
      'Da — exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără bătăi de cap și fără limbaj corporatist.',
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
      'Profesionalism, fairplay, pricepere, asumare — cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
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
  { n: '01', title: 'Ne scrii', text: 'Completezi formularul sau ne suni. Ne spui pe scurt unde vrei să ajungi.' },
  { n: '02', title: 'Discutăm', text: 'Stabilim o întâlnire fără obligații și înțelegem nevoile, bugetul și termenele.' },
  { n: '03', title: 'Primești oferta', text: 'Îți trimitem o propunere clară, cu plan pe obiective și buget transparent.' },
  { n: '04', title: 'Începem', text: 'Punem totul în mișcare și te ținem la curent la fiecare pas.' },
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
    q: 'Pot lua un singur serviciu sau trebuie tot pachetul?',
    body: [
      'Cum vrei tu. Poți începe cu un singur serviciu — de exemplu doar site-ul sau doar social media — și adăugăm restul când ai nevoie. Avantajul e că, fiind un singur partener, totul rămâne coerent.',
    ],
  },
  {
    q: 'Ce înseamnă „bazat pe date și neuromarketing"?',
    body: [
      'Înseamnă că nu ne bazăm pe „mie îmi place". Testăm deciziile de design cu instrumente de neuromarketing (atenție vizuală, hărți termice) și le validăm cu date reale din Analytics și tracking de conversii — înainte și după lansare.',
    ],
  },
  {
    q: 'Cât costă o colaborare cu Simplead?',
    body: [
      'Depinde de obiective și de amploarea proiectului — de aceea pornim mereu de la o discuție și o ofertă personalizată, nu de la un preț de raft. Spune-ne ce ai nevoie și îți facem o propunere clară, cu buget pe obiective.',
    ],
  },
  {
    q: 'În cât timp văd primele rezultate?',
    body: [
      'Depinde de serviciu: un site se vede în câteva săptămâni, o campanie începe să dea semnale în primele zile, iar brandingul construiește pe termen lung. La prima discuție îți dăm așteptări realiste, nu promisiuni goale.',
    ],
  },
  {
    q: 'Lucrați și cu afaceri mici sau la început de drum?',
    body: [
      'Da — exact pentru ele există Simplead. Îți dăm instrumentele cu care concurezi de la egal la egal cu jucătorii mari, fără bătăi de cap și fără limbaj corporatist.',
    ],
  },
];
