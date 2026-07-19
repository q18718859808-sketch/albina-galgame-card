import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, open, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const stagingRoot = resolve(projectRoot, 'staging/media/visual-v2');
const planPath = resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json');
const promptPath = resolve(projectRoot, 'content/media-production/visual-prompts-v2.json');
const canonVisualSourcePath = resolve(projectRoot, 'content/media-production/canon-visual-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const ledgerPath = resolve(stagingRoot, 'ledger.json');
const lockPath = resolve(stagingRoot, 'ledger.lock');
const defaultBaseUrl = 'https://x666.me/v1';
const hashPattern = /^[a-f0-9]{64}$/u;
const jobStatuses = new Set(['running', 'ambiguous', 'failed', 'provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed', 'rejected']);
export const pilotJobIds = [
  'visual.image.bg.backstreets_rain',
  'visual.image.portrait.albina.normal',
  'visual.image.portrait.protagonist.serious',
  'visual.image.portrait.albina.armored',
  'visual.image.cg.opening_rain',
];

export function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function inspectPng(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.length < 33 || buffer.subarray(0, 8).toString('hex') !== signature || buffer.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Image response is not a valid PNG');
  }
  const colorType = buffer[25];
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), colorType, alphaCapable: colorType === 4 || colorType === 6 };
}

export function selectImageJobs(plan, prompts, options = {}) {
  const promptByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
  const requested = new Set(options.ids ?? []);
  let jobs = plan.imageJobs;
  if (options.mode === 'pilot' && requested.size === 0) {
    pilotJobIds.forEach((id) => requested.add(id));
  }
  if (requested.size > 0) jobs = jobs.filter((job) => requested.has(job.id));
  const missing = [...requested].filter((id) => !jobs.some((job) => job.id === id));
  if (missing.length > 0) throw new Error(`Unknown image jobs: ${missing.join(', ')}`);
  return orderByDependencies(jobs.map((job) => {
    const prompt = promptByJob.get(job.id);
    return { job, prompt, finalPrompt: expandPrompt(job, prompt, prompts) };
  }));
}

function expandPrompt(job, prompt, prompts) {
  const style = prompts.styleBible ?? {};
  const rule = job.category === 'characters' ? style.portraitRules : job.category === 'bg' ? style.backgroundRules : style.cgRules;
  const sections = [style.rendering, style.continuity, style.canonAuBoundary, rule];
  if (job.category !== 'bg') sections.push(`角色设定圣经：${JSON.stringify(prompts.characterBible ?? {})}`);
  sections.push(`任务画面：${prompt.positivePrompt}`, `强制排除：${prompt.negativePrompt}`);
  if (job.category === 'characters') {
    sections.push('渠道兼容覆盖指令：忽略上文“透明背景”的生成方式，人物仍须完整；画布背景必须是单一、完全均匀的纯洋红色 #FF00FF，不得画棋盘格、阴影、地面、渐变或反光。该纯色只用于本地离线抠图，最终交付仍为真透明 PNG。');
  }
  return sections.filter(Boolean).join('\n\n');
}

function orderByDependencies(entries) {
  const remaining = new Map(entries.map((entry) => [entry.job.id, entry]));
  const ordered = [];
  while (remaining.size > 0) {
    const ready = [...remaining.values()].filter((entry) => entry.prompt.referenceJobIds.every((id) => !remaining.has(id)));
    if (ready.length === 0) throw new Error('Visual prompt references contain a cycle');
    ready.sort((left, right) => left.job.id.localeCompare(right.job.id));
    for (const entry of ready) { ordered.push(entry); remaining.delete(entry.job.id); }
  }
  return ordered;
}

export async function loadProductionInputs() {
  const [plan, prompts, canonVisualSources, canonClaims] = await Promise.all([
    readJson(planPath), readJson(promptPath), readJson(canonVisualSourcePath), readJson(canonClaimsPath),
  ]);
  validateInputs(plan, prompts, canonVisualSources, canonClaims);
  return { plan, prompts, canonVisualSources, canonClaims };
}

function validateInputs(plan, prompts, canonVisualSources, canonClaims) {
  if (plan.version !== 2 || plan.counts?.imageJobs !== 67 || plan.imageJobs?.length !== 67) throw new Error('Invalid visual rebuild plan');
  if (prompts.version !== 2 || prompts.promptVersion !== 'albina-visual-v2' || prompts.prompts?.length !== 67) throw new Error('Invalid visual prompt freeze');
  const planById = new Map(plan.imageJobs.map((job) => [job.id, job]));
  const planIds = new Set(planById.keys());
  const promptIds = new Set(prompts.prompts.map((prompt) => prompt.jobId));
  if (planIds.size !== 67 || promptIds.size !== 67 || [...planIds].some((id) => !promptIds.has(id))) throw new Error('Visual prompt coverage mismatch');
  const candidate = plan.policy?.verifiedCandidate;
  const authorizedHash = hash(JSON.stringify({ promptFreeze: prompts, imageJobs: plan.imageJobs, canonVisualSources, canonClaims }));
  if (plan.policy?.requiredImageProvider !== 'x666-openai-compatible' || candidate?.authorizedForProduction !== true
    || candidate?.generationVerified !== true || candidate?.upstreamPieVerified !== false
    || candidate?.authorization?.authorizedContentSha256 !== authorizedHash
    || plan.policy?.canonClaimsSha256 !== hash(JSON.stringify(canonClaims))) {
    throw new Error('Visual production authorization is missing or does not match the frozen content');
  }
  for (const job of plan.imageJobs) validatePlanJob(job);
  const sourceById = validateCanonVisualSources(canonVisualSources);
  const claimById = validateCanonClaims(canonClaims);
  for (const prompt of prompts.prompts) validatePrompt(prompt, planById, sourceById, claimById);
  for (const prompt of prompts.prompts) validatePlanPromptBinding(planById.get(prompt.jobId), prompt);
}

function validatePlanJob(job) {
  if (job.provider !== 'x666-openai-compatible' || job.model !== 'gpt-image-2' || job.upstreamPieVerified !== false) {
    throw new Error(`Invalid image provider contract for ${job.id}`);
  }
  if (!['1536x1024', '1024x1536'].includes(job.generationSize) || typeof job.receiptAssetId !== 'string' || job.status !== 'authorized-prompt-frozen') {
    throw new Error(`Invalid image delivery contract for ${job.id}`);
  }
}

