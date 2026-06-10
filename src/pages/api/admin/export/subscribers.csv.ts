import type { APIRoute } from 'astro';
import { desc, ilike, type SQL } from 'drizzle-orm';
import { getDb } from '@lib/server/db';
import { subscribers } from '@lib/server/schema';
import { csvResponse, toCsv } from '@lib/server/csv';

export const prerender = false;

/** Export CSV al abonaților la newsletter (?q= filtrează după email). */
export const GET: APIRoute = async ({ url }) => {
  const db = getDb();
  if (!db) return new Response('Fără bază de date.', { status: 503 });

  const q = url.searchParams.get('q')?.trim() ?? '';
  let where: SQL | undefined;
  if (q) where = ilike(subscribers.email, `%${q}%`);

  const rows = await db
    .select()
    .from(subscribers)
    .where(where)
    .orderBy(desc(subscribers.createdAt))
    .limit(50_000);

  const csv = toCsv(rows, [
    { header: 'Email', value: (r) => r.email },
    { header: 'Status', value: (r) => r.status },
    { header: 'Sursă', value: (r) => r.source },
    { header: 'Abonat la', value: (r) => r.createdAt.toISOString() },
  ]);

  return csvResponse(csv, `abonati-${new Date().toISOString().slice(0, 10)}.csv`);
};
