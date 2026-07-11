import { describe, expect, it } from 'vitest';

import {
  AssetManifestV2Schema,
  MediaJobSchema,
  PortraitAssetSchema,
} from '../../src/domain/assets';

const portrait = {
  version: 2,
  id: 'portrait.albina.normal',
  characterId: 'albina',
  path: 'characters/albina/normal.webp',
  animation: {
    kind: 'strip',
    frameCount: 8,
    frameWidth: 512,
    frameHeight: 768,
    fps: 12,
  },
  fallbackAssetId: 'portrait.albina.normal.static',
} as const;

const mediaJob = {
  version: 2,
  id: 'job.portrait.albina.normal',
  assetId: 'portrait.albina.normal',
  kind: 'image',
  model: 'gpt-image-2',
  status: 'completed',
  contentHash: 'a'.repeat(64),
  inputAssetIds: ['portrait.albina.normal.static'],
  outputPath: 'characters/albina/normal.webp',
  attempts: 1,
} as const;

describe('asset schemas', () => {
  it('accepts strictly versioned portrait assets and media jobs', () => {
    expect(PortraitAssetSchema.parse(portrait)).toEqual(portrait);
    expect(MediaJobSchema.parse(mediaJob)).toEqual(mediaJob);
  });

  it('rejects unknown fields and wrong versions', () => {
    expect(() => PortraitAssetSchema.parse({ ...portrait, version: 1 })).toThrow();
    expect(() => MediaJobSchema.parse({ ...mediaJob, runtimeApiKey: 'secret' })).toThrow();
    for (const path of [
      'C:\\assets\\portrait.png',
      '\\assets\\portrait.png',
      '\\\\server\\share\\portrait.png',
      './cg/a.png',
      'cg/./a.png',
      'cg//a.png',
      'cg/a.png/',
    ]) {
      expect(() => PortraitAssetSchema.parse({ ...portrait, path })).toThrow(/relative/i);
    }
  });

  it('accepts a complete manifest with resolvable references', () => {
    const manifest = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        {
          id: 'portrait.albina.normal.static',
          kind: 'image',
          path: 'characters/albina/normal.png',
        },
      ],
      portraits: [portrait],
      mediaJobs: [mediaJob],
    };

    expect(AssetManifestV2Schema.parse(manifest)).toEqual(manifest);
  });

  it('rejects manifest references to undeclared assets', () => {
    const manifest = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        {
          id: 'portrait.albina.normal.static',
          kind: 'image',
          path: 'characters/albina/normal.png',
        },
      ],
      portraits: [portrait],
      mediaJobs: [{ ...mediaJob, inputAssetIds: ['missing.asset'] }],
    };

    expect(() => AssetManifestV2Schema.parse(manifest)).toThrow(/asset reference/i);
  });

  it('rejects duplicate asset identifiers', () => {
    const duplicate = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        { id: 'cg.opening', kind: 'image', path: 'cg/opening.png' },
        { id: 'cg.opening', kind: 'image', path: 'cg/opening-copy.png' },
      ],
      portraits: [],
      mediaJobs: [],
    };

    expect(() => AssetManifestV2Schema.parse(duplicate)).toThrow(/duplicate asset id/i);
  });
});
