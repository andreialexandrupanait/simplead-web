import type { APIRoute } from 'astro';
import { domainSchema } from '../../../lib/tools-schema';
import { checkDeliverability } from '../../../lib/server/tools/email-deliverability';
import { createRateLimiter } from '../../../lib/server/rate-limit';

export const prerender = false;

const limiter = createRateLimiter({ windowMs: 60_000, max: 8 });

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* indisponibil */
  }
  if (!limiter.allow(ip)) {
    return json({ ok: false, error: 'Prea multe verificări. Revino într-un minut.' }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Cerere invalidă.' }, 400);
  }

  const parsed = domainSchema.safeParse((payload as { domain?: unknown })?.domain);
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Domeniu invalid.' }, 422);
  }

  try {
    const result = await checkDeliverability(parsed.data);
    return json({ ok: true, result });
  } catch (err) {
    console.warn('[tools/email] verificarea a eșuat:', err);
    return json({ ok: false, error: 'Verificarea a eșuat. Încearcă din nou.' }, 502);
  }
};
