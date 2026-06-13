import { describe, expect, it } from 'vitest';
import { parseHtmlMeta } from '@lib/server/tools/site-scanner';

describe('parseHtmlMeta', () => {
  it('extrage title, description, viewport, og:image și numără H1', () => {
    const html = `
      <html><head>
        <title>  Simplead —  Studio   </title>
        <meta name="description" content="Grafică și marketing digital.">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta property="og:image" content="https://exemplu.ro/og.png">
      </head><body><h1>Salut</h1><h1>Al doilea</h1></body></html>`;
    const meta = parseHtmlMeta(html);
    expect(meta.title).toBe('Simplead — Studio');
    expect(meta.description).toBe('Grafică și marketing digital.');
    expect(meta.hasViewport).toBe(true);
    expect(meta.ogImage).toBe('https://exemplu.ro/og.png');
    expect(meta.h1Count).toBe(2);
  });

  it('întoarce null/0 când lipsesc elementele', () => {
    const meta = parseHtmlMeta('<html><head></head><body><p>nimic</p></body></html>');
    expect(meta.title).toBeNull();
    expect(meta.description).toBeNull();
    expect(meta.hasViewport).toBe(false);
    expect(meta.ogImage).toBeNull();
    expect(meta.h1Count).toBe(0);
  });
});
