import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, open, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { isIP } from 'node:net';
import { basename, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

import { parsePromotionReceipt } from './promotion-receipts.mjs';

const exec = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const defaultPlanPath = resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json');
const defaultStoryPath = resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json');
const defaultAssetRoot = resolve(projectRoot, 'dist/albina-galgame-card/assets');
const defaultReceiptRoot = resolve(projectRoot, 'content/media-receipts');
const defaultStagingRoot = resolve(projectRoot, 'staging/media/video-v2');
const hashPattern = /^[a-f0-9]{64}$/u;
const idPattern = /^[a-z0-9][a-z0-9._-]*$/iu;
const promptVersionPattern = /^[a-z0-9][a-z0-9._-]*$/iu;
const videoStatuses = new Set([
  'submitting', 'submitted', 'polling', 'provider-completed', 'master-materialized',
  'encoding', 'awaiting-review', 'completed', 'rejected', 'failed', 'ambiguous',
]);
const frozenVideoStatus = 'frozen-existing-artifact';
const completedProviderStates = new Set(['success', 'completed', 'succeeded', 'complete']);
const failedProviderStates = new Set(['failed', 'error', 'cancelled', 'canceled']);

export function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function isUsablePieApiKey(value) {
  return typeof value === 'string' && /^sk-[A-Za-z0-9_-]{20,}$/u.test(value);
}

export async function loadVideoInputs(options = {}) {
  const plan = await readJson(options.planPath ?? defaultPlanPath);
  const story = await readJson(options.storyPath ?? defaultStoryPath);
  validateVideoInputs(plan, story);
  return { plan, story };
}

export function selectVideoJobs(plan, options = {}) {
  const ids = options.ids ?? [];
  if (!Array.isArray(ids) || ids.some((id) => typeof id !== 'string' || !id)) throw new Error('Video job ids are invalid');
  if (options.all === true && ids.length > 0) throw new Error('Choose either --all or explicit video job ids');
  if (options.all !== true && ids.length === 0) throw new Error('Video production requires --all or explicit ids');
  const byId = new Map(plan.videoJobs.map((job) => [job.id, job]));
  const selected = options.all === true ? [...plan.videoJobs] : ids.map((id) => byId.get(id));
  if (selected.some((job) => !job)) throw new Error(`Unknown video jobs: ${ids.filter((id) => !byId.has(id)).join(', ')}`);
  if (new Set(selected.map((job) => job.id)).size !== selected.length) throw new Error('Video job ids must be unique');
  return selected.sort((left, right) => left.id.localeCompare(right.id));
}

export async function resolveApprovedKeyframe(job, imageJob, options = {}) {
  if (!imageJob || imageJob.category !== 'cg' || imageJob.assetId !== job.sourceCgAssetId) {
    throw new Error(`Video source is not a static CG job: ${job.id}`);
  }
  const assetPath = resolveChild(options.assetRoot ?? defaultAssetRoot, imageJob.path, 'static CG asset');
  const bytes = await readFile(assetPath);
  const artifactSha256 = hash(bytes);
  const receipt = await readSourceReceipt(options.receiptRoot ?? defaultReceiptRoot, imageJob, job.sourceCgAssetId);
  if (receipt.assetId !== job.sourceCgAssetId || receipt.artifactSha256 !== artifactSha256) {
    throw new Error(`Static CG promotion receipt hash mismatch: ${job.id}`);
  }
  validateStaticCgReceipt(receipt, job.id);
  return {
    assetId: job.sourceCgAssetId,
    path: assetPath,
    bytes,
    sha256: artifactSha256,
    receipt,
  };
}

export async function runVideoBatch(options, environment = process.env, dependencies = {}) {
  validateRunOptions(options);
  const paths = resolvePaths(dependencies);
  const release = await acquireLock(paths.stagingRoot, options.recoverStaleLock === true);
  try {
    const inputs = await loadInputs(dependencies, paths);
    const jobs = selectVideoJobs(inputs.plan, options);
    if (jobs.some((job) => job.status === frozenVideoStatus)) throw new Error('Frozen historical video artifacts cannot be regenerated');
    const apiKey = environment.PIE_API_KEY;
    if (!isUsablePieApiKey(apiKey)) throw new Error('PIE_API_KEY is required before any Pie video request');
    const client = dependencies.client ?? createPieClient(environment, dependencies.fetcher);
    const transcode = dependencies.transcode ?? transcodeVideo;
    const probeVideo = dependencies.probeVideo ?? probeVideoFile;
    if (!dependencies.transcode || !dependencies.probeVideo) await preflightMediaTools();
    const ledger = await loadLedger(paths.stagingRoot);
    const results = [];
    for (const job of jobs) {
      const result = await runVideoJob(job, inputs, ledger, options, paths, { ledger, client, transcode, probeVideo, now: dependencies.now ?? (() => new Date()), sleep: dependencies.sleep ?? sleep });
      results.push(result);
      await saveLedger(paths.stagingRoot, ledger);
      if (result.status === 'ambiguous') break;
    }
    return results;
  } finally {
    await release();
  }
}

export async function reviewVideoArtifacts(options, dependencies = {}) {
  validateReviewOptions(options);
  const paths = resolvePaths(dependencies);
  const release = await acquireLock(paths.stagingRoot, options.recoverStaleLock === true);
  try {
    const inputs = await loadInputs(dependencies, paths);
    const ledger = await loadLedger(paths.stagingRoot);
    const jobs = selectVideoJobs(inputs.plan, { ids: options.ids });
    const results = [];
    for (const job of jobs) {
      const result = await reviewVideoJob(job, inputs, ledger, options, paths, dependencies.now ?? (() => new Date()));
      results.push(result);
      await saveLedger(paths.stagingRoot, ledger);
    }
    return results;
  } finally {
    await release();
  }
}

export async function promoteVideoArtifacts(options, dependencies = {}) {
  validatePromotionOptions(options);
  const paths = resolvePaths(dependencies);
  const release = await acquireLock(paths.stagingRoot, options.recoverStaleLock === true);
  try {
    const inputs = await loadInputs(dependencies, paths);
    const ledger = await loadLedger(paths.stagingRoot);
    const jobs = selectVideoJobs(inputs.plan, options);
    const results = [];
    const writeAtomic = dependencies.writeAtomic ?? atomicWrite;
    for (const job of jobs) results.push(...await promoteVideoJob(job, inputs, ledger, options, paths, writeAtomic));
    await saveLedger(paths.stagingRoot, ledger);
    return results;
  } finally {
    await release();
  }
}

export function buildVideoPromotionReceipt(candidate, variant, rights = {}) {
  validateReceiptCandidate(candidate, variant);
  const normalizedRights = normalizeRights(rights);
  const receipt = {
    version: 1,
    assetId: candidate.receiptAssetId,
    artifactSha256: candidate.artifactSha256,
    provenance: {
      provider: 'pie',
      model: 'seedance-1.5-pro',
      promptVersion: candidate.promptVersion,
      sourceJobHash: candidate.sourceJobHash,
      review: {
        status: 'approved',
        reviewer: candidate.review.reviewer.trim(),
        reviewedAt: candidate.review.reviewedAt,
      },
    },
    rights: {
      status: 'unverified',
      sourceType: 'model-output',
      redistribution: 'unverified',
      rightsBasis: normalizedRights.rightsBasis,
      ...(normalizedRights.sourceUrl ? { sourceUrl: normalizedRights.sourceUrl } : {}),
    },
    lineage: {
      kind: 'transcode',
      processVersion: 'albina-seedance-video-promotion-v2',
      inputs: [
        { assetId: candidate.sourceCgAssetId, sha256: candidate.sourceArtifactSha256, role: 'approved-static-cg-keyframe' },
        { sha256: candidate.masterSha256, role: 'seedance-master' },
      ],
    },
  };
  return parsePromotionReceipt(receipt);
}

export function validateVideoLedger(value) {
  if (!value || typeof value !== 'object' || value.version !== 2 || value.projectId !== 'albina-galgame-card'
    || value.provider !== 'pie' || value.model !== 'seedance-1.5-pro' || !value.jobs || Array.isArray(value.jobs)) {
    throw new Error('Invalid video production ledger; refusing to risk a duplicate paid request');
  }
  for (const [id, record] of Object.entries(value.jobs)) validateLedgerJob(id, record);
  return value;
}

export function buildTranscodeArgs(sourcePath, targetPath, delivery) {
  if (!['runtime', 'desktop'].includes(delivery.variant)) throw new Error('Unknown video delivery variant');
  const filter = `scale=${delivery.width}:${delivery.height}:force_original_aspect_ratio=increase,crop=${delivery.width}:${delivery.height}`;
  return ['-v', 'error', '-y', '-i', sourcePath, '-map', '0:v:0', '-map', '0:a?', '-vf', filter, '-r', String(delivery.fps), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', targetPath];
}

async function loadInputs(dependencies, paths) {
  const loaded = dependencies.loadInputs ? await dependencies.loadInputs() : await loadVideoInputs({ planPath: paths.planPath, storyPath: paths.storyPath });
  validateVideoInputs(loaded.plan, loaded.story);
  return loaded;
}

function validateVideoInputs(plan, story) {
  if (plan?.version === 2 && plan.projectId === 'albina-galgame-card' && !Object.hasOwn(plan, 'videoJobs')) {
    throw new Error('Video production plan is retired; the product uses static CG fallbacks.');
  }
  if (plan?.version !== 2 || plan.projectId !== 'albina-galgame-card' || !Array.isArray(plan.videoJobs)
    || !Array.isArray(plan.imageJobs) || plan.videoJobs.length !== plan.counts?.videoContentJobs
    || !Array.isArray(story?.scenes)) throw new Error('Invalid Seedance video production inputs');
  const imageByAsset = new Map();
  for (const image of plan.imageJobs) {
    if (imageByAsset.has(image.assetId)) throw new Error(`Duplicate image asset in video plan: ${image.assetId}`);
    imageByAsset.set(image.assetId, image);
  }
  const sceneById = new Map(story.scenes.map((scene) => [scene.id, scene]));
  const seen = new Set();
  for (const job of plan.videoJobs) validateVideoJob(job, imageByAsset, sceneById, seen);
}

function validateVideoJob(job, imageByAsset, sceneById, seen) {
  if (!job || typeof job.id !== 'string' || seen.has(job.id) || !idPattern.test(job.id)) throw new Error('Invalid or duplicate video job id');
  seen.add(job.id);
  const image = imageByAsset.get(job.sourceCgAssetId);
  const scene = sceneById.get(job.sceneId);
  if (!image || image.category !== 'cg' || image.status !== 'authorized-prompt-frozen' || scene?.cgAssetId !== job.sourceCgAssetId
    || hash(scene.text) !== job.sourceTextHash || job.provider !== 'pie' || job.model !== 'seedance-1.5-pro'
    || job.promptVersion !== 'albina-video-v2' || job.durationSeconds !== 8 || !['blocked-source-keyframe', frozenVideoStatus].includes(job.status)
    || job.masterDelivery?.retainedOffline !== true) throw new Error(`Invalid video source contract: ${job.id}`);
  validateDelivery(job.runtime, 'runtime');
  validateDelivery(job.desktop, 'desktop');
}

function validateDelivery(delivery, variant) {
  if (!delivery || typeof delivery.assetId !== 'string' || typeof delivery.path !== 'string' || !/^video\/animated\/(?:runtime|desktop)\/[a-z0-9._-]+\.mp4$/iu.test(delivery.path)
    || !Number.isInteger(delivery.width) || !Number.isInteger(delivery.height) || delivery.fps !== 24
    || (variant === 'runtime' && (delivery.width !== 1280 || delivery.height !== 720))
    || (variant === 'desktop' && (delivery.width !== 1920 || delivery.height !== 1080))) throw new Error(`Invalid ${variant} video delivery contract`);
}

function validateRunOptions(options = {}) {
  if (!options || (options.all !== true && (!Array.isArray(options.ids) || options.ids.length === 0))) throw new Error('Video production requires --all or explicit ids');
  if (options.all === true && Array.isArray(options.ids) && options.ids.length > 0) throw new Error('Choose either --all or explicit video job ids');
  if (!Number.isInteger(options.maxPolls ?? 60) || (options.maxPolls ?? 60) < 0) throw new Error('maxPolls must be a non-negative integer');
  if (!Number.isInteger(options.pollIntervalMs ?? 10_000) || (options.pollIntervalMs ?? 10_000) < 0) throw new Error('pollIntervalMs must be a non-negative integer');
  if (options.regenerate === true && (!Array.isArray(options.ids) || options.ids.length === 0)) throw new Error('regenerate requires explicit video ids');
}

function validateReviewOptions(options) {
  if (!options || !Array.isArray(options.ids) || options.ids.length === 0 || !['approved', 'rejected'].includes(options.decision)) throw new Error('Video review requires explicit ids and a decision');
  if (typeof options.reviewer !== 'string' || options.reviewer.trim().length < 3) throw new Error('A named video reviewer is required');
}

function validatePromotionOptions(options) {
  if (!options || (options.all !== true && (!Array.isArray(options.ids) || options.ids.length === 0)) || (options.all === true && (options.ids ?? []).length > 0)) throw new Error('Video promotion requires --all or explicit ids');
  normalizeRights(options.rights);
}

function resolvePaths(dependencies) {
  return {
    planPath: dependencies.planPath ?? defaultPlanPath,
    storyPath: dependencies.storyPath ?? defaultStoryPath,
    assetRoot: resolve(dependencies.assetRoot ?? defaultAssetRoot),
    receiptRoot: resolve(dependencies.receiptRoot ?? defaultReceiptRoot),
    stagingRoot: resolve(dependencies.stagingRoot ?? defaultStagingRoot),
  };
}

async function runVideoJob(job, inputs, ledger, options, paths, runtime) {
  const imageJob = inputs.plan.imageJobs.find((image) => image.assetId === job.sourceCgAssetId);
  const keyframe = await resolveApprovedKeyframe(job, imageJob, paths);
  const scene = inputs.story.scenes.find((candidate) => candidate.id === job.sceneId);
  const prompt = buildVideoPrompt(job, scene);
  const sourceJobHash = buildSourceJobHash(job, prompt, keyframe);
  let record = ledger.jobs[job.id];
  let preparedForSubmit = false;
  if (record && record.sourceJobHash !== sourceJobHash) {
    if (options.regenerate !== true || !['failed', 'rejected'].includes(record.status)) return { id: job.id, status: 'contract-changed' };
    record = archiveAndPrepare(record, sourceJobHash, keyframe, job, runtime.now);
    ledger.jobs[job.id] = record;
    preparedForSubmit = true;
  }
  if (!record) {
    record = prepareRecord(job, sourceJobHash, keyframe, runtime.now);
    ledger.jobs[job.id] = record;
    preparedForSubmit = true;
  }
  if (options.regenerate === true && ['failed', 'rejected'].includes(record.status)) {
    record = archiveAndPrepare(record, sourceJobHash, keyframe, job, runtime.now);
    ledger.jobs[job.id] = record;
    preparedForSubmit = true;
  }
  if (preparedForSubmit) {
    await saveLedger(paths.stagingRoot, ledger);
    return submitOrPoll(job, record, prompt, keyframe, options, paths, runtime);
  }
  if (record.status === 'submitting') {
    record.status = 'ambiguous';
    record.error = 'Previous submit ended before a provider handle was recorded';
    return { id: job.id, status: 'ambiguous', error: record.error };
  }
  if (['failed', 'rejected', 'ambiguous', 'completed', 'awaiting-review'].includes(record.status)) return { id: job.id, status: record.status };
  if (record.status === 'provider-completed' || record.status === 'master-materialized' || record.status === 'encoding') return materializeVideo(job, record, paths, runtime);
  return submitOrPoll(job, record, prompt, keyframe, options, paths, runtime);
}

function prepareRecord(job, sourceJobHash, keyframe, now) {
  const attempt = 1;
  return {
    jobId: job.id, status: 'submitting', sourceJobHash, requestKey: hash(`albina-seedance-submit-v2:${sourceJobHash}:${attempt}`),
    sourceCgAssetId: job.sourceCgAssetId, sourceArtifactSha256: keyframe.sha256, promptVersion: job.promptVersion,
    activeAttempt: attempt, attempts: [{ attempt, status: 'submitting', startedAt: now().toISOString() }],
  };
}

function archiveAndPrepare(previous, sourceJobHash, keyframe, job, now) {
  if (['submitting', 'submitted', 'polling', 'provider-completed', 'master-materialized', 'encoding', 'ambiguous'].includes(previous.status)) throw new Error(`Cannot regenerate a live or uncertain video request: ${job.id}`);
  const attempt = previous.activeAttempt + 1;
  const record = prepareRecord(job, sourceJobHash, keyframe, now);
  record.activeAttempt = attempt;
  record.requestKey = hash(`albina-seedance-submit-v2:${sourceJobHash}:${attempt}`);
  record.attempts = [{ attempt, status: 'submitting', startedAt: now().toISOString() }];
  record.history = [...(previous.history ?? []), { ...previous, archivedAt: now().toISOString() }];
  return record;
}

function buildVideoPrompt(job, scene) {
  const context = typeof scene?.text === 'string' ? scene.text : job.sceneId;
  return [
    'Animate only the supplied approved static visual-novel CG keyframe for eight seconds.',
    'Preserve every character identity, face, costume, body structure, prosthetic, prop, composition, palette and spatial relationship exactly.',
    'Use restrained 2D motion, subtle parallax, breathing, eye movement and environmental motion already implied by the frame; do not redesign or add subjects.',
    'No text, logos, watermarks, dialogue subtitles, camera cuts, new objects, new characters, gore or style changes. Keep the final frame coherent with the first frame.',
    `Scene context (guidance only; do not render text): ${context}`,
  ].join('\n');
}

function buildSourceJobHash(job, prompt, keyframe) {
  return hash(stableStringify({ job, prompt, keyframeSha256: keyframe.sha256, sourceReceipt: keyframe.receipt }));
}

async function submitOrPoll(job, record, prompt, keyframe, options, paths, runtime) {
  if (record.status === 'submitted' || record.status === 'polling') {
    return pollVideoJob(job, record, options, paths, runtime);
  }
  const attempt = record.activeAttempt;
  const directory = attemptDirectory(paths.stagingRoot, job.id, attempt);
  await mkdir(directory, { recursive: true });
  try {
    const response = await runtime.client.submit({
      model: 'seedance-1.5-pro', prompt, durationSeconds: job.durationSeconds,
      image: keyframe.bytes, requestKey: record.requestKey,
    });
    const handle = normalizeHandle(response);
    record.handle = handle;
    record.status = 'submitted';
    record.submittedAt = runtime.now().toISOString();
    record.attempts = replaceAttempt(record.attempts, attempt, {
      status: 'submitted', submittedAt: record.submittedAt, handle,
    });
    await saveProviderResponse(paths.stagingRoot, job.id, attempt, 'submit', response, record);
    await persistRecord(paths.stagingRoot, runtime.ledger, record);
    if (response.sourceUrl) {
      record.status = 'provider-completed';
      record.sourceUrl = response.sourceUrl;
      return materializeVideo(job, record, paths, runtime);
    }
    return pollVideoJob(job, record, options, paths, runtime);
  } catch (error) {
    const ambiguous = !isDefinitiveProviderError(error);
    record.status = ambiguous ? 'ambiguous' : 'failed';
    record.error = publicError(error);
    record.attempts = replaceAttempt(record.attempts, attempt, {
      status: record.status, failedAt: runtime.now().toISOString(), error: record.error,
    });
    await saveProviderResponse(paths.stagingRoot, job.id, attempt, 'submit-error', error?.response, record);
    return { id: job.id, status: record.status, error: record.error };
  }
}

async function pollVideoJob(job, record, options, paths, runtime) {
  if (!record.handle) throw new Error(`Video ledger handle is missing: ${job.id}`);
  record.status = 'polling';
  const maxPolls = options.maxPolls ?? 60;
  for (let poll = 1; poll <= maxPolls; poll += 1) {
    if (poll > 1) await runtime.sleep(options.pollIntervalMs ?? 10_000);
    try {
      const response = await runtime.client.poll(record.handle);
      await saveProviderResponse(paths.stagingRoot, job.id, record.activeAttempt, `poll-${String(poll).padStart(3, '0')}`, response, record);
      const state = String(response.status ?? response.state ?? 'unknown').toLowerCase();
      if (completedProviderStates.has(state) || response.sourceUrl) {
        record.status = 'provider-completed';
        record.sourceUrl = requireHttpsUrl(response.sourceUrl, 'Seedance artifact URL');
        record.completedAt = runtime.now().toISOString();
        await persistRecord(paths.stagingRoot, runtime.ledger, record);
        return materializeVideo(job, record, paths, runtime);
      }
      if (failedProviderStates.has(state)) {
        record.status = 'failed';
        record.error = `Seedance provider state: ${state}`;
        return { id: job.id, status: 'failed', error: record.error };
      }
      record.attempts = replaceAttempt(record.attempts, record.activeAttempt, { status: 'polling', lastPollAt: runtime.now().toISOString(), providerStatus: state });
    } catch (error) {
      record.error = publicError(error);
      record.attempts = replaceAttempt(record.attempts, record.activeAttempt, { status: 'polling', lastPollAt: runtime.now().toISOString(), error: record.error });
    }
  }
  record.status = 'polling';
  return { id: job.id, status: 'polling', error: 'Poll limit reached; the existing provider handle remains resumable' };
}

async function materializeVideo(job, record, paths, runtime) {
  const attempt = record.activeAttempt;
  const directory = attemptDirectory(paths.stagingRoot, job.id, attempt);
  await mkdir(directory, { recursive: true });
  try {
    if (!record.masterPath || !hashPattern.test(record.masterSha256 ?? '')) {
      const sourceUrl = requireHttpsUrl(record.sourceUrl, 'Seedance artifact URL');
      const masterBytes = await runtime.client.download(sourceUrl);
      inspectMp4(masterBytes);
      const masterPath = resolve(directory, 'master.mp4');
      await atomicWrite(masterPath, masterBytes);
      const masterInfo = await runtime.probeVideo(masterPath);
      validateProbe(masterInfo, undefined, 'master');
      record.masterPath = stagePath(paths.stagingRoot, masterPath);
      record.masterSha256 = hash(masterBytes);
      record.masterInfo = masterInfo;
      record.status = 'master-materialized';
    }
    record.status = 'encoding';
    await encodeVariant(job, record, 'runtime', paths, runtime);
    await encodeVariant(job, record, 'desktop', paths, runtime);
    record.status = 'awaiting-review';
    record.readyAt = runtime.now().toISOString();
    return { id: job.id, status: 'awaiting-review' };
  } catch (error) {
    record.status = record.masterPath ? 'master-materialized' : 'provider-completed';
    record.error = publicError(error);
    return { id: job.id, status: 'processing-failed', error: record.error };
  }
}

async function encodeVariant(job, record, variant, paths, runtime) {
  const delivery = { ...job[variant], variant };
  const sourcePath = resolveStagePath(paths.stagingRoot, record.masterPath);
  const directory = attemptDirectory(paths.stagingRoot, job.id, record.activeAttempt);
  const targetPath = resolve(directory, `${variant}.mp4`);
  const previousPath = record[`${variant}Path`];
  if (previousPath && hashPattern.test(record[`${variant}Sha256`] ?? '')) {
    try {
      const previousBytes = await readFile(resolveStagePath(paths.stagingRoot, previousPath));
      if (hash(previousBytes) === record[`${variant}Sha256`]) return;
    } catch { /* Re-encode a missing or truncated delivery. */ }
  }
  await runtime.transcode({ sourcePath, targetPath, delivery });
  const bytes = await readFile(targetPath);
  inspectMp4(bytes);
  const info = await runtime.probeVideo(targetPath);
  validateProbe(info, delivery, variant);
  record[`${variant}Path`] = stagePath(paths.stagingRoot, targetPath);
  record[`${variant}Sha256`] = hash(bytes);
  record[`${variant}Info`] = info;
}

async function reviewVideoJob(job, inputs, ledger, options, paths, now) {
  const record = ledger.jobs[job.id];
  if (!record || record.status !== 'awaiting-review') throw new Error(`Video artifact is not awaiting review: ${job.id}`);
  const imageJob = inputs.plan.imageJobs.find((image) => image.assetId === job.sourceCgAssetId);
  const keyframe = await resolveApprovedKeyframe(job, imageJob, paths);
  const currentHash = buildSourceJobHash(job, buildVideoPrompt(job, inputs.story.scenes.find((scene) => scene.id === job.sceneId)), keyframe);
  if (record.sourceJobHash !== currentHash) throw new Error(`Video artifact does not match the current source contract: ${job.id}`);
  await verifyRecordFiles(record, paths, job);
  const reviewedAt = now().toISOString();
  const review = { status: options.decision, reviewer: options.reviewer.trim(), reviewedAt, ...(options.notes ? { notes: options.notes } : {}) };
  const path = resolveStagePath(paths.stagingRoot, `${safe(job.id)}/attempt-${String(record.activeAttempt).padStart(2, '0')}/review.json`);
  await atomicWrite(path, Buffer.from(`${JSON.stringify(review, null, 2)}\n`));
  record.review = review;
  record.reviewPath = stagePath(paths.stagingRoot, path);
  record.status = options.decision === 'approved' ? 'completed' : 'rejected';
  record.reviewedAt = reviewedAt;
  return { id: job.id, status: record.status };
}

async function promoteVideoJob(job, inputs, ledger, options, paths, writeAtomic) {
  const record = ledger.jobs[job.id];
  if (!record || record.status !== 'completed' || record.review?.status !== 'approved') throw new Error(`Video artifact is not approved for promotion: ${job.id}`);
  const imageJob = inputs.plan.imageJobs.find((image) => image.assetId === job.sourceCgAssetId);
  const keyframe = await resolveApprovedKeyframe(job, imageJob, paths);
  const currentHash = buildSourceJobHash(job, buildVideoPrompt(job, inputs.story.scenes.find((scene) => scene.id === job.sceneId)), keyframe);
  if (record.sourceJobHash !== currentHash) throw new Error(`Video artifact does not match the current source contract: ${job.id}`);
  await verifyRecordFiles(record, paths, job);
  const candidates = ['runtime', 'desktop'].map((variant) => ({
    jobId: job.id, receiptAssetId: job[variant].assetId, outputPath: job[variant].path,
    artifactSha256: record[`${variant}Sha256`], sourceCgAssetId: job.sourceCgAssetId,
    sourceArtifactSha256: keyframe.sha256, masterSha256: record.masterSha256,
    sourceJobHash: record.sourceJobHash, promptVersion: job.promptVersion, review: record.review,
    deliveryPath: resolveStagePath(paths.stagingRoot, record[`${variant}Path`]),
  }));
  const results = [];
  for (const candidate of candidates) results.push(await promoteVideoDelivery(candidate, options.rights, paths, writeAtomic));
  record.promotedAt = new Date().toISOString();
  return results;
}

async function promoteVideoDelivery(candidate, rights, paths, writeAtomic) {
  const variant = variantFromPath(candidate.outputPath);
  validateReceiptCandidate(candidate, variant);
  const receipt = buildVideoPromotionReceipt(candidate, variant, rights);
  const targetPath = resolveChild(paths.assetRoot, candidate.outputPath, 'video delivery');
  const receiptPath = resolveChild(paths.receiptRoot, `${safe(candidate.jobId)}.${variant}.json`, 'video promotion receipt');
  const bytes = await readFile(candidate.deliveryPath);
  if (hash(bytes) !== candidate.artifactSha256) throw new Error(`Video delivery hash mismatch: ${candidate.jobId}`);
  const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
  const existingReceipt = await readOptional(receiptPath);
  const existingTarget = await readOptional(targetPath);
  if (Boolean(existingReceipt) !== Boolean(existingTarget)) throw new Error(`Video promotion found a half-written target or receipt: ${candidate.jobId}`);
  if (existingReceipt) {
    let parsed;
    try { parsed = parsePromotionReceipt(JSON.parse(existingReceipt.toString('utf8'))); } catch (error) { throw new Error(`Video promotion receipt conflict: ${candidate.jobId}`, { cause: error }); }
    if (stableStringify(parsed) !== stableStringify(receipt) || !existingTarget || hash(existingTarget) !== candidate.artifactSha256) throw new Error(`Video promotion receipt conflict: ${candidate.jobId}`);
    return { id: candidate.jobId, status: 'skipped', assetId: candidate.receiptAssetId, variant: variantFromPath(candidate.outputPath) };
  }
  await mkdir(resolve(targetPath, '..'), { recursive: true });
  await mkdir(resolve(receiptPath, '..'), { recursive: true });
  try {
    await writeAtomic(targetPath, bytes);
    await writeAtomic(receiptPath, receiptBytes);
  } catch (error) {
    await rm(targetPath, { force: true });
    await rm(receiptPath, { force: true });
    throw error;
  }
  return { id: candidate.jobId, status: 'promoted', assetId: candidate.receiptAssetId, variant };
}

function validateReceiptCandidate(candidate, variant) {
  if (!candidate || !['runtime', 'desktop'].includes(variant) || typeof candidate.jobId !== 'string'
    || typeof candidate.receiptAssetId !== 'string' || !hashPattern.test(candidate.artifactSha256 ?? '')
    || !hashPattern.test(candidate.sourceArtifactSha256 ?? '') || !hashPattern.test(candidate.masterSha256 ?? '')
    || !hashPattern.test(candidate.sourceJobHash ?? '') || candidate.promptVersion !== 'albina-video-v2'
    || candidate.review?.status !== 'approved' || typeof candidate.review.reviewer !== 'string'
    || Number.isNaN(Date.parse(candidate.review.reviewedAt))) throw new Error(`Invalid video promotion candidate: ${candidate?.jobId ?? 'unknown'}`);
}

function normalizeRights(rights = {}) {
  if (!rights || typeof rights !== 'object' || Array.isArray(rights)) throw new Error('Video promotion rights options are invalid');
  if (rights.status === 'verified' || rights.redistribution === 'allowed' || rights.redistributionAllowed === true) throw new Error('Video model-output rights cannot be marked verified or allowed');
  if (rights.sourceUrl !== undefined) requireHttpsUrl(rights.sourceUrl, 'Video promotion rights sourceUrl');
  const rightsBasis = rights.rightsBasis ?? 'Redistribution rights for this Seedance model output have not been independently verified.';
  if (typeof rightsBasis !== 'string' || rightsBasis.trim().length === 0) throw new Error('Video promotion rights basis is invalid');
  return { rightsBasis: rightsBasis.trim(), ...(rights.sourceUrl ? { sourceUrl: rights.sourceUrl } : {}) };
}

async function verifyRecordFiles(record, paths, job) {
  if (!record.reviewPath && record.status === 'completed') throw new Error(`Video review evidence is missing: ${job.id}`);
  for (const variant of ['runtime', 'desktop']) {
    const path = resolveStagePath(paths.stagingRoot, record[`${variant}Path`]);
    const bytes = await readFile(path);
    if (hash(bytes) !== record[`${variant}Sha256`]) throw new Error(`Video ${variant} hash mismatch: ${job.id}`);
    if (basename(path) !== `${variant}.mp4`) throw new Error(`Video ${variant} path is not tied to the active attempt: ${job.id}`);
  }
  if (record.reviewPath) {
    const review = await readJson(resolveStagePath(paths.stagingRoot, record.reviewPath));
    if (stableStringify(review) !== stableStringify(record.review)) throw new Error(`Video review evidence mismatch: ${job.id}`);
  }
}

function variantFromPath(path) {
  return path.includes('/runtime/') ? 'runtime' : 'desktop';
}

function inspectMp4(bytes) {
  if (!bytes || bytes.length < 12 || bytes.subarray(4, 8).toString('ascii') !== 'ftyp') throw new Error('Seedance artifact is not a valid MP4');
}

function validateProbe(info, delivery, label) {
  if (!info || !Number.isFinite(info.width) || !Number.isFinite(info.height) || !Number.isFinite(info.fps) || !Number.isFinite(info.durationSeconds) || info.width <= 0 || info.height <= 0 || info.fps <= 0 || info.durationSeconds <= 0) throw new Error(`Invalid ${label} video probe`);
  if (delivery && (info.width !== delivery.width || info.height !== delivery.height || Math.abs(info.fps - delivery.fps) > 0.1)) throw new Error(`${label} video encode does not match the delivery contract`);
}

function normalizeHandle(response) {
  const id = response?.handle?.id ?? response?.id ?? response?.task_id ?? response?.data?.id;
  if (typeof id !== 'string' || !id.trim()) throw new Error('Invalid Seedance submit response: missing provider handle');
  return { provider: 'pie', model: 'seedance-1.5-pro', id, pollProtocol: 'pie-videos-v1', contractVersion: 1 };
}

function isDefinitiveProviderError(error) {
  return Number.isInteger(error?.status) && error.status < 500;
}

async function saveProviderResponse(stagingRoot, jobId, attempt, label, response, record) {
  const raw = response?.rawBytes ?? response?.bodyBytes;
  if (!(raw instanceof Uint8Array) && !Buffer.isBuffer(raw)) return;
  const path = resolve(attemptDirectory(stagingRoot, jobId, attempt), `${safe(label)}.raw`);
  await mkdir(resolve(path, '..'), { recursive: true });
  await atomicWrite(path, raw);
  record.lastResponsePath = stagePath(stagingRoot, path);
  record.lastResponseSha256 = hash(raw);
  if (Number.isInteger(response.status)) record.lastHttpStatus = response.status;
}

function replaceAttempt(attempts, number, value) {
  const previous = attempts.find((attempt) => attempt.attempt === number) ?? { attempt: number };
  return [...attempts.filter((attempt) => attempt.attempt !== number), { ...previous, ...value }].sort((left, right) => left.attempt - right.attempt);
}

async function readSourceReceipt(receiptRoot, imageJob, sourceAssetId) {
  const names = [
    `${safe(imageJob.id ?? `visual.image.${sourceAssetId}`)}.json`,
    `${safe(`visual.image.${sourceAssetId}`)}.json`,
    `${safe(sourceAssetId)}.json`,
  ];
  for (const name of [...new Set(names)]) {
    const path = resolve(receiptRoot, name);
    const value = await readOptional(path);
    if (value) return parsePromotionReceipt(JSON.parse(value.toString('utf8')));
  }
  throw new Error(`Approved static CG promotion receipt is missing: ${sourceAssetId}`);
}

function validateStaticCgReceipt(receipt, jobId) {
  if (!receipt.rights || !receipt.lineage || receipt.provenance.provider !== 'wisart-openai-compatible'
    || receipt.provenance.model !== 'gpt-image-2'
    || receipt.provenance.review.status !== 'approved' || receipt.rights.sourceType !== 'model-output') throw new Error(`Static CG receipt is not fully promoted: ${jobId}`);
}

async function loadLedger(stagingRoot) {
  const path = resolve(stagingRoot, 'ledger.json');
  try {
    return validateVideoLedger(await readJson(path));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    const entries = await readdir(stagingRoot, { withFileTypes: true }).catch((entryError) => entryError?.code === 'ENOENT' ? [] : Promise.reject(entryError));
    if (entries.some((entry) => entry.name !== 'ledger.lock' && !entry.name.startsWith('ledger.lock.stale-'))) throw new Error('Video ledger is missing while paid artifacts exist; refusing to initialize an empty ledger');
    return emptyLedger();
  }
}

function emptyLedger() {
  return { version: 2, projectId: 'albina-galgame-card', provider: 'pie', model: 'seedance-1.5-pro', jobs: {} };
}

function validateLedgerJob(id, record) {
  if (!record || typeof record !== 'object' || record.jobId !== id || !videoStatuses.has(record.status)
    || !hashPattern.test(record.sourceJobHash ?? '') || !hashPattern.test(record.requestKey ?? '')
    || !hashPattern.test(record.sourceArtifactSha256 ?? '') || !Number.isInteger(record.activeAttempt) || record.activeAttempt < 1
    || !Array.isArray(record.attempts) || record.attempts.length === 0) throw invalidLedger(id);
  const numbers = record.attempts.map((attempt) => {
    if (!attempt || !Number.isInteger(attempt.attempt) || attempt.attempt < 1 || !videoStatuses.has(attempt.status)) throw invalidLedger(id);
    return attempt.attempt;
  });
  if (new Set(numbers).size !== numbers.length || Math.max(...numbers) !== record.activeAttempt) throw invalidLedger(id);
  if (['submitted', 'polling', 'provider-completed', 'master-materialized', 'encoding', 'awaiting-review', 'completed', 'rejected'].includes(record.status) && !record.handle) throw invalidLedger(id);
  if (['master-materialized', 'encoding', 'awaiting-review', 'completed', 'rejected'].includes(record.status) && (!hashPattern.test(record.masterSha256 ?? '') || typeof record.masterPath !== 'string')) throw invalidLedger(id);
  if (['awaiting-review', 'completed', 'rejected'].includes(record.status) && (!hashPattern.test(record.runtimeSha256 ?? '') || !hashPattern.test(record.desktopSha256 ?? '') || typeof record.runtimePath !== 'string' || typeof record.desktopPath !== 'string')) throw invalidLedger(id);
  if (record.status === 'completed' && record.review?.status !== 'approved') throw invalidLedger(id);
}

function invalidLedger(id) {
  return new Error(`Invalid video production ledger job ${id}; refusing to risk a duplicate paid request`);
}

async function saveLedger(stagingRoot, ledger) {
  validateVideoLedger(ledger);
  await mkdir(stagingRoot, { recursive: true });
  ledger.updatedAt = new Date().toISOString();
  await atomicWrite(resolve(stagingRoot, 'ledger.json'), Buffer.from(`${JSON.stringify(ledger, null, 2)}\n`));
}

async function persistRecord(stagingRoot, ledger, record) {
  ledger.jobs[record.jobId] = record;
  await saveLedger(stagingRoot, ledger);
}

async function acquireLock(stagingRoot, recoverStaleLock) {
  await mkdir(stagingRoot, { recursive: true });
  const path = resolve(stagingRoot, 'ledger.lock');
  let handle;
  try {
    handle = await open(path, 'wx');
  } catch (error) {
    if (error?.code === 'EEXIST' && recoverStaleLock) {
      const value = JSON.parse(await readFile(path, 'utf8'));
      if (!Number.isInteger(value.pid) || processIsRunning(value.pid)) throw new Error('Video ledger lock belongs to a running or unknown process');
      await rename(path, `${path}.stale-${Date.now()}`);
      handle = await open(path, 'wx');
    } else if (error?.code === 'EEXIST') throw new Error('Video production ledger is locked; use recover-stale-lock only after verifying the process is gone');
    else throw error;
  }
  await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() })}\n`, 'utf8');
  return async () => { await handle.close(); await rm(path, { force: true }); };
}

function processIsRunning(pid) {
  try { process.kill(pid, 0); return true; } catch (error) { return error?.code !== 'ESRCH'; }
}

async function preflightMediaTools() {
  await exec(process.env.FFMPEG_PATH ?? 'ffmpeg', ['-version'], { windowsHide: true });
  await exec(process.env.FFPROBE_PATH ?? 'ffprobe', ['-version'], { windowsHide: true });
}

async function transcodeVideo({ sourcePath, targetPath, delivery }) {
  await mkdir(resolve(targetPath, '..'), { recursive: true });
  await exec(process.env.FFMPEG_PATH ?? 'ffmpeg', buildTranscodeArgs(sourcePath, targetPath, delivery), { windowsHide: true, maxBuffer: 4 * 1024 * 1024 });
}

async function probeVideoFile(path) {
  const { stdout } = await exec(process.env.FFPROBE_PATH ?? 'ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,r_frame_rate', '-show_entries', 'format=duration', '-of', 'json', path], { windowsHide: true, maxBuffer: 1024 * 1024 });
  const value = JSON.parse(stdout);
  const stream = value.streams?.[0];
  const [numerator, denominator] = String(stream?.r_frame_rate ?? '0/1').split('/').map(Number);
  return { width: Number(stream?.width), height: Number(stream?.height), fps: denominator ? numerator / denominator : 0, durationSeconds: Number(value.format?.duration) };
}

function createPieClient(environment, fetcher = fetch) {
  const baseUrl = normalizeApiBase(environment.PIE_BASE_URL ?? 'https://api.pie-xian.com');
  return {
    submit: (input) => pieSubmit(baseUrl, environment.PIE_API_KEY, fetcher, input),
    poll: (handle) => piePoll(baseUrl, environment.PIE_API_KEY, fetcher, handle),
    download: (url) => downloadArtifact(fetcher, url),
  };
}

async function pieSubmit(baseUrl, apiKey, fetcher, input) {
  const mime = detectImageMime(input.image);
  const body = { model: 'seedance-1.5-pro', prompt: input.prompt, seconds: String(input.durationSeconds), resolution_name: '1080p', images: [`data:${mime};base64,${Buffer.from(input.image).toString('base64')}`] };
  return pieRequest(fetcher, joinApiUrl(baseUrl, '/v1/videos'), apiKey, { method: 'POST', headers: { 'content-type': 'application/json; charset=utf-8', 'Idempotency-Key': input.requestKey }, body: JSON.stringify(body) });
}

async function piePoll(baseUrl, apiKey, fetcher, handle) {
  return pieRequest(fetcher, joinApiUrl(baseUrl, `/v1/videos/${encodeURIComponent(handle.id)}`), apiKey, { method: 'GET' });
}

async function pieRequest(fetcher, url, apiKey, init) {
  const headers = new Headers(init.headers);
  headers.set('authorization', `Bearer ${apiKey}`);
  let response;
  try { response = await fetcher(url, { ...init, headers }); } catch (error) { throw new Error(`Pie video request failed: ${error?.message ?? error}`); }
  const rawBytes = await readResponseLimited(response, 4 * 1024 * 1024);
  let body = {};
  try { body = rawBytes.length > 0 ? JSON.parse(Buffer.from(rawBytes).toString('utf8')) : {}; } catch { body = {}; }
  if (!response.ok) throw Object.assign(new Error(`Pie video request failed with HTTP ${response.status}`), { status: response.status, response: { status: response.status, rawBytes, body } });
  const id = body.id ?? body.task_id ?? body.data?.id;
  const sourceUrl = body.video_url ?? body.result?.video_url ?? body.metadata?.url ?? body.url;
  return { ...body, id, status: body.status ?? body.state ?? 'pending', sourceUrl: typeof sourceUrl === 'string' ? requireHttpsUrl(sourceUrl, 'Seedance artifact URL') : undefined, rawBytes, httpStatus: response.status };
}

async function downloadArtifact(fetcher, url) {
  const target = requireHttpsUrl(url, 'Seedance artifact URL');
  const response = await fetcher(target, { method: 'GET' });
  if (!response.ok) throw Object.assign(new Error(`Seedance artifact download failed with HTTP ${response.status}`), { status: response.status });
  return readResponseLimited(response, 512 * 1024 * 1024);
}

function detectImageMime(bytes) {
  if (bytes.length >= 8 && Buffer.from(bytes.subarray(0, 8)).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'image/png';
  if (bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return 'image/jpeg';
  throw new Error('Approved Seedance keyframe must be PNG or JPEG');
}

function normalizeApiBase(value) {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.search || url.hash) throw new Error('PIE_BASE_URL must be an absolute credential-free HTTPS URL');
  return `${url.origin}${url.pathname.replace(/\/+$/u, '')}`;
}

function joinApiUrl(base, path) {
  if (base.endsWith('/v1') && path.startsWith('/v1/')) return `${base}${path.slice(3)}`;
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}

function requireHttpsUrl(value, label) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`${label} must be an absolute HTTPS URL`); }
  if (url.protocol !== 'https:' || url.username || url.password || !isPublicHost(url.hostname)) throw new Error(`${label} must be a public credential-free HTTPS URL`);
  return url.href;
}

function isPublicHost(hostname) {
  const host = hostname.toLowerCase().replace(/^\[|\]$/gu, '').replace(/\.$/u, '');
  if (host === 'localhost' || host.endsWith('.local') || host.endsWith('.localhost') || host.endsWith('.home.arpa')) return false;
  if (isIP(host) === 4) {
    const [a, b, c] = host.split('.').map(Number);
    return a !== 0 && a !== 10 && a !== 127 && a < 224 && !(a === 172 && b >= 16 && b <= 31) && !(a === 192 && b === 168) && !(a === 169 && b === 254) && !(a === 100 && b >= 64 && b <= 127) && !(a === 198 && (b === 18 || b === 19)) && !(a === 203 && b === 0 && c === 113);
  }
  if (isIP(host) === 6) return !host.startsWith('fc') && !host.startsWith('fd') && host !== '::1' && !host.startsWith('fe80:');
  return true;
}

function resolveChild(root, child, label) {
  if (typeof child !== 'string' || !child || child.includes('\\') || child.includes(':') || child.startsWith('/')) throw new Error(`Invalid ${label} path`);
  const path = resolve(root, child);
  const local = relative(root, path).replaceAll('\\', '/');
  if (local !== child || local.startsWith('../') || local.includes('/../')) throw new Error(`Invalid ${label} path`);
  if (label === 'static CG asset' && !/^cg\/[a-z0-9._-]+\.(?:jpg|jpeg|png)$/iu.test(local)) throw new Error('Invalid static CG asset path');
  if (label === 'video delivery' && !/^video\/animated\/(?:runtime|desktop)\/[a-z0-9._-]+\.mp4$/iu.test(local)) throw new Error('Invalid video delivery path');
  if (label === 'video promotion receipt' && !/^[a-z0-9._-]+\.json$/iu.test(local)) throw new Error('Invalid video promotion receipt path');
  return path;
}

function attemptDirectory(stagingRoot, jobId, attempt) {
  if (!idPattern.test(jobId) || !Number.isInteger(attempt) || attempt < 1) throw new Error('Invalid staged video attempt');
  return resolve(stagingRoot, safe(jobId), `attempt-${String(attempt).padStart(2, '0')}`);
}

function stagePath(stagingRoot, path) {
  const local = relative(stagingRoot, path).replaceAll('\\', '/');
  if (!local || local.startsWith('../') || local.includes('/../')) throw new Error('Staged video path escaped its root');
  return local;
}

function resolveStagePath(stagingRoot, persistedPath) {
  if (typeof persistedPath !== 'string' || !persistedPath || persistedPath.includes('\\') || persistedPath.includes(':') || persistedPath.startsWith('/')) throw new Error('Invalid persisted video path');
  const path = resolve(stagingRoot, persistedPath);
  if (relative(stagingRoot, path).replaceAll('\\', '/') !== persistedPath) throw new Error('Persisted video path escaped its root');
  return path;
}

function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (value && typeof value === 'object') return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  return JSON.stringify(value);
}

function publicError(error) {
  return String(error?.message ?? error).replaceAll(/sk-[A-Za-z0-9_-]{20,}/gu, '[REDACTED]');
}

function safe(value) {
  return String(value).replaceAll(/[^a-z0-9._-]/giu, '-');
}

async function sleep(milliseconds) {
  await new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function readOptional(path) {
  try { return await readFile(path); } catch (error) { if (error?.code === 'ENOENT') return undefined; throw error; }
}

async function readResponseLimited(response, limit) {
  const length = Number(response.headers.get('content-length'));
  if (Number.isFinite(length) && length > limit) throw new Error('Provider response exceeds the configured size limit');
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (bytes.byteLength > limit) throw new Error('Provider response exceeds the configured size limit');
  return bytes;
}

async function atomicWrite(path, bytes) {
  await mkdir(resolve(path, '..'), { recursive: true });
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, path);
}
