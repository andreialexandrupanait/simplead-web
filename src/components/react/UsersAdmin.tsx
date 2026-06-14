import { useEffect, useState } from 'react';
import { ROLE_LIST, ROLE_LABELS, type AppRole } from '../../lib/permissions';

type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  banned: boolean | null;
  createdAt: string;
};

type Toast = { kind: 'ok' | 'error'; msg: string } | null;

async function api(action: string, payload: Record<string, unknown>) {
  const res = await fetch('/api/admin/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, ...payload }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Acțiunea a eșuat.');
  return data;
}

export default function UsersAdmin({ currentUserId }: { currentUserId: string }) {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [toast, setToast] = useState<Toast>(null);
  const [showCreate, setShowCreate] = useState(false);

  // formular creare
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<AppRole>('editor');
  const [createdPassword, setCreatedPassword] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/users?q=${encodeURIComponent(q)}`);
      const data = await res.json();
      setUsers(data.users ?? []);
    } catch {
      setToast({ kind: 'error', msg: 'Nu am putut încărca lista.' });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function notify(kind: 'ok' | 'error', msg: string) {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 4000);
  }

  async function onCreate(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await api('create', { email: email.trim(), name: name.trim(), role });
      setCreatedPassword(res.password ?? null);
      setEmail('');
      setName('');
      notify('ok', 'User creat.');
      await load();
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare.');
    }
  }

  async function changeRole(u: AdminUser, newRole: string) {
    try {
      await api('set-role', { userId: u.id, role: newRole });
      notify('ok', `Rol schimbat pentru ${u.email}.`);
      await load();
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare.');
    }
  }

  async function toggleBan(u: AdminUser) {
    try {
      await api(u.banned ? 'unban' : 'ban', { userId: u.id });
      notify('ok', u.banned ? 'User reactivat.' : 'User suspendat.');
      await load();
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare.');
    }
  }

  async function remove(u: AdminUser) {
    if (!confirm(`Sigur ștergi userul ${u.email}? Acțiunea e ireversibilă.`)) return;
    try {
      await api('remove', { userId: u.id });
      notify('ok', 'User șters.');
      await load();
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare.');
    }
  }

  async function impersonate(u: AdminUser) {
    if (!confirm(`Te loghezi ca ${u.email}?`)) return;
    try {
      await api('impersonate', { userId: u.id });
      window.location.href = '/admin';
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare.');
    }
  }

  const dateFmt = new Intl.DateTimeFormat('ro-RO', { dateStyle: 'medium' });

  return (
    <div>
      {toast && (
        <div className={`admin-banner admin-banner--${toast.kind === 'ok' ? 'ok' : 'error'}`}>
          {toast.msg}
        </div>
      )}

      <div className="admin-card" style={{ marginBottom: '20px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '12px',
            flexWrap: 'wrap',
          }}
        >
          <input
            className="admin-input"
            style={{ maxWidth: '280px' }}
            placeholder="Caută după email…"
            value={q}
            onChange={(e) => setQ(e.currentTarget.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void load();
            }}
          />
          <button className="admin-btn" type="button" onClick={() => setShowCreate((v) => !v)}>
            {showCreate ? 'Anulează' : 'Adaugă user'}
          </button>
        </div>

        {showCreate && (
          <form
            onSubmit={onCreate}
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              alignItems: 'flex-end',
              marginTop: '16px',
            }}
          >
            <label className="admin-field" style={{ flex: 1, minWidth: '200px' }}>
              <span>Email</span>
              <input
                className="admin-input"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
              />
            </label>
            <label className="admin-field" style={{ flex: 1, minWidth: '160px' }}>
              <span>Nume</span>
              <input
                className="admin-input"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </label>
            <label className="admin-field" style={{ minWidth: '150px' }}>
              <span>Rol</span>
              <select
                className="admin-select"
                value={role}
                onChange={(e) => setRole(e.currentTarget.value as AppRole)}
              >
                {ROLE_LIST.map((r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                ))}
              </select>
            </label>
            <button className="admin-btn" type="submit">
              Creează
            </button>
          </form>
        )}

        {createdPassword && (
          <div className="admin-banner admin-banner--ok" style={{ marginTop: '12px' }}>
            User creat. Parolă temporară (o vezi o singură dată): <code>{createdPassword}</code> —
            transmite-o userului, apoi și-o schimbă din cont.
          </div>
        )}
      </div>

      <div className="admin-card admin-card--flush">
        {loading ? (
          <p style={{ padding: '20px', color: 'var(--muted)' }}>Se încarcă…</p>
        ) : users.length === 0 ? (
          <p style={{ padding: '20px', color: 'var(--muted)' }}>Niciun user.</p>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Cont</th>
                  <th>Rol</th>
                  <th>Status</th>
                  <th>Creat</th>
                  <th style={{ textAlign: 'right' }}>Acțiuni</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <strong>{u.name || u.email}</strong>
                      {u.name && (
                        <>
                          <br />
                          <span style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>
                            {u.email}
                          </span>
                        </>
                      )}
                      {u.id === currentUserId && (
                        <span style={{ color: 'var(--electric)', fontSize: '0.78rem' }}> (tu)</span>
                      )}
                    </td>
                    <td>
                      <select
                        className="admin-select"
                        value={u.role ?? ''}
                        disabled={u.id === currentUserId}
                        onChange={(e) => void changeRole(u, e.currentTarget.value)}
                      >
                        {ROLE_LIST.map((r) => (
                          <option key={r} value={r}>
                            {ROLE_LABELS[r]}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: 600,
                          color: u.banned ? 'var(--muted)' : 'var(--electric)',
                        }}
                      >
                        {u.banned ? 'Suspendat' : 'Activ'}
                      </span>
                    </td>
                    <td
                      style={{ whiteSpace: 'nowrap', fontSize: '0.88rem', color: 'var(--muted)' }}
                    >
                      {u.createdAt ? dateFmt.format(new Date(u.createdAt)) : '–'}
                    </td>
                    <td>
                      <div
                        style={{
                          display: 'flex',
                          gap: '6px',
                          justifyContent: 'flex-end',
                          flexWrap: 'wrap',
                        }}
                      >
                        {u.id !== currentUserId && (
                          <>
                            <button
                              className="admin-btn admin-btn--ghost admin-btn--sm"
                              type="button"
                              onClick={() => void impersonate(u)}
                            >
                              Loghează ca
                            </button>
                            <button
                              className="admin-btn admin-btn--ghost admin-btn--sm"
                              type="button"
                              onClick={() => void toggleBan(u)}
                            >
                              {u.banned ? 'Reactivează' : 'Suspendă'}
                            </button>
                            <button
                              className="admin-btn admin-btn--ghost admin-btn--sm"
                              type="button"
                              style={{ color: '#b91c1c' }}
                              onClick={() => void remove(u)}
                            >
                              Șterge
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
