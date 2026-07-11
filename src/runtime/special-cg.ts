import type { AlbinaStorage } from './storage';

export interface SpecialCgRequest {
  id: string;
  assetId: string;
}

const QUEUE_KEY = 'queue';

export class SpecialCgService {
  private operationTail: Promise<void> = Promise.resolve();

  constructor(private readonly storage: AlbinaStorage) {}

  async enqueue(request: SpecialCgRequest): Promise<void> {
    await this.runExclusive(async () => {
      const queue = await this.readQueue();
      queue.push(request);
      await this.storage.setValue('specialCg', QUEUE_KEY, queue);
    });
  }

  async peek(): Promise<SpecialCgRequest | undefined> {
    return this.runExclusive(async () => (await this.readQueue())[0]);
  }

  async dequeue(): Promise<SpecialCgRequest | undefined> {
    return this.runExclusive(async () => {
      const queue = await this.readQueue();
      const request = queue.shift();
      await this.storage.setValue('specialCg', QUEUE_KEY, queue);
      return request;
    });
  }

  async clear(): Promise<void> {
    await this.runExclusive(() => this.storage.deleteValue('specialCg', QUEUE_KEY));
  }

  private async readQueue(): Promise<SpecialCgRequest[]> {
    return (await this.storage.getValue<SpecialCgRequest[]>('specialCg', QUEUE_KEY)) ?? [];
  }

  private runExclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.operationTail.then(operation, operation);
    this.operationTail = result.then(() => undefined, () => undefined);
    return result;
  }
}
