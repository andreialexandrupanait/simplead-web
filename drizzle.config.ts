import { defineConfig } from 'drizzle-kit';

// `drizzle-kit generate` nu se conectează la baza de date, deci URL-ul
// placeholder permite generarea migrațiilor și fără DATABASE_URL setat.
export default defineConfig({
  schema: './src/lib/server/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL ?? 'postgres://simplead:simplead@localhost:5432/simplead',
  },
});
