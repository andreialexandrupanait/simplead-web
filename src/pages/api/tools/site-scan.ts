import type { APIRoute } from 'astro';
import { urlToolSchema } from '../../../lib/tools-schema';
import { scanSite } from '../../../lib/server/tools/site-scanner';
import { ToolError } from '../../../lib/server/tools/ssrf-guard';
import { createRateLimiter } from '../../../lib/server/rate-limit';

export const prerender = false;

// Mai strict decât tool-urile DNS: scanner-ul face fetch extern.
const limiter = createRateLimiter({ windowMs: 60_000, max: 5 });

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
    return json({ ok: false, error: 'Prea multe scanări. Revino într-un minut.' }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Cerere invalidă.' }, 400);
  }

  const parsed = urlToolSchema.safeParse((payload as { url?: unknown })?.url);
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Adresă invalidă.' }, 422);
  }

  try {
    const result = await scanSite(parsed.data);
    return json({ ok: true, result });
  } catch (err) {
    // ToolError = input/SSRF respins → 422 cu mesaj prietenos; restul → 502.
    if (err instanceof ToolError) {
      return json({ ok: false, error: err.message }, 422);
    }
    console.warn('[tools/site-scan] scanarea a eșuat:', err);
    return json({ ok: false, error: 'Scanarea a eșuat (site indisponibil sau prea lent).' }, 502);
  }
};