function validatePlanPromptBinding(job, prompt) {
  if (job.inputMode !== prompt.mode || JSON.stringify(job.referenceJobIds) !== JSON.stringify(prompt.referenceJobIds)
    || JSON.stringify(job.referenceSourceIds ?? []) !== JSON.stringify(prompt.referenceSourceIds ?? [])
    || JSON.stringify(job.canonClaimIds ?? []) !== JSON.stringify(prompt.canonClaimIds ?? [])) {
    throw new Error(`Visual plan and prompt freeze disagree for ${job.id}`);
  }
}

function validatePrompt(prompt, planById, sourceById, claimById) {
  const planJob = planById.get(prompt.jobId);
  const sourceIds = prompt.referenceSourceIds ?? [];
  const claimIds = prompt.canonClaimIds ?? [];
  if (!['text-generation', 'reference-edit'].includes(prompt.mode) || !Array.isArray(prompt.referenceJobIds) || !Array.isArray(sourceIds)) throw new Error(`Invalid prompt mode for ${prompt.jobId}`);
  if (typeof prompt.positivePrompt !== 'string' || prompt.positivePrompt.length < 40 || typeof prompt.negativePrompt !== 'string') throw new Error(`Incomplete prompt for ${prompt.jobId}`);
  if (!planJob || prompt.assetId !== planJob.assetId || !Array.isArray(prompt.reviewCriteria) || prompt.reviewCriteria.length === 0) throw new Error(`Prompt identity mismatch for ${prompt.jobId}`);
  if (prompt.referenceJobIds.some((id) => !planById.has(id) || id === prompt.jobId)) throw new Error(`Invalid prompt reference for ${prompt.jobId}`);
  if (sourceIds.some((id) => !sourceById.has(id)) || new Set(sourceIds).size !== sourceIds.length) throw new Error(`Invalid canon visual source reference for ${prompt.jobId}`);
  if (!Array.isArray(claimIds) || claimIds.some((id) => !claimById.has(id)) || new Set(claimIds).size !== claimIds.length) throw new Error(`Invalid canon claim reference for ${prompt.jobId}`);
  if ((prompt.mode === 'reference-edit') !== (prompt.referenceJobIds.length + sourceIds.length > 0)) throw new Error(`Prompt reference mode mismatch for ${prompt.jobId}`);
}

function validateCanonClaims(ledger) {
  if (ledger?.version !== 1 || !Array.isArray(ledger.claims)) throw new Error('Invalid canon claim ledger');
  const claimById = new Map();
  for (const claim of ledger.claims) {
    if (typeof claim?.id !== 'string' || claimById.has(claim.id) || typeof claim.statement !== 'string' || claim.statement.length === 0) throw new Error('Invalid canon claim ledger entry');
    claimById.set(claim.id, claim);
  }
  return claimById;
}

function validateCanonVisualSources(index) {
  if (index?.version !== 1 || !Array.isArray(index.assets)) throw new Error('Invalid canon visual source index');
  const sourceById = new Map();
  for (const source of index.assets) {
    if (typeof source?.id !== 'string' || sourceById.has(source.id) || typeof source.localPath !== 'string'
      || !hashPattern.test(source.sha256 ?? '') || source.usage !== 'production-reference-only' || source.redistribution !== 'forbidden') {
      throw new Error('Invalid canon visual source record');
    }
    sourceById.set(source.id, source);
  }
  return sourceById;
}

export async function runVisualBatch(options, environment = process.env) {
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const { plan, prompts, canonVisualSources } = await loadProductionInputs();
    const allEntries = selectImageJobs(plan, prompts, { mode: 'all' });
    const entryById = new Map(allEntries.map((entry) => [entry.job.id, entry]));
    const selected = selectImageJobs(plan, prompts, options);
    const ledger = await loadLedger();
    if (selected.some(({ job }) => !pilotJobIds.includes(job.id)) && !await pilotGatePassed(ledger, entryById, canonVisualSources)) {
      throw new Error('Full production is locked until all five pilot jobs have approved visual reviews');
    }
    await preflightLocalMediaTools();
    const config = providerConfig(environment);
    const results = [];
    for (const entry of selected) {
      if (results.length > 0 && options.intervalMs > 0) await delay(options.intervalMs);
      const result = await runJob(entry, ledger, config, options, entryById, canonVisualSources);
      results.push(result);
      if (result.status === 'ambiguous' || result.stopBatch) break;
    }
    return summarize(results);
  } finally {
    await releaseLock();
  }
}

export async function reviewVisualArtifacts(options) {
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    if (!Array.isArray(options.ids) || options.ids.length === 0 || !['approved', 'rejected'].includes(options.decision)) throw new Error('A review decision and explicit job ids are required');
    if (typeof options.reviewer !== 'string' || options.reviewer.trim().length < 3) throw new Error('A named visual reviewer is required');
    const [{ plan, prompts, canonVisualSources }, ledger] = await Promise.all([loadProductionInputs(), loadLedger()]);
    const entries = selectImageJobs(plan, prompts, { mode: 'all' });
    const entryById = new Map(entries.map((entry) => [entry.job.id, entry]));
    const reviewed = [];
    for (const id of options.ids) reviewed.push(await reviewOne(ledger, id, options, entryById, canonVisualSources));
    await saveLedger(ledger);
    return reviewed;
  } finally {
    await releaseLock();
  }
}

