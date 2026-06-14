import { useEffect, useState } from 'react';
import { authClient } from '../../lib/auth-client';

export default function ResetPasswordForm() {
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get('token'));
    if (params.get('error')) setError('Linkul de resetare e invalid sau a expirat.');
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 10) {
      setError('Parola trebuie să aibă cel puțin 10 caractere.');
      return;
    }
    if (password !== confirm) {
      setError('Parolele nu coincid.');
      return;
    }
    if (!token) {
      setError('Lipsește token-ul de resetare.');
      return;
    }
    setLoading(true);
    setError(null);
    const { error: err } = await authClient.resetPassword({ newPassword: password, token });
    if (err) {
      setError('Linkul de resetare e invalid sau a expirat. Cere unul nou.');
      setLoading(false);
      return;
    }
    window.location.href = '/admin/login?reset=ok';
  }

  if (token === null) {
    // încă citim din URL la mount; dacă rămâne gol, e link invalid
    return (
      <>
        <h1 className="auth-h1">Parolă nouă</h1>
        <p className="auth-sub">Se verifică linkul…</p>
      </>
    );
  }

  if (!token) {
    return (
      <>
        <h1 className="auth-h1">Parolă nouă</h1>
        <p className="auth-sub">Link invalid. Cere un link nou de resetare.</p>
        <div className="auth-foot">
          <a href="/admin/recuperare-parola">Cere un link de resetare</a>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="auth-h1">Parolă nouă</h1>
      <p className="auth-sub">Alege o parolă de cel puțin 10 caractere.</p>
      {error && <div className="auth-banner auth-banner--error">{error}</div>}
      <form onSubmit={onSubmit}>
        <label className="auth-field">
          <span>Parolă nouă</span>
          <input
            className="auth-input"
            type="password"
            required
            minLength={10}
            autoComplete="new-password"
            placeholder="cel puțin 10 caractere"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
          />
        </label>
        <label className="auth-field">
          <span>Confirmă parola</span>
          <input
            className="auth-input"
            type="password"
            required
            minLength={10}
            autoComplete="new-password"
            placeholder="repetă parola"
            value={confirm}
            onChange={(e) => setConfirm(e.currentTarget.value)}
          />
        </label>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Se salvează…' : 'Salvează parola'}
        </button>
      </form>
      <div className="auth-foot">
        <a href="/admin/login">← Înapoi la autentificare</a>
      </div>
    </>
  );
}
