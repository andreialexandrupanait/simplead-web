import { describe, expect, it } from 'vitest';
import {
  checkDeliverability,
  type DeliverabilityDeps,
} from '@lib/server/tools/email-deliverability';

// Resolver fals: răspunde din hărți fixe, fără rețea.
function fakeDeps(opts: {
  mx?: { exchange: string; priority: number }[];
  txt?: Record<string, string[]>;
}): DeliverabilityDeps {
  return {
    resolveMx: async () => opts.mx ?? [],
    resolveTxt: async (domain: string) => opts.txt?.[domain] ?? [],
  };
}

const id = (checks: { id: string; status: string }[], key: string) =>
  checks.find((c) => c.id === key)?.status;

describe('checkDeliverability', () => {
  it('dă verdict „pass" pe o configurație completă', async () => {
    const deps = fakeDeps({
      mx: [{ exchange: 'aspmx.l.google.com', priority: 1 }],
      txt: {
        'exemplu.ro': ['v=spf1 include:_spf.google.com -all'],
        '_dmarc.exemplu.ro': ['v=DMARC1; p=reject; rua=mailto:a@exemplu.ro'],
        'google._domainkey.exemplu.ro': ['v=DKIM1; k=rsa; p=ABC'],
      },
    });
    const res = await checkDeliverability('exemplu.ro', deps);
    expect(res.verdict).toBe('pass');
    expect(id(res.checks, 'spf')).toBe('pass');
    expect(id(res.checks, 'dmarc')).toBe('pass');
    expect(res.records.dkimSelectors).toContain('google');
  });

  it('marchează „fail" lipsa SPF/DMARC și a MX', async () => {
    const res = await checkDeliverability('gol.ro', fakeDeps({}));
    expect(res.verdict).toBe('fail');
    expect(id(res.checks, 'mx')).toBe('fail');
    expect(id(res.checks, 'spf')).toBe('fail');
    expect(id(res.checks, 'dmarc')).toBe('fail');
  });

  it('avertizează pe DMARC p=none și SPF +all', async () => {
    const deps = fakeDeps({
      mx: [{ exchange: 'mail.exemplu.ro', priority: 10 }],
      txt: {
        'exemplu.ro': ['v=spf1 +all'],
        '_dmarc.exemplu.ro': ['v=DMARC1; p=none'],
      },
    });
    const res = await checkDeliverability('exemplu.ro', deps);
    expect(id(res.checks, 'spf')).toBe('warn');
    expect(id(res.checks, 'dmarc')).toBe('warn');
  });
});
