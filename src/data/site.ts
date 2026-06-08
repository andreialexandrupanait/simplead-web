/**
 * Configurare globală a site-ului — sursă unică de adevăr pentru date de
 * contact, identitate și linkuri. Valorile marcate `TODO` trebuie confirmate.
 */
export const site = {
  name: 'Simplead',
  legalName: 'Simplead', // TODO: denumire legală completă (SRL/PFA)
  tagline: 'Facem lucrurile simple. Și le bazăm pe date.',
  description:
    'Studio de grafică și marketing digital din Galați. Branding, web și marketing validate cu date și neuromarketing — nu cu presupuneri. Condus de Andrei Panait, doctor în marketing.',
  founder: 'Andrei Panait',
  founderTitle: 'doctor în marketing', // TODO: confirmă „doctor" vs „doctorand"
  founderSite: 'https://panaitandrei.ro', // identitatea academică (neuromarketing, cercetare)
  locale: 'ro_RO',

  contact: {
    phone: '0755 215 145', // din design (Acasă.html)
    phoneHref: 'tel:+40755215145',
    email: 'contact@simplead.ro', // TODO: confirmă adresa reală
    city: 'Galați',
    country: 'România',
    address: 'Galați, România', // TODO: adresă completă dacă e cazul
    schedule: 'Luni–Vineri, 09:00–18:00', // TODO: confirmă programul
    responseTime: '24', // ore lucrătoare — TODO: confirmă
  },

  legal: {
    cif: '', // TODO: CIF
    regCom: '', // TODO: nr. Registrul Comerțului
  },

  social: {
    facebook: '', // TODO
    instagram: '', // TODO
    linkedin: '', // TODO
    youtube: '', // TODO
  },
} as const;

export type Site = typeof site;