export async function withVisualPromotionCandidates(options, action) {
  if (typeof action !== 'function') throw new Error('A visual promotion action is required');
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const [{ plan, prompts, canonVisualSources }, ledger] = await Promise.all([loadProductionInputs(), loadLedger()]);
    const entries = selectImageJobs(plan, prompts, { mode: 'all' });
    const entryById = new Map(entries.map((entry) => [entry.job.id, entry]));
    const ids = promotionIds(options, ledger);
    const candidates = [];
    for (const id of ids) {
      const entry = entryById.get(id);
      const record = ledger.jobs[id];
      if (!entry || !record) throw new Error(`Unknown visual production job: ${id}`);
      if (record.status !== 'completed' || record.review?.status !== 'approved') {
        throw new Error(`Visual artifact is not eligible for promotion: ${id}`);
      }
      const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]));
      const currentSourceJobHash = jobHash(entry, references);
      if (record.sourceJobHash !== currentSourceJobHash) throw new Error(`Visual artifact does not match the current contract: ${id}`);
      const deliveryPath = resolvePersistedJobPath(id, record.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u);
      if (basename(deliveryPath) !== `delivery-${String(record.activeAttempt).padStart(2, '0')}.${entry.job.delivery.format}`) {
        throw new Error(`Visual artifact does not match the active attempt: ${id}`);
      }
      const artifactSha256 = hash(await readFile(deliveryPath));
      if (artifactSha256 !== record.artifactSha256) throw new Error(`Visual artifact hash mismatch: ${id}`);
      await verifyRecordedReview(record, id);
      candidates.push({
        jobId: id,
        receiptAssetId: entry.job.receiptAssetId,
        outputPath: entry.job.path,
        provider: entry.job.provider,
        model: entry.job.model,
        upstreamPieVerified: false,
        promptVersion: entry.job.promptVersion,
        status: record.status,
        sourceJobHash: record.sourceJobHash,
        currentSourceJobHash,
        artifactSha256,
        deliveryPath,
        review: record.review,
        inputs: references.map(({ jobId, sha256, receiptAssetId, sourceId }) => ({
          jobId, sha256,
          ...(receiptAssetId ? { receiptAssetId } : {}),
          ...(sourceId ? { sourceId } : {}),
        })),
      });
    }
    return await action(candidates);
  } finally {
    await releaseLock();
  }
}

function promotionIds(options, ledger) {
  const explicit = options.ids ?? [];
  if (!Array.isArray(explicit) || explicit.some((id) => typeof id !== 'string' || id.length === 0)) {
    throw new Error('Visual promotion job ids are invalid');
  }
  if (options.all === true && explicit.length > 0) throw new Error('Choose either --all or explicit visual promotion ids');
  if (options.all !== true && explicit.length === 0) throw new Error('Visual promotion requires --all or explicit job ids');
  if (new Set(explicit).size !== explicit.length) throw new Error('Visual promotion job ids must be unique');
  if (options.all === true) {
    return Object.entries(ledger.jobs)
      .filter(([, record]) => record.status === 'completed' && record.review?.status === 'approved')
      .map(([id]) => id)
      .sort();
  }
  return [...explicit].sort();
}

async function verifyRecordedReview(record, id) {
  if (typeof record.reviewPath !== 'string') throw new Error(`Visual review evidence is missing: ${id}`);
  const reviewPath = resolvePersistedJobPath(id, record.reviewPath, /^review-\d+\.json$/u);
  if (basename(reviewPath) !== `review-${String(record.activeAttempt).padStart(2, '0')}.json`) {
    throw new Error(`Visual review does not match the active attempt: ${id}`);
  }
  const review = await readJson(reviewPath);
  if (JSON.stringify(review) !== JSON.stringify(record.review)) throw new Error(`Visual review evidence mismatch: ${id}`);
}

async function reviewOne(ledger, id, options, entryById, canonVisualSources) {
  const record = ledger.jobs[id];
  const entry = entryById.get(id);
  if (!record) throw new Error(`Unknown visual production job: ${id}`);
  if (!entry) throw new Error(`Visual job is absent from the current frozen plan: ${id}`);
  if (options.decision === 'approved') {
    const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]));
    if (record.sourceJobHash !== jobHash(entry, references)) throw new Error(`Visual artifact contract is stale: ${id}`);
  }
  if (options.decision === 'approved' && (record.status !== 'awaiting-review' || !await validRecordedArtifact(record, id))) {
    throw new Error(`Visual artifact is not eligible for approval: ${id}`);
  }
  if (options.decision === 'rejected' && !['awaiting-review', 'needs-review'].includes(record.status)) throw new Error(`Visual artifact is not reviewable: ${id}`);
  const review = {
    status: options.decision, reviewer: options.reviewer.trim(), reviewedAt: new Date().toISOString(),
    criteria: (record.reviewCriteria ?? []).map((criterion) => ({ criterion, status: options.decision === 'approved' ? 'passed' : 'failed' })),
    ...(options.notes ? { notes: options.notes } : {}),
  };
  const reviewPath = resolve(stagingRoot, safe(id), `review-${String(record.activeAttempt).padStart(2, '0')}.json`);
  await atomicWrite(reviewPath, Buffer.from(`${JSON.stringify(review, null, 2)}\n`));
  ledger.jobs[id] = {
    ...record, status: options.decision === 'approved' ? 'completed' : 'rejected', review,
    reviewPath: relative(projectRoot, reviewPath).replaceAll('\\', '/'),
  };
  return { id, status: review.status };
}

export function isUsableX666ApiKey(value) {
  return typeof value === 'string' && /^sk-[a-z0-9_-]{20,}$/iu.test(value);
}

function providerConfig(environment) {
  const configuredApiKey = environment.X666_API_KEY;
  const apiKey = isUsableX666ApiKey(configuredApiKey) ? configuredApiKey : undefined;
  const baseUrl = (environment.X666_BASE_URL || defaultBaseUrl).replace(/\/$/u, '');
  if (baseUrl !== defaultBaseUrl) throw new Error(`X666_BASE_URL must equal ${defaultBaseUrl}`);
  return { apiKey, invalidApiKey: Boolean(configuredApiKey) && !apiKey, baseUrl, timeoutMs: 300_000 };
}

async function pilotGatePassed(ledger, entryById, canonVisualSources) {
  const checks = await Promise.all(pilotJobIds.map(async (id) => {
    const record = ledger.jobs[id];
    const entry = entryById.get(id);
    if (!entry || record?.status !== 'completed' || record.review?.status !== 'approved' || !await validRecordedArtifact(record, id)) return false;
    try {
      const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]));
      return record.sourceJobHash === jobHash(entry, references);
    } catch { return false; }
  }));
  return checks.every(Boolean);
}

