import type { APIRoute } from 'astro';
import { and, desc, eq, ilike, or, type SQL } from 'drizzle-orm';
import { getDb } from '@lib/server/db';
import { leads, leadStatus } from '@lib/server/schema';
import { csvResponse, toCsv } from '@lib/server/csv';

export const prerender = false;

/** Export CSV al lead-urilor; respectă aceleași filtre ca lista (?q=, ?status=). */
export const GET: APIRoute = async ({ url }) => {
  const db = getDb();
  if (!db) return new Response('Fără bază de date.', { status: 503 });

  const q = url.searchParams.get('q')?.trim() ?? '';
  const filter = url.searchParams.get('status') ?? '';
  const STATUSES = leadStatus.enumValues;

  const conditions: SQL[] = [];
  if (filter && STATUSES.includes(filter as (typeof STATUSES)[number])) {
    conditions.push(eq(leads.status, filter as (typeof STATUSES)[number]));
  }
  if (q) {
    const like = `%${q}%`;
    conditions.push(
      or(ilike(leads.name, like), ilike(leads.email, like), ilike(leads.message, like))!,
    );
  }

  const rows = await db
    .select()
    .from(leads)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(leads.createdAt))
    .limit(10_000);

  const csv = toCsv(rows, [
    { header: 'Data', value: (r) => r.createdAt.toISOString() },
    { header: 'Nume', value: (r) => r.name },
    { header: 'Email', value: (r) => r.email },
    { header: 'Telefon', value: (r) => r.phone },
    { header: 'Serviciu', value: (r) => r.service },
    { header: 'Status', value: (r) => r.status },
    { header: 'Sursă', value: (r) => r.source },
    { header: 'Mesaj', value: (r) => r.message },
    { header: 'Notițe', value: (r) => r.notes },
  ]);

  return csvResponse(csv, `leads-${new Date().toISOString().slice(0, 10)}.csv`);
};
