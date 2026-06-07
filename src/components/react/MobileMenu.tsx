import { useEffect, useState } from 'react';
import type { NavItem } from '../../data/nav';

interface Props {
  items: NavItem[];
  ctaLabel: string;
  ctaHref: string;
  activePath?: string;
}

/** Meniu mobil funcțional: buton burger + overlay full-screen. */
export default function MobileMenu({ items, ctaLabel, ctaHref, activePath }: Props) {
  const [open, setOpen] = useState(false);

  // Blochează scroll-ul body când meniul e deschis + închide pe Escape.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? activePath === '/' : activePath?.startsWith(href);

  return (
    <>
      <button
        type="button"
        aria-label="Meniu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="flex h-11 w-11 flex-col items-center justify-center gap-1 rounded-[11px] border border-white/20 bg-white/5"
      >
        <span className="h-0.5 w-[18px] rounded bg-white" />
        <span className="h-0.5 w-[18px] rounded bg-white" />
        <span className="h-0.5 w-[18px] rounded bg-white" />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[#050a33]/98 backdrop-blur-xl"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex h-[88px] items-center justify-end px-6">
            <button
              type="button"
              aria-label="Închide meniul"
              onClick={() => setOpen(false)}
              className="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/20 bg-white/5 text-2xl text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                className="h-5 w-5"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-2 px-8 pt-4" aria-label="Navigare mobilă">
            {items.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`border-b border-white/8 py-4 font-display text-2xl font-semibold transition-colors ${
                  isActive(item.href) ? 'text-white' : 'text-white/70 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="px-8 pb-12 pt-4">
            <div
              className="grad-surface inline-block rounded-[7px]"
              style={{ transform: 'skew(-11deg)' }}
            >
              <a
                href={ctaHref}
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 px-7 py-4 font-semibold uppercase tracking-[0.05em] text-white"
                style={{ transform: 'skew(11deg)' }}
              >
                {ctaLabel}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
