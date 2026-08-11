#!/usr/bin/env node
// Publică un landing page de client pe client.simplead.ro dintr-o singură comandă.
//
//   sad-publish beauty-pack-landing.html liposomals v2
//   sad-publish index.html hero.webp --client liposomals --version v3 --replace
//
// Configurare (env sau ~/.config/simplead/publish.env):
//   PUBLISH_TOKEN=...                  (obligatoriu, vezi `pnpm gen:key`)
//   PUBLISH_URL=https://simplead.ro    (opțional, asta e valoarea implicită)
//
// Ruta /api/publish e protejată DOAR de token, deci fișierul de config trebuie
// să rămână cu drepturi 600.

import { readFile, stat } from 'node:fs/promises';
import { basename, extname, join } from 'node:path';
import { homedir } from 'node:os';

const CONFIG_PATH = join(homedir(), '.config', 'simplead', 'publish.env');

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.mjs': 'text/javascript',
  '.json': 'application/json',
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
  '.txt': 'text/plain',
};

function die(msg) {
  console.error(`✗ ${msg}`);
  process.exit(1);
}

const USAGE = `Folosire:
  sad-publish <fișier...> <client> [versiune]
  sad-publish <fișier...> --client <slug> [--version <slug>] [--title "..."] [--replace]

Opțiuni:
  --client, -c    slug-ul clientului (apare în link)
  --version, -v   slug-ul versiunii (implicit: v1)
  --title, -t     etichetă umană, afișată în admin
  --replace       șterge fișierele existente ale versiunii înainte de încărcare
`;

/** Citește un fișier .env simplu (KEY=value, fără ghilimele obligatorii). */
async function loadConfig() {
  try {
    const text = await readFile(CONFIG_PATH, 'utf8');
    for (const line of text.split('\n')) {
      const m = /^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/.exec(line);
      if (!m) continue;
      const value = m[2].replace(/^["']|["']$/g, '');
      if (!process.env[m[1]]) process.env[m[1]] = value;
    }
  } catch {
    /* fără fișier de config: mergem doar pe environment */
  }
}

function parseArgs(argv) {
  const files = [];
  const positional = [];
  const opts = { replace: false };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') {
      console.log(USAGE);
      process.exit(0);
    } else if (arg === '--replace') {
      opts.replace = true;
    } else if (arg === '--client' || arg === '-c') {
      opts.client = argv[++i];
    } else if (arg === '--version' || arg === '-v') {
      opts.version = argv[++i];
    } else if (arg === '--title' || arg === '-t') {
      opts.title = argv[++i];
    } else if (arg.startsWith('-')) {
      die(`Opțiune necunoscută: ${arg}\n\n${USAGE}`);
    } else if (MIME[extname(arg).toLowerCase()]) {
      files.push(arg);
    } else {
      positional.push(arg);
    }
  }

  // Forma scurtă: fișierele se recunosc după extensie, restul pozițiilor sunt
  // client și versiune, în ordinea asta.
  if (!opts.client) opts.client = positional.shift();
  if (!opts.version) opts.version = positional.shift();

  return { files, opts };
}

await loadConfig();

const { files, opts } = parseArgs(process.argv.slice(2));

const token = process.env.PUBLISH_TOKEN;
const baseUrl = (process.env.PUBLISH_URL ?? 'https://simplead.ro').replace(/\/+$/, '');

if (!token) {
  die(
    `PUBLISH_TOKEN lipsește.\n  Generează unul cu \`pnpm gen:key\`, pune-l în env-ul aplicației\n  din Coolify ȘI în ${CONFIG_PATH} (chmod 600).`,
  );
}
if (files.length === 0) die(`Niciun fișier de încărcat.\n\n${USAGE}`);
if (!opts.client) die(`Lipsește clientul.\n\n${USAGE}`);

const body = new FormData();
body.append('client', opts.client);
body.append('version', opts.version ?? 'v1');
if (opts.title) body.append('title', opts.title);
if (opts.replace) body.append('replace', 'true');

for (const file of files) {
  const info = await stat(file).catch(() => die(`Fișierul „${file}" nu există.`));
  if (!info.isFile()) die(`„${file}" nu e un fișier.`);
  const bytes = await readFile(file);
  const type = MIME[extname(file).toLowerCase()] ?? 'application/octet-stream';
  body.append('file', new Blob([bytes], { type }), basename(file));
}

// `security.checkOrigin` din Astro respinge POST-urile multipart fără Origin.
const origin = new URL(baseUrl).origin;

let res;
try {
  res = await fetch(`${baseUrl}/api/publish`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}`, Origin: origin },
    body,
  });
} catch (err) {
  die(`Cererea a eșuat: ${err.message}`);
}

const text = await res.text();
let payload;
try {
  payload = JSON.parse(text);
} catch {
  die(`Răspuns neașteptat (${res.status}): ${text.slice(0, 200)}`);
}

if (!res.ok) {
  if (res.status === 404) {
    die('Ruta /api/publish e dezactivată: PUBLISH_TOKEN nu e setat pe server.');
  }
  die(`${payload.error ?? `Eroare ${res.status}`}`);
}

console.log(`✓ ${payload.written.join(', ')} → ${payload.url}`);
console.log(`  link scurt: https://client.simplead.ro/${payload.clientSlug}/`);
