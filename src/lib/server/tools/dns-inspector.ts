import { resolve4, resolve6, resolveMx, resolveNs, resolveTxt } from './dns';

/**
 * Inspector DNS pentru un domeniu: nameservers, A/AAAA, MX și TXT (cu detectarea
 * SPF/DMARC). Pur DNS — fără fetch HTTP, deci fără suprafață de SSRF.
 */
export interface DnsInspectResult {
  domain: string;
  nameservers: string[];
  a: string[];
  aaaa: string[];
  mx: string[];
  txt: string[];
  hasSpf: boolean;
  hasDmarc: boolean;
}

export async function inspectDomain(domain: string): Promise<DnsInspectResult> {
  const [ns, a, aaaa, mxRecords, txt, dmarcTxt] = await Promise.all([
    resolveNs(domain),
    resolve4(domain),
    resolve6(domain),
    resolveMx(domain),
    resolveTxt(domain),
    resolveTxt(`_dmarc.${domain}`),
  ]);

  return {
    domain,
    nameservers: ns.sort(),
    a,
    aaaa,
    mx: mxRecords
      .sort((x, y) => x.priority - y.priority)
      .map((r) => `${r.exchange} (${r.priority})`),
    txt,
    hasSpf: txt.some((t) => /^v=spf1\b/i.test(t)),
    hasDmarc: dmarcTxt.some((t) => /^v=DMARC1\b/i.test(t)),
  };
}
