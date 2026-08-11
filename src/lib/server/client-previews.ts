import { createReadStream } from 'node:fs';
import { mkdir, readdir, rm, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { and, desc, eq } from 'drizzle-orm';
import { getDb } from './db';
import { serverEnv } from './env';
import { clientPreviews } from './schema';
import { UPLOADS_DIR } from './uploads';

/**
 * Preview-uri de landing page pentru clienți, servite pe un host dedicat
 * (`client.simplead.ro`). Fișierele stau pe disc în volumul persistent, sub
 *
 *     $UPLOADS_DIR/clients/<client-slug>/<version-slug>/index.html
 *
 * iar în DB (`client_previews`) ținem doar metadatele. Consecința care contează
 * operațional: publicarea unei versiuni noi NU cere build sau redeploy.
 *
 * Spre deosebire de biblioteca media (`uploads.ts`, doar raster), aici acceptăm
 * HTML/JS/SVG — adică fișiere care execută cod. E o alegere conștientă, sprijinită
 * pe două lucruri: upload-ul e permis doar staff-ului (sau tokenului de publicare),
 * iar execuția se întâmplă pe un host separat de `simplead.ro`, deci nu atinge
 * sesiunea de admin și nici SEO-ul site-ului.
 */

/** Hostul dedicat preview-urilor. Suprascriptibil ca să poți testa local
 *  (`PREVIEW_HOST=localhost pnpm dev`) fără să atingi codul. */
export const PREVIEW_HOST = serverEnv('PREVIEW_HOST') ?? 'client.simplead.ro';

export const CLIENTS_DIR = path.join(UPLOADS_DIR, 'clients');

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_FILES_PER_VERSION = 50;
const MAX_SLUG_LENGTH = 60;

/** Slug acceptat în URL și ca nume de folder. Deliberat mai strict decât ce
 *  produce `slugifySegment`, ca să valideze și segmentele venite din URL. */
const SLUG_RE = /^[a-z0-9][a-z0-9-]{0,59}$/;

const MIME_BY_EXT: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.txt': 'text/plain; charset=utf-8',
};

export function contentTypeFor(file: string): string | null {
  return MIME_BY_EXT[path.extname(file).toLowerCase()] ?? null;
}

export function isHtml(file: string): boolean {
  return path.extname(file).toLowerCase() === '.html';
}

/**
 * Normalizează un text liber la un slug de URL. Spre deosebire de
 * `slugifyBase()` din uploads.ts NU adaugă sufix de timp: slug-urile ajung în
 * linkul trimis clientului, deci trebuie să fie stabile și lizibile.
 */
export function slugifySegment(raw: string): string {
  return raw
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, MAX_SLUG_LENGTH)
    .replace(/-+$/, '');
}

export function isValidSlug(slug: string): boolean {
  return SLUG_RE.test(slug);
}

/**
 * Rezolvă o cale relativă în interiorul folderului unei versiuni.
 * Întoarce null dacă slug-urile sunt invalide sau dacă rezultatul iese din
 * folder (path traversal) — aceeași strategie ca `resolveSafe()` din uploads.ts,
 * dar ancorată cu un nivel mai adânc.
 */
export function resolveInVersion(
  clientSlug: string,
  versionSlug: string,
  rel: string,
): string | null {
  if (!isValidSlug(clientSlug) || !isValidSlug(versionSlug)) return null;
  const base = path.join(CLIENTS_DIR, clientSlug, versionSlug);
  const full = path.resolve(base, rel);
  if (full !== base && !full.startsWith(base + path.sep)) return null;
  return full;
}

export function versionDir(clientSlug: string, versionSlug: string): string | null {
  return resolveInVersion(clientSlug, versionSlug, '.');
}

/** Curăță numele unui fișier încărcat, păstrând extensia. Fără separatori de cale. */
function sanitizeFileName(name: string): string | null {
  const ext = path.extname(path.basename(name)).toLowerCase();
  if (!MIME_BY_EXT[ext]) return null;
  const base = slugifySegment(path.basename(name, path.extname(name))) || 'fisier';
  return `${base}${ext}`;
}

