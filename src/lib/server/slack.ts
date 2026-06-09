import { getIntegration } from './settings';

/**
 * Notificare pe Slack prin incoming webhook. Best-effort: orice eroare e
 * logată și înghițită, nu blochează niciodată fluxul principal.
 */
export async function notifySlack(text: string): Promise<void> {
  try {
    const slack = await getIntegration('slack');
    const webhookUrl = slack.webhookUrl.value;
    if (!webhookUrl) return;

    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
      signal: AbortSignal.timeout(3_000),
    });
    if (!res.ok) {
      console.warn(`[slack] Webhook-ul a răspuns ${res.status}.`);
    }
  } catch (err) {
    console.warn('[slack] Notificarea a eșuat:', err);
  }
}
