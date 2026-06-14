import { and, asc, eq, ne, sql } from 'drizzle-orm';
import { getDb } from './db';
import { adminUsers } from './schema';

/**
 * Acces la conturile de admin (tabelul `admin_users`). Toate funcțiile sunt
 * tolerante la lipsa DB-ului (`getDb() === null`) și nu aruncă: întorc valori
 * neutre, ca site-ul să poată cădea pe credențialele din env (bootstrap).
 */

export type AdminUser = typeof adminUsers.$inferSelect;

const norm = (email: string) => email.trim().toLowerCase();

/** Numărul total de admini (folosit pt. protecția anti-lockout & bootstrap). */
export async function countAdmins(): Promise<number> {
  const db = getDb();
  if (!db) return 0;
  try {
    const rows = await db.select({ n: sql<number>`count(*)::int` }).from(adminUsers);
    return rows[0]?.n ?? 0;
  } catch (err) {
    console.warn('[admin-users] countAdmins a eșuat:', err);
    return 0;
  }
}

export async function findAdminByEmail(email: string): Promise<AdminUser | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, norm(email)))
      .limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.warn('[admin-users] findAdminByEmail a eșuat:', err);
    return null;
  }
}

export async function findAdminById(id: string): Promise<AdminUser | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db.select().from(adminUsers).where(eq(adminUsers.id, id)).limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.warn('[admin-users] findAdminById a eșuat:', err);
    return null;
  }
}

export async function findAdminByGoogleSub(sub: string): Promise<AdminUser | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db.select().from(adminUsers).where(eq(adminUsers.googleSub, sub)).limit(1);
    return rows[0] ?? null;
  } catch (err) {
    console.warn('[admin-users] findAdminByGoogleSub a eșuat:', err);
    return null;
  }
}

export async function listAdmins(): Promise<AdminUser[]> {
  const db = getDb();
  if (!db) return [];
  try {
    return await db.select().from(adminUsers).orderBy(asc(adminUsers.createdAt));
  } catch (err) {
    console.warn('[admin-users] listAdmins a eșuat:', err);
    return [];
  }
}

export async function createAdmin(input: {
  email: string;
  name?: string;
  passwordHash?: string | null;
  googleSub?: string | null;
}): Promise<AdminUser | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const rows = await db
      .insert(adminUsers)
      .values({
        email: norm(input.email),
        name: input.name?.trim() ?? '',
        passwordHash: input.passwordHash ?? null,
        googleSub: input.googleSub ?? null,
      })
      .returning();
    return rows[0] ?? null;
  } catch (err) {
    console.warn('[admin-users] createAdmin a eșuat:', err);
    return null;
  }
}

export async function setAdminPassword(id: string, passwordHash: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db
      .update(adminUsers)
      .set({ passwordHash, updatedAt: new Date() })
      .where(eq(adminUsers.id, id));
    return true;
  } catch (err) {
    console.warn('[admin-users] setAdminPassword a eșuat:', err);
    return false;
  }
}

export async function setAdminStatus(id: string, status: 'active' | 'disabled'): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db.update(adminUsers).set({ status, updatedAt: new Date() }).where(eq(adminUsers.id, id));
    return true;
  } catch (err) {
    console.warn('[admin-users] setAdminStatus a eșuat:', err);
    return false;
  }
}

export async function touchLastLogin(id: string): Promise<void> {
  const db = getDb();
  if (!db) return;
  try {
    await db.update(adminUsers).set({ lastLoginAt: new Date() }).where(eq(adminUsers.id, id));
  } catch (err) {
    console.warn('[admin-users] touchLastLogin a eșuat:', err);
  }
}

export async function deleteAdmin(id: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db.delete(adminUsers).where(eq(adminUsers.id, id));
    return true;
  } catch (err) {
    console.warn('[admin-users] deleteAdmin a eșuat:', err);
    return false;
  }
}

/** Numărul de admini activi, exceptând opțional un id (pt. anti-lockout). */
export async function countActiveAdmins(exceptId?: string): Promise<number> {
  const db = getDb();
  if (!db) return 0;
  try {
    const where = exceptId
      ? and(eq(adminUsers.status, 'active'), ne(adminUsers.id, exceptId))
      : eq(adminUsers.status, 'active');
    const rows = await db
      .select({ n: sql<number>`count(*)::int` })
      .from(adminUsers)
      .where(where);
    return rows[0]?.n ?? 0;
  } catch (err) {
    console.warn('[admin-users] countActiveAdmins a eșuat:', err);
    return 0;
  }
}

/**
 * Provisionează/actualizează un admin la login cu Google. Dacă există după
 * `googleSub` → întoarce contul; dacă există după email → leagă `googleSub`;
 * altfel creează un cont nou doar-Google (parolă NULL). Întoarce contul activ
 * sau null (dacă e dezactivat / DB indisponibil).
 */
export async function upsertGoogleAdmin(input: {
  email: string;
  googleSub: string;
  name?: string;
}): Promise<AdminUser | null> {
  const db = getDb();
  if (!db) return null;
  const email = norm(input.email);

  const bySub = await findAdminByGoogleSub(input.googleSub);
  if (bySub) return bySub.status === 'active' ? bySub : null;

  const byEmail = await findAdminByEmail(email);
  if (byEmail) {
    if (byEmail.status !== 'active') return null;
    try {
      const rows = await db
        .update(adminUsers)
        .set({
          googleSub: input.googleSub,
          name: byEmail.name || input.name?.trim() || '',
          updatedAt: new Date(),
        })
        .where(eq(adminUsers.id, byEmail.id))
        .returning();
      return rows[0] ?? byEmail;
    } catch (err) {
      console.warn('[admin-users] upsertGoogleAdmin (link) a eșuat:', err);
      return byEmail;
    }
  }

  return createAdmin({
    email,
    name: input.name,
    passwordHash: null,
    googleSub: input.googleSub,
  });
}
