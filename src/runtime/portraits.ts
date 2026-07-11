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
  private readonly canvasGenerations = new WeakMap<CanvasLike, number>();
  private lifecycleGeneration = 0;

  constructor(private readonly manifest: AssetManifestV2, environment?: PortraitEnvironment) {
    this.environment = environment ?? defaultEnvironment();
  }

  async play(portraitId: string, canvas: CanvasLike): Promise<void> {
    this.stop(canvas);
    const lifecycle = this.lifecycleGeneration;
    const generation = this.nextCanvasGeneration(canvas);
    const portrait = this.findPortrait(portraitId);
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Portrait canvas does not expose a 2D context');
    if (portrait.animation.kind === 'static' || this.environment.reducedMotion()) {
      const drawn = await this.drawStatic(portrait, context, canvas, lifecycle, generation);
      if (drawn && this.isCurrent(canvas, lifecycle, generation)) this.playbacks.add({ canvas });
      return;
    }
    await this.playStrip(portrait, context, canvas, lifecycle, generation);
  }

  stop(canvas: CanvasLike): void {
    this.nextCanvasGeneration(canvas);
    for (const playback of this.playbacks) {
      if (playback.canvas !== canvas) continue;
      this.releasePlayback(playback);
      this.playbacks.delete(playback);
    }
  }

  stopAll(): void {
    this.lifecycleGeneration += 1;
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

  private async drawStatic(
    portrait: PortraitAsset,
    context: CanvasContextLike,
    canvas: CanvasLike,
    lifecycle: number,
    generation: number,
  ): Promise<boolean> {
    const fallback = portrait.fallbackAssetId
      ? this.manifest.assets.find((asset) => asset.id === portrait.fallbackAssetId)
      : undefined;
    let image: ImageLike;
    try {
      image = await this.environment.loadImage(this.assetUrl(fallback?.path ?? portrait.path));
    } catch {
      return false;
    }
    if (!this.isCurrent(canvas, lifecycle, generation)) return false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    if (!fallback && portrait.animation.kind === 'strip') {
      const animation = portrait.animation;
      context.drawImage(image, 0, 0, animation.frameWidth, animation.frameHeight, 0, 0, canvas.width, canvas.height);
    } else context.drawImage(image, 0, 0, canvas.width, canvas.height);
    return true;
  }

  private async playStrip(
    portrait: PortraitAsset,
    context: CanvasContextLike,
    canvas: CanvasLike,
    lifecycle: number,
    generation: number,
  ): Promise<void> {
    if (portrait.animation.kind !== 'strip') return;
    const animation = portrait.animation;
    let image: ImageLike;
    try {
      image = await this.environment.loadImage(this.assetUrl(portrait.path));
    } catch {
      if (!portrait.fallbackAssetId) return;
      const drawn = await this.drawStatic(portrait, context, canvas, lifecycle, generation);
      if (drawn && this.isCurrent(canvas, lifecycle, generation)) this.playbacks.add({ canvas });
      return;
    }
    if (!this.isCurrent(canvas, lifecycle, generation)) return;
    const playback: Playback = { canvas };
    this.playbacks.add(playback);
    let startedAt: number | undefined;
    const render: FrameRequestCallback = (timestamp) => {
      if (!this.isCurrent(canvas, lifecycle, generation)) return;
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

  private nextCanvasGeneration(canvas: CanvasLike): number {
    const generation = (this.canvasGenerations.get(canvas) ?? 0) + 1;
    this.canvasGenerations.set(canvas, generation);
    return generation;
  }

  private isCurrent(canvas: CanvasLike, lifecycle: number, generation: number): boolean {
    return this.lifecycleGeneration === lifecycle && this.canvasGenerations.get(canvas) === generation;
  }
}
