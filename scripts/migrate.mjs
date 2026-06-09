// Rulează migrațiile Drizzle din ./drizzle. Fără DATABASE_URL iese curat (0),
// ca site-ul să poată porni și fără bază de date (containerul îl rulează
// înainte de entry.mjs).
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.info('[migrate] DATABASE_URL lipsește: sărim migrațiile.');
  process.exit(0);
}

const client = postgres(url, { max: 1 });
try {
  await migrate(drizzle(client), { migrationsFolder: './drizzle' });
  console.info('[migrate] Migrațiile au rulat cu succes.');
} catch (err) {
  console.error('[migrate] Migrațiile au eșuat:', err);
  process.exit(1);
} finally {
  await client.end();
}
