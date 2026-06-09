/** Navigarea principală + footer. Path-urile sunt fără prefix de locale (ro implicit). */
export interface NavItem {
  label: string;
  href: string;
}

/** Element de meniu cu descriere scurtă (pentru mega-dropdown Servicii). */
export interface NavServiceItem extends NavItem {
  desc: string;
}

export const mainNav: NavItem[] = [
  { label: 'Acasă', href: '/' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Pachete', href: '/pachete' },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Despre', href: '/despre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Cele 6 servicii (piloni): sursă unică pentru mega-dropdown și footer.
 * Slug-urile corespund intrărilor din `src/data/services.ts`.
 */
export const servicesNav: NavServiceItem[] = [
  {
    label: 'Mentenanță website',
    href: '/mentenanta',
    desc: 'Actualizări, securitate, backup și monitorizare continuă: site mereu rapid și sigur.',
  },
  {
    label: 'UX/UI & web design',
    href: '/servicii/ux-ui-web-design',
    desc: 'Site-uri și magazine gândite pe conversii și validate prin cercetare.',
  },
  {
    label: 'Grafică publicitară',
    href: '/servicii/grafica-publicitara',
    desc: 'Identitate vizuală și materiale care te fac memorabil și coerent.',
  },
  {
    label: 'Social media',
    href: '/servicii/social-media',
    desc: 'Conținut și prezență care aduc clienți, nu doar aprecieri.',
  },
  {
    label: 'Consultanță de marketing',
    href: '/servicii/consultanta-marketing',
    desc: 'Decizii pe date și neuromarketing, nu pe presupuneri. Doctorat în marketing.',
  },
  {
    label: 'AI pentru business',
    href: '/servicii/ai-pentru-business',
    desc: 'Automatizări și monitorizare care îți economisesc timp și prind problemele din timp.',
  },
];

export const footerServices: NavItem[] = servicesNav.map(({ label, href }) => ({ label, href }));

export const footerLegal: NavItem[] = [
  { label: 'Termeni și condiții', href: '/termeni' },
  { label: 'Politica de confidențialitate', href: '/confidentialitate' },
  { label: 'Politica de cookies', href: '/cookies' },
];
