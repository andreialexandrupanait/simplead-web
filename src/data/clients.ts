/**
 * Proiectele afișate în secțiunea de dovadă (ProjectsGrid) de pe paginile de serviciu.
 * Un proiect apare doar dacă `display: true` ȘI are tag-ul serviciului paginii.
 * Fiecare domeniu = un card separat (nu comasăm, ca să se vadă breadth-ul).
 *
 * VIZUAL: `logo` = URL-ul logo-ului real, extras din site-ul fiecărui client
 * (header WordPress). Unde nu s-a putut extrage curat, lipsește → cardul cade pe
 * favicon. `image` (screenshot în /public/proiecte/) e rezervat pentru viitor.
 *
 * ➕ Ca un proiect să apară și pe altă pagină (ex. și grafică), adaugă cheia în `services`.
 */
import type { ServiceKey } from './services';

export type { ServiceKey };

/** Logo unic M1 Med Beauty din header (același pe toate site-urile grupului M1). */
const M1_LOGO =
  'https://www.m1-beauty.ro/wp-content/uploads/2024/03/logo-m1-med-beauty-romania.png';

export interface ClientProject {
  name: string;
  domain: string;
  url: string;
  /** URL logo real (extras din site). Lipsă = fallback pe favicon. */
  logo?: string;
  /** Logo alb/deschis → primește fundal închis în card ca să fie vizibil. */
  dark?: boolean;
  /** Screenshot în /public (rezervat pentru viitor). */
  image?: string;
  services: ServiceKey[];
  display: boolean;
}

export const clients: ClientProject[] = [
  {
    name: 'Matematica Interactiva',
    domain: 'matematica-interactiva.ro',
    url: 'https://matematica-interactiva.ro',
    logo: 'https://matematica-interactiva.ro/wp-content/uploads/2021/03/logo-matematica-interactiva.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'FasTrackKids',
    domain: 'fastrackids.ro',
    url: 'https://fastrackids.ro',
    logo: 'https://fastrackids.ro/wp-content/uploads/2021/03/logo_FTK.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Florin Pasat',
    domain: 'florinpasat.com',
    url: 'https://florinpasat.com',
    logo: 'https://florinpasat.com/wp-content/uploads/2020/10/logo-fl-pasat.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Roll Shape',
    domain: 'rollshape.ro',
    url: 'https://rollshape.ro',
    logo: 'https://rollshape.ro/wp-content/uploads/2022/12/Logo_Full_Color_Rollshape-e1675252093945.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Priority Clinic',
    domain: 'priority-clinic.ro',
    url: 'https://priority-clinic.ro',
    logo: 'https://priority-clinic.ro/wp-content/uploads/2020/09/Priority-Clinic-LND.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Georgiana Ungureanu',
    domain: 'georgianaungureanu.ro',
    url: 'https://georgianaungureanu.ro',
    logo: 'https://georgianaungureanu.ro/wp-content/uploads/2023/12/cropped-GeorgianaLogo.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Hotel Simona Halep',
    domain: 'hotelsimonahalep.ro',
    url: 'https://hotelsimonahalep.ro',
    logo: '/proiecte/simona-halep.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Manuela Sîrbu',
    domain: 'manuelasirbu.ro',
    url: 'https://manuelasirbu.ro',
    // Logo alb (invizibil pe alb) — de înlocuit de owner; momentan cade pe favicon.
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'GTA Energy',
    domain: 'gtaenergy.ro',
    url: 'https://gtaenergy.ro',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'ICHB (campus Pallady)',
    domain: 'pallady.ichb.ro',
    url: 'https://pallady.ichb.ro',
    logo: 'https://pallady.ichb.ro/wp-content/uploads/2022/11/Asset-1.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'ISOR',
    domain: 'isor.ro',
    url: 'https://isor.ro',
    logo: 'https://isor.ro/wp-content/uploads/2021/10/isor-logo.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'Premium Stone',
    domain: 'premiumstone.ro',
    url: 'https://premiumstone.ro',
    logo: 'https://premiumstone.ro/wp-content/uploads/2022/10/premium-stone.png',
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty România',
    domain: 'm1-beauty.ro',
    url: 'https://m1-beauty.ro',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Austria',
    domain: 'm1-beauty.at',
    url: 'https://m1-beauty.at',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Elveția',
    domain: 'm1-beauty.ch',
    url: 'https://m1-beauty.ch',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Olanda',
    domain: 'm1-beauty.nl',
    url: 'https://m1-beauty.nl',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Croația',
    domain: 'm1-beauty.hr',
    url: 'https://m1-beauty.hr',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Ungaria',
    domain: 'm1-beauty.hu',
    url: 'https://m1-beauty.hu',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Bulgaria',
    domain: 'm1-beauty.bg',
    url: 'https://m1-beauty.bg',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty UK',
    domain: 'm1-beauty.co.uk',
    url: 'https://m1-beauty.co.uk',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Beauty Australia',
    domain: 'm1-beauty.com.au',
    url: 'https://m1-beauty.com.au',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Shop',
    domain: 'm1-shop.de',
    url: 'https://m1-shop.de',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
  {
    name: 'M1 Select',
    domain: 'm1-select.de',
    url: 'https://m1-select.de',
    logo: M1_LOGO,
    services: ['mentenanta'],
    display: true,
  },
];

/** Proiectele afișabile pentru un serviciu (filtrare display + tag). */
export function clientsForService(key: ServiceKey): ClientProject[] {
  return clients.filter((c) => c.display && c.services.includes(key));
}
