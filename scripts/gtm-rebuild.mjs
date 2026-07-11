/**
 * Rebuild complet al containerului GTM simplead cu naming-ul agreat:
 *   Tag: `Platformă - Eveniment - Pagină`  ·  Trigger: `CE - ...` / `All Pages`
 *   Foldere: GA4 / Meta / Reddit / TikTok
 *
 * ȘTERGE tot ce e în container (tag-uri/triggere/variabile/foldere user-defined)
 * și reconstruiește curat. Nu publică — lasă totul în workspace pt review.
 *
 * Reddit + TikTok: tag-urile sunt PE PAUZĂ, cu ID-ul într-o variabilă Constant
 * goală (`Const - Reddit Advertiser ID` / `Const - TikTok Pixel ID`). Când ai
 * ID-ul: completezi variabila în GTM + unpause + publish (sau rulezi iar scriptul).
 *
 * Rulare (googleapis instalat temporar; vezi gtm-provision.mjs pt setup SA):
 *   GTM_ACCOUNT_ID=... GTM_CONTAINER_ID=... GTM_SA_KEY='...' \
 *     node scripts/gtm-rebuild.mjs            # rebuild în workspace
 *     node scripts/gtm-rebuild.mjs --publish  # rebuild + publică
 */
import { google } from 'googleapis';

// ---- ID-uri platforme (editează aici) ----
const IDS = {
  ga4: process.env.GA4_ID || 'G-5SMD6QXMR8',
  meta: process.env.META_PIXEL_ID || '566451780882202',
  reddit: process.env.REDDIT_ID || '', // gol → tag-uri Reddit pe pauză
  tiktok: process.env.TIKTOK_ID || '', // gol → tag-uri TikTok pe pauză
};

const PUBLISH = process.argv.includes('--publish');

// Triggere built-in (id-uri fixe în orice container).
const T_ALL_PAGES = '2147479553';
const T_INIT = '2147479573';

// form_type-urile trimise de site pe /multumesc (generate_lead).
const LEAD_FORMS = [
  { key: 'contact', label: 'Contact' },
  { key: 'oferta', label: 'Oferta' },
  { key: 'suport', label: 'Suport' },
];

const log = (...a) => console.log('[gtm]', ...a);
const die = (m) => {
  console.error('[gtm] EROARE:', m);
  process.exit(1);
};

// GTM API are quota ~15 queries/min/user → throttle + retry pe „Quota exceeded".
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const THROTTLE_MS = 4500;
async function call(thunk) {
  for (let i = 0; ; i++) {
    try {
      const r = await thunk();
      await sleep(THROTTLE_MS);
      return r;
    } catch (e) {
      if (/quota|rate limit|429/i.test(e.message || '') && i < 6) {
        log('  …quota atinsă, aștept 30s');
        await sleep(30000);
        continue;
      }
      throw e;
    }
  }
}

// ---- snippet-uri pixel (Custom HTML) ----
const metaBase = (v) =>
  `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${v}');fbq('track','PageView');</script>`;
const metaEvent = (ev) => `<script>fbq('track','${ev}');</script>`;
const redditBase = (v) =>
  `<script>!function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js",t.async=!0;var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s)}}(window,document);rdt('init','${v}');rdt('track','PageVisit');</script>`;
const redditEvent = (ev) => `<script>rdt('track','${ev}');</script>`;
const tiktokBase = (v) =>
  `<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie','holdConsent','revokeConsent','grantConsent'];ttq.setAndDefer=function(e,n){e[n]=function(){e.push([n].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e,n){var r='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=r;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};n=d.createElement('script');n.type='text/javascript';n.async=!0;n.src=r+'?sdkid='+e+'&lib='+t;var s=d.getElementsByTagName('script')[0];s.parentNode.insertBefore(n,s)};ttq.load('${v}');ttq.page()}(window,document,'ttq');</script>`;
const tiktokEvent = (ev) => `<script>ttq.track('${ev}');</script>`;

