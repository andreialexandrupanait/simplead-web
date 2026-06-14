import type { APIRoute } from 'astro';
import { leadReportSchema } from '../../../lib/tools-schema';
import { site } from '../../../data/site';
import { getDb } from '../../../lib/server/db';
import { subscribers } from '../../../lib/server/schema';
import { sendEmail } from '../../../lib/server/email';
import { notifySlack } from '../../../lib/server/slack';
import { getContactToEmail } from '../../../lib/server/settings';
import { createRateLimiter } from '../../../lib/server/rate-limit';

export const prerender = false;

const limiter = createRateLimiter({ windowMs: 10 * 60_000, max: 6 });

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/**
 * „Trimite-mi raportul pe email": captură de lead dintr-un instrument gratuit.
 * Salvăm abonatul (source `tool:<nume>`) și anunțăm intern. Best-effort, ca
 * formularul de contact: fără DB, lead-ul ajunge măcar pe email/Slack.
 */
export const POST: APIRoute = async ({ request, clientAddress }) => {
  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* indisponibil */
  }
  if (!limiter.allow(ip)) {
    return json({ ok: false, error: 'Prea multe cereri. Revino mai târziu.' }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Cerere invalidă.' }, 400);
  }

  const parsed = leadReportSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ ok: false, error: parsed.error.issues[0]?.message ?? 'Date invalide.' }, 422);
  }
  const { email, tool, target, website } = parsed.data;

  // Honeypot completat = bot.
  if (website) return json({ ok: true });

  const source = `tool:${tool}`.slice(0, 80);

  let stored = false;
  const db = getDb();
  if (db) {
    try {
      await db
        .insert(subscribers)
        .values({ email: email.toLowerCase(), source })
        .onConflictDoNothing({ target: subscribers.email });
      stored = true;
    } catch (err) {
      console.warn('[tools/send-report] salvarea abonatului a eșuat:', err);
    }
  }

  const to = await getContactToEmail(site.contact.email);
  const subject = `[Simplead] Lead din instrument: ${tool}`;
  const text = [
    `Un vizitator a cerut raportul „${tool}" pe email.`,
    `Email: ${email}`,
    `Țintă verificată: ${target}`,
  ].join('\n');
  const emailResult = await sendEmail({ to, replyTo: email, subject, text });

  void notifySlack(
    `:mag: Lead din instrumentul *${tool}* pe simplead.ro\n<${email}> · țintă: ${target}`,
  );

  if (emailResult.sent || stored) {
    return json({ ok: true });
  }
  return json({ ok: false, error: 'Momentan nu putem trimite raportul.' }, 503);
};
