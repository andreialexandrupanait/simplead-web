import { describe, expect, it } from 'vitest';
import { toCsv, type CsvColumn } from '@lib/server/csv';

interface Row {
  name: string;
  total: number | null;
}

const columns: CsvColumn<Row>[] = [
  { header: 'Nume', value: (r) => r.name },
  { header: 'Total', value: (r) => r.total },
];

describe('toCsv', () => {
  it('prefixează BOM-ul UTF-8 și încheie liniile cu CRLF', () => {
    const csv = toCsv([{ name: 'Ana', total: 10 }], columns);
    expect(csv.startsWith('﻿')).toBe(true);
    expect(csv).toBe('﻿Nume,Total\r\nAna,10\r\n');
  });

  it('citează celulele care conțin virgulă, ghilimele sau newline (RFC 4180)', () => {
    const csv = toCsv([{ name: 'Ana, "AI"\nGalați', total: null }], columns);
    expect(csv).toContain('"Ana, ""AI""\nGalați"');
    // Valoarea null devine celulă goală.
    expect(csv.trimEnd().endsWith(',')).toBe(true);
  });

  it('neutralizează formula injection (=,+,-,@) cu apostrof în frunte', () => {
    const csv = toCsv([{ name: '=SUM(A1:A2)', total: 0 }], columns);
    expect(csv).toContain("'=SUM(A1:A2)");
  });
});
