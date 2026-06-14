import { createAccessControl } from 'better-auth/plugins/access';
import { defaultStatements, adminAc } from 'better-auth/plugins/admin/access';

/**
 * Access control „ca-n WordPress": capabilities granulare grupate pe resurse,
 * iar rolurile sunt COMPOZIȚII de capabilities (nu nume hardcodate). Un rol nou
 * (ex. `accountant`) = o intrare aici, fără să atingem guard-urile.
 *
 * Modul e izomorf (fără importuri server-only): îl folosesc și `src/lib/auth.ts`
 * (server, plugin admin) și `src/lib/auth-client.ts` (islands React).
 *
 * `defaultStatements` aduce resursele plugin-ului admin: `user`
 * (create/list/set-role/ban/impersonate/delete/set-password) și `session`
 * (list/revoke/delete). Le extindem cu resursele noastre de aplicație.
 */
export const statement = {
  ...defaultStatements,
  content: ['publish', 'edit-any', 'edit-own', 'delete'],
  settings: ['manage'],
  clientArea: ['view'],
  audit: ['view'],
} as const;

export const ac = createAccessControl(statement);

/** Permisiune cerută unui guard: subset din `statement`. */
export type Permission = {
  [K in keyof typeof statement]?: (typeof statement)[K][number][];
};

export const roles = {
  // Administrator: tot (inclusiv user/session din plugin admin).
  admin: ac.newRole({
    ...adminAc.statements,
    content: ['publish', 'edit-any', 'edit-own', 'delete'],
    settings: ['manage'],
    clientArea: ['view'],
    audit: ['view'],
  }),
  // Editor: tot conținutul + media, FĂRĂ useri/setări.
  editor: ac.newRole({
    content: ['publish', 'edit-any', 'edit-own', 'delete'],
  }),
  // Author: doar propriul conținut, fără publicare la alții, fără useri.
  author: ac.newRole({
    content: ['edit-own'],
  }),
  // Client: doar zona lui de cont/proiect.
  client: ac.newRole({
    clientArea: ['view'],
  }),
};

export type AppRole = keyof typeof roles;
export const ROLE_LIST = ['admin', 'editor', 'author', 'client'] as const;

export const ROLE_LABELS: Record<AppRole, string> = {
  admin: 'Administrator',
  editor: 'Editor',
  author: 'Autor',
  client: 'Client',
};

/**
 * Sursa adevărului pentru guard-uri: dă `true` dacă rolul are TOATE capabilities
 * cerute. Sincron, fără rețea — pe baza compoziției de roluri de mai sus.
 */
export function roleAllows(role: string | null | undefined, permissions: Permission): boolean {
  if (!role) return false;
  const r = roles[role as AppRole];
  if (!r) return false;
  return r.authorize(permissions).success;
}
