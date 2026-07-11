/**
 * Alerte operaționale către admin, pe email (Postmark — configurat în prod).
 * Fără Sentry (decizie): pentru volumul actual, un email la incident e suficient.
 * Fail-safe: dacă emailul însuși pică, doar logăm — nu aruncăm niciodată.
 */
import { sendEmail } from './email';
import { getContactToEmail } from './settings';
import { site } from '../../data/site';

export async function alertAdmin(subject: string, details: string): Promise<void> {
  console.error(`[alertă] ${subject}\n${details}`);
  try {
    const to = await getContactToEmail(site.contact.email);
    await sendEmail({
      to,
      subject: `[ALERTĂ simplead.ro] ${subject}`,
      text: [details, '', `Trimis automat la ${new Date().toISOString()}.`].join('\n'),
    });
  } catch (err) {
    console.error('[alertă] Trimiterea emailului de alertă a eșuat:', err);
  }
}
