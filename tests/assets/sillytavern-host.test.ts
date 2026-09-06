import { describe, expect, it } from 'vitest';

import {
  buildSillyTavernChildEnv,
  buildSillyTavernInstallPlan,
  discoverSillyTavernRoot,
  parseSillyTavernBase,
  probeSillyTavern,
} from '../../scripts/lib/sillytavern-host.mjs';

describe('SillyTavern host path and probe module', () => {
  it('accepts only loopback bases and normalizes the port', () => {
    expect(parseSillyTavernBase('http://127.0.0.1:8924/')).toMatchObject({ base: 'http://127.0.0.1:8924', port: 8924 });
    expect(() => parseSillyTavernBase('https://example.test:8924')).toThrow('must be local');
  });

  it('discovers a configured server.js without touching the process environment', () => {
    expect(discoverSillyTavernRoot({ env: { SILLYTAVERN_ROOT: 'D:/sillytavern/SillyTavernLauncher/SillyTavernLauncher1.3.9/SillyTavern' }, candidates: [] }))
      .toBe('D:\\sillytavern\\SillyTavernLauncher\\SillyTavernLauncher1.3.9\\SillyTavern');
  });

  it('builds a SillyTavern child environment without the safe-delete preload', () => {
    const env = buildSillyTavernChildEnv({
      NODE_OPTIONS: '--require="C:/work/genie-safe-delete.cjs" --use-system-ca --require ./ordinary-preload.cjs',
      CODEBUDDY_SAFE_DELETE_MODE: 'recycle',
      CODEBUDDY_SAFE_DELETE_TIMEOUT_MS: '1000',
      ORDINARY_VARIABLE: 'retained',
    });
    expect(env.NODE_OPTIONS).not.toContain('genie-safe-delete.cjs');
    expect(env.NODE_OPTIONS).toContain('--use-system-ca');
    expect(env.NODE_OPTIONS).toContain('--require ./ordinary-preload.cjs');
    expect(env.ORDINARY_VARIABLE).toBe('retained');
    expect(Object.keys(env).filter((key) => key.startsWith('CODEBUDDY_SAFE_DELETE_'))).toEqual([]);
    expect(env.NODE_ENV).toBe('production');
  });

  it('builds an isolated install command and does not claim readiness without files', () => {
    const plan = buildSillyTavernInstallPlan({
      projectRoot: 'D:/創作/albina-v2-complete',
      base: 'http://127.0.0.1:8924',
      tavernRoot: 'D:/sillytavern/SillyTavernLauncher/SillyTavernLauncher1.3.9/SillyTavern',
      forgeRoot: 'C:/missing/tavern-forge',
    });
    expect(plan.command).toContain('--base http://127.0.0.1:8924');
    expect(plan.command).toContain('--data-root');
    expect(plan.ready).toBe(false);
  });

  it('reports API readiness from the CSRF handshake only', async () => {
    const result = await probeSillyTavern('http://127.0.0.1:8924', {
      fetchImpl: async () => new Response('{"token":"test"}', { status: 200, headers: { 'content-type': 'application/json' } }),
    });
    expect(result).toMatchObject({ status: 'api-ready', statusCode: 200 });
  });
});
