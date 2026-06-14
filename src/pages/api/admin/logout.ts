import type { APIRoute } from 'astro';
import { getAuth } from '../../../lib/auth';

export const prerender = false;

/** Logout Better Auth: invalidează sesiunea din DB și șterge cookie-ul, apoi redirect. */
export const POST: APIRoute = async ({ request }) => {
  const res = await getAuth().api.signOut({ headers: request.headers, asResponse: true });
  // Păstrăm anteturile (Set-Cookie de ștergere) și adăugăm redirect-ul.
  const headers = new Headers(res.headers);
  headers.set('Location', '/admin/login');
  return new Response(null, { status: 303, headers });
};
