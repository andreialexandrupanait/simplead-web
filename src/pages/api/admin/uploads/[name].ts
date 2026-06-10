import type { APIRoute } from 'astro';
import { deleteUpload } from '@lib/server/uploads';

export const prerender = false;

/** Șterge un fișier din biblioteca media. Protejat de middleware (/api/admin). */
export const DELETE: APIRoute = async ({ params }) => {
  const ok = await deleteUpload(params.name ?? '');
  return new Response(JSON.stringify({ ok }), {
    status: ok ? 200 : 404,
    headers: { 'Content-Type': 'application/json' },
  });
};
