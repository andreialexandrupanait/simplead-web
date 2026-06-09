import type { APIRoute } from 'astro';
import { sql } from 'drizzle-orm';
import { getDb } from '../../lib/server/db';

export const prerender = false;

/** Healthcheck pentru uptime monitoring și Docker. DB-ul e raportat, nu blocant. */
export const GET: APIRoute = async () => {
  let database: 'ok' | 'down' | 'unconfigured' = 'unconfigured';
  const db = getDb();
  if (db) {
    try {
      await db.execute(sql`select 1`);
      database = 'ok';
    } catch {
      database = 'down';
    }
  }
  return new Response(JSON.stringify({ ok: true, database }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
};
