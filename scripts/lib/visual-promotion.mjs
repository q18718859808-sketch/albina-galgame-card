import { mkdir, readFile, rm } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

import { parsePromotionReceipt } from './promotion-receipts.mjs';
import { atomicWrite, currentVisualContractReview, hash, withVisualPromotionCandidates } from './visual-production.mjs';

const projectRoot = resolve(import.meta.dirname, '../..');
const defaultAssetRoot = resolve(projectRoot, 'dist/albina-galgame-card/assets');
const defaultReceiptRoot = resolve(projectRoot, 'content/media-receipts');
const hashPattern = /^[a-f0-9]{64}$/u;
const promptVersionPattern = /^[a-z0-9][a-z0-9._-]*$/iu;
const defaultRightsBasis = 'Redistribution rights for this model output have not been independently verified.';

export async function promoteVisualArtifacts(options, dependencies = {}) {
  validateOptions(options);
  const assetRoot = resolve(dependencies.assetRoot ?? defaultAssetRoot);
  const receiptRoot = resolve(dependencies.receiptRoot ?? defaultReceiptRoot);
  const withCandidates = dependencies.withCandidates ?? withVisualPromotionCandidates;
  const writeAtomic = dependencies.writeAtomic ?? atomicWrite;
  if (typeof writeAtomic !== 'function') throw new Error('Visual promotion atomic writer is invalid');
  return withCandidates({
    ids: options.ids,
    all: options.all === true,
    recoverStaleLock: options.recoverStaleLock === true,
    ...(options.planVariant === undefined ? {} : { planVariant: options.planVariant }),
    allowUnreviewedReferences: options.allowUnreviewedReferences === true,
  }, async (candidates) => {
    if (!Array.isArray(candidates)) throw new Error('Visual promotion loader returned invalid candidates');
    const results = [];
    for (const candidate of candidates) {
      results.push(await promoteOne(candidate, options.rights, assetRoot, receiptRoot, writeAtomic));
    }
    return results;
  });
}

export function buildVisualPromotionReceipt(candidate, rights) {
  validateCandidate(candidate);
  const normalizedRights = normalizeRights(rights);
  const inputs = (candidate.inputs ?? []).map((input) => {
    if (!input || typeof input !== 'object' || !hashPattern.test(input.sha256 ?? '')) {
      throw new Error(`Invalid visual promotion lineage input: ${candidate.jobId}`);
    }
    const hasGeneratedAsset = typeof input.receiptAssetId === 'string' && input.receiptAssetId.length > 0;
    return {
      ...(hasGeneratedAsset ? { assetId: input.receiptAssetId } : {}),
      sha256: input.sha256,
      role: hasGeneratedAsset ? 'approved-generated-reference' : 'canon-visual-reference',
    };
  });
  const receipt = {
    version: 1,
    assetId: candidate.receiptAssetId,
    artifactSha256: candidate.artifactSha256,
    provenance: {
      provider: candidate.provider,
      model: candidate.model,
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
      kind: inputs.length > 0 ? 'derivative' : 'original',
      processVersion: 'albina-visual-promotion-v1',
      inputs,
    },
  };
  return parsePromotionReceipt(receipt);
}

async function promoteOne(candidate, rights, assetRoot, receiptRoot, writeAtomic) {
  validateCandidate(candidate);
  const source = await readFile(candidate.deliveryPath);
  if (hash(source) !== candidate.artifactSha256) throw new Error(`Visual artifact hash mismatch: ${candidate.jobId}`);
  const targetPath = resolveChild(assetRoot, candidate.outputPath, 'visual delivery');
  const receiptPath = resolveChild(receiptRoot, `${safe(candidate.jobId)}.json`, 'visual promotion receipt');
  const receipt = buildVisualPromotionReceipt(candidate, rights);
  const receiptBytes = Buffer.from(`${JSON.stringify(receipt, null, 2)}\n`);
  const existingReceipt = await readOptional(receiptPath);
  const existingTarget = await readOptional(targetPath);
  if ((existingReceipt === undefined) !== (existingTarget === undefined)) {
    throw new Error(`Visual promotion partial state conflict: ${candidate.jobId}`);
  }
  if (existingReceipt) {
    let parsed;
    try {
      parsed = parsePromotionReceipt(JSON.parse(existingReceipt.toString('utf8')));
    } catch (error) {
      throw new Error(`Visual promotion receipt conflict: ${candidate.jobId}`, { cause: error });
    }
    if (JSON.stringify(parsed) !== JSON.stringify(receipt)
      || !existingTarget || hash(existingTarget) !== candidate.artifactSha256) {
      throw new Error(`Visual promotion receipt conflict: ${candidate.jobId}`);
    }
    return { id: candidate.jobId, status: 'skipped', assetId: candidate.receiptAssetId };
  }
  await mkdir(resolve(targetPath, '..'), { recursive: true });
  await mkdir(resolve(receiptPath, '..'), { recursive: true });
  let targetCreated = false;
  let receiptCreated = false;
  try {
    await writeAtomic(targetPath, source);
    targetCreated = true;
    await writeAtomic(receiptPath, receiptBytes);
    receiptCreated = true;
  } catch (error) {
    await removeCreatedFile(receiptPath, receiptCreated);
    await removeCreatedFile(targetPath, targetCreated);
    throw error;
  }
  return { id: candidate.jobId, status: 'promoted', assetId: candidate.receiptAssetId };
}

