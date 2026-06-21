/** Navigarea principală + footer. Path-urile sunt fără prefix de locale (ro implicit). */
import type { ServiceIcon } from './services';

export interface NavItem {
  label: string;
  href: string;
}

/** Element de meniu cu descriere scurtă + icon (pentru mega-meniul Servicii). */
export interface NavServiceItem extends NavItem {
  desc: string;
  icon: ServiceIcon;
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
 * Navigarea din footer: identică cu meniul principal, plus „Resurse" — scos din
 * header, dar păstrat în footer (lângă celelalte linkuri de navigare).
 */
export const footerNav: NavItem[] = [
  ...mainNav.slice(0, -1),
  { label: 'Resurse', href: '/resurse' },
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
    icon: 'mentenanta',
    desc: 'Actualizări, securitate, backup și monitorizare continuă: site mereu rapid și sigur.',
  },
  {
    label: 'UX/UI & web design',
    href: '/servicii/ux-ui-web-design',
    icon: 'web',
    desc: 'Site-uri și magazine gândite pe conversii și validate prin cercetare.',
  },
  {
    label: 'Grafică publicitară',
    href: '/servicii/grafica-publicitara',
    icon: 'grafica',
    desc: 'Identitate vizuală și materiale care te fac memorabil și coerent.',
  },
  {
    label: 'Social media',
    href: '/servicii/social-media',
    icon: 'social',
    desc: 'Conținut și prezență care aduc clienți, nu doar aprecieri.',
  },
  {
    label: 'Consultanță de marketing',
    href: '/servicii/consultanta-marketing',
    icon: 'marketing',
    desc: 'Decizii pe date și neuromarketing, nu pe presupuneri. Doctorat în marketing.',
  },
  {
    label: 'AI pentru business',
    href: '/servicii/ai-pentru-business',
    icon: 'ai',
    desc: 'Automatizări și monitorizare care îți economisesc timp și prind problemele din timp.',
  },
];

/**
 * Link suplimentar către pagina de suport tehnic. Apare ca al 7-lea element în
 * mega-meniul Servicii (randat separat) și în meniul mobil. `icon` e cerut de
 * tip, dar nu e folosit la randare — Suport tehnic are propria iconiță.
 */
export const supportNavItem: NavServiceItem = {
  label: 'Suport tehnic',
  href: '/suport',
  icon: 'mentenanta',
  desc: 'WordPress, SSL, DNS, securitate, email și quick fix — fără să deschizi un proiect întreg.',
};

export const footerServices: NavItem[] = [
  ...servicesNav.map(({ label, href }) => ({ label, href })),
  { label: 'Suport tehnic', href: '/suport' },
];

export const footerLegal: NavItem[] = [
  { label: 'Întrebări frecvente', href: '/intrebari-frecvente' },
  { label: 'Termeni și condiții', href: '/termeni' },
  { label: 'Politica de confidențialitate', href: '/confidentialitate' },
  { label: 'Politica de cookies', href: '/cookies' },
];

/**
 * Coloana „Suport tehnic" din mega-meniul Servicii: cele mai importante servicii
 * de pe pagina /suport, listate cu liniuță. Fiecare duce la pagina de detaliu.
 */
export const megaSupportLinks: NavItem[] = [
  { label: 'Suport WordPress', href: '/servicii/wordpress-support' },
  { label: 'Migrare site', href: '/servicii/migrare-site' },
  { label: 'Suport Cloudflare', href: '/servicii/cloudflare-support' },
];

/** Panoul promo din dreapta mega-meniului Servicii. Schimbi de aici ce promovezi. */
export const megaPromo = {
  eyebrow: 'Mentenanță website',
  title: 'Site-ul tău, monitorizat non-stop',
  bullets: [
    'Backup & update-uri regulate',
    'Monitorizare permanentă',
    'Intervenții lunare incluse',
  ],
  ctaLabel: 'Vezi planurile',
  ctaHref: '/mentenanta#calc',
} as const;
