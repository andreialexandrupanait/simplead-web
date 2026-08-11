import type { APIRoute } from 'astro';
import { timingSafeEqual } from 'node:crypto';
import { publishVersion } from '@lib/server/client-previews';
import { logAudit } from '@lib/server/audit';
import { serverEnv } from '@lib/server/env';

export const prerender = false;

/**
 * Publicare de previzualizări din linia de comandă (scripts/sad-publish.mjs),
 * ca să pot trimite un landing page direct din terminal, fără să trec prin
 * browser.
 *
 * Ruta stă în afara lui /api/admin/*, deci NU e acoperită de gate-ul de sesiune
 * din middleware: singura poartă e `PUBLISH_TOKEN`. Fără token setat în
 * environment, ruta e dezactivată complet (404) — nu vrem un endpoint de scriere
 * care „merge cumva" pe o instanță prost configurată.
 *
 * Atenție la `security.checkOrigin` din astro.config.mjs: un POST multipart fără
 * header `Origin` e respins cu 403 de middleware-ul intern al Astro, ÎNAINTE să
 * ajungă aici. De aceea scripts/sad-publish.mjs trimite `Origin` egal cu originea
 * la care postează.
 */

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

/** Comparație în timp constant, tolerantă la lungimi diferite. */
function tokenMatches(provided: string, expected: string): boolean {
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export const POST: APIRoute = async ({ request }) => {
  const expected = serverEnv('PUBLISH_TOKEN');
  if (!expected) return new Response(null, { status: 404 });

  const auth = request.headers.get('authorization') ?? '';
  const provided = auth.startsWith('Bearer ') ? auth.slice(7).trim() : '';
  if (!provided || !tokenMatches(provided, expected)) {
    return json({ error: 'Token invalid.' }, 401);
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Cerere invalidă (aștept multipart).' }, 400);
  }

  const files = form.getAll('file').filter((f): f is File => f instanceof File);
  if (files.length === 0) return json({ error: 'Lipsește fișierul.' }, 400);

  const result = await publishVersion({
    client: String(form.get('client') ?? ''),
    version: String(form.get('version') ?? '') || undefined,
    title: String(form.get('title') ?? ''),
    replace: form.get('replace') === 'true',
    files,
    createdBy: null,
  });

  if (!result.ok) return json({ error: result.error }, 422);

  await logAudit({
    actorEmail: 'cli',
    action: 'preview.publish',
    targetId: `${result.clientSlug}/${result.versionSlug}`,
    meta: { files: result.written, url: result.url, via: 'token' },
  });

  return json(result, 201);
};
