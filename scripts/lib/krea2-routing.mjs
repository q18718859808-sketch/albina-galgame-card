/**
 * Krea2 candidate routing and production-profile selection.
 *
 * This module is deliberately side-effect free. It does not inspect ComfyUI,
 * install nodes, download weights, enqueue jobs, or promote media. The
 * community solution index is a catalog; a selected profile still needs a
 * route-specific receipt and a hash-bound original-resolution direct review.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '../..');
const defaultIndexPath = resolve(projectRoot, 'content/media-production/krea2-community-solution-index-v3.json');
const hashPattern = /^[a-f0-9]{64}$/u;
const decisions = new Set(['priority-pilot', 'staging-only', 'research-only', 'reject']);
const compatibility = new Set(['native', 'can-compose', 'replaces-chain', 'unknown', 'incompatible']);

export const KREA2_ROUTING_SCHEMA_VERSION = 1;

export const KREA2_REVIEW_GATE = Object.freeze({
  receiptRequired: true,
  directOriginalResolutionReviewRequired: true,
  automatedVisionAdvisoryOnly: true,
  promotionRequiresRightsReview: true,
  promotionAllowedByDefault: false,
});

const capabilityKeys = Object.freeze([
  'supportsTxt2Img', 'supportsImg2Img', 'supportsIdentityEdit',
  'supportsStructureControl', 'supportsStyleReference', 'supportsHighResolution',
  'supportsRegionalControl', 'supportsTextRendering',
]);

function clone(value) {
  return structuredClone(value);
}

function asBoolean(value) {
  return value === true;
}

function assertCandidateShape(candidate) {
  if (!candidate || typeof candidate !== 'object' || typeof candidate.id !== 'string' || !candidate.id.trim()) {
    throw new Error('Krea2 candidate must have a non-empty id');
  }
  if (!candidate.category || typeof candidate.category !== 'string') throw new Error(`Krea2 candidate ${candidate.id} has no category`);
  if (!decisions.has(candidate.decision)) throw new Error(`Krea2 candidate ${candidate.id} has an invalid decision`);
  if (!compatibility.has(candidate.sixLoraCompatibility)) throw new Error(`Krea2 candidate ${candidate.id} has invalid six-LoRA compatibility`);
  if (typeof candidate.evidenceStatus !== 'string' || !candidate.evidenceStatus.trim()) throw new Error(`Krea2 candidate ${candidate.id} has no evidence status`);
  return candidate;
}

function routeMode(candidate) {
  if (candidate.sixLoraCompatibility === 'replaces-chain') return 'alternate-chain';
  if (candidate.sixLoraCompatibility === 'can-compose') return 'composed-chain';
  if (candidate.sixLoraCompatibility === 'native') return 'native-chain';
  return 'unresolved-chain';
}

/** Convert an index candidate into the stable shape consumed by producers. */
export function candidateToProductionProfile(candidate) {
  assertCandidateShape(candidate);
  return {
    schemaVersion: KREA2_ROUTING_SCHEMA_VERSION,
    profileId: candidate.id,
    source: 'krea2-community-solution-index-v3',
    repository: candidate.repository ?? null,
    commit: candidate.latestStableCommit ?? null,
    category: candidate.category,
    routeMode: routeMode(candidate),
    decision: candidate.decision,
    evidenceStatus: candidate.evidenceStatus,
    license: candidate.license ?? null,
    localRuntimeStatus: candidate.localRuntimeStatus ?? 'unknown',
    capabilities: Object.fromEntries(capabilityKeys.map((key) => [key, asBoolean(candidate[key])])),
    sixLoraCompatibility: candidate.sixLoraCompatibility,
    requirements: {
      modelWeights: candidate.requiresModelWeights === true,
      customNodes: candidate.requiresCustomNodes === true,
      fixedCommit: candidate.latestStableCommit !== null && candidate.latestStableCommit !== undefined
        && candidate.latestStableCommit !== 'unverified',
      licenseEvidence: typeof candidate.licenseEvidence === 'string' && candidate.licenseEvidence.trim().length > 0,
    },
    qualityHypothesis: candidate.qualityHypothesis ?? null,
    failureRisks: Array.isArray(candidate.failureRisks) ? [...candidate.failureRisks] : [],
    gate: clone(KREA2_REVIEW_GATE),
    promotionAllowed: false,
  };
}

/**
 * Load and validate the versioned community catalog without touching runtime
 * state. This is intentionally explicit so callers cannot silently use a
 * stale or malformed candidate list.
 */
export async function loadKrea2SolutionIndex(indexPath = defaultIndexPath) {
  const index = JSON.parse((await readFile(indexPath, 'utf8')).replace(/^\uFEFF/u, ''));
  if (index?.schemaVersion !== 3 || index?.id !== 'krea2-community-solution-index-v3') {
    throw new Error('Unsupported Krea2 community solution index');
  }
  if (!/informational/iu.test(index.policy?.sixLora ?? '')) {
    throw new Error('Krea2 solution index must keep six-LoRA compatibility informational');
  }
  if (!Array.isArray(index.candidates) || index.candidates.length === 0) throw new Error('Krea2 solution index has no candidates');
  const seen = new Set();
  for (const candidate of index.candidates) {
    assertCandidateShape(candidate);
    if (seen.has(candidate.id)) throw new Error(`Duplicate Krea2 candidate id: ${candidate.id}`);
    seen.add(candidate.id);
  }
  return index;
}

