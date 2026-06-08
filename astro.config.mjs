// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
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
  // Redirect-uri 301 de la slug-urile vechi de servicii (4) la noua structură (6).
  redirects: {
    '/servicii/marketing': '/servicii/consultanta-marketing',
    '/servicii/web-design': '/servicii/ux-ui-web-design',
    '/servicii/grafica': '/servicii/grafica-publicitara',
    '/servicii/mentenanta': '/servicii/mentenanta-website',
  },
  integrations: [react(), mdx(), sitemap()],
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
