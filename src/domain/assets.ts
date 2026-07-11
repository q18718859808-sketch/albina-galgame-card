import { z } from 'zod';

import { DOMAIN_VERSION } from './scene-cue';

function isCanonicalRelativePath(path: string): boolean {
  if (path.startsWith('/') || path.endsWith('/') || path.includes('\\') || path.includes(':')) return false;
  return path.split('/').every((segment) => segment.length > 0 && segment !== '.' && segment !== '..');
}

export const RelativeAssetPathSchema = z
  .string()
  .min(1)
  .refine(isCanonicalRelativePath, {
    message: 'Asset paths must be relative to the canonical asset root',
  });

export const AssetRecordSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(['image', 'video', 'audio', 'json']),
    path: RelativeAssetPathSchema,
    mimeType: z.string().min(1).optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    bytes: z.number().int().nonnegative().optional(),
  })
  .strict();

const PortraitAnimationSchema = z.discriminatedUnion('kind', [
  z.object({ kind: z.literal('static') }).strict(),
  z
    .object({
      kind: z.literal('strip'),
      frameCount: z.literal(8),
      frameWidth: z.number().int().positive(),
      frameHeight: z.number().int().positive(),
      fps: z.number().positive().finite(),
    })
    .strict(),
]);

export const PortraitAssetSchema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    id: z.string().min(1),
    characterId: z.string().min(1),
    path: RelativeAssetPathSchema,
    animation: PortraitAnimationSchema,
    fallbackAssetId: z.string().min(1).optional(),
  })
  .strict();

export const MediaJobSchema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    id: z.string().min(1),
    assetId: z.string().min(1),
    kind: z.enum(['image', 'image-edit', 'video', 'speech', 'music']),
    model: z.enum(['gpt-image-2', 'seedance-1.5-pro', 'speech-2.8-hd', 'music-2.6']),
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    contentHash: z.string().regex(/^[a-f0-9]{64}$/i),
    inputAssetIds: z.array(z.string().min(1)),
    outputPath: RelativeAssetPathSchema,
    attempts: z.number().int().nonnegative(),
    error: z.string().optional(),
  })
  .strict();

const AssetManifestV2BaseSchema = z
  .object({
    version: z.literal(DOMAIN_VERSION),
    projectId: z.literal('albina-galgame-card'),
    basePath: RelativeAssetPathSchema,
    assets: z.array(AssetRecordSchema),
    portraits: z.array(PortraitAssetSchema),
    mediaJobs: z.array(MediaJobSchema),
  })
  .strict();

function addAssetReferenceIssue(context: z.RefinementCtx, path: PropertyKey[], id: string): void {
  context.addIssue({ code: 'custom', path, message: `Unknown asset reference: ${id}` });
}

export const AssetManifestV2Schema = AssetManifestV2BaseSchema.superRefine((manifest, context) => {
  const declaredIds = new Set<string>();
  manifest.assets.forEach((asset, index) => {
    if (declaredIds.has(asset.id)) {
      context.addIssue({ code: 'custom', path: ['assets', index, 'id'], message: `Duplicate asset id: ${asset.id}` });
    }
    declaredIds.add(asset.id);
  });
  manifest.portraits.forEach((portrait, index) => {
    if (declaredIds.has(portrait.id)) {
      context.addIssue({ code: 'custom', path: ['portraits', index, 'id'], message: `Duplicate asset id: ${portrait.id}` });
    }
    declaredIds.add(portrait.id);
    if (portrait.fallbackAssetId && !manifest.assets.some((asset) => asset.id === portrait.fallbackAssetId)) {
      addAssetReferenceIssue(context, ['portraits', index, 'fallbackAssetId'], portrait.fallbackAssetId);
    }
  });
  manifest.mediaJobs.forEach((job, jobIndex) => {
    if (!declaredIds.has(job.assetId)) addAssetReferenceIssue(context, ['mediaJobs', jobIndex, 'assetId'], job.assetId);
    job.inputAssetIds.forEach((id, inputIndex) => {
      if (!declaredIds.has(id)) addAssetReferenceIssue(context, ['mediaJobs', jobIndex, 'inputAssetIds', inputIndex], id);
    });
  });
});

export type AssetRecord = z.infer<typeof AssetRecordSchema>;
export type PortraitAsset = z.infer<typeof PortraitAssetSchema>;
export type MediaJob = z.infer<typeof MediaJobSchema>;
export type AssetManifestV2 = z.infer<typeof AssetManifestV2Schema>;

export function parseAssetManifestV2(input: unknown): AssetManifestV2 {
  return AssetManifestV2Schema.parse(input);
}
