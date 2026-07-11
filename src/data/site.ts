/**
 * Configurare globală a site-ului: sursă unică de adevăr pentru date de
 * contact, identitate și linkuri. Valorile marcate `TODO` trebuie confirmate.
 */
export const site = {
  name: 'Simplead',
  legalName: 'SIMPLEAD S.R.L.',
  tagline: 'Facem lucrurile simple. Și le bazăm pe neuroștiință.',
  description:
    'Studio de grafică și marketing digital din România. Branding, web și marketing fundamentate pe neuroștiință, nu pe noroc. Condus de Andrei Alexandru Panait, doctor în marketing, cu cercetare în neuromarketing.',
  founder: 'Andrei Alexandru Panait',
  founderTitle: 'doctor în marketing',
  founderSite: 'https://panaitandrei.ro', // identitatea academică (neuromarketing, cercetare)
  // Credențiale academice (E-E-A-T: intră în schema Person din BaseLayout).
  founderOrcid: 'https://orcid.org/0000-0002-0563-8391',
  founderCredential:
    'Doctorat în Marketing (cercetare în neuromarketing), FEAA, Universitatea „Dunărea de Jos" din Galați, 2024',
  locale: 'ro_RO',

  contact: {
    phone: '0755 215 135',
    phoneHref: 'tel:+40755215135',
    email: 'contact@simplead.ro',
    city: 'Galați',
    country: 'România',
    street: 'Strada Sucevei, nr. 6, Bl. M1, Sc. 1, Ap. 3',
    address: 'Strada Sucevei, nr. 6, Bl. M1, Sc. 1, Ap. 3, Galați, România',
    schedule: 'Luni-Vineri, 09:00-18:00',
    responseTime: '24', // ore lucrătoare
  },

  legal: {
    cif: '41501661',
    // Formatul nou ONRC (înmatriculare 08.08.2019, fost J17/1488/2019).
    regCom: 'J2019001488175',
  },

  social: {
    facebook: 'https://www.facebook.com/simplead.ro',
    instagram: 'https://www.instagram.com/simplead.ro',
    linkedin: '',
    youtube: '',
  },
} as const;

export type Site = typeof site;

/**
 * Autorul e fondatorul? Toleranță la forma scurtă din DB ("Andrei Panait")
 * vs. numele complet din schema E-E-A-T ("Andrei Alexandru Panait"): e fondator
 * dacă toate cuvintele din numele autorului apar în numele fondatorului.
 */
export function isFounderName(name: string): boolean {
  const founderTokens = site.founder.toLowerCase().split(/\s+/).filter(Boolean);
  const authorTokens = name.toLowerCase().split(/\s+/).filter(Boolean);
  return authorTokens.length > 0 && authorTokens.every((t) => founderTokens.includes(t));
}
