import {
  decodeSaveJson,
  decodeSaveV2OrV1,
  SaveRecoveryError,
  type SaveDecodeResult,
} from '../domain/migrate-save-v1';
import { PlayerProfileSchema, type PlayerProfile } from '../domain/player-profile';
import { parseSaveV2, type SaveV2 } from '../domain/save';
import { WorldbookPackageSelectionSchema, type WorldbookPackageSelection } from '../domain/layered-worldbooks';
import type { HostLifecycleEvent, HostLifecycleListener, TavernHelperBindings } from './host-adapter';
import { resolveAlbinaLifecycleWindow } from './lifecycle';

const LOCAL_STORAGE_SAVE_KEY = 'albina-v2-save';
const LOCAL_STORAGE_PLAYER_PROFILE_KEY = 'albina-player-profile-v1';

function localStorageKey(baseKey: string, chatId: string | undefined): string {
  if (!chatId || chatId === 'standalone') return baseKey;
  return `${baseKey}:${encodeURIComponent(chatId)}`;
}

export const TAVERN_HELPER_SAVE_KEY = 'albinaSaveV2';
export const LEGACY_TAVERN_HELPER_SAVE_KEY = 'albinaGalgameCardGameSaveV1';
export const TAVERN_HELPER_PLAYER_PROFILE_KEY = 'albinaPlayerProfileV1';
export const TAVERN_HELPER_WORLDBOOK_SELECTION_KEY = 'albinaWorldbookSelectionV1';

interface TavernHelperLike {
  getChatId?: () => string | undefined;
  getVariables?: (options?: unknown) => Promise<Record<string, unknown>> | Record<string, unknown>;
  setVariables?: (variables: Record<string, unknown>, options?: unknown) => Promise<void> | void;
  eventOn?: TavernEventOn;
}

type TavernEventRegistration = { stop?: () => void } | (() => void) | void;
type TavernEventOn = (event: string, listener: (...args: unknown[]) => void) => TavernEventRegistration;

interface TavernIframeGlobals {
  getChatId?: () => string | undefined;
  getVariables?: TavernHelperLike['getVariables'];
  insertOrAssignVariables?: TavernHelperLike['setVariables'];
  eventOn?: TavernEventOn;
  tavern_events?: { CHAT_CHANGED?: string };
}

export class ChatVariableWriteError extends Error {
  readonly code = 'chat-write-unavailable';
  fallbackStored: boolean;

  constructor(fallbackStored = false) {
    super('Tavern chat variables could not be written; the local fallback was saved instead.');
    this.name = 'ChatVariableWriteError';
    this.fallbackStored = fallbackStored;
  }
}

declare global {
  interface Window {
    TavernHelper?: TavernHelperLike;
    __ALBINA_DISABLE_AUTOINSTALL__?: boolean;
  }
}

function helper(): TavernHelperLike | undefined { return typeof window === 'undefined' ? undefined : window.TavernHelper; }

function iframeGlobals(): TavernIframeGlobals {
  return typeof globalThis === 'undefined' ? {} : globalThis as TavernIframeGlobals;
}

function subscribeHostEvent(event: string, listener: () => void): (() => void) | undefined {
  const globals = iframeGlobals();
  const eventOn = globals.eventOn ?? helper()?.eventOn;
  if (!eventOn) return undefined;
  try {
    const registration = eventOn(event, listener);
    if (typeof registration === 'function') return registration;
    if (registration?.stop) return () => registration.stop?.();
  } catch (error) {
    console.warn(`[albina-host] unable to subscribe to ${event}`, error);
  }
  return undefined;
}

function readChatVariables(): TavernHelperLike['getVariables'] | undefined {
  return iframeGlobals().getVariables ?? helper()?.getVariables;
}

function mergeChatVariables(): TavernHelperLike['setVariables'] | undefined {
  return iframeGlobals().insertOrAssignVariables ?? helper()?.setVariables;
}

async function writeChatVariables(values: Record<string, unknown>): Promise<void> {
  const setter = mergeChatVariables();
  if (!setter) throw new ChatVariableWriteError();
  await setter(values, { type: 'chat' });
}

function saveLocalJson(key: string, value: unknown, chatId?: string): void {
  if (typeof localStorage !== 'undefined') localStorage.setItem(localStorageKey(key, chatId), JSON.stringify(value));
}

function currentChatId(): string {
  return iframeGlobals().getChatId?.() ?? helper()?.getChatId?.() ?? 'standalone';
}

function localPlayerProfile(chatId: string | undefined): { profile?: PlayerProfile; error?: SaveRecoveryError } {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(localStorageKey(LOCAL_STORAGE_PLAYER_PROFILE_KEY, chatId));
    if (raw === null) return {};
    const parsed = PlayerProfileSchema.safeParse(JSON.parse(raw));
    return parsed.success
      ? { profile: parsed.data }
      : { error: new SaveRecoveryError('corrupt-input', 'The local player profile is invalid.') };
  } catch (error) {
    return { error: new SaveRecoveryError('storage-read-failed', 'Local player profile storage could not be read.', { cause: error }) };
  }
}

