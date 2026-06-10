/**
 * Serializator CSV pentru exporturile din admin, gândit pentru Excel pe
 * Windows (publicul-țintă: Andrei): BOM UTF-8 ca diacriticele să se vadă,
 * CRLF + quoting RFC 4180, și gardă anti formula-injection (o celulă care
 * începe cu = + - @ ar fi executată de Excel ca formulă).
 */

export type CsvColumn<T> = { header: string; value: (row: T) => string | number | null };

function cell(v: string | number | null): string {
  if (v === null || v === undefined) return '';
  let s = String(v);
  if (/^[=+\-@]/.test(s)) s = `'${s}`;
  if (/[",\r\n]/.test(s)) s = `"${s.replace(/"/g, '""')}"`;
  return s;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const lines = [
    columns.map((c) => cell(c.header)).join(','),
    ...rows.map((row) => columns.map((c) => cell(c.value(row))).join(',')),
  ];
  return `\uFEFF${lines.join('\r\n')}\r\n`;
}

export function csvResponse(csv: string, filename: string): Response {
  return new Response(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Cache-Control': 'no-store',
    },
  });
}
