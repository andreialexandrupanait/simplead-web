/**
 * Sursa unică de adevăr pentru rutele statice incluse în sitemap
 * (src/pages/sitemap.xml.ts). Blogul și portofoliul vin din DB și se adaugă
 * dinamic acolo. O pagină publică nouă = o linie aici.
 */
export const staticRoutes: string[] = [
  '/',
  '/servicii',
  '/servicii/mentenanta-website',
  '/servicii/ux-ui-web-design',
  '/servicii/grafica-publicitara',
  '/servicii/social-media',
  '/servicii/consultanta-marketing',
  '/servicii/ai-pentru-business',
  '/mentenanta',
  '/pachete',
  '/servicii-rapide',
  '/suport',
  '/cere-suport',
  // Sub-serviciile tehnice: ies din navigare, dar rămân indexabile (linkate din /suport).
  '/servicii/wordpress-support',
  '/servicii/migrare-site',
  '/servicii/site-astro-ai',
  '/servicii/cloudflare-support',
  '/servicii/dmarc',
  '/servicii/suport-urgenta',
  '/servicii/quick-fix',
  '/instrumente',
  '/instrumente/verificator-email',
  '/instrumente/inspector-dns',
  '/instrumente/scanner-seo',
  '/portofoliu',
  '/blog',
  '/despre',
  '/resurse',
  '/intrebari-frecvente',
  '/contact',
  '/termeni',
  '/confidentialitate',
  '/cookies',
];
