/**
 * Persistă și citește regulile de evenimente no-code (din /admin/evenimente).
 * Stocare: un singur rând JSON în tabela `settings` (cheia `site.tracking_events`),
 * ca și restul setărilor publice — fără tabelă/migrație nouă. Cache scurt in-memory.
 */
import { eq } from 'drizzle-orm';
import { getDb } from './db';
import { settings } from './schema';
import {
  matchPage,
  trackingEventsSchema,
  type TrackingEventRule,
} from '@data/tracking-events-defs';

export const TRACKING_EVENTS_KEY = 'site.tracking_events';

const TTL_MS = 60_000;
let cache: { at: number; value: TrackingEventRule[] } | null = null;

export function bustTrackingEventsCache(): void {
  cache = null;
}

/** Regulile salvate (validate). Fără DB / la eroare → listă goală, nu aruncă. */
export async function getTrackingEvents(): Promise<TrackingEventRule[]> {
  if (cache && Date.now() - cache.at < TTL_MS) return cache.value;

  let value: TrackingEventRule[] = [];
  const db = getDb();
  if (db) {
    try {
      const rows = await db.select().from(settings).where(eq(settings.key, TRACKING_EVENTS_KEY));
      const raw = rows[0]?.value;
      if (raw) {
        const parsed = trackingEventsSchema.safeParse(JSON.parse(raw));
        if (parsed.success) value = parsed.data;
        else console.warn('[tracking-events] JSON salvat invalid, ignor:', parsed.error.issues[0]);
      }
    } catch (err) {
      console.warn('[tracking-events] Citirea a eșuat, folosesc listă goală:', err);
    }
  }
  cache = { at: Date.now(), value };
  return value;
}

export type SaveResult = { ok: true } | { ok: false; error: string };

/** Validează (Zod) și salvează întreaga listă de reguli. */
export async function saveTrackingEvents(input: unknown): Promise<SaveResult> {
  const parsed = trackingEventsSchema.safeParse(input);
  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return { ok: false, error: `Reguli invalide: ${first?.message ?? 'format neașteptat'}` };
  }
  const db = getDb();
  if (!db) return { ok: false, error: 'Baza de date nu e configurată (DATABASE_URL lipsește).' };

  const value = JSON.stringify(parsed.data);
  try {
    await db
      .insert(settings)
      .values({ key: TRACKING_EVENTS_KEY, value, encrypted: false })
      .onConflictDoUpdate({
        target: settings.key,
        set: { value, encrypted: false, updatedAt: new Date() },
      });
    bustTrackingEventsCache();
    return { ok: true };
  } catch (err) {
    console.error('[tracking-events] Salvarea a eșuat:', err);
    return { ok: false, error: 'Salvarea în baza de date a eșuat. Verifică conexiunea.' };
  }
}

/** Regulile active care se potrivesc paginii curente (pentru runtime). */
export function rulesForPath(rules: TrackingEventRule[], pathname: string): TrackingEventRule[] {
  return rules.filter((r) => r.enabled && matchPage(r.pages, pathname));
}
