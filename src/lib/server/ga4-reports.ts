import { getGoogleAccessToken, hasGoogleServiceAccount } from './google-auth';

/**
 * Rapoarte GA4 (Data API v1beta) prin `fetch`, cu token de service account
 * (google-auth.ts). Property ID din `process.env.GA4_PROPERTY_ID` (numeric, ≠
 * Measurement ID G-…). SA-ul trebuie să aibă rol Viewer pe proprietatea GA4.
 * Cache scurt in-memory (datele GA4 oricum au latență).
 */

const SCOPE = ['https://www.googleapis.com/auth/analytics.readonly'];
const CONVERSION_EVENTS = ['generate_lead', 'sign_up', 'purchase'];

function propertyId(): string | undefined {
  return process.env.GA4_PROPERTY_ID?.trim();
}

export function isGa4Configured(): boolean {
  return Boolean(propertyId() && hasGoogleServiceAccount());
}

const TTL_MS = 5 * 60_000;
const cache = new Map<string, { at: number; value: unknown }>();

async function runReport(cacheKey: string, body: unknown): Promise<any> {
  const hit = cache.get(cacheKey);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.value;
  const token = await getGoogleAccessToken(SCOPE);
  if (!token) throw new Error('GA4 neconfigurat (GOOGLE_SA_KEY lipsă).');
  const res = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId()}:runReport`,
    {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    },
  );
  if (!res.ok) throw new Error(`GA4 ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  cache.set(cacheKey, { at: Date.now(), value: data });
  return data;
}

export interface Ga4Kpis {
  configured: boolean;
  error?: string;
  activeUsers?: number;
  sessions?: number;
  keyEvents?: number;
  eventCount?: number;
}

/** KPI-uri pe ultimele `days` zile: utilizatori, sesiuni, conversii (key events), evenimente. */
export async function getKpis(days: number): Promise<Ga4Kpis> {
  if (!isGa4Configured()) return { configured: false };
  try {
    const r = await runReport(`kpis:${days}`, {
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'sessions' },
        { name: 'keyEvents' },
        { name: 'eventCount' },
      ],
    });
    const mv = r.rows?.[0]?.metricValues ?? [];
    const n = (i: number) => Math.round(Number(mv[i]?.value ?? 0));
    return { configured: true, activeUsers: n(0), sessions: n(1), keyEvents: n(2), eventCount: n(3) };
  } catch (err) {
    return { configured: true, error: err instanceof Error ? err.message : String(err) };
  }
}

export interface EventRow {
  name: string;
  count: number;
}

/** Numărul de evenimente de conversie (generate_lead/sign_up/purchase) pe perioadă. */
export async function getConversionEvents(
  days: number,
): Promise<{ configured: boolean; error?: string; events?: EventRow[] }> {
  if (!isGa4Configured()) return { configured: false };
  try {
    const r = await runReport(`conv:${days}`, {
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: { fieldName: 'eventName', inListFilter: { values: CONVERSION_EVENTS } },
      },
      orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    });
    const events: EventRow[] = (r.rows ?? []).map((row: any) => ({
      name: row.dimensionValues[0].value,
      count: Math.round(Number(row.metricValues[0].value)),
    }));
    return { configured: true, events };
  } catch (err) {
    return { configured: true, error: err instanceof Error ? err.message : String(err) };
  }
}
