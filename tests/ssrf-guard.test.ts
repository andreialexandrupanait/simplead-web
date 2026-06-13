import { describe, expect, it } from 'vitest';
import { isPrivateIp, parseToolUrl, ToolError } from '@lib/server/tools/ssrf-guard';

describe('parseToolUrl', () => {
  it('adaugă https:// dacă lipsește schema', () => {
    expect(parseToolUrl('exemplu.ro').href).toBe('https://exemplu.ro/');
  });

  it('respinge scheme non-http(s)', () => {
    expect(() => parseToolUrl('file:///etc/passwd')).toThrow(ToolError);
    expect(() => parseToolUrl('ftp://exemplu.ro')).toThrow(ToolError);
    expect(() => parseToolUrl('gopher://x')).toThrow(ToolError);
  });

  it('respinge URL-urile cu credențiale', () => {
    expect(() => parseToolUrl('https://user:pass@exemplu.ro')).toThrow(ToolError);
  });
});

describe('isPrivateIp', () => {
  it('marchează ca interne IP-urile loopback/private/link-local/CGNAT', () => {
    for (const ip of [
      '127.0.0.1',
      '10.0.0.5',
      '172.16.4.4',
      '172.31.255.255',
      '192.168.1.1',
      '169.254.169.254', // metadata cloud
      '100.64.0.1', // CGNAT
      '0.0.0.0',
      '::1',
      'fe80::1',
      'fc00::1',
      'fd12:3456::1',
      '::ffff:192.168.0.1', // IPv4-mapat privat
    ]) {
      expect(isPrivateIp(ip), ip).toBe(true);
    }
  });

  it('acceptă IP-uri publice', () => {
    for (const ip of ['8.8.8.8', '1.1.1.1', '93.184.216.34', '2606:4700:4700::1111']) {
      expect(isPrivateIp(ip), ip).toBe(false);
    }
  });

  it('tratează inputul ne-IP ca nesigur', () => {
    expect(isPrivateIp('not-an-ip')).toBe(true);
  });
});
