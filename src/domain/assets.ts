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

const ProviderIdSchema = z.enum(['pie', 'x666-openai-compatible']);
const MediaModelSchema = z.enum(['gpt-image-2', 'seedance-1.5-pro', 'speech-2.8-hd']);
const PromptVersionSchema = z.string().regex(/^[a-z0-9][a-z0-9._-]*$/iu);

export const AssetLicenseSchema = z
  .object({
    cueAlias: z.string().regex(/^[a-z0-9][a-z0-9_]*$/u),
    title: z.string().min(1),
    creator: z.string().min(1),
    isrc: z.string().regex(/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u),
    sourceUrl: z.string().url(),
    licenseId: z.literal('CC-BY-4.0'),
    licenseUrl: z.literal('https://creativecommons.org/licenses/by/4.0/'),
    attribution: z.string().min(1),
  })
  .strict();

export const AudioLicenseRegistrySchema = z
  .object({
    version: z.literal(1),
    projectId: z.literal('albina-galgame-card'),
    packagedNotice: z.string().min(1),
    tracks: z.array(AssetLicenseSchema.extend({
      assetId: z.string().min(1),
      path: RelativeAssetPathSchema.refine((path) => path.startsWith('audio/bgm/'), {
        message: 'Licensed music paths must be inside audio/bgm',
      }),
      sha256: z.string().regex(/^[a-f0-9]{64}$/u),
    }).strict()).length(5),
    officialSoundtrack: z.object({
      publisher: z.literal('ProjectMoon'),
      channel: z.literal('ProjectMoon Official'),
      playlistTitle: z.literal('LCB OST'),
      playlistTrackCount: z.literal(35),
      verifiedOn: z.literal('2026-07-15'),
      bundled: z.literal(false),
      cached: z.literal(false),
      redistributionAllowed: z.literal(false),
      notice: z.string().min(1),
      rightsNotice: z.string().min(1),
      links: z.array(z.object({ label: z.string().min(1), url: z.string().url() }).strict()).length(2),
      termsUrl: z.literal('https://limbuscompany.com/terms-of-service/'),
    }).strict(),
  })
  .strict()
  .superRefine((registry, context) => {
    registry.tracks.forEach((track, index) => {
      if (track.creator !== 'Kevin MacLeod') {
        context.addIssue({ code: 'custom', path: ['tracks', index, 'creator'], message: 'Packaged BGM creator must be Kevin MacLeod' });
      }
      const source = new URL(track.sourceUrl);
      if (source.protocol !== 'https:' || source.hostname !== 'incompetech.com' || source.pathname !== '/music/royalty-free/index.html' || source.searchParams.get('isrc') !== track.isrc) {
        context.addIssue({ code: 'custom', path: ['tracks', index, 'sourceUrl'], message: 'Track source must be its HTTPS Incompetech ISRC page' });
      }
    });
  });

const AssetProvenanceSchema = z
  .object({
    provider: ProviderIdSchema,
    model: MediaModelSchema,
    upstreamPieVerified: z.literal(false).optional(),
    promptVersion: PromptVersionSchema,
    sourceJobHash: z.string().regex(/^[a-f0-9]{64}$/iu),
    review: z.object({
      status: z.literal('approved'),
      reviewer: z.string().min(1),
      reviewedAt: z.string().datetime(),
    }).strict(),
  })
  .strict()
  .superRefine((value, context) => {
    addProviderModelIssue(context, ['model'], value.provider, value.model);
    addUpstreamEvidenceIssue(context, ['upstreamPieVerified'], value.provider, value.upstreamPieVerified);
  });

export const AssetRightsSchema = z
  .object({
    status: z.enum(['verified', 'unverified']),
    sourceType: z.enum(['model-output', 'project-authored', 'licensed-source', 'third-party-source']),
    redistribution: z.enum(['allowed', 'restricted', 'unverified']),
    rightsBasis: z.string().min(1),
    holder: z.string().min(1).optional(),
    sourceUrl: z.string().url().optional(),
  })
  .strict()
  .superRefine((rights, context) => {
    if (rights.status === 'verified' && rights.redistribution !== 'allowed') {
      context.addIssue({ code: 'custom', path: ['redistribution'], message: 'Verified asset rights must allow redistribution' });
    }
    if (rights.status === 'verified' && !rights.holder) {
      context.addIssue({ code: 'custom', path: ['holder'], message: 'Verified asset rights require a holder' });
    }
  });

const AssetLineageInputSchema = z
  .object({
    assetId: z.string().min(1).optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/iu),
    role: z.string().min(1),
  })
  .strict();

