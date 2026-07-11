import { describe, expect, it, vi } from 'vitest';

import { AudioService, type RuntimeAudio } from '../../src/runtime/audio';

class FakeAudio implements RuntimeAudio {
  currentTime = 0;
  loop = false;
  muted = false;
  src = '';
  volume = 1;
  readonly pause = vi.fn();
  readonly play = vi.fn<() => Promise<void>>().mockResolvedValue(undefined);
  private readonly listeners = new Map<string, Set<() => void>>();

  addEventListener(type: 'ended', listener: () => void): void {
    const listeners = this.listeners.get(type) ?? new Set();
    listeners.add(listener);
    this.listeners.set(type, listeners);
  }

  removeEventListener(type: 'ended', listener: () => void): void {
    this.listeners.get(type)?.delete(listener);
  }

  emitEnded(): void {
    this.listeners.get('ended')?.forEach((listener) => listener());
  }
}

describe('AudioService', () => {
  it('crossfades BGM and releases the previous track', async () => {
    vi.useFakeTimers();
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      created.push(audio);
      return audio;
    });

    await service.playBgm('bgm-a.mp3', 0);
    const transition = service.playBgm('bgm-b.mp3', 100);
    await vi.runAllTimersAsync();
    await transition;

    expect(created[0]?.pause).toHaveBeenCalledOnce();
    expect(created[1]?.volume).toBe(1);
    vi.useRealTimers();
  });

  it('queues voices and restores BGM focus after the queue drains', async () => {
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      created.push(audio);
      return audio;
    });
    await service.playBgm('bgm.mp3', 0);

    const first = service.enqueueVoice('voice-a.mp3');
    const second = service.enqueueVoice('voice-b.mp3');
    expect(created[0]?.volume).toBeLessThan(1);
    created[1]?.emitEnded();
    await first;
    created[2]?.emitEnded();
    await second;

    expect(created[0]?.volume).toBe(1);
  });

  it('records blocked playback and retries it after a user gesture', async () => {
    const audio = new FakeAudio();
    audio.play.mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError')).mockResolvedValue(undefined);
    const service = new AudioService(() => audio);

    await expect(service.playBgm('bgm.mp3', 0)).resolves.toBe(false);
    await expect(service.recoverAutoplay()).resolves.toBe(true);
    expect(audio.play).toHaveBeenCalledTimes(2);
  });

  it('keeps the old BGM until a blocked crossfade recovers', async () => {
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      if (created.length === 1) {
        audio.play.mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError')).mockResolvedValue(undefined);
      }
      created.push(audio);
      return audio;
    });
    await service.playBgm('old.mp3', 0);
    const nextPlay = service.playBgm('next.mp3', 100);

    await expect(nextPlay).resolves.toBe(false);
    expect(created[0]?.pause).not.toHaveBeenCalled();
    await expect(service.recoverAutoplay()).resolves.toBe(true);
    expect(created[0]?.pause).toHaveBeenCalledOnce();
  });

  it('stops and releases every active audio resource', async () => {
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      created.push(audio);
      return audio;
    });
    await service.playBgm('bgm.mp3', 0);
    void service.enqueueVoice('voice.mp3');

    service.dispose();

    expect(created.every((audio) => audio.pause.mock.calls.length === 1 && audio.src === '')).toBe(true);
  });

  it('settles the active voice promise when disposed', async () => {
    const audio = new FakeAudio();
    const service = new AudioService(() => audio);
    const voice = service.enqueueVoice('voice.mp3');

    service.dispose();

    await expect(voice).resolves.toBe(false);
  });
});
