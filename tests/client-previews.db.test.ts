import { readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';

/**
 * Integrare pe Postgres + disc real: publicare, marcare „live", ștergere.
 *
 * Se omite automat fără `DATABASE_URL`, ca `pnpm test` din CI (care n-are bază
 * de date) să rămână verde. Rulare locală:
 *
 *   DATABASE_URL=postgres://... UPLOADS_DIR=/tmp/prev pnpm vitest run tests/client-previews.db.test.ts
 */
const hasDb = Boolean(process.env.DATABASE_URL);

const {
  CLIENTS_DIR,
  deleteVersion,
  findLiveVersion,
  invalidatePreviewCache,
  listPreviews,
  publishVersion,
  setLiveVersion,
} = await import('@lib/server/client-previews');

const CLIENT = 'test-integrare';
const file = (name: string, body: string, type = 'text/html') => new File([body], name, { type });

afterAll(async () => {
  if (!hasDb) return;
  for (const c of await listPreviews()) {
    if (c.clientSlug !== CLIENT) continue;
    for (const v of c.versions) await deleteVersion(v.id);
  }
  await rm(path.join(CLIENTS_DIR, CLIENT), { recursive: true, force: true });
});

describe.skipIf(!hasDb)('ciclul de viață al unei previzualizări', () => {
  it('publică un HTML cu orice nume și îl salvează ca index.html', async () => {
    const res = await publishVersion({
      client: 'Test Integrare',
      version: 'V 1',
      files: [file('landing-oferta.html', '<h1>v1</h1>')],
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    expect(res.clientSlug).toBe(CLIENT);
    expect(res.versionSlug).toBe('v-1');
    expect(res.written).toEqual(['index.html']);

    const onDisk = path.join(CLIENTS_DIR, CLIENT, 'v-1', 'index.html');
    await expect(readFile(onDisk, 'utf8')).resolves.toBe('<h1>v1</h1>');
  });

  it('prima versiune devine automat cea live', async () => {
    invalidatePreviewCache();
    const live = await findLiveVersion(CLIENT);
    expect(live?.versionSlug).toBe('v-1');
  });

  it('acceptă assets alături de HTML în aceeași versiune', async () => {
    const res = await publishVersion({
      client: CLIENT,
      version: 'v2',
      title: 'Cu imagine',
      files: [
        file('index.html', '<img src="hero.webp">'),
        file('Hero Mare.webp', 'x', 'image/webp'),
      ],
    });
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    // Numele assetului e curățat, dar extensia rămâne intactă.
    expect(res.written).toEqual(['index.html', 'hero-mare.webp']);
  });

  it('a doua versiune NU fură statutul live', async () => {
    invalidatePreviewCache();
    expect((await findLiveVersion(CLIENT))?.versionSlug).toBe('v-1');
  });

  it('marcarea „live" mută flag-ul exclusiv pe versiunea aleasă', async () => {
    const [group] = (await listPreviews()).filter((c) => c.clientSlug === CLIENT);
    const v2 = group.versions.find((v) => v.versionSlug === 'v2')!;
    expect(await setLiveVersion(v2.id)).toBe(true);

    const after = (await listPreviews()).find((c) => c.clientSlug === CLIENT)!;
    expect(after.versions.filter((v) => v.isLive).map((v) => v.versionSlug)).toEqual(['v2']);
    expect((await findLiveVersion(CLIENT))?.versionSlug).toBe('v2');
  });

  it('raportează numărul de fișiere și prezența index.html', async () => {
    const group = (await listPreviews()).find((c) => c.clientSlug === CLIENT)!;
    const v2 = group.versions.find((v) => v.versionSlug === 'v2')!;
    expect(v2.files).toBe(2);
    expect(v2.hasIndex).toBe(true);
    expect(v2.bytes).toBeGreaterThan(0);
  });

  it('respinge extensiile din afara allowlist-ului fără să scrie nimic', async () => {
    const res = await publishVersion({
      client: CLIENT,
      version: 'rau',
      files: [file('index.html', 'ok'), file('shell.php', '<?php ?>', 'application/x-php')],
    });
    expect(res.ok).toBe(false);
    // Validarea e făcută pe TOT lotul înainte de prima scriere.
    await expect(stat(path.join(CLIENTS_DIR, CLIENT, 'rau'))).rejects.toThrow();
  });

  it('ștergerea versiunii live promovează altă versiune, ca linkul scurt să rămână valid', async () => {
    const group = (await listPreviews()).find((c) => c.clientSlug === CLIENT)!;
    const v2 = group.versions.find((v) => v.versionSlug === 'v2')!;

    expect(await deleteVersion(v2.id)).not.toBeNull();
    await expect(stat(path.join(CLIENTS_DIR, CLIENT, 'v2'))).rejects.toThrow();

    invalidatePreviewCache();
    expect((await findLiveVersion(CLIENT))?.versionSlug).toBe('v-1');
  });

  it('ștergerea ultimei versiuni curăță și folderul clientului', async () => {
    const group = (await listPreviews()).find((c) => c.clientSlug === CLIENT)!;
    for (const v of group.versions) await deleteVersion(v.id);

    await expect(stat(path.join(CLIENTS_DIR, CLIENT))).rejects.toThrow();
    invalidatePreviewCache();
    expect(await findLiveVersion(CLIENT)).toBeNull();
  });
});
