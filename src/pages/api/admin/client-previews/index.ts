import type { APIRoute } from 'astro';
import { listPreviews, publishVersion } from '@lib/server/client-previews';
import { can, getCurrentUser } from '@lib/server/authz';
import { logAudit } from '@lib/server/audit';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const FORBIDDEN = () => json({ error: 'Interzis.' }, 403);

/** Lista previzualizărilor, grupată pe client. */
export const GET: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { previews: ['view'] }))) return FORBIDDEN();
  return json({ clients: await listPreviews() });
};

/**
 * Publică o versiune. Multipart: `client`, `version`, `title`, `replace` +
 * unul sau mai multe câmpuri `file`.
 */
export const POST: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { previews: ['publish'] }))) return FORBIDDEN();

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return json({ error: 'Cerere invalidă (aștept multipart).' }, 400);
  }

  const files = form.getAll('file').filter((f): f is File => f instanceof File);
  if (files.length === 0) return json({ error: 'Lipsește fișierul.' }, 400);

  const user = await getCurrentUser(request.headers);
  const result = await publishVersion({
    client: String(form.get('client') ?? ''),
    version: String(form.get('version') ?? '') || undefined,
    title: String(form.get('title') ?? ''),
    replace: form.get('replace') === 'on' || form.get('replace') === 'true',
    files,
    createdBy: user?.id ?? null,
  });

  if (!result.ok) return json({ error: result.error }, 422);

  await logAudit({
    actorId: user?.id,
    actorEmail: user?.email,
    action: 'preview.publish',
    targetId: `${result.clientSlug}/${result.versionSlug}`,
    meta: { files: result.written, url: result.url },
  });

  return json(result, 201);
};
