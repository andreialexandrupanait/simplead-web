import type { APIRoute } from 'astro';
import { can } from '../../../lib/server/authz';
import { publishDefaultWorkspace } from '../../../lib/server/gtm-api';

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const FORBIDDEN = json({ error: 'Nu ai permisiunea pentru această acțiune.' }, 403);

/** Acțiuni GTM din admin (deocamdată: publish). Necesită settings:manage. */
export const POST: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { settings: ['manage'] }))) return FORBIDDEN;

  let body: { action?: string };
  try {
    body = (await request.json()) as { action?: string };
  } catch {
    return json({ error: 'Cerere invalidă.' }, 400);
  }

  if (body.action === 'publish') {
    const r = await publishDefaultWorkspace();
    return r.ok ? json({ ok: true, versionId: r.versionId }) : json({ error: r.error }, 400);
  }

  return json({ error: 'Acțiune necunoscută.' }, 400);
};
