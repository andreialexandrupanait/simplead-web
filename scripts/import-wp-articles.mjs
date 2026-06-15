// Import unic al articolelor publicate din vechiul WordPress (dump SQL) în tabela
// `posts`. Oglindește pattern-ul din scripts/seed.mjs (postgres + DATABASE_URL,
// insert … on conflict (slug) do update → idempotent).
//
// Folosire:
//   node --env-file=.env scripts/import-wp-articles.mjs           # import ca DRAFT
//   node --env-file=.env scripts/import-wp-articles.mjs --publish  # status=published
//   node scripts/import-wp-articles.mjs --dry                      # doar afișează, fără DB
//   ... --sql=<cale>   (implicit: simplead3_sad1.sql din root)
//   ... --slug=<slug>  (în --dry: afișează Markdown-ul complet al unui articol)
//
// Decizii (vezi planul): fără imagini (cover=null, img scoase), embed-uri → link-uri,
// categorii mapate manual mai jos. La conflict NU suprascrie `cover` (păstrează ce
// s-a adăugat eventual din /admin).

import fs from 'node:fs';
import path from 'node:path';

const BS = String.fromCharCode(92);
const args = process.argv.slice(2);
const DRY = args.includes('--dry');
const PUBLISH = args.includes('--publish');
const STATUS = PUBLISH ? 'published' : 'draft';
const sqlPathArg = args.find((a) => a.startsWith('--sql='))?.slice(6);
const slugArg = args.find((a) => a.startsWith('--slug='))?.slice(7);
const SQL_PATH = path.resolve(sqlPathArg ?? 'simplead3_sad1.sql');

// ── Maparea categoriilor WP → cele 5 categorii de pe site (data/categories.ts) ──
// '' = fără categorie (articolul apare în /blog, dar nu sub o categorie).
const CATEGORY = {
  '5-motive-sa-ai-o-identitate-vizuala-profesionista-atunci-cand-iti-lansezi-afacerea-online':
    'Branding',
  'cand-lucrezi-singur-si-cand-apelezi-la-o-agentie-pentru-a-ti-construi-un-brand': 'Branding',
  'strategie-de-brand': 'Branding',
  'branduri-care-promoveaza-distantarea-sociala': 'Branding',
  'cele-mai-cunoscute-logo-uri': 'Branding',
  'cele-mai-bune-campanii-publicitare-din-2020': 'Marketing digital',
  'cele-mai-bune-5-campanii-publicitare-de-craciun': 'Marketing digital',
  'parallax-scrolling-websites': 'Web & UX',
  'top-5-website-uri-dezvoltate-cu-elementor-in-2020': 'Web & UX',
  'imbunatateste-website-readability': 'Web & UX',
  'bad-design-vs-good-design': 'Web & UX',
  '5-mituri-despre-web-design-si-adevarurile-despre-ele': 'Web & UX',
  '6-exemple-de-site-uri-cu-un-design-alb-negru': 'Web & UX',
  'blog-uri-de-design': 'Grafică',
  'sfaturi-pentru-designeri': 'Grafică',
  '6-filme-despre-design': 'Grafică',
  'podcasturi-ebookuri-pentru-designeri': 'Grafică',
  '5-fotografi-pe-care-sa-ii-urmaresti-pe-instagram': 'Grafică',
  'frica-de-esec': '',
  '5-carti': '',
  '4-greutati-care-vin-odata-cu-munca-remote': '',
  'cat-de-mult-te-poate-ajuta-sa-vii-cu-cainele-sau-pisica-la-birou': '',
  'cum-sa-ramai-concentrat-si-productiv': '',
};

// ── Parser de dump mysqldump ────────────────────────────────────────────────
const sqlText = fs.readFileSync(SQL_PATH, 'utf8');

function unescChar(nx) {
  if (nx === 'n') return '\n';
  if (nx === 't') return '\t';
  if (nx === 'r') return '\r';
  if (nx === '0') return '';
  return nx; // \\ → \ , \' → ' , \" → " , etc.
}