export function sanitizePlayerProfile(profile: SaveV2['playerProfile']): SaveV2['playerProfile'] {
  const clean = (value: string, fallback: string, max = 600): string => {
    const normalized = value.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/gu, '').replace(/[<>]/gu, '').trim();
    return normalized.slice(0, max) || fallback;
  };
  return {
    ...profile,
    name: clean(profile.name, '{{user}}', 80), gender: clean(profile.gender, '成年男性', 80),
    appearance: clean(profile.appearance, '固定男主形象', 800), background: clean(profile.background, '暂未确认', 800),
    ability: clean(profile.ability, '观察与克制', 400), addressName: clean(profile.addressName, profile.name, 80),
    initialRelationship: clean(profile.initialRelationship, '谨慎观察，由明确行动逐步建立关系', 400),
    boundaries: clean(profile.boundaries, '尊重明确同意与退出意愿', 800),
  };
}

function decodeCandidate(value: unknown): SaveDecodeResult {
  return typeof value === 'string' ? decodeSaveJson(value) : decodeSaveV2OrV1(value);
}

function localSave(chatId: string | undefined): { result?: SaveDecodeResult; error?: SaveRecoveryError } {
  try {
    const raw = typeof localStorage === 'undefined' ? null : localStorage.getItem(localStorageKey(LOCAL_STORAGE_SAVE_KEY, chatId));
    return raw === null ? {} : { result: decodeSaveJson(raw) };
  } catch (error) {
    return { error: new SaveRecoveryError('storage-read-failed', 'Local save storage could not be read.', { cause: error }) };
  }
}

function parsePersistedWorldbookSelection(value: unknown): WorldbookPackageSelection | undefined {
  const candidate = typeof value === 'string' ? (() => {
    try { return JSON.parse(value); } catch { return undefined; }
  })() : value;
  const parsed = WorldbookPackageSelectionSchema.safeParse(candidate);
  return parsed.success ? parsed.data : undefined;
}

function localWorldbookSelection(chatId: string | undefined): WorldbookPackageSelection | undefined {
  if (typeof localStorage === 'undefined') return undefined;
  return parsePersistedWorldbookSelection(localStorage.getItem(localStorageKey(TAVERN_HELPER_WORLDBOOK_SELECTION_KEY, chatId)));
}

function recordFromCandidate(value: unknown): Record<string, unknown> | undefined {
  if (typeof value === 'string') {
    try { return recordFromCandidate(JSON.parse(value)); } catch { return undefined; }
  }
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown>
    : undefined;
}

function hasCompleteWorldbookSelection(value: unknown): boolean {
  const worldbook = recordFromCandidate(recordFromCandidate(value)?.worldbook);
  return worldbook?.presetId !== undefined && worldbook.packageIds !== undefined;
}

function applyWorldbookSelection(save: SaveV2, selection: WorldbookPackageSelection): SaveV2 {
  return parseSaveV2({ ...save, worldbook: { ...save.worldbook, ...selection } });
}

async function persistRecoveredSave(save: SaveV2, chatId: string | undefined): Promise<void> {
  try {
    await writeChatVariables({ [TAVERN_HELPER_SAVE_KEY]: save });
  } catch (error) {
    console.warn('[albina-save] unable to persist migrated Tavern Helper save', error);
  }
  try {
    saveLocalJson(LOCAL_STORAGE_SAVE_KEY, save, chatId);
  } catch (error) {
    console.warn('[albina-save] unable to persist migrated local save', error);
  }
}

function candidateAt(variables: Record<string, unknown>, key: string): unknown {
  return Object.prototype.hasOwnProperty.call(variables, key) ? variables[key] : undefined;
}

