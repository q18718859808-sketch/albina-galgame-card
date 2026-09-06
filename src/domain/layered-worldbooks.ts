import layeredWorldbooksManifest from '../../content/worldbook/albina-worldbook-packages-v1.manifest.json';
import { z } from 'zod';

const LAYERED_WORLDBOOK_PRESET_IDS = [
  'minimal', 'canonicalCore', 'canonicalExpanded', 'mechanicsOptIn', 'identityOptIn', 'auOptIn', 'neverRuntime',
] as const;

const PackageSchema = z.object({
  id: z.string().min(1),
  file: z.string().min(1),
  defaultEnabled: z.boolean(),
  entryCount: z.number().int().nonnegative(),
  enabledEntryCount: z.number().int().nonnegative(),
  contentCharacters: z.number().int().nonnegative(),
  constantCharacters: z.number().int().nonnegative(),
  sha256: z.string().regex(/^[a-f0-9]{64}$/u),
}).strict();

const ManifestSchema = z.object({
  schemaVersion: z.literal(1),
  id: z.literal('albina-layered-worldbooks-v1'),
  presets: z.record(z.string(), z.array(z.string().min(1))),
  l0: z.object({ id: z.string(), file: z.string(), entryCount: z.number(), sha256: z.string() }).passthrough(),
  packages: z.array(PackageSchema),
}).passthrough();

export const layeredWorldbooks = ManifestSchema.parse(layeredWorldbooksManifest);
export type LayeredWorldbookPackage = z.infer<typeof PackageSchema>;
export const LayeredWorldbookPresetIdSchema = z.enum(LAYERED_WORLDBOOK_PRESET_IDS);
export type LayeredWorldbookPresetId = z.infer<typeof LayeredWorldbookPresetIdSchema>;
export type LayeredWorldbookPackageId = LayeredWorldbookPackage['id'];

export const LAYERED_WORLDBOOK_TOOL_CALL_POLICY = Object.freeze({
  enabledByDefault: false,
  autoInstall: false,
  autoRegister: false,
  autoWrite: false,
  fallback: 'embedded-l0-and-local-storage',
} as const);

export const LAYERED_WORLDBOOK_PRESET_LABELS: Record<string, string> = {
  minimal: 'Embedded L0 fallback', canonicalCore: 'Canon core', canonicalExpanded: 'Canon expanded',
  mechanicsOptIn: 'Mechanics add-on', identityOptIn: 'Identity add-on', auOptIn: 'AU / IF add-on', neverRuntime: 'Never import',
};

export const DEFAULT_LAYERED_WORLDBOOK_PRESET: LayeredWorldbookPresetId = 'canonicalCore';

export function packageFileName(file: string): string {
  const name = file.replaceAll('\\', '/').split('/').at(-1);
  if (!name || name === '.' || name === '..') throw new Error(`Invalid worldbook package filename: ${file}`);
  return name;
}

export function isRuntimeInstallablePackage(id: string): boolean {
  return layeredWorldbooks.packages.some((item) => item.id === id)
    && !layeredWorldbooks.presets.neverRuntime?.includes(id);
}

export function packagesForPreset(preset: LayeredWorldbookPresetId): LayeredWorldbookPackage[] {
  const lookup = new Map(layeredWorldbooks.packages.map((item) => [item.id, item]));
  return (layeredWorldbooks.presets[preset] ?? []).map((id) => lookup.get(id)).filter((item): item is LayeredWorldbookPackage => item !== undefined);
}

/**
 * Returns only runtime-installable package IDs for an optional external
 * workbench. This is selection data, not an import or mutation operation.
 */
export function packageIdsForOptionalToolCall(preset: LayeredWorldbookPresetId): LayeredWorldbookPackageId[] {
  return packagesForPreset(preset)
    .filter((item) => isRuntimeInstallablePackage(item.id))
    .map((item) => item.id);
}

export interface WorldbookPackageSelection {
  presetId: LayeredWorldbookPresetId;
  packageIds: LayeredWorldbookPackageId[];
}

export const WorldbookPackageSelectionSchema = z
  .object({
    presetId: LayeredWorldbookPresetIdSchema,
    packageIds: z.array(z.string().min(1).refine(isRuntimeInstallablePackage, 'Worldbook package is not runtime-installable.')),
  })
  .strict()
  .superRefine((selection, context) => {
    if (selection.presetId === 'neverRuntime') {
      context.addIssue({ code: z.ZodIssueCode.custom, path: ['presetId'], message: 'The neverRuntime preset cannot be persisted as an active selection.' });
    }
  })
  .transform((selection) => normalizeWorldbookSelection(selection.presetId, selection.packageIds));

export function worldbookSelectionForPreset(preset: LayeredWorldbookPresetId): WorldbookPackageSelection {
  return { presetId: preset, packageIds: packageIdsForOptionalToolCall(preset) };
}

export function normalizeWorldbookSelection(
  preset: LayeredWorldbookPresetId,
  packageIds?: readonly string[],
): WorldbookPackageSelection {
  const selected = packageIds === undefined
    ? worldbookSelectionForPreset(preset).packageIds
    : [...new Set(packageIds)].filter(isRuntimeInstallablePackage);
  return { presetId: preset, packageIds: selected };
}

export function defaultWorldbookPackageSelection(): WorldbookPackageSelection {
  return worldbookSelectionForPreset(DEFAULT_LAYERED_WORLDBOOK_PRESET);
}