/** Parsează toate INSERT-urile unei tabele → array de obiecte (col→val). */
function parseTable(table) {
  const out = [];
  const marker = 'INSERT INTO `' + table + '` (';
  let pos = 0;
  while ((pos = sqlText.indexOf(marker, pos)) !== -1) {
    const colEnd = sqlText.indexOf(')', pos);
    const cols = sqlText
      .slice(pos + marker.length, colEnd)
      .split(',')
      .map((s) => s.trim().replace(/`/g, ''));
    let i = sqlText.indexOf('VALUES', colEnd) + 6;
    const N = sqlText.length;
    while (i < N) {
      while (i < N && /[\s,]/.test(sqlText[i])) i++;
      if (sqlText[i] === ';') {
        i++;
        break;
      }
      if (sqlText[i] !== '(') break;
      i++;
      const f = [];
      let cur = '';
      let inStr = false;
      let isNull = false;
      while (i < N) {
        const c = sqlText[i];
        if (inStr) {
          if (c === BS) {
            cur += unescChar(sqlText[i + 1]);
            i += 2;
            continue;
          }
          if (c === "'") {
            inStr = false;
            i++;
            continue;
          }
          cur += c;
          i++;
          continue;
        } else {
          if (c === "'") {
            inStr = true;
            cur = '';
            i++;
            continue;
          }
          if (c === ',') {
            f.push(isNull ? null : cur.trim());
            cur = '';
            isNull = false;
            i++;
            continue;
          }
          if (c === ')') {
            f.push(isNull ? null : cur.trim());
            i++;
            break;
          }
          cur += c;
          if (cur.trim() === 'NULL') isNull = true;
          i++;
          continue;
        }
      }
      const o = {};
      cols.forEach((cn, idx) => (o[cn] = f[idx]));
      out.push(o);
    }
    pos = i;
  }
  return out;
}

// ── Decodare entități + conversie HTML Gutenberg → Markdown ─────────────────
function decodeEntities(s) {
  return s
    // Token Rank Math: `%` (și delimitatorul de variabile %var%) e stocat ca {hash64}.
    .replace(/\{[0-9a-f]{64}\}/g, '%')
    .replace(/&nbsp;/g, ' ')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&laquo;/g, '«')
    .replace(/&raquo;/g, '»')
    .replace(/&ndash;|&#8211;/g, '–')
    .replace(/&mdash;|&#8212;/g, '—')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;|&#x27;|&apos;/gi, "'")
    .replace(/&eacute;/g, 'é')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&'); // ultimul, ca să nu re-decodeze
}

function stripTags(s) {
  return s.replace(/<[^>]+>/g, '');
}

/** Curăță un URL din HTML/JSON: `\/`→`/`, escape-uri `\uXXXX` (ex. &→&), &amp;. */
function cleanUrl(u) {
  return u
    .replace(/\\\//g, '/')
    .replace(/\\u([0-9a-fA-F]{4})/g, (_m, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&amp;/g, '&')
    .trim();
}

/** `[text](url)` păstrând spațiile de la marginile textului ancorei (în afara link-ului). */
function mdLink(href, inner) {
  const raw = stripTags(inner).replace(/\s+/g, ' ');
  const lead = raw.startsWith(' ') ? ' ' : '';
  const trail = raw.endsWith(' ') ? ' ' : '';
  return `${lead}[${decodeEntities(raw.trim())}](${cleanUrl(href)})${trail}`;
}

/** Convertește o bucată de HTML inline (link/bold/italic/br) în Markdown. */
function inline(s) {
  s = s.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, txt) =>
    mdLink(href, txt),
  );
  s = s.replace(/<\/?(strong|b)\b[^>]*>/gi, '**');
  s = s.replace(/<\/?(em|i)\b[^>]*>/gi, '*');
  s = s.replace(/<br\s*\/?>/gi, '  \n');
  s = stripTags(s);
  return decodeEntities(s).replace(/[ \t]+/g, ' ').trim();
}

function htmlToMarkdown(html) {
  let s = html;

  // Embed-uri (YouTube/Vimeo/Instagram/Twitter/Facebook) → link pe linie proprie.
  s = s.replace(
    /<!-- wp:(core-embed\/[\w-]+|embed)([\s\S]*?)-->([\s\S]*?)<!-- \/wp:\1 -->/g,
    (_m, blk, attrs, inner) => {
      let url = '';
      const um = attrs.match(/"url":"([^"]+)"/);
      if (um) url = um[1];
      if (!url) {
        const um2 = inner.match(/https?:\/\/[^\s<"]+/);
        if (um2) url = um2[0];
      }
      url = cleanUrl(url);
      let prov = '';
      const pm = attrs.match(/"providerNameSlug":"([^"]+)"/);
      if (pm) prov = pm[1];
      else {
        const cm = blk.match(/core-embed\/([\w-]+)/);
        if (cm) prov = cm[1];
      }
      const label = prov ? `Vezi pe ${prov.charAt(0).toUpperCase()}${prov.slice(1)}` : 'Vezi link';
      return url ? `\n\n[${label}](${url})\n\n` : '\n\n';
    },
  );

  // Imagini & galerii → scoase complet (decizie: fără imagini acum).
  s = s.replace(/<!-- wp:image[\s\S]*?<!-- \/wp:image -->/g, '\n\n');
  s = s.replace(/<!-- wp:gallery[\s\S]*?<!-- \/wp:gallery -->/g, '\n\n');

  // Restul comentariilor Gutenberg → separator de paragraf.
  s = s.replace(/<!--[\s\S]*?-->/g, '\n\n');

  // Resturi de figuri/imagini rătăcite.
  s = s.replace(/<figure[\s\S]*?<\/figure>/gi, '\n\n');
  s = s.replace(/<img[^>]*>/gi, '');

  // Titluri (sanitizer-ul public acceptă doar h2–h4; h1 → h2).
  s = s.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/gi, (_m, t) => `\n\n## ${inline(t)}\n\n`);
  s = s.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, (_m, t) => `\n\n## ${inline(t)}\n\n`);
  s = s.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, (_m, t) => `\n\n### ${inline(t)}\n\n`);
  s = s.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/gi, (_m, t) => `\n\n#### ${inline(t)}\n\n`);

  // Liste.
  s = s.replace(/<(ul|ol)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_m, tag, innerList) => {
    const ordered = tag.toLowerCase() === 'ol';
    let n = 0;
    const items = [];
    innerList.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_mm, li) => {
      n++;
      items.push((ordered ? `${n}. ` : '- ') + inline(li));
      return '';
    });
    return '\n\n' + items.join('\n') + '\n\n';
  });

  // Citate.
  s = s.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_m, t) => {
    const txt = inline(t.replace(/<p[^>]*>/gi, '').replace(/<\/p>/gi, '\n'));
    const lines = txt
      .split('\n')
      .map((x) => x.trim())
      .filter(Boolean)
      .map((x) => `> ${x}`);
    return '\n\n' + lines.join('\n') + '\n\n';
  });

  // Linie orizontală.
  s = s.replace(/<hr[^>]*>/gi, '\n\n---\n\n');

  // Paragrafe.
  s = s.replace(/<p[^>]*>([\s\S]*?)<\/p>/gi, (_m, t) => `\n\n${inline(t)}\n\n`);

  // Wrappere rămase + text „gol" (paragrafe Gutenberg fără <p>).
  s = s.replace(/<\/?div[^>]*>/gi, '\n\n');

  // Pas final de inline pe textul rămas neîmpachetat.
  s = s.replace(/<a\b[^>]*\bhref="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, txt) =>
    mdLink(href, txt),
  );
  s = s
    .replace(/<\/?(strong|b)\b[^>]*>/gi, '**')
    .replace(/<\/?(em|i)\b[^>]*>/gi, '*')
    .replace(/<br\s*\/?>/gi, '  \n');
  s = stripTags(s);
  s = decodeEntities(s);

  // Curățare spații.
  s = s
    .replace(/\r/g, '')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]{2,}/g, ' ')
    .trim();
  return s;
}