async function runJob(entry, ledger, config, options, entryById, canonVisualSources) {
  let referenceInputs;
  try {
    referenceInputs = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([entry.job.id]));
  } catch (error) {
    return { id: entry.job.id, status: 'blocked', error: publicError(error) };
  }
  const sourceJobHash = jobHash(entry, referenceInputs);
  const previous = ledger.jobs[entry.job.id];
  if (['running', 'ambiguous'].includes(previous?.status)) {
    return { id: entry.job.id, status: 'ambiguous', error: 'Previous paid request has an uncertain outcome; automatic resubmission is disabled' };
  }
  const sameContract = previous?.sourceJobHash === sourceJobHash;
  if (previous && !sameContract && !options.regenerate) {
    return { id: entry.job.id, status: 'contract-changed', error: 'Generation contract changed; explicit --regenerate with this job id is required', stopBatch: true };
  }
  if (!options.regenerate && sameContract && previous?.status === 'completed' && previous.review?.status === 'approved' && await validRecordedArtifact(previous, entry.job.id)) {
    return { id: entry.job.id, status: 'skipped', artifactSha256: previous.artifactSha256 };
  }
  if (!options.regenerate && sameContract && previous?.status === 'awaiting-review' && await validRecordedArtifact(previous, entry.job.id)) {
    return { id: entry.job.id, status: 'awaiting-review', artifactSha256: previous.artifactSha256 };
  }
  if (!options.regenerate && sameContract && canResumeProcessing(previous)) {
    return resumeProcessing(entry, ledger, previous, referenceInputs, options);
  }
  if (!options.regenerate && sameContract && previous?.status === 'needs-review') {
    return { id: entry.job.id, status: 'needs-review', error: previous.error ?? 'Generated artifact requires review', stopBatch: options.mode === 'pilot' };
  }
  if (!options.regenerate && sameContract && previous?.status === 'rejected') {
    return { id: entry.job.id, status: 'needs-review', error: 'Artifact was rejected; explicit --regenerate with this job id is required', stopBatch: options.mode === 'pilot' };
  }
  if (!config.apiKey) return {
    id: entry.job.id,
    status: 'failed',
    error: config.invalidApiKey ? 'X666_API_KEY is not a usable sk- credential' : 'X666_API_KEY is required for a new paid request',
    stopBatch: true,
  };
  if (!options.regenerate && sameContract && previous?.status === 'failed') {
    return { id: entry.job.id, status: 'failed', error: previous.error ?? 'Previous request failed; explicit --regenerate is required', stopBatch: true };
  }
  const attempt = maximumAttempt(previous?.attempts) + 1;
  const requestKey = hash(JSON.stringify({ sourceJobHash, attempt, regeneration: options.regenerate === true }));
  const jobDirectory = resolve(stagingRoot, safe(entry.job.id));
  await mkdir(jobDirectory, { recursive: true });
  setLedgerJob(ledger, entry, sourceJobHash, requestKey, attempt, 'running');
  await saveLedger(ledger);
  let responseReceived = false;
  try {
    const response = await requestImage(entry, referenceInputs, config, requestKey);
    responseReceived = true;
    const rawRecord = await saveRawResponse(jobDirectory, attempt, response);
    recordProviderCompletion(ledger, entry.job.id, attempt, response, rawRecord);
    await saveLedger(ledger);
    return processRecordedResponse(entry, ledger, response, rawRecord, referenceInputs, options);
  } catch (error) {
    const rawRecord = error instanceof ProviderError ? await saveRawResponse(jobDirectory, attempt, error.response) : undefined;
    const ambiguous = responseReceived || isAmbiguousRequestError(error);
    failLedgerJob(ledger, entry.job.id, attempt, error, ambiguous, rawRecord);
    await saveLedger(ledger);
    return { id: entry.job.id, status: ambiguous ? 'ambiguous' : 'failed', error: publicError(error), stopBatch: true };
  }
}

async function resolveReferenceInputs(prompt, ledger, entryById, canonVisualSources, ancestors = new Set()) {
  const sourceById = new Map(canonVisualSources.assets.map((source) => [source.id, source]));
  const sourceInputs = await Promise.all((prompt.referenceSourceIds ?? []).map(async (sourceId) => {
    const source = sourceById.get(sourceId);
    if (!source || source.reviewStatus !== 'source-identified') throw new Error(`Canon visual source is not approved for production reference: ${sourceId}`);
    const path = resolveCanonVisualSourcePath(source.localPath);
    const bytes = await readFile(path);
    if (hash(bytes) !== source.sha256 || bytes.length !== source.bytes) throw new Error(`Canon visual source hash mismatch: ${sourceId}`);
    if (bytes.length > 4 * 1024 * 1024) throw new Error(`Canon visual source exceeds the verified 4 MiB edit limit: ${sourceId}`);
    return { jobId: sourceId, path, bytes, sha256: source.sha256, sourceId };
  }));
  const jobInputs = await Promise.all(prompt.referenceJobIds.map(async (jobId) => {
    const reference = ledger.jobs[jobId];
    const parentEntry = entryById.get(jobId);
    if (!parentEntry || ancestors.has(jobId)) throw new Error(`Reference job is absent or cyclic: ${jobId}`);
    if (reference?.status !== 'completed' || reference.review?.status !== 'approved' || !hashPattern.test(reference.artifactSha256 ?? '')) throw new Error(`Reference job is not approved: ${jobId}`);
    const path = resolvePersistedJobPath(jobId, reference.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u);
    const bytes = await readFile(path);
    if (hash(bytes) !== reference.artifactSha256) throw new Error(`Reference artifact hash mismatch: ${jobId}`);
    if (bytes.length > 4 * 1024 * 1024) throw new Error(`Reference artifact exceeds the verified 4 MiB edit limit: ${jobId}`);
    const parentAncestors = new Set(ancestors); parentAncestors.add(jobId);
    const parentInputs = await resolveReferenceInputs(parentEntry.prompt, ledger, entryById, canonVisualSources, parentAncestors);
    if (reference.sourceJobHash !== jobHash(parentEntry, parentInputs)) throw new Error(`Reference job contract is stale: ${jobId}`);
    return { jobId, path, bytes, sha256: reference.artifactSha256, receiptAssetId: reference.receiptAssetId };
  }));
  return [...sourceInputs, ...jobInputs];
}

async function validRecordedArtifact(record, jobId = record?.jobId) {
  if (!record.deliveryPath || !hashPattern.test(record.artifactSha256 ?? '')) return false;
  try { return hash(await readFile(resolvePersistedJobPath(jobId, record.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u))) === record.artifactSha256; } catch { return false; }
}

