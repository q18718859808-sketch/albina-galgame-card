import {
  isRuntimeInstallablePackage, layeredWorldbooks, LAYERED_WORLDBOOK_PRESET_LABELS,
  packageFileName, packagesForPreset, type LayeredWorldbookPackage, type LayeredWorldbookPresetId,
} from '../domain/layered-worldbooks';

export interface DiscoverableWorldbookPackage extends LayeredWorldbookPackage {
  readonly downloadUrl: string;
  readonly installable: boolean;
}
export interface DiscoverableWorldbookPreset {
  readonly id: LayeredWorldbookPresetId;
  readonly label: string;
  readonly packages: readonly DiscoverableWorldbookPackage[];
  readonly installable: boolean;
}
export interface LayeredWorldbookCatalog {
  readonly l0: { id: string; entryCount: number; note: string };
  readonly presets: readonly DiscoverableWorldbookPreset[];
  readonly installInstructions: readonly string[];
}

/**
 * Publishes released JSON URLs and import instructions only. No unverified
 * SillyTavern worldbook mutation API is called here.
 */
export function createLayeredWorldbookCatalog(sourceUrl = import.meta.url): LayeredWorldbookCatalog {
  const toPackage = (item: LayeredWorldbookPackage): DiscoverableWorldbookPackage => ({
    ...item,
    downloadUrl: new URL(`../worldbooks/${packageFileName(item.file)}`, sourceUrl).href,
    installable: isRuntimeInstallablePackage(item.id),
  });
  const presets = Object.keys(LAYERED_WORLDBOOK_PRESET_LABELS).map((id) => {
    const presetId = id as LayeredWorldbookPresetId;
    const packages = packagesForPreset(presetId).map(toPackage);
    return { id: presetId, label: LAYERED_WORLDBOOK_PRESET_LABELS[id] ?? id, packages, installable: packages.length > 0 && packages.every((item) => item.installable) };
  });
  return {
    l0: { id: layeredWorldbooks.l0.id, entryCount: layeredWorldbooks.l0.entryCount, note: 'The 16 L0 anchors are embedded in the card. Use L0 alone, or import a layered preset; do not combine them.' },
    presets,
    installInstructions: [
      'Select a preset and download every listed JSON package.',
      'In SillyTavern, import the downloaded worldbooks through its normal worldbook UI, then enable only the selected package set.',
      'Do not import audit/index packages. The optional LorebookToolCall workbench is not required for this flow.',
    ],
  };
}
