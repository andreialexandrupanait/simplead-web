import { useEffect, useMemo, useState } from 'react';
import {
  TRIGGER_TYPES,
  triggerSummary,
  type TriggerType,
  type TrackingEventRule,
  type TrackingPreset,
} from '../../data/tracking-events-defs';

type PageOption = { path: string; label: string };
type Toast = { kind: 'ok' | 'error'; msg: string } | null;

/** Model de editare: trigger aplatizat + params ca perechi (mai ușor de editat). */
type EditRule = {
  id: string;
  enabled: boolean;
  name: string;
  pages: string[];
  triggerType: TriggerType;
  selector: string;
  threshold: string;
  seconds: string;
  paramPairs: { key: string; value: string }[];
  consent: '' | 'analytics' | 'marketing';
};

const TRIGGER_LABELS: Record<TriggerType, string> = {
  pageview: 'La deschiderea paginii',
  click: 'Click pe element',
  submit: 'Submit formular',
  scroll: 'Scroll (%)',
  timer: 'După X secunde',
};

function newId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return 'r-' + Math.random().toString(36).slice(2, 10);
  }
}

function toEdit(r: TrackingEventRule): EditRule {
  return {
    id: r.id || newId(),
    enabled: r.enabled,
    name: r.name,
    pages: r.pages?.length ? r.pages : ['*'],
    triggerType: r.trigger.type,
    selector: r.trigger.selector ?? '',
    threshold: r.trigger.threshold != null ? String(r.trigger.threshold) : '',
    seconds: r.trigger.seconds != null ? String(r.trigger.seconds) : '',
    paramPairs: Object.entries(r.params ?? {}).map(([key, value]) => ({
      key,
      value: String(value),
    })),
    consent: r.consent ?? '',
  };
}

function toRule(e: EditRule): TrackingEventRule {
  const trigger: TrackingEventRule['trigger'] = { type: e.triggerType };
  if (e.triggerType === 'click' || e.triggerType === 'submit') trigger.selector = e.selector.trim();
  if (e.triggerType === 'scroll') trigger.threshold = Number(e.threshold);
  if (e.triggerType === 'timer') trigger.seconds = Number(e.seconds);
  const params: Record<string, string> = {};
  for (const p of e.paramPairs) {
    const k = p.key.trim();
    if (k) params[k] = p.value;
  }
  const rule: TrackingEventRule = {
    id: e.id,
    enabled: e.enabled,
    name: e.name.trim(),
    pages: e.pages.includes('*') ? ['*'] : e.pages,
    trigger,
  };
  if (Object.keys(params).length) rule.params = params;
  if (e.consent) rule.consent = e.consent;
  return rule;
}

/** Verificare client-side rapidă; serverul re-validează cu Zod. */
function validate(e: EditRule): string | null {
  if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(e.name.trim()))
    return `Numele „${e.name || '(gol)'}" e invalid (litere/cifre/underscore, începe cu literă).`;
  if (!e.pages.length) return `Regula „${e.name}": alege cel puțin o pagină.`;
  if ((e.triggerType === 'click' || e.triggerType === 'submit') && !e.selector.trim())
    return `Regula „${e.name}": selectorul CSS e obligatoriu.`;
  if (e.triggerType === 'scroll') {
    const n = Number(e.threshold);
    if (!n || n < 1 || n > 100) return `Regula „${e.name}": pragul de scroll trebuie 1–100.`;
  }
  if (e.triggerType === 'timer') {
    const n = Number(e.seconds);
    if (!n || n < 1) return `Regula „${e.name}": secundele trebuie ≥ 1.`;
  }
  return null;
}

