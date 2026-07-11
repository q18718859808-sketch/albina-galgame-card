import { describe, expect, it, vi } from 'vitest';

import { TypewriterService } from '../../src/runtime/typewriter';

describe('TypewriterService', () => {
  it('reveals text one character at a time and resolves when complete', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('Albina', updates.push.bind(updates), 10);
    await vi.runAllTimersAsync();

    await expect(done).resolves.toBe('Albina');
    expect(updates).toEqual(['A', 'Al', 'Alb', 'Albi', 'Albin', 'Albina']);
    vi.useRealTimers();
  });

  it('cancels the active write and releases its timer', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('Albina', updates.push.bind(updates), 10);
    await vi.advanceTimersByTimeAsync(20);
    service.cancel();

    await expect(done).resolves.toBe(updates.at(-1) ?? '');
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  it('completes the active write immediately without using cancel semantics', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('Albina', updates.push.bind(updates), 10);
    await vi.advanceTimersByTimeAsync(10);
    service.completeNow();

    await expect(done).resolves.toBe('Albina');
    expect(updates.at(-1)).toBe('Albina');
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });
});
