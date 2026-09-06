import { describe, expect, it, vi } from 'vitest';

import { TypewriterService, type TypewriterState } from '../../src/runtime/typewriter';

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

  it('holds a longer beat after sentence-final punctuation', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('好。好', updates.push.bind(updates), 10);
    // Two ordinary beats reveal the first two characters; the full stop then
    // holds intervalMs * 6 before the next character is revealed.
    await vi.advanceTimersByTimeAsync(20);
    expect(updates).toEqual(['好', '好。']);
    await vi.advanceTimersByTimeAsync(60);
    expect(updates).toEqual(['好', '好。', '好。好']);
    await expect(done).resolves.toBe('好。好');
    vi.useRealTimers();
  });

  it('pauses briefly after mid-sentence separators', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('A，B', updates.push.bind(updates), 10);
    await vi.advanceTimersByTimeAsync(20);
    expect(updates).toEqual(['A', 'A，']);
    // Mid-sentence separator holds intervalMs * 2.5 (25ms), shorter than a
    // full stop but still a readable pause.
    await vi.advanceTimersByTimeAsync(25);
    expect(updates).toEqual(['A', 'A，', 'A，B']);
    await expect(done).resolves.toBe('A，B');
    vi.useRealTimers();
  });

  it('keeps zero-interval writes instant for reduced-motion presentations', async () => {
    vi.useFakeTimers();
    const updates: string[] = [];
    const service = new TypewriterService();

    const done = service.write('好。好！', updates.push.bind(updates), 0);
    await vi.runAllTimersAsync();

    await expect(done).resolves.toBe('好。好！');
    expect(updates.at(-1)).toBe('好。好！');
    expect(vi.getTimerCount()).toBe(0);
    vi.useRealTimers();
  });

  it('publishes typing/idle state transitions around a write', async () => {
    vi.useFakeTimers();
    const states: TypewriterState[] = [];
    const service = new TypewriterService();
    service.subscribe((state) => states.push(state));

    const done = service.write('好', () => {}, 10);
    expect(states).toEqual(['typing']);
    await vi.runAllTimersAsync();
    await done;

    expect(states).toEqual(['typing', 'idle']);
    vi.useRealTimers();
  });

  it('publishes idle when a write is cancelled or completed early', () => {
    vi.useFakeTimers();
    const states: TypewriterState[] = [];
    const service = new TypewriterService();
    service.subscribe((state) => states.push(state));

    service.write('好，好', () => {}, 10);
    service.cancel();
    expect(states).toEqual(['typing', 'idle']);

    service.write('好，好', () => {}, 10);
    service.completeNow();
    expect(states).toEqual(['typing', 'idle', 'typing', 'idle']);
    vi.useRealTimers();
  });

  it('stays idle for empty writes and stops notifying after unsubscribe', () => {
    const states: TypewriterState[] = [];
    const service = new TypewriterService();
    const unsubscribe = service.subscribe((state) => states.push(state));

    void service.write('', () => {});
    expect(states).toEqual(['idle']);
    unsubscribe();
    void service.write('好', () => {}, 0);

    expect(states).toEqual(['idle']);
  });
});
