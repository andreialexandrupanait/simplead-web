import type { APIRoute } from 'astro';
import { renderMarkdown } from '@lib/server/markdown';
import { can } from '@lib/server/authz';

export const prerender = false;

/**
 * Preview pentru editorul din admin: rulează EXACT același renderer sanitizat
 * ca paginile publice, deci ce vezi în preview e ce se publică.
 * Middleware-ul gate-uiește staff-ul; aici cerem explicit capabilitatea de
 * editare conținut (defense-in-depth).
 */
export const POST: APIRoute = async ({ request }) => {
  if (!(await can(request.headers, { content: ['edit-own'] }))) {
    return new Response(JSON.stringify({ error: 'Interzis.' }), { status: 403 });
  }
  let markdown = '';
  try {
    const body = (await request.json()) as { markdown?: string };
    markdown = String(body.markdown ?? '');
  } catch {
    return new Response(JSON.stringify({ error: 'JSON invalid.' }), { status: 400 });
  }
  if (markdown.length > 200_000) {
    return new Response(JSON.stringify({ error: 'Conținut prea mare.' }), { status: 413 });
  }
  return new Response(JSON.stringify({ html: renderMarkdown(markdown) }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
