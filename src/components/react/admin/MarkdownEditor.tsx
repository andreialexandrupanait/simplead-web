import { useCallback, useEffect, useRef, useState } from 'react';
import MediaPicker from './MediaPicker';

type Props = {
  /** Numele câmpului de formular în care se trimite markdown-ul. */
  name: string;
  initial?: string;
};

type Mode = 'write' | 'split' | 'preview';

/**
 * Editor markdown v2: moduri Scrie / Împărțit / Previzualizare + fullscreen,
 * scurtături (Ctrl+B/I/K), imagini prin drag&drop sau paste direct în text,
 * backup automat în localStorage (cu ofertă de restaurare) și avertisment la
 * părăsirea paginii cu modificări nesalvate. Preview-ul e randat de SERVER
 * prin /api/admin/preview — identic cu site-ul public prin construcție.
 */
export default function MarkdownEditor({ name, initial = '' }: Props) {
  const [value, setValue] = useState(initial);
  const [html, setHtml] = useState('');
  const [mode, setMode] = useState<Mode>('split');
  const [fullscreen, setFullscreen] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [backup, setBackup] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const previewTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastSent = useRef('');
  const dirty = useRef(false);
  const submitted = useRef(false);

  const storageKey = `sa-editor:${typeof location !== 'undefined' ? location.pathname : ''}:${name}`;

  /* ---------- preview pe server ---------- */
  const renderPreview = useCallback(async (md: string) => {
    if (md === lastSent.current) return;
    lastSent.current = md;
    try {
      const res = await fetch('/api/admin/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown: md }),
      });
      const body = (await res.json()) as { html?: string };
      setHtml(body.html ?? '');
    } catch {
      /* preview-ul e best-effort; conținutul nu se pierde */
    }
  }, []);

  /* ---------- montare: preview inițial + backup + guard de părăsire ---------- */
  useEffect(() => {
    void renderPreview(initial);
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved && saved !== initial) setBackup(saved);
    } catch {
      /* localStorage indisponibil */
    }

    const form = textareaRef.current?.form;
    const onSubmit = () => {
      submitted.current = true;
      try {
        localStorage.removeItem(storageKey);
      } catch {
        /* ignorăm */
      }
    };
    form?.addEventListener('submit', onSubmit);

    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (dirty.current && !submitted.current) e.preventDefault();
    };
    window.addEventListener('beforeunload', onBeforeUnload);
    return () => {
      form?.removeEventListener('submit', onSubmit);
      window.removeEventListener('beforeunload', onBeforeUnload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---------- Esc închide fullscreen ---------- */
  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setFullscreen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [fullscreen]);

  const onChange = (next: string) => {
    setValue(next);
    dirty.current = next !== initial;
    clearTimeout(previewTimer.current);
    previewTimer.current = setTimeout(() => {
      void renderPreview(next);
      try {
        if (next !== initial) localStorage.setItem(storageKey, next);
        else localStorage.removeItem(storageKey);
      } catch {
        /* ignorăm */
      }
    }, 600);
  };

  /* ---------- inserții la cursor ---------- */
  const wrap = (before: string, after = '', placeholder = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const { selectionStart: s, selectionEnd: e } = ta;
    const selected = value.slice(s, e) || placeholder;
    const next = value.slice(0, s) + before + selected + after + value.slice(e);
    onChange(next);
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(s + before.length, s + before.length + selected.length);
    });
  };

  const insertAtCursor = (text: string) => wrap(text, '', '');

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (!(e.ctrlKey || e.metaKey)) return;
    const key = e.key.toLowerCase();
    if (key === 'b') {
      e.preventDefault();
      wrap('**', '**', 'text');
    } else if (key === 'i') {
      e.preventDefault();
      wrap('*', '*', 'text');
    } else if (key === 'k') {
      e.preventDefault();
      wrap('[', '](https://)', 'text link');
    }
  };

  /* ---------- upload imagini: drag&drop + paste ---------- */
  const uploadAndInsert = useCallback(
    async (files: File[] | FileList) => {
      const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (images.length === 0) return;
      setUploading(true);
      try {
        for (const file of images) {
          const form = new FormData();
          form.append('file', file);
          const res = await fetch('/api/admin/uploads', { method: 'POST', body: form });
          const body = (await res.json()) as { url?: string; error?: string };
          if (res.ok && body.url) {
            insertAtCursor(`\n![descriere imagine](${body.url})\n`);
          } else {
            window.adminToast?.(body.error ?? 'Upload eșuat.', 'error');
          }
        }
      } catch {
        window.adminToast?.('Upload eșuat (eroare de rețea).', 'error');
      } finally {
        setUploading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value],
  );

  const words = value.split(/\s+/).filter(Boolean).length;

  const ModeBtn = ({ m, label }: { m: Mode; label: string }) => (
    <button
      type="button"
      className={mode === m ? 'is-active' : ''}
      onClick={() => setMode(m)}
      aria-pressed={mode === m}
    >
      {label}
    </button>
  );

  const editor = (
    <div className={`admin-editor2${fullscreen ? 'is-fullscreen' : ''}`}>
      <div className="admin-editor2__bar">
        <div className="admin-editor2__tools" role="toolbar" aria-label="Formatare">
          <button type="button" onClick={() => wrap('**', '**', 'text')} title="Bold (Ctrl+B)">
            <strong>B</strong>
          </button>
          <button type="button" onClick={() => wrap('*', '*', 'text')} title="Italic (Ctrl+I)">
            <em>I</em>
          </button>
          <span className="sep" />
          <button
            type="button"
            onClick={() => wrap('\n## ', '', 'Subtitlu')}
            title="Subtitlu mare (H2)"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => wrap('\n### ', '', 'Subtitlu')}
            title="Subtitlu mic (H3)"
          >
            H3
          </button>
          <span className="sep" />
          <button type="button" onClick={() => wrap('\n- ', '', 'element')} title="Listă cu puncte">
            ≔
          </button>
          <button
            type="button"
            onClick={() => wrap('\n1. ', '', 'element')}
            title="Listă numerotată"
          >
            1.
          </button>
          <button type="button" onClick={() => wrap('\n> ', '', 'citat')} title="Citat">
            ❝
          </button>
          <span className="sep" />
          <button
            type="button"
            onClick={() => wrap('[', '](https://)', 'text link')}
            title="Link (Ctrl+K)"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => setPickerOpen(true)}
            title="Inserează imagine din bibliotecă"
          >
            🖼
          </button>
        </div>
        <div className="admin-editor2__modes">
          <ModeBtn m="write" label="Scrie" />
          <ModeBtn m="split" label="Împărțit" />
          <ModeBtn m="preview" label="Vezi" />
          <button
            type="button"
            className="admin-editor2__fs"
            onClick={() => setFullscreen(!fullscreen)}
            title={fullscreen ? 'Ieși din ecran complet (Esc)' : 'Ecran complet'}
          >
            {fullscreen ? '✕' : '⛶'}
          </button>
        </div>
      </div>

      {backup !== null && (
        <div className="admin-editor2__restore">
          <span>Există o versiune nesalvată din sesiunea trecută.</span>
          <button
            type="button"
            onClick={() => {
              onChange(backup);
              setBackup(null);
              window.adminToast?.('Versiunea nesalvată a fost restaurată.');
            }}
          >
            Restaurează
          </button>
          <button
            type="button"
            onClick={() => {
              setBackup(null);
              try {
                localStorage.removeItem(storageKey);
              } catch {
                /* ignorăm */
              }
            }}
          >
            Ignoră
          </button>
        </div>
      )}

      <div className={`admin-editor2__panes mode-${mode}`}>
        <div
          className="admin-editor2__write"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            if (e.dataTransfer.files.length) void uploadAndInsert(e.dataTransfer.files);
          }}
        >
          <textarea
            ref={textareaRef}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            onPaste={(e) => {
              const files = Array.from(e.clipboardData.files);
              if (files.length) {
                e.preventDefault();
                void uploadAndInsert(files);
              }
            }}
            placeholder={
              'Scrie aici…\n\n## Folosește subtitluri ca acesta\n**bold**, *italic*, liste cu „- " și imagini trase direct în text.'
            }
            spellCheck={true}
          />
        </div>
        <div className="admin-editor2__view prose-simplead" aria-label="Previzualizare">
          {/* HTML-ul vine din renderer-ul sanitizat de pe server. */}
          <div
            dangerouslySetInnerHTML={{
              __html:
                html ||
                '<p style="color:#5b6788">Previzualizarea apare aici pe măsură ce scrii…</p>',
            }}
          />
        </div>
      </div>

      <div className="admin-editor2__status">
        <span>
          {words} cuvinte · ~{Math.max(1, Math.round(words / 200))} min de citit
          {uploading && ' · se încarcă imaginea…'}
        </span>
        <span className="admin-editor2__hint">
          Ctrl+B bold · Ctrl+I italic · Ctrl+K link · trage sau lipește imagini direct în text
        </span>
      </div>

      {pickerOpen && (
        <MediaPicker
          onClose={() => setPickerOpen(false)}
          onPick={(url) => {
            setPickerOpen(false);
            insertAtCursor(`\n![descriere imagine](${url})\n`);
          }}
        />
      )}
    </div>
  );

  return editor;
}

declare global {
  interface Window {
    adminToast?: (msg: string, kind?: 'ok' | 'error') => void;
  }
}
