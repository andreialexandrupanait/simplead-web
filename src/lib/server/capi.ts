import { createHash, randomUUID } from 'node:crypto';
import { getIntegration } from './settings';
import { getPublicSettings } from './public-settings';

/**
 * Tracking server-side al conversiilor: Meta Conversions API + GA4 Measurement
 * Protocol. Best-effort — orice eroare e logată și înghițită, nu blochează fluxul.
 *
 * De ce: pixelul din browser pierde conversii din cauza ad-blockerelor/iOS/ITP.
 * Server-side trimitem aceleași conversii direct din backend. Cu `eventId` comun
 * cu evenimentul din browser, Meta/GA deduplică (nu numără de două ori).
 *
 * ID-urile de pixel/measurement vin din /admin/tracking (settings, non-secret);
 * token-urile (secrete) vin din /admin/integrari → integrarea `conversions`.
 */

export type ConversionEvent = 'generate_lead' | 'sign_up' | 'purchase';

export interface ConversionInput {
  event: ConversionEvent;
  /** Partajat cu evenimentul din browser → deduplicare. Generat dacă lipsește. */
  eventId?: string;
  email?: string;
  phone?: string;
  value?: number;
  currency?: string;
  transactionId?: string;
  /** GA client id (din cookie-ul `_ga`) pentru a lega sesiunea în GA4. */
  clientId?: string;
  sourceUrl?: string;
  userAgent?: string;
  ip?: string;
  /** Cookie-uri Meta pentru matching mai bun. */
  fbp?: string;
  fbc?: string;
  /** Parametri suplimentari (ex. form_type, method). */
  custom?: Record<string, string | number>;
}

const META_API_VERSION = 'v20.0';
const META_EVENT_NAME: Record<ConversionEvent, string> = {
  generate_lead: 'Lead',
  sign_up: 'CompleteRegistration',
  purchase: 'Purchase',
};

function sha256(v: string): string {
  return createHash('sha256').update(v).digest('hex');
}

/**
 * Consimțământul de marketing, citit din cookie-ul oglindit de CookieBanner
 * (`sa_consent_mkt=1|0`). Evenimentele de marketing (generate_lead, sign_up) se
 * trimit doar cu `1`; `purchase` (tranzacțional) nu trece pe aici.
 */
export function hasMarketingConsent(request: Request): boolean {
  const cookie = request.headers.get('cookie') ?? '';
  return /(?:^|; )sa_consent_mkt=1(?:;|$)/.test(cookie);
}

/** Extrage contextul de matching (client id GA, cookie-uri Meta, IP, UA) din request. */
export function capiContextFromRequest(
  request: Request,
): Pick<ConversionInput, 'clientId' | 'fbp' | 'fbc' | 'ip' | 'userAgent' | 'sourceUrl'> {
  const cookie = request.headers.get('cookie') ?? '';
  const readCookie = (name: string): string | undefined => {
    const m = cookie.match(new RegExp(`(?:^|; )${name}=([^;]+)`));
    return m ? decodeURIComponent(m[1]) : undefined;
  };
  const ga = readCookie('_ga'); // GA1.1.<id1>.<id2> → client_id = <id1>.<id2>
  return {
    clientId: ga ? ga.split('.').slice(-2).join('.') : undefined,
    fbp: readCookie('_fbp'),
    fbc: readCookie('_fbc'),
    ip: request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || undefined,
    userAgent: request.headers.get('user-agent') || undefined,
    sourceUrl: request.headers.get('referer') || undefined,
  };
}

async function sendMeta(input: ConversionInput, eventId: string): Promise<void> {
  const { metaCapiToken } = await getIntegration('conversions');
  const token = metaCapiToken.value;
  const pixelId = (await getPublicSettings()).tracking.metaPixelId;
  if (!token || !pixelId) return;

  const user_data: Record<string, unknown> = {};
  if (input.email) user_data.em = [sha256(input.email.trim().toLowerCase())];
  if (input.phone) user_data.ph = [sha256(input.phone.replace(/[^\d]/g, ''))];
  if (input.ip) user_data.client_ip_address = input.ip;
  if (input.userAgent) user_data.client_user_agent = input.userAgent;
  if (input.fbp) user_data.fbp = input.fbp;
  if (input.fbc) user_data.fbc = input.fbc;

  const custom_data: Record<string, unknown> = { ...input.custom };
  if (input.value != null) custom_data.value = input.value;
  if (input.currency) custom_data.currency = input.currency;
  if (input.transactionId) custom_data.order_id = input.transactionId;

  const body = {
    data: [
      {
        event_name: META_EVENT_NAME[input.event],
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: 'website',
        ...(input.sourceUrl ? { event_source_url: input.sourceUrl } : {}),
        user_data,
        custom_data,
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${encodeURIComponent(token)}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4_000),
    },
  );
  if (!res.ok) {
    console.warn(`[capi/meta] ${res.status}: ${(await res.text()).slice(0, 300)}`);
  }
}

async function sendGa4(input: ConversionInput, eventId: string): Promise<void> {
  const { ga4MpSecret } = await getIntegration('conversions');
  const secret = ga4MpSecret.value;
  const measurementId = (await getPublicSettings()).tracking.ga4Id;
  if (!secret || !measurementId) return;

  const params: Record<string, unknown> = {
    engagement_time_msec: 1,
    event_id: eventId,
    ...input.custom,
  };
  if (input.value != null) params.value = input.value;
  if (input.currency) params.currency = input.currency;
  if (input.transactionId) params.transaction_id = input.transactionId;

  const body = {
    client_id: input.clientId || randomUUID(),
    events: [{ name: input.event, params }],
  };

  const res = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(secret)}`,
    {
      method: 'POST',
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(4_000),
    },
  );
  if (!res.ok) {
    console.warn(`[capi/ga4] ${res.status}`);
  }
}

/**
 * Trimite o conversie către Meta CAPI + GA4 MP (cele configurate). Fire-and-forget:
 * apeleaz-o cu `void trackServerConversion(...)` — nu aruncă și nu blochează.
 */
export async function trackServerConversion(input: ConversionInput): Promise<void> {
  try {
    const eventId = input.eventId || randomUUID();
    await Promise.allSettled([sendMeta(input, eventId), sendGa4(input, eventId)]);
  } catch (err) {
    console.warn('[capi] Conversia server-side a eșuat:', err);
  }
}