function param(type, key, value) {
  return { type, key, value };
}
function customEventTrigger(name, eventName, formType) {
  const t = {
    name,
    type: 'customEvent',
    customEventFilter: [
      {
        type: 'equals',
        parameter: [param('template', 'arg0', '{{_event}}'), param('template', 'arg1', eventName)],
      },
    ],
  };
  if (formType) {
    t.filter = [
      {
        type: 'equals',
        parameter: [
          param('template', 'arg0', '{{DLV - form_type}}'),
          param('template', 'arg1', formType),
        ],
      },
    ];
  }
  return t;
}

async function main() {
  const ACCOUNT_ID = process.env.GTM_ACCOUNT_ID?.trim();
  const CONTAINER_ID = process.env.GTM_CONTAINER_ID?.trim();
  if (!ACCOUNT_ID || !CONTAINER_ID) die('GTM_ACCOUNT_ID + GTM_CONTAINER_ID obligatorii.');
  if (!process.env.GTM_SA_KEY) die('GTM_SA_KEY (JSON inline) obligatoriu.');

  const scopes = [
    'https://www.googleapis.com/auth/tagmanager.edit.containers',
    'https://www.googleapis.com/auth/tagmanager.edit.containerversions',
    'https://www.googleapis.com/auth/tagmanager.publish',
  ];
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GTM_SA_KEY),
    scopes,
  });
  const tm = google.tagmanager({ version: 'v2', auth });
  const cp = `accounts/${ACCOUNT_ID}/containers/${CONTAINER_ID}`;

  // Workspace curat.
  const wsName = 'simplead-rebuild';
  const wsList = (await tm.accounts.containers.workspaces.list({ parent: cp })).data.workspace || [];
  let ws = wsList.find((w) => w.name === wsName);
  if (!ws) {
    ws = (
      await tm.accounts.containers.workspaces.create({
        parent: cp,
        requestBody: { name: wsName, description: 'Rebuild cu naming standard' },
      })
    ).data;
  }
  const p = ws.path;
  log('Workspace:', wsName);

  // ---- WIPE: șterge tot ce e user-defined (rezilient) ----
  const tryDel = async (kind, name, thunk) => {
    try {
      await call(thunk);
      log(`- ${kind} șters:`, name);
    } catch (e) {
      log(`! nu pot șterge ${kind} „${name}":`, e.message);
    }
  };
  const W = tm.accounts.containers.workspaces;
  const tags = (await W.tags.list({ parent: p })).data.tag || [];
  for (const t of tags) await tryDel('tag', t.name, () => W.tags.delete({ path: t.path }));
  const trgs = (await W.triggers.list({ parent: p })).data.trigger || [];
  for (const t of trgs) await tryDel('trigger', t.name, () => W.triggers.delete({ path: t.path }));
  const vars = (await W.variables.list({ parent: p })).data.variable || [];
  for (const v of vars) await tryDel('variabilă', v.name, () => W.variables.delete({ path: v.path }));
  const fldrs = (await W.folders.list({ parent: p })).data.folder || [];
  for (const f of fldrs) await tryDel('folder', f.name, () => W.folders.delete({ path: f.path }));

  // Built-in variable {{Event}}.
  try {
    await call(() => W.built_in_variables.create({ parent: p, type: ['event'] }));
  } catch {
    /* deja activă */
  }

  // ---- Foldere ----
  const folderId = {};
  for (const name of ['GA4', 'Meta', 'Reddit', 'TikTok']) {
    const f = (await call(() => W.folders.create({ parent: p, requestBody: { name } }))).data;
    folderId[name] = f.folderId;
    log('+ folder:', name);
  }

  // ---- Variabile ----
  // GTM nu acceptă Constant cu valoare goală → placeholder pe care-l înlocuiești
  // tu în GTM când ai ID-ul (tag-urile respective sunt oricum pe pauză).
  const mkConst = (name, value) => ({
    name,
    type: 'c',
    parameter: [param('template', 'value', value || 'COMPLETEAZA_ID_AICI')],
  });
  const mkDlv = (suffix) => ({
    name: `DLV - ${suffix}`,
    type: 'v',
    parameter: [param('integer', 'dataLayerVersion', '2'), param('template', 'name', suffix)],
  });
  const variables = [
    mkConst('Const - GA4 ID', IDS.ga4),
    mkConst('Const - Meta Pixel ID', IDS.meta),
    mkConst('Const - Reddit Advertiser ID', IDS.reddit),
    mkConst('Const - TikTok Pixel ID', IDS.tiktok),
    mkDlv('value'),
    mkDlv('currency'),
    mkDlv('transaction_id'),
    mkDlv('form_type'),
    mkDlv('method'),
  ];
  for (const v of variables) {
    await call(() => W.variables.create({ parent: p, requestBody: v }));
    log('+ variabilă:', v.name);
  }

  // ---- Triggere ----
  const trigId = {};
  const triggers = [
    ...LEAD_FORMS.map((f) => customEventTrigger(`CE - Lead - ${f.label}`, 'generate_lead', f.key)),
    customEventTrigger('CE - sign_up', 'sign_up'),
    customEventTrigger('CE - purchase', 'purchase'),
  ];
  for (const t of triggers) {
    const r = (await call(() => W.triggers.create({ parent: p, requestBody: t }))).data;
    trigId[t.name] = r.triggerId;
    log('+ trigger:', t.name);
  }
  const leadTrigIds = LEAD_FORMS.map((f) => trigId[`CE - Lead - ${f.label}`]);

  // ---- Tag-uri ----
  const adConsent = {
    consentStatus: 'needed',
    consentType: { type: 'list', list: [{ type: 'template', value: 'ad_storage' }] },
  };
  const html = (value) => [param('template', 'html', value), { type: 'boolean', key: 'supportDocumentWrite', value: 'false' }];

  const tagDefs = [];

  // GA4
  tagDefs.push({
    name: 'GA4',
    folder: 'GA4',
    type: 'googtag',
    parameter: [param('template', 'tagId', '{{Const - GA4 ID}}')],
    firingTriggerId: [T_INIT],
    consentSettings: { consentStatus: 'notSet' },
  });
  const ga4Event = (name, trigIds) => ({
    name,
    folder: 'GA4',
    type: 'gaawe',
    parameter: [
      param('template', 'eventName', 'generate_lead'),
      { type: 'tagReference', key: 'measurementId', value: 'GA4' },
      {
        type: 'list',
        key: 'eventParameters',
        list: ['form_type', 'method', 'value', 'currency', 'transaction_id'].map((pn) => ({
          type: 'map',
          map: [param('template', 'name', pn), param('template', 'value', `{{DLV - ${pn}}}`)],
        })),
      },
    ],
    firingTriggerId: trigIds,
    consentSettings: { consentStatus: 'notSet' },
  });
  LEAD_FORMS.forEach((f) => {
    const t = ga4Event(`GA4 - Lead - ${f.label}`, [trigId[`CE - Lead - ${f.label}`]]);
    tagDefs.push(t);
  });
  const ga4SignUp = ga4Event('GA4 - sign_up', [trigId['CE - sign_up']]);
  ga4SignUp.parameter[0] = param('template', 'eventName', 'sign_up');
  tagDefs.push(ga4SignUp);
  const ga4Purchase = ga4Event('GA4 - purchase', [trigId['CE - purchase']]);
  ga4Purchase.parameter[0] = param('template', 'eventName', 'purchase');
  tagDefs.push(ga4Purchase);

  // Meta
  tagDefs.push({
    name: 'FB - Page view',
    folder: 'Meta',
    type: 'html',
    parameter: html(metaBase('{{Const - Meta Pixel ID}}')),
    firingTriggerId: [T_ALL_PAGES],
    consentSettings: adConsent,
  });
  LEAD_FORMS.forEach((f) =>
    tagDefs.push({
      name: `FB - Lead - ${f.label}`,
      folder: 'Meta',
      type: 'html',
      parameter: html(metaEvent('Lead')),
      firingTriggerId: [trigId[`CE - Lead - ${f.label}`]],
      consentSettings: adConsent,
    }),
  );
  tagDefs.push({
    name: 'FB - Complete registration',
    folder: 'Meta',
    type: 'html',
    parameter: html(metaEvent('CompleteRegistration')),
    firingTriggerId: [trigId['CE - sign_up']],
    consentSettings: adConsent,
  });
  tagDefs.push({
    name: 'FB - Purchase',
    folder: 'Meta',
    type: 'html',
    parameter: html(metaEvent('Purchase')),
    firingTriggerId: [trigId['CE - purchase']],
    consentSettings: adConsent,
  });

  // Reddit (pe pauză cât timp ID-ul e gol)
  const redditPaused = !IDS.reddit;
  tagDefs.push({
    name: 'Reddit',
    folder: 'Reddit',
    type: 'html',
    parameter: html(redditBase('{{Const - Reddit Advertiser ID}}')),
    firingTriggerId: [T_ALL_PAGES],
    consentSettings: adConsent,
    paused: redditPaused,
  });
  LEAD_FORMS.forEach((f) =>
    tagDefs.push({
      name: `Reddit - Lead - ${f.label}`,
      folder: 'Reddit',
      type: 'html',
      parameter: html(redditEvent('Lead')),
      firingTriggerId: [trigId[`CE - Lead - ${f.label}`]],
      consentSettings: adConsent,
      paused: redditPaused,
    }),
  );
  tagDefs.push({
    name: 'Reddit - Sign up',
    folder: 'Reddit',
    type: 'html',
    parameter: html(redditEvent('SignUp')),
    firingTriggerId: [trigId['CE - sign_up']],
    consentSettings: adConsent,
    paused: redditPaused,
  });
  tagDefs.push({
    name: 'Reddit - Purchase',
    folder: 'Reddit',
    type: 'html',
    parameter: html(redditEvent('Purchase')),
    firingTriggerId: [trigId['CE - purchase']],
    consentSettings: adConsent,
    paused: redditPaused,
  });

  // TikTok (pe pauză cât timp ID-ul e gol)
  const ttPaused = !IDS.tiktok;
  tagDefs.push({
    name: 'TT - Config',
    folder: 'TikTok',
    type: 'html',
    parameter: html(tiktokBase('{{Const - TikTok Pixel ID}}')),
    firingTriggerId: [T_ALL_PAGES],
    consentSettings: adConsent,
    paused: ttPaused,
  });
  LEAD_FORMS.forEach((f) =>
    tagDefs.push({
      name: `TT - Lead - ${f.label}`,
      folder: 'TikTok',
      type: 'html',
      parameter: html(tiktokEvent('SubmitForm')),
      firingTriggerId: [trigId[`CE - Lead - ${f.label}`]],
      consentSettings: adConsent,
      paused: ttPaused,
    }),
  );
  tagDefs.push({
    name: 'TT - Sign up',
    folder: 'TikTok',
    type: 'html',
    parameter: html(tiktokEvent('Subscribe')),
    firingTriggerId: [trigId['CE - sign_up']],
    consentSettings: adConsent,
    paused: ttPaused,
  });
  tagDefs.push({
    name: 'TT - Purchase',
    folder: 'TikTok',
    type: 'html',
    parameter: html(tiktokEvent('CompletePayment')),
    firingTriggerId: [trigId['CE - purchase']],
    consentSettings: adConsent,
    paused: ttPaused,
  });

  for (const def of tagDefs) {
    const body = { ...def, parentFolderId: folderId[def.folder] };
    delete body.folder;
    await call(() => W.tags.create({ parent: p, requestBody: body }));
    log(`+ tag: ${def.name}${def.paused ? ' (pauză)' : ''}`);
  }

  if (PUBLISH) {
    const ver = (
      await call(() =>
        W.create_version({ path: p, requestBody: { name: 'simplead rebuild naming' } }),
      )
    ).data;
    const vid = ver.containerVersion?.containerVersionId;
    await call(() => tm.accounts.containers.versions.publish({ path: `${cp}/versions/${vid}` }));
    log('PUBLICAT versiunea', vid);
  } else {
    log('Gata (workspace, nepublicat). Verifică în GTM, apoi --publish.');
  }
}

main().catch((e) => die(e?.message || String(e)));
