import type { APIRoute } from 'astro';
import { ticketSchema, ticketCategoryLabel } from '../../lib/ticket-schema';
import { site } from '../../data/site';
import { getDb } from '../../lib/server/db';
import { tickets } from '../../lib/server/schema';
import { sendEmail } from '../../lib/server/email';
import { notifySlack } from '../../lib/server/slack';
import { serverEnv } from '../../lib/server/env';
import { createRateLimiter } from '../../lib/server/rate-limit';

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// Limită blândă: 6 tichete / 10 min / IP (același model ca formularul de contact).
const limiter = createRateLimiter({ windowMs: 10 * 60_000, max: 6 });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* indisponibil în unele contexte */
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

  const parsed = ticketSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: 'Date invalide.', issues: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  const {
    name,
    email,
    phone,
    company,
    category,
    siteUrl,
    priority,
    message,
    packageSlug,
    website,
  } = parsed.data;

  // Honeypot: dacă e completat, e bot — răspundem „ok" fără a face nimic.
  if (website) return json({ ok: true });

  const categoryLabel = ticketCategoryLabel(category);

  // 1) Persistăm tichetul (best-effort: fără DB sau cu DB căzut, mergem mai departe).
  let stored = false;
  const db = getDb();
  if (db) {
    try {
      await db.insert(tickets).values({
        name,
        email,
        phone: phone || null,
        company: company || null,
        category,
        siteUrl: siteUrl || null,
        priority,
        message,
        packageSlug: packageSlug || null,
      });
      stored = true;
    } catch (err) {
      console.warn('[ticket] Salvarea tichetului a eșuat:', err);
    }
  }

  // 2) Email către noi (Postmark sau simulare pe consolă, fără token).
  const to = serverEnv('CONTACT_TO_EMAIL') || site.contact.email;
  const subject = `[Simplead] Tichet nou: ${categoryLabel} - ${name}`;
  const text = [
    `Nume: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone || '-'}`,
    `Firmă: ${company || '-'}`,
    `Categorie: ${categoryLabel}`,
    `Prioritate: ${priority}`,
    `Site: ${siteUrl || '-'}`,
    packageSlug ? `Lucrare vizată: ${packageSlug}` : '',
    '',
    'Descriere:',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const emailResult = await sendEmail({ to, replyTo: email, subject, text });

  // 3) Notificare Slack, fire-and-forget.
  void notifySlack(
    `:lifebuoy: Tichet nou de suport pe simplead.ro\n*${name}* <${email}>${phone ? ` · ${phone}` : ''}\nCategorie: ${categoryLabel} · Prioritate: ${priority}${siteUrl ? `\nSite: ${siteUrl}` : ''}\n${message.length > 300 ? `${message.slice(0, 300)}...` : message}`,
  );

  // „ok" dacă tichetul a ajuns măcar pe un canal (DB sau email).
  if (emailResult.sent || stored) {
    return json(emailResult.simulated && !stored ? { ok: true, simulated: true } : { ok: true });
  }
  return json({ ok: false, error: 'Trimiterea a eșuat. Încearcă din nou.' }, 502);
};
