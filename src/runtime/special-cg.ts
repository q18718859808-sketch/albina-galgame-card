import type { AlbinaStorage } from './storage';

export interface SpecialCgRequest {
  id: string;
  assetId: string;
}

/**
 * A queue mutation event. Events fire only for actual changes: an empty
 * dequeue produces no event, because nothing observable happened.
 */
export type SpecialCgEvent =
  | { type: 'enqueued'; request: SpecialCgRequest; queueLength: number }
  | { type: 'dequeued'; request: SpecialCgRequest; queueLength: number }
  | { type: 'cleared'; queueLength: number };

export type SpecialCgListener = (event: SpecialCgEvent) => void;

const QUEUE_KEY = 'queue';

export class SpecialCgService {
  private operationTail: Promise<void> = Promise.resolve();
  private readonly listeners = new Set<SpecialCgListener>();

  constructor(private readonly storage: AlbinaStorage) {}

  /**
   * Subscribes to queue mutations. Returns an unsubscribe function; calling it
   * twice is harmless. Observers are notified synchronously after the mutation
   * has been persisted, so the reported queueLength is always authoritative.
   */
  subscribe(listener: SpecialCgListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  /** Read-only FIFO snapshot of the pending queue for UI rendering. */
  async snapshot(): Promise<readonly SpecialCgRequest[]> {
    return this.runExclusive(async () => Object.freeze([...(await this.readQueue())]));
  }

  /** Number of pending special-CG requests. */
  async length(): Promise<number> {
    return this.runExclusive(async () => (await this.readQueue()).length);
  }

  async enqueue(request: SpecialCgRequest): Promise<void> {
    await this.runExclusive(async () => {
      const queue = await this.readQueue();
      queue.push(request);
      await this.storage.setValue('specialCg', QUEUE_KEY, queue);
      this.notify({ type: 'enqueued', request, queueLength: queue.length });
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
      if (request) this.notify({ type: 'dequeued', request, queueLength: queue.length });
      return request;
    });
  }

  async clear(): Promise<void> {
    await this.runExclusive(async () => {
      await this.storage.deleteValue('specialCg', QUEUE_KEY);
      this.notify({ type: 'cleared', queueLength: 0 });
    });
  }

  private async readQueue(): Promise<SpecialCgRequest[]> {
    return (await this.storage.getValue<SpecialCgRequest[]>('specialCg', QUEUE_KEY)) ?? [];
  }

  private notify(event: SpecialCgEvent): void {
    // An observer error must never fail the mutation that was already
    // persisted, nor prevent the remaining observers from hearing about it.
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch {
        // Observer exceptions are deliberately swallowed.
      }
    }
  }

  private runExclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.operationTail.then(operation, operation);
    this.operationTail = result.then(() => undefined, () => undefined);
    return result;
  }
}
