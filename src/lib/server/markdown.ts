import { marked, Renderer } from 'marked';
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

export interface TocItem {
  depth: number;
  text: string;
  slug: string;
}

// Pagina de articol are nevoie de id-uri pe titluri (ancore + cuprins), deci
// permitem `id` pe heading-uri DOAR aici. Slug-urile sunt generate de noi,
// nu vin din userland brut.
const ARTICLE_SANITIZE_OPTIONS: sanitizeHtml.IOptions = {
  ...SANITIZE_OPTIONS,
  allowedAttributes: {
    ...SANITIZE_OPTIONS.allowedAttributes,
    h2: ['id'],
    h3: ['id'],
    h4: ['id'],
  },
};

/** Diacritice RO + orice → slug ascii pentru ancore (#sectiune). */
function slugify(s: string): string {
  return (
    s
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'sectiune'
  );
}

/** Decodează entitățile uzuale ca textul din cuprins să fie lizibil (nu `&quot;`). */
function decodeEntities(s: string): string {
  return s
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&#x27;/gi, "'")
    .replace(/&apos;/g, "'")
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&'); // ultimul, ca să nu re-decodeze
}

function uniqueSlug(base: string, used: Map<string, number>): string {
  const n = used.get(base) ?? 0;
  used.set(base, n + 1);
  return n === 0 ? base : `${base}-${n + 1}`;
}

/**
 * Ca `renderMarkdown`, dar pune `id` pe H2/H3/H4 și întoarce cuprinsul (H2+H3)
 * pentru sidebar-ul sticky de pe pagina de articol. Folosit doar de /blog/[slug].
 */
export function renderArticle(md: string): { html: string; toc: TocItem[]; minutes: number } {
  const minutes = readingMinutes(md);
  if (!md.trim()) return { html: '', toc: [], minutes };

  const toc: TocItem[] = [];
  const used = new Map<string, number>();
  const renderer = new Renderer();
  renderer.heading = function (this: any, { tokens, depth }: any) {
    const inline: string = this.parser.parseInline(tokens);
    const text = decodeEntities(inline.replace(/<[^>]+>/g, '')).trim();
    const slug = uniqueSlug(slugify(text), used);
    if (depth === 2 || depth === 3) toc.push({ depth, text, slug });
    return `<h${depth} id="${slug}">${inline}</h${depth}>\n`;
  };

  const html = marked.parse(md, { gfm: true, async: false, renderer });
  return { html: sanitizeHtml(html, ARTICLE_SANITIZE_OPTIONS), toc, minutes };
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
