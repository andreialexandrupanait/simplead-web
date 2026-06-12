/**
 * Configurare globală a site-ului: sursă unică de adevăr pentru date de
 * contact, identitate și linkuri. Valorile marcate `TODO` trebuie confirmate.
 */
export const site = {
  name: 'Simplead',
  legalName: 'Simplead', // TODO: denumire legală completă (SRL/PFA)
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
    address: 'Galați, România', // TODO: adresă completă dacă e cazul
    schedule: 'Luni–Vineri, 09:00–18:00', // TODO: confirmă programul
    responseTime: '24', // ore lucrătoare, TODO: confirmă
  },

  legal: {
    cif: '41501661',
    regCom: 'RO J17/1488/2019',
  },

  social: {
    facebook: '', // TODO
    instagram: '', // TODO
    linkedin: '', // TODO
    youtube: '', // TODO
  },
} as const;

export type Site = typeof site;
