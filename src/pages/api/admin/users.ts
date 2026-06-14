import type { APIRoute } from 'astro';
import { randomBytes } from 'node:crypto';
import { getAuth } from '../../../lib/auth';
import { can, getCurrentUser } from '../../../lib/server/authz';
import { logAudit } from '../../../lib/server/audit';
import type { AppRole, Permission } from '../../../lib/permissions';

export const prerender = false;

function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

const FORBIDDEN = json({ error: 'Nu ai permisiunea pentru această acțiune.' }, 403);

/** Listă useri (paginat + căutare după email). Necesită capability user:list. */
export const GET: APIRoute = async ({ request, url }) => {
  if (!(await can(request.headers, { user: ['list'] }))) return FORBIDDEN;

  const q = url.searchParams.get('q')?.trim() ?? '';
  const limit = Math.min(100, Number(url.searchParams.get('limit')) || 50);
  const offset = Math.max(0, Number(url.searchParams.get('offset')) || 0);

  try {
    const res = await getAuth().api.listUsers({
      headers: request.headers,
      query: {
        limit,
        offset,
        sortBy: 'createdAt',
        sortDirection: 'desc',
        ...(q ? { searchField: 'email', searchOperator: 'contains', searchValue: q } : {}),
      },
    });
    return json(res);
  } catch (err) {
    console.error('[admin/users] listUsers a eșuat:', err);
    return json({ error: 'Listarea a eșuat.' }, 500);
  }
};

type Body = {
  action?: string;
  userId?: string;
  email?: string;
  name?: string;
  role?: string;
  banReason?: string;
};

/** Acțiuni admin pe useri, fiecare cu guard pe capability + intrare în audit log. */
export const POST: APIRoute = async ({ request }) => {
  const actor = await getCurrentUser(request.headers);
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return json({ error: 'Cerere invalidă.' }, 400);
  }

  const auth = getAuth();
  const base = { actorId: actor?.id ?? null, actorEmail: actor?.email ?? null };
  const need = (p: Permission) => can(request.headers, p);

  try {
    switch (body.action) {
      case 'create': {
        if (!(await need({ user: ['create'] }))) return FORBIDDEN;
        if (!body.email || !body.role) return json({ error: 'Email și rol obligatorii.' }, 400);
        const password = randomBytes(12).toString('base64url');
        await auth.api.createUser({
          headers: request.headers,
          body: { email: body.email, name: body.name ?? '', password, role: body.role as AppRole },
        });
        // Invitație: trimitem un link de setare a parolei (userul își alege parola).
        let invited = false;
        try {
          await auth.api.requestPasswordReset({
            body: { email: body.email, redirectTo: '/admin/reset-parola' },
          });
          invited = true;
        } catch (err) {
          console.warn('[admin/users] invitația prin email a eșuat:', err);
        }
        await logAudit({
          ...base,
          action: 'user.create',
          targetEmail: body.email,
          meta: { role: body.role, invited },
        });
        // Întoarcem și parola temporară (fallback dacă emailul nu pleacă).
        return json({ ok: true, invited, password });
      }

      case 'set-role': {
        if (!(await need({ user: ['set-role'] }))) return FORBIDDEN;
        if (!body.userId || !body.role) return json({ error: 'userId și rol obligatorii.' }, 400);
        await auth.api.setRole({
          headers: request.headers,
          body: { userId: body.userId, role: body.role as AppRole },
        });
        await logAudit({
          ...base,
          action: 'user.set-role',
          targetId: body.userId,
          meta: { role: body.role },
        });
        return json({ ok: true });
      }

      case 'ban': {
        if (!(await need({ user: ['ban'] }))) return FORBIDDEN;
        if (!body.userId) return json({ error: 'userId obligatoriu.' }, 400);
        await auth.api.banUser({
          headers: request.headers,
          body: { userId: body.userId, banReason: body.banReason },
        });
        await logAudit({ ...base, action: 'user.ban', targetId: body.userId });
        return json({ ok: true });
      }

      case 'unban': {
        if (!(await need({ user: ['ban'] }))) return FORBIDDEN;
        if (!body.userId) return json({ error: 'userId obligatoriu.' }, 400);
        await auth.api.unbanUser({ headers: request.headers, body: { userId: body.userId } });
        await logAudit({ ...base, action: 'user.unban', targetId: body.userId });
        return json({ ok: true });
      }

      case 'remove': {
        if (!(await need({ user: ['delete'] }))) return FORBIDDEN;
        if (!body.userId) return json({ error: 'userId obligatoriu.' }, 400);
        await auth.api.removeUser({ headers: request.headers, body: { userId: body.userId } });
        await logAudit({ ...base, action: 'user.remove', targetId: body.userId });
        return json({ ok: true });
      }

      case 'impersonate': {
        if (!(await need({ user: ['impersonate'] }))) return FORBIDDEN;
        if (!body.userId) return json({ error: 'userId obligatoriu.' }, 400);
        await logAudit({ ...base, action: 'user.impersonate', targetId: body.userId });
        // Întoarce răspunsul Better Auth (Set-Cookie cu sesiunea de impersonare).
        return auth.api.impersonateUser({
          headers: request.headers,
          body: { userId: body.userId },
          asResponse: true,
        });
      }

      default:
        return json({ error: 'Acțiune necunoscută.' }, 400);
    }
  } catch (err) {
    console.error(`[admin/users] acțiunea ${body.action} a eșuat:`, err);
    return json({ error: 'Acțiunea a eșuat.' }, 500);
  }
};
