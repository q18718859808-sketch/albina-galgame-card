import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import {
  PLAYER_PROFILE_FIELDS,
  PLAYER_PROFILE_UPDATE_EVENTS,
  PLAYER_PROFILE_VARIABLE_KEY,
  PlayerProfileSchema,
  createDefaultPlayerProfile,
} from '../../src/domain/player-profile';

const execute = promisify(execFile);
const root = process.cwd();
const load = async <T>(path: string): Promise<T> => JSON.parse(await readFile(join(root, path), 'utf8')) as T;

interface ContractField { path: string; maxLength?: number; default: string; updatedBy: string[]; readBy: string[] }
interface ProfileContract { variableKey: string; scope: string; fields: ContractField[] }
interface InitVar { variableKey: string; scope: string; defaults: Record<string, string>; worldbookEntryId: string }
interface UpdateRules { variableKey: string; rules: Array<{ id: string; target: string }> }

describe('TavernForge player profile four-link contract', () => {
  it('keeps schema, InitVar, update rules, and reads synchronized', async () => {
    const [contract, initvar, updates] = await Promise.all([
      load<ProfileContract>('content/worldbook/player-profile-schema-v1.json'),
      load<InitVar>('content/worldbook/player-profile-initvar-v1.json'),
      load<UpdateRules>('content/worldbook/player-profile-update-rules-v1.json'),
    ]);
    expect(contract.variableKey).toBe(PLAYER_PROFILE_VARIABLE_KEY);
    expect(initvar.variableKey).toBe(PLAYER_PROFILE_VARIABLE_KEY);
    expect(updates.variableKey).toBe(PLAYER_PROFILE_VARIABLE_KEY);
    expect(contract.scope).toBe('chat');
    expect(initvar.scope).toBe('chat');
    expect(contract.fields.map((field) => field.path)).toEqual([...PLAYER_PROFILE_FIELDS]);
    expect(Object.keys(initvar.defaults)).toEqual(expect.arrayContaining([...PLAYER_PROFILE_FIELDS]));
    expect(Object.fromEntries(contract.fields.map((field) => [field.path, field.default]))).toEqual(initvar.defaults);
    expect(updates.rules.map((rule) => rule.id)).toEqual(Object.keys(PLAYER_PROFILE_UPDATE_EVENTS));
    expect(updates.rules.every((rule) => rule.target === PLAYER_PROFILE_VARIABLE_KEY)).toBe(true);
    expect(contract.fields.every((field) => field.updatedBy.includes('profile_submit'))).toBe(true);
    expect(contract.fields.every((field) => field.readBy.includes('save_v2') && field.readBy.includes('worldbook_ejs'))).toBe(true);
  });

  it('enforces field limits and route values in the domain schema', () => {
    const profile = createDefaultPlayerProfile();
    expect(PlayerProfileSchema.parse(profile)).toEqual(profile);
    expect(() => PlayerProfileSchema.parse({ ...profile, name: 'x'.repeat(81) })).toThrow();
    expect(() => PlayerProfileSchema.parse({ ...profile, boundaries: 'x'.repeat(801) })).toThrow();
    expect(() => PlayerProfileSchema.parse({ ...profile, routePreference: 'unknown' })).toThrow();
    expect(() => PlayerProfileSchema.parse({ ...profile, unknown: true })).toThrow();
  });

  it('locks the existing sixteen embedded entries and runs the standalone audit', async () => {
    const result = await execute(process.execPath, [join(root, 'scripts/audit-player-profile-runtime.mjs')], { cwd: root });
    const audit = JSON.parse(result.stdout) as { ok: boolean; fieldCount: number; embeddedWorldbookEntries: number };
    expect(audit).toMatchObject({ ok: true, fieldCount: 9, embeddedWorldbookEntries: 16 });
    expect(result.stderr).toBe('');
  });
});
