import { useState } from 'react';
import MediaPicker from './MediaPicker';

type Props = {
  name: string;
  initial?: string;
};

/** Câmp de imagine de copertă: URL + alegere din biblioteca media + preview. */
export default function CoverField({ name, initial = '' }: Props) {
  const [url, setUrl] = useState(initial);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="admin-input"
          type="text"
          name={name}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="/uploads/... sau URL extern"
        />
        <button
          type="button"
          className="admin-btn admin-btn--ghost admin-btn--sm"
          style={{ whiteSpace: 'nowrap' }}
          onClick={() => setOpen(true)}
        >
          Alege din media
        </button>
      </div>
      {url && (
        <img
          src={url}
          alt="Previzualizare copertă"
          style={{
            marginTop: 10,
            maxWidth: 280,
            borderRadius: 10,
            border: '1px solid var(--line)',
            display: 'block',
          }}
        />
      )}
      {open && (
        <MediaPicker
          onClose={() => setOpen(false)}
          onPick={(picked) => {
            setUrl(picked);
            setOpen(false);
          }}
        />
      )}
    </div>
  );
}
