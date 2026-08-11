import type { APIRoute } from 'astro';
import { deleteVersion, renameVersionTitle, setLiveVersion } from '@lib/server/client-previews';
import { can, getCurrentUser } from '@lib/server/authz';
import { logAudit } from '@lib/server/audit';

export const prerender = false;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

const FORBIDDEN = () => json({ error: 'Interzis.' }, 403);

/** Marchează versiunea „live" sau îi schimbă titlul. */
export const PATCH: APIRoute = async ({ params, request }) => {
  if (!(await can(request.headers, { previews: ['publish'] }))) return FORBIDDEN();
  const id = params.id;
  if (!id) return json({ error: 'Lipsește id-ul.' }, 400);

  let body: { isLive?: boolean; title?: string };
  try {
    body = await request.json();
  } catch {
    return json({ error: 'Cerere invalidă (aștept JSON).' }, 400);
  }

  const user = await getCurrentUser(request.headers);

  if (body.isLive === true) {
    if (!(await setLiveVersion(id))) return json({ error: 'Versiunea nu există.' }, 404);
    await logAudit({
      actorId: user?.id,
      actorEmail: user?.email,
      action: 'preview.set-live',
      targetId: id,
    });
    return json({ ok: true });
  }

  if (typeof body.title === 'string') {
    if (!(await renameVersionTitle(id, body.title))) {
      return json({ error: 'Redenumirea a eșuat.' }, 500);
    }
    return json({ ok: true });
  }

  return json({ error: 'Nimic de actualizat.' }, 400);
};

/** Șterge versiunea: rândul din DB + folderul de pe disc. */
export const DELETE: APIRoute = async ({ params, request }) => {
  if (!(await can(request.headers, { previews: ['delete'] }))) return FORBIDDEN();
  const id = params.id;
  if (!id) return json({ error: 'Lipsește id-ul.' }, 400);

  const row = await deleteVersion(id);
  if (!row) return json({ error: 'Versiunea nu există.' }, 404);

  const user = await getCurrentUser(request.headers);
  await logAudit({
    actorId: user?.id,
    actorEmail: user?.email,
    action: 'preview.delete',
    targetId: `${row.clientSlug}/${row.versionSlug}`,
  });

  return json({ ok: true });
};
