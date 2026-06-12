/** Slugify partajat (diacritice RO → ascii) pentru ancore, taguri, URL-uri. */
export function slugify(s: string): string {
  return (
    (s ?? '')
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'x'
  );
}
