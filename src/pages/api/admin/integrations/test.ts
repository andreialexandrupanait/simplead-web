import type { APIRoute } from 'astro';
import { getIntegration, type IntegrationName } from '../../../../lib/server/settings';
import { serverEnv } from '../../../../lib/server/env';

export const prerender = false;

type TestResult = { ok: boolean; detail: string };

function json(data: TestResult, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const TIMEOUT = AbortSignal.timeout.bind(AbortSignal);

async function testStripe(): Promise<TestResult> {
  const { secretKey } = await getIntegration('stripe');
  if (!secretKey.value) return { ok: false, detail: 'Cheia Stripe nu e configurată.' };
  const res = await fetch('https://api.stripe.com/v1/account', {
    headers: { Authorization: `Bearer ${secretKey.value}` },
    signal: TIMEOUT(8_000),
  });
  if (!res.ok) return { ok: false, detail: `Stripe a răspuns ${res.status}: cheie invalidă?` };
  const account = (await res.json()) as { id?: string };
  return { ok: true, detail: `Conectat la contul Stripe ${account.id ?? ''}.` };
}

async function testSmartbill(): Promise<TestResult> {
  const { email, token, cif } = await getIntegration('smartbill');
  if (!email.value || !token.value)
    return { ok: false, detail: 'Email-ul și token-ul SmartBill nu sunt configurate.' };
  if (!cif.value)
    return { ok: false, detail: 'CIF-ul firmei lipsește (necesar pentru apelurile SmartBill).' };
  const auth = Buffer.from(`${email.value}:${token.value}`).toString('base64');
  const res = await fetch(
    `https://ws.smartbill.ro/SBORO/api/series?cif=${encodeURIComponent(cif.value)}&type=f`,
    {
      headers: { Authorization: `Basic ${auth}`, Accept: 'application/json' },
      signal: TIMEOUT(8_000),
    },
  );
  if (!res.ok)
    return { ok: false, detail: `SmartBill a răspuns ${res.status}: verifică email/token/CIF.` };
  const body = (await res.json()) as { list?: { name: string }[] };
  const series = body.list?.map((s) => s.name).join(', ') || 'fără serii definite';
  return { ok: true, detail: `Conectat la SmartBill. Serii de facturi: ${series}.` };
}

async function testPostmark(): Promise<TestResult> {
  const { serverToken } = await getIntegration('postmark');
  if (!serverToken.value) return { ok: false, detail: 'Token-ul Postmark nu e configurat.' };
  const res = await fetch('https://api.postmarkapp.com/server', {
    headers: { 'X-Postmark-Server-Token': serverToken.value, Accept: 'application/json' },
    signal: TIMEOUT(8_000),
  });
  if (!res.ok) return { ok: false, detail: `Postmark a răspuns ${res.status}: token invalid?` };
  const server = (await res.json()) as { Name?: string };
  return { ok: true, detail: `Conectat la serverul Postmark „${server.Name ?? ''}".` };
}

async function testSlack(): Promise<TestResult> {
  const { webhookUrl } = await getIntegration('slack');
  if (!webhookUrl.value) return { ok: false, detail: 'Webhook-ul Slack nu e configurat.' };
  const res = await fetch(webhookUrl.value, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: 'Test notificare din adminul Simplead.' }),
    signal: TIMEOUT(8_000),
  });
  if (!res.ok) return { ok: false, detail: `Slack a răspuns ${res.status}: webhook invalid?` };
  return { ok: true, detail: 'Mesaj de test trimis pe Slack.' };
}

async function testGoogle(): Promise<TestResult> {
  const { clientId, clientSecret, allowedDomain } = await getIntegration('google');
  if (!clientId.value || !clientSecret.value) {
    return { ok: false, detail: 'Client ID și/sau Client secret lipsesc.' };
  }
  const domain = allowedDomain.value || 'simplead.ro';
  const base = serverEnv('SITE_URL') || 'https://simplead.ro';
  return {
    ok: true,
    detail: `Configurat pentru domeniul @${domain}. Verifică în Google Cloud redirect URI: ${base.replace(/\/$/, '')}/api/auth/google/callback`,
  };
}

const TESTS: Partial<Record<IntegrationName, () => Promise<TestResult>>> = {
  stripe: testStripe,
  smartbill: testSmartbill,
  postmark: testPostmark,
  slack: testSlack,
  google: testGoogle,
};

export const POST: APIRoute = async ({ request }) => {
  let integration: string;
  try {
    const body = (await request.json()) as { integration?: string };
    integration = body.integration ?? '';
  } catch {
    return json({ ok: false, detail: 'Cerere invalidă.' }, 400);
  }

  const test = TESTS[integration as IntegrationName];
  if (!test) return json({ ok: false, detail: 'Integrare necunoscută.' }, 400);

  try {
    return json(await test());
  } catch (err) {
    console.warn(`[admin] Testul integrării ${integration} a eșuat:`, err);
    return json({ ok: false, detail: 'Testul a eșuat (timeout sau eroare de rețea).' });
  }
};
