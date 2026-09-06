import type { AssetManifestV2 } from '../domain/assets';
import { WorldbookPackageSelectionSchema, type WorldbookPackageSelection } from '../domain/layered-worldbooks';
import { decodeSaveV2OrV1 } from '../domain/migrate-save-v1';
import { PlayerProfileSchema, type PlayerProfile } from '../domain/player-profile';
import type { SaveV2 } from '../domain/save';

import { AudioService, type AudioFactory } from './audio';
import { GalleryService } from './gallery';
import { PortraitService, type PortraitEnvironment } from './portraits';
import { SpecialCgService } from './special-cg';
import { AlbinaStorage, type ObjectUrlApi, type StorageBackend } from './storage';
import { TypewriterService } from './typewriter';
import {
  inspectLorebookToolCall,
  type LorebookToolCallOptions,
  type LorebookToolCallStatus,
} from './lorebook-tool-call';
import { isPersistedPagehide } from './lifecycle';

export type HostLifecycleEvent = 'chatChanged' | 'load' | 'unmount';
export type HostLifecycleListener = (event?: Event) => void;

export interface TavernHelperBindings {
  getChatId(): string | undefined;
  loadSave(): Promise<unknown>;
  loadPlayerProfile(): Promise<unknown>;
  saveSave(save: SaveV2): Promise<void>;
  savePlayerProfile(profile: SaveV2['playerProfile']): Promise<void>;
  saveWorldbookSelection?(selection: WorldbookPackageSelection): Promise<void>;
  subscribe(event: HostLifecycleEvent, listener: HostLifecycleListener): () => void;
}

export class TavernHostAdapter {
  constructor(private readonly bindings: TavernHelperBindings) {}

  getChatId(): string | undefined { return this.bindings.getChatId(); }
  async loadSave(): Promise<SaveV2 | undefined> {
    const input = await this.bindings.loadSave();
    if (input === undefined) return undefined;
    const decoded = decodeSaveV2OrV1(input);
    if (!decoded.ok) throw decoded.error;
    return decoded.save;
  }
  async loadPlayerProfile(): Promise<PlayerProfile | undefined> {
    const input = await this.bindings.loadPlayerProfile();
    if (input === undefined) return undefined;
    return PlayerProfileSchema.parse(input);
  }
  saveSave(save: SaveV2): Promise<void> { return this.bindings.saveSave(save); }
  savePlayerProfile(profile: SaveV2['playerProfile']): Promise<void> {
    return this.bindings.savePlayerProfile(profile);
  }
  saveWorldbookSelection(selection: WorldbookPackageSelection): Promise<void> {
    const validated = WorldbookPackageSelectionSchema.parse(selection);
    return this.bindings.saveWorldbookSelection?.(validated) ?? Promise.resolve();
  }
  subscribe(event: HostLifecycleEvent, listener: HostLifecycleListener): () => void {
    return this.bindings.subscribe(event, listener);
  }
}

export interface AlbinaRuntimeOptions {
  manifest: AssetManifestV2;
  host: TavernHelperBindings;
  audioFactory?: AudioFactory;
  storageBackend?: StorageBackend;
  objectUrls?: ObjectUrlApi;
  portraits?: PortraitEnvironment;
  assetBaseUrl?: string;
  lorebookToolCall?: LorebookToolCallOptions;
  onLifecycle?: (event: HostLifecycleEvent) => void | Promise<void>;
}

export class AlbinaRuntime {
  readonly host: TavernHostAdapter;
  readonly audio: AudioService;
  readonly portraits: PortraitService;
  readonly gallery: GalleryService;
  readonly storage: AlbinaStorage;
  readonly specialCg: SpecialCgService;
  readonly typewriter = new TypewriterService();
  readonly lorebookToolCall: LorebookToolCallStatus;
  private subscriptions: (() => void)[] = [];
  private mounted = false;
  private readonly onLifecycle: ((event: HostLifecycleEvent) => void | Promise<void>) | undefined;
  private disposed = false;

  constructor(options: AlbinaRuntimeOptions) {
    this.onLifecycle = options.onLifecycle;
    this.host = new TavernHostAdapter(options.host);
    this.audio = new AudioService(options.audioFactory);
    this.storage = new AlbinaStorage(options.storageBackend, options.objectUrls);
    this.portraits = new PortraitService(options.manifest, options.portraits, options.assetBaseUrl);
    this.gallery = new GalleryService(this.storage);
    this.specialCg = new SpecialCgService(this.storage);
    this.lorebookToolCall = inspectLorebookToolCall(options.lorebookToolCall);
  }

  mount(): void {
    if (this.disposed) throw new Error('AlbinaRuntime cannot be mounted after disposal.');
    if (this.mounted) return;
    const subscriptions: (() => void)[] = [];
    try {
      subscriptions.push(this.host.subscribe('chatChanged', () => this.handleLifecycle('chatChanged')));
      subscriptions.push(this.host.subscribe('load', () => this.handleLifecycle('load')));
      subscriptions.push(this.host.subscribe('unmount', (event) => {
        if (isPersistedPagehide(event)) {
          // bfcache restores the same Vue/store graph. Keep audio, portraits,
          // typewriter state, and cached object URLs intact for that restore.
          return;
        }
        this.unmount();
      }));
      this.subscriptions = subscriptions;
      this.mounted = true;
    } catch (error) {
      subscriptions.splice(0).forEach((unsubscribe) => unsubscribe());
      throw error;
    }
  }

  private handleLifecycle(event: HostLifecycleEvent): void {
    this.releaseTransientResources();
    if (!this.onLifecycle) return;
    void Promise.resolve(this.onLifecycle(event)).catch((error) => {
      console.warn(`[albina-runtime] lifecycle handler failed for ${event}`, error);
    });
  }

  releaseTransientResources(): void {
    this.typewriter.cancel();
    this.portraits.stopAll();
    this.audio.stopAll();
    this.storage.releaseObjectUrls();
  }

  unmount(): void {
    if (this.disposed) return;
    this.disposed = true;
    this.mounted = false;
    this.releaseTransientResources();
    this.subscriptions.splice(0).forEach((unsubscribe) => unsubscribe());
    this.storage.dispose();
  }
}

export function createAlbinaRuntime(options: AlbinaRuntimeOptions): AlbinaRuntime {
  return new AlbinaRuntime(options);
}
