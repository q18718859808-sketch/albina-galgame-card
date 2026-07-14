import { parseSaveV2, type SaveV2 } from '../domain/save';
import type { HostLifecycleEvent, TavernHelperBindings } from './host-adapter';

const LOCAL_STORAGE_SAVE_KEY = 'albina-v2-save';
export const TAVERN_HELPER_SAVE_KEY = 'albinaSaveV2';

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

export function createDefaultHostBindings(): TavernHelperBindings {
  return {
    getChatId: () => helper()?.getChatId?.() ?? 'standalone',
    async loadSave() {
      const active = helper();
      if (active?.getVariables) {
        const variables = await active.getVariables({ type: 'chat' });
        if (variables[TAVERN_HELPER_SAVE_KEY]) return parseSaveV2(variables[TAVERN_HELPER_SAVE_KEY]);
      }
      const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(LOCAL_STORAGE_SAVE_KEY);
      return raw ? parseSaveV2(JSON.parse(raw)) : undefined;
    },
    async saveSave(save: SaveV2) {
      const active = helper();
      if (active?.setVariables) await active.setVariables({ [TAVERN_HELPER_SAVE_KEY]: save }, { type: 'chat' });
      if (typeof localStorage !== 'undefined') localStorage.setItem(LOCAL_STORAGE_SAVE_KEY, JSON.stringify(save));
    },
    subscribe(event: HostLifecycleEvent, listener: () => void) {
      if (typeof window === 'undefined') return () => undefined;
      const name = `albina:${event}`;
      window.addEventListener(name, listener);
      return () => window.removeEventListener(name, listener);
    },
  };
}