function canResumeProcessing(record) {
  return typeof record?.rawResponsePath === 'string' && hashPattern.test(record.responseSha256 ?? '')
    && ['provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed'].includes(record.status);
}

async function resumeProcessing(entry, ledger, record, references, options) {
  try {
    const response = await loadRecordedResponse(record);
    const rawRecord = { rawResponsePath: record.rawResponsePath, responseSha256: record.responseSha256, responseMetaPath: record.responseMetaPath };
    return processRecordedResponse(entry, ledger, response, rawRecord, references, options);
  } catch (error) {
    markProcessingFailure(ledger, entry.job.id, error);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'needs-review', error: publicError(error), stopBatch: true };
  }
}

async function processRecordedResponse(entry, ledger, response, rawRecord, references, options) {
  const jobDirectory = resolve(stagingRoot, safe(entry.job.id));
  try {
    const source = await loadOrMaterializeSource(response.body, jobDirectory, ledger.jobs[entry.job.id]);
    recordSourceMaterialized(ledger, entry.job.id, source);
    await saveLedger(ledger);
    const artifact = await prepareDelivery(entry.job, source, jobDirectory, ledger.jobs[entry.job.id].activeAttempt);
    recordArtifactReady(ledger, entry, ledger.jobs[entry.job.id].sourceJobHash, response, rawRecord, artifact, references);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'awaiting-review', artifactSha256: artifact.sha256 };
  } catch (error) {
    markProcessingFailure(ledger, entry.job.id, error);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'needs-review', error: publicError(error), stopBatch: true };
  }
}

function jobHash(entry, references) {
  const contract = {
    id: entry.job.id, assetId: entry.job.assetId, receiptAssetId: entry.job.receiptAssetId, path: entry.job.path,
    provider: entry.job.provider, model: entry.job.model,
    upstreamPieVerified: false, promptVersion: 'albina-visual-v2', mode: entry.prompt.mode,
    finalPrompt: entry.finalPrompt, reviewCriteria: entry.prompt.reviewCriteria,
    canonClaimIds: entry.prompt.canonClaimIds ?? [],
    sceneIds: entry.job.sceneIds, sourceTextHashes: entry.job.sourceTextHashes,
    generationSize: entry.job.generationSize, delivery: entry.job.delivery,
    inputs: references.map(({ jobId, sha256 }) => ({ jobId, sha256 })),
  };
  return hash(JSON.stringify(contract));
}

async function requestImage(entry, references, config, idempotencyKey) {
  const endpoint = references.length > 0 ? '/images/edits' : '/images/generations';
  let request;
  try { request = references.length > 0 ? await editRequest(entry, references) : generationRequest(entry); }
  catch (error) { throw new RequestPhaseError('preflight', error); }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    let response;
    try {
      response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'POST', headers: { Authorization: `Bearer ${config.apiKey}`, 'Idempotency-Key': idempotencyKey, ...request.headers },
        body: request.body, signal: controller.signal,
      });
    } catch (error) { throw new RequestPhaseError('submitting', error); }
    let rawBytes;
    try { rawBytes = await readResponseLimited(response, 48 * 1024 * 1024); }
    catch (error) { throw new RequestPhaseError('response-received', error); }
    const body = parseResponseBody(rawBytes.toString('utf8'));
    const metadata = {
      status: response.status, requestId: response.headers.get('x-oneapi-request-id'), endpoint,
      contentType: response.headers.get('content-type'), rawBytes, body,
    };
    if (!response.ok) throw new ProviderError(response.status, metadata);
    return metadata;
  } finally {
    clearTimeout(timeout);
  }
}

async function readResponseLimited(response, maximumBytes) {
  const declared = Number(response.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maximumBytes) throw new Error(`Provider response exceeds ${maximumBytes} bytes`);
  if (!response.body) return Buffer.alloc(0);
  const reader = response.body.getReader();
  const chunks = []; let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) { await reader.cancel(); throw new Error(`Provider response exceeds ${maximumBytes} bytes`); }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks, total);
}