// ---------------------------------------------------------------------------
// Metadate (DB)
// ---------------------------------------------------------------------------

export type PreviewRow = typeof clientPreviews.$inferSelect;

export type PreviewVersion = PreviewRow & {
  /** Adresa publică, gata de copiat în clipboard. */
  url: string;
  files: number;
  bytes: number;
  hasIndex: boolean;
};

export type PreviewClient = {
  clientSlug: string;
  versions: PreviewVersion[];
};

export function previewUrl(clientSlug: string, versionSlug?: string): string {
  return versionSlug
    ? `https://${PREVIEW_HOST}/${clientSlug}/${versionSlug}/`
    : `https://${PREVIEW_HOST}/${clientSlug}/`;
}

/**
 * Cache scurt peste tabelul de metadate: fiecare cerere de preview face altfel
 * un query ca să afle ce versiune e „live". Tabelul se schimbă doar la publicare
 * din admin/CLI, iar acele rute cheamă `invalidatePreviewCache()`.
 */
let cache: { rows: PreviewRow[]; at: number } | null = null;
const CACHE_MS = 15_000;

export function invalidatePreviewCache(): void {
  cache = null;
}

async function allRows(): Promise<PreviewRow[]> {
  if (cache && Date.now() - cache.at < CACHE_MS) return cache.rows;
  const db = getDb();
  if (!db) return [];
  try {
    const rows = await db.select().from(clientPreviews).orderBy(desc(clientPreviews.updatedAt));
    cache = { rows, at: Date.now() };
    return rows;
  } catch (err) {
    console.warn('[client-previews] Citirea metadatelor a eșuat:', err);
    return cache?.rows ?? [];
  }
}

/** Versiunea servită la /<client>/. Dacă niciuna nu e marcată explicit, cade pe
 *  cea mai recent actualizată — un link de client nu trebuie să dea 404 doar
 *  fiindcă flag-ul „live" a fost dezactivat. */
export async function findLiveVersion(clientSlug: string): Promise<PreviewRow | null> {
  const rows = (await allRows()).filter((r) => r.clientSlug === clientSlug);
  if (rows.length === 0) return null;
  return rows.find((r) => r.isLive) ?? rows[0];
}

export async function findVersion(
  clientSlug: string,
  versionSlug: string,
): Promise<PreviewRow | null> {
  const rows = await allRows();
  return rows.find((r) => r.clientSlug === clientSlug && r.versionSlug === versionSlug) ?? null;
}

async function dirStats(dir: string): Promise<{ files: number; bytes: number; hasIndex: boolean }> {
  let files = 0;
  let bytes = 0;
  let hasIndex = false;
  try {
    for (const entry of await readdir(dir, { recursive: true, withFileTypes: true })) {
      if (!entry.isFile()) continue;
      files += 1;
      try {
        bytes += (await stat(path.join(entry.parentPath, entry.name))).size;
      } catch {
        /* fișier șters între readdir și stat */
      }
    }
  } catch {
    return { files: 0, bytes: 0, hasIndex: false };
  }
  try {
    hasIndex = (await stat(path.join(dir, 'index.html'))).isFile();
  } catch {
    hasIndex = false;
  }
  return { files, bytes, hasIndex };
}

/** Lista completă pentru UI-ul de admin, grupată pe client. */
export async function listPreviews(): Promise<PreviewClient[]> {
  const db = getDb();
  if (!db) return [];
  let rows: PreviewRow[];
  try {
    rows = await db
      .select()
      .from(clientPreviews)
      .orderBy(clientPreviews.clientSlug, desc(clientPreviews.updatedAt));
  } catch (err) {
    console.warn('[client-previews] Listarea a eșuat:', err);
    return [];
  }

  const byClient = new Map<string, PreviewVersion[]>();
  for (const row of rows) {
    const dir = versionDir(row.clientSlug, row.versionSlug);
    const stats = dir ? await dirStats(dir) : { files: 0, bytes: 0, hasIndex: false };
    const list = byClient.get(row.clientSlug) ?? [];
    list.push({ ...row, url: previewUrl(row.clientSlug, row.versionSlug), ...stats });
    byClient.set(row.clientSlug, list);
  }
  return [...byClient.entries()].map(([clientSlug, versions]) => ({ clientSlug, versions }));
}

