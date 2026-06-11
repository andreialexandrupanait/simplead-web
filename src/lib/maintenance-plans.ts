/**
 * Sursa unică de adevăr pentru calculatorul de mentenanță (/mentenanta) și pentru
 * endpoint-ul de checkout (/api/mentenanta-checkout). Prețurile sunt validate
 * server-side din acest modul, NU se au încredere valorile trimise din browser.
 * Toate prețurile sunt în EUR/lună (abonament).
 *
 * Slug-urile pachetelor de bază și ale primelor 4 add-on-uri corespund cu cele din
 * `scripts/seed.mjs` (tabelul `packages`), pentru ca, atunci când există în DB,
 * comanda să poată fi legată de pachetul de bază.
 */

export interface MaintenanceBase {
  slug: string;
  name: string;
  price: number;
  tag: string;
  items: string[];
}

export interface MaintenanceAddon {
  slug: string;
  name: string;
  price: number;
  desc: string;
}

/** Pachetele de bază (se alege unul). */
export const maintenanceBase: MaintenanceBase[] = [
  {
    slug: 'mentenanta-standard',
    name: 'Standard',
    price: 75,
    tag: 'siguranță esențială',
    items: ['Backup săptămânal', 'Actualizări CMS', 'Securitate', '1h modificări incluse'],
  },
  {
    slug: 'mentenanta-premium',
    name: 'Premium',
    price: 120,
    tag: 'performanță maximă',
    items: ['Monitorizare continuă', 'Securitate avansată', '3h modificări incluse', 'Priority support'],
  },
];

/** Opțiuni suplimentare (se bifează câte vrei). */
export const maintenanceAddons: MaintenanceAddon[] = [
  { slug: 'addon-suport', name: '+2 ore suport tehnic', price: 40, desc: 'Ore suplimentare de intervenții și modificări, în același abonament.' },
  {
    slug: 'addon-seo',
    name: 'Optimizare SEO continuă',
    price: 150,
    desc: 'Monitorizare poziții Google, optimizare cuvinte cheie, ajustări on-page lunare.',
  },
  {
    slug: 'addon-analytics',
    name: 'Raportare avansată Analytics',
    price: 25,
    desc: 'Rapoarte trafic & conversii + sugestii.',
  },
  {
    slug: 'addon-uptime',
    name: 'Monitorizare uptime la 1 minut',
    price: 15,
    desc: 'Verificări mai dese și alerte și mai rapide când site-ul pică.',
  },
  {
    slug: 'addon-security',
    name: 'Scanare securitate avansată',
    price: 35,
    desc: 'Scanări mai dese de malware și vulnerabilități, plus hardening extins.',
  },
  {
    slug: 'addon-cloudflare',
    name: 'Management CDN & Cloudflare',
    price: 20,
    desc: 'Cache, reguli de firewall și protecție prin Cloudflare, gestionate de noi.',
  },
  {
    slug: 'addon-portal',
    name: 'Portal client dedicat',
    price: 15,
    desc: 'Acces securizat la starea site-ului și la rapoarte, pentru tine sau clientul tău.',
  },
];

export const findMaintenanceBase = (slug: string): MaintenanceBase | undefined =>
  maintenanceBase.find((b) => b.slug === slug);

export const findMaintenanceAddon = (slug: string): MaintenanceAddon | undefined =>
  maintenanceAddons.find((a) => a.slug === slug);