function generationRequest(entry) {
  const payload = commonRequestFields(entry);
  return { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
}

async function editRequest(entry, references) {
  const form = new FormData();
  for (const [key, value] of Object.entries(commonRequestFields(entry))) form.append(key, String(value));
  for (const reference of references) {
    const extension = reference.path.toLowerCase().endsWith('.jpg') || reference.path.toLowerCase().endsWith('.jpeg') ? 'jpg' : 'png';
    form.append('image[]', new Blob([reference.bytes], { type: mimeFor(reference.path) }), `${safe(reference.jobId)}.${extension}`);
  }
  return { headers: {}, body: form };
}

function commonRequestFields(entry) {
  return {
    model: 'gpt-image-2', prompt: entry.finalPrompt, n: 1, size: entry.job.generationSize,
    quality: 'high', output_format: 'png', response_format: 'b64_json',
  };
}

function parseResponseBody(text) {
  try { return JSON.parse(text); } catch { return { unparsedText: text }; }
}

async function saveRawResponse(directory, attempt, response) {
  const stem = `response-${String(attempt).padStart(2, '0')}`;
  const rawPath = resolve(directory, `${stem}.raw`);
  const metaPath = resolve(directory, `${stem}.meta.json`);
  const responseSha256 = hash(response.rawBytes);
  await atomicWrite(rawPath, response.rawBytes);
  const metadata = {
    status: response.status, requestId: response.requestId, endpoint: response.endpoint,
    contentType: response.contentType, responseSha256,
    rawResponsePath: relative(projectRoot, rawPath).replaceAll('\\', '/'),
  };
  await atomicWrite(metaPath, Buffer.from(`${JSON.stringify(metadata, null, 2)}\n`));
  return { ...metadata, responseMetaPath: relative(projectRoot, metaPath).replaceAll('\\', '/') };
}

async function loadRecordedResponse(record) {
  const rawBytes = await readFile(resolvePersistedJobPath(record.jobId, record.rawResponsePath, /^response-\d+\.raw$/u));
  if (hash(rawBytes) !== record.responseSha256) throw new Error('Stored provider response hash mismatch');
  return {
    status: record.httpStatus, requestId: record.requestId, endpoint: record.endpoint,
    contentType: record.responseContentType, rawBytes, body: parseResponseBody(rawBytes.toString('utf8')),
  };
}

async function materializeSource(body, directory, attempt) {
  const candidate = body?.data?.[0] ?? body?.output?.[0] ?? body;
  if (!candidate?.b64_json) throw new Error('Provider did not honor response_format=b64_json; URL downloads are disabled');
  const bytes = Buffer.from(candidate.b64_json, 'base64');
  inspectPng(bytes);
  const path = resolve(directory, `source-${String(attempt).padStart(2, '0')}.png`);
  await atomicWrite(path, bytes);
  return { path, bytes, sha256: hash(bytes) };
}

async function loadOrMaterializeSource(body, directory, record) {
  if (record.sourcePath && hashPattern.test(record.sourceSha256 ?? '')) {
    try {
      const path = resolvePersistedJobPath(record.jobId, record.sourcePath, /^source-\d+\.png$/u);
      const bytes = await readFile(path);
      if (hash(bytes) === record.sourceSha256) return { path, bytes, sha256: record.sourceSha256 };
    } catch {}
  }
  return materializeSource(body, directory, record.activeAttempt);
}

async function prepareDelivery(job, source, directory, attempt) {
  const sourceInfo = inspectPng(source.bytes);
  const expected = dimensions(job.generationSize);
  if (sourceInfo.width !== expected.width || sourceInfo.height !== expected.height) throw new Error(`Unexpected source dimensions ${sourceInfo.width}x${sourceInfo.height}`);
  const pixels = await inspectPixels(source.path);
  if (!pixels.nonBlank) throw new Error('Generated image is visually blank');
  const deliveryPath = resolve(directory, `delivery-${String(attempt).padStart(2, '0')}.${job.delivery.format}`);
  if (job.category === 'characters') await preparePortrait(job, source.path, deliveryPath, sourceInfo, pixels);
  else await prepareLandscape(job, source.path, deliveryPath);
  const bytes = await readFile(deliveryPath);
  const stream = await probeImage(deliveryPath);
  const deliveryPixels = await inspectPixels(deliveryPath);
  if (stream.width !== job.delivery.width || stream.height !== job.delivery.height) throw new Error('Delivery dimensions do not match plan');
  if (job.category === 'characters' && !deliveryPixels.hasTransparency) throw new Error('Portrait post-processing did not produce a usable transparent channel');
  if (job.category === 'characters' && deliveryPixels.borderTransparencyRatio < 0.85) throw new Error('Portrait post-processing did not clear the canvas boundary');
  if (job.category === 'characters' && deliveryPixels.opaqueKeyRatio > 0.01) throw new Error('Portrait post-processing left an opaque chroma-key background');
  return { path: deliveryPath, sha256: hash(bytes), bytes: bytes.length, sourceInfo, deliveryInfo: stream, pixels: { source: pixels, delivery: deliveryPixels } };
}

export async function preparePortrait(job, sourcePath, deliveryPath, sourceInfo, pixels) {
  if (sourceInfo.width !== job.delivery.width || sourceInfo.height !== job.delivery.height) throw new Error('Portrait delivery requires exact source dimensions');
  if (sourceInfo.alphaCapable && pixels.hasTransparency && pixels.borderTransparencyRatio >= 0.85 && pixels.opaqueKeyRatio <= 0.01) {
    await atomicWrite(deliveryPath, await readFile(sourcePath));
    return;
  }
  await runFile(ffmpegPath(), [
    '-v', 'error', '-y', '-i', sourcePath, '-vf', 'colorkey=0xFF00FF:0.035:0.02,format=rgba',
    '-frames:v', '1', deliveryPath,
  ], mediaToolOptions());
}

async function prepareLandscape(job, sourcePath, deliveryPath) {
  const filter = `scale=${job.delivery.width}:${job.delivery.height}:force_original_aspect_ratio=increase,crop=${job.delivery.width}:${job.delivery.height}`;
  await runFile(ffmpegPath(), ['-v', 'error', '-y', '-i', sourcePath, '-vf', filter, '-frames:v', '1', '-q:v', '2', deliveryPath], mediaToolOptions());
}

async function probeImage(path) {
  const { stdout } = await runFile(ffprobePath(), ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,pix_fmt', '-of', 'json', path], mediaToolOptions());
  const stream = JSON.parse(stdout).streams?.[0];
  if (!stream) throw new Error('Unable to probe generated image');
  return stream;
}

async function preflightLocalMediaTools() {
  await Promise.all([
    runFile(ffmpegPath(), ['-version'], mediaToolOptions({ timeout: 15_000 })),
    runFile(ffprobePath(), ['-version'], mediaToolOptions({ timeout: 15_000 })),
  ]);
}

async function inspectPixels(path) {
  const { stdout } = await runFile(ffmpegPath(), ['-v', 'error', '-i', path, '-vf', 'scale=32:32,format=rgba', '-frames:v', '1', '-f', 'rawvideo', '-'], mediaToolOptions({ encoding: 'buffer', maxBuffer: 32 * 32 * 4 + 1024 }));
  const pixels = Buffer.from(stdout);
  let minAlpha = 255; let maxAlpha = 0; let minRgb = 255; let maxRgb = 0; let transparent = 0; let opaqueKey = 0; let borderTransparent = 0; let borderPixels = 0;
  for (let index = 0; index + 3 < pixels.length; index += 4) {
    const pixelIndex = index / 4; const x = pixelIndex % 32; const y = Math.floor(pixelIndex / 32);
    const red = pixels[index]; const green = pixels[index + 1]; const blue = pixels[index + 2]; const alpha = pixels[index + 3];
    const border = x === 0 || x === 31 || y === 0 || y === 31;
    minRgb = Math.min(minRgb, red, green, blue);
    maxRgb = Math.max(maxRgb, red, green, blue);
    minAlpha = Math.min(minAlpha, alpha); maxAlpha = Math.max(maxAlpha, alpha);
    if (alpha < 16) transparent += 1;
    if (alpha > 200 && red >= 230 && green <= 30 && blue >= 230) opaqueKey += 1;
    if (border) { borderPixels += 1; if (alpha < 16) borderTransparent += 1; }
  }
  const total = pixels.length / 4;
  return {
    nonBlank: maxAlpha > 0 && maxRgb - minRgb > 4,
    hasTransparency: transparent / total >= 0.01 && maxAlpha > 200,
    transparentRatio: transparent / total,
    borderTransparencyRatio: borderPixels ? borderTransparent / borderPixels : 0,
    opaqueKeyRatio: opaqueKey / total,
    minAlpha, maxAlpha, minRgb, maxRgb,
  };
}

function recordArtifactReady(ledger, entry, sourceJobHash, response, rawRecord, artifact, references) {
  const previous = ledger.jobs[entry.job.id];
  ledger.jobs[entry.job.id] = {
    ...previous, ...rawRecord, status: 'awaiting-review', sourceJobHash, receiptAssetId: entry.job.receiptAssetId,
    ...(entry.job.portraitAssetId ? { portraitAssetId: entry.job.portraitAssetId } : {}),
    artifactSha256: artifact.sha256, artifactBytes: artifact.bytes,
    deliveryPath: relative(projectRoot, artifact.path).replaceAll('\\', '/'),
    requestId: response.requestId, upstreamPieVerified: false,
    reviewCriteria: entry.prompt.reviewCriteria,
    inputs: references.map(({ jobId, sha256, receiptAssetId }) => ({ jobId, sha256, receiptAssetId })),
    validation: { source: artifact.sourceInfo, delivery: artifact.deliveryInfo, pixels: artifact.pixels },
    attempts: replaceAttempt(previous.attempts, previous.activeAttempt, { attempt: previous.activeAttempt, status: 'awaiting-review', httpStatus: response.status, artifactReadyAt: new Date().toISOString() }),
  };
}

function setLedgerJob(ledger, entry, sourceJobHash, requestKey, attempt, status) {
  const previous = ledger.jobs[entry.job.id];
  const attempts = previous?.attempts;
  const history = previous ? [...(previous.history ?? []), historySnapshot(previous)] : [];
  ledger.jobs[entry.job.id] = {
    jobId: entry.job.id, status, sourceJobHash, requestKey, receiptAssetId: entry.job.receiptAssetId, activeAttempt: attempt,
    ...(history.length > 0 ? { history } : {}),
    attempts: replaceAttempt(attempts, attempt, { attempt, status, startedAt: new Date().toISOString() }),
  };
}

function historySnapshot(record) {
  const { history: _history, ...snapshot } = record;
  return { archivedAt: new Date().toISOString(), ...snapshot };
}

function recordProviderCompletion(ledger, jobId, attempt, response, rawRecord) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, ...rawRecord, status: 'provider-completed', httpStatus: response.status,
    requestId: response.requestId, endpoint: response.endpoint, responseContentType: response.contentType,
    attempts: replaceAttempt(previous.attempts, attempt, { attempt, status: 'provider-completed', httpStatus: response.status, responseReceivedAt: new Date().toISOString() }),
  };
}