async function removeCreatedFile(path, created) {
  if (!created) return;
  try {
    await rm(path, { force: true });
  } catch {
    // Preserve the original promotion error; the next run will detect any leftover partial state.
  }
}

function validateOptions(options) {
  if (!options) throw new Error('Visual promotion options are required');
  normalizeRights(options.rights);
}

function normalizeRights(rights = {}) {
  if (!rights || typeof rights !== 'object' || Array.isArray(rights)) throw new Error('Visual promotion rights options are invalid');
  if (rights.status === 'verified' || rights.redistribution === 'allowed' || rights.redistributionAllowed === true) {
    throw new Error('Promotion cannot mark model-output rights as verified or allowed');
  }
  if (rights.sourceUrl !== undefined) {
    let url;
    try { url = new URL(rights.sourceUrl); } catch { throw new Error('Visual promotion rights sourceUrl must be HTTPS'); }
    if (url.protocol !== 'https:') throw new Error('Visual promotion rights sourceUrl must be HTTPS');
  }
  const rightsBasis = rights.rightsBasis === undefined ? defaultRightsBasis : rights.rightsBasis;
  if (typeof rightsBasis !== 'string' || rightsBasis.trim().length === 0) throw new Error('Visual promotion rights basis is invalid');
  return { rightsBasis: rightsBasis.trim(), ...(rights.sourceUrl ? { sourceUrl: rights.sourceUrl } : {}) };
}

function validateCandidate(candidate) {
  // 契约修订（reviewContractRevision）路径下 candidate.review 来自修订记录，
  // 与 generation-time review 一样必须携带可验证的 reviewer 与时间戳。
  const review = candidate.review ?? candidate.reviewContractRevision;
  if (!candidate || typeof candidate !== 'object' || candidate.status !== 'completed'
    || review?.status !== 'approved' || typeof review.reviewer !== 'string'
    || review.reviewer.trim().length === 0 || Number.isNaN(Date.parse(review.reviewedAt))) {
    throw new Error(`Visual artifact is not eligible for promotion: ${candidate?.jobId ?? 'unknown'}`);
  }
  const currentReview = currentVisualContractReview({
    sourceJobHash: candidate.sourceJobHash,
    artifactSha256: candidate.artifactSha256,
    review: candidate.review,
    reviewContractRevision: candidate.reviewContractRevision,
  }, candidate.currentSourceJobHash, candidate.currentReviewCriteria);
  if (!currentReview) {
    throw new Error(`Visual artifact does not match the current contract: ${candidate.jobId}`);
  }
  if (!hashPattern.test(candidate.artifactSha256 ?? '') || typeof candidate.deliveryPath !== 'string') {
    throw new Error(`Visual artifact hash/path is invalid: ${candidate.jobId}`);
  }
  if (typeof candidate.jobId !== 'string' || typeof candidate.receiptAssetId !== 'string'
    || typeof candidate.outputPath !== 'string' || !promptVersionPattern.test(candidate.promptVersion ?? '')
    || candidate.provider !== 'wisart-openai-compatible' || candidate.model !== 'gpt-image-2') {
    throw new Error(`Visual promotion provenance is invalid: ${candidate?.jobId ?? 'unknown'}`);
  }
}

function resolveChild(root, child, label) {
  if (typeof child !== 'string' || child.length === 0 || child.includes('\\') || child.includes(':') || child.startsWith('/')) {
    throw new Error(`Invalid ${label} path`);
  }
  const path = resolve(root, child);
  const local = relative(root, path).replaceAll('\\', '/');
  if (!local || local !== child || local.startsWith('../') || local.includes('/../')) throw new Error(`Invalid ${label} path`);
  if (label === 'visual delivery' && !/^(?:bg|cg|characters)\/[a-z0-9._-]+(?:\/[a-z0-9._-]+)*\.(?:jpg|jpeg|png)$/iu.test(local)) {
    throw new Error('Invalid visual delivery path');
  }
  if (label === 'visual promotion receipt' && !/^[a-z0-9._-]+\.json$/iu.test(local)) throw new Error('Invalid visual promotion receipt path');
  return path;
}

function safe(value) {
  return value.replaceAll(/[^a-z0-9._-]/giu, '-');
}

async function readOptional(path) {
  try { return await readFile(path); } catch (error) { if (error?.code === 'ENOENT') return undefined; throw error; }
}
