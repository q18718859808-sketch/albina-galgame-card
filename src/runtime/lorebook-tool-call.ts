/**
 * Boundary adapter for a user-installed LorebookToolCall workbench.
 *
 * The upstream extension is AFPL-licensed and owns registration, permission
 * prompts, backups, and mutations.  Albina deliberately does not import it,
 * register its tools, or invoke its write APIs.  This adapter therefore only
 * reports whether the host can support function tools and supplies a narrowly
 * scoped workbench descriptor for an explicitly enabled, user-installed copy.
 */

/**
 * Pinned research snapshot, not an upstream semantic release version.
 * See framework-research/tavern-integrations/integration-provenance.json.
 */
export const LOREBOOK_TOOL_CALL_RESEARCH_COMMIT = 'b8eb5703ee945c40c29bdb6f6c9502224b9d6143';

export const LOREBOOK_TOOL_CALL_TOOL_NAMES = [
  'Glob',
  'Grep',
  'Read',
  'Write',
  'Edit',
  'Delete',
  'CreateLorebook',
  'GetAttribute',
  'SetAttribute',
] as const;

export type LorebookToolCallToolName = (typeof LOREBOOK_TOOL_CALL_TOOL_NAMES)[number];

export interface LorebookToolCallHost {
  isToolCallingSupported?: () => boolean;
  canPerformToolCalls?: (type: 'function') => boolean;
}

export interface LorebookToolCallOptions {
  /** Opt-in only. The default card path must never depend on this extension. */
  enabled?: boolean;
  /** The user-owned, dedicated worldbook to maintain through the extension UI. */
  lorebookName?: string;
  /** Optional package selection; it is never imported or written here. */
  worldbookPreset?: LayeredWorldbookPresetId;
  worldbookPackageIds?: readonly LayeredWorldbookPackageId[];
}

export type LorebookToolCallAvailability =
  | 'disabled'
  | 'unsupported'
  | 'unavailable'
  | 'ready';

export interface LorebookToolCallStatus {
  availability: LorebookToolCallAvailability;
  enabled: boolean;
  hostSupportsFunctionTools: boolean;
  extensionInstallation: 'not-probed';
  researchCommit: typeof LOREBOOK_TOOL_CALL_RESEARCH_COMMIT;
  tools: readonly LorebookToolCallToolName[];
  message: string;
}

export interface LorebookToolCallWorkbench {
  readonly lorebookName: string;
  readonly rootPath: string;
  /** Naming convention only; it is not an upstream permission boundary. */
  readonly recommendedEntryPrefix: 'albina.';
  readonly tools: readonly LorebookToolCallToolName[];
  readonly worldbookPreset?: LayeredWorldbookPresetId;
  readonly worldbookPackageIds: readonly LayeredWorldbookPackageId[];
  readonly policy: {
    readonly autoInstall: false;
    readonly autoRegister: false;
    readonly autoWrite: false;
    readonly fallback: 'embedded-l0-and-local-storage';
  };
}

/**
 * LorebookToolCall exposes virtual filesystem roots.  This is deliberately
 * stricter than a display label so the descriptor can never hand an upstream
 * workbench a path-like or control-character-bearing worldbook name.  It is a
 * local input boundary only; upstream still owns authorization and mutation.
 */
export function normalizeDedicatedLorebookName(value: string | undefined): string | undefined {
  if (typeof value !== 'string') return undefined;
  const name = value.normalize('NFC').trim();
  const suffix = name.startsWith('Albina - ') ? name.slice('Albina - '.length).trim() : '';
  if (!suffix || suffix.length > 80) return undefined;
  if (/[\u0000-\u001f\u007f/\\:*?"<>|#%]/u.test(name)) return undefined;
  if (suffix === '.' || suffix === '..') return undefined;
  return `Albina - ${suffix}`;
}

function selectedPackageIds(options: LorebookToolCallOptions): LayeredWorldbookPackageId[] {
  const ids = options.worldbookPackageIds
    ? [...new Set(options.worldbookPackageIds)]
    : options.worldbookPreset
      ? packageIdsForOptionalToolCall(options.worldbookPreset)
      : [];
  if (ids.some((id) => !isRuntimeInstallablePackage(id))) return [];
  return ids;
}

function hostFromWindow(): LorebookToolCallHost | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as Window & { SillyTavern?: LorebookToolCallHost }).SillyTavern;
}

function supportsFunctionTools(host: LorebookToolCallHost | undefined): boolean {
  try {
    return host?.isToolCallingSupported?.() === true
      && host.canPerformToolCalls?.('function') === true;
  } catch {
    return false;
  }
}

/**
 * Returns a safe status without guessing whether the third-party extension is
 * installed. Its upstream source exposes no confirmed discovery API; probing
 * private registries would make the game depend on an unverified contract.
 */
export function inspectLorebookToolCall(
  options: LorebookToolCallOptions = {},
  host = hostFromWindow(),
): LorebookToolCallStatus {
  const hostSupportsFunctionTools = supportsFunctionTools(host);
  if (options.enabled !== true) {
    return {
      availability: 'disabled', enabled: false, hostSupportsFunctionTools,
      extensionInstallation: 'not-probed', researchCommit: LOREBOOK_TOOL_CALL_RESEARCH_COMMIT,
      tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
      message: 'Lorebook workbench is disabled. Albina is running with its normal TavernHelper/localStorage persistence path.',
    };
  }
  if (!host) {
    return {
      availability: 'unavailable', enabled: true, hostSupportsFunctionTools: false,
      extensionInstallation: 'not-probed', researchCommit: LOREBOOK_TOOL_CALL_RESEARCH_COMMIT,
      tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
      message: 'No SillyTavern function-tool host was found; the optional workbench is unavailable.',
    };
  }
  if (!hostSupportsFunctionTools) {
    return {
      availability: 'unsupported', enabled: true, hostSupportsFunctionTools: false,
      extensionInstallation: 'not-probed', researchCommit: LOREBOOK_TOOL_CALL_RESEARCH_COMMIT,
      tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
      message: 'This SillyTavern host does not currently support function tools; the optional workbench is unavailable.',
    };
  }
  return {
    availability: 'ready', enabled: true, hostSupportsFunctionTools: true,
    extensionInstallation: 'not-probed', researchCommit: LOREBOOK_TOOL_CALL_RESEARCH_COMMIT,
    tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
    message: 'Function tools are supported. Install and authorize LorebookToolCall separately; Albina never imports or invokes it.',
  };
}

/**
 * Creates a descriptor for a user-owned dedicated Albina worldbook. It does
 * not create, read, write, edit, or delete a worldbook entry.
 */
export function createLorebookToolCallWorkbench(
  options: LorebookToolCallOptions = {},
): LorebookToolCallWorkbench | undefined {
  if (options.enabled !== true) return undefined;
  const name = normalizeDedicatedLorebookName(options.lorebookName);
  if (!name) return undefined;
  return {
    lorebookName: name,
    rootPath: `/Worldbooks/${name}`,
    recommendedEntryPrefix: 'albina.',
    tools: LOREBOOK_TOOL_CALL_TOOL_NAMES,
    ...(options.worldbookPreset ? { worldbookPreset: options.worldbookPreset } : {}),
    worldbookPackageIds: selectedPackageIds(options),
    policy: {
      autoInstall: false,
      autoRegister: false,
      autoWrite: false,
      fallback: 'embedded-l0-and-local-storage',
    },
  };
}
import {
  isRuntimeInstallablePackage,
  packageIdsForOptionalToolCall,
  type LayeredWorldbookPackageId,
  type LayeredWorldbookPresetId,
} from '../domain/layered-worldbooks';
