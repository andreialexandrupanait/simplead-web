/** Navigarea principală + footer. Path-urile sunt fără prefix de locale (ro implicit). */
export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Acasă', href: '/' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Despre', href: '/despre' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const footerServices: NavItem[] = [
  { label: 'Marketing', href: '/servicii/marketing' },
  { label: 'Grafică', href: '/servicii/grafica' },
  { label: 'Web Design', href: '/servicii/web-design' },
  { label: 'Mentenanță', href: '/servicii/mentenanta' },
];

export const footerLegal: NavItem[] = [
  { label: 'Termeni și condiții', href: '/termeni' },
  { label: 'Politica de confidențialitate', href: '/confidentialitate' },
];