/** Return all indexed candidates as stable production profiles. */
export function buildKrea2ProductionProfiles(index) {
  if (!index || !Array.isArray(index.candidates)) throw new Error('Krea2 solution index is required');
  return index.candidates.map(candidateToProductionProfile);
}

/**
 * Select an indexed route. Selection is policy-only: it never claims that the
 * route is installed or visually approved. `allowResearch` is useful for
 * planning and manifest generation, while generation callers should leave it
 * false and require a pilot-capable profile.
 */
export function selectKrea2ProductionProfile(index, profileId, options = {}) {
  if (typeof profileId !== 'string' || !profileId.trim()) throw new Error('Krea2 profileId is required');
  const candidate = index?.candidates?.find((item) => item.id === profileId);
  if (!candidate) throw new Error(`Krea2 profile is not present in the solution index: ${profileId}`);
  const profile = candidateToProductionProfile(candidate);
  if (profile.decision === 'reject') throw new Error(`Krea2 profile is rejected: ${profileId}`);
  if (profile.decision === 'research-only' && options.allowResearch !== true) {
    throw new Error(`Krea2 profile is research-only and cannot be selected for production: ${profileId}`);
  }
  if (options.requireLocal === true && !['installed', 'partially-installed'].includes(profile.localRuntimeStatus)) {
    throw new Error(`Krea2 profile is not locally available: ${profileId}`);
  }
  if (options.requireFixedCommit === true && !profile.requirements.fixedCommit) {
    throw new Error(`Krea2 profile has no fixed commit: ${profileId}`);
  }
  if (options.requireLicenseEvidence === true && !profile.requirements.licenseEvidence) {
    throw new Error(`Krea2 profile has no license evidence: ${profileId}`);
  }
  return profile;
}

/**
 * Bind a selected profile to a job receipt before execution or review.
 * Existing receipt fields remain untouched; this adds an auditable route
 * envelope and keeps promotion fail-closed for every route, including the
 * historical six-LoRA route.
 */
export function bindKrea2ProfileToReceipt(receipt, profile, options = {}) {
  if (!receipt || typeof receipt !== 'object') throw new Error('Krea2 receipt is required');
  if (!profile || profile.schemaVersion !== KREA2_ROUTING_SCHEMA_VERSION || !profile.profileId) {
    throw new Error('Krea2 production profile is invalid');
  }
  if (receipt.profile?.profileId && receipt.profile.profileId !== profile.profileId) {
    throw new Error('Krea2 receipt is already bound to another production profile');
  }
  const bound = {
    ...receipt,
    profile: {
      profileId: profile.profileId,
      source: profile.source,
      commit: profile.commit,
      routeMode: profile.routeMode,
      sixLoraCompatibility: profile.sixLoraCompatibility,
    },
    reviewGate: clone(KREA2_REVIEW_GATE),
    promotionAllowed: false,
  };
  if (options.invocationSha256 !== undefined) {
    if (!hashPattern.test(options.invocationSha256)) throw new Error('Krea2 invocationSha256 must be a SHA-256 hash');
    bound.profile.invocationSha256 = options.invocationSha256;
  }
  return bound;
}

function hasDirectReviewBinding(review, receipt) {
  return review?.status === 'approved'
    && review?.directOriginalResolution === true
    && review?.automatedVisionAdvisoryOnly === true
    && hashPattern.test(review.artifactSha256 ?? '')
    && review.artifactSha256 === receipt.output?.sha256
    && typeof review.reviewer === 'string'
    && review.reviewer.trim().length >= 3;
}

/**
 * Check the non-visual promotion envelope. This function does not read an
 * image and therefore cannot replace the operator's required direct reading.
 */
export function evaluateKrea2PromotionGate(receipt, review, options = {}) {
  const reasons = [];
  if (!receipt?.profile?.profileId) reasons.push('missing-profile-binding');
  if (!receipt?.reviewGate?.receiptRequired) reasons.push('receipt-gate-not-declared');
  if (!hashPattern.test(receipt?.output?.sha256 ?? '')) reasons.push('missing-output-sha256');
  if (!hasDirectReviewBinding(review, receipt)) reasons.push('missing-hash-bound-direct-original-resolution-review');
  if (options.rightsApproved !== true) reasons.push('rights-review-not-approved');
  if (options.visualGatePassed !== true) reasons.push('visual-style-effect-gate-not-passed');
  return Object.freeze({
    eligible: reasons.length === 0,
    promotionAllowed: reasons.length === 0,
    reasons,
  });
}

export function assertKrea2PromotionGate(receipt, review, options = {}) {
  const result = evaluateKrea2PromotionGate(receipt, review, options);
  if (!result.eligible) throw new Error(`Krea2 promotion gate failed: ${result.reasons.join(', ')}`);
  return true;
}

export { defaultIndexPath as KREA2_SOLUTION_INDEX_PATH };
