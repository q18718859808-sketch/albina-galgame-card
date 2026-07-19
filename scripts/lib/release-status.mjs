import { analyzeMediaReadiness } from './media-readiness.mjs';
import { evaluateReleaseGate } from './release-gate.mjs';

export const RELEASE_REQUIREMENTS = Object.freeze({
  deterministicScenes: 64,
  endings: 9,
  fixedVoiceAssets: 166,
  pieProvenancedVoiceAssets: 166,
  animatedCgRuntime: 24,
  animatedCgDesktop: 24,
  staticCharacterPortraits: 27,
  staticAlbinaPortraits: 13,
  licensedBgm: 5,
});

const REQUIRED_PROVIDERS = Object.freeze({
  image: { provider: 'x666-openai-compatible', model: 'gpt-image-2' },
  video: { provider: 'pie', model: 'seedance-1.5-pro' },
  speech: { provider: 'pie', model: 'speech-2.8-hd' },
});

function validHash(value) {
  return typeof value === 'string' && /^[a-f0-9]{64}$/u.test(value);
}

function requiredVoiceIds(story) {
  const ids = new Set();
  for (const scene of story?.scenes ?? []) {
    if (scene.voiceAssetId) ids.add(scene.voiceAssetId);
    for (const choice of scene.choices ?? []) if (choice.resultVoiceAssetId) ids.add(choice.resultVoiceAssetId);
  }
  return ids;
}

function isApprovedPieVoice(asset) {
  return asset?.provenance?.provider === 'pie'
    && asset.provenance.model === 'speech-2.8-hd'
    && asset.provenance.review?.status === 'approved'
    && validHash(asset.provenance.sourceJobHash)
    && Array.isArray(asset.lineage?.inputs)
    && asset.lineage.inputs.some((input) => validHash(input.sha256));
}

function uniqueAssetPaths(assets, predicate) {
  return new Set(assets.filter(predicate).map((asset) => asset.path)).size;
}

function summarizeCompleted(manifest, story) {
  const assets = manifest?.assets ?? [];
  const assetsById = new Map(assets.map((asset) => [asset.id, asset]));
  const voices = [...requiredVoiceIds(story)].map((id) => assetsById.get(id)).filter(Boolean);
  const portraits = (manifest?.portraits ?? []).filter((portrait) => portrait.animation?.kind === 'static');
  return {
    deterministicScenes: story?.scenes?.length ?? 0,
    endings: (story?.scenes ?? []).filter((scene) => Boolean(scene.ending)).length,
    fixedVoiceAssets: voices.filter((asset) => validHash(asset.sha256) && asset.bytes > 0).length,
    pieProvenancedVoiceAssets: voices.filter(isApprovedPieVoice).length,
    animatedCgRuntime: uniqueAssetPaths(assets, (asset) => asset.kind === 'video' && /(?:^|\.)runtime(?:\.|$)/u.test(asset.id)),
    animatedCgDesktop: uniqueAssetPaths(assets, (asset) => asset.kind === 'video' && /(?:^|\.)desktop(?:\.|$)/u.test(asset.id)),
    staticCharacterPortraits: portraits.length,
    staticAlbinaPortraits: portraits.filter((portrait) => portrait.characterId === 'albina').length,
    licensedBgm: uniqueAssetPaths(assets, (asset) => asset.kind === 'audio' && asset.path?.startsWith('audio/bgm/') && asset.license?.licenseId),
  };
}

function summarizeContent(story) {
  const scenes = story?.scenes ?? [];
  const canonScenes = scenes.filter((scene) => scene.provenance?.classification !== 'AU_extension').length;
  return {
    canonContextScenes: canonScenes > 0 ? 1 : 0,
    canonAlbinaScenes: Math.max(0, canonScenes - 1),
    auScenes: scenes.length - canonScenes,
    endings: scenes.filter((scene) => Boolean(scene.ending)).length,
  };
}

function pendingProductionJobs(manifest, productionPlan) {
  const completed = new Set(['approved', 'complete', 'completed', 'promoted', 'ready']);
  const jobs = new Map();
  for (const job of manifest?.mediaJobs ?? []) jobs.set(job.id, { id: job.id, kind: job.kind, status: job.status });
  for (const job of productionPlan?.imageJobs ?? []) jobs.set(job.id, { id: job.id, kind: 'image', status: job.status });
  for (const job of productionPlan?.videoJobs ?? []) jobs.set(job.id, { id: job.id, kind: 'video', status: job.status });
  const pending = [...jobs.values()].filter((job) => !completed.has(job.status));
  return {
    total: pending.length,
    image: pending.filter((job) => job.kind === 'image').length,
    video: pending.filter((job) => job.kind === 'video').length,
    speech: pending.filter((job) => job.kind === 'speech').length,
  };
}

export function summarizeReleaseArtifacts({ manifest, story, providerProbes, productionPlan }) {
  return {
    content: summarizeContent(story),
    completed: summarizeCompleted(manifest, story),
    mediaReadiness: analyzeMediaReadiness(manifest),
    pendingMediaJobs: pendingProductionJobs(manifest, productionPlan),
    providerProbes,
  };
}

function allProviderProbes(source) {
  return [...(source?.probes ?? []), ...(source?.compatibilityProbes ?? [])];
}

