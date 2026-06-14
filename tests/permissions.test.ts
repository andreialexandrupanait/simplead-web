import { describe, expect, it } from 'vitest';
import { roleAllows } from '@lib/permissions';

describe('access control — roleAllows (capabilities, nu nume de rol)', () => {
  it('admin poate tot', () => {
    expect(roleAllows('admin', { user: ['create'] })).toBe(true);
    expect(roleAllows('admin', { user: ['set-role', 'ban'] })).toBe(true);
    expect(roleAllows('admin', { content: ['publish'] })).toBe(true);
    expect(roleAllows('admin', { settings: ['manage'] })).toBe(true);
    expect(roleAllows('admin', { audit: ['view'] })).toBe(true);
  });

  it('editor: tot conținutul, dar fără useri/setări', () => {
    expect(roleAllows('editor', { content: ['publish'] })).toBe(true);
    expect(roleAllows('editor', { content: ['edit-any', 'delete'] })).toBe(true);
    expect(roleAllows('editor', { user: ['create'] })).toBe(false);
    expect(roleAllows('editor', { settings: ['manage'] })).toBe(false);
  });

  it('author: doar propriul conținut', () => {
    expect(roleAllows('author', { content: ['edit-own'] })).toBe(true);
    expect(roleAllows('author', { content: ['publish'] })).toBe(false);
    expect(roleAllows('author', { content: ['edit-any'] })).toBe(false);
    expect(roleAllows('author', { user: ['create'] })).toBe(false);
  });

  it('client: doar zona de cont', () => {
    expect(roleAllows('client', { clientArea: ['view'] })).toBe(true);
    expect(roleAllows('client', { content: ['edit-own'] })).toBe(false);
    expect(roleAllows('client', { user: ['list'] })).toBe(false);
  });

  it('rol lipsă sau necunoscut = refuz', () => {
    expect(roleAllows(null, { content: ['edit-own'] })).toBe(false);
    expect(roleAllows(undefined, { clientArea: ['view'] })).toBe(false);
    expect(roleAllows('accountant', { content: ['edit-own'] })).toBe(false);
  });
});
