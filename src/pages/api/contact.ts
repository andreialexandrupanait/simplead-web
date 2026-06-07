import type { APIRoute } from 'astro';
import { contactSchema } from '../../lib/contact-schema';
import { site } from '../../data/site';

// Rută on-demand (POST → trimitere email la runtime). În dev e servită live
// de dev server (cu un warning inofensiv „no adapter"); la build, adaptorul
// node o împachetează ca funcție on-demand.
export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const POST: APIRoute = async ({ request }) => {
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

  const { name, email, phone, service, message, company } = parsed.data;

  // Honeypot: dacă e completat, e bot — răspundem „ok" fără a trimite nimic.
  if (company) return json({ ok: true });

  const apiKey = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO_EMAIL || site.contact.email;
  const from = import.meta.env.CONTACT_FROM_EMAIL || 'site@simplead.ro';

  const subject = `[Simplead] Cerere nouă${service ? ` — ${service}` : ''} — ${name}`;
  const text = [
    `Nume: ${name}`,
    `Email: ${email}`,
    `Telefon: ${phone || '—'}`,
    `Serviciu: ${service || '—'}`,
    '',
    'Mesaj:',
    message,
  ].join('\n');

  // Fallback elegant: fără cheie Resend, simulăm trimiterea + logăm.
  if (!apiKey) {
    console.info('[contact] RESEND_API_KEY lipsește — mesaj simulat (nu s-a trimis email):');
    console.info(text);
    return json({ ok: true, simulated: true });
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Simplead Website <${from}>`,
      to,
      replyTo: email,
      subject,
      text,
    });
    if (error) {
      console.error('[contact] Resend error:', error);
      return json({ ok: false, error: 'Trimiterea a eșuat. Încearcă din nou.' }, 502);
    }
    return json({ ok: true });
  } catch (err) {
    console.error('[contact] Eroare neașteptată:', err);
    return json({ ok: false, error: 'Eroare de server.' }, 500);
  }
};