// ---------------------------------------------------------------------------
// Publicare
// ---------------------------------------------------------------------------

export type PublishInput = {
  client: string;
  version?: string;
  title?: string;
  files: File[];
  createdBy?: string | null;
  /** Șterge fișierele existente ale versiunii înainte de scriere. */
  replace?: boolean;
};

export type PublishResult =
  | { ok: true; clientSlug: string; versionSlug: string; url: string; written: string[] }
  | { ok: false; error: string };

/**
 * Scrie fișierele unei versiuni și face upsert pe rândul de metadate.
 *
 * Reguli de denumire: dacă lotul are exact un fișier HTML, el devine
 * `index.html` (cazul obișnuit — un singur landing page exportat cu orice nume).
 * Dacă are mai multe, numele se păstrează (curățate) și unul dintre ele trebuie
 * să fie `index.html`.
 */
export async function publishVersion(input: PublishInput): Promise<PublishResult> {
  const clientSlug = slugifySegment(input.client);
  const versionSlug = slugifySegment(input.version || 'v1');

  if (!isValidSlug(clientSlug)) return { ok: false, error: 'Slug de client invalid.' };
  if (!isValidSlug(versionSlug)) return { ok: false, error: 'Slug de versiune invalid.' };
  if (input.files.length === 0) return { ok: false, error: 'Niciun fișier de încărcat.' };
  if (input.files.length > MAX_FILES_PER_VERSION) {
    return { ok: false, error: `Maximum ${MAX_FILES_PER_VERSION} fișiere per versiune.` };
  }

  const htmlFiles = input.files.filter((f) => isHtml(f.name));
  const renameToIndex = htmlFiles.length === 1 ? htmlFiles[0] : null;

  // Validăm TOT lotul înainte să scriem ceva, ca să nu rămână o versiune pe
  // jumătate publicată dacă al treilea fișier e respins.
  const planned: { name: string; bytes: Uint8Array }[] = [];
  for (const file of input.files) {
    if (file.size === 0) return { ok: false, error: `„${file.name}" e gol.` };
    if (file.size > MAX_FILE_BYTES) {
      return { ok: false, error: `„${file.name}" depășește 10 MB.` };
    }
    const name = file === renameToIndex ? 'index.html' : sanitizeFileName(file.name);
    if (!name) {
      return { ok: false, error: `Extensie neacceptată pentru „${file.name}".` };
    }
    if (!resolveInVersion(clientSlug, versionSlug, name)) {
      return { ok: false, error: `Nume de fișier invalid: „${file.name}".` };
    }
    planned.push({ name, bytes: new Uint8Array(await file.arrayBuffer()) });
  }

  if (!renameToIndex && !planned.some((p) => p.name === 'index.html')) {
    return {
      ok: false,
      error: 'Lotul are mai multe fișiere HTML: unul dintre ele trebuie să se numească index.html.',
    };
  }

  const dir = versionDir(clientSlug, versionSlug);
  if (!dir) return { ok: false, error: 'Cale invalidă.' };

  try {
    if (input.replace) await rm(dir, { recursive: true, force: true });
    await mkdir(dir, { recursive: true });
    for (const { name, bytes } of planned) {
      await writeFile(path.join(dir, name), bytes);
    }
  } catch (err) {
    console.error('[client-previews] Scrierea pe disc a eșuat:', err);
    return { ok: false, error: 'Scrierea fișierelor a eșuat (verifică volumul uploads).' };
  }

  const db = getDb();
  if (db) {
    try {
      // Prima versiune a unui client devine automat „live", ca linkul scurt
      // /<client>/ să funcționeze imediat după primul upload.
      const existing = await db
        .select({ id: clientPreviews.id })
        .from(clientPreviews)
        .where(eq(clientPreviews.clientSlug, clientSlug))
        .limit(1);
      const isFirst = existing.length === 0;

      await db
        .insert(clientPreviews)
        .values({
          clientSlug,
          versionSlug,
          title: input.title?.trim() || '',
          isLive: isFirst,
          createdBy: input.createdBy ?? null,
        })
        .onConflictDoUpdate({
          target: [clientPreviews.clientSlug, clientPreviews.versionSlug],
          set: {
            updatedAt: new Date(),
            ...(input.title?.trim() ? { title: input.title.trim() } : {}),
          },
        });
    } catch (err) {
      console.error('[client-previews] Salvarea metadatelor a eșuat:', err);
      return { ok: false, error: 'Fișierele au fost scrise, dar metadatele nu s-au salvat.' };
    }
  }

  invalidatePreviewCache();
  return {
    ok: true,
    clientSlug,
    versionSlug,
    url: previewUrl(clientSlug, versionSlug),
    written: planned.map((p) => p.name),
  };
}

