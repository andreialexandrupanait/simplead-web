import type { APIRoute } from 'astro';
import { listUploads, saveUpload } from '@lib/server/uploads';
import { can } from '@lib/server/authz';

export const prerender = false;

const FORBIDDEN = new Response(JSON.stringify({ error: 'Interzis.' }), { status: 403 });

/** Lista bibliotecii media. Middleware gate-uiește staff-ul; cerem explicit
 *  capabilitatea de editare conținut (defense-in-depth). */
export const GET: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { content: ['edit-own'] }))) return FORBIDDEN.clone();
  const entries = await listUploads();
  return new Response(JSON.stringify({ entries }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

/** Upload multipart (câmpul `file`). Doar imagini raster, max 5MB. */
export const POST: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { content: ['edit-own'] }))) return FORBIDDEN.clone();
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Cerere invalidă (aștept multipart).' }), {
      status: 400,
    });
  }
  const file = form.get('file');
  if (!(file instanceof File)) {
    return new Response(JSON.stringify({ error: 'Lipsește fișierul.' }), { status: 400 });
  }
  const result = await saveUpload(file);
  if (!result.ok) {
    return new Response(JSON.stringify({ error: result.error }), { status: 422 });
  }
  return new Response(JSON.stringify(result.upload), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};
