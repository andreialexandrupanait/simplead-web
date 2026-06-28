import { resolveMx as dnsMx, resolveTxt as dnsTxt } from './dns';

/**
 * Diagnostic de livrabilitate email pentru un domeniu: MX, SPF, DKIM (best-effort
 * pe selectori comuni) și DMARC. Răspunde la „de ce ajung emailurile în spam".
 * Pur DNS — nu face niciun fetch HTTP, deci nu are suprafață de SSRF.
 */
export type CheckStatus = 'pass' | 'warn' | 'fail';

export interface ToolCheck {
  id: string;
  label: string;
  status: CheckStatus;
  detail: string;
}

export interface DeliverabilityResult {
  domain: string;
  records: {
    mx: string[];
    spf: string | null;
    dmarc: string | null;
    dkimSelectors: string[];
  };
  checks: ToolCheck[];
  verdict: CheckStatus;
}

export interface DeliverabilityDeps {
  resolveMx: (domain: string) => Promise<{ exchange: string; priority: number }[]>;
  resolveTxt: (domain: string) => Promise<string[]>;
}

const DEFAULT_DEPS: DeliverabilityDeps = { resolveMx: dnsMx, resolveTxt: dnsTxt };

// Selectori DKIM uzuali (nu există listare DNS a selectorilor; îi sondăm pe cei comuni).
const DKIM_SELECTORS = ['default', 'google', 'selector1', 'selector2', 'k1', 'dkim', 'mail', 's1'];

const worst = (statuses: CheckStatus[]): CheckStatus =>
  statuses.includes('fail') ? 'fail' : statuses.includes('warn') ? 'warn' : 'pass';

export async function checkDeliverability(
  domain: string,
  deps: DeliverabilityDeps = DEFAULT_DEPS,
): Promise<DeliverabilityResult> {
  const [mxRecords, txt, dmarcTxt, ...dkimTxts] = await Promise.all([
    deps.resolveMx(domain),
    deps.resolveTxt(domain),
    deps.resolveTxt(`_dmarc.${domain}`),
    ...DKIM_SELECTORS.map((s) => deps.resolveTxt(`${s}._domainkey.${domain}`)),
  ]);

  const mx = mxRecords.sort((a, b) => a.priority - b.priority).map((r) => r.exchange);
  const spf = txt.find((t) => /^v=spf1\b/i.test(t)) ?? null;
  const spfCount = txt.filter((t) => /^v=spf1\b/i.test(t)).length;
  const dmarc = dmarcTxt.find((t) => /^v=DMARC1\b/i.test(t)) ?? null;
  const dkimSelectors = DKIM_SELECTORS.filter((_, i) =>
    dkimTxts[i].some((t) => /v=DKIM1|(^|;)\s*p=/i.test(t)),
  );

  const checks: ToolCheck[] = [];

  // MX
  checks.push(
    mx.length > 0
      ? { id: 'mx', label: 'MX (primire email)', status: 'pass', detail: mx.join(', ') }
      : {
          id: 'mx',
          label: 'MX (primire email)',
          status: 'fail',
          detail: 'Fără înregistrări MX: domeniul nu poate primi email.',
        },
  );

  // SPF
  if (!spf) {
    checks.push({
      id: 'spf',
      label: 'SPF',
      status: 'fail',
      detail: 'Lipsește SPF: emailurile tale pot fi marcate ca spam sau respinse.',
    });
  } else if (spfCount > 1) {
    checks.push({
      id: 'spf',
      label: 'SPF',
      status: 'fail',
      detail: 'Mai multe înregistrări SPF: invalid. Trebuie să existe una singură.',
    });
  } else if (/[+]all\b/i.test(spf)) {
    checks.push({
      id: 'spf',
      label: 'SPF',
      status: 'warn',
      detail: 'SPF cu „+all" e prea permisiv (oricine poate trimite în numele tău).',
    });
  } else {
    checks.push({ id: 'spf', label: 'SPF', status: 'pass', detail: spf });
  }

  // DKIM
  checks.push(
    dkimSelectors.length > 0
      ? {
          id: 'dkim',
          label: 'DKIM',
          status: 'pass',
          detail: `Găsit pe selectorii: ${dkimSelectors.join(', ')}.`,
        }
      : {
          id: 'dkim',
          label: 'DKIM',
          status: 'warn',
          detail: 'Niciun DKIM pe selectorii comuni (poate exista pe un selector propriu).',
        },
  );

  // DMARC
  if (!dmarc) {
    checks.push({
      id: 'dmarc',
      label: 'DMARC',
      status: 'fail',
      detail: 'Lipsește DMARC: fără protecție împotriva falsificării adresei tale.',
    });
  } else {
    const policy = dmarc.match(/\bp=(none|quarantine|reject)\b/i)?.[1]?.toLowerCase();
    checks.push(
      policy === 'none' || !policy
        ? {
            id: 'dmarc',
            label: 'DMARC',
            status: 'warn',
            detail:
              'DMARC există, dar politica e „none" (doar monitorizare, fără protecție reală).',
          }
        : { id: 'dmarc', label: 'DMARC', status: 'pass', detail: dmarc },
    );
  }

  return {
    domain,
    records: { mx, spf, dmarc, dkimSelectors },
    checks,
    verdict: worst(checks.map((c) => c.status)),
  };
}
