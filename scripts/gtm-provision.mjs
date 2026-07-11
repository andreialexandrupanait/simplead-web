/**
 * Provizionare Google Tag Manager pentru simplead — idempotent, prin Tag Manager
 * API v2. Creează/actualizează variabile, triggere „Custom Event" și tag-uri
 * (GA4 config + GA4 event, Meta/TikTok/Clarity ca Custom HTML) în containerul tău,
 * pe baza ID-urilor și a evenimentelor definite în admin (tabela `settings`).
 *
 * NU are acces la contul tău fără credențiale — îl rulezi TU. Vezi „SETUP" jos.
 *
 * Rulare:
 *   node scripts/gtm-provision.mjs --dry-run    # doar afișează planul (recomandat prima dată)
 *   node scripts/gtm-provision.mjs              # scrie în workspace (fără publish)
 *   node scripts/gtm-provision.mjs --publish    # scrie + publică o versiune nouă
 *   node scripts/gtm-provision.mjs --export     # scrie fallback JSON de import (fără API)
 *
 * SETUP (o dată):
 *   1. Google Cloud → proiect → activează „Tag Manager API".
 *   2. Creează un Service Account + cheie JSON.
 *   3. În GTM → containerul tău → Admin → User Management → adaugă emailul SA ca
 *      „Publish" (sau Admin) pe container.
 *   4. Instalează googleapis DOAR temporar (NU îl comitem — type-defs-urile lui
 *      uriașe fac OOM la `astro check` în build; de-aia `scripts/` e exclus din
 *      tsconfig). În containerul de dev:
 *        docker exec simplead-web sh -c 'cd /app && pnpm add googleapis'
 *        ...rulezi scriptul...
 *        docker exec simplead-web sh -c 'cd /app && git checkout package.json pnpm-lock.yaml'
 *   5. Setează env:
 *        GTM_ACCOUNT_ID=1234567
 *        GTM_CONTAINER_ID=7654321
 *        GOOGLE_APPLICATION_CREDENTIALS=/cale/sa-key.json   (SAU)
 *        GTM_SA_KEY='{"type":"service_account",...}'         (JSON inline)
 *        DATABASE_URL=postgres://...   (ca să citească ID-urile + evenimentele)
 *
 * NOTĂ: tipurile de tag/param GTM se mai schimbă (migrarea „Google tag"). Rulează
 * întâi --dry-run, apoi verifică în GTM Preview. Constantele din secțiunea CONFIG
 * de mai jos sunt ușor de ajustat dacă Google schimbă cheile.
 */
import postgres from 'postgres';

const args = new Set(process.argv.slice(2));
const DRY = args.has('--dry-run');
const PUBLISH = args.has('--publish');
const EXPORT = args.has('--export');

// Evenimente „native" trimise mereu de site (vezi Analytics.astro + paginile de conversie).
const NATIVE_EVENTS = ['generate_lead', 'sign_up', 'purchase'];

// Parametri frecvenți → Data Layer Variables (le poți folosi ca event params în GA4).
const DL_PARAMS = ['value', 'currency', 'transaction_id', 'form_type', 'method', 'location'];

// Trigger predefinit „All Pages" (id fix în orice container GTM).
const ALL_PAGES_TRIGGER_ID = '2147479553';

function log(...a) {
  console.log('[gtm]', ...a);
}
function die(msg) {
  console.error('[gtm] EROARE:', msg);
  process.exit(1);
}

/** Citește ID-urile + evenimentele din DB (dacă e disponibilă). */
async function loadConfig() {
  const cfg = { ga4Id: '', metaPixelId: '', tiktokPixelId: '', clarityId: '', events: [] };
  const url = process.env.DATABASE_URL?.trim();
  if (!url) {
    log('DATABASE_URL lipsește — folosesc doar evenimentele native.');
    return cfg;
  }
  const sql = postgres(url, { max: 1 });
  try {
    const rows = await sql`
      select key, value from settings
      where key in ('site.ga4_id','site.meta_pixel_id','site.tiktok_pixel_id',
                    'site.clarity_id','site.tracking_events')`;
    const m = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    cfg.ga4Id = (m['site.ga4_id'] || '').trim();
    cfg.metaPixelId = (m['site.meta_pixel_id'] || '').trim();
    cfg.tiktokPixelId = (m['site.tiktok_pixel_id'] || '').trim();
    cfg.clarityId = (m['site.clarity_id'] || '').trim();
    try {
      cfg.events = JSON.parse(m['site.tracking_events'] || '[]');
    } catch {
      cfg.events = [];
    }
  } finally {
    await sql.end();
  }
  return cfg;
}

