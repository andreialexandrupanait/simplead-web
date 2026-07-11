import type { APIRoute } from 'astro';
import { deleteUpload } from '@lib/server/uploads';
import { can } from '@lib/server/authz';

export const prerender = false;

/** Șterge un fișier din biblioteca media. Biblioteca e partajată, deci ștergerea
 *  cere capabilitatea `content: delete` (admin/editor), nu doar staff. */
export const DELETE: APIRoute = async ({ request, params }) => {
  if (!(await can(request.headers, { content: ['delete'] }))) {
    return new Response(JSON.stringify({ error: 'Interzis.' }), { status: 403 });
  }
  const ok = await deleteUpload(params.name ?? '');
  return new Response(JSON.stringify({ ok }), {
    status: ok ? 200 : 404,
    headers: { 'Content-Type': 'application/json' },
  });
};
