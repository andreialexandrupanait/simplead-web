/**
 * Testimoniale comune, afișate (deocamdată) identic pe toate paginile de
 * servicii în secțiunea de dovadă socială (ClientCase). Ulterior pot fi
 * filtrate/înlocuite per serviciu.
 */
export interface Testimonial {
  quote: string;
  body: string;
  client: string;
  clientNote: string;
  clientLogo: string;
}

/** Statistica din coloana navy — comună (deocamdată) pe toate paginile. */
export const caseStat = {
  statBig: '72+',
  statBigAccent: 'de proiecte',
  statCap: 'Afaceri care lucrează cu Simplead.',
};

export const testimonials: Testimonial[] = [
  {
    quote: '„Simply professional. Trustworthy, honest and creative."',
    body: 'O colaborare bazată pe încredere, în care partea tehnică nu mai e o grijă. Ne ocupăm de tot ce ține de funcționarea site-ului, ca afacerea să meargă mai departe fără opriri.',
    client: 'Bogdan Drăgan',
    clientNote: 'FEAA Galați',
    clientLogo: 'FE',
  },
  {
    quote: '„Platformă digitală de turism gastronomic"',
    body: 'Am dezvoltat un ecosistem digital complet pentru promovarea turismului gastronomic local, incluzând aplicații web și mobile, sistem de management al conținutului și funcționalități multilingve. Colaborarea a fost profesionistă, iar rezultatele au depășit așteptările.',
    client: 'Universitatea „Dunărea de Jos" din Galați',
    clientNote: 'Proiect Cross2Map',
    clientLogo: 'UGAL',
  },
  {
    quote: '„Originalitate și claritate în soluțiile propuse."',
    body: 'Le-am studiat portofoliul și am remarcat originalitatea și claritatea soluțiilor. Proiectul a decurs conform așteptărilor, iar rezultatul a fost foarte apreciat de compania noastră.',
    client: 'Silviu Costiniuc',
    clientNote: 'Echipamente-medicale.ro',
    clientLogo: 'EM',
  },
  {
    quote: '„Profesionalism, fairplay, pricepere, asumare."',
    body: 'Cuvinte ce definesc relația noastră cu Simplead. Suntem la al doilea proiect împreună, datorită implicării active și relaționării impecabile.',
    client: 'Ștefan Chelmu',
    clientNote: 'Blitzstudio',
    clientLogo: 'BS',
  },
];
