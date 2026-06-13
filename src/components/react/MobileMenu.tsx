import { useEffect, useState } from 'react';
import type { NavItem, NavServiceItem } from '../../data/nav';

interface Props {
  items: NavItem[];
  services?: NavServiceItem[];
  ctaLabel: string;
  ctaHref: string;
  activePath?: string;
}

/** Meniu mobil: buton burger + overlay full-screen pe canvas light. */
export default function MobileMenu({ items, services = [], ctaLabel, ctaHref, activePath }: Props) {
  const [open, setOpen] = useState(false);
  const [blogCats, setBlogCats] = useState<{ label: string; slug: string }[]>([]);

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

  // Categoriile de blog (paritate cu mega-ul desktop): luate la prima deschidere,
  // client-side din /api/blog-menu (proaspete chiar pe paginile statice).
  useEffect(() => {
    if (!open || blogCats.length) return;
    fetch('/api/blog-menu')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.categories)) setBlogCats(d.categories);
      })
      .catch(() => {});
  }, [open, blogCats.length]);

  const isActive = (href: string) =>
    href === '/' ? activePath === '/' : activePath?.startsWith(href);

  return (
    <>
      <button
        type="button"
        aria-label="Meniu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="mm-burger"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <div className="mm-overlay" role="dialog" aria-modal="true">
          <div className="mm-bar">
            <span className="mm-bar__brand">Simplead</span>
            <button
              type="button"
              aria-label="Închide meniul"
              onClick={() => setOpen(false)}
              className="mm-close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              >
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="mm-nav" aria-label="Navigare mobilă">
            {items
              .filter((i) => i.href !== '/servicii')
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`mm-link ${isActive(item.href) ? 'is-active' : ''}`}
                  {...(item.href === '/contact' ? { 'data-no-drawer': '' } : {})}
                >
                  {item.label}
                </a>
              ))}

            {services.length > 0 && (
              <div className="mm-services">
                <span className="mm-services__label">Servicii</span>
                {services.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    onClick={() => setOpen(false)}
                    className="mm-service"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}

            {blogCats.length > 0 && (
              <div className="mm-services">
                <span className="mm-services__label">Categorii blog</span>
                {blogCats.map((c) => (
                  <a
                    key={c.slug}
                    href={`/blog/category/${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="mm-service"
                  >
                    {c.label}
                  </a>
                ))}
              </div>
            )}
          </nav>

          <div className="mm-foot">
            <a href={ctaHref} onClick={() => setOpen(false)} className="mm-cta">
              {ctaLabel}
            </a>
          </div>
        </div>
      )}

      <style>{`
        .mm-burger {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          gap: 5px; height: 44px; width: 44px; border-radius: var(--r-xs);
          border: 1px solid var(--line); background: var(--canvas);
        }
        .mm-burger span { height: 2px; width: 18px; border-radius: 2px; background: var(--ink); }
        .mm-overlay {
          position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column;
          background: var(--canvas);
        }
        .mm-bar {
          display: flex; align-items: center; justify-content: space-between;
          height: var(--nav-h); padding-inline: 24px; border-bottom: 1px solid var(--line);
        }
        .mm-bar__brand { font-family: var(--font-display); font-size: 1.1rem; color: var(--ink); }
        .mm-close {
          display: flex; align-items: center; justify-content: center; height: 44px; width: 44px;
          border-radius: var(--r-xs); border: 1px solid var(--line); background: var(--canvas); color: var(--ink);
        }
        .mm-close svg { height: 20px; width: 20px; }
        .mm-nav { flex: 1; display: flex; flex-direction: column; padding: 12px 24px; overflow-y: auto; }
        .mm-link {
          padding: 16px 0; border-bottom: 1px solid var(--line);
          font-family: var(--font-display); font-size: 1.6rem; color: var(--muted);
        }
        .mm-link.is-active { color: var(--ink); }
        .mm-services { padding-top: 18px; }
        .mm-services__label {
          display: block; font-family: var(--font-display); font-size: 0.72rem; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--electric); margin-bottom: 8px;
        }
        .mm-service { display: block; padding: 10px 0; font-size: 1.05rem; color: var(--muted); }
        .mm-foot { padding: 20px 24px 40px; }
        .mm-cta {
          display: flex; align-items: center; justify-content: center; width: 100%;
          padding: 16px; border-radius: var(--r-sm); background: var(--electric); color: #fff;
          font-weight: 700; box-shadow: var(--glow-electric);
        }
      `}</style>
    </>
  );
}
