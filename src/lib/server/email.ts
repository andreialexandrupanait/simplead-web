import { getIntegration } from './settings';
import { serverEnv } from './env';

export type SendEmailInput = {
  to: string;
  from?: string;
  replyTo?: string;
  subject: string;
  text: string;
};

export type SendEmailResult = { sent: boolean; simulated?: boolean };

const POSTMARK_API = 'https://api.postmarkapp.com/email';

/**
 * Trimite un email prin Postmark (token din admin/DB → env). Fără token,
 * păstrăm comportamentul istoric: logăm mesajul pe consolă și raportăm
 * `simulated`. Nu aruncă niciodată.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const postmark = await getIntegration('postmark');
  const token = postmark.serverToken.value;
  const from =
    input.from || postmark.fromEmail.value || serverEnv('CONTACT_FROM_EMAIL') || 'site@simplead.ro';

  if (!token) {
    console.info('[email] Token Postmark lipsește: mesaj simulat (nu s-a trimis email):');
    console.info(`To: ${input.to}\nSubject: ${input.subject}\n\n${input.text}`);
    return { sent: true, simulated: true };
  }

  try {
    const res = await fetch(POSTMARK_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Postmark-Server-Token': token,
      },
      body: JSON.stringify({
        From: `Simplead Website <${from}>`,
        To: input.to,
        ReplyTo: input.replyTo,
        Subject: input.subject,
        TextBody: input.text,
        MessageStream: 'outbound',
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => '');
      console.error(`[email] Postmark a răspuns ${res.status}: ${detail}`);
      return { sent: false };
    }
    return { sent: true };
  } catch (err) {
    console.error('[email] Trimiterea prin Postmark a eșuat:', err);
    return { sent: false };
  }
}
