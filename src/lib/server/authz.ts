import { getAuth } from '../auth';
import { roleAllows, type AppRole, type Permission } from '../permissions';

/**
 * Helper-e de autorizare server-side. Sursa adevărului = capabilities (via
 * `roleAllows`), nu numele rolului. Folosite de rute admin/API.
 */

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role?: string | null;
  banned?: boolean | null;
};

/** Sesiunea curentă (sau null) din cookie-urile cererii. */
export async function getAuthSession(headers: Headers) {
  return getAuth().api.getSession({ headers });
}

/** Userul curent (sau null). */
export async function getCurrentUser(headers: Headers): Promise<SessionUser | null> {
  const session = await getAuth().api.getSession({ headers });
  return (session?.user as SessionUser | undefined) ?? null;
}

/** True dacă userul curent are TOATE capabilities cerute. */
export async function can(headers: Headers, permissions: Permission): Promise<boolean> {
  const user = await getCurrentUser(headers);
  if (!user || user.banned) return false;
  return roleAllows(user.role, permissions);
}

/** Variantă sincronă când ai deja userul (ex. din middleware/locals). */
export function userCan(user: SessionUser | null, permissions: Permission): boolean {
  if (!user || user.banned) return false;
  return roleAllows(user.role, permissions);
}

export function isRole(user: SessionUser | null, role: AppRole): boolean {
  return user?.role === role;
}

/** Rolurile cu acces în zona /admin (staff). `client` are zona lui separată. */
export const STAFF_ROLES: AppRole[] = ['admin', 'editor', 'author'];

/** Poate accesa zona /admin (staff activ, neblocat). */
export function isStaffUser(user: SessionUser | null): boolean {
  if (!user || user.banned) return false;
  return STAFF_ROLES.includes(user.role as AppRole);
}
