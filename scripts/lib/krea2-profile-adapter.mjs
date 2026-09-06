/**
 * Executable Krea2 profile adapter contract.
 *
 * Catalog metadata is not a workflow. Only profiles explicitly registered in
 * the contract may dispatch a builder; every other candidate fails closed with
 * its classification instead of falling back to the historical baseline.
 */
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  buildKrea2ImageEditWorkflow,
  buildKrea2Workflow,
  buildKrea2CommunityStyleTransferWorkflow,
  buildKrea2CommunityDypeWorkflow,
  buildKrea2CommunityTwoStageWorkflow,
} from './krea2-comfyui.mjs';
import { buildAlbinaReferenceStyleWorkflow, buildCanonicalControlRepairWorkflow } from './krea2-restyle.mjs';
import {
  candidateToProductionProfile,
  loadKrea2SolutionIndex,
} from './krea2-routing.mjs';

const projectRoot = resolve(import.meta.dirname, '../..');
const contractPath = resolve(projectRoot, 'content/media-production/krea2-profile-adapter-contract-v1.json');
const classificationValues = new Set(['implemented', 'nodes-required', 'research-only']);

const BUILDERS = Object.freeze({
  'native-baseline': (baseline, options) => buildKrea2Workflow(baseline, options),
  'grounded-image-edit': (baseline, options) => buildKrea2ImageEditWorkflow(baseline, options),
  'grounded-edit-detail-pass': (baseline, options) => buildKrea2ImageEditWorkflow(baseline, options),
  'community-style-transfer': (baseline, options) => buildKrea2CommunityStyleTransferWorkflow(baseline, options),
  'community-dype-raw': (baseline, options) => buildKrea2CommunityDypeWorkflow(baseline, options),
  'community-two-stage-raw-turbo': (baseline, options) => buildKrea2CommunityTwoStageWorkflow(baseline, options),
  'canonical-control-repair': (baseline, options) => buildCanonicalControlRepairWorkflow(baseline, options),
  'reference-style-role-separated': (baseline, options) => buildAlbinaReferenceStyleWorkflow(baseline, options),
  'embedded-png-baseline': (baseline, options) => buildKrea2Workflow(baseline, options),
  'embedded-canonical-control': (baseline, options) => buildCanonicalControlRepairWorkflow(baseline, options),
});

async function readContract(path = contractPath) {
  const contract = JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
  if (contract?.schemaVersion !== 1 || contract?.id !== 'krea2-profile-adapter-contract-v1') {
    throw new Error('Unsupported Krea2 profile adapter contract');
  }
  return contract;
}

function candidateClassification(candidate, explicitProfile) {
  if (explicitProfile?.implementationStatus) return explicitProfile.implementationStatus;
  if (candidate.decision === 'research-only' || candidate.decision === 'reject') return 'research-only';
  if (candidate.requiresCustomNodes === true
    && ['installed', 'partially-installed'].includes(candidate.localRuntimeStatus)) {
    return 'nodes-required';
  }
  if (candidate.requiresCustomNodes === true
    && !['installed', 'partially-installed'].includes(candidate.localRuntimeStatus)) {
    return 'nodes-required';
  }
  return 'research-only';
}

function assertProfileContract(profile, candidate, contract) {
  if (!profile || typeof profile !== 'object') throw new Error('Krea2 profile adapter entry is missing');
  if (!classificationValues.has(profile.implementationStatus)) {
    throw new Error(`Invalid Krea2 adapter classification for ${candidate?.id ?? 'project profile'}`);
  }
  if (profile.implementationStatus === 'implemented') {
    if (typeof profile.builderId !== 'string' || typeof BUILDERS[profile.builderId] !== 'function') {
      throw new Error(`Krea2 implemented profile has no registered builder: ${candidate?.id ?? 'unknown'}`);
    }
    if (typeof profile.dispatch !== 'string' || !profile.dispatch.trim()) {
      throw new Error(`Krea2 implemented profile has no dispatch name: ${candidate?.id ?? 'unknown'}`);
    }
  }
  if (profile.routeMode === 'alternate-chain' && contract.dispatchPolicy.alternateProfileMayReuseBaseline === true) {
    throw new Error('Krea2 contract permits an alternate profile to reuse the baseline');
  }
}

/** Load both sources and ensure every indexed candidate has an explicit outcome. */
export async function loadKrea2ProfileAdapterContract(options = {}) {
  const [contract, index] = await Promise.all([
    readContract(options.contractPath),
    loadKrea2SolutionIndex(options.indexPath),
  ]);
  const explicit = contract.profiles ?? {};
  const profiles = index.candidates.map((candidate) => {
    const entry = explicit[candidate.id] ?? {
      kind: 'candidate',
      implementationStatus: candidateClassification(candidate, null),
      builderId: null,
      dispatch: null,
      routeMode: candidateToProductionProfile(candidate).routeMode,
    };
    assertProfileContract(entry, candidate, contract);
    return {
      ...candidateToProductionProfile(candidate),
      implementationStatus: entry.implementationStatus,
      builderId: entry.builderId ?? null,
      dispatch: entry.dispatch ?? null,
      adapterKind: entry.kind ?? 'candidate',
    };
  });
  for (const [profileId, entry] of Object.entries(explicit)) {
    if (!entry || entry.kind !== 'project-profile') continue;
    assertProfileContract(entry, null, contract);
    if (profiles.some((profile) => profile.profileId === profileId)) {
      throw new Error(`Project adapter profile collides with catalog candidate: ${profileId}`);
    }
    profiles.push({
      schemaVersion: 1,
      profileId,
      source: 'krea2-profile-adapter-contract-v1',
      routeMode: entry.routeMode,
      implementationStatus: entry.implementationStatus,
      builderId: entry.builderId,
      dispatch: entry.dispatch,
      adapterKind: entry.kind,
      promotionAllowed: false,
    });
  }
  return { contract, index, profiles };
}

export function getKrea2ProfileAdapter(adapter, profileId) {
  const profile = adapter?.profiles?.find((item) => item.profileId === profileId);
  if (!profile) throw new Error(`Krea2 profile is not registered: ${profileId}`);
  return profile;
}

/**
 * Dispatch a profile-specific graph. This function only builds a graph; it
 * never starts ComfyUI, uploads files, queues a prompt, or promotes output.
 */
export function buildKrea2ProfileWorkflow(adapter, profileId, baseline, options = {}) {
  const profile = getKrea2ProfileAdapter(adapter, profileId);
  if (profile.implementationStatus !== 'implemented') {
    throw new Error(`Krea2 profile ${profileId} is ${profile.implementationStatus}; no executable builder is registered`);
  }
  const builder = BUILDERS[profile.builderId];
  if (typeof builder !== 'function') throw new Error(`Krea2 builder is unavailable: ${profile.builderId}`);
  if (profile.routeMode === 'alternate-chain' && profile.builderId === 'native-baseline') {
    throw new Error(`Krea2 alternate profile ${profileId} cannot dispatch the native baseline builder`);
  }
  const workflow = builder(baseline, options);
  return Object.freeze({ profile, workflow });
}

export async function loadAndBuildKrea2ProfileWorkflow(profileId, baseline, options = {}) {
  const adapter = await loadKrea2ProfileAdapterContract(options);
  return buildKrea2ProfileWorkflow(adapter, profileId, baseline, options);
}

export { contractPath as KREA2_PROFILE_ADAPTER_CONTRACT_PATH };
