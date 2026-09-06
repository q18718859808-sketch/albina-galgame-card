import { access, constants } from 'node:fs/promises';
import { KREA2_PRODUCTION_STYLE_LORAS } from './krea2-comfyui.mjs';

export const KREA2_ADVANCED_UPSTREAM = Object.freeze({
  repository: 'https://github.com/EricRollei/Krea2_ComfyUI_Advanced',
  commit: '1dbb085d655c071ef9609ce68f67a3adec0aa571',
});

export const KREA2_ADVANCED_REQUIREMENTS = Object.freeze({
  diffusers: { minimumApi: 'Krea2Pipeline', currentKnownVersion: '0.34.0' },
  transformers: { minimumApi: 'Qwen3VLModel', currentKnownVersion: '4.53.0' },
  nodePack: 'Eric_Krea2',
  weights: Object.freeze([
    'Krea-2-Raw (diffusers layout)',
    'Krea-2-Turbo (diffusers layout)',
  ]),
});

export const KREA2_ADVANCED_FALLBACK = Object.freeze({
  kind: 'current-production-chain',
  adapter: 'scripts/lib/krea2-comfyui.mjs',
  workflow: 'staging/media/embedded-baseline/embedded-production-baseline.api.json',
  mode: 'use-existing-verified-six-lora-baseline',
  generationAllowedByThisAdapter: false,
  reason: 'Krea2 Advanced dependency, API, node-pack, or weight gates are not all satisfied.',
});

const asBool = (value) => value === true;

function fixedLoraChain() {
  return KREA2_PRODUCTION_STYLE_LORAS.map(({ order, name, strength }) => ({ order, name, strength }));
}

export function detectKrea2AdvancedReadiness(input = {}) {
  const diffusers = {
    version: input.diffusersVersion ?? KREA2_ADVANCED_REQUIREMENTS.diffusers.currentKnownVersion,
    hasKrea2Pipeline: asBool(input.hasKrea2Pipeline),
  };
  const transformers = {
    version: input.transformersVersion ?? KREA2_ADVANCED_REQUIREMENTS.transformers.currentKnownVersion,
    hasQwen3VLModel: asBool(input.hasQwen3VLModel),
  };
  const weights = {
    raw: asBool(input.weights?.raw),
    turbo: asBool(input.weights?.turbo),
  };
  const checks = {
    // Package versions are diagnostic evidence only. A real import/property
    // probe is mandatory because dev versions can carry the same version label
    // while exposing different APIs.
    diffusersApi: diffusers.hasKrea2Pipeline,
    transformersApi: transformers.hasQwen3VLModel,
    nodePack: asBool(input.candidateNodePackPresent),
    rawWeights: weights.raw,
    turboWeights: weights.turbo,
  };
  const ready = Object.values(checks).every(Boolean);
  return {
    ready,
    status: ready ? 'candidate-ready-for-install-gate' : 'blocked-pending-dependency-and-weight-gates',
    upstream: { ...KREA2_ADVANCED_UPSTREAM },
    runtime: { diffusers, transformers, candidateNodePackPresent: checks.nodePack },
    weights,
    checks,
    fixedStyleLoras: fixedLoraChain(),
    fallback: ready ? null : { ...KREA2_ADVANCED_FALLBACK },
  };
}

export async function inspectKrea2AdvancedWeightPaths(paths = {}) {
  const result = {};
  for (const key of ['raw', 'turbo']) {
    const path = paths[key];
    if (typeof path !== 'string' || path.length === 0) {
      result[key] = { present: false, path: path ?? null };
      continue;
    }
    try {
      await access(path, constants.R_OK);
      result[key] = { present: true, path };
    } catch {
      result[key] = { present: false, path };
    }
  }
  return result;
}

export function buildKrea2AdvancedWorkflowDescription(options = {}) {
  const checkpoint = options.checkpoint ?? 'raw';
  if (!['raw', 'turbo'].includes(checkpoint)) throw new Error('Krea2 Advanced checkpoint must be raw or turbo');
  const readiness = options.readiness ?? detectKrea2AdvancedReadiness();
  const loras = fixedLoraChain();
  return {
    schemaVersion: 1,
    kind: 'krea2-advanced-candidate-workflow-description',
    status: readiness.ready ? 'candidate-description-ready' : 'blocked-candidate-description',
    upstream: { ...KREA2_ADVANCED_UPSTREAM },
    stages: [
      { id: 'load', node: 'Eric Krea2 Loader', checkpoint, requires: ['Krea2Pipeline', 'Qwen3VLModel'] },
      { id: 'style', node: 'Eric Krea2 Multi-LoRA Stack', loras, policy: 'apply exactly these six entries in this order and at these strengths' },
      { id: 'img2img', node: 'Eric Krea2 VAE Encode', optional: true, note: 'canonical source may provide init_latent; geometry authority remains canonical RGBA' },
      { id: 'vision', node: 'Eric Krea2 Vision Prompt', optional: true, note: 'semantic grounding only; not an identity lock' },
      { id: 'refine', node: 'Eric Krea2 Multi-Stage Ultra V2', optional: true, note: 'candidate refinement and schedule controls; no LoRA strength changes' },
      { id: 'decode', node: 'Eric Krea2 Upscale Decode', optional: true, note: 'quality-pass decode; output returns through current review gates' },
    ],
    invariants: {
      fixedStyleLoras: loras,
      loraMutationAllowed: false,
      canonicalGeometry: 'canonical-rgba',
      materialOutput: 'krea2-rgb',
      noGenerationByAdapter: true,
    },
    readiness,
    fallback: readiness.ready ? null : { ...KREA2_ADVANCED_FALLBACK },
  };
}

export function assertKrea2AdvancedCandidateContract(description) {
  if (!description || description.kind !== 'krea2-advanced-candidate-workflow-description') throw new Error('Invalid Krea2 Advanced candidate description');
  if (JSON.stringify(description.invariants.fixedStyleLoras) !== JSON.stringify(fixedLoraChain())) throw new Error('Krea2 Advanced candidate changed the fixed six-LoRA chain');
  if (description.invariants.loraMutationAllowed !== false || description.invariants.noGenerationByAdapter !== true) throw new Error('Krea2 Advanced candidate contract weakened its safety boundary');
  return true;
}
