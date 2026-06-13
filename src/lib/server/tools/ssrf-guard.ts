import { isIP } from 'node:net';
import { lookup } from 'node:dns/promises';

/**
 * Gardian anti-SSRF pentru instrumentele care fac fetch HTTP (scanner-ul de site).
 * Strategie: validăm schema URL-ului → rezolvăm hostname-ul → verificăm că NICIUN
 * IP rezultat nu e intern (loopback/privat/link-local/CGNAT). La redirect, se
 * re-validează fiecare hop (fetch cu `redirect: 'manual'`). Tool-urile pur-DNS
 * (email, inspector) nu fac fetch, deci nu trec prin guard.
 */
export class ToolError extends Error {}

/** Parsează un input în URL http/https; adaugă https:// dacă lipsește schema. */
export function parseToolUrl(input: string): URL {
  const trimmed = input.trim();
  if (!trimmed) throw new ToolError('Adresă lipsă.');
  const withProto = /^[a-z]+:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  let url: URL;
  try {
    url = new URL(withProto);
  } catch {
    throw new ToolError('Adresă invalidă.');
  }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new ToolError('Doar adrese http(s) sunt acceptate.');
  }
  if (url.username || url.password) {
    throw new ToolError('Adresele cu credențiale nu sunt acceptate.');
  }
  return url;
}

function isPrivateIPv4(ip: string): boolean {
  const parts = ip.split('.').map(Number);
  if (parts.length !== 4 || parts.some((n) => Number.isNaN(n) || n < 0 || n > 255)) return true;
  const [a, b] = parts;
  if (a === 0) return true; // 0.0.0.0/8 „acest" host
  if (a === 10) return true; // privat
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local
  if (a === 172 && b >= 16 && b <= 31) return true; // privat
  if (a === 192 && b === 168) return true; // privat
  if (a === 100 && b >= 64 && b <= 127) return true; // CGNAT 100.64/10
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmark 198.18/15
  if (a >= 224) return true; // multicast + rezervat (224/4, 240/4, 255.255.255.255)
  return false;
}

function isPrivateIPv6(ip: string): boolean {
  const v = ip.toLowerCase().split('%')[0]; // scoate zone-id (fe80::1%eth0)
  if (v === '::1' || v === '::') return true; // loopback / unspecified
  // IPv4-mapat (::ffff:1.2.3.4 sau ::ffff:0:1.2.3.4): verifică partea v4.
  const mapped = v.match(/(?:::ffff:)(?:0:)?(\d+\.\d+\.\d+\.\d+)$/);
  if (mapped) return isPrivateIPv4(mapped[1]);
  if (v.startsWith('fc') || v.startsWith('fd')) return true; // ULA fc00::/7
  if (/^fe[89ab]/.test(v)) return true; // link-local fe80::/10
  return false;
}

/** True dacă IP-ul (v4 sau v6) e intern și NU trebuie atins. */
export function isPrivateIp(ip: string): boolean {
  const kind = isIP(ip);
  if (kind === 4) return isPrivateIPv4(ip);
  if (kind === 6) return isPrivateIPv6(ip);
  return true; // necunoscut → tratează ca nesigur
}

/**
 * Aruncă `ToolError` dacă hostname-ul e intern sau rezolvă la un IP intern.
 * Numele evident interne sunt respinse înainte de rezolvare.
 */
export async function assertPublicHost(hostname: string): Promise<void> {
  const host = hostname.toLowerCase().replace(/\.$/, '');
  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.home.arpa')
  ) {
    throw new ToolError('Adresă internă blocată.');
  }

  let addresses: string[];
  if (isIP(host)) {
    addresses = [host];
  } else {
    try {
      const res = await lookup(host, { all: true });
      addresses = res.map((r) => r.address);
    } catch {
      throw new ToolError('Domeniul nu poate fi rezolvat.');
    }
  }
  if (addresses.length === 0) throw new ToolError('Domeniul nu poate fi rezolvat.');
  for (const ip of addresses) {
    if (isPrivateIp(ip)) throw new ToolError('Adresă internă blocată.');
  }
}
