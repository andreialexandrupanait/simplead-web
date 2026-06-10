import type { APIRoute } from 'astro';
import { and, desc, eq, gte, ilike, lte, or, type SQL } from 'drizzle-orm';
import { getDb } from '@lib/server/db';
import { orders, orderStatus, packages } from '@lib/server/schema';
import { csvResponse, toCsv } from '@lib/server/csv';

export const prerender = false;

/** Export CSV al comenzilor; respectă filtrele listei (?q=, ?status=, ?from=, ?to=). */
export const GET: APIRoute = async ({ url }) => {
  const db = getDb();
  if (!db) return new Response('Fără bază de date.', { status: 503 });

  const q = url.searchParams.get('q')?.trim() ?? '';
  const filter = url.searchParams.get('status') ?? '';
  const from = url.searchParams.get('from') ?? '';
  const to = url.searchParams.get('to') ?? '';
  const STATUSES = orderStatus.enumValues;

  const conditions: SQL[] = [];
  if (filter && STATUSES.includes(filter as (typeof STATUSES)[number])) {
    conditions.push(eq(orders.status, filter as (typeof STATUSES)[number]));
  }
  if (q) {
    const like = `%${q}%`;
    conditions.push(
      or(ilike(orders.customerEmail, like), ilike(orders.stripeCheckoutSessionId, like))!,
    );
  }
  if (from && !Number.isNaN(Date.parse(from))) conditions.push(gte(orders.createdAt, new Date(from)));
  if (to && !Number.isNaN(Date.parse(to)))
    conditions.push(lte(orders.createdAt, new Date(`${to}T23:59:59`)));

  const rows = await db
    .select({ order: orders, packageName: packages.name })
    .from(orders)
    .leftJoin(packages, eq(orders.packageId, packages.id))
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(desc(orders.createdAt))
    .limit(10_000);

  const csv = toCsv(rows, [
    { header: 'Data', value: (r) => r.order.createdAt.toISOString() },
    { header: 'Client', value: (r) => r.order.customerEmail },
    { header: 'Pachet', value: (r) => r.packageName },
    { header: 'Sumă', value: (r) => (r.order.amountCents / 100).toFixed(2) },
    { header: 'Monedă', value: (r) => r.order.currency },
    { header: 'Status', value: (r) => r.order.status },
    { header: 'OTO', value: (r) => (r.order.otoForOrderId ? 'da' : '') },
    {
      header: 'Factură',
      value: (r) =>
        r.order.invoiceNumber ? `${r.order.invoiceSeries ?? ''} ${r.order.invoiceNumber}` : '',
    },
    { header: 'ID comandă', value: (r) => r.order.id },
  ]);

  return csvResponse(csv, `comenzi-${new Date().toISOString().slice(0, 10)}.csv`);
};