export default function EventsAdmin({
  pages,
  presets,
}: {
  pages: PageOption[];
  presets: TrackingPreset[];
}) {
  const [rules, setRules] = useState<EditRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<Toast>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    void (async () => {
      try {
        const res = await fetch('/api/admin/tracking-events');
        const data = await res.json();
        setRules((data.rules ?? []).map(toEdit));
      } catch {
        notify('error', 'Nu am putut încărca regulile.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  function notify(kind: 'ok' | 'error', msg: string) {
    setToast({ kind, msg });
    setTimeout(() => setToast(null), 4500);
  }

  const usedNames = useMemo(() => new Set(rules.map((r) => r.name)), [rules]);

  function patch(id: string, fields: Partial<EditRule>) {
    setRules((rs) => rs.map((r) => (r.id === id ? { ...r, ...fields } : r)));
  }

  function addBlank() {
    const id = newId();
    setRules((rs) => [
      ...rs,
      {
        id,
        enabled: true,
        name: '',
        pages: ['*'],
        triggerType: 'click',
        selector: '',
        threshold: '',
        seconds: '',
        paramPairs: [],
        consent: 'analytics',
      },
    ]);
    setOpenId(id);
  }

  function addPreset(p: TrackingPreset) {
    const id = newId();
    const edit = toEdit({ ...p.rule, id, enabled: true });
    setRules((rs) => [...rs, edit]);
    setOpenId(id);
    notify('ok', `Preset „${p.label}" adăugat. Nu uita să salvezi.`);
  }

  function removeRule(id: string) {
    setRules((rs) => rs.filter((r) => r.id !== id));
    if (openId === id) setOpenId(null);
  }

  async function save() {
    for (const r of rules) {
      const err = validate(r);
      if (err) {
        notify('error', err);
        setOpenId(r.id);
        return;
      }
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/tracking-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rules: rules.map(toRule) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Salvarea a eșuat.');
      notify('ok', 'Regulile au fost salvate.');
    } catch (err) {
      notify('error', err instanceof Error ? err.message : 'Eroare la salvare.');
    } finally {
      setSaving(false);
    }
  }

  const availablePresets = presets.filter((p) => !usedNames.has(p.rule.name));

  return (
    <div>
      {toast && <div className={`admin-banner admin-banner--${toast.kind}`}>{toast.msg}</div>}

      {/* Bibliotecă de presets */}
      {availablePresets.length > 0 && (
        <div className="admin-card" style={{ marginBottom: '20px' }}>
          <strong style={{ display: 'block', marginBottom: '10px' }}>
            Bibliotecă — activează cu un click
          </strong>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {availablePresets.map((p) => (
              <button
                key={p.key}
                type="button"
                className="admin-btn admin-btn--ghost admin-btn--sm"
                title={p.description}
                onClick={() => addPreset(p)}
              >
                + {p.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap',
        }}
      >
        <button type="button" className="admin-btn admin-btn--ghost" onClick={addBlank}>
          + Regulă nouă
        </button>
        <button type="button" className="admin-btn" onClick={() => void save()} disabled={saving}>
          {saving ? 'Se salvează…' : 'Salvează tot'}
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--muted)' }}>Se încarcă…</p>
      ) : rules.length === 0 ? (
        <div className="admin-card">
          <p style={{ color: 'var(--muted)', margin: 0 }}>
            Nicio regulă încă. Activează una din bibliotecă sau adaugă una nouă.
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {rules.map((r) => {
            const open = openId === r.id;
            return (
              <div key={r.id} className="admin-card" style={{ padding: 0 }}>
                {/* Rând-sumar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <label
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                    title={r.enabled ? 'Activă' : 'Dezactivată'}
                  >
                    <input
                      type="checkbox"
                      checked={r.enabled}
                      onChange={(e) => patch(r.id, { enabled: e.currentTarget.checked })}
                    />
                  </label>
                  <div style={{ flex: 1, minWidth: '180px' }}>
                    <code style={{ fontWeight: 700 }}>{r.name || '(fără nume)'}</code>
                    <div style={{ fontSize: '0.82rem', color: 'var(--muted)' }}>
                      {triggerSummary(toRule(r).trigger)} ·{' '}
                      {r.pages.includes('*') ? 'toate paginile' : `${r.pages.length} pagini`}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => setOpenId(open ? null : r.id)}
                  >
                    {open ? 'Închide' : 'Editează'}
                  </button>
                  <button
                    type="button"
                    className="admin-btn admin-btn--ghost admin-btn--sm"
                    onClick={() => removeRule(r.id)}
                  >
                    Șterge
                  </button>
                </div>

                {/* Editor extins */}
                {open && (
                  <div
                    style={{
                      borderTop: '1px solid var(--admin-border, rgba(0,0,0,0.08))',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <label className="admin-field" style={{ flex: 1, minWidth: '200px' }}>
                        <span>Nume eveniment (dataLayer)</span>
                        <input
                          className="admin-input"
                          value={r.name}
                          placeholder="ex. click_whatsapp"
                          autoComplete="off"
                          spellCheck={false}
                          onChange={(e) => patch(r.id, { name: e.currentTarget.value })}
                        />
                      </label>
                      <label className="admin-field" style={{ minWidth: '180px' }}>
                        <span>Declanșator</span>
                        <select
                          className="admin-select"
                          value={r.triggerType}
                          onChange={(e) =>
                            patch(r.id, { triggerType: e.currentTarget.value as TriggerType })
                          }
                        >
                          {TRIGGER_TYPES.map((t) => (
                            <option key={t} value={t}>
                              {TRIGGER_LABELS[t]}
                            </option>
                          ))}
                        </select>
                      </label>
                      <label className="admin-field" style={{ minWidth: '150px' }}>
                        <span>Consimțământ</span>
                        <select
                          className="admin-select"
                          value={r.consent}
                          onChange={(e) =>
                            patch(r.id, {
                              consent: e.currentTarget.value as EditRule['consent'],
                            })
                          }
                        >
                          <option value="">—</option>
                          <option value="analytics">Analiză</option>
                          <option value="marketing">Marketing</option>
                        </select>
                      </label>
                    </div>

                    {/* Câmpuri condiționale pe tip */}
                    {(r.triggerType === 'click' || r.triggerType === 'submit') && (
                      <label className="admin-field">
                        <span>Selector CSS</span>
                        <input
                          className="admin-input"
                          value={r.selector}
                          placeholder='ex. a[href^="tel:"] sau [data-cta]'
                          autoComplete="off"
                          spellCheck={false}
                          onChange={(e) => patch(r.id, { selector: e.currentTarget.value })}
                        />
                        <small>
                          Elementul (sau un părinte) pe care se prinde {r.triggerType}. Poți lista
                          mai mulți selectori separați prin virgulă.
                        </small>
                      </label>
                    )}
                    {r.triggerType === 'scroll' && (
                      <label className="admin-field" style={{ maxWidth: '220px' }}>
                        <span>Prag scroll (%)</span>
                        <input
                          className="admin-input"
                          type="number"
                          min={1}
                          max={100}
                          value={r.threshold}
                          onChange={(e) => patch(r.id, { threshold: e.currentTarget.value })}
                        />
                      </label>
                    )}
                    {r.triggerType === 'timer' && (
                      <label className="admin-field" style={{ maxWidth: '220px' }}>
                        <span>Secunde de la încărcare</span>
                        <input
                          className="admin-input"
                          type="number"
                          min={1}
                          value={r.seconds}
                          onChange={(e) => patch(r.id, { seconds: e.currentTarget.value })}
                        />
                      </label>
                    )}

                    {/* Pagini */}
                    <div className="admin-field">
                      <span>Pagini active</span>
                      <div
                        style={{
                          maxHeight: '180px',
                          overflowY: 'auto',
                          border: '1px solid var(--admin-border, rgba(0,0,0,0.12))',
                          borderRadius: '8px',
                          padding: '10px 12px',
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                          gap: '4px 12px',
                        }}
                      >
                        {pages.map((pg) => {
                          const isAll = pg.path === '*';
                          const checked = r.pages.includes(pg.path);
                          const disabled = !isAll && r.pages.includes('*');
                          return (
                            <label
                              key={pg.path}
                              style={{
                                display: 'flex',
                                gap: '6px',
                                alignItems: 'center',
                                fontSize: '0.86rem',
                                opacity: disabled ? 0.45 : 1,
                              }}
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                disabled={disabled}
                                onChange={(e) => {
                                  const on = e.currentTarget.checked;
                                  let next: string[];
                                  if (isAll) {
                                    next = on ? ['*'] : [];
                                  } else {
                                    next = on
                                      ? [...r.pages.filter((x) => x !== '*'), pg.path]
                                      : r.pages.filter((x) => x !== pg.path);
                                  }
                                  patch(r.id, { pages: next });
                                }}
                              />
                              <span>{pg.label}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    {/* Parametri */}
                    <div className="admin-field">
                      <span>Parametri (opțional)</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {r.paramPairs.map((p, i) => (
                          <div key={i} style={{ display: 'flex', gap: '8px' }}>
                            <input
                              className="admin-input"
                              placeholder="cheie"
                              value={p.key}
                              style={{ maxWidth: '200px' }}
                              onChange={(e) => {
                                const pairs = r.paramPairs.slice();
                                pairs[i] = { ...pairs[i], key: e.currentTarget.value };
                                patch(r.id, { paramPairs: pairs });
                              }}
                            />
                            <input
                              className="admin-input"
                              placeholder="valoare"
                              value={p.value}
                              onChange={(e) => {
                                const pairs = r.paramPairs.slice();
                                pairs[i] = { ...pairs[i], value: e.currentTarget.value };
                                patch(r.id, { paramPairs: pairs });
                              }}
                            />
                            <button
                              type="button"
                              className="admin-btn admin-btn--ghost admin-btn--sm"
                              onClick={() =>
                                patch(r.id, {
                                  paramPairs: r.paramPairs.filter((_, j) => j !== i),
                                })
                              }
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          type="button"
                          className="admin-btn admin-btn--ghost admin-btn--sm"
                          style={{ alignSelf: 'flex-start' }}
                          onClick={() =>
                            patch(r.id, { paramPairs: [...r.paramPairs, { key: '', value: '' }] })
                          }
                        >
                          + Parametru
                        </button>
                      </div>
                      <small>
                        Se atașează evenimentului. Pentru linkuri se adaugă automat
                        <code> link_url</code> și <code>link_text</code>; pentru formulare
                        <code> form_id</code>.
                      </small>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
