import { useEffect, useState } from 'react';
import { authClient } from '../../lib/auth-client';

type Sess = {
  id: string;
  token: string;
  createdAt: string | Date;
  expiresAt: string | Date;
  ipAddress?: string | null;
  userAgent?: string | null;
};

type Note = { kind: 'ok' | 'error'; msg: string } | null;

export default function AccountSettings({
  name: initialName,
  email,
}: {
  name: string;
  email: string;
}) {
  const [name, setName] = useState(initialName);
  const [note, setNote] = useState<Note>(null);

  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');

  const [sessions, setSessions] = useState<Sess[]>([]);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  function notify(kind: 'ok' | 'error', msg: string) {
    setNote({ kind, msg });
    setTimeout(() => setNote(null), 4000);
  }

  async function loadSessions() {
    const [{ data: list }, { data: current }] = await Promise.all([
      authClient.listSessions(),
      authClient.getSession(),
    ]);
    setSessions((list as Sess[]) ?? []);
    setCurrentToken(current?.session?.token ?? null);
  }

  useEffect(() => {
    void loadSessions();
  }, []);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await authClient.updateUser({ name: name.trim() });
    notify(error ? 'error' : 'ok', error ? 'Salvarea a eșuat.' : 'Profil actualizat.');
  }

  async function changePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw.length < 10) return notify('error', 'Parola nouă: minim 10 caractere.');
    if (newPw !== confirmPw) return notify('error', 'Parolele nu coincid.');
    const { error } = await authClient.changePassword({
      currentPassword: currentPw,
      newPassword: newPw,
      revokeOtherSessions: true,
    });
    if (error) return notify('error', 'Parola curentă e greșită sau cererea a eșuat.');
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    notify('ok', 'Parolă schimbată. Celelalte sesiuni au fost deconectate.');
    void loadSessions();
  }

  async function revoke(token: string) {
    const { error } = await authClient.revokeSession({ token });
    if (error) return notify('error', 'Revocarea a eșuat.');
    notify('ok', 'Sesiune revocată.');
    void loadSessions();
  }

  async function revokeOthers() {
    const { error } = await authClient.revokeOtherSessions();
    notify(error ? 'error' : 'ok', error ? 'Eroare.' : 'Celelalte sesiuni au fost revocate.');
    void loadSessions();
  }

  const dateFmt = new Intl.DateTimeFormat('ro-RO', { dateStyle: 'medium', timeStyle: 'short' });

  return (
    <div
      style={{
        display: 'grid',
        gap: '20px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        alignItems: 'start',
      }}
    >
      {note && (
        <div
          className={`admin-banner admin-banner--${note.kind === 'ok' ? 'ok' : 'error'}`}
          style={{ gridColumn: '1 / -1', marginBottom: 0 }}
        >
          {note.msg}
        </div>
      )}

      <div className="admin-card">
        <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Profil</h2>
        <form onSubmit={saveProfile}>
          <label className="admin-field">
            <span>Nume</span>
            <input
              className="admin-input"
              value={name}
              onChange={(e) => setName(e.currentTarget.value)}
            />
          </label>
          <label className="admin-field">
            <span>Email</span>
            <input className="admin-input" value={email} disabled />
          </label>
          <button className="admin-btn" type="submit">
            Salvează
          </button>
        </form>
      </div>

      <div className="admin-card">
        <h2 style={{ marginTop: 0, fontSize: '1.05rem' }}>Schimbă parola</h2>
        <form onSubmit={changePassword}>
          <label className="admin-field">
            <span>Parola curentă</span>
            <input
              className="admin-input"
              type="password"
              autoComplete="current-password"
              value={currentPw}
              onChange={(e) => setCurrentPw(e.currentTarget.value)}
            />
          </label>
          <label className="admin-field">
            <span>Parolă nouă</span>
            <input
              className="admin-input"
              type="password"
              autoComplete="new-password"
              value={newPw}
              onChange={(e) => setNewPw(e.currentTarget.value)}
            />
          </label>
          <label className="admin-field">
            <span>Confirmă parola nouă</span>
            <input
              className="admin-input"
              type="password"
              autoComplete="new-password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.currentTarget.value)}
            />
          </label>
          <button className="admin-btn" type="submit">
            Schimbă parola
          </button>
        </form>
      </div>

      <div className="admin-card admin-card--flush" style={{ gridColumn: '1 / -1' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '20px 24px 8px',
          }}
        >
          <h2 style={{ margin: 0, fontSize: '1.05rem' }}>Sesiuni active</h2>
          <button
            className="admin-btn admin-btn--ghost admin-btn--sm"
            type="button"
            onClick={() => void revokeOthers()}
          >
            Deconectează celelalte
          </button>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Dispozitiv</th>
                <th>IP</th>
                <th>Creată</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => {
                const isCurrent = s.token === currentToken;
                return (
                  <tr key={s.id}>
                    <td style={{ maxWidth: '280px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                      {s.userAgent || 'necunoscut'}
                      {isCurrent && (
                        <span style={{ color: 'var(--electric)', fontWeight: 600 }}>
                          {' '}
                          · curentă
                        </span>
                      )}
                    </td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>
                      {s.ipAddress || '–'}
                    </td>
                    <td
                      style={{ whiteSpace: 'nowrap', fontSize: '0.85rem', color: 'var(--muted)' }}
                    >
                      {dateFmt.format(new Date(s.createdAt))}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      {!isCurrent && (
                        <button
                          className="admin-btn admin-btn--ghost admin-btn--sm"
                          type="button"
                          onClick={() => void revoke(s.token)}
                        >
                          Revocă
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
