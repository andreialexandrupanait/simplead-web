import { useCallback, useEffect, useRef, useState } from 'react';
import ContactForm from './ContactForm';

interface Props {
  phone: string;
  phoneHref: string;
  email: string;
  /** Telefonul apare doar dacă e activat din /admin/setari. */
  showPhone?: boolean;
  /** Link wa.me, gol dacă WhatsApp nu e configurat. */
  whatsappHref?: string;
}

declare global {
  interface Window {
    /** Deschide drawer-ul de contact cu un serviciu pre-completat. Setat la montare. */
    openContactDrawer?: (service?: string) => void;
  }
}

/**
 * Panou slide-in (din dreapta) cu formularul de contact, montat o singură dată în
 * BaseLayout. Se deschide la click pe orice link către /contact (interceptat de
 * scriptul global din BaseLayout, care apelează window.openContactDrawer). Fără JS
 * sau înainte de hidratare, linkurile navighează normal spre /contact (degradare).
 */
export default function ContactDrawer({
  phone,
  phoneHref,
  email,
  showPhone = false,
  whatsappHref = '',
}: Props) {
  const [open, setOpen] = useState(false);
  const [service, setService] = useState('');
  const [instance, setInstance] = useState(0); // remontează formularul la fiecare deschidere
  const closeBtn = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Expune funcția globală + ascultă și evenimentul (redundant, pentru siguranță).
  useEffect(() => {
    const openDrawer = (svc?: string) => {
      setService(svc ?? '');
      setInstance((n) => n + 1);
      setOpen(true);
    };
    window.openContactDrawer = openDrawer;
    const onEvt = (e: Event) => openDrawer((e as CustomEvent).detail?.service);
    window.addEventListener('open-contact-drawer', onEvt);
    return () => {
      if (window.openContactDrawer === openDrawer) delete window.openContactDrawer;
      window.removeEventListener('open-contact-drawer', onEvt);
    };
  }, []);

  // ESC + blocare scroll pe body cât e deschis + focus pe butonul de închidere.
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => closeBtn.current?.focus(), 60);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, close]);

  return (
    <div
      className="cd-backdrop"
      data-open={open ? 'true' : 'false'}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(3,13,74,0.45)',
        opacity: open ? 1 : 0,
        visibility: open ? 'visible' : 'hidden',
        transition: 'opacity 0.28s ease, visibility 0.28s ease',
      }}
    >
      <aside
        className="cd-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Cere o ofertă"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: 'min(560px, 96vw)',
          background: 'var(--canvas)',
          boxShadow: '-24px 0 60px -30px rgba(3,13,74,0.5)',
          display: 'flex',
          flexDirection: 'column',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.34s cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        <header
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: 16,
            padding: '26px 32px 20px',
            borderBottom: '1px solid var(--line)',
            flexShrink: 0,
          }}
        >
          <div>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.5rem',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                color: 'var(--ink)',
              }}
            >
              Hai să vorbim
            </p>
            <p
              style={{ margin: '6px 0 0', fontSize: 14.5, lineHeight: 1.5, color: 'var(--muted)' }}
            >
              Spune-ne pe scurt ce vrei și revenim în aceeași zi lucrătoare.
            </p>
          </div>
          <button
            ref={closeBtn}
            type="button"
            onClick={close}
            aria-label="Închide"
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--line)',
              borderRadius: 999,
              background: 'var(--canvas)',
              color: 'var(--ink)',
              cursor: 'pointer',
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ width: 18, height: 18 }}
              aria-hidden="true"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </header>

        <div style={{ padding: '24px 32px', overflowY: 'auto', flex: 1 }}>
          {open && (
            <ContactForm
              key={instance}
              service={service}
              flat
              thankYouType="oferta"
              onSuccess={() => setTimeout(close, 2600)}
            />
          )}
        </div>
        <footer
          style={{
            flexShrink: 0,
            padding: '18px 32px',
            borderTop: '1px solid var(--line)',
            textAlign: 'center',
            fontSize: 14,
            lineHeight: 1.6,
            color: 'var(--muted)',
          }}
        >
          Preferi direct? Scrie la{' '}
          <a href={`mailto:${email}`} style={{ color: 'var(--electric)', fontWeight: 600 }}>
            {email}
          </a>
          {showPhone && (
            <>
              {' '}
              sau sună la{' '}
              <a href={phoneHref} style={{ color: 'var(--electric)', fontWeight: 600 }}>
                {phone}
              </a>
            </>
          )}
          {whatsappHref && (
            <>
              {' '}
              ori pe{' '}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener"
                style={{ color: 'var(--electric)', fontWeight: 600 }}
              >
                WhatsApp
              </a>
            </>
          )}
          .
        </footer>
      </aside>
    </div>
  );
}
