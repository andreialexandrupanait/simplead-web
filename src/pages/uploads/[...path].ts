import type { APIRoute } from 'astro';
import { Readable } from 'node:stream';
import { openUpload } from '@lib/server/uploads';

export const prerender = false;

/**
 * Servește fișierele din biblioteca media (volumul UPLOADS_DIR) sub /uploads/*.
 * Numele fișierelor sunt unice (sufix de timp la upload), deci cache-ul poate
 * fi agresiv. Path traversal e blocat în resolveSafe().
 */
export const GET: APIRoute = async ({ params }) => {
  const rel = params.path ?? '';
  const file = await openUpload(rel);
  if (!file) return new Response(null, { status: 404 });

  return new Response(Readable.toWeb(file.stream as Readable) as ReadableStream, {
    headers: {
      'Content-Type': file.type,
      'Content-Length': String(file.size),
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
