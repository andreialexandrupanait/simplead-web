import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '../../lib/contact-schema';

/** Formular de contact stilizat ca în design (.cform). Folosit pe Acasă + /contact. */
export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus('sending');
    setServerError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const body = await res.json().catch(() => ({}));
      if (res.ok && body.ok) {
        setStatus('success');
        reset();
      } else {
        setStatus('error');
        setServerError(body.error ?? null);
      }
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="cf-success">
        <div
          className="svc-ic"
          style={{ margin: '0 auto 18px', width: 56, height: 56 }}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ width: 27, height: 27 }}
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <p style={{ fontSize: 16, color: 'var(--ink)' }}>
          Mulțumim! Am primit mesajul tău și revenim cât de curând.
        </p>
      </div>
    );
  }

  return (
    <form className="cform" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="cf">
        <label htmlFor="cf-name">Cum te cheamă?</label>
        <input id="cf-name" type="text" placeholder="Numele tău (sau al firmei)" {...register('name')} />
        {errors.name && <div className="cf-error">{errors.name.message}</div>}
      </div>

      <div className="cf-row">
        <div className="cf">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" type="email" placeholder="nume@exemplu.ro" {...register('email')} />
          {errors.email && <div className="cf-error">{errors.email.message}</div>}
        </div>
        <div className="cf">
          <label htmlFor="cf-phone">
            Telefon <span className="opt">(opțional)</span>
          </label>
          <input id="cf-phone" type="tel" placeholder="07xx xxx xxx" {...register('phone')} />
        </div>
      </div>

      <div className="cf">
        <label htmlFor="cf-message">La ce te gândești?</label>
        <textarea
          id="cf-message"
          placeholder="Câteva rânduri despre proiect, termenul la care te gândești și, dacă ai unul, un buget orientativ. Cu cât mai multe detalii, cu atât revenim mai la obiect."
          {...register('message')}
        />
        {errors.message && <div className="cf-error">{errors.message.message}</div>}
      </div>

      {/* Honeypot anti-spam */}
      <div style={{ position: 'absolute', left: -9999 }} aria-hidden="true">
        <label>
          Companie
          <input tabIndex={-1} autoComplete="off" {...register('company')} />
        </label>
      </div>

      <label className="cf-consent">
        <input type="checkbox" {...register('consent')} />
        Sunt de acord ca Simplead să-mi folosească datele ca să-mi răspundă la acest mesaj.
      </label>
      {errors.consent && <div className="cf-error" style={{ marginTop: -14, marginBottom: 18 }}>{errors.consent.message}</div>}

      {status === 'error' && (
        <div className="cf-error" style={{ marginBottom: 16 }}>
          {serverError ?? 'Ceva n-a mers. Încearcă din nou sau sună-ne direct.'}
        </div>
      )}

      <div className="cform-foot">
        <button type="submit" className="cf-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Se trimite...' : 'Trimite mesajul'}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <span className="note">De obicei răspundem în aceeași zi lucrătoare.</span>
      </div>
    </form>
  );
}
