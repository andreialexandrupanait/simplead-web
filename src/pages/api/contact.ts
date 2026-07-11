import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/contact-schema';
import { site } from '../../data/site';
import { getDb } from '../../lib/server/db';
import { leads } from '../../lib/server/schema';
import { sendEmail } from '../../lib/server/email';
import { notifySlack } from '../../lib/server/slack';
import { getContactToEmail } from '../../lib/server/settings';
import {
  trackServerConversion,
  capiContextFromRequest,
  hasMarketingConsent,
} from '../../lib/server/capi';
import { createRateLimiter } from '../../lib/server/rate-limit';

// Rută on-demand (POST la runtime). În dev e servită live de dev server;
// la build, adaptorul node o împachetează ca funcție on-demand.
export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

/** Varianta A/B a vizitatorului din cookie-ul `sa_ab` (pentru statisticile de conversie). */
function abVariant(request: Request): 'a' | 'b' | null {
  const m = (request.headers.get('cookie') ?? '').match(/(?:^|; )sa_ab=(a|b)(?:;|$)/);
  return m ? (m[1] as 'a' | 'b') : null;
}

// Limită blândă anti-spam: 6 mesaje / 10 min / IP (același model ca tichetele).
const limiter = createRateLimiter({ windowMs: 10 * 60_000, max: 6 });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let ip = 'unknown';
  try {
    ip = clientAddress;
  } catch {
    /* indisponibil în unele contexte */
  }
  if (!limiter.allow(ip)) {
    return json({ ok: false, error: 'Prea multe mesaje. Revino în câteva minute.' }, 429);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ ok: false, error: 'Cerere invalidă.' }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, error: 'Date invalide.', issues: parsed.error.flatten().fieldErrors },
      422,
    );
  }

  const { firstName, lastName, email, phone, company, service, message, website } = parsed.data;

  // Honeypot: dacă e completat, e bot - răspundem „ok" fără a face nimic.
  if (website) return json({ ok: true });

  // Nume complet (ordine RO: Nume Prenume) pentru DB, subiect și notificări.
  const name = `${lastName} ${firstName}`.trim();

  // 1) Persistăm lead-ul (best-effort: fără DB sau cu DB căzut, mergem mai departe).
  let leadStored = false;
  const db = getDb();
  if (db) {
    try {
      await db
        .insert(leads)
        .values({ name, email, phone, company: company || null, service, message, variant: abVariant(request) });
      leadStored = true;
    } catch (err) {
      console.warn('[contact] Salvarea lead-ului a eșuat:', err);
    }
  }

  // 2) Email către noi (Postmark sau simulare pe consolă, fără token).
  const to = await getContactToEmail(site.contact.email);
  const subject = `[Simplead] Cerere nouă${service ? `: ${service}` : ''} - ${name}`;
  const text = [
    `Nume: ${lastName}`,
    `Prenume: ${firstName}`,
    `Email: ${email}`,
    `Telefon: ${phone}`,
    `Firmă/CUI: ${company || '-'}`,
    `Serviciu: ${service || '-'}`,
    '',
    'Mesaj:',
    message,
  ].join('\n');

  const emailResult = await sendEmail({ to, replyTo: email, subject, text });

  // 3) Conversie server-side (Meta CAPI + GA4 MP), dublează evenimentul din
  // browser — DOAR cu consimțământ de marketing (GDPR: PII hash-uit către Meta).
  if (hasMarketingConsent(request)) {
    void trackServerConversion({
      event: 'generate_lead',
      email,
      phone,
      custom: { form_type: service || 'contact' },
      ...capiContextFromRequest(request),
    });
  }

  // 4) Notificare Slack, fire-and-forget (nu blocăm răspunsul).
  void notifySlack(
    `:incoming_envelope: Lead nou pe simplead.ro\n*${name}* <${email}> · ${phone}${company ? `\nFirmă/CUI: ${company}` : ''}${service ? `\nServiciu: ${service}` : ''}\n${message.length > 300 ? `${message.slice(0, 300)}...` : message}`,
  );

  // 5) Auto-reply de confirmare către client (best-effort). Reply merge la noi.
  void sendEmail({
    to: email,
    replyTo: to,
    subject: 'Am primit mesajul tău — Simplead',
    text: [
      `Salut, ${firstName}!`,
      '',
      'Îți mulțumim că ne-ai scris. Am primit mesajul tău și revenim de obicei în aceeași zi lucrătoare.',
      service ? `Cererea ta: ${service}` : '',
      '',
      'Dacă vrei să adaugi ceva, răspunde direct la acest email.',
      '',
      '— Echipa Simplead',
      'https://simplead.ro',
    ]
      .filter(Boolean)
      .join('\n'),
  });

  // Utilizatorul primește „ok" dacă mesajul a ajuns măcar pe un canal
  // (DB sau email). Eșecul total e singurul caz de eroare.
  if (emailResult.sent || leadStored) {
    return json(
      emailResult.simulated && !leadStored ? { ok: true, simulated: true } : { ok: true },
    );
  }
  return json({ ok: false, error: 'Trimiterea a eșuat. Încearcă din nou.' }, 502);
};
