import type { APIRoute } from 'astro';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { getDb } from '@lib/server/db';
import { subscribers } from '@lib/server/schema';
import { syncSubscriber } from '@lib/server/mailerlite';
import { notifySlack } from '@lib/server/slack';
import { trackServerConversion, capiContextFromRequest } from '@lib/server/capi';

export const prerender = false;

/**
 * Abonare la newsletter (formularul din footer + email-gate-urile de pe
 * /resurse). Single opt-in: abonatul intră `active` în DB și e sincronizat
 * best-effort în MailerLite. Funcționează complet și fără MailerLite configurat.
 */
const schema = z.object({
  email: z.string().trim().email('Adresa de email nu pare validă.').max(200),
  source: z.string().trim().max(80).default('footer'),
  company: z.string().optional(),
});

// Rate-limit simplu in-memory (același model ca login-ul din auth.ts).
const WINDOW_MS = 10 * 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, { count: number; resetAt: number }>();
function allow(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  entry.count += 1;
  return entry.count <= MAX_PER_WINDOW;
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const json = (status: number, body: object) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'Content-Type': 'application/json' },
    });

  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* indisponibil în unele contexte */
  }
  if (!allow(ip)) {
    return json(429, { ok: false, error: 'Prea multe încercări. Revino mai târziu.' });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Cerere invalidă.' });
  }
  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return json(422, {
      ok: false,
      error: parsed.error.issues[0]?.message ?? 'Date invalide.',
    });
  }

  // Honeypot completat = bot: răspundem cu succes fals, fără să salvăm nimic.
  if (parsed.data.company) {
    return json(200, { ok: true });
  }

  const db = getDb();
  if (!db) {
    console.warn('[newsletter] Fără DATABASE_URL: abonarea nu se salvează.');
    return json(503, { ok: false, error: 'Abonarea nu e disponibilă momentan.' });
  }

  try {
    const email = parsed.data.email.toLowerCase();
    const source = parsed.data.source;
    const inserted = await db
      .insert(subscribers)
      .values({ email, source, status: 'active' })
      .onConflictDoNothing({ target: subscribers.email })
      .returning({ id: subscribers.id });

    // Doar la abonat nou: notificare Slack + sincronizare MailerLite. Ambele
    // fire-and-forget (serverul Node persistă între request-uri), ca răspunsul
    // să rămână instant și abonarea să nu depindă de servicii externe.
    if (inserted.length > 0) {
      void notifySlack(`📧 Abonat nou la newsletter: ${email} (sursă: ${source})`);
      void trackServerConversion({
        event: 'sign_up',
        email,
        custom: { method: source },
        ...capiContextFromRequest(request),
      });
      void (async () => {
        const r = await syncSubscriber(email, source);
        if (r) {
          try {
            await db
              .update(subscribers)
              .set({ mailerliteId: r.id || null, syncedAt: new Date() })
              .where(eq(subscribers.email, email));
          } catch (e) {
            console.warn('[newsletter] Update MailerLite id a eșuat:', e);
          }
        }
      })();
    }
    return json(200, { ok: true });
  } catch (err) {
    console.error('[newsletter] Salvarea abonatului a eșuat:', err);
    return json(502, { ok: false, error: 'Ceva n-a mers. Încearcă din nou.' });
  }
};
