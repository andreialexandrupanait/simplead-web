/**
 * Utilitare pentru serii zilnice (grafice dashboard). Pur, fără I/O — buchetează
 * rânduri brute (ex. comenzi/lead-uri cu `createdAt`) în N zile consecutive,
 * zero-fill pe zilele fără date. Chei de zi în UTC pentru determinism.
 */

export type DailyPoint = { date: string; value: number };

function dayKey(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/**
 * @param rows   perechi {date, value} — value se însumează pe zi (default 1 dacă lipsește).
 * @param days   câte zile consecutive să întoarcă (inclusiv ziua `now`).
 * @param now    ziua de final a ferestrei (default: acum).
 */
export function fillDaily(
  rows: { date: Date | string | number; value?: number }[],
  days: number,
  now: Date = new Date(),
): DailyPoint[] {
  const byDay = new Map<string, number>();
  for (const r of rows) {
    const key = dayKey(new Date(r.date));
    byDay.set(key, (byDay.get(key) ?? 0) + Number(r.value ?? 1));
  }

  const out: DailyPoint[] = [];
  const end = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setUTCDate(end.getUTCDate() - i);
    const key = dayKey(d);
    out.push({ date: key, value: byDay.get(key) ?? 0 });
  }
  return out;
}

/** Suma valorilor unei serii. */
export function sumSeries(points: DailyPoint[]): number {
  return points.reduce((acc, p) => acc + p.value, 0);
}

/**
 * Delta procentuală între suma ultimelor `half` zile și cele `half` dinainte.
 * Întoarce null dacă perioada anterioară e 0 (evită împărțirea la zero / ∞).
 */
export function trendPct(points: DailyPoint[], half: number): number | null {
  if (points.length < half * 2) return null;
  const recent = sumSeries(points.slice(-half));
  const prior = sumSeries(points.slice(-half * 2, -half));
  if (prior === 0) return recent === 0 ? 0 : null;
  return Math.round(((recent - prior) / prior) * 100);
}
