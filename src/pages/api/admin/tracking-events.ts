import type { APIRoute } from 'astro';
import { can } from '../../../lib/server/authz';
import { getTrackingEvents, saveTrackingEvents } from '../../../lib/server/tracking-events';

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const FORBIDDEN = json({ error: 'Nu ai permisiunea pentru această acțiune.' }, 403);

/** Listează regulile de evenimente. Necesită capability settings:manage. */
export const GET: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { settings: ['manage'] }))) return FORBIDDEN;
  return json({ rules: await getTrackingEvents() });
};

/** Salvează întreaga listă de reguli (body: { rules: [...] }). */
export const POST: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { settings: ['manage'] }))) return FORBIDDEN;

  let body: { rules?: unknown };
  try {
    body = (await request.json()) as { rules?: unknown };
  } catch {
    return json({ error: 'Cerere invalidă.' }, 400);
  }

  const result = await saveTrackingEvents(body?.rules ?? []);
  if (!result.ok) return json({ error: result.error }, 400);
  return json({ ok: true });
};
