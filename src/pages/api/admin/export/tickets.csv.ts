import type { APIRoute } from 'astro';
import { and, desc, eq, ilike, or, type SQL } from 'drizzle-orm';
import { getDb } from '@lib/server/db';
import { tickets, ticketStatus } from '@lib/server/schema';
import { csvResponse, toCsv } from '@lib/server/csv';
import { ticketCategories, ticketCategoryLabel } from '@lib/ticket-schema';

export const prerender = false;

/** Export CSV al tichetelor; respectă filtrele listei (?q=, ?status=, ?category=). */
export const GET: APIRoute = async ({ url }) => {
  const db = getDb();
  if (!db) return new Response('Fără bază de date.', { status: 503 });

  const q = url.searchParams.get('q')?.trim() ?? '';
  const filter = url.searchParams.get('status') ?? '';
  const catFilter = url.searchParams.get('category') ?? '';
  const STATUSES = ticketStatus.enumValues;

  const conditions: SQL[] = [];
  if (filter && STATUSES.includes(filter as (typeof STATUSES)[number])) {
    conditions.push(eq(tickets.status, filter as (typeof STATUSES)[number]));
  }
  if (catFilter && ticketCategories.some((c) => c.value === catFilter)) {
    conditions.push(eq(tickets.category, catFilter));
  }
  if (q) {
    const like = `%${q}%`;
    conditions.push(
      or(
        ilike(tickets.name, like),
        ilike(tickets.email, like),
        ilike(tickets.message, like),
        ilike(tickets.siteUrl, like),
      )!,
    );
  }

  const rows = await db
    .select()
    .from(tickets)
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(tickets.createdAt))
    .limit(10_000);

  const csv = toCsv(rows, [
    { header: 'Data', value: (r) => r.createdAt.toISOString() },
    { header: 'Nume', value: (r) => r.name },
    { header: 'Email', value: (r) => r.email },
    { header: 'Telefon', value: (r) => r.phone },
    { header: 'Firmă', value: (r) => r.company },
    { header: 'Categorie', value: (r) => ticketCategoryLabel(r.category) },
    { header: 'Prioritate', value: (r) => r.priority },
    { header: 'Site', value: (r) => r.siteUrl },
    { header: 'Status', value: (r) => r.status },
    { header: 'Lucrare', value: (r) => r.packageSlug },
    { header: 'Mesaj', value: (r) => r.message },
    { header: 'Notițe', value: (r) => r.notes },
  ]);

  return csvResponse(csv, `tickets-${new Date().toISOString().slice(0, 10)}.csv`);
};