function recordSourceMaterialized(ledger, jobId, source) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, status: 'source-materialized', sourcePath: relative(projectRoot, source.path).replaceAll('\\', '/'), sourceSha256: source.sha256,
  };
}

function markProcessingFailure(ledger, jobId, error) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, status: 'needs-review', error: publicError(error),
    attempts: replaceAttempt(previous.attempts, previous.activeAttempt, {
      attempt: previous.activeAttempt, status: 'needs-review', failedAt: new Date().toISOString(), error: publicError(error),
    }),
  };
}

function failLedgerJob(ledger, jobId, attempt, error, ambiguous, rawRecord) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, ...rawRecord, status: ambiguous ? 'ambiguous' : 'failed', error: publicError(error),
    attempts: replaceAttempt(previous.attempts, attempt, { attempt, status: ambiguous ? 'ambiguous' : 'failed', failedAt: new Date().toISOString(), error: publicError(error) }),
  };
}

function replaceAttempt(attempts = [], number, value) {
  const previous = attempts.find((attempt) => attempt.attempt === number) ?? {};
  return [...attempts.filter((attempt) => attempt.attempt !== number), { ...previous, ...value }].sort((left, right) => left.attempt - right.attempt);
}

async function loadLedger() {
  try {
    return validateLedger(await readJson(ledgerPath));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    await assertNoOrphanedPaidHistory();
    return emptyLedger();
  }
}

export function validateLedger(value) {
  if (value?.version !== 2 || value.projectId !== 'albina-galgame-card'
    || value.provider !== 'x666-openai-compatible' || value.model !== 'gpt-image-2' || value.upstreamPieVerified !== false
    || !value.jobs || typeof value.jobs !== 'object' || Array.isArray(value.jobs)) {
    throw new Error('Invalid visual production ledger; refusing to forget paid request history');
  }
  for (const [jobId, record] of Object.entries(value.jobs)) validateLedgerJob(jobId, record);
  return value;
}

function validateLedgerJob(jobId, record) {
  if (!record || typeof record !== 'object' || Array.isArray(record) || record.jobId !== jobId
    || !jobStatuses.has(record.status) || !hashPattern.test(record.sourceJobHash ?? '') || !hashPattern.test(record.requestKey ?? '')
    || typeof record.receiptAssetId !== 'string' || !Number.isInteger(record.activeAttempt) || record.activeAttempt < 1
    || !Array.isArray(record.attempts) || record.attempts.length === 0) throw invalidLedgerJob(jobId);
  const attemptNumbers = record.attempts.map((attempt) => {
    if (!attempt || typeof attempt !== 'object' || !Number.isInteger(attempt.attempt) || attempt.attempt < 1 || !jobStatuses.has(attempt.status)) throw invalidLedgerJob(jobId);
    return attempt.attempt;
  });
  if (new Set(attemptNumbers).size !== attemptNumbers.length || Math.max(...attemptNumbers) !== record.activeAttempt) throw invalidLedgerJob(jobId);
  if (['provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed', 'rejected'].includes(record.status)
    && (!hashPattern.test(record.responseSha256 ?? '') || typeof record.rawResponsePath !== 'string')) throw invalidLedgerJob(jobId);
  if (['awaiting-review', 'completed'].includes(record.status)
    && (!hashPattern.test(record.artifactSha256 ?? '') || typeof record.deliveryPath !== 'string')) throw invalidLedgerJob(jobId);
  if (record.status === 'completed' && record.review?.status !== 'approved') throw invalidLedgerJob(jobId);
}

function invalidLedgerJob(jobId) {
  return new Error(`Invalid visual production ledger job ${jobId}; refusing to risk a duplicate paid request`);
}

