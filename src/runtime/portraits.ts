import type { AssetManifestV2, PortraitAsset } from '../domain/assets';

export interface ImageLike { readonly src: string }

export interface CanvasContextLike {
  clearRect(x: number, y: number, width: number, height: number): void;
  drawImage(...arguments_: unknown[]): void;
}

export interface CanvasLike {
  width: number;
  height: number;
  getContext(type: '2d'): CanvasContextLike | null;
}

export interface PortraitEnvironment {
  loadImage(url: string): Promise<ImageLike>;
  requestFrame(callback: FrameRequestCallback): number;
  cancelFrame(handle: number): void;
  reducedMotion(): boolean;
}

type Playback = { canvas: CanvasLike; frameHandle?: number };

function defaultEnvironment(): PortraitEnvironment {
  return {
    loadImage: (url) => new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error(`Unable to load portrait: ${url}`));
      image.src = url;
    }),
    requestFrame: (callback) => requestAnimationFrame(callback),
    cancelFrame: (handle) => cancelAnimationFrame(handle),
    reducedMotion: () => matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
}

export class PortraitService {
  private readonly playbacks = new Set<Playback>();
  private readonly environment: PortraitEnvironment;

  constructor(private readonly manifest: AssetManifestV2, environment?: PortraitEnvironment) {
    this.environment = environment ?? defaultEnvironment();
  }

  async play(portraitId: string, canvas: CanvasLike): Promise<void> {
    this.stop(canvas);
    const portrait = this.findPortrait(portraitId);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Portrait canvas does not expose a 2D context');
    if (portrait.animation.kind === 'static' || this.environment.reducedMotion()) {
      await this.drawStatic(portrait, context, canvas);
      this.playbacks.add({ canvas });
      return;
    }
    await this.playStrip(portrait, context, canvas);
  }

  stop(canvas: CanvasLike): void {
    for (const playback of this.playbacks) {
      if (playback.canvas !== canvas) continue;
      this.releasePlayback(playback);
      this.playbacks.delete(playback);
    }
  }

  stopAll(): void {
    for (const playback of this.playbacks) this.releasePlayback(playback);
    this.playbacks.clear();
  }

  dispose(): void {
    this.stopAll();
  }

  private findPortrait(id: string): PortraitAsset {
    const portrait = this.manifest.portraits.find((candidate) => candidate.id === id);
    if (!portrait) throw new Error(`Unknown portrait asset: ${id}`);
    return portrait;
  }

  private assetUrl(path: string): string {
    return `${this.manifest.basePath.replace(/\/$/, '')}/${path}`;
  }

  private async drawStatic(portrait: PortraitAsset, context: CanvasContextLike, canvas: CanvasLike): Promise<void> {
    const fallback = portrait.fallbackAssetId
      ? this.manifest.assets.find((asset) => asset.id === portrait.fallbackAssetId)
      : undefined;
    const image = await this.environment.loadImage(this.assetUrl(fallback?.path ?? portrait.path));
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  }

  private async playStrip(portrait: PortraitAsset, context: CanvasContextLike, canvas: CanvasLike): Promise<void> {
    if (portrait.animation.kind !== 'strip') return;
    const animation = portrait.animation;
    let image: ImageLike;
    try {
      image = await this.environment.loadImage(this.assetUrl(portrait.path));
    } catch {
      await this.drawStatic(portrait, context, canvas);
      this.playbacks.add({ canvas });
      return;
    }
    const playback: Playback = { canvas };
    this.playbacks.add(playback);
    let startedAt: number | undefined;
    const render: FrameRequestCallback = (timestamp) => {
      startedAt ??= timestamp;
      const elapsed = timestamp - startedAt;
      const frame = Math.floor(elapsed / (1000 / animation.fps)) % animation.frameCount;
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, frame * animation.frameWidth, 0, animation.frameWidth, animation.frameHeight, 0, 0, canvas.width, canvas.height);
      playback.frameHandle = this.environment.requestFrame(render);
    };
    playback.frameHandle = this.environment.requestFrame(render);
  }

  private releasePlayback(playback: Playback): void {
    if (playback.frameHandle !== undefined) this.environment.cancelFrame(playback.frameHandle);
    playback.canvas.getContext('2d')?.clearRect(0, 0, playback.canvas.width, playback.canvas.height);
  }
}
