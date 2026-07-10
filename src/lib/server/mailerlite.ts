import { getIntegration } from './settings';

/**
 * Sincronizare abonat → MailerLite (single opt-in). Best-effort ca ERP/Slack:
 * orice eroare e logată și înghițită — abonarea din site nu depinde niciodată
 * de MailerLite (datele rămân oricum în tabela `subscribers`).
 *
 * API v2: POST https://connect.mailerlite.com/api/subscribers e idempotent pe
 * email (upsert), deci retrimiterea e inofensivă.
 */
export async function syncSubscriber(
  email: string,
  source: string,
): Promise<{ id: string } | null> {
  try {
    const ml = await getIntegration('mailerlite');
    const apiKey = ml.apiKey.value;
    if (!apiKey) return null; // neconfigurat → no-op

    const groupId = (ml.groupId.value || '').trim();
    const body: Record<string, unknown> = {
      email: email.toLowerCase(),
      status: 'active',
      fields: { source },
    };
    if (groupId) body.groups = [groupId];

    const res = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(8_000),
    });

    if (!res.ok) {
      console.warn(`[mailerlite] Sincronizarea lui ${email} a răspuns ${res.status}.`);
      return null;
    }
    const data = (await res.json().catch(() => ({}))) as { data?: { id?: string } };
    return data.data?.id ? { id: data.data.id } : { id: '' };
  } catch (err) {
    console.error('[mailerlite] Sincronizarea abonatului a eșuat (nu blochează abonarea):', err);
    return null;
  }
}