/** Lista finală de nume de evenimente pentru care creăm triggere Custom Event. */
function eventNames(cfg) {
  const set = new Set(NATIVE_EVENTS);
  for (const e of cfg.events)
    if (e && typeof e.name === 'string' && e.enabled !== false) set.add(e.name);
  return [...set];
}

// ---- Definiții de resurse (izomorfe: folosite și de API și de --export) ----

function buildVariables() {
  // Data Layer Variables pentru parametrii evenimentelor.
  return DL_PARAMS.map((p) => ({
    name: `dlv.${p}`,
    type: 'v', // Data Layer Variable
    parameter: [
      { type: 'integer', key: 'dataLayerVersion', value: '2' },
      { type: 'template', key: 'name', value: p },
    ],
  }));
}

function buildTriggers(names) {
  return names.map((n) => ({
    name: `ce.${n}`,
    type: 'customEvent',
    customEventFilter: [
      {
        type: 'equals',
        parameter: [
          { type: 'template', key: 'arg0', value: '{{_event}}' },
          { type: 'template', key: 'arg1', value: n },
        ],
      },
    ],
  }));
}

/**
 * Tag-uri. GA4 = Google tag (config) pe All Pages + un GA4 Event tag legat de toate
 * triggerele Custom Event, cu eventName = {{Event}}. Meta/TikTok/Clarity = Custom HTML
 * base pe All Pages, cu „Additional consent checks" pe ad_storage (marketing).
 */
function buildTags(cfg, names, refs) {
  const tags = [];

  if (cfg.ga4Id) {
    tags.push({
      name: 'GA4 — Google tag',
      type: 'googtag',
      parameter: [{ type: 'template', key: 'tagId', value: cfg.ga4Id }],
      firingTriggerId: [ALL_PAGES_TRIGGER_ID],
      // Consimțământ analiză gestionat prin Consent Mode (analytics_storage).
      consentSettings: { consentStatus: 'notSet' },
    });
    tags.push({
      name: 'GA4 — Event (dataLayer)',
      type: 'gaawe', // GA4 Event
      parameter: [
        { type: 'template', key: 'eventName', value: '{{Event}}' },
        { type: 'tagReference', key: 'measurementId', value: 'GA4 — Google tag' },
        {
          type: 'list',
          key: 'eventParameters',
          list: DL_PARAMS.map((p) => ({
            type: 'map',
            map: [
              { type: 'template', key: 'name', value: p },
              { type: 'template', key: 'value', value: `{{dlv.${p}}}` },
            ],
          })),
        },
      ],
      firingTriggerId: refs.triggerIds, // toate triggerele Custom Event
      consentSettings: { consentStatus: 'notSet' },
    });
  }

  if (cfg.metaPixelId) {
    tags.push({
      name: 'Meta Pixel — base',
      type: 'html',
      parameter: [
        {
          type: 'template',
          key: 'html',
          value: metaBaseHtml(cfg.metaPixelId),
        },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
      ],
      firingTriggerId: [ALL_PAGES_TRIGGER_ID],
      consentSettings: {
        consentStatus: 'needed',
        consentType: { type: 'list', list: [{ type: 'template', value: 'ad_storage' }] },
      },
    });
  }

  if (cfg.tiktokPixelId) {
    tags.push({
      name: 'TikTok Pixel — base',
      type: 'html',
      parameter: [
        { type: 'template', key: 'html', value: tiktokBaseHtml(cfg.tiktokPixelId) },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
      ],
      firingTriggerId: [ALL_PAGES_TRIGGER_ID],
      consentSettings: {
        consentStatus: 'needed',
        consentType: { type: 'list', list: [{ type: 'template', value: 'ad_storage' }] },
      },
    });
  }

  if (cfg.clarityId) {
    tags.push({
      name: 'Microsoft Clarity',
      type: 'html',
      parameter: [
        { type: 'template', key: 'html', value: clarityHtml(cfg.clarityId) },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
      ],
      firingTriggerId: [ALL_PAGES_TRIGGER_ID],
      consentSettings: {
        consentStatus: 'needed',
        consentType: { type: 'list', list: [{ type: 'template', value: 'analytics_storage' }] },
      },
    });
  }

  return tags;
}

