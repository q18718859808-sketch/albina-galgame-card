import type { SaveV2 } from '../domain/save';

import type { AlbinaStorage } from './storage';

export class GalleryService {
  constructor(private readonly storage: AlbinaStorage) {}

  async unlock(assetId: string, _save?: SaveV2): Promise<boolean> {
    const unlocked = await this.storage.getValue<boolean>('gallery', assetId);
    if (unlocked) return false;
    await this.storage.setValue('gallery', assetId, true);
    return true;
  }

  async isUnlocked(assetId: string, save?: SaveV2): Promise<boolean> {
    if (save?.unlockedCg.includes(assetId)) return true;
    return (await this.storage.getValue<boolean>('gallery', assetId)) === true;
  }

  async list(save?: SaveV2): Promise<string[]> {
    const unlocked = new Set(save?.unlockedCg ?? []);
    for (const assetId of await this.storage.keys('gallery')) unlocked.add(assetId);
    return [...unlocked];
  }
}
