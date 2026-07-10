/**
 * Date de conținut pentru secțiunile de pe Acasă + pagini.
 * Cifrele/valorile marcate TODO trebuie confirmate de client.
 */

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
    text: 'Punem totul în mișcare: design, grafică, web. Lucrăm transparent, cu update-uri regulate, ca să știi mereu unde suntem.',
    bullets: ['Design și producție de conținut', 'Dezvoltare web', 'Grafică și materiale de promovare'],
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
  'Cea mai mare parte din dezvoltare (frontend, backend, baze de date) o construim asistat de AI. Fără vrăjeală: îl folosim acolo unde ne face mai rapizi și mai buni.';

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
      'Suntem un singur partener pentru tot ce ține de imaginea și promovarea afacerii tale: de la identitate vizuală, până la grafică și site. Iată ce acoperim:',
    ],
    list: [
      'Marketing & social media',
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
      'Găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la <a href="https://www.simplenet.ro" target="_blank" rel="noopener">Simplenet</a>, iar la nevoie te ajutăm să alegi și domeniul potrivit. Le plătești direct la ei, fără marjă de la noi; noi ne ocupăm de site.',
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
    q: 'Sunt costuri ascunse?',
    body: [
      'Nu. Prețul agreat e cel pe care îl plătești. Simplead nu e plătitor de TVA, prețurile sunt finale.',
    ],
  },
  {
    q: 'Cât durează de la start la lansare?',
    body: [
      'Un site de prezentare e gata în 2-4 săptămâni. Un magazin online sau o platformă mai complexă poate lua 4-8 săptămâni. Îți dăm un termen clar după ce discutăm.',
    ],
  },
  {
    q: 'Vă ocupați și de găzduire?',
    body: [
      'Nu, găzduirea nu e la noi. Pentru hosting îi recomandăm pe cei de la <a href="https://www.simplenet.ro" target="_blank" rel="noopener">Simplenet</a>: o plătești direct la ei, fără marjă de la noi. Noi ne ocupăm de site și de partea tehnică.',
    ],
  },
  {
    q: 'Puteți reface un site pe care îl am deja?',
    body: [
      'Da. Redesign complet sau optimizare, îți spunem onest ce are sens după ce ne uităm la ce ai acum.',
    ],
  },
  {
    q: 'Pot combina serviciile?',
    body: [
      'Da, și de obicei e mai eficient. Web, mentenanță și grafică la același partener înseamnă coerență: fără trei furnizori care nu știu unul de altul.',
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
    faqs: [],
  },
  {
    id: 'securitate',
    icon: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/>',
    eyebrow: 'Securitate',
    title: 'Protecție și plasă de siguranță, ',
    titleAccent: 'la fiecare nivel',
    intro:
      'Te apărăm de probleme din timp și păstrăm mereu o cale de întoarcere. Scanăm vulnerabilitățile, întărim site-ul și facem backup-uri pe care le putem restaura într-un singur click.',
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
    faqs: [],
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
        title: 'Alertă automată la incidente',
        body: [
          'Pentru situațiile clare avem scenarii predefinite, iar un diagnostic asistat de AI ne alertează cu context deja pregătit: site căzut, bază de date critică, plugin vulnerabil.',
          'Intervenim noi: deciziile importante rămân la oameni, iar tu primești un rezumat cu ce s-a întâmplat.',
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
    faqs: [],
  },
];

/** Testimoniale. */
export interface Testimonial {
  quote: string;
  author: string;
  company: string;
  /** Inițiale pentru avatar-monogram (fallback când nu există poză). */
  monogram?: string;
  /** Aspectul cardului în grid-ul bento (homepage). */
  variant?: 'featured' | 'electric' | 'dark';
  /** URL poză opțional; gol = se folosește monogramul. */
  photo?: string;
}
export const testimonials: Testimonial[] = [
  // ── Testimoniale REALE (din proiecte existente). ──────────────────────────
  {
    quote:
      'Profesionalism, fairplay, pricepere, asumare: cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
    author: 'Ștefan Chelmu',
    company: 'Blitzstudio',
    monogram: 'ȘC',
    variant: 'featured',
  },
  {
    quote:
      'Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor propuse. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră. I-am recomandat cu mare încredere și altor colegi.',
    author: 'Silviu Costiniuc',
    company: 'Echipamente-medicale.ro',
    monogram: 'SC',
    variant: 'featured',
  },
  {
    quote: 'Simply professional. Trustworthy, honest and creative.',
    author: 'Bogdan Drăgan',
    company: 'FEAA Galați',
    monogram: 'BD',
    variant: 'electric',
  },
  // ⚠️ PLACEHOLDER — testimoniale FICTIVE, de înlocuit cu reale înainte de a le
  // considera definitive. Nume/companii inventate; păstrate doar pentru a umple
  // layout-ul bento. Vezi și convenția „de confirmat de Andrei" din homeCaseStudies.
  {
    quote:
      'Comunicare clară de la brief la livrare. Am primit exact ce ne-am dorit, la timp și fără surprize.',
    author: 'Andreea Marin', // PLACEHOLDER
    company: 'Verdana Studio', // PLACEHOLDER
    monogram: 'AM',
    variant: 'dark',
  },
  {
    quote:
      'Site-ul nou ne-a adus mai multe cereri de ofertă în prima lună decât tot anul trecut. Recomand fără rezerve.',
    author: 'Radu Popescu', // PLACEHOLDER
    company: 'Nordis Construct', // PLACEHOLDER
    monogram: 'RP',
    variant: 'dark',
  },
  {
    quote:
      'Oameni cu care e ușor să lucrezi: ascultă, propun soluții și își respectă termenele.',
    author: 'Ioana Dumitru', // PLACEHOLDER
    company: 'Lumea Copiilor', // PLACEHOLDER
    monogram: 'ID',
    variant: 'dark',
  },
  {
    quote:
      'De la rebranding până la mentenanță lunară, ne-au fost alături la fiecare pas. Un partener de încredere.',
    author: 'Mihai Ionescu', // PLACEHOLDER
    company: 'Cofetăria Dulce', // PLACEHOLDER
    monogram: 'MI',
    variant: 'electric',
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
  'Condus de Andrei Panait, cu fundal de cercetare în marketing',
];

/** Statisticile compacte din hero-ul hub /servicii (valoare + sufix accent + etichetă). */
export interface HubStat {
  value: string;
  em: string;
  label: string;
}
export const svcHubStats: HubStat[] = [
  { value: 'zeci', em: '', label: 'proiecte' }, // TODO: nr. exact (confirmă Andrei)
  { value: '10', em: '+', label: 'ani experiență' }, // TODO: cifră neconfirmată, vezi audit-text-v1.md
  { value: '6', em: '', label: 'servicii, un singur partener' },
];

/** FAQ specific paginii hub /servicii (diferit de FAQ-ul de pe Acasă). */
export const servicesFaqs: Faq[] = [
  {
    q: 'Pot lua un singur serviciu sau trebuie să iau tot?',
    body: [
      'Cum ai nevoie. Poți începe cu un singur lucru și adăugăm restul când are sens. Nu lucrăm cu pachete rigide impuse.',
    ],
  },
  {
    q: 'Cât costă o colaborare?',
    body: [
      'Găsești prețurile de start pe pagina Pachete. Pentru proiecte mai complexe pornim de la o discuție și îți dăm o ofertă concretă, nu un deviz standard trimis automat.',
    ],
  },
  {
    q: 'Ce înseamnă „pe date și neuromarketing"?',
    body: [
      'Înseamnă că nu mergem pe „mie îmi place". Testăm cu instrumente de neuromarketing: atenție vizuală, heatmaps și date reale din Analytics. Bugetul tău ajunge acolo unde chiar contează.',
    ],
  },
  {
    q: 'Lucrați și cu afaceri mici?',
    body: [
      'Da, exact pentru ele există Simplead. Instrumente și metodă de agenție mare, la scara unui partener care te cunoaște pe tine.',
    ],
  },
  {
    q: 'Oferiți și suport tehnic punctual, fără proiect?',
    body: [
      'Da. WordPress, SSL, DNS, securitate, email, migrare și quick fix. Găsești tot pe pagina Suport tehnic.',
    ],
  },
];

/**
 * „De ce Simplead" (S7) — bloc comun de diferențiatori, afișat pe toate paginile
 * de serviciu. `icon` = inner SVG (viewBox 0 0 24 24, stroke).
 */
export interface WhyItem {
  icon: string;
  title: string;
  body: string;
}
export const whySimplead: WhyItem[] = [
  {
    icon: '<path d="M3 12h4l3 8 4-16 3 8h4"/>',
    title: 'Pornim de la date, nu de la „mie îmi place"',
    body: 'Nu ne bazăm pe gusturi. Ne uităm la cum se comportă oamenii cu adevărat înainte ca ceva să ajungă public. Așa știm de ce funcționează, dincolo de cum arată.',
  },
  {
    icon: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/>',
    title: 'Prindem problema înainte s-o vezi',
    body: 'Aplicația noastră, SimpleAd Manager, urmărește non-stop uptime, securitate, viteză și backup. De cele mai multe ori intervenim înainte ca tu sau clienții tăi să observați ceva.',
  },
  {
    icon: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    title: 'Suntem puțini, și asta e intenționat',
    body: 'Web, grafică, mentenanță și social, toate la aceeași echipă restrânsă. Nu alergi între furnizori care nu vorbesc între ei și nu se pierde nimic pe drum.',
  },
  {
    icon: '<path d="M20 6L9 17l-5-5"/>',
    title: 'Îți spunem și când nu-ți trebuie',
    body: 'Dacă un site merită reparat, nu reconstruit, îți zicem. Dacă undeva nu ai nevoie de noi, la fel. Fără costuri ascunse. Și fără TVA, prețul e prețul.',
  },
];

/** FAQ specific paginii /mentenanta (înlocuiește FAQ-ul generic de jos). */
export const mentenantaFaqs: Faq[] = [
  {
    q: 'Oferiți mentenanță web lunară?',
    body: [
      'Da. Pachete cu actualizări de platformă și module, backup-uri regulate, monitorizare de securitate și uptime, plus timp de intervenție inclus. Tu pe afacere, noi pe partea tehnică.',
    ],
  },
  {
    q: 'Ce monitorizați, mai exact?',
    body: [
      'Disponibilitate (uptime) și certificat SSL, securitate și actualizări, backup-uri, viteză și Core Web Vitals, plus DNS și protecția emailului, totul prin SimpleAd Manager, cu alerte în timp real.',
    ],
  },
  {
    q: 'Datele și backup-urile mele sunt în siguranță?',
    body: [
      'Da. Backup-urile sunt copiate în mai multe locuri, iar comunicarea dintre aplicație și site e semnată și protejată. Le putem restaura rapid la nevoie.',
    ],
  },
  {
    q: 'Ce se întâmplă dacă pică sau e infectat site-ul?',
    body: [
      'Suntem anunțați automat și intervenim. Cu backup-urile regulate readucem rapid site-ul la o versiune funcțională și curată.',
    ],
  },
  {
    q: 'Cât de repede aflu dacă pică site-ul?',
    body: [
      'Verificăm site-ul automat, la intervale scurte. Când ceva nu răspunde cum trebuie, primim alertă imediat și intervenim, de cele mai multe ori înainte să observi tu sau clienții tăi.',
    ],
  },
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
  {
    q: 'Cât costă?',
    body: [
      'Standard 75€/lună, Premium 120€/lună, plus add-on-uri opționale. Calculează-ți pachetul exact cu ajutorul calculatorului de mai sus. Simplead nu e plătitor de TVA: prețurile sunt finale.',
    ],
  },
];