function metaBaseHtml(id) {
  return `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${id}');fbq('track','PageView');</script>`;
}
function tiktokBaseHtml(id) {
  return `<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(e,n){e[n]=function(){e.push([n].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};n=d.createElement('script');n.type='text/javascript';n.async=!0;n.src=r+'?sdkid='+e+'&lib='+t;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(n,s)};ttq.load('${id}');ttq.page()}(window,document,'ttq');</script>`;
}
function clarityHtml(id) {
  return `<script>(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,'clarity','script','${id}');</script>`;
}

// ---- Fallback: scrie JSON de import GTM (Admin → Import Container) ----
async function writeExport(cfg, names) {
  const { writeFile } = await import('node:fs/promises');
  const variable = buildVariables();
  const trigger = buildTriggers(names);
  const tag = buildTags(cfg, names, { triggerIds: [] });
  const container = {
    exportFormatVersion: 2,
    containerVersion: {
      container: { publicId: process.env.GTM_CONTAINER_ID || 'GTM-XXXXXXX', name: 'simplead' },
      tag,
      trigger,
      variable,
      builtInVariable: [{ type: 'EVENT', name: 'Event' }],
    },
  };
  const out = 'scratchpad/container-simplead.json';
  await writeFile(out, JSON.stringify(container, null, 2));
  log(`Export scris în ${out}. Importă-l din GTM → Admin → Import Container (Merge).`);
  log(
    'NOTĂ: verifică maparea eventParameters/consent după import — GTM poate normaliza câmpurile.',
  );
}

