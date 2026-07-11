export interface RuntimeAudio {
  currentTime: number;
  loop: boolean;
  muted: boolean;
  src: string;
  volume: number;
  play(): Promise<void>;
  pause(): void;
  addEventListener(type: 'ended', listener: () => void): void;
  removeEventListener(type: 'ended', listener: () => void): void;
}

export type AudioFactory = (source: string) => RuntimeAudio;

type VoiceJob = { source: string; resolve: (played: boolean) => void };

function defaultAudioFactory(source: string): RuntimeAudio {
  const audio = new Audio(source);
  return audio;
}

function releaseAudio(audio: RuntimeAudio | undefined): void {
  if (!audio) return;
  audio.pause();
  audio.currentTime = 0;
  audio.src = '';
}

export class AudioService {
  private bgm: RuntimeAudio | undefined;
  private voice: RuntimeAudio | undefined;
  private voiceEnded: (() => void) | undefined;
  private readonly voiceQueue: VoiceJob[] = [];
  private activeVoiceJob: VoiceJob | undefined;
  private blocked: RuntimeAudio | undefined;
  private pendingBgmPrevious: RuntimeAudio | undefined;
  private fadingOut: RuntimeAudio | undefined;
  private fadeTimer: ReturnType<typeof setTimeout> | undefined;
  private fadeFinish: (() => void) | undefined;

  constructor(private readonly createAudio: AudioFactory = defaultAudioFactory) {}

  async playBgm(source: string, crossfadeMs = 500): Promise<boolean> {
    this.cancelFade();
    const previous = this.bgm;
    const next = this.createAudio(source);
    next.src = source;
    next.loop = true;
    next.volume = crossfadeMs > 0 ? 0 : this.bgmVolume();
    this.bgm = next;
    const played = await this.tryPlay(next);
    if (!played) {
      this.pendingBgmPrevious = previous;
      return false;
    }
    if (!previous || crossfadeMs <= 0) {
      releaseAudio(previous);
      next.volume = this.bgmVolume();
      return true;
    }
    await this.crossfade(previous, next, crossfadeMs);
    return true;
  }

  enqueueVoice(source: string): Promise<boolean> {
    const result = new Promise<boolean>((resolve) => this.voiceQueue.push({ source, resolve }));
    this.playNextVoice();
    return result;
  }

  async recoverAutoplay(): Promise<boolean> {
    const blocked = this.blocked;
    if (!blocked) return true;
    try {
      await blocked.play();
      this.blocked = undefined;
      if (blocked === this.bgm && this.pendingBgmPrevious) {
        releaseAudio(this.pendingBgmPrevious);
        this.pendingBgmPrevious = undefined;
        blocked.volume = this.bgmVolume();
      }
      return true;
    } catch {
      return false;
    }
  }

  stopAll(): void {
    this.cancelFade();
    this.finishVoice(false);
    this.voiceQueue.splice(0).forEach((job) => job.resolve(false));
    const audioResources = new Set([this.bgm, this.blocked, this.pendingBgmPrevious, this.fadingOut]);
    audioResources.forEach(releaseAudio);
    this.bgm = undefined;
    this.blocked = undefined;
    this.pendingBgmPrevious = undefined;
    this.fadingOut = undefined;
  }

  dispose(): void {
    this.stopAll();
  }

  private async tryPlay(audio: RuntimeAudio): Promise<boolean> {
    try {
      await audio.play();
      return true;
    } catch {
      this.blocked = audio;
      return false;
    }
  }

  private bgmVolume(): number {
    return this.voice ? 0.25 : 1;
  }

  private playNextVoice(): void {
    if (this.voice || this.voiceQueue.length === 0) return;
    const job = this.voiceQueue.shift()!;
    const audio = this.createAudio(job.source);
    audio.src = job.source;
    this.voice = audio;
    this.activeVoiceJob = job;
    if (this.bgm) this.bgm.volume = 0.25;
    const ended = () => {
      this.finishVoice(true);
      this.playNextVoice();
    };
    this.voiceEnded = ended;
    audio.addEventListener('ended', ended);
    void this.tryPlay(audio);
  }

  private finishVoice(played: boolean): void {
    const voice = this.voice;
    if (voice && this.voiceEnded) voice.removeEventListener('ended', this.voiceEnded);
    releaseAudio(voice);
    this.voice = undefined;
    this.voiceEnded = undefined;
    const job = this.activeVoiceJob;
    this.activeVoiceJob = undefined;
    if (this.bgm) this.bgm.volume = 1;
    job?.resolve(played);
  }

  private crossfade(previous: RuntimeAudio, next: RuntimeAudio, durationMs: number): Promise<void> {
    const steps = 10;
    const delay = durationMs / steps;
    let step = 0;
    return new Promise((resolve) => {
      this.fadingOut = previous;
      this.fadeFinish = resolve;
      const advance = () => {
        step += 1;
        previous.volume = Math.max(0, 1 - step / steps);
        next.volume = this.bgmVolume() * Math.min(1, step / steps);
        if (step >= steps) {
          releaseAudio(previous);
          this.fadingOut = undefined;
          this.fadeTimer = undefined;
          this.fadeFinish = undefined;
          resolve();
        } else this.fadeTimer = setTimeout(advance, delay);
      };
      this.fadeTimer = setTimeout(advance, delay);
    });
  }

  private cancelFade(): void {
    if (this.fadeTimer !== undefined) clearTimeout(this.fadeTimer);
    this.fadeTimer = undefined;
    releaseAudio(this.fadingOut);
    this.fadingOut = undefined;
    this.fadeFinish?.();
    this.fadeFinish = undefined;
  }
}
