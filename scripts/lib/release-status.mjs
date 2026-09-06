import { analyzeMediaReadiness } from './media-readiness.mjs';
import { evaluateReleaseGate } from './release-gate.mjs';

export const RELEASE_REQUIREMENTS = Object.freeze({
  deterministicScenes: 64,
  endings: 9,
  fixedVoiceAssets: 166,
  pieProvenancedVoiceAssets: 166,
  staticCharacterPortraits: 27,
  staticAlbinaPortraits: 13,
  licensedBgm: 5,
});

const REQUIRED_PROVIDERS = Object.freeze({
  image: { provider: 'wisart-openai-compatible', model: 'gpt-image-2' },
  imageFallbacks: [{ provider: 'latent-moe', model: 'latent-moe-async' }],
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

function pendingProductionJobs(manifest, productionPlan, ledgerJobs = {}) {
  const completed = new Set(['approved', 'complete', 'completed', 'promoted', 'ready', 'frozen-existing-artifact']);
  const jobs = new Map();
  for (const job of manifest?.mediaJobs ?? []) jobs.set(job.id, { id: job.id, kind: job.kind, status: job.status });
  for (const job of productionPlan?.imageJobs ?? []) jobs.set(job.id, { id: job.id, kind: 'image', status: job.status });
  // 台账是作业状态的唯一权威：失败的作业若已有 definitive-failure 处置记录，
  // 视为已解决（永久性 provider 拒绝，无法通过重试推进），不再计入 pending。
  const pending = [...jobs.values()].filter((job) => {
    const ledgerRecord = ledgerJobs[job.id];
    if (ledgerRecord?.resolution?.status === 'definitive-failure') return false;
    return !completed.has(job.status);
  });
  return {
    total: pending.length,
    image: pending.filter((job) => job.kind === 'image').length,
    video: pending.filter((job) => job.kind === 'video').length,
    speech: pending.filter((job) => job.kind === 'speech').length,
  };
}

export function summarizeReleaseArtifacts({ manifest, story, providerProbes, productionPlan, ledgerJobs = {} }) {
  return {
    content: summarizeContent(story),
    completed: summarizeCompleted(manifest, story),
    mediaReadiness: analyzeMediaReadiness(manifest),
    pendingMediaJobs: pendingProductionJobs(manifest, productionPlan, ledgerJobs),
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
  const result = {};
  for (const [channel, requirement] of Object.entries(REQUIRED_PROVIDERS)) {
    if (channel === 'imageFallbacks') {
      result.imageFallbacks = requirement.map((req) => resolveProvider(providerProbes, req));
    } else {
      result[channel] = resolveProvider(providerProbes, requirement);
    }
  }
  const primary = result.image;
  const fallbacks = result.imageFallbacks ?? [];
  const usableFallback = fallbacks.find((fb) => fb.available);
  if (usableFallback && !primary.available) {
    result.image = {
      ...primary,
      available: true,
      reason: 'image-fallback-available',
      fallbackProvider: usableFallback.provider,
      fallbackModel: usableFallback.model,
    };
  }
  return result;
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

function completionBlockers({ completed, mediaReadiness, pending, providers, runtimeMediaApis, worldbookAudit, krea2EvidenceAudit }) {
  const blockers = [];
  if (runtimeMediaApis) blockers.push('runtime-media-apis:enabled');
  for (const [field, minimum] of Object.entries(RELEASE_REQUIREMENTS)) {
    const actual = completed[field] ?? 0;
    if (actual < minimum) blockers.push(`requirement:${field}:${actual}/${minimum}`);
  }
  if ((mediaReadiness?.blocked ?? 0) > 0) blockers.push(`media-readiness:${mediaReadiness.blocked}-blocked`);
  if (pending.total > 0) blockers.push(`pending-media-jobs:${pending.total}`);
  if (pending.image > 0 && !providers.image.available) blockers.push('provider:image:gpt-image-2-unavailable');
  if ((pending.speech > 0 || completed.fixedVoiceAssets < RELEASE_REQUIREMENTS.fixedVoiceAssets) && !providers.speech.available) {
    blockers.push('provider:speech:speech-2.8-hd-unavailable');
  }
  if (worldbookAudit && worldbookAudit.completionGate?.completeLivingWorldVerified !== true) {
    blockers.push('worldbook:living-world-unverified');
  }
  if ((krea2EvidenceAudit?.failed ?? 0) > 0) blockers.push(`krea2-evidence-audit:${krea2EvidenceAudit.failed}-failed`);
  if ((krea2EvidenceAudit?.unbound ?? 0) > 0) blockers.push(`krea2-unbound-shipped-assets:${krea2EvidenceAudit.unbound}`);
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
    worldbookAudit: input.worldbookAudit,
    krea2EvidenceAudit: input.krea2EvidenceAudit,
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
    krea2EvidenceAudit: {
      total: input.krea2EvidenceAudit?.total ?? 0,
      bound: input.krea2EvidenceAudit?.bound ?? 0,
      unbound: input.krea2EvidenceAudit?.unbound ?? 0,
      failed: input.krea2EvidenceAudit?.failed ?? 0,
    },
    providers,
    worldbook: {
      completeLivingWorldVerified: input.worldbookAudit?.completionGate?.completeLivingWorldVerified === true,
      substantiveEntries: input.worldbookAudit?.completionGate?.substantiveEntries ?? 0,
      candidatesAwaitingRefresh: input.worldbookAudit?.completionGate?.sourceBackedCandidatesAwaitingRefresh ?? 0,
      quarantinedEntries: input.worldbookAudit?.completionGate?.quarantinedMissingSourceOrRuntimeReview ?? 0,
      crossTimelineEntries: input.worldbookAudit?.completionGate?.crossTimelineSubstantiveEntries ?? 0,
    },
    completionBlockers: blockers,
    substitutions: {
      music: 'Music 2.6 production is retired. The package uses five hash-locked CC BY 4.0 tracks; official OST remains external-only.',
      portraitMotion: 'All legacy portrait strips are retired; scene videos are retired. Twenty-seven static character portraits and static CG fallbacks are used throughout.',
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
