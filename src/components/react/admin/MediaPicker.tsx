import { useCallback, useEffect, useRef, useState } from 'react';

type UploadEntry = { name: string; url: string; size: number; modifiedAt: string };

type Props = {
  /** Primește URL-ul imaginii alese. */
  onPick: (url: string) => void;
  onClose: () => void;
};

/**
 * Bibliotecă media în dialog: listă din /api/admin/uploads + upload prin
 * drag&drop sau click. Returnează URL-ul ales prin onPick.
 */
export default function MediaPicker({ onPick, onClose }: Props) {
  const [entries, setEntries] = useState<UploadEntry[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  const load = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/uploads');
      const body = (await res.json()) as { entries: UploadEntry[] };
      setEntries(body.entries);
    } catch {
      setError('Nu am putut încărca biblioteca media.');
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const upload = useCallback(
    async (files: FileList | File[]) => {
      setError(null);
      setBusy(true);
      try {
        for (const file of Array.from(files)) {
          const form = new FormData();
          form.append('file', file);
          const res = await fetch('/api/admin/uploads', { method: 'POST', body: form });
          const body = (await res.json()) as { url?: string; error?: string };
          if (!res.ok) {
            setError(body.error ?? 'Upload eșuat.');
          }
        }
        await load();
      } catch {
        setError('Upload eșuat (eroare de rețea).');
      } finally {
        setBusy(false);
      }
    },
    [load],
  );

  const remove = useCallback(
    async (name: string) => {
      if (!confirm(`Ștergi „${name}"? Articolele care o folosesc vor rămâne fără imagine.`)) return;
      await fetch(`/api/admin/uploads/${encodeURIComponent(name)}`, { method: 'DELETE' });
      await load();
    },
    [load],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Bibliotecă media"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: 'rgba(3,13,74,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 16,
          width: 'min(860px, 100%)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 22,
          gap: 14,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <strong style={{ fontSize: '1.05rem' }}>Bibliotecă media</strong>
          <button
            type="button"
            className="admin-btn admin-btn--ghost admin-btn--sm"
            onClick={onClose}
          >
            Închide
          </button>
        </div>

        <div
          className={`admin-dropzone${over ? 'is-over' : ''}`}
          onDragOver={(e) => {
            e.preventDefault();
            setOver(true);
          }}
          onDragLeave={() => setOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setOver(false);
            if (e.dataTransfer.files.length) void upload(e.dataTransfer.files);
          }}
          onClick={() => fileInput.current?.click()}
        >
          {busy
            ? 'Se încarcă…'
            : 'Trage imagini aici sau apasă ca să alegi (JPG/PNG/WebP/AVIF, max 5MB).'}
          <input
            ref={fileInput}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            multiple
            hidden
            onChange={(e) => {
              if (e.target.files?.length) void upload(e.target.files);
              e.target.value = '';
            }}
          />
        </div>

        {error && (
          <div className="admin-banner admin-banner--error" style={{ margin: 0 }}>
            {error}
          </div>
        )}

        <div className="admin-media-grid" style={{ overflowY: 'auto' }}>
          {entries.length === 0 && !busy && (
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', gridColumn: '1/-1' }}>
              Nicio imagine încă. Încarcă prima.
            </p>
          )}
          {entries.map((e) => (
            <figure key={e.name} className="admin-media-item" style={{ margin: 0 }}>
              <img src={e.url} alt={e.name} loading="lazy" />
              <figcaption title={e.name}>{e.name}</figcaption>
              <div style={{ display: 'flex', gap: 6, padding: '0 8px 8px' }}>
                <button
                  type="button"
                  className="admin-btn admin-btn--sm"
                  style={{ flex: 1 }}
                  onClick={() => onPick(e.url)}
                >
                  Alege
                </button>
                <button
                  type="button"
                  className="admin-btn admin-btn--danger admin-btn--sm"
                  onClick={() => void remove(e.name)}
                  aria-label={`Șterge ${e.name}`}
                >
                  ✕
                </button>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </div>
  );
}