// ---- API path ----
async function run() {
  const cfg = await loadConfig();
  const names = eventNames(cfg);
  log(
    `GA4=${cfg.ga4Id || '—'} Meta=${cfg.metaPixelId || '—'} TikTok=${cfg.tiktokPixelId || '—'} Clarity=${cfg.clarityId || '—'}`,
  );
  log(`Evenimente (triggere Custom Event): ${names.join(', ')}`);

  if (EXPORT) return writeExport(cfg, names);

  const ACCOUNT_ID = process.env.GTM_ACCOUNT_ID?.trim();
  const CONTAINER_ID = process.env.GTM_CONTAINER_ID?.trim();
  if (!ACCOUNT_ID || !CONTAINER_ID) die('GTM_ACCOUNT_ID și GTM_CONTAINER_ID sunt obligatorii.');

  if (DRY) {
    log('DRY-RUN — plan:');
    log(
      `  ${buildVariables().length} variabile, ${buildTriggers(names).length} triggere, ` +
        `${buildTags(cfg, names, { triggerIds: [] }).length} tag-uri.`,
    );
    log('  (fără scriere; rulează fără --dry-run ca să aplici)');
    return;
  }

  // Import lazy ca --dry-run/--export să meargă fără googleapis instalat.
  let google;
  try {
    ({ google } = await import('googleapis'));
  } catch {
    die('Instalează googleapis temporar: pnpm add googleapis (apoi git checkout package.json pnpm-lock.yaml)');
  }

  const scopes = ['https://www.googleapis.com/auth/tagmanager.edit.containers'];
  if (PUBLISH)
    scopes.push(
      'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
      'https://www.googleapis.com/auth/tagmanager.publish',
    );

  let auth;
  if (process.env.GTM_SA_KEY) {
    const credentials = JSON.parse(process.env.GTM_SA_KEY);
    auth = new google.auth.GoogleAuth({ credentials, scopes });
  } else if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    auth = new google.auth.GoogleAuth({ scopes });
  } else {
    die('Setează GTM_SA_KEY (JSON inline) sau GOOGLE_APPLICATION_CREDENTIALS (cale la cheie).');
  }
  const tm = google.tagmanager({ version: 'v2', auth });

  const containerPath = `accounts/${ACCOUNT_ID}/containers/${CONTAINER_ID}`;

  // Workspace dedicat (idempotent).
  const wsName = 'simplead-provision';
  const wsList =
    (await tm.accounts.containers.workspaces.list({ parent: containerPath })).data.workspace || [];
  let ws = wsList.find((w) => w.name === wsName);
  if (!ws) {
    ws = (
      await tm.accounts.containers.workspaces.create({
        parent: containerPath,
        requestBody: { name: wsName, description: 'Provizionat automat de gtm-provision.mjs' },
      })
    ).data;
    log(`Workspace creat: ${wsName}`);
  } else {
    log(`Workspace existent: ${wsName}`);
  }
  const wsPath = ws.path;

  // Built-in variable {{Event}}.
  try {
    await tm.accounts.containers.workspaces.built_in_variables.create({
      parent: wsPath,
      type: ['event'],
    });
  } catch {
    /* deja activată */
  }

  // Upsert generic (după nume).
  async function upsert(kind, listFn, createFn, updateFn, defs, idField) {
    const existing = (await listFn()).data[kind] || [];
    const byName = new Map(existing.map((x) => [x.name, x]));
    const out = new Map();
    for (const def of defs) {
      const found = byName.get(def.name);
      if (found) {
        const merged = { ...def };
        const res = (await updateFn(found[idField], merged)).data;
        out.set(def.name, res);
        log(`~ ${kind}: ${def.name}`);
      } else {
        const res = (await createFn(def)).data;
        out.set(def.name, res);
        log(`+ ${kind}: ${def.name}`);
      }
    }
    return out;
  }

  // Variabile.
  await upsert(
    'variable',
    () => tm.accounts.containers.workspaces.variables.list({ parent: wsPath }),
    (body) =>
      tm.accounts.containers.workspaces.variables.create({ parent: wsPath, requestBody: body }),
    (id, body) =>
      tm.accounts.containers.workspaces.variables.update({
        path: `${wsPath}/variables/${id}`,
        requestBody: body,
      }),
    buildVariables(),
    'variableId',
  );

  // Triggere.
  const triggerMap = await upsert(
    'trigger',
    () => tm.accounts.containers.workspaces.triggers.list({ parent: wsPath }),
    (body) =>
      tm.accounts.containers.workspaces.triggers.create({ parent: wsPath, requestBody: body }),
    (id, body) =>
      tm.accounts.containers.workspaces.triggers.update({
        path: `${wsPath}/triggers/${id}`,
        requestBody: body,
      }),
    buildTriggers(names),
    'triggerId',
  );
  const triggerIds = [...triggerMap.values()].map((t) => t.triggerId);

  // Tag-uri (după ce avem id-urile triggerelor).
  await upsert(
    'tag',
    () => tm.accounts.containers.workspaces.tags.list({ parent: wsPath }),
    (body) => tm.accounts.containers.workspaces.tags.create({ parent: wsPath, requestBody: body }),
    (id, body) =>
      tm.accounts.containers.workspaces.tags.update({
        path: `${wsPath}/tags/${id}`,
        requestBody: body,
      }),
    buildTags(cfg, names, { triggerIds }),
    'tagId',
  );

  if (PUBLISH) {
    const ver = (
      await tm.accounts.containers.workspaces.create_version({
        path: wsPath,
        requestBody: { name: 'simplead auto-provision' },
      })
    ).data;
    const versionId = ver.containerVersion?.containerVersionId;
    if (versionId) {
      await tm.accounts.containers.versions.publish({
        path: `${containerPath}/versions/${versionId}`,
      });
      log(`Publicat versiunea ${versionId}.`);
    }
  } else {
    log(
      'Gata (în workspace, nefinalizat). Verifică în GTM, apoi publică — sau rulează cu --publish.',
    );
  }
}

run().catch((err) => die(err?.message || String(err)));