/** Excerpt simplu din Markdown (fallback pt. description). */
function excerptFrom(md, max = 160) {
  const plain = md
    .replace(/[#>*_`[\]]/g, '')
    .replace(/\(https?:[^)]*\)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length <= max ? plain : `${plain.slice(0, max - 1).trimEnd()}…`;
}

// ── Construiește articolele ─────────────────────────────────────────────────
const posts = parseTable('sad4u_posts');
const postmeta = parseTable('sad4u_postmeta');
const terms = parseTable('sad4u_terms');
const termTax = parseTable('sad4u_term_taxonomy');
const termRel = parseTable('sad4u_term_relationships');

// term_taxonomy_id → nume term, doar pt. taxonomia post_tag
const tagNameByTT = {};
for (const tt of termTax) {
  if (tt.taxonomy !== 'post_tag') continue;
  const term = terms.find((t) => t.term_id === tt.term_id);
  if (term) tagNameByTT[tt.term_taxonomy_id] = term.name;
}

// post_id → meta_value, pe cheie
function metaFor(postId, key) {
  const row = postmeta.find((m) => m.post_id === postId && m.meta_key === key);
  return row ? row.meta_value : null;
}

const published = posts
  .filter((p) => p.post_type === 'post' && p.post_status === 'publish')
  .sort((a, b) => (a.post_date < b.post_date ? 1 : -1));

const articles = published.map((p) => {
  const slug = p.post_name;
  const title = decodeEntities(p.post_title);
  const body = htmlToMarkdown(p.post_content);

  const rmDesc = metaFor(p.ID, 'rank_math_description');
  const description = rmDesc ? decodeEntities(rmDesc).trim() : excerptFrom(body);

  const rmTitle = metaFor(p.ID, 'rank_math_title');
  // Sărim titlurile-șablon Rank Math (conțin placeholder-e {hash}).
  const seoTitle = rmTitle && !rmTitle.includes('{') ? decodeEntities(rmTitle).trim() : null;

  const tags = termRel
    .filter((r) => r.object_id === p.ID)
    .map((r) => tagNameByTT[r.term_taxonomy_id])
    .filter(Boolean)
    .map((t) => decodeEntities(t));

  const category = CATEGORY[slug];
  if (category === undefined) console.warn(`[warn] slug fără mapare de categorie: ${slug}`);

  return {
    slug,
    title,
    description,
    body,
    category: category ?? '',
    tags,
    seoTitle,
    publishedAt: p.post_date,
  };
});

console.info(`Articole pregătite: ${articles.length} (status la import: ${STATUS})`);

// ── Mod DRY: afișează și ieși ───────────────────────────────────────────────
if (DRY) {
  if (slugArg) {
    const a = articles.find((x) => x.slug === slugArg);
    if (!a) {
      console.error(`Nu există slug-ul ${slugArg}`);
      process.exit(1);
    }
    console.log('\n========================================');
    console.log('TITLE:', a.title);
    console.log('SLUG :', a.slug, '| CATEGORY:', a.category || '(gol)', '| DATE:', a.publishedAt);
    console.log('SEO  :', a.seoTitle || '(folosește title)');
    console.log('DESC :', a.description);
    console.log('TAGS :', a.tags.join(', ') || '(fără)');
    console.log('---------------- BODY (Markdown) ----------------\n');
    console.log(a.body);
  } else {
    for (const a of articles) {
      console.log(
        `- ${a.slug}\n    cat=${a.category || '(gol)'} | tags=[${a.tags.join(', ')}] | ` +
          `body=${a.body.length}ch | seo=${a.seoTitle ? 'da' : 'nu'}\n    desc: ${a.description}`,
      );
    }
  }
  process.exit(0);
}

// ── Insert în DB ────────────────────────────────────────────────────────────
const url = process.env.DATABASE_URL?.trim();
if (!url) {
  console.error('[import] DATABASE_URL lipsește. Rulează cu: node --env-file=.env scripts/import-wp-articles.mjs');
  process.exit(1);
}

const { default: postgres } = await import('postgres');
const db = postgres(url, { max: 1 });
try {
  let n = 0;
  for (const a of articles) {
    await db`
      insert into posts (slug, title, description, body, category, tags, cover, status, published_at, seo_title)
      values (${a.slug}, ${a.title}, ${a.description}, ${a.body}, ${a.category},
              ${db.json(a.tags)}, ${null}, ${STATUS}, ${a.publishedAt}, ${a.seoTitle})
      on conflict (slug) do update set
        title = excluded.title,
        description = excluded.description,
        body = excluded.body,
        category = excluded.category,
        tags = excluded.tags,
        status = excluded.status,
        published_at = excluded.published_at,
        seo_title = excluded.seo_title,
        updated_at = now()
    `;
    n++;
  }
  console.info(`[import] Gata: ${n} articole inserate/actualizate (status=${STATUS}).`);
} catch (err) {
  console.error('[import] Importul a eșuat:', err);
  process.exit(1);
} finally {
  await db.end();
}