/** Marchează o versiune ca „live" și o demarchează pe precedenta, atomic. */
export async function setLiveVersion(id: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    const [row] = await db.select().from(clientPreviews).where(eq(clientPreviews.id, id)).limit(1);
    if (!row) return false;
    await db.transaction(async (tx) => {
      await tx
        .update(clientPreviews)
        .set({ isLive: false })
        .where(eq(clientPreviews.clientSlug, row.clientSlug));
      await tx.update(clientPreviews).set({ isLive: true }).where(eq(clientPreviews.id, id));
    });
    invalidatePreviewCache();
    return true;
  } catch (err) {
    console.error('[client-previews] Marcarea „live" a eșuat:', err);
    return false;
  }
}

export async function renameVersionTitle(id: string, title: string): Promise<boolean> {
  const db = getDb();
  if (!db) return false;
  try {
    await db
      .update(clientPreviews)
      .set({ title: title.trim(), updatedAt: new Date() })
      .where(eq(clientPreviews.id, id));
    invalidatePreviewCache();
    return true;
  } catch (err) {
    console.error('[client-previews] Redenumirea a eșuat:', err);
    return false;
  }
}

/** Șterge rândul + folderul versiunii (și folderul clientului dacă rămâne gol). */
export async function deleteVersion(id: string): Promise<PreviewRow | null> {
  const db = getDb();
  if (!db) return null;
  try {
    const [row] = await db.select().from(clientPreviews).where(eq(clientPreviews.id, id)).limit(1);
    if (!row) return null;

    await db.delete(clientPreviews).where(eq(clientPreviews.id, id));

    const dir = versionDir(row.clientSlug, row.versionSlug);
    if (dir) await rm(dir, { recursive: true, force: true });

    const remaining = await db
      .select()
      .from(clientPreviews)
      .where(eq(clientPreviews.clientSlug, row.clientSlug));
    if (remaining.length === 0) {
      await rm(path.join(CLIENTS_DIR, row.clientSlug), { recursive: true, force: true });
    } else if (row.isLive) {
      // Am șters versiunea live: promovăm alta, ca /<client>/ să rămână valid.
      await db
        .update(clientPreviews)
        .set({ isLive: true })
        .where(
          and(
            eq(clientPreviews.clientSlug, row.clientSlug),
            eq(clientPreviews.id, remaining[0].id),
          ),
        );
    }

    invalidatePreviewCache();
    return row;
  } catch (err) {
    console.error('[client-previews] Ștergerea a eșuat:', err);
    return null;
  }
}

// ---------------------------------------------------------------------------
// Citire pentru servire
// ---------------------------------------------------------------------------

export async function openPreviewFile(
  clientSlug: string,
  versionSlug: string,
  rel: string,
): Promise<{ stream: NodeJS.ReadableStream; type: string; size: number } | null> {
  const full = resolveInVersion(clientSlug, versionSlug, rel);
  if (!full) return null;
  const type = contentTypeFor(full);
  if (!type) return null;
  try {
    const s = await stat(full);
    if (!s.isFile()) return null;
    return { stream: createReadStream(full), type, size: s.size };
  } catch {
    return null;
  }
}

export async function clientsDirWritable(): Promise<boolean> {
  try {
    await mkdir(CLIENTS_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}
