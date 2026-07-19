import type { AssetManifestV2 } from '../domain/assets';
import { decodeSaveV2OrV1 } from '../domain/migrate-save-v1';
import type { SaveV2 } from '../domain/save';

import { AudioService, type AudioFactory } from './audio';
import { GalleryService } from './gallery';
import { PortraitService, type PortraitEnvironment } from './portraits';
import { SpecialCgService } from './special-cg';
import { AlbinaStorage, type ObjectUrlApi, type StorageBackend } from './storage';
import { TypewriterService } from './typewriter';

export type HostLifecycleEvent = 'chatChanged' | 'load' | 'unmount';

export interface TavernHelperBindings {
  getChatId(): string | undefined;
  loadSave(): Promise<unknown>;
  saveSave(save: SaveV2): Promise<void>;
  subscribe(event: HostLifecycleEvent, listener: () => void): () => void;
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
  saveSave(save: SaveV2): Promise<void> { return this.bindings.saveSave(save); }
  subscribe(event: HostLifecycleEvent, listener: () => void): () => void {
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
}

export class AlbinaRuntime {
  readonly host: TavernHostAdapter;
  readonly audio: AudioService;
  readonly portraits: PortraitService;
  readonly gallery: GalleryService;
  readonly storage: AlbinaStorage;
  readonly specialCg: SpecialCgService;
  readonly typewriter = new TypewriterService();
  private subscriptions: (() => void)[] = [];
  private mounted = false;

  constructor(options: AlbinaRuntimeOptions) {
    this.host = new TavernHostAdapter(options.host);
    this.audio = new AudioService(options.audioFactory);
    this.storage = new AlbinaStorage(options.storageBackend, options.objectUrls);
    this.portraits = new PortraitService(options.manifest, options.portraits, options.assetBaseUrl);
    this.gallery = new GalleryService(this.storage);
    this.specialCg = new SpecialCgService(this.storage);
  }

  mount(): void {
    if (this.mounted) return;
    this.mounted = true;
    this.subscriptions = [
      this.host.subscribe('chatChanged', () => this.releaseTransientResources()),
      this.host.subscribe('load', () => this.releaseTransientResources()),
      this.host.subscribe('unmount', () => this.unmount()),
    ];
  }

  releaseTransientResources(): void {
    this.typewriter.cancel();
    this.portraits.stopAll();
    this.audio.stopAll();
    this.storage.releaseObjectUrls();
  }

  unmount(): void {
    this.releaseTransientResources();
    this.subscriptions.splice(0).forEach((unsubscribe) => unsubscribe());
    this.storage.dispose();
    this.mounted = false;
  }
}

export function createAlbinaRuntime(options: AlbinaRuntimeOptions): AlbinaRuntime {
  return new AlbinaRuntime(options);
}
