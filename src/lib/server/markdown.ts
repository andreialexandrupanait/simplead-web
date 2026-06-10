import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';

/**
 * Singura cale prin care Markdown-ul din DB devine HTML public. Randarea și
 * sanitizarea stau împreună ca preview-ul din admin (/api/admin/preview) și
 * paginile publice să fie identice prin construcție.
 */

const SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    'p',
    'h2',
    'h3',
    'h4',
    'ul',
    'ol',
    'li',
    'a',
    'strong',
    'em',
    'blockquote',
    'code',
    'pre',
    'img',
    'hr',
    'br',
    'table',
    'thead',
    'tbody',
    'tr',
    'th',
    'td',
  ],
  allowedAttributes: {
    a: ['href', 'title'],
    img: ['src', 'alt', 'title', 'loading'],
    th: ['align'],
    td: ['align'],
  },
  allowedSchemes: ['https', 'http', 'mailto', 'tel'],
  // Imaginile pot fi și relative (/uploads/...).
  allowProtocolRelative: false,
  transformTags: {
    a: sanitizeHtml.simpleTransform('a', { rel: 'noopener' }),
    img: sanitizeHtml.simpleTransform('img', { loading: 'lazy' }),
  },
};

export function renderMarkdown(md: string): string {
  if (!md.trim()) return '';
  const html = marked.parse(md, { gfm: true, async: false });
  return sanitizeHtml(html, SANITIZE_OPTIONS);
}

/** Timp de citire estimat (~200 cuvinte/minut, minim 1 minut). */
export function readingMinutes(md: string): number {
  const words = md.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Primele `max` caractere de text simplu (fără sintaxă Markdown), pentru excerpt-uri. */
export function excerpt(md: string, max = 160): string {
  const plain = sanitizeHtml(marked.parse(md, { gfm: true, async: false }), {
    allowedTags: [],
    allowedAttributes: {},
  })
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length <= max ? plain : `${plain.slice(0, max - 1).trimEnd()}…`;
}
