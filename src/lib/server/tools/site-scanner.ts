import { assertPublicHost, parseToolUrl, ToolError } from './ssrf-guard';
import type { CheckStatus, ToolCheck } from './email-deliverability';

/**
 * Scanner rapid de site: ce văd Google și un vizitator la prima vizită — title,
 * meta description, H1, viewport (mobil), Open Graph, HTTPS/HSTS, robots.txt și
 * sitemap.xml. Singurul tool care face fetch HTTP, deci trece TOTUL prin
 * `ssrf-guard`: validare schemă → host public → redirecturi re-validate manual,
 * timeout dur și body plafonat.
 */
const UA = 'SimpleadSiteScanner/1.0 (+https://simplead.ro/instrumente)';
const TIMEOUT_MS = 8000;
const MAX_BYTES = 512 * 1024;

export interface SiteScanResult {
  url: string;
  finalUrl: string;
  status: number;
  meta: {
    title: string | null;
    description: string | null;
    h1Count: number;
    hasViewport: boolean;
    ogImage: string | null;
  };
  checks: ToolCheck[];
  verdict: CheckStatus;
}

/** Parsare pură a `<head>` (testabilă fără rețea). */
export function parseHtmlMeta(html: string): SiteScanResult['meta'] {
  const head = html.slice(0, 200_000);
  const attr = (tag: string, name: string, val: string): string | null => {
    // caută <tag ... name="X" ... val-attr="..."> în orice ordine a atributelor
    const re = new RegExp(`<${tag}\\b[^>]*\\b${name}=["']${val}["'][^>]*>`, 'i');
    const m = head.match(re);
    if (!m) return null;
    const content = m[0].match(/\bcontent=["']([^"']*)["']/i);
    return content ? content[1].trim() : null;
  };

  const titleMatch = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const descMatch = head.match(/<meta\b[^>]*\bname=["']description["'][^>]*>/i);
  const desc = descMatch ? (descMatch[0].match(/\bcontent=["']([^"']*)["']/i)?.[1] ?? '') : null;
  const h1Count = (html.match(/<h1\b/gi) ?? []).length;

  return {
    title: titleMatch ? titleMatch[1].replace(/\s+/g, ' ').trim() : null,
    description: desc !== null ? desc.trim() : null,
    h1Count,
    hasViewport: /<meta\b[^>]*\bname=["']viewport["']/i.test(head),
    ogImage: attr('meta', 'property', 'og:image'),
  };
}

const worst = (s: CheckStatus[]): CheckStatus =>
  s.includes('fail') ? 'fail' : s.includes('warn') ? 'warn' : 'pass';

/** Fetch cu redirecturi re-validate manual (apărare SSRF la fiecare hop). */
async function guardedFetch(start: URL, maxRedirects = 4): Promise<Response> {
  let current = start;
  for (let i = 0; i <= maxRedirects; i++) {
    await assertPublicHost(current.hostname);
    const res = await fetch(current, {
      method: 'GET',
      redirect: 'manual',
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { 'user-agent': UA, accept: 'text/html,*/*' },
    });
    const loc = res.headers.get('location');
    if (res.status >= 300 && res.status < 400 && loc) {
      current = parseToolUrl(new URL(loc, current).href); // forțează http/https
      continue;
    }
    return res;
  }
  throw new ToolError('Prea multe redirecturi.');
}

/** Citește corpul răspunsului plafonat la MAX_BYTES (nu citi pagini uriașe). */
async function readCapped(res: Response): Promise<string> {
  const reader = res.body?.getReader();
  if (!reader) return '';
  const chunks: Uint8Array[] = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    if (value) {
      chunks.push(value);
      total += value.length;
      if (total >= MAX_BYTES) {
        await reader.cancel();
        break;
      }
    }
  }
  return new TextDecoder('utf-8').decode(concat(chunks));
}

function concat(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let off = 0;
  for (const c of chunks) {
    out.set(c, off);
    off += c.length;
  }
  return out;
}

/** Verifică prezența unei resurse (robots.txt / sitemap.xml) fără a-i citi corpul. */
async function exists(origin: string, path: string): Promise<boolean> {
  try {
    const res = await guardedFetch(new URL(path, origin), 2);
    return res.status >= 200 && res.status < 400;
  } catch {
    return false;
  }
}

export async function scanSite(input: string): Promise<SiteScanResult> {
  const url = parseToolUrl(input);
  const res = await guardedFetch(url);
  const finalUrl = res.url || url.href;
  const html = res.headers.get('content-type')?.includes('html') ? await readCapped(res) : '';
  const meta = parseHtmlMeta(html);

  const isHttps = new URL(finalUrl).protocol === 'https:';
  const hsts = Boolean(res.headers.get('strict-transport-security'));

  const checks: ToolCheck[] = [
    res.status >= 200 && res.status < 400
      ? { id: 'reachable', label: 'Disponibilitate', status: 'pass', detail: `HTTP ${res.status}` }
      : {
          id: 'reachable',
          label: 'Disponibilitate',
          status: 'fail',
          detail: `Răspuns HTTP ${res.status}`,
        },
    isHttps
      ? { id: 'https', label: 'HTTPS', status: 'pass', detail: 'Site servit pe HTTPS.' }
      : { id: 'https', label: 'HTTPS', status: 'fail', detail: 'Site-ul nu folosește HTTPS.' },
    meta.title
      ? {
          id: 'title',
          label: 'Titlu (SEO)',
          status: meta.title.length <= 65 ? 'pass' : 'warn',
          detail: `${meta.title} (${meta.title.length} caractere)`,
        }
      : { id: 'title', label: 'Titlu (SEO)', status: 'fail', detail: 'Lipsește <title>.' },
    meta.description
      ? {
          id: 'description',
          label: 'Meta description',
          status: meta.description.length >= 50 ? 'pass' : 'warn',
          detail: `${meta.description.length} caractere`,
        }
      : {
          id: 'description',
          label: 'Meta description',
          status: 'warn',
          detail: 'Lipsește meta description.',
        },
    meta.h1Count === 1
      ? { id: 'h1', label: 'Titlu H1', status: 'pass', detail: 'Un singur H1 (corect).' }
      : {
          id: 'h1',
          label: 'Titlu H1',
          status: 'warn',
          detail: meta.h1Count === 0 ? 'Niciun H1 pe pagină.' : `${meta.h1Count} elemente H1.`,
        },
    meta.hasViewport
      ? {
          id: 'viewport',
          label: 'Mobil (viewport)',
          status: 'pass',
          detail: 'Meta viewport prezent.',
        }
      : {
          id: 'viewport',
          label: 'Mobil (viewport)',
          status: 'warn',
          detail: 'Lipsește meta viewport (probleme pe mobil).',
        },
    meta.ogImage
      ? {
          id: 'og',
          label: 'Open Graph',
          status: 'pass',
          detail: 'og:image prezent (share frumos).',
        }
      : {
          id: 'og',
          label: 'Open Graph',
          status: 'warn',
          detail: 'Lipsește og:image (linkurile arată sărac pe social).',
        },
    hsts
      ? { id: 'hsts', label: 'HSTS', status: 'pass', detail: 'Antet HSTS prezent.' }
      : { id: 'hsts', label: 'HSTS', status: 'warn', detail: 'Lipsește antetul HSTS.' },
  ];

  const origin = new URL(finalUrl).origin;
  const [hasRobots, hasSitemap] = await Promise.all([
    exists(origin, '/robots.txt'),
    exists(origin, '/sitemap.xml'),
  ]);
  checks.push(
    hasRobots
      ? { id: 'robots', label: 'robots.txt', status: 'pass', detail: 'Prezent.' }
      : { id: 'robots', label: 'robots.txt', status: 'warn', detail: 'Lipsește robots.txt.' },
    hasSitemap
      ? { id: 'sitemap', label: 'sitemap.xml', status: 'pass', detail: 'Prezent.' }
      : { id: 'sitemap', label: 'sitemap.xml', status: 'warn', detail: 'Lipsește sitemap.xml.' },
  );

  return {
    url: url.href,
    finalUrl,
    status: res.status,
    meta,
    checks,
    verdict: worst(checks.map((c) => c.status)),
  };
}
