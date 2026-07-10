import { useEffect, useState } from 'react';
import type { NavItem, NavServiceItem } from '../../data/nav';

interface Props {
  items: NavItem[];
  services?: NavServiceItem[];
  ctaLabel: string;
  ctaHref: string;
  activePath?: string;
}

type Child = { label: string; href: string };

/**
 * Meniu mobil stil Cloudflare: drawer full-screen care intră din dreapta, cu
 * rânduri mari și sub-meniuri în acordeon (Servicii, Blog) care se extind inline.
 */
export default function MobileMenu({ items, services = [], ctaLabel, ctaHref, activePath }: Props) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [blogCats, setBlogCats] = useState<Child[]>([]);

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

  // Categoriile de blog (paritate cu mega-ul desktop): la prima deschidere.
  useEffect(() => {
    if (!open || blogCats.length) return;
    fetch('/api/blog-menu')
      .then((r) => r.json())
      .then((d) => {
        if (Array.isArray(d?.categories))
          setBlogCats(
            d.categories.map((c: { label: string; slug: string }) => ({
              label: c.label,
              href: `/blog/category/${c.slug}`,
            })),
          );
      })
      .catch(() => {});
  }, [open, blogCats.length]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };
  const isActive = (href: string) =>
    href === '/' ? activePath === '/' : activePath?.startsWith(href);

  // Copiii de acordeon pentru Servicii și Blog.
  const serviceChildren: Child[] = [
    { label: 'Toate serviciile', href: '/servicii' },
    ...services.map((s) => ({ label: s.label, href: s.href })),
  ];
  const blogChildren: Child[] = [{ label: 'Toate articolele', href: '/blog' }, ...blogCats];

  const childrenFor = (href: string): Child[] | null => {
    if (href === '/servicii') return serviceChildren;
    if (href === '/blog') return blogChildren;
    return null;
  };

  const Chevron = () => (
    <svg className="mm-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );

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

      <div
        className={`mm-overlay ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
      >
        <div className="mm-bar">
          <span className="mm-bar__brand">Simplead</span>
          <button type="button" aria-label="Închide meniul" onClick={close} className="mm-close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav className="mm-nav" aria-label="Navigare mobilă">
          {items.map((item) => {
            const kids = childrenFor(item.href);
            if (!kids) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  className={`mm-row mm-row--link ${isActive(item.href) ? 'is-active' : ''}`}
                  {...(item.href === '/contact' ? { 'data-no-drawer': '' } : {})}
                >
                  {item.label}
                </a>
              );
            }
            const isOpen = expanded === item.href;
            return (
              <div key={item.href} className="mm-acc">
                <button
                  type="button"
                  className={`mm-row mm-row--acc ${isOpen ? 'is-open' : ''} ${
                    isActive(item.href) ? 'is-active' : ''
                  }`}
                  aria-expanded={isOpen}
                  onClick={() => setExpanded(isOpen ? null : item.href)}
                >
                  {item.label}
                  <Chevron />
                </button>
                <div className={`mm-sub ${isOpen ? 'is-open' : ''}`}>
                  <div className="mm-sub__inner">
                    {kids.map((c) => (
                      <a key={c.href} href={c.href} onClick={close} className="mm-sublink">
                        {c.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mm-foot">
          <a href={ctaHref} onClick={close} className="mm-cta">
            {ctaLabel}
          </a>
        </div>
      </div>

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
          transform: translateX(100%);
          opacity: 0;
          visibility: hidden;
          transition: transform .28s var(--ease-snap, cubic-bezier(.22,1,.36,1)),
                      opacity .2s ease, visibility 0s linear .28s;
        }
        .mm-overlay.is-open {
          transform: translateX(0);
          opacity: 1;
          visibility: visible;
          transition: transform .28s var(--ease-snap, cubic-bezier(.22,1,.36,1)),
                      opacity .2s ease, visibility 0s;
        }

        .mm-bar {
          display: flex; align-items: center; justify-content: space-between;
          height: var(--nav-h); padding-inline: 20px; border-bottom: 1px solid var(--line);
          flex: none;
        }
        .mm-bar__brand { font-family: var(--font-display); font-size: 1.1rem; font-weight: 700; color: var(--ink); }
        .mm-close {
          display: flex; align-items: center; justify-content: center; height: 44px; width: 44px;
          border-radius: var(--r-xs); border: 1px solid var(--line); background: var(--canvas); color: var(--ink);
        }
        .mm-close svg { height: 20px; width: 20px; }

        .mm-nav { flex: 1; display: flex; flex-direction: column; padding: 6px 20px; overflow-y: auto; }

        .mm-row {
          display: flex; align-items: center; justify-content: space-between; width: 100%;
          padding: 17px 2px; border: 0; border-bottom: 1px solid var(--line);
          background: transparent; text-align: left; cursor: pointer;
          font-family: var(--font-display); font-size: 1.18rem; font-weight: 600; color: var(--ink);
          transition: color .16s ease;
        }
        .mm-row--link { color: var(--muted-dark, var(--ink)); text-decoration: none; }
        .mm-row:hover, .mm-row.is-active { color: var(--electric); }
        .mm-chev { width: 20px; height: 20px; color: var(--muted); transition: transform .25s var(--ease-snap, ease); flex: none; }
        .mm-row--acc.is-open .mm-chev { transform: rotate(180deg); color: var(--electric); }

        .mm-acc { display: flex; flex-direction: column; }
        /* Acordeon animat (grid 0fr → 1fr, smooth height). */
        .mm-sub { display: grid; grid-template-rows: 0fr; transition: grid-template-rows .26s var(--ease-snap, ease); }
        .mm-sub.is-open { grid-template-rows: 1fr; }
        .mm-sub__inner { overflow: hidden; display: flex; flex-direction: column; }
        .mm-sublink {
          padding: 12px 2px 12px 16px; font-size: 1.02rem; color: var(--muted);
          border-bottom: 1px solid var(--line); text-decoration: none;
        }
        .mm-sub__inner .mm-sublink:last-child { border-bottom: 0; }
        .mm-sublink:hover { color: var(--electric); }

        .mm-foot { flex: none; padding: 18px 20px calc(20px + env(safe-area-inset-bottom, 0px)); border-top: 1px solid var(--line); }
        .mm-cta {
          display: flex; align-items: center; justify-content: center; width: 100%;
          padding: 16px; border-radius: var(--r-sm); background: var(--electric); color: #fff;
          font-weight: 700; text-decoration: none; box-shadow: var(--glow-electric);
        }

        @media (prefers-reduced-motion: reduce) {
          .mm-overlay, .mm-sub, .mm-chev { transition: none; }
        }
      `}</style>
    </>
  );
}
