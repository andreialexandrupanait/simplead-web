import { Readable } from 'node:stream';
import { beforeEach, describe, expect, it, vi } from 'vitest';

/**
 * Rutarea hostului de preview-uri, izolată de disc și de baza de date: mock-uim
 * doar căutările și deschiderea fișierului, ca să verificăm exact deciziile de
 * rutare (redirect la slash final, versiune vs. asset, fallback pe versiunea
 * live, headerele de noindex).
 */
const findLiveVersion = vi.fn();
const findVersion = vi.fn();
const openPreviewFile = vi.fn();

vi.mock('@lib/server/client-previews', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@lib/server/client-previews')>();
  return {
    ...actual,
    PREVIEW_HOST: 'client.simplead.ro',
    findLiveVersion,
    findVersion,
    openPreviewFile,
  };
});

const { isPreviewHost, servePreview } = await import('@lib/server/preview-host');

const req = (pathname: string, method = 'GET') =>
  servePreview(new URL(`https://client.simplead.ro${pathname}`), method);

function fileFound(type = 'text/html; charset=utf-8', body = '<h1>salut</h1>') {
  openPreviewFile.mockResolvedValue({ stream: Readable.from([body]), type, size: body.length });
}

beforeEach(() => {
  vi.resetAllMocks();
  openPreviewFile.mockResolvedValue(null);
  findLiveVersion.mockResolvedValue(null);
  findVersion.mockResolvedValue(null);
});

describe('isPreviewHost', () => {
  it('recunoaște doar hostul dedicat', () => {
    expect(isPreviewHost('client.simplead.ro')).toBe(true);
    expect(isPreviewHost('simplead.ro')).toBe(false);
    expect(isPreviewHost('www.simplead.ro')).toBe(false);
    // Un host care doar conține numele nu trebuie să treacă.
    expect(isPreviewHost('client.simplead.ro.atacator.tld')).toBe(false);
  });
});

describe('servePreview — rute de bază', () => {
  it('rădăcina nu listează clienții', async () => {
    const res = await req('/');
    expect(res.status).toBe(200);
    await expect(res.text()).resolves.not.toContain('liposomals');
    expect(findLiveVersion).not.toHaveBeenCalled();
  });

  it('robots.txt interzice indexarea întregului host', async () => {
    const res = await req('/robots.txt');
    await expect(res.text()).resolves.toContain('Disallow: /');
  });

  it('respinge metodele de scriere', async () => {
    const res = await req('/liposomals/', 'POST');
    expect(res.status).toBe(405);
    expect(res.headers.get('Allow')).toBe('GET, HEAD');
  });

  it('pune noindex pe fiecare răspuns, inclusiv pe 404', async () => {
    for (const p of ['/', '/robots.txt', '/liposomals/', '/nimic']) {
      const res = await req(p);
      expect(res.headers.get('X-Robots-Tag'), p).toContain('noindex');
      expect(res.headers.get('X-Content-Type-Options'), p).toBe('nosniff');
    }
  });
});

describe('servePreview — slash final', () => {
  it('/<client> redirecționează la /<client>/ ca să rezolve căile relative', async () => {
    const res = await req('/liposomals');
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe('/liposomals/');
  });

  it('/<client>/<versiune> redirecționează doar dacă versiunea există', async () => {
    findVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v2' });
    const res = await req('/liposomals/v2');
    expect(res.status).toBe(301);
    expect(res.headers.get('Location')).toBe('/liposomals/v2/');
  });

  it('păstrează query string-ul peste redirect (utm etc.)', async () => {
    const res = await req('/liposomals?utm_source=whatsapp');
    expect(res.headers.get('Location')).toBe('/liposomals/?utm_source=whatsapp');
  });
});

describe('servePreview — rezolvarea versiunii', () => {
  it('/<client>/ servește versiunea live', async () => {
    findLiveVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v3' });
    fileFound();
    const res = await req('/liposomals/');
    expect(res.status).toBe(200);
    expect(openPreviewFile).toHaveBeenCalledWith('liposomals', 'v3', 'index.html');
  });

  it('/<client>/<versiune>/ servește exact acea versiune', async () => {
    findVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v1' });
    fileFound();
    await req('/liposomals/v1/');
    expect(openPreviewFile).toHaveBeenCalledWith('liposomals', 'v1', 'index.html');
    expect(findLiveVersion).not.toHaveBeenCalled();
  });

  it('un segment cu punct e tratat ca fișier, nu ca versiune', async () => {
    findLiveVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v3' });
    fileFound('image/webp', 'binar');
    await req('/liposomals/hero.webp');
    expect(findVersion).not.toHaveBeenCalled();
    expect(openPreviewFile).toHaveBeenCalledWith('liposomals', 'v3', 'hero.webp');
  });

  it('un segment necunoscut cade pe versiunea live, ca subfolder de assets', async () => {
    findLiveVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v3' });
    fileFound('image/png', 'binar');
    await req('/liposomals/assets/logo.png');
    expect(openPreviewFile).toHaveBeenCalledWith('liposomals', 'v3', 'assets/logo.png');
  });

  it('assets dintr-o versiune anume rămân în acea versiune', async () => {
    findVersion.mockResolvedValue({ clientSlug: 'liposomals', versionSlug: 'v1' });
    fileFound('text/css; charset=utf-8', 'body{}');
    await req('/liposomals/v1/css/stil.css');
    expect(openPreviewFile).toHaveBeenCalledWith('liposomals', 'v1', 'css/stil.css');
  });

  it('404 când clientul nu are nicio versiune', async () => {
    const res = await req('/inexistent/');
    expect(res.status).toBe(404);
  });

  it('404 pentru slug de client invalid, fără să atingă discul', async () => {
    for (const p of ['/..%2F..%2Fetc/', '/CLIENT/', '/a b/']) {
      const res = await req(p);
      expect(res.status, p).toBe(404);
    }
    expect(openPreviewFile).not.toHaveBeenCalled();
  });
});

describe('servePreview — cache', () => {
  it('HTML-ul nu se cache-uiește (republicarea se vede imediat)', async () => {
    findLiveVersion.mockResolvedValue({ clientSlug: 'x', versionSlug: 'v1' });
    fileFound();
    const res = await req('/x/');
    expect(res.headers.get('Cache-Control')).toBe('no-cache');
  });

  it('assets primesc un cache scurt, niciodată immutable', async () => {
    findLiveVersion.mockResolvedValue({ clientSlug: 'x', versionSlug: 'v1' });
    fileFound('image/webp', 'binar');
    const res = await req('/x/hero.webp');
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=300');
    expect(res.headers.get('Cache-Control')).not.toContain('immutable');
  });
});
