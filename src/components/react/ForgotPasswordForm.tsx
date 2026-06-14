import { useState } from 'react';
import { authClient } from '../../lib/auth-client';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    // Răspuns identic indiferent dacă emailul există (anti-enumerare):
    // arătăm „verifică emailul" și pe eroare nedezvăluitoare.
    const { error: err } = await authClient.requestPasswordReset({
      email: email.trim(),
      redirectTo: '/admin/reset-parola',
    });
    if (err && err.status === 429) {
      setError('Prea multe cereri. Încearcă mai târziu.');
      setLoading(false);
      return;
    }
    setSent(true);
    setLoading(false);
  }

  if (sent) {
    return (
      <>
        <h1 className="auth-h1">Verifică-ți emailul</h1>
        <p className="auth-sub">
          Dacă există un cont cu adresa introdusă, ți-am trimis un link de resetare. Linkul expiră
          în scurt timp.
        </p>
        <div className="auth-foot">
          <a href="/admin/login">← Înapoi la autentificare</a>
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="auth-h1">Recuperare parolă</h1>
      <p className="auth-sub">
        Introdu adresa de email a contului și îți trimitem un link de resetare.
      </p>
      {error && <div className="auth-banner auth-banner--error">{error}</div>}
      <form onSubmit={onSubmit}>
        <label className="auth-field">
          <span>Email</span>
          <input
            className="auth-input"
            type="email"
            required
            autoComplete="username"
            placeholder="tu@simplead.ro"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </label>
        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? 'Se trimite…' : 'Trimite linkul de resetare'}
        </button>
      </form>
      <div className="auth-foot">
        <a href="/admin/login">← Înapoi la autentificare</a>
      </div>
    </>
  );
}
