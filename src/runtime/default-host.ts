import {
  decodeSaveJson,
  decodeSaveV2OrV1,
  SaveRecoveryError,
  type SaveDecodeResult,
} from '../domain/migrate-save-v1';
import { parseSaveV2, type SaveV2 } from '../domain/save';
import type { HostLifecycleEvent, TavernHelperBindings } from './host-adapter';

const LOCAL_STORAGE_SAVE_KEY = 'albina-v2-save';
export const TAVERN_HELPER_SAVE_KEY = 'albinaSaveV2';
export const LEGACY_TAVERN_HELPER_SAVE_KEY = 'albinaGalgameCardGameSaveV1';

interface TavernHelperLike {
  getChatId?: () => string | undefined;
  getVariables?: (options?: unknown) => Promise<Record<string, unknown>> | Record<string, unknown>;
  setVariables?: (variables: Record<string, unknown>, options?: unknown) => Promise<void> | void;
}

declare global {
  interface Window {
    TavernHelper?: TavernHelperLike;
    __ALBINA_DISABLE_AUTOINSTALL__?: boolean;
  }
}

function helper(): TavernHelperLike | undefined { return typeof window === 'undefined' ? undefined : window.TavernHelper; }

function decodeCandidate(value: unknown): SaveDecodeResult {
  return typeof value === 'string' ? decodeSaveJson(value) : decodeSaveV2OrV1(value);
}

function localSave(): { result?: SaveDecodeResult; error?: SaveRecoveryError } {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);
    return raw === null ? {} : { result: decodeSaveJson(raw) };
  } catch (error) {
    return { error: new SaveRecoveryError('storage-read-failed', 'Local save storage could not be read.', { cause: error }) };
  }
}

async function persistRecoveredSave(active: TavernHelperLike | undefined, save: SaveV2): Promise<void> {
  try {
    await active?.setVariables?.({ [TAVERN_HELPER_SAVE_KEY]: save }, { type: 'chat' });
  } catch (error) {
    console.warn('[albina-save] unable to persist migrated Tavern Helper save', error);
  }
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, JSON.stringify(save));
  } catch (error) {
    console.warn('[albina-save] unable to persist migrated local save', error);
  }
}

function candidateAt(variables: Record<string, unknown>, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : undefined;
}

export function createDefaultHostBindings(): TavernHelperBindings {
  return {
    getChatId: () => helper()?.getChatId?.() ?? 'standalone',
    async loadSave() {
      const active = helper();
      const failures: SaveRecoveryError[] = [];
      if (active?.getVariables) {
        try {
          const variables = await active.getVariables({ type: 'chat' });
          for (const key of [TAVERN_HELPER_SAVE_KEY, LEGACY_TAVERN_HELPER_SAVE_KEY]) {
            const candidate = candidateAt(variables, key);
            if (candidate === undefined) continue;
            const decoded = decodeCandidate(candidate);
            if (!decoded.ok) { failures.push(decoded.error); continue; }
            if (decoded.source === 'v1.0.44') await persistRecoveredSave(active, decoded.save);
            return decoded.save;
          }
        } catch (error) {
          failures.push(new SaveRecoveryError('storage-read-failed', 'Tavern Helper save variables could not be read.', { cause: error }));
        }
      }
      const local = localSave();
      if (local.error) failures.push(local.error);
      if (local.result?.ok) {
        await persistRecoveredSave(active, local.result.save);
        return local.result.save;
      }
      if (local.result && !local.result.ok) failures.push(local.result.error);
      if (failures.length > 0) throw failures[0];
      return undefined;
    },
    async saveSave(save: SaveV2) {
      const validated = parseSaveV2(save);
      const active = helper();
      if (active?.setVariables) await active.setVariables({ [TAVERN_HELPER_SAVE_KEY]: validated }, { type: 'chat' });
      if (typeof localStorage !== 'undefined') localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, JSON.stringify(validated));
    },
    subscribe(event: HostLifecycleEvent, listener: () => void) {
      if (typeof window === 'undefined') return () => undefined;
      const name = `albina:${event}`;
      window.addEventListener(name, listener);
      return () => window.removeEventListener(name, listener);
    },
  };
}
