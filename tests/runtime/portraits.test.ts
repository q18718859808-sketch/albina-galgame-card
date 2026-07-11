import { describe, expect, it, vi } from 'vitest';

import type { AssetManifestV2 } from '../../src/domain/assets';
import { PortraitService, type CanvasLike, type ImageLike } from '../../src/runtime/portraits';

const manifest: AssetManifestV2 = {
  version: 2,
  projectId: 'albina-galgame-card',
  basePath: 'assets',
  assets: [{ id: 'portrait.static', kind: 'image', path: 'characters/albina.png' }],
  portraits: [{
    version: 2,
    id: 'portrait.animated',
    characterId: 'albina',
    path: 'sprite-atlas/albina_strip.png',
    animation: { kind: 'strip', frameCount: 8, frameWidth: 100, frameHeight: 200, fps: 8 },
    fallbackAssetId: 'portrait.static',
  }],
  mediaJobs: [],
};

function createCanvas() {
  const context = { clearRect: vi.fn(), drawImage: vi.fn() };
  return { canvas: { width: 100, height: 200, getContext: () => context } satisfies CanvasLike, context };
}

describe('PortraitService', () => {
  it('plays all eight strip frames through requestAnimationFrame', async () => {
    const callbacks: FrameRequestCallback[] = [];
    const { canvas, context } = createCanvas();
    const service = new PortraitService(manifest, {
      loadImage: async (url) => ({ src: url } satisfies ImageLike),
      requestFrame: (callback) => (callbacks.push(callback), callbacks.length),
      cancelFrame: vi.fn(),
      reducedMotion: () => false,
    });

    await service.play('portrait.animated', canvas);
    for (let frame = 0; frame < 8; frame += 1) callbacks.shift()?.(frame * 125);

    const sourceXs = context.drawImage.mock.calls.map((call) => call[1]);
    expect(new Set(sourceXs)).toEqual(new Set([0, 100, 200, 300, 400, 500, 600, 700]));
  });

  it('uses the static fallback when reduced motion is enabled', async () => {
    const { canvas, context } = createCanvas();
    const requestFrame = vi.fn();
    const service = new PortraitService(manifest, {
      loadImage: async (url) => ({ src: url } satisfies ImageLike),
      requestFrame,
      cancelFrame: vi.fn(),
      reducedMotion: () => true,
    });

    await service.play('portrait.animated', canvas);

    expect(requestFrame).not.toHaveBeenCalled();
    expect(context.drawImage.mock.calls[0]?.[0]).toMatchObject({ src: 'assets/characters/albina.png' });
  });

  it('cancels RAF and clears every owned canvas', async () => {
    const { canvas, context } = createCanvas();
    const cancelFrame = vi.fn();
    const service = new PortraitService(manifest, {
      loadImage: async (url) => ({ src: url } satisfies ImageLike),
      requestFrame: () => 42,
      cancelFrame,
      reducedMotion: () => false,
    });
    await service.play('portrait.animated', canvas);

    service.stopAll();

    expect(cancelFrame).toHaveBeenCalledWith(42);
    expect(context.clearRect).toHaveBeenCalledWith(0, 0, 100, 200);
  });
});
