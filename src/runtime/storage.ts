import { decodeSaveV2OrV1 } from '../domain/migrate-save-v1';
import { parseSaveV2, type SaveV2 } from '../domain/save';

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

export class MemoryStorageBackend implements StorageBackend {
  private readonly stores = new Map<string, Map<string, unknown>>();

  async get<T>(store: string, key: string): Promise<T | undefined> {
    return this.stores.get(store)?.get(key) as T | undefined;
  }

  async put<T>(store: string, key: string, value: T): Promise<void> {
    const values = this.stores.get(store) ?? new Map<string, unknown>();
    values.set(key, value);
    this.stores.set(store, values);
  }

  async delete(store: string, key: string): Promise<void> { this.stores.get(store)?.delete(key); }
  async keys(store: string): Promise<string[]> { return [...(this.stores.get(store)?.keys() ?? [])]; }
  close(): void { this.stores.clear(); }
}

export class ResilientStorageBackend implements StorageBackend {
  private primaryFailed = false;

  constructor(
    private readonly primary: StorageBackend = new IndexedDbBackend(),
    private readonly fallback: StorageBackend = new MemoryStorageBackend(),
  ) {}

  get<T>(store: string, key: string): Promise<T | undefined> { return this.run((backend) => backend.get<T>(store, key)); }
  put<T>(store: string, key: string, value: T): Promise<void> { return this.run((backend) => backend.put(store, key, value)); }
  delete(store: string, key: string): Promise<void> { return this.run((backend) => backend.delete(store, key)); }
  keys(store: string): Promise<string[]> { return this.run((backend) => backend.keys(store)); }
  close(): void { this.primary.close(); this.fallback.close(); }

  private async run<T>(operation: (backend: StorageBackend) => Promise<T>): Promise<T> {
    if (this.primaryFailed) return operation(this.fallback);
    try {
      return await operation(this.primary);
    } catch {
      this.primaryFailed = true;
      this.primary.close();
      return operation(this.fallback);
    }
  }
}

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | undefined {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return undefined;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null ? value as UnknownRecord : undefined;
}

function emptyThumbnail(): Blob { return new Blob([], { type: 'application/octet-stream' }); }

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
    void this.database?.then((database) => database.close(), () => undefined);
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
    private readonly backend: StorageBackend = new ResilientStorageBackend(),
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
    const validated = parseSaveV2(save);
    await this.backend.put<SaveSnapshot>('saves', validated.saveId, { save: validated, thumbnail });
  }

  async loadSnapshot(saveId: string): Promise<SaveSnapshot | undefined> {
    const stored = await this.backend.get<unknown>('saves', saveId);
    if (stored === undefined) return undefined;
    const record = asRecord(stored);
    const wrapped = record && Object.prototype.hasOwnProperty.call(record, 'save');
    const candidate = wrapped ? record.save : stored;
    const decoded = decodeSaveV2OrV1(candidate);
    if (!decoded.ok) throw decoded.error;
    const thumbnail = wrapped && record.thumbnail instanceof Blob ? record.thumbnail : emptyThumbnail();
    if (decoded.source === 'v1.0.44' || !wrapped || !(record.thumbnail instanceof Blob)) {
      await this.backend.put<SaveSnapshot>('saves', saveId, { save: decoded.save, thumbnail });
    }
    return { save: decoded.save, thumbnail };
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
