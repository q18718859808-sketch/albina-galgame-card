import { describe, expect, it } from 'vitest';
import {
  LAYERED_WORLDBOOK_TOOL_CALL_POLICY,
  isRuntimeInstallablePackage,
  layeredWorldbooks,
  packageIdsForOptionalToolCall,
  packagesForPreset,
} from '../../src/domain/layered-worldbooks';
import { createLayeredWorldbookCatalog } from '../../src/runtime/layered-worldbooks';

describe('layered worldbook selection catalog', () => {
  it('exposes released downloads and normal SillyTavern import guidance', () => {
    const catalog = createLayeredWorldbookCatalog('https://example.invalid/release/source/albina-source.js');
    const core = catalog.presets.find((preset) => preset.id === 'canonicalCore');
    expect(core?.installable).toBe(true);
    expect(core?.packages.map((item) => item.id)).toEqual(layeredWorldbooks.presets.canonicalCore);
    expect(core?.packages.every((item) => item.downloadUrl.startsWith('https://example.invalid/release/worldbooks/'))).toBe(true);
    expect(catalog.installInstructions.join(' ')).toMatch(/normal worldbook UI/u);
    expect(catalog.installInstructions.join(' ')).toMatch(/not required/u);
  });

  it('keeps audit-only material blocked and L0 separate', () => {
    const catalog = createLayeredWorldbookCatalog('https://example.invalid/release/source/albina-source.js');
    const excluded = catalog.presets.find((preset) => preset.id === 'neverRuntime');
    expect(excluded?.installable).toBe(false);
    expect(excluded?.packages.map((item) => item.id)).toEqual(layeredWorldbooks.presets.neverRuntime);
    expect(catalog.l0).toMatchObject({ id: 'l0-minimal-card-anchors', entryCount: 16 });
    expect(packagesForPreset('minimal')).toEqual([]);
  });

  it('exposes only runtime-installable package IDs to the optional workbench', () => {
    expect(packageIdsForOptionalToolCall('canonicalCore')).toEqual(layeredWorldbooks.presets.canonicalCore);
    expect(packageIdsForOptionalToolCall('neverRuntime')).toEqual([]);
    expect(LAYERED_WORLDBOOK_TOOL_CALL_POLICY).toEqual({
      enabledByDefault: false,
      autoInstall: false,
      autoRegister: false,
      autoWrite: false,
      fallback: 'embedded-l0-and-local-storage',
    });
    expect(isRuntimeInstallablePackage('package-from-nowhere')).toBe(false);
  });
});