function modelListed(probe, model) {
  return probe?.models?.[model] === true || probe?.modelList?.models?.[model] === true;
}

function resolveProvider(source, requirement) {
  const probe = allProviderProbes(source).find((candidate) => candidate.provider === requirement.provider);
  const authorized = probe?.productionAuthorization?.authorized ?? probe?.productionAuthorized ?? true;
  const current = probe?.currentAvailability?.available;
  const listed = modelListed(probe, requirement.model);
  let reason = 'available';
  if (!probe) reason = 'probe-missing';
  else if (!listed) reason = 'model-not-listed';
  else if (authorized === false) reason = 'production-not-authorized';
  else if (current === false) reason = 'current-probe-unavailable';
  return {
    ...requirement,
    available: Boolean(probe && listed && authorized !== false && current !== false),
    reason,
    testedAt: probe?.currentAvailability?.checkedAt ?? probe?.testedAt ?? null,
  };
}

function providerAvailability(providerProbes) {
  return Object.fromEntries(Object.entries(REQUIRED_PROVIDERS)
    .map(([channel, requirement]) => [channel, resolveProvider(providerProbes, requirement)]));
}

function normalizePending(value) {
  if (typeof value === 'number') return { total: value, image: value, video: 0, speech: 0 };
  return {
    total: value?.total ?? 0,
    image: value?.image ?? 0,
    video: value?.video ?? 0,
    speech: value?.speech ?? 0,
  };
}

function completionBlockers({ completed, mediaReadiness, pending, providers, runtimeMediaApis }) {
  const blockers = [];
  if (runtimeMediaApis) blockers.push('runtime-media-apis:enabled');
  for (const [field, minimum] of Object.entries(RELEASE_REQUIREMENTS)) {
    const actual = completed[field] ?? 0;
    if (actual < minimum) blockers.push(`requirement:${field}:${actual}/${minimum}`);
  }
  if ((mediaReadiness?.blocked ?? 0) > 0) blockers.push(`media-readiness:${mediaReadiness.blocked}-blocked`);
  if (pending.total > 0) blockers.push(`pending-media-jobs:${pending.total}`);
  if (pending.image > 0 && !providers.image.available) blockers.push('provider:image:gpt-image-2-unavailable');
  if (pending.video > 0 && !providers.video.available) blockers.push('provider:video:seedance-1.5-pro-unavailable');
  if ((pending.speech > 0 || completed.fixedVoiceAssets < RELEASE_REQUIREMENTS.fixedVoiceAssets) && !providers.speech.available) {
    blockers.push('provider:speech:speech-2.8-hd-unavailable');
  }
  return blockers;
}

function compactReadiness(report) {
  const issueCounts = {};
  for (const blocker of report?.blockers ?? []) {
    for (const issue of blocker.issues ?? []) issueCounts[issue] = (issueCounts[issue] ?? 0) + 1;
  }
  return {
    total: report?.total ?? 0,
    ready: report?.ready ?? 0,
    blocked: report?.blocked ?? 0,
    byRoot: report?.byRoot ?? {},
    issueCounts,
  };
}

export function deriveReleaseStatus(input) {
  const version = input.version;
  const completed = Object.fromEntries(Object.keys(RELEASE_REQUIREMENTS)
    .map((field) => [field, input.completed?.[field] ?? 0]));
  const pending = normalizePending(input.pendingMediaJobs);
  const providers = providerAvailability(input.providerProbes);
  const blockers = completionBlockers({
    completed,
    mediaReadiness: input.mediaReadiness,
    pending,
    providers,
    runtimeMediaApis: input.runtimeMediaApis,
  });
  const base = {
    schemaVersion: 1,
    version,
    releaseCandidate: version.includes('-'),
    completeEdition: blockers.length === 0,
    runtimeMediaApis: Boolean(input.runtimeMediaApis),
    content: input.content ?? {},
    completed,
    requirements: RELEASE_REQUIREMENTS,
    mediaReadiness: compactReadiness(input.mediaReadiness),
    production: { pendingMediaJobs: pending },
    providers,
    completionBlockers: blockers,
    substitutions: {
      music: 'Music 2.6 production is retired. The package uses five hash-locked CC BY 4.0 tracks; official OST remains external-only.',
      portraitMotion: 'All legacy portrait strips are retired. Twenty-seven static character portraits are paired with 24 reachable dual-profile AU videos and reduced-motion fallbacks.',
    },
    knownLimitations: {
      officialOst: 'Free streaming is not a redistribution license, so ProjectMoon, Mili, and Studio EIM recordings are not bundled.',
      canonDialogue: 'Canon scenes are sourced Chinese paraphrases, not a verbatim transcript or a replacement for the source game.',
      visualProvenance: `${input.mediaReadiness?.blocked ?? 0} visual delivery paths remain blocked; media:readiness:strict must pass before v2.0.0.`,
      finalTag: 'v2.0.0 remains reserved until complete-edition requirements and public CDN verification are satisfied.',
    },
  };
  return {
    ...base,
    gates: {
      rc: evaluateReleaseGate({ channel: 'rc', status: base }),
      final: evaluateReleaseGate({ channel: 'final', status: base }),
    },
  };
}
