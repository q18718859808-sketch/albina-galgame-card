import type { SaveV2 } from '../domain/save';

export const RUNTIME_STORES = ['assets', 'gallery', 'specialCg', 'saves'] as const;
export type RuntimeStore = typeof RUNTIME_STORES[number];

export interface StorageBackend {
  get<T>(store: string, key: string): Promise<T | undefined>;
  put<T>(store: string, key: string, value: T): Promise<void>;
  delete(store: string, key: string): Promise<void>;
  keys(store: string): Promise<string[]>;
  close(): void;
}

export interface ObjectUrlApi {
  createObjectURL(value: Blob): string;
  revokeObjectURL(url: string): void;
}

export interface SaveSnapshot {
  save: SaveV2;
  thumbnail: Blob;
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB request failed'));
  });
}

export class IndexedDbBackend implements StorageBackend {
  private database: Promise<IDBDatabase> | undefined;

  constructor(
    private readonly factory: IDBFactory = indexedDB,
    private readonly databaseName = 'albina-runtime-v2',
  ) {}

  async get<T>(store: string, key: string): Promise<T | undefined> {
    const database = await this.open();
    return requestResult(database.transaction(store, 'readonly').objectStore(store).get(key)) as Promise<T | undefined>;
  }

  async put<T>(store: string, key: string, value: T): Promise<void> {
    const database = await this.open();
    await requestResult(database.transaction(store, 'readwrite').objectStore(store).put(value, key));
  }

  async delete(store: string, key: string): Promise<void> {
    const database = await this.open();
    await requestResult(database.transaction(store, 'readwrite').objectStore(store).delete(key));
  }

  async keys(store: string): Promise<string[]> {
    const database = await this.open();
    const keys = await requestResult(database.transaction(store, 'readonly').objectStore(store).getAllKeys());
    return keys.map(String);
  }

  close(): void {
    void this.database?.then((database) => database.close());
    this.database = undefined;
  }

  private open(): Promise<IDBDatabase> {
    this.database ??= new Promise((resolve, reject) => {
      const request = this.factory.open(this.databaseName, 1);
      request.onupgradeneeded = () => {
        for (const store of RUNTIME_STORES) {
          if (!request.result.objectStoreNames.contains(store)) request.result.createObjectStore(store);
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error ?? new Error('Unable to open IndexedDB'));
    });
    return this.database;
  }
}

function defaultObjectUrls(): ObjectUrlApi | undefined {
  if (typeof URL.createObjectURL !== 'function') return undefined;
  return { createObjectURL: (blob) => URL.createObjectURL(blob), revokeObjectURL: (url) => URL.revokeObjectURL(url) };
}

export class AlbinaStorage {
  private readonly objectUrls = new Map<string, string>();
  private readonly pendingObjectUrls = new Map<string, Promise<string | undefined>>();
  private readonly urlApi: ObjectUrlApi | undefined;
  private objectUrlGeneration = 0;

  constructor(
    private readonly backend: StorageBackend = new IndexedDbBackend(),
    objectUrls?: ObjectUrlApi,
  ) {
    this.urlApi = objectUrls ?? defaultObjectUrls();
  }

  async cacheAsset(assetId: string, blob: Blob): Promise<void> {
    this.objectUrlGeneration += 1;
    this.pendingObjectUrls.clear();
    this.releaseObjectUrl(assetId);
    await this.backend.put('assets', assetId, blob);
  }

  async getCachedAsset(assetId: string): Promise<Blob | undefined> {
    return this.backend.get('assets', assetId);
  }

  async getAssetUrl(assetId: string): Promise<string | undefined> {
    const existing = this.objectUrls.get(assetId);
    if (existing) return existing;
    const pending = this.pendingObjectUrls.get(assetId);
    if (pending) return pending;
    const generation = this.objectUrlGeneration;
    const lookup = this.createAssetUrl(assetId, generation);
    this.pendingObjectUrls.set(assetId, lookup);
    const cleanup = () => {
      if (this.pendingObjectUrls.get(assetId) === lookup) this.pendingObjectUrls.delete(assetId);
    };
    void lookup.then(cleanup, cleanup);
    return lookup;
  }

  async saveSnapshot(save: SaveV2, thumbnail: Blob): Promise<void> {
    await this.backend.put<SaveSnapshot>('saves', save.saveId, { save, thumbnail });
  }

  async loadSnapshot(saveId: string): Promise<SaveSnapshot | undefined> {
    return this.backend.get('saves', saveId);
  }

  getValue<T>(store: RuntimeStore, key: string): Promise<T | undefined> {
    return this.backend.get(store, key);
  }

  setValue<T>(store: RuntimeStore, key: string, value: T): Promise<void> {
    return this.backend.put(store, key, value);
  }

  deleteValue(store: RuntimeStore, key: string): Promise<void> {
    return this.backend.delete(store, key);
  }

  keys(store: RuntimeStore): Promise<string[]> {
    return this.backend.keys(store);
  }

  releaseObjectUrls(): void {
    this.objectUrlGeneration += 1;
    this.pendingObjectUrls.clear();
    for (const assetId of [...this.objectUrls.keys()]) this.releaseObjectUrl(assetId);
  }

  dispose(): void {
    this.releaseObjectUrls();
    this.backend.close();
  }

  private releaseObjectUrl(assetId: string): void {
    const url = this.objectUrls.get(assetId);
    if (!url) return;
    this.urlApi?.revokeObjectURL(url);
    this.objectUrls.delete(assetId);
  }

  private async createAssetUrl(assetId: string, generation: number): Promise<string | undefined> {
    const blob = await this.getCachedAsset(assetId);
    if (!blob || !this.urlApi || generation !== this.objectUrlGeneration) return undefined;
    const existing = this.objectUrls.get(assetId);
    if (existing) return existing;
    const url = this.urlApi.createObjectURL(blob);
    if (generation !== this.objectUrlGeneration) {
      this.urlApi.revokeObjectURL(url);
      return undefined;
    }
    this.objectUrls.set(assetId, url);
    return url;
  }
}
