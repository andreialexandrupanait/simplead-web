import { Readable } from 'node:stream';
import {
  findLiveVersion,
  findVersion,
  openPreviewFile,
  isValidSlug,
  PREVIEW_HOST,
} from './client-previews';

/**
 * Serverul pentru hostul de preview-uri (`client.simplead.ro`).
 *
 * Rulează ÎN AFARA restului aplicației: middleware-ul îl cheamă înainte de
 * `route()` și de `harden()`. Motivul e că nimic din site nu se aplică aici —
 * redirecturile legacy (care fac un query în DB), gate-ul de mentenanță, testul
 * A/B, CSP-ul strict și `X-Frame-Options` ar deranja HTML-ul unui client fără să
 * aducă vreun beneficiu.
 *
 * Harta de rute:
 *
 *   /                              → pagină goală („nimic aici")
 *   /robots.txt                    → Disallow: /
 *   /<client>                      → 301 la /<client>/
 *   /<client>/                     → index.html al versiunii live
 *   /<client>/<versiune>           → 301 la /<client>/<versiune>/
 *   /<client>/<versiune>/          → index.html al acelei versiuni
 *   /<client>/<versiune>/<fișier>  → fișier din acea versiune
 *   /<client>/<fișier>             → fișier din versiunea live
 *
 * De ce redirect la slash final și nu injectare de `<base href>`: un `<base>`
 * schimbă și rezolvarea linkurilor de tip `#sectiune`, care ar deveni navigări
 * de pagină în loc de scroll în pagină — exact ce folosesc landing page-urile
 * pentru meniul lor de ancore. Slash-ul final rezolvă căile relative fără să
 * atingă ancorele, iar linkul rămâne la fel de scurt.
 */

const NOINDEX = 'noindex, nofollow, noarchive, noimageindex';

function headers(extra: Record<string, string> = {}): Record<string, string> {
  return {
    'X-Robots-Tag': NOINDEX,
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    ...extra,
  };
}

function notFound(): Response {
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>404</title>` +
      `<style>body{font:16px/1.6 system-ui,sans-serif;margin:15vh auto;max-width:32rem;padding:0 1.5rem;color:#334}</style>` +
      `<h1 style="font-size:1.25rem">Pagina nu există</h1>` +
      `<p>Linkul e greșit sau previzualizarea a fost ștearsă. Cere-i expeditorului un link nou.</p>`,
    { status: 404, headers: headers({ 'Content-Type': 'text/html; charset=utf-8' }) },
  );
}

function redirect(to: string): Response {
  return new Response(null, { status: 301, headers: headers({ Location: to }) });
}

async function sendFile(
  clientSlug: string,
  versionSlug: string,
  rel: string,
): Promise<Response | null> {
  const file = await openPreviewFile(clientSlug, versionSlug, rel);
  if (!file) return null;
  const html = file.type.startsWith('text/html');
  return new Response(Readable.toWeb(file.stream as Readable) as ReadableStream, {
    headers: headers({
      'Content-Type': file.type,
      'Content-Length': String(file.size),
      // Fișierele se rescriu peste la republicare (numele sunt stabile, spre
      // deosebire de /uploads/*), deci nimic „immutable": HTML-ul trebuie
      // revalidat mereu, restul poate sta câteva minute.
      'Cache-Control': html ? 'no-cache' : 'public, max-age=300',
    }),
  });
}

const ROOT_PAGE =
  `<!doctype html><meta charset="utf-8"><title>Previzualizări Simplead</title>` +
  `<style>body{font:16px/1.6 system-ui,sans-serif;margin:15vh auto;max-width:32rem;padding:0 1.5rem;color:#334}</style>` +
  `<h1 style="font-size:1.25rem">Previzualizări Simplead</h1>` +
  `<p>Aici se deschid doar linkurile primite direct. <a href="https://simplead.ro">simplead.ro</a></p>`;

export function isPreviewHost(hostname: string): boolean {
  return hostname === PREVIEW_HOST;
}

export async function servePreview(url: URL, method: string): Promise<Response> {
  if (method !== 'GET' && method !== 'HEAD') {
    return new Response(null, { status: 405, headers: headers({ Allow: 'GET, HEAD' }) });
  }

  const segments = url.pathname.split('/').filter(Boolean);
  const trailingSlash = url.pathname.endsWith('/');

  if (segments.length === 0) {
    return new Response(ROOT_PAGE, {
      headers: headers({ 'Content-Type': 'text/html; charset=utf-8' }),
    });
  }

  if (segments.length === 1 && segments[0] === 'robots.txt') {
    return new Response('User-agent: *\nDisallow: /\n', {
      headers: headers({ 'Content-Type': 'text/plain; charset=utf-8' }),
    });
  }

  const [clientSlug, ...rest] = segments;
  if (!isValidSlug(clientSlug)) return notFound();

  // /<client> → /<client>/  (fără slash, căile relative din HTML s-ar rezolva
  // la rădăcina hostului, nu în folderul versiunii)
  if (rest.length === 0) {
    if (!trailingSlash) return redirect(`/${clientSlug}/${url.search}`);
    const live = await findLiveVersion(clientSlug);
    if (!live) return notFound();
    return (await sendFile(clientSlug, live.versionSlug, 'index.html')) ?? notFound();
  }

  // Primul segment de după client e o versiune doar dacă arată a slug (fără
  // punct) ȘI există în DB. Altfel e o cale de fișier în versiunea live.
  const maybeVersion = rest[0];
  const version =
    !maybeVersion.includes('.') && isValidSlug(maybeVersion)
      ? await findVersion(clientSlug, maybeVersion)
      : null;

  if (version) {
    const inner = rest.slice(1);
    if (inner.length === 0) {
      if (!trailingSlash) return redirect(`/${clientSlug}/${maybeVersion}/${url.search}`);
      return (await sendFile(clientSlug, maybeVersion, 'index.html')) ?? notFound();
    }
    return (await sendFile(clientSlug, maybeVersion, inner.join('/'))) ?? notFound();
  }

  const live = await findLiveVersion(clientSlug);
  if (!live) return notFound();
  return (await sendFile(clientSlug, live.versionSlug, rest.join('/'))) ?? notFound();
}
