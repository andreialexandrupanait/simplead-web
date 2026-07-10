import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, type ContactInput } from '../../lib/contact-schema';

interface Props {
  /** Serviciu pre-completat (ex. din drawer); altfel se citește din ?service= din URL. */
  service?: string;
  /** Apelat după trimitere reușită (ex. ca drawer-ul să se închidă). */
  onSuccess?: () => void;
  /** Fără card propriu (transparent, fără border/padding) — pentru drawer. */
  flat?: boolean;
  /** Tipul pentru pagina de mulțumire (trackable): `contact` (implicit) sau `oferta` (drawer). */
  thankYouType?: 'contact' | 'oferta';
}

/** Formular de contact stilizat ca în design (.cform). Folosit pe Acasă + /contact + drawer. */
export default function ContactForm({
  service: serviceProp,
  onSuccess,
  flat,
  thankYouType = 'contact',
}: Props = {}) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const [preselected, setPreselected] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  // Preselectare: prop (drawer) sau ?service= din URL (linkurile de pe /pachete).
  useEffect(() => {
    const service = serviceProp ?? new URLSearchParams(window.location.search).get('service') ?? '';
    if (service) {
      setValue('service', service.slice(0, 60));
      setPreselected(service.slice(0, 60));
    }
  }, [serviceProp, setValue]);

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
        onSuccess?.();
        // Redirect către pagina de mulțumire trackabilă (conversie pe pageview).
        window.location.assign(`/multumesc?type=${thankYouType}`);
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
      <div className="cf-success" role="status" aria-live="polite">
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
    <form
      className={flat ? 'cform cform--bare' : 'cform'}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      {preselected && (
        <p
          style={{
            margin: '0 0 18px',
            fontSize: 14,
            color: 'var(--muted)',
          }}
        >
          Cerere pentru: <strong style={{ color: 'var(--ink)' }}>{preselected}</strong>
        </p>
      )}
      <input type="hidden" {...register('service')} />
      <div className="cf-row">
        <div className="cf">
          <label htmlFor="cf-lastname">Nume</label>
          <input id="cf-lastname" type="text" placeholder="Popescu" {...register('lastName')} />
          {errors.lastName && <div className="cf-error">{errors.lastName.message}</div>}
        </div>
        <div className="cf">
          <label htmlFor="cf-firstname">Prenume</label>
          <input id="cf-firstname" type="text" placeholder="Ion" {...register('firstName')} />
          {errors.firstName && <div className="cf-error">{errors.firstName.message}</div>}
        </div>
      </div>

      <div className="cf-row">
        <div className="cf">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" type="email" placeholder="nume@exemplu.ro" {...register('email')} />
          {errors.email && <div className="cf-error">{errors.email.message}</div>}
        </div>
        <div className="cf">
          <label htmlFor="cf-phone">Telefon</label>
          <input id="cf-phone" type="tel" placeholder="07xx xxx xxx" {...register('phone')} />
          {errors.phone && <div className="cf-error">{errors.phone.message}</div>}
        </div>
      </div>

      <div className="cf">
        <label htmlFor="cf-company">
          Nume firmă / CUI <span className="opt">(opțional)</span>
        </label>
        <input
          id="cf-company"
          type="text"
          placeholder="ex. Simplead SRL / RO41501661"
          {...register('company')}
        />
        {errors.company && <div className="cf-error">{errors.company.message}</div>}
      </div>

      <div className="cf">
        <label htmlFor="cf-message">
          La ce te gândești? <span className="opt">(opțional)</span>
        </label>
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
          Website
          <input tabIndex={-1} autoComplete="off" {...register('website')} />
        </label>
      </div>

      <label className="cf-consent">
        <input type="checkbox" {...register('consent')} />
        <span>
          Sunt de acord ca Simplead să-mi folosească datele ca să-mi răspundă la acest mesaj. Vezi{' '}
          <a href="/confidentialitate" target="_blank" rel="noopener">
            politica de confidențialitate
          </a>
          .
        </span>
      </label>
      {errors.consent && (
        <div className="cf-error" style={{ marginTop: -14, marginBottom: 18 }}>
          {errors.consent.message}
        </div>
      )}

      {status === 'error' && (
        <div className="cf-error" role="alert" style={{ marginBottom: 16 }}>
          {serverError ?? 'Ceva n-a mers. Încearcă din nou sau sună-ne direct.'}
        </div>
      )}

      <div className="cform-foot">
        <button type="submit" className="cf-submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Se trimite...' : 'Trimite mesajul'}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
        <span className="note">De obicei răspundem în aceeași zi lucrătoare.</span>
      </div>
    </form>
  );
}
