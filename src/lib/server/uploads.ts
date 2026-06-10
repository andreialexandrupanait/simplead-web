import { createReadStream } from 'node:fs';
import { mkdir, readdir, stat, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { serverEnv } from './env';

/**
 * Biblioteca media a admin-ului: fișiere pe disc într-un volum persistent
 * (UPLOADS_DIR, montat în docker-compose), servite public prin
 * /uploads/[...path]. Doar formate raster — SVG e respins (poate conține
 * scripturi), iar conținutul e verificat pe magic bytes, nu doar pe extensie.
 */

export const UPLOADS_DIR = path.resolve(serverEnv('UPLOADS_DIR') ?? './uploads');

const MAX_BYTES = 5 * 1024 * 1024;

const MIME_BY_EXT: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
};

function sniffExt(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return '.jpg';
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47)
    return '.png';
  const ascii = (from: number, to: number) => String.fromCharCode(...bytes.slice(from, to));
  if (ascii(0, 4) === 'RIFF' && ascii(8, 12) === 'WEBP') return '.webp';
  if (ascii(4, 8) === 'ftyp' && ascii(8, 12).startsWith('avif')) return '.avif';
  return null;
}

function slugifyBase(name: string): string {
  const base = path.basename(name, path.extname(name));
  const slug = base
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return slug || 'imagine';
}

/** Rezolvă o cale relativă în interiorul UPLOADS_DIR; null dacă iese din rădăcină. */
export function resolveSafe(rel: string): string | null {
  const full = path.resolve(UPLOADS_DIR, rel);
  if (full !== UPLOADS_DIR && !full.startsWith(UPLOADS_DIR + path.sep)) return null;
  return full;
}

export function contentTypeFor(file: string): string | null {
  return MIME_BY_EXT[path.extname(file).toLowerCase()] ?? null;
}

export type SavedUpload = { name: string; url: string };

export async function saveUpload(
  file: File,
): Promise<{ ok: true; upload: SavedUpload } | { ok: false; error: string }> {
  if (file.size === 0) return { ok: false, error: 'Fișierul e gol.' };
  if (file.size > MAX_BYTES) return { ok: false, error: 'Fișierul depășește 5 MB.' };

  const bytes = new Uint8Array(await file.arrayBuffer());
  const sniffed = sniffExt(bytes);
  if (!sniffed) {
    return { ok: false, error: 'Format neacceptat. Folosește JPG, PNG, WebP sau AVIF.' };
  }

  const name = `${slugifyBase(file.name)}-${Date.now().toString(36)}${sniffed}`;
  const full = resolveSafe(name);
  if (!full) return { ok: false, error: 'Nume de fișier invalid.' };

  await mkdir(UPLOADS_DIR, { recursive: true });
  await writeFile(full, bytes);
  return { ok: true, upload: { name, url: `/uploads/${name}` } };
}

export type UploadEntry = { name: string; url: string; size: number; modifiedAt: string };

export async function listUploads(): Promise<UploadEntry[]> {
  try {
    const names = await readdir(UPLOADS_DIR);
    const entries = await Promise.all(
      names
        .filter((n) => MIME_BY_EXT[path.extname(n).toLowerCase()])
        .map(async (name) => {
          const s = await stat(path.join(UPLOADS_DIR, name));
          return {
            name,
            url: `/uploads/${name}`,
            size: s.size,
            modifiedAt: s.mtime.toISOString(),
          };
        }),
    );
    return entries.sort((a, b) => b.modifiedAt.localeCompare(a.modifiedAt));
  } catch {
    return [];
  }
}

export async function deleteUpload(name: string): Promise<boolean> {
  const full = resolveSafe(name);
  if (!full || !contentTypeFor(full)) return false;
  try {
    await unlink(full);
    return true;
  } catch {
    return false;
  }
}

/** Stream pentru ruta publică /uploads/[...path]. */
export async function openUpload(
  rel: string,
): Promise<{ stream: NodeJS.ReadableStream; type: string; size: number } | null> {
  const full = resolveSafe(rel);
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

export async function uploadsWritable(): Promise<boolean> {
  try {
    await mkdir(UPLOADS_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}
