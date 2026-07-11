/** Formatări comune (ro-RO) pentru admin: date, ore, bani. Pure, fără I/O. */

const RO = 'ro-RO';

/** „5 iul" — pentru axe de grafic (input: Date sau cheie 'YYYY-MM-DD'). */
export function fmtDayShort(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString(RO, { day: 'numeric', month: 'short', timeZone: 'UTC' });
}

/** „5 iul, 14:30" — pentru feed-uri de activitate. */
export function fmtDateTime(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return (
    date.toLocaleDateString(RO, { day: 'numeric', month: 'short' }) +
    ', ' +
    date.toLocaleTimeString(RO, { hour: '2-digit', minute: '2-digit' })
  );
}

/** „5 iulie 2026" — pentru pagini de detaliu. */
export function fmtDateLong(d: Date | string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  return date.toLocaleDateString(RO, { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Sumă din bani (cenți) → „1.234 €". Moneda implicit EUR. */
export function fmtMoney(cents: number, currency = '€'): string {
  return `${Math.round(cents / 100).toLocaleString(RO)} ${currency}`;
}

/** Delta procentuală cu semn: 12 → „+12%", -3 → „−3%". */
export function fmtDelta(pct: number): string {
  const sign = pct > 0 ? '+' : pct < 0 ? '−' : '';
  return `${sign}${Math.abs(pct)}%`;
}
