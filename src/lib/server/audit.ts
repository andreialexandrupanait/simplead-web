import { desc } from 'drizzle-orm';
import { getDb } from './db';
import { auditLog } from './schema';

/**
 * Jurnal de audit pentru acțiunile sensibile din admin. Tolerant la lipsa DB:
 * nu aruncă niciodată (un eșec de logare nu trebuie să blocheze acțiunea).
 */
export type AuditEntry = {
  actorId?: string | null;
  actorEmail?: string | null;
  action: string;
  targetId?: string | null;
  targetEmail?: string | null;
  meta?: Record<string, unknown>;
};

export async function logAudit(entry: AuditEntry): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db.insert(auditLog).values({
      actorId: entry.actorId ?? null,
      actorEmail: entry.actorEmail ?? null,
      action: entry.action,
      targetId: entry.targetId ?? null,
      targetEmail: entry.targetEmail ?? null,
      meta: entry.meta ?? null,
    });
  } catch (err) {
    console.warn('[audit] Scrierea în jurnal a eșuat:', err);
  }
}

export async function listAudit(limit = 100): Promise<(typeof auditLog.$inferSelect)[]> {
  const db = getDb();
  if (!db) return [];
  try {
    return await db.select().from(auditLog).orderBy(desc(auditLog.createdAt)).limit(limit);
  } catch (err) {
    console.warn('[audit] Citirea jurnalului a eșuat:', err);
    return [];
  }
}
