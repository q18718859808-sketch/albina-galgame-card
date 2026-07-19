import { describe, expect, it } from 'vitest';

import {
  AssetLicenseSchema,
  AssetLineageSchema,
  AssetManifestV2Schema,
  AssetRecordSchema,
  AssetRightsSchema,
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
  provider: 'x666-openai-compatible',
  model: 'gpt-image-2',
  upstreamPieVerified: false,
  promptVersion: 'test-image-v1',
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

  it('enforces provider/model pairs and rejects secret production provenance', () => {
    expect(() => MediaJobSchema.parse({ ...mediaJob, provider: 'grok-responses' })).toThrow(/pie|invalid/iu);
    expect(() => MediaJobSchema.parse({ ...mediaJob, provider: 'hhhl' })).toThrow(/provider|invalid/iu);
    expect(() => MediaJobSchema.parse({ ...mediaJob, provider: 'pie', upstreamPieVerified: undefined })).toThrow(/provider|model/iu);
    expect(() => MediaJobSchema.parse({ ...mediaJob, upstreamPieVerified: undefined })).toThrow(/upstream pie/iu);
    expect(() => MediaJobSchema.parse({ ...mediaJob, upstreamPieVerified: true })).toThrow();
    expect(MediaJobSchema.parse({
      ...mediaJob, kind: 'speech', provider: 'pie', model: 'speech-2.8-hd', upstreamPieVerified: undefined,
    }).provider).toBe('pie');
    expect(MediaJobSchema.parse({
      ...mediaJob, kind: 'video', provider: 'pie', model: 'seedance-1.5-pro', upstreamPieVerified: undefined,
    }).provider).toBe('pie');
    expect(() => MediaJobSchema.parse({ ...mediaJob, kind: 'music', model: 'music-2.6' })).toThrow();
    expect(() => MediaJobSchema.parse({ ...mediaJob, promptVersion: '' })).toThrow();
    expect(() => AssetRecordSchema.parse({ id: 'cg.test', kind: 'image', path: 'cg/test.png', provenance: {
      provider: 'x666-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false, promptVersion: 'test-image-v1', sourceJobHash: 'a'.repeat(64),
      review: { status: 'approved', reviewer: 'reviewer', reviewedAt: '2026-07-15T00:00:00.000Z' }, remoteJobId: 'secret',
    } })).toThrow();
  });

  it('requires strict license metadata for packaged BGM assets', () => {
    const license = {
      cueAlias: 'title_theme', title: 'Achilles', creator: 'Kevin MacLeod', isrc: 'USUAN1100463',
      sourceUrl: 'https://incompetech.com/music/royalty-free/index.html?isrc=USUAN1100463',
      licenseId: 'CC-BY-4.0', licenseUrl: 'https://creativecommons.org/licenses/by/4.0/',
      attribution: 'Achilles by Kevin MacLeod, licensed under CC BY 4.0.',
    } as const;
    const asset = { id: 'file.audio.bgm.title.theme.mp3', kind: 'audio', path: 'audio/bgm/title_theme.mp3', license } as const;

    expect(AssetLicenseSchema.parse(license)).toEqual(license);
    expect(AssetRecordSchema.parse(asset)).toEqual(asset);
    expect(() => AssetRecordSchema.parse({ ...asset, license: undefined })).toThrow(/requires registered license/iu);
    expect(() => AssetRecordSchema.parse({ ...asset, license: { ...license, downloadedFrom: 'unknown' } })).toThrow();
    expect(() => AssetRecordSchema.parse({ ...asset, kind: 'image' })).toThrow(/only supported on audio/iu);
  });

  it('records redistribution rights and hash-bound media lineage', () => {
    const rights = {
      status: 'verified', sourceType: 'model-output', redistribution: 'allowed',
      rightsBasis: 'Provider output terms verified for this production.', holder: 'Albina Galgame Card project',
      sourceUrl: 'https://example.com/terms',
    } as const;
    const lineage = {
      kind: 'derivative', processVersion: 'video-transcode-v1',
      inputs: [{ assetId: 'cg.parent', sha256: 'a'.repeat(64), role: 'approved-keyframe' }],
    } as const;
    expect(AssetRightsSchema.parse(rights)).toEqual(rights);
    expect(AssetLineageSchema.parse(lineage)).toEqual(lineage);
    expect(() => AssetRightsSchema.parse({ ...rights, redistribution: 'unverified' })).toThrow(/allow redistribution/iu);
    expect(() => AssetLineageSchema.parse({ ...lineage, inputs: [] })).toThrow(/parent/iu);
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

  it('rejects lineage whose declared parent hash does not match the manifest', () => {
    const manifest = {
      version: 2,
      projectId: 'albina-galgame-card',
      basePath: 'assets',
      assets: [
        { id: 'cg.parent', kind: 'image', path: 'cg/parent.png', sha256: 'a'.repeat(64) },
        { id: 'video.child', kind: 'video', path: 'video/child.mp4', lineage: {
          kind: 'derivative', processVersion: 'seedance-v1', inputs: [{ assetId: 'cg.parent', sha256: 'b'.repeat(64), role: 'keyframe' }],
        } },
      ],
      portraits: [],
      mediaJobs: [],
    };
    expect(() => AssetManifestV2Schema.parse(manifest)).toThrow(/lineage hash mismatch/iu);
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
