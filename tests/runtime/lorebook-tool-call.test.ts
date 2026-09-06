import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import {
  LOREBOOK_TOOL_CALL_TOOL_NAMES,
  LOREBOOK_TOOL_CALL_RESEARCH_COMMIT,
  createLorebookToolCallWorkbench,
  inspectLorebookToolCall,
  normalizeDedicatedLorebookName,
} from '../../src/runtime/lorebook-tool-call';

describe('optional LorebookToolCall boundary', () => {
  const capableHost = {
    isToolCallingSupported: () => true,
    canPerformToolCalls: (type: 'function') => type === 'function',
  };

  it('is disabled by default and does not need a host', () => {
    expect(inspectLorebookToolCall()).toMatchObject({
      availability: 'disabled', enabled: false, extensionInstallation: 'not-probed',
    });
    expect(createLorebookToolCallWorkbench()).toBeUndefined();
  });

  it('only reports ready after explicit opt-in and confirmed host capability', () => {
    const status = inspectLorebookToolCall({ enabled: true }, capableHost);
    expect(status).toMatchObject({ availability: 'ready', hostSupportsFunctionTools: true });
    expect(status.tools).toEqual(LOREBOOK_TOOL_CALL_TOOL_NAMES);
    expect(status.researchCommit).toBe(LOREBOOK_TOOL_CALL_RESEARCH_COMMIT);
    expect(status.extensionInstallation).toBe('not-probed');
  });

  it('handles missing, denied, and throwing hosts without affecting startup', () => {
    expect(inspectLorebookToolCall({ enabled: true })).toMatchObject({ availability: 'unavailable' });
    expect(inspectLorebookToolCall({ enabled: true }, {
      isToolCallingSupported: () => true,
      canPerformToolCalls: () => false,
    })).toMatchObject({ availability: 'unsupported' });
    expect(inspectLorebookToolCall({ enabled: true }, {
      isToolCallingSupported: () => { throw new Error('denied'); },
    })).toMatchObject({ availability: 'unsupported' });
  });

  it('only describes a dedicated Albina naming convention and never exposes an action API', () => {
    expect(createLorebookToolCallWorkbench({ enabled: true, lorebookName: 'Other Notes' })).toBeUndefined();
    expect(createLorebookToolCallWorkbench({ enabled: true, lorebookName: 'Albina - Workbench/escape' })).toBeUndefined();
    expect(createLorebookToolCallWorkbench({ enabled: true, lorebookName: 'Albina - Workbench' })).toEqual({
      lorebookName: 'Albina - Workbench',
      rootPath: '/Worldbooks/Albina - Workbench',
      recommendedEntryPrefix: 'albina.',
      tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
      worldbookPackageIds: [],
      policy: { autoInstall: false, autoRegister: false, autoWrite: false, fallback: 'embedded-l0-and-local-storage' },
    });
  });

  it('normalizes a dedicated display name but rejects virtual-path and control-character input', () => {
    expect(normalizeDedicatedLorebookName('  Albina -  世界书工作台  ')).toBe('Albina - 世界书工作台');
    for (const name of [
      'Albina - Workbench\\escape',
      'Albina - Workbench#fragment',
      'Albina - Workbench%2fescape',
      'Albina - ..',
      'Albina - \u0000hidden',
    ]) {
      expect(createLorebookToolCallWorkbench({ enabled: true, lorebookName: name })).toBeUndefined();
    }
  });

  it('connects an optional canonical preset without importing or mutating it', () => {
    const workbench = createLorebookToolCallWorkbench({
      enabled: true,
      lorebookName: 'Albina - Canonical',
      worldbookPreset: 'canonicalCore',
    });
    expect(workbench).toMatchObject({
      worldbookPreset: 'canonicalCore',
      worldbookPackageIds: ['l1-albina-core', 'l2-canto-ix-and-main-cast', 'plot-full-timeline'],
      policy: { autoInstall: false, autoRegister: false, autoWrite: false },
    });
  });

  it('fails closed for audit-only package selections while preserving the descriptor fallback', () => {
    const workbench = createLorebookToolCallWorkbench({
      enabled: true,
      lorebookName: 'Albina - Audit Probe',
      worldbookPackageIds: ['source-index' as never],
    });
    expect(workbench).toMatchObject({ worldbookPackageIds: [], policy: { autoWrite: false, fallback: 'embedded-l0-and-local-storage' } });
  });

  it('fails closed for unknown package selections instead of describing unverified IDs', () => {
    const workbench = createLorebookToolCallWorkbench({
      enabled: true,
      lorebookName: 'Albina - Unknown Probe',
      worldbookPackageIds: ['package-from-nowhere' as never],
    });
    expect(workbench?.worldbookPackageIds).toEqual([]);
  });

  it('does not bundle, register, or invoke the separately installed AFPL extension', async () => {
    const source = await readFile(resolve(process.cwd(), 'src/runtime/lorebook-tool-call.ts'), 'utf8');
    expect(source).not.toContain('cdn.jsdelivr.net');
    expect(source).not.toContain('wtc/index.js');
    expect(source).not.toContain('registerFunctionTool');
    expect(source).not.toContain('unregisterFunctionTool');
    expect(source).not.toContain('saveWorldInfo(');
  });
});
