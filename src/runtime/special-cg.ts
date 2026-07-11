import type { AlbinaStorage } from './storage';

export interface SpecialCgRequest {
  id: string;
  assetId: string;
}

const QUEUE_KEY = 'queue';

export class SpecialCgService {
  constructor(private readonly storage: AlbinaStorage) {}

  async enqueue(request: SpecialCgRequest): Promise<void> {
    const queue = await this.readQueue();
    queue.push(request);
    await this.storage.setValue('specialCg', QUEUE_KEY, queue);
  }

  async peek(): Promise<SpecialCgRequest | undefined> {
    return (await this.readQueue())[0];
  }

  async dequeue(): Promise<SpecialCgRequest | undefined> {
    const queue = await this.readQueue();
    const request = queue.shift();
    await this.storage.setValue('specialCg', QUEUE_KEY, queue);
    return request;
  }

  async clear(): Promise<void> {
    await this.storage.deleteValue('specialCg', QUEUE_KEY);
  }

  private async readQueue(): Promise<SpecialCgRequest[]> {
    return (await this.storage.getValue<SpecialCgRequest[]>('specialCg', QUEUE_KEY)) ?? [];
  }
}
