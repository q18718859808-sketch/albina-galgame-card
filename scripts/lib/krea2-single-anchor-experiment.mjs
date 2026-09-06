/**
 * Static, non-generative planner for one Krea2 sharpness experiment.
 *
 * This module intentionally does not import ComfyUI transport helpers. It
 * describes and validates a future staging invocation; it cannot enqueue,
 * upload, download, or start GPU inference.
 */
import { KREA2_PRODUCTION_STYLE_LORAS } from './krea2-comfyui.mjs';

export const KREA2_SINGLE_ANCHOR_KIND = 'krea2-single-anchor-sharpness-experiment';
export const KREA2_SINGLE_ANCHOR_PROFILE = 'albina-sharp-single-anchor-v1';

const EXPECTED_LORAS = Object.freeze(KREA2_PRODUCTION_STYLE_LORAS.map(({ order, name, strength }) => Object.freeze({ order, name, strength })));
const equalJson = (left, right) => JSON.stringify(left) === JSON.stringify(right);

function requireObject(value, name) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`${name} must be an object`);
  return value;
}

function requirePositiveSafeInteger(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be a positive safe integer`);
  return value;
}

function requireCanvas(value, name, options = {}) {
  const canvas = requireObject(value, name);
  for (const key of ['width', 'height']) {
    requirePositiveSafeInteger(canvas[key], `${name}.${key}`);
    if (options.eightAligned === true && canvas[key] % 8 !== 0) throw new Error(`${name}.${key} must be 8-aligned`);
  }
  if (options.alpha === true && canvas.alpha !== true) throw new Error(`${name}.alpha must be true`);
  return canvas;
}

function requireDenoise(value, name) {
  if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0 || value > 0.18) {
    throw new Error(`${name} must be a finite value greater than 0 and no greater than 0.18`);
  }
  return value;
}

function normalizeLoras(loras) {
  if (!Array.isArray(loras)) throw new Error('styleLoras must be an array');
  return loras.map(({ order, name, strength }) => ({ order, name, strength }));
}

export function assertKrea2SharpSingleAnchorPlan(plan) {
  requireObject(plan, 'single-anchor plan');
  if (plan.schemaVersion !== 1 || plan.kind !== KREA2_SINGLE_ANCHOR_KIND) throw new Error('invalid Krea2 single-anchor plan identity');
  if (plan.profile !== KREA2_SINGLE_ANCHOR_PROFILE) throw new Error('unrecognized Krea2 single-anchor profile');
  if (plan.status !== 'planned-static-no-inference') throw new Error('single-anchor plan must remain static and non-generative');
  if (plan.execution?.gpuInferenceStarted !== false || plan.execution?.enqueueAllowed !== false) {
    throw new Error('single-anchor planner must not authorize GPU inference or queue submission');
  }
  if (plan.execution?.maxOutputs !== 1 || plan.execution?.batchGeneration !== false) {
    throw new Error('single-anchor plan permits exactly one non-batch output');
  }
  requirePositiveSafeInteger(plan.execution?.fixedSeed, 'execution.fixedSeed');

  const canonical = requireObject(plan.canonical, 'canonical');
  if (canonical.geometryAuthority !== 'canonical-rgba' || canonical.materialAuthority !== 'krea2-rgb') {
    throw new Error('canonical and material authorities must remain canonical-rgba and krea2-rgb');
  }
  if (canonical.sourceCount !== 1 || canonical.alphaRestore !== 'canonical-alpha-restored-after-krea2-rgb-render') {
    throw new Error('single-anchor plan requires one canonical source and canonical alpha restoration');
  }
  requireCanvas(canonical.sourceCanvas, 'canonical.sourceCanvas', { alpha: true });
  requireCanvas(canonical.stage1Canvas, 'canonical.stage1Canvas', { eightAligned: true });
  requireCanvas(canonical.stage2Canvas, 'canonical.stage2Canvas', { eightAligned: true });
  if (canonical.stage1Canvas.width !== canonical.sourceCanvas.width + 4 || canonical.stage1Canvas.height !== canonical.sourceCanvas.height + 2) {
    throw new Error('stage1 canvas must remain the contract 8-aligned canonical canvas');
  }
  if (canonical.stage2Canvas.width !== canonical.stage1Canvas.width * 2 || canonical.stage2Canvas.height !== canonical.stage1Canvas.height * 2) {
    throw new Error('stage2 canvas must be exactly a 2x refinement of stage1');
  }

  if (!equalJson(normalizeLoras(plan.styleLoras), EXPECTED_LORAS)) throw new Error('single-anchor plan changed the locked six-LoRA order or strengths');
  if (plan.styleLoraMutationAllowed !== false) throw new Error('single-anchor plan must forbid LoRA mutation');

  const stages = plan.stages;
  if (!Array.isArray(stages) || stages.length !== 2) throw new Error('single-anchor sharpness plan requires exactly two stages');
  const [stage1, stage2] = stages;
  if (stage1.id !== 'stage1-canonical-material' || stage1.input !== 'canonical-rgba-flattened-over-neutral-field') {
    throw new Error('stage1 must retain canonical latent origin');
  }
  if (stage2.id !== 'stage2-sharpness-refinement' || stage2.input !== 'stage1-decoded-rgb-only') {
    throw new Error('stage2 must derive only from stage1 decoded RGB');
  }
  if (!equalJson(stage1.canvas, canonical.stage1Canvas) || !equalJson(stage2.canvas, canonical.stage2Canvas)) {
    throw new Error('stage canvases must match canonical plan canvases');
  }
  for (const stage of stages) {
    requirePositiveSafeInteger(stage.steps, `${stage.id}.steps`);
    requireDenoise(stage.denoise, `${stage.id}.denoise`);
    if (stage.batchSize !== 1 || stage.seed !== plan.execution.fixedSeed) throw new Error(`${stage.id} must use the single fixed seed and batch size 1`);
  }
  if (stage1.denoise > 0.12 || stage2.denoise > stage1.denoise || stage2.denoise > 0.07) {
    throw new Error('sharpness profile must keep the bounded low-denoise stage ordering');
  }

  const review = requireObject(plan.reviewGate, 'reviewGate');
  if (review.directOriginalResolutionReviewRequired !== true || review.automatedVisionAdvisoryOnly !== true || review.promotionAllowed !== false) {
    throw new Error('single-anchor plan must retain the direct-review promotion gate');
  }
  if (!Array.isArray(plan.forbidden) || !plan.forbidden.includes('gpu-inference-from-planner') || !plan.forbidden.includes('batch-generation')) {
    throw new Error('single-anchor plan must explicitly forbid planner inference and batch generation');
  }
  return true;
}

export function buildKrea2SharpSingleAnchorPlan(contract, overrides = {}) {
  requireObject(contract, 'canonical production contract');
  const sourceCanvas = requireCanvas(contract.authority?.canonicalCanvas, 'contract.authority.canonicalCanvas', { alpha: true });
  const stage1Canvas = requireCanvas(contract.render?.modelCanvas, 'contract.render.modelCanvas', { eightAligned: true });
  const styleLoras = normalizeLoras(contract.styleLoras);
  const plan = {
    schemaVersion: 1,
    kind: KREA2_SINGLE_ANCHOR_KIND,
    profile: KREA2_SINGLE_ANCHOR_PROFILE,
    status: 'planned-static-no-inference',
    purpose: 'One bounded sharper Krea2 staging candidate; no queue submission or production promotion.',
    execution: {
      fixedSeed: overrides.fixedSeed ?? 2026082001,
      maxOutputs: 1,
      batchGeneration: false,
      gpuInferenceStarted: false,
      enqueueAllowed: false,
    },
    canonical: {
      geometryAuthority: contract.authority?.geometry,
      materialAuthority: contract.authority?.material,
      sourceCount: 1,
      sourcePath: contract.authority?.canonicalPath,
      sourceCanvas,
      stage1Canvas,
      stage2Canvas: { width: stage1Canvas.width * 2, height: stage1Canvas.height * 2 },
      alphaRestore: contract.render?.alphaPolicy,
      coordinateSystem: contract.authority?.coordinateSystem,
    },
    styleLoras,
    styleLoraMutationAllowed: false,
    stages: [
      { id: 'stage1-canonical-material', input: 'canonical-rgba-flattened-over-neutral-field', canvas: stage1Canvas, steps: 28, denoise: 0.12, batchSize: 1, seed: overrides.fixedSeed ?? 2026082001 },
      { id: 'stage2-sharpness-refinement', input: 'stage1-decoded-rgb-only', canvas: { width: stage1Canvas.width * 2, height: stage1Canvas.height * 2 }, steps: 30, denoise: 0.06, batchSize: 1, seed: overrides.fixedSeed ?? 2026082001 },
    ],
    reviewGate: {
      directOriginalResolutionReviewRequired: true,
      automatedVisionAdvisoryOnly: true,
      promotionAllowed: false,
      requiredEvidence: ['canonicalSha256', 'workflowSha256', 'topologySha256', 'styleLoras', 'fixedSeed', 'outputSha256', 'direct-review-record'],
    },
    forbidden: ['gpu-inference-from-planner', 'queue-submission-from-planner', 'batch-generation', 'lora-reorder-or-reweight', 'alternate-reference-image', 'horizontal-flip', 'inset-generation', 'unrecorded-crop', 'unrecorded-resize', 'promotion-without-direct-review'],
  };
  assertKrea2SharpSingleAnchorPlan(plan);
  return plan;
}

export function summarizeKrea2SharpSingleAnchorPlan(plan) {
  assertKrea2SharpSingleAnchorPlan(plan);
  return {
    valid: true,
    kind: plan.kind,
    profile: plan.profile,
    status: plan.status,
    fixedSeed: plan.execution.fixedSeed,
    maxOutputs: plan.execution.maxOutputs,
    stageCanvases: plan.stages.map(({ id, canvas, steps, denoise }) => ({ id, canvas, steps, denoise })),
    directReviewRequired: plan.reviewGate.directOriginalResolutionReviewRequired,
    promotionAllowed: plan.reviewGate.promotionAllowed,
    gpuInferenceStarted: plan.execution.gpuInferenceStarted,
  };
}
