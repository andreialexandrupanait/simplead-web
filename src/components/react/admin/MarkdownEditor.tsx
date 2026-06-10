import { useCallback, useEffect, useRef, useState } from 'react';
import MediaPicker from './MediaPicker';

type Props = {
  /** Numele câmpului de formular în care se trimite markdown-ul. */
  name: string;
  initial?: string;
};

/**
 * Editor markdown cu două panouri: textarea + preview randat de SERVER prin
 * /api/admin/preview (debounce ~700ms). Preview-ul folosește exact același
 * renderer sanitizat ca paginile publice, deci nu poate diverge.
 */
export default function MarkdownEditor({ name, initial = '' }: Props) {
  const [value, setValue] = useState(initial);
  const [html, setHtml] = useState('');
  const [pickerOpen, setPickerOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const lastSent = useRef('');

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

  useEffect(() => {
    void renderPreview(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onChange = (next: string) => {
    setValue(next);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => void renderPreview(next), 700);
  };

  /** Inserează text la cursor (sau în jurul selecției). */
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

  const words = value.split(/\s+/).filter(Boolean).length;

  return (
    <div>
      <div className="admin-editor">
        <div className="admin-editor__pane">
          <div className="admin-editor__toolbar" role="toolbar" aria-label="Formatare">
            <button type="button" onClick={() => wrap('**', '**', 'text')} title="Bold">
              <strong>B</strong>
            </button>
            <button type="button" onClick={() => wrap('*', '*', 'text')} title="Italic">
              <em>I</em>
            </button>
            <button type="button" onClick={() => wrap('\n## ', '', 'Subtitlu')} title="Subtitlu (H2)">
              H2
            </button>
            <button type="button" onClick={() => wrap('\n### ', '', 'Subtitlu')} title="Subtitlu (H3)">
              H3
            </button>
            <button type="button" onClick={() => wrap('\n- ', '', 'element')} title="Listă">
              • Listă
            </button>
            <button type="button" onClick={() => wrap('[', '](https://)', 'text link')} title="Link">
              🔗 Link
            </button>
            <button type="button" onClick={() => wrap('\n> ', '', 'citat')} title="Citat">
              ❝ Citat
            </button>
            <button type="button" onClick={() => setPickerOpen(true)} title="Inserează imagine">
              🖼 Imagine
            </button>
          </div>
          <textarea
            ref={textareaRef}
            className="admin-textarea admin-editor__textarea"
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Scrie în Markdown… (## pentru subtitluri, **bold**, - liste)"
          />
          <div className="admin-editor__meta">
            <span>{words} cuvinte · ~{Math.max(1, Math.round(words / 200))} min de citit</span>
            <span>Markdown</span>
          </div>
        </div>
        <div className="admin-editor__pane">
          <div
            className="admin-editor__preview prose-simplead"
            // HTML-ul vine din renderer-ul sanitizat de pe server.
            dangerouslySetInnerHTML={{ __html: html || '<p style="color:#5b6788">Preview-ul apare aici…</p>' }}
          />
          <div className="admin-editor__meta">
            <span>Previzualizare (randare identică cu site-ul)</span>
          </div>
        </div>
      </div>

      {pickerOpen && (
        <MediaPicker
          onClose={() => setPickerOpen(false)}
          onPick={(url) => {
            setPickerOpen(false);
            wrap(`\n![descriere imagine](${url})\n`, '', '');
          }}
        />
      )}
    </div>
  );
}
