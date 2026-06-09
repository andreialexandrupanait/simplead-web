import { drizzle, type PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { serverEnv } from './env';
import * as schema from './schema';

export type Db = PostgresJsDatabase<typeof schema>;

let _db: Db | null | undefined;

/**
 * Conexiune lazy la Postgres. Fără `DATABASE_URL` întoarce `null` și site-ul
 * rulează în continuare (fallback-uri peste tot). postgres.js nu deschide
 * conexiunea până la prima interogare, deci build-ul nu atinge rețeaua.
 */
export function getDb(): Db | null {
  if (_db !== undefined) return _db;
  const url = serverEnv('DATABASE_URL');
  if (!url) {
    console.info('[db] DATABASE_URL lipsește: rulăm fără bază de date.');
    _db = null;
    return _db;
  }
  const client = postgres(url, { max: 5, connect_timeout: 5 });
  _db = drizzle(client, { schema });
  return _db;
}
