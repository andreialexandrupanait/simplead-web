// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import node from '@astrojs/node';
import tailwindcss from '@tailwindcss/vite';

const SITE_URL = process.env.SITE_URL || 'https://simplead.ro';

// Adaptorul node e necesar DOAR la build/preview (pentru ruta on-demand
// /api/contact). În `dev` îl omitem: altfel Astro intră în SSR on-demand și
// module-runner-ul Vite peste bind-mount-ul Windows/Docker expiră (fetchModule).
// În dev, ruta API e oricum servită de dev server (cu un simplu warning).
const isDev = process.argv.includes('dev');

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  // i18n nativ: română implicit (fără prefix), engleză pregătită pentru mai târziu.
  i18n: {
    defaultLocale: 'ro',
    locales: ['ro', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  // Site predominant static; adaptorul node (doar la build) permite ruta
  // on-demand /api/contact. Se poate înlocui ulterior cu adaptorul platformei
  // de producție (Vercel/Netlify/Cloudflare).
  adapter: isDev ? undefined : node({ mode: 'standalone' }),
  // În producție stăm în spatele nginx-proxy: fără domeniile de aici în
  // allowedDomains, Astro ignoră X-Forwarded-Proto/Host, vede cererea ca
  // http://localhost și protecția CSRF respinge POST-urile (login /admin,
  // formular contact). Tot de aici depinde și Astro.clientAddress
  // (X-Forwarded-For) — altfel rate-limit-ul de login ar vedea un singur IP.
  security: {
    checkOrigin: true,
    allowedDomains: [
      { protocol: 'https', hostname: 'simplead.ro' },
      { protocol: 'https', hostname: 'www.simplead.ro' },
    ],
  },
  // Redirect-uri 301 de la slug-urile vechi de servicii la noua structură.
  // Mentenanța are pagină unică la /mentenanta (cu calculator).
  redirects: {
    '/servicii/marketing': '/servicii/consultanta-marketing',
    '/servicii/web-design': '/servicii/ux-ui-web-design',
    '/servicii/grafica': '/servicii/grafica-publicitara',
    '/servicii/mentenanta': '/mentenanta',
    '/servicii/mentenanta-website': '/mentenanta',
  },
  // Sitemap-ul e un endpoint propriu (src/pages/sitemap.xml.ts): blogul și
  // portofoliul trăiesc în DB (on-demand), deci sitemap-ul se compune la cerere
  // din rutele statice (src/data/static-routes.ts) + slug-urile din DB.
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    server: {
      // Live-reload pe Windows + Docker: bind-mount-ul Windows NU emite evenimente
      // inotify în container, deci avem nevoie de polling. Problema istorică
      // (CPU saturat + startup blocat) venea din pollarea întregului `node_modules`
      // (zeci de mii de fișiere). Soluția: pollăm DOAR sursa, excluzând
      // node_modules/.astro/dist etc. Așa CPU rămâne redus și HMR funcționează
      // fără restart manual. (Alternativă mai rapidă: rulează din FS-ul WSL2.)
      watch: {
        usePolling: true,
        interval: 300,
        binaryInterval: 1000,
        awaitWriteFinish: { stabilityThreshold: 200, pollInterval: 50 },
        ignored: [
          '**/node_modules/**',
          '**/.astro/**',
          '**/dist/**',
          '**/.git/**',
          '**/.pnpm-store/**',
        ],
      },
    },
  },
});
