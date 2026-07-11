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

  it('ignores a pending BGM play completion after stopAll', async () => {
    let resolvePlay!: () => void;
    const pendingPlay = new Promise<void>((resolve) => { resolvePlay = resolve; });
    const audio = new FakeAudio();
    audio.play.mockReturnValue(pendingPlay);
    const service = new AudioService(() => audio);

    const result = service.playBgm('bgm.mp3', 100);
    service.stopAll();
    resolvePlay();

    await expect(result).resolves.toBe(false);
    expect(audio.src).toBe('');
    expect(audio.volume).toBe(0);
  });

  it('does not replay a released track when autoplay recovery resolves after stopAll', async () => {
    let resolveRecovery!: () => void;
    const recovery = new Promise<void>((resolve) => { resolveRecovery = resolve; });
    const audio = new FakeAudio();
    audio.play
      .mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError'))
      .mockReturnValueOnce(recovery);
    const service = new AudioService(() => audio);
    await service.playBgm('bgm.mp3', 0);

    const recovered = service.recoverAutoplay();
    service.stopAll();
    resolveRecovery();

    await expect(recovered).resolves.toBe(false);
    await expect(service.recoverAutoplay()).resolves.toBe(true);
    expect(audio.play).toHaveBeenCalledTimes(2);
  });

  it('discards blocked pending BGM when a newer track starts', async () => {
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      if (created.length === 0) audio.play.mockRejectedValueOnce(new DOMException('blocked', 'NotAllowedError'));
      created.push(audio);
      return audio;
    });

    await service.playBgm('blocked.mp3', 0);
    await service.playBgm('current.mp3', 0);
    await expect(service.recoverAutoplay()).resolves.toBe(true);

    expect(created[0]?.play).toHaveBeenCalledOnce();
    expect(created[0]?.src).toBe('');
  });

  it('crossfades from the currently ducked BGM volume without jumping upward', async () => {
    vi.useFakeTimers();
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      created.push(audio);
      return audio;
    });
    await service.playBgm('old.mp3', 0);
    void service.enqueueVoice('voice.mp3');
    expect(created[0]?.volume).toBe(0.25);

    const transition = service.playBgm('next.mp3', 100);
    await Promise.resolve();
    await vi.advanceTimersByTimeAsync(10);

    expect(created[0]?.volume).toBeLessThanOrEqual(0.25);
    await vi.runAllTimersAsync();
    await transition;
    service.dispose();
    vi.useRealTimers();
  });

  it('keeps the previous BGM owned while the replacement play is pending and stopAll runs', async () => {
    let resolveReplacement!: () => void;
    const replacementPlay = new Promise<void>((resolve) => { resolveReplacement = resolve; });
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      if (created.length === 1) audio.play.mockReturnValue(replacementPlay);
      created.push(audio);
      return audio;
    });
    await service.playBgm('a.mp3', 0);

    const replacement = service.playBgm('b.mp3', 100);
    service.stopAll();
    resolveReplacement();

    await expect(replacement).resolves.toBe(false);
    expect(created[0]?.pause).toHaveBeenCalledOnce();
    expect(created[1]?.pause).toHaveBeenCalledOnce();
    expect(created[0]?.src).toBe('');
    expect(created[1]?.src).toBe('');
  });

  it('releases both prior tracks when a newer BGM supersedes a pending replacement', async () => {
    let resolvePending!: () => void;
    const pendingPlay = new Promise<void>((resolve) => { resolvePending = resolve; });
    const created: FakeAudio[] = [];
    const service = new AudioService(() => {
      const audio = new FakeAudio();
      if (created.length === 1) audio.play.mockReturnValue(pendingPlay);
      created.push(audio);
      return audio;
    });
    await service.playBgm('a.mp3', 0);

    const pending = service.playBgm('b.mp3', 100);
    await expect(service.playBgm('c.mp3', 0)).resolves.toBe(true);
    resolvePending();

    await expect(pending).resolves.toBe(false);
    expect(created[0]?.pause).toHaveBeenCalledOnce();
    expect(created[1]?.pause).toHaveBeenCalledOnce();
    expect(created[0]?.src).toBe('');
    expect(created[1]?.src).toBe('');
    expect(created[2]?.pause).not.toHaveBeenCalled();
  });
});