function maximumAttempt(attempts = []) {
  return attempts.reduce((maximum, attempt) => Math.max(maximum, attempt.attempt), 0);
}

async function assertNoOrphanedPaidHistory() {
  const entries = await readdir(stagingRoot, { withFileTypes: true }).catch((error) => error?.code === 'ENOENT' ? [] : Promise.reject(error));
  const artifacts = entries.filter((entry) => entry.name !== 'ledger.lock' && !entry.name.startsWith('ledger.lock.stale-'));
  const receiptRoot = resolve(projectRoot, 'content/media-receipts');
  const receipts = await readdir(receiptRoot).catch((error) => error?.code === 'ENOENT' ? [] : Promise.reject(error));
  if (artifacts.length > 0 || receipts.some((name) => name.startsWith('visual.image.'))) {
    throw new Error('Visual production ledger is missing while paid artifacts or receipts exist; refusing to initialize an empty ledger');
  }
}

function emptyLedger() {
  return { version: 2, projectId: 'albina-galgame-card', provider: 'x666-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false, jobs: {} };
}

async function saveLedger(ledger) {
  await mkdir(stagingRoot, { recursive: true });
  ledger.updatedAt = new Date().toISOString();
  await atomicWrite(ledgerPath, Buffer.from(`${JSON.stringify(ledger, null, 2)}\n`));
}

function summarize(results) {
  const summary = {
    total: results.length, completed: 0, skipped: 0, failed: 0, ambiguous: 0,
    needsReview: 0, awaitingReview: 0, blocked: 0, contractChanged: 0, results,
  };
  for (const result of results) {
    if (result.status === 'needs-review') summary.needsReview += 1;
    else if (result.status === 'awaiting-review') summary.awaitingReview += 1;
    else if (result.status === 'contract-changed') summary.contractChanged += 1;
    else summary[result.status] += 1;
  }
  return summary;
}

function isAmbiguousRequestError(error) {
  if (error instanceof ProviderError) return isAmbiguousProviderResponse(error.status, error.response?.body);
  return error instanceof RequestPhaseError && error.phase !== 'preflight';
}

export function isAmbiguousProviderResponse(status, body) {
  if (status < 500) return false;
  return body?.error?.code !== 'model_not_found';
}

async function acquireLedgerLock(recoverStaleLock = false) {
  await mkdir(stagingRoot, { recursive: true });
  let handle;
  try {
    handle = await open(lockPath, 'wx');
  } catch (error) {
    if (error?.code === 'EEXIST' && recoverStaleLock) {
      await archiveStaleLock();
      handle = await open(lockPath, 'wx');
    } else if (error?.code === 'EEXIST') {
      throw new Error(`Visual production ledger is locked: ${relative(projectRoot, lockPath)}; use --recover-stale-lock only after verifying its process is gone`);
    }
    if (!handle) throw error;
  }
  await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString() })}\n`, 'utf8');
  return async () => {
    await handle.close();
    await rm(lockPath, { force: true });
  };
}

async function archiveStaleLock() {
  const value = JSON.parse(await readFile(lockPath, 'utf8'));
  if (!Number.isInteger(value.pid) || processIsRunning(value.pid)) throw new Error('Visual production lock belongs to a running or unknown process');
  await rename(lockPath, `${lockPath}.stale-${Date.now()}`);
}

function processIsRunning(pid) {
  try { process.kill(pid, 0); return true; } catch (error) { return error?.code !== 'ESRCH'; }
}

export async function atomicWrite(path, bytes) {
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, path);
}

function publicError(error) {
  if (error instanceof ProviderError) return `Provider HTTP ${error.status}`;
  if (error instanceof RequestPhaseError) return `Request ${error.phase} failed: ${publicError(error.cause)}`;
  if (error?.name === 'AbortError') return 'Provider request timed out; result is uncertain';
  return String(error?.message ?? error).replaceAll(/sk-[a-z0-9_-]{20,}/giu, '[REDACTED]');
}

function dimensions(value) {
  const [width, height] = value.split('x').map(Number);
  return { width, height };
}

function safe(value) {
  return value.replaceAll(/[^a-z0-9._-]/giu, '-');
}

function resolvePersistedJobPath(jobId, persistedPath, filePattern) {
  if (typeof jobId !== 'string' || typeof persistedPath !== 'string' || persistedPath.includes('\\') || persistedPath.includes(':') || persistedPath.startsWith('/')) {
    throw new Error('Invalid persisted visual production path');
  }
  const jobRoot = resolve(stagingRoot, safe(jobId));
  const path = resolve(projectRoot, persistedPath);
  const local = relative(jobRoot, path).replaceAll('\\', '/');
  if (!local || local.includes('/') || !filePattern.test(local)) throw new Error('Persisted visual production path escaped its job directory');
  return path;
}

function resolveCanonVisualSourcePath(localPath) {
  if (typeof localPath !== 'string' || localPath.includes('\\') || localPath.includes(':') || localPath.startsWith('/')) throw new Error('Invalid canon visual source path');
  const root = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets');
  const path = resolve(projectRoot, localPath);
  const local = relative(root, path).replaceAll('\\', '/');
  if (!local || local.includes('/') || !/\.(?:jpg|jpeg|png)$/iu.test(local)) throw new Error('Canon visual source escaped the research asset directory');
  return path;
}

function mimeFor(path) {
  return path.toLowerCase().endsWith('.jpg') ? 'image/jpeg' : 'image/png';
}

function ffmpegPath() {
  return process.env.FFMPEG_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffmpeg.exe';
}

function ffprobePath() {
  return process.env.FFPROBE_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffprobe.exe';
}

function mediaToolOptions(overrides = {}) {
  const environment = { ...process.env };
  for (const name of ['X666_API_KEY', 'OPENAI_API_KEY', 'PIE_API_KEY', 'CLOSEAPI_API_KEY']) delete environment[name];
  return { env: environment, ...overrides };
}

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

class ProviderError extends Error {
  constructor(status, response) {
    super(`Provider HTTP ${status}`);
    this.status = status;
    this.response = response;
  }
}

class RequestPhaseError extends Error {
  constructor(phase, cause) {
    super(`Request ${phase} failed`, { cause });
    this.phase = phase;
    this.cause = cause;
  }
}
