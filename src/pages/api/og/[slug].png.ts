import type { APIRoute } from 'astro';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { getPostBySlug, getProjectBySlug } from '@lib/server/content';
import { getService } from '@data/services';
import { supportServices } from '@data/support-services';

export const prerender = false;

// Pagini statice cu OG dedicat (slug → titlu + etichetă). `_default` e imaginea
// implicită a site-ului (folosită de BaseLayout unde pagina nu are OG propriu).
const PAGE_OG: Record<string, { title: string; category?: string }> = {
  _default: { title: 'Marketing, branding și web, pe bază de neuroștiință' },
  pachete: { title: 'Pachete și prețuri clare, fără surprize', category: 'Pachete' },
  servicii: { title: 'Servicii de grafică, web și marketing', category: 'Servicii' },
  portofoliu: { title: 'Proiecte reale, rezultate măsurabile', category: 'Portofoliu' },
  despre: { title: 'Cine suntem și cum lucrăm', category: 'Despre' },
  contact: { title: 'Hai să vorbim despre proiectul tău', category: 'Contact' },
  mentenanta: { title: 'Mentenanță website cu abonament lunar', category: 'Mentenanță' },
  'intrebari-frecvente': { title: 'Întrebări frecvente', category: 'FAQ' },
};

// Fonturi Space Grotesk 700 (latin + latin-ext pentru diacritice RO), încărcate
// o singură dată din /public/og prin origin-ul propriu, apoi cache în memorie.
type Font = { name: string; data: ArrayBuffer; weight: 700; style: 'normal' };
let fontCache: Font[] | null = null;
async function loadFonts(origin: string): Promise<Font[]> {
  if (fontCache) return fontCache;
  // Două subseturi statice cu nume distincte → lanț de fallback în satori:
  // latin întâi, latin-ext pentru diacriticele RO (ă, ș, ț).
  const [latin, ext] = await Promise.all([
    fetch(new URL('/og/space-grotesk-700-latin.ttf', origin)).then((r) => r.arrayBuffer()),
    fetch(new URL('/og/space-grotesk-700-latin-ext.ttf', origin)).then((r) => r.arrayBuffer()),
  ]);
  fontCache = [
    { name: 'Space Grotesk', data: latin, weight: 700, style: 'normal' },
    { name: 'Space Grotesk Ext', data: ext, weight: 700, style: 'normal' },
  ];
  return fontCache;
}

// Element satori construit din obiecte (fără JSX).
type El = { type: string; props: { style?: Record<string, unknown>; children?: unknown } };
const el = (type: string, style: Record<string, unknown>, children?: unknown): El => ({
  type,
  props: { style, children },
});

export const GET: APIRoute = async ({ params, url, site }) => {
  const slug = (params.slug ?? '').replace(/\.png$/, '');
  const origin = (site ?? new URL(url.origin)).toString().replace(/\/$/, '');

  let title = PAGE_OG._default.title;
  let category = '';
  const page = PAGE_OG[slug];
  const service = getService(slug) ?? supportServices.find((s) => s.slug === slug);
  if (page) {
    title = page.title;
    category = page.category ?? '';
  } else if (service) {
    title = service.title;
    category = 'Servicii';
  } else {
    try {
      // Articol de blog sau proiect de portofoliu (ambele au slug unic).
      const post = await getPostBySlug(slug);
      if (post) {
        title = post.title;
        category = post.category || '';
      } else {
        const project = await getProjectBySlug(slug);
        if (project) {
          title = project.title;
          category = 'Portofoliu';
        }
      }
    } catch {
      /* fallback la titlul generic */
    }
  }

  const fontSize = title.length > 90 ? 52 : title.length > 55 ? 62 : 74;

  const tree = el(
    'div',
    {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: '#0e1730',
      padding: '72px',
      fontFamily: 'Space Grotesk, Space Grotesk Ext',
    },
    [
      el('div', { display: 'flex', alignItems: 'center', gap: '18px' }, [
        el('div', { width: '46px', height: '46px', borderRadius: '13px', backgroundColor: '#0077fc' }),
        el('div', { color: '#ffffff', fontSize: '34px', fontWeight: 700 }, 'Simplead'),
      ]),
      el(
        'div',
        {
          color: '#ffffff',
          fontSize: `${fontSize}px`,
          fontWeight: 700,
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          maxWidth: '1000px',
        },
        title,
      ),
      el(
        'div',
        { display: 'flex', alignItems: 'center', gap: '16px', color: '#9fb3d9', fontSize: '28px' },
        [
          el('div', { width: '40px', height: '6px', borderRadius: '3px', backgroundColor: '#00d4ff' }),
          el('div', {}, category ? `${category} · simplead.ro` : 'simplead.ro'),
        ],
      ),
    ],
  );

  try {
    const fonts = await loadFonts(origin);
    const svg = await satori(tree as never, { width: 1200, height: 630, fonts });
    const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    return new Response(new Uint8Array(png), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=86400, s-maxage=604800',
      },
    });
  } catch (err) {
    console.error('[og] Generarea imaginii a eșuat:', err);
    return new Response('OG generation failed', { status: 500 });
  }
};