export function createDefaultHostBindings(): TavernHelperBindings {
  return {
    getChatId: currentChatId,
    async loadSave() {
      const chatId = currentChatId();
      const getVariables = readChatVariables();
      const failures: SaveRecoveryError[] = [];
      let chatSelection: WorldbookPackageSelection | undefined;
      if (getVariables) {
        try {
          const variables = await getVariables({ type: 'chat' });
          chatSelection = parsePersistedWorldbookSelection(candidateAt(variables, TAVERN_HELPER_WORLDBOOK_SELECTION_KEY));
          for (const key of [TAVERN_HELPER_SAVE_KEY, LEGACY_TAVERN_HELPER_SAVE_KEY]) {
            const candidate = candidateAt(variables, key);
            if (candidate === undefined) continue;
            const decoded = decodeCandidate(candidate);
            if (!decoded.ok) { failures.push(decoded.error); continue; }
            const selectionApplied = !hasCompleteWorldbookSelection(candidate) && Boolean(chatSelection);
            const save = selectionApplied && chatSelection
              ? applyWorldbookSelection(decoded.save, chatSelection)
              : decoded.save;
            if (selectionApplied || decoded.source === 'v1.0.44') await persistRecoveredSave(save, chatId);
            return save;
          }
        } catch (error) {
          failures.push(new SaveRecoveryError('storage-read-failed', 'Tavern Helper save variables could not be read.', { cause: error }));
        }
      }
      const local = localSave(chatId);
      if (local.error) failures.push(local.error);
      if (local.result?.ok) {
        const localSelection = chatSelection ?? localWorldbookSelection(chatId);
        const save = !hasCompleteWorldbookSelection(local.result.save) && localSelection
          ? applyWorldbookSelection(local.result.save, localSelection)
          : local.result.save;
        await persistRecoveredSave(save, chatId);
        return save;
      }
      if (local.result && !local.result.ok) failures.push(local.result.error);
      if (failures.length > 0) throw failures[0];
      return undefined;
    },
    async loadPlayerProfile() {
      const chatId = iframeGlobals().getChatId?.() ?? helper()?.getChatId?.() ?? 'standalone';
      const getVariables = readChatVariables();
      if (getVariables) {
        try {
          const variables = await getVariables({ type: 'chat' });
          const candidate = candidateAt(variables, TAVERN_HELPER_PLAYER_PROFILE_KEY);
          if (candidate !== undefined) {
            const parsed = PlayerProfileSchema.safeParse(candidate);
            if (parsed.success) return sanitizePlayerProfile(parsed.data);
          }
        } catch (error) {
          console.warn('[albina-profile] unable to read Tavern Helper player profile', error);
        }
      }
      const local = localPlayerProfile(chatId);
      return local.profile ? sanitizePlayerProfile(local.profile) : undefined;
    },
    async saveSave(save: SaveV2) {
      const validated = parseSaveV2(save);
      const chatId = currentChatId();
      try {
        await writeChatVariables({ [TAVERN_HELPER_SAVE_KEY]: validated });
      } catch (error) {
        saveLocalJson(LOCAL_STORAGE_SAVE_KEY, validated, chatId);
        if (error instanceof ChatVariableWriteError) error.fallbackStored = true;
        throw error;
      }
      saveLocalJson(LOCAL_STORAGE_SAVE_KEY, validated, chatId);
    },
    async savePlayerProfile(profile) {
      const validated = sanitizePlayerProfile(profile);
      const chatId = currentChatId();
      try {
        await writeChatVariables({ [TAVERN_HELPER_PLAYER_PROFILE_KEY]: validated });
      } catch (error) {
        saveLocalJson(LOCAL_STORAGE_PLAYER_PROFILE_KEY, validated, chatId);
        if (error instanceof ChatVariableWriteError) error.fallbackStored = true;
        throw error;
      }
      saveLocalJson(LOCAL_STORAGE_PLAYER_PROFILE_KEY, validated, chatId);
    },
    async saveWorldbookSelection(selection) {
      const validated = WorldbookPackageSelectionSchema.parse(selection);
      const chatId = currentChatId();
      try {
        await writeChatVariables({ [TAVERN_HELPER_WORLDBOOK_SELECTION_KEY]: validated });
      } catch (error) {
        saveLocalJson(TAVERN_HELPER_WORLDBOOK_SELECTION_KEY, validated, chatId);
        if (error instanceof ChatVariableWriteError) error.fallbackStored = true;
        throw error;
      }
      saveLocalJson(TAVERN_HELPER_WORLDBOOK_SELECTION_KEY, validated, chatId);
    },
    subscribe(event: HostLifecycleEvent, listener: HostLifecycleListener) {
      if (typeof window === 'undefined') return () => undefined;
      const globals = iframeGlobals();
      const tavernEvent = event === 'chatChanged'
        ? globals.tavern_events?.CHAT_CHANGED
        : undefined;
      const stopHost = tavernEvent ? subscribeHostEvent(tavernEvent, listener) : undefined;
      const name = `albina:${event}`;
      // The custom event is a standalone-host fallback. Registering both paths
      // for the same chat event causes duplicate teardown and scene reloads in
      // hosts that dispatch a bridge event as well as CHAT_CHANGED.
      if (!stopHost && event !== 'unmount') window.addEventListener(name, listener);
      if (event === 'unmount') {
        const lifecycleWindow = resolveAlbinaLifecycleWindow(window);
        const customWindows = lifecycleWindow === window ? [window] : [window, lifecycleWindow];
        const pagehideListener = (pagehide: PageTransitionEvent): void => {
          listener(pagehide);
        };
        customWindows.forEach((target) => target.addEventListener(name, listener));
        lifecycleWindow.addEventListener('pagehide', pagehideListener);
        return () => {
          stopHost?.();
          customWindows.forEach((target) => target.removeEventListener(name, listener));
          lifecycleWindow.removeEventListener('pagehide', pagehideListener);
        };
      }
      return () => {
        stopHost?.();
        if (!stopHost) window.removeEventListener(name, listener);
      };
    },
  };
}