export const AssetLineageSchema = z
  .object({
    kind: z.enum(['original', 'derivative', 'transcode', 'conversion']),
    processVersion: PromptVersionSchema,
    inputs: z.array(AssetLineageInputSchema),
  })
  .strict()
  .superRefine((lineage, context) => {
    if (lineage.kind === 'original' && lineage.inputs.length !== 0) {
      context.addIssue({ code: 'custom', path: ['inputs'], message: 'Original assets cannot declare parent inputs' });
    }
    if (lineage.kind !== 'original' && lineage.inputs.length === 0) {
      context.addIssue({ code: 'custom', path: ['inputs'], message: 'Derived assets require at least one parent input' });
    }
  });

export const AssetRecordSchema = z
  .object({
    id: z.string().min(1),
    kind: z.enum(['image', 'video', 'audio', 'json']),
    path: RelativeAssetPathSchema,
    mimeType: z.string().min(1).optional(),
    sha256: z.string().regex(/^[a-f0-9]{64}$/i).optional(),
    bytes: z.number().int().nonnegative().optional(),
    provenance: AssetProvenanceSchema.optional(),
    rights: AssetRightsSchema.optional(),
    lineage: AssetLineageSchema.optional(),
    license: AssetLicenseSchema.optional(),
  })
  .strict()
  .superRefine((asset, context) => {
    if (asset.path.startsWith('audio/bgm/') && !asset.license) {
      context.addIssue({ code: 'custom', path: ['license'], message: 'Packaged BGM requires registered license metadata' });
    }
    if (asset.license && asset.kind !== 'audio') {
      context.addIssue({ code: 'custom', path: ['license'], message: 'License metadata is only supported on audio assets' });
    }
  });

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
    kind: z.enum(['image', 'image-edit', 'video', 'speech']),
    provider: ProviderIdSchema,
    model: MediaModelSchema,
    upstreamPieVerified: z.literal(false).optional(),
    promptVersion: PromptVersionSchema,
    status: z.enum(['pending', 'running', 'completed', 'failed']),
    contentHash: z.string().regex(/^[a-f0-9]{64}$/i),
    inputAssetIds: z.array(z.string().min(1)),
    outputPath: RelativeAssetPathSchema,
    attempts: z.number().int().nonnegative(),
    error: z.string().optional(),
  })
  .strict()
  .superRefine((value, context) => {
    const kind = value.kind === 'image-edit' ? 'image' : value.kind;
    addProviderModelIssue(context, ['model'], value.provider, value.model, kind);
    addUpstreamEvidenceIssue(context, ['upstreamPieVerified'], value.provider, value.upstreamPieVerified);
  });

function addProviderModelIssue(
  context: z.RefinementCtx,
  path: PropertyKey[],
  provider: string,
  model: string,
  kind?: 'image' | 'video' | 'speech',
): void {
  const allowed = provider === 'x666-openai-compatible'
    ? ['gpt-image-2']
    : provider === 'pie' ? ['seedance-1.5-pro', 'speech-2.8-hd'] : [];
  const kindMatches = kind === undefined || ({ image: ['gpt-image-2'], video: ['seedance-1.5-pro'], speech: ['speech-2.8-hd'] })[kind].includes(model);
  if (!allowed.includes(model) || !kindMatches) {
    context.addIssue({ code: 'custom', path, message: `Unsupported provider/model pair: ${provider}/${model}` });
  }
}

function addUpstreamEvidenceIssue(
  context: z.RefinementCtx,
  path: PropertyKey[],
  provider: string,
  upstreamPieVerified: false | undefined,
): void {
  const valid = provider === 'x666-openai-compatible'
    ? upstreamPieVerified === false
    : upstreamPieVerified === undefined;
  if (!valid) {
    context.addIssue({ code: 'custom', path, message: `Invalid upstream Pie evidence for provider: ${provider}` });
  }
}

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
  manifest.assets.forEach((asset, assetIndex) => {
    asset.lineage?.inputs.forEach((input, inputIndex) => {
      if (!input.assetId) return;
      const parent = manifest.assets.find((candidate) => candidate.id === input.assetId);
      if (!parent) {
        addAssetReferenceIssue(context, ['assets', assetIndex, 'lineage', 'inputs', inputIndex, 'assetId'], input.assetId);
      } else if (parent.sha256 !== input.sha256) {
        context.addIssue({ code: 'custom', path: ['assets', assetIndex, 'lineage', 'inputs', inputIndex, 'sha256'], message: `Lineage hash mismatch for ${input.assetId}` });
      }
    });
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
export type AssetLicense = z.infer<typeof AssetLicenseSchema>;
export type AssetRights = z.infer<typeof AssetRightsSchema>;
export type AssetLineage = z.infer<typeof AssetLineageSchema>;
export type AudioLicenseRegistry = z.infer<typeof AudioLicenseRegistrySchema>;
export type PortraitAsset = z.infer<typeof PortraitAssetSchema>;
export type MediaJob = z.infer<typeof MediaJobSchema>;
export type AssetManifestV2 = z.infer<typeof AssetManifestV2Schema>;

export function parseAssetManifestV2(input: unknown): AssetManifestV2 {
  return AssetManifestV2Schema.parse(input);
}
