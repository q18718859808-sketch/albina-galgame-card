/**
 * Krea2 canonical restyle library.
 *
 * The accepted production method (see
 * staging/media/krea2-canonical-restyle/albina_canonical_restyle_v1.direct-review.json)
 * keeps the canonical artwork as the sampling origin instead of re-synthesising
 * the character from a prompt. The canonical PNG is flattened over a neutral
 * field, lanczos-scaled to an 8-aligned production size, VAE-encoded, and used
 * as `latent_image` with a partial denoise. The six-LoRA production style chain
 * is never modified, so the result is Krea2 rendering of the original design.
 */
import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';
import {
  buildKrea2Workflow,
  buildKrea2StagedHighFrequencyWorkflow,
  buildKrea2ReferenceConditioningWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  makeKrea2Receipt,
  recordKrea2Failure,
  sha256,
  stableJson,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  validateKrea2CanonicalLatentRestyle,
  validateKrea2StagedHighFrequencyWorkflow,
  validateKrea2CanonicalControlRestyle,
  assertKrea2CanonicalProductionContract,
  getKrea2CanonicalProductionContract,
  waitForKrea2Output,
  workflowTopologySha256,
} from './krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '../..');
export const NEUTRAL_FIELD = [34, 34, 38];

/**
 * Detail-preserving pre-upscale models available on the local ComfyUI install.
 * The anime model is the default for authored 2D line art; UltraSharp is the
 * fallback for photographic or painted scene plates.
 */
export const PRE_UPSCALE_MODELS = {
  anime: '4x_fatal_Anime_500000_G.pth',
  sharp: '4x-UltraSharp.pth',
};

export const RESTYLE_NEGATIVE = [
  'child, loli, chibi, round face, oversized eyes, generic anime beauty face,',
  'redesigned costume, different character, symmetric ordinary irises, mirrored eye assignment,',
  'dress, skirt, coat, corset, bare skin, closed abdomen, organic arms, fused arms,',
  'extra limbs, bad hands, broken joints, cropped feet, inset, collage, duplicated figure,',
  'blurry, soft focus, smeared linework, low resolution, jpeg artifacts,',
  'text, logo, watermark, UI, signature',
].join(' ');

/**
 * Canonical/control route contract. Unlike latent-origin restyle, this route
 * keeps a fresh target latent and supplies the canonical image through the
 * verified Reference V10 and depth-control branches.
 */
export const ALBINA_CANONICAL_CONTROL_PROFILE = Object.freeze({
  identityStrength: 0.95,
  promptStrength: 0.7,
  depthStrength: 0.85,
});

// The first canonical-control pilot used a fresh EmptyLatentImage. That made
// the reference and depth branches advisory only, and the model could lose
// the authored silhouette entirely. This repair keeps those branches but
// makes the canonical pixels the actual latent origin.
export const ALBINA_CANONICAL_CONTROL_REPAIR_PROFILE = Object.freeze({
  identityStrength: 0.92,
  promptStrength: 0.7,
  depthStrength: 0.45,
  denoise: 0.24,
  steps: 20,
});

export function buildCanonicalControlRestyleWorkflow(baseline, options) {
  const resolved = {
    ...options,
    negativePrompt: options.negativePrompt ?? RESTYLE_NEGATIVE,
    identityStrength: options.identityStrength ?? ALBINA_CANONICAL_CONTROL_PROFILE.identityStrength,
    promptStrength: options.promptStrength ?? ALBINA_CANONICAL_CONTROL_PROFILE.promptStrength,
    krea2Control: options.krea2Control ?? {
      kind: 'depth', strength: ALBINA_CANONICAL_CONTROL_PROFILE.depthStrength,
    },
  };
  if (resolved.krea2Control?.kind !== 'depth') {
    throw new Error('Albina canonical/control route requires the verified depth control path');
  }
  const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
    prompt: resolved.prompt,
    negativePrompt: resolved.negativePrompt,
    seed: resolved.seed,
    filenamePrefix: resolved.filenamePrefix,
    subjectImage: resolved.sourceFilename,
    targetSize: { width: resolved.width, height: resolved.height },
    identityStrength: resolved.identityStrength,
    promptStrength: resolved.promptStrength,
    krea2Control: resolved.krea2Control,
  });
  validateKrea2CanonicalControlRestyle(workflow);
  return workflow;
}

/**
 * Build the installed Krea Reference V10 role-separated route. The canonical
 * image is the only subject authority; the second image is explicitly a
 * style-only card that guides final finish layers and is forbidden from
 * contributing layout or subject shape.
 */
export function buildAlbinaReferenceStyleWorkflow(baseline, options) {
  const resolved = {
    ...options,
    negativePrompt: options.negativePrompt ?? RESTYLE_NEGATIVE,
    identityStrength: options.identityStrength ?? 0.84,
    promptStrength: options.promptStrength ?? 1,
    styleStrength: options.styleStrength ?? 0.42,
  };
  if (typeof resolved.styleStrength !== 'number' || resolved.styleStrength < 0.2 || resolved.styleStrength > 0.65) {
    throw new Error('Albina reference style strength must be between 0.2 and 0.65');
  }
  if (!resolved.styleFilename) throw new Error('Albina reference style route requires styleFilename');
  const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
    prompt: resolved.prompt,
    negativePrompt: resolved.negativePrompt,
    seed: resolved.seed,
    filenamePrefix: resolved.filenamePrefix,
    subjectImage: resolved.sourceFilename,
    styleImage: resolved.styleFilename,
    allowStyleOnlyReference: true,
    styleStrength: resolved.styleStrength,
    targetSize: { width: resolved.width, height: resolved.height },
    identityStrength: resolved.identityStrength,
    promptStrength: resolved.promptStrength,
  });
  validateKrea2ReferenceStyleWorkflow(workflow);
  return workflow;
}

export function validateKrea2ReferenceStyleWorkflow(workflow) {
  validateKrea2ProductionStyleChain(workflow);
  const entries = Object.entries(workflow);
  const loads = entries.filter(([, node]) => node.class_type === 'LoadImage');
  const cards = entries.filter(([, node]) => node.class_type === 'KGKrea2ImageGuideCardV10');
  const encoders = entries.filter(([, node]) => node.class_type === 'KGTextEncodeKreaImageReferencesV10');
  if (loads.length !== 2 || cards.length !== 2 || encoders.length !== 2) {
    throw new Error('Krea2 reference style route requires exactly one subject and one style image/card');
  }
  const subjectLoad = loads.find(([, node]) => cards[0][1].inputs?.['Reference image']?.[0] === nodeId(node, loads));
  const subjectCard = cards.find(([, node]) => node.inputs?.['Use image for'] === 'keep the same subject');
  const styleCard = cards.find(([, node]) => node.inputs?.['Use image for'] === 'suggest the visual style');
  if (!subjectCard || !styleCard) throw new Error('Krea2 reference style route role cards are not explicit');
  if (styleCard[1].inputs?.['Shape copied'] !== 0 || styleCard[1].inputs?.['Early layout guidance'] !== 0) {
    throw new Error('Krea2 style card must not guide subject geometry or layout');
  }
  if (!encoders[0][1].inputs?.['Reference 2 guide card']) {
    throw new Error('Krea2 reference style route must connect the style card to the stack encoder');
  }
  if (entries.some(([, node]) => ['Krea2EditModelPatch', 'Krea2EditGroundedEncode', 'Krea2ControlLoRALoader', 'Krea2ControlApply'].includes(node.class_type))) {
    throw new Error('Krea2 reference style route must remain independent of edit/control branches');
  }
  return true;
}

export function validateAlbinaRawEditDetailWorkflow(workflow) {
  const entries = Object.entries(workflow);
  const loras = entries.filter(([, node]) => node.class_type === 'LoraLoaderModelOnly');
  const names = loras.map(([, node]) => node.inputs?.lora_name);
  if (names.includes('z3zz4-k2-4_c1-st5000.safetensors')
    || names.includes('Krea2Rella_c1-st8000.safetensors')
    || names.includes('onineko_k2_v1.safetensors')
    || names.includes('meion_krea2_style_v7.0_c1-st4000.safetensors')
    || names.includes('masterpieces-v51.safetensors')
    || names.includes('ichika-k2_c1-st5000.safetensors')) {
    throw new Error('Albina raw edit detail route must not include the historical six-LoRA chain');
  }
  if (!names.includes('krea2_identity_edit_v1_2.safetensors')) {
    throw new Error('Albina raw edit detail route requires Krea2 identity-edit v1.2');
  }
  if (!names.includes('detailed-manga-inkwork-comfy.safetensors')
    && !names.includes('delicate-lineart-coloring-comfy.safetensors')
    && !names.includes('detail_slider_krea2_loraholic.safetensors')) {
    throw new Error('Albina raw edit detail route requires an explicit post-style detail LoRA');
  }
  const patch = entries.find(([, node]) => node.class_type === 'Krea2EditModelPatch');
  const grounded = entries.filter(([, node]) => node.class_type === 'Krea2EditGroundedEncode');
  if (!patch || grounded.length !== 2) throw new Error('Albina raw edit detail route requires grounded image editing');
  return true;
}

function nodeId(node, entries) {
  return entries.find(([, candidate]) => candidate === node)?.[0];
}

/**
 * Build the repaired single-image canonical/control route.
 *
 * The canonical image is used three ways: Reference V10 conditioning, depth
 * control, and the sampler's VAE-encoded latent origin. The last binding is
 * the important repair: it prevents an all-new target canvas from becoming an
 * empty or unrelated character while leaving the style/structure adapters
 * available for the material pass.
 */
export function buildCanonicalControlRepairWorkflow(baseline, options) {
  const profile = ALBINA_CANONICAL_CONTROL_REPAIR_PROFILE;
  const resolved = {
    ...options,
    negativePrompt: options.negativePrompt ?? RESTYLE_NEGATIVE,
    identityStrength: options.identityStrength ?? profile.identityStrength,
    promptStrength: options.promptStrength ?? profile.promptStrength,
    krea2Control: options.krea2Control ?? { kind: 'depth', strength: profile.depthStrength },
    denoise: options.denoise ?? profile.denoise,
    steps: options.steps ?? profile.steps,
  };
  if (resolved.krea2Control?.kind !== 'depth') {
    throw new Error('Albina canonical/control repair requires the depth control path');
  }
  if (typeof resolved.denoise !== 'number' || resolved.denoise <= 0 || resolved.denoise > 1) {
    throw new Error('Albina canonical/control repair denoise must be greater than 0 and at most 1');
  }
  if (!Number.isSafeInteger(resolved.steps) || resolved.steps < 8 || resolved.steps > 32) {
    throw new Error('Albina canonical/control repair steps must be between 8 and 32');
  }

  const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
    prompt: resolved.prompt,
    negativePrompt: resolved.negativePrompt,
    seed: resolved.seed,
    filenamePrefix: resolved.filenamePrefix,
    subjectImage: resolved.sourceFilename,
    targetSize: { width: resolved.width, height: resolved.height },
    identityStrength: resolved.identityStrength,
    promptStrength: resolved.promptStrength,
    krea2Control: resolved.krea2Control,
  });
  const entries = Object.entries(workflow);
  const nextId = () => String(Math.max(...Object.keys(workflow).map(Number)) + 1);
  const add = (class_type, inputs) => {
    const id = nextId();
    workflow[id] = { class_type, inputs };
    return id;
  };
  const source = entries.find(([, node]) => node.class_type === 'LoadImage')?.[0];
  const vae = entries.find(([, node]) => node.class_type === 'VAELoader')?.[0];
  const sampler = entries.find(([, node]) => node.class_type === 'SamplerCustomAdvanced')?.[0];
  const scheduler = entries.find(([, node]) => node.class_type === 'BasicScheduler')?.[0];
  const target = entries.find(([, node]) => node.class_type === 'EmptyLatentImage')?.[0];
  if (!source || !vae || !sampler || !scheduler || !target) {
    throw new Error('Canonical/control repair could not locate the required baseline nodes');
  }
  const scaled = add('ImageScale', {
    image: [source, 0], upscale_method: 'lanczos',
    width: resolved.width, height: resolved.height, crop: 'disabled',
  });
  const encoded = add('VAEEncode', { pixels: [scaled, 0], vae: [vae, 0] });
  workflow[sampler].inputs.latent_image = [encoded, 0];
  workflow[scheduler].inputs.denoise = resolved.denoise;
  workflow[scheduler].inputs.steps = resolved.steps;
  const controlEncode = entries.find(([, node]) => node.class_type === 'Krea2ControlImageEncode')?.[0];
  if (controlEncode) workflow[controlEncode].inputs.latent = [encoded, 0];
  delete workflow[target];
  validateCanonicalControlRepairWorkflow(workflow, { denoise: resolved.denoise, steps: resolved.steps });
  return workflow;
}

/** Validate the repaired topology without conflating it with the retired fresh-target route. */
export function validateCanonicalControlRepairWorkflow(workflow, options = {}) {
  validateKrea2ProductionStyleChain(workflow);
  const entries = Object.entries(workflow);
  const findOne = (type) => {
    const matches = entries.filter(([, node]) => node.class_type === type);
    if (matches.length !== 1) throw new Error(`Krea2 canonical-control repair requires exactly one ${type}`);
    return matches[0];
  };
  const source = findOne('LoadImage');
  const scale = findOne('ImageScale');
  const encode = findOne('VAEEncode');
  const sampler = findOne('SamplerCustomAdvanced');
  const scheduler = findOne('BasicScheduler');
  if (entries.some(([, node]) => node.class_type === 'EmptyLatentImage')) {
    throw new Error('Krea2 canonical-control repair forbids a fresh EmptyLatentImage target');
  }
  if (scale[1].inputs?.image?.[0] !== source[0] || encode[1].inputs?.pixels?.[0] !== scale[0]) {
    throw new Error('Krea2 canonical-control repair VAE path is not bound to the canonical source');
  }
  if (sampler[1].inputs?.latent_image?.[0] !== encode[0]) {
    throw new Error('Krea2 canonical-control repair sampler is not bound to the canonical VAE latent origin');
  }
  const guide = findOne('KGKrea2ImageGuideCardV10');
  if (guide[1].inputs?.['Reference image']?.[0] !== source[0]) {
    throw new Error('Krea2 canonical-control repair Reference V10 is not bound to the canonical source');
  }
  const depth = findOne('DepthAnythingV2Preprocessor');
  const controlEncode = findOne('Krea2ControlImageEncode');
  if (depth[1].inputs?.image?.[0] !== source[0] || controlEncode[1].inputs?.control_image?.[0] !== depth[0]
    || controlEncode[1].inputs?.latent?.[0] !== encode[0]) {
    throw new Error('Krea2 canonical-control repair depth path is not bound to the canonical source and latent');
  }
  const steps = scheduler[1].inputs?.steps;
  const denoise = scheduler[1].inputs?.denoise;
  if (steps !== options.steps || denoise !== options.denoise) {
    throw new Error('Krea2 canonical-control repair sampling settings are not bound to the repair profile');
  }
  if (entries.some(([, node]) => ['Krea2EditModelPatch', 'Krea2EditGroundedEncode', 'ConditioningZeroOut'].includes(node.class_type))) {
    throw new Error('Krea2 canonical-control repair forbids alternate edit and zeroed-negative nodes');
  }
  return true;
}

export function buildAlbinaStagedHighFrequencyWorkflow(baseline, options) {
  const resolved = {
    ...options,
    negativePrompt: options.negativePrompt ?? RESTYLE_NEGATIVE,
    stage1Size: options.stage1Size ?? { width: 592, height: 1768 },
    stage2Size: options.stage2Size ?? { width: 1184, height: 3536 },
    stage1Denoise: options.stage1Denoise ?? 0.12,
    stage2Denoise: options.stage2Denoise ?? 0.07,
    stage1Steps: options.stage1Steps ?? 28,
    stage2Steps: options.stage2Steps ?? 24,
  };
  if (resolved.stage2Size.width > 1536 || resolved.stage2Size.height > 4096) {
    throw new Error('Albina staged high-frequency route exceeds the bounded local GPU canvas');
  }
  const built = buildKrea2StagedHighFrequencyWorkflow(baseline, resolved);
  validateKrea2StagedHighFrequencyWorkflow(built.workflow);
  return { ...built, profile: 'albina-staged-high-frequency-v1', contract: {
    geometryAuthority: 'canonical-rgba', materialAuthority: 'krea2-rgb',
    canonicalLatentOrigin: true, singleImageStaging: true, batchGeneration: false,
    fixedSixLoraChain: true, stageCount: 2,
  } };
}

export function buildAlbinaStagedHighFrequencyReceiptFields(options, built, source) {
  if (!built?.stages?.stage1 || !built?.stages?.stage2) throw new Error('staged high-frequency receipt requires both stage records');
  return {
    profile: 'albina-staged-high-frequency-v1',
    singleImageStaging: true,
    batchGeneration: false,
    canonical: {
      authority: 'canonical-rgba', path: source.path, sha256: source.sha256,
      latentOrigin: { stage: 1, node: built.stages.stage1.canonicalLatent },
    },
    material: { authority: 'krea2-rgb', loraChain: getKrea2CanonicalProductionContract().sixLoraChain },
    stages: [
      { id: 'stage1-material', size: built.stages.stage1.size, denoise: built.stages.stage1.denoise, steps: built.stages.stage1.steps, samplerNode: built.stages.stage1.sampler },
      { id: 'stage2-high-frequency', size: built.stages.stage2.size, denoise: built.stages.stage2.denoise, steps: built.stages.stage2.steps, inputFrom: 'stage1-decoded-image', samplerNode: built.stages.stage2.sampler },
    ],
    review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true, promotionAllowed: false },
  };
}

export const ALBINA_STRUCTURE_LOCK_PROFILE = Object.freeze({
  // The 2 MP portrait target is the minimum useful working size for Albina's
  // mechanical linework.  A lower denoise keeps the authored geometry while
  // 24 scheduler steps gives the six-LoRA chain enough time to resolve edges.
  denoise: 0.10,
  steps: 24,
  vaeTiled: false,
  preUpscaleModel: null,
  depthControl: null,
  preserveAlpha: true,
  minDenoise: 0.08,
  maxDenoise: 0.18,
  minSteps: 16,
  maxSteps: 28,
});

export function resolveAlbinaStructureLock(options = {}) {
  const profile = options.structureLock === true ? ALBINA_STRUCTURE_LOCK_PROFILE : null;
  const resolved = {
    ...options,
    ...(profile ? {
      denoise: options.denoise ?? profile.denoise,
      steps: options.steps ?? profile.steps,
      vaeTiled: options.vaeTiled ?? profile.vaeTiled,
      preUpscaleModel: options.preUpscaleModel ?? profile.preUpscaleModel,
      depthControl: options.depthControl ?? profile.depthControl,
      preserveAlpha: options.preserveAlpha ?? profile.preserveAlpha,
    } : {}),
  };
  if (!profile) return resolved;
  if (resolved.sourceCrop || resolved.postStyleLora) {
    throw new Error('Albina canonical staging structure lock forbids crop and post-style LoRA variants');
  }
  if (resolved.preUpscaleModel || resolved.depthControl || resolved.vaeTiled === true) {
    throw new Error('Albina structure lock forbids pre-upscale, depth control, and tiled VAE until each path has an approved visual certificate');
  }
  if (typeof resolved.denoise !== 'number' || resolved.denoise < profile.minDenoise || resolved.denoise > profile.maxDenoise) {
    throw new Error(`Albina structure lock denoise must be between ${profile.minDenoise} and ${profile.maxDenoise}`);
  }
  if (!Number.isSafeInteger(resolved.steps) || resolved.steps < profile.minSteps || resolved.steps > profile.maxSteps) {
    throw new Error(`Albina structure lock steps must be between ${profile.minSteps} and ${profile.maxSteps}`);
  }
  return resolved;
}

export const AUDITED_POST_STYLE_LORAS = new Set([
  'delicate-lineart-coloring-comfy.safetensors',
  'detailed-manga-inkwork-comfy.safetensors',
  'detail_slider_krea2_loraholic.safetensors',
]);

export function align8(value) {
  return Math.max(384, Math.round(value / 8) * 8);
}

/**
 * Resolution budget for the local 8 GB card running ComfyUI in --lowvram.
 * Character plates are tall, scene plates are wide, so the cap is expressed in
 * megapixels and applied by scaling both axes before 8-alignment.
 */
export function fitMegapixels(width, height, megapixels) {
  const current = (width * height) / 1_000_000;
  const factor = current > megapixels ? Math.sqrt(megapixels / current) : 1;
  return { width: align8(width * factor), height: align8(height * factor) };
}

function python(code, ...args) {
  const result = spawnSync('python', ['-c', code, ...args], { encoding: 'utf8' });
  if (result.status !== 0) throw new Error(`python helper failed: ${result.stderr || result.stdout}`);
  return result.stdout.trim();
}

const FLATTEN = [
  'import sys',
  'from PIL import Image',
  'src, dst, r, g, b = sys.argv[1], sys.argv[2], int(sys.argv[3]), int(sys.argv[4]), int(sys.argv[5])',
  "im = Image.open(src).convert('RGBA')",
  "bg = Image.new('RGBA', im.size, (r, g, b, 255))",
  'bg.alpha_composite(im)',
  "bg.convert('RGB').save(dst)",
  'print(im.size[0], im.size[1])',
].join('\n');

/**
 * Restore transparency on a restyled portrait. Partial denoise keeps the
 * silhouette locked to the canonical source, so the canonical alpha channel
 * scaled to the output size is the authoritative cutout.
 */
const REAPPLY_ALPHA = [
  'import sys',
  'from PIL import Image',
  'canonical, produced, dst = sys.argv[1], sys.argv[2], sys.argv[3]',
  "src = Image.open(canonical).convert('RGBA')",
  "out = Image.open(produced).convert('RGB')",
  'alpha = src.split()[3].resize(out.size, Image.LANCZOS)',
  "rgba = out.convert('RGBA')",
  'rgba.putalpha(alpha)',
  'rgba.save(dst)',
  'print(rgba.size[0], rgba.size[1])',
].join('\n');

const REAPPLY_CROP_ALPHA = [
  'import sys',
  'from PIL import Image',
  'canonical, produced, dst, x, y, width, height = sys.argv[1], sys.argv[2], sys.argv[3], *map(int, sys.argv[4:8])',
  'src = Image.open(canonical).convert("RGBA")',
  'alpha = src.getchannel("A").crop((x, y, x + width, y + height)).resize(Image.open(produced).size, Image.LANCZOS)',
  'rgba = Image.open(produced).convert("RGB").convert("RGBA")',
  'rgba.putalpha(alpha)',
  'rgba.save(dst)',
].join('\n');

export function buildLatentRestyleWorkflow(baseline, options) {
  options = resolveAlbinaStructureLock(options);
  const workflow = buildKrea2Workflow(baseline, {
    prompt: options.prompt,
    seed: options.seed,
    filenamePrefix: options.filenamePrefix,
    targetSize: { width: options.width, height: options.height },
  });
  validateKrea2ProductionStyleChain(workflow);

  const idOf = (classType) => {
    const ids = Object.entries(workflow).filter(([, node]) => node.class_type === classType).map(([id]) => id);
    if (ids.length !== 1) throw new Error(`restyle workflow needs exactly one ${classType}`);
    return ids[0];
  };
  const vae = idOf('VAELoader');
  const sampler = idOf('SamplerCustomAdvanced');
  const scheduler = idOf('BasicScheduler');
  const clip = idOf('CLIPLoader');
  const guider = idOf('CFGGuider');
  const zeroOut = idOf('ConditioningZeroOut');
  const terminalStyleModel = Object.entries(workflow)
    .filter(([, node]) => node.class_type === 'LoraLoaderModelOnly')
    .find(([id]) => !Object.values(workflow).some((node) => node.class_type === 'LoraLoaderModelOnly' && node.inputs?.model?.[0] === id))?.[0];
  if (!terminalStyleModel) throw new Error('restyle workflow needs a terminal six-LoRA style model');

  let nextId = Math.max(...Object.keys(workflow).map(Number).filter(Number.isSafeInteger)) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };

  let productionModel = [terminalStyleModel, 0];
  if (options.postStyleLora) {
    const { name, strength } = options.postStyleLora;
    if (!AUDITED_POST_STYLE_LORAS.has(name) || typeof strength !== 'number'
      || !Number.isFinite(strength) || strength < 0 || strength > 1) {
      throw new Error('postStyleLora must be an audited local Krea2 LoRA with strength between 0 and 1');
    }
    const extension = add('LoraLoaderModelOnly', {
      model: productionModel, lora_name: name, strength_model: strength,
    });
    productionModel = [extension, 0];
    workflow[guider].inputs.model = productionModel;
    workflow[scheduler].inputs.model = productionModel;
  }

  const source = add('LoadImage', { image: options.sourceFilename });
  let sourceForEncoding = [source, 0];
  if (options.sourceCrop) {
    const crop = options.sourceCrop;
    for (const key of ['x', 'y', 'width', 'height']) {
      if (!Number.isSafeInteger(crop[key]) || crop[key] < 0) {
        throw new Error(`sourceCrop ${key} must be a non-negative safe integer`);
      }
    }
    if (crop.width < 384 || crop.height < 384) throw new Error('sourceCrop must retain at least 384 pixels per axis');
    sourceForEncoding = [add('ImageCrop', {
      image: sourceForEncoding, x: crop.x, y: crop.y, width: crop.width, height: crop.height,
    }), 0];
  }
  let preUpscale = null;
  if (options.preUpscaleModel) {
    if (!options.preUpscaleInputSize?.width || !options.preUpscaleInputSize?.height) {
      throw new Error('pre-upscale requires an explicit bounded input size');
    }
    const bounded = add('ImageScale', {
      image: sourceForEncoding,
      upscale_method: 'lanczos',
      width: options.preUpscaleInputSize.width,
      height: options.preUpscaleInputSize.height,
      crop: 'disabled',
    });
    const upscaleModel = add('UpscaleModelLoader', { model_name: options.preUpscaleModel });
    const enlarged = add('ImageUpscaleWithModel', {
      upscale_model: [upscaleModel, 0], image: [bounded, 0],
    });
    sourceForEncoding = [enlarged, 0];
    preUpscale = {
      model: options.preUpscaleModel,
      inputSize: options.preUpscaleInputSize,
      loader: upscaleModel,
      node: enlarged,
    };
  }
  const scaled = add('ImageScale', {
    image: sourceForEncoding, upscale_method: 'lanczos',
    width: options.width, height: options.height, crop: 'disabled',
  });
  const tiledVae = options.vaeTiled === true;
  const encoded = add(tiledVae ? 'VAEEncodeTiled' : 'VAEEncode', tiledVae
    ? { pixels: [scaled, 0], vae: [vae, 0], tile_size: 1024, overlap: 128, temporal_size: 64, temporal_overlap: 8 }
    : { pixels: [scaled, 0], vae: [vae, 0] });
  workflow[sampler].inputs.latent_image = [encoded, 0];
  let structuralControl = null;
  if (options.depthControl) {
    const strength = options.depthControl.strength ?? 0.55;
    if (typeof strength !== 'number' || strength < 0 || strength > 1) {
      throw new Error('depth control strength must be between 0 and 1');
    }
    const controlLora = add('Krea2ControlLoRALoader', {
      model: productionModel, lora_name: 'depth-control-lora.safetensors', strength,
    });
    const depth = add('DepthAnythingV2Preprocessor', {
      image: [scaled, 0], ckpt_name: 'depth_anything_v2_vitl.pth', resolution: 512,
    });
    const controlLatent = add('Krea2ControlImageEncode', {
      control_image: [depth, 0], vae: [vae, 0], latent: [encoded, 0],
      resize: 'match_latent_size', upscale_method: 'lanczos', crop: 'disabled',
      channel_mode: 'grayscale', normalize: 'none', invert: false, batch_mode: 'independent_images',
    });
    const controlled = add('Krea2ControlApply', {
      model: [controlLora, 0], control_latent: [controlLatent, 0],
    });
    workflow[guider].inputs.model = [controlled, 0];
    workflow[scheduler].inputs.model = [controlled, 0];
    structuralControl = { kind: 'depth', strength, controlLora, depth, controlLatent, controlled };
  }
  workflow[scheduler].inputs.denoise = options.denoise;
  workflow[scheduler].inputs.steps = options.steps ?? 8;
  const decoded = idOf('VAEDecode');
  if (tiledVae) {
    workflow[decoded] = {
      class_type: 'VAEDecodeTiled',
      inputs: { samples: [sampler, 0], vae: [vae, 0], tile_size: 1024, overlap: 128, temporal_size: 64, temporal_overlap: 8 },
    };
  }
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? RESTYLE_NEGATIVE });
  workflow[guider].inputs.negative = [negative, 0];
  delete workflow[zeroOut];
  if (options.structureLock === true) {
    validateKrea2CanonicalLatentRestyle(workflow, {
      structureLock: true,
      allowAuditedPostStyle: options.postStyleLora !== undefined,
    });
  }
  return { workflow, topology: { preUpscale, structuralControl } };
}

export function buildCanonicalMaterialReceiptFields(options, source, render) {
  const contract = getKrea2CanonicalProductionContract();
  assertKrea2CanonicalProductionContract(contract);
  return {
    contract,
    geometry: {
      authority: 'canonical-rgba',
      sourcePath: source.path,
      sourceSha256: source.sha256,
      sourceCanvas: source.canvas,
      modelCanvas: render,
      sideConvention: 'unmirrored-source-pixel-coordinates',
      operations: ['flatten-alpha-over-neutral-field', 'model-canvas-resample', 'canonical-alpha-restore'],
    },
    material: {
      authority: 'krea2-rgb',
      renderPath: 'canonical-latent-origin-six-lora-restyle',
      styleLoras: contract.sixLoraChain,
      generatedText: false,
      generatedBackground: false,
    },
    review: {
      directImageReadRequired: true,
      automatedVisionAdvisoryOnly: true,
      promotionAllowed: false,
    },
    options: {
      structureLock: options.structureLock === true,
      preserveAlpha: options.preserveAlpha !== false,
      denoise: options.denoise,
      steps: options.steps,
      singleImageStaging: true,
    },
    contractFile: options.contractFile ?? null,
  };
}

/**
 * Produce one Krea2 restyle of a canonical source image.
 * Returns the staging output paths plus the hash-bound receipt.
 */
export async function produceCanonicalRestyle(options) {
  options = resolveAlbinaStructureLock(options);
  const sourcePath = resolve(options.sourcePath);
  const stagingDir = resolve(options.stagingDir);
  const jobId = options.jobId;
  await mkdir(stagingDir, { recursive: true });

  const flatPath = resolve(stagingDir, `${jobId}.input.png`);
  const [srcWidth, srcHeight] = python(FLATTEN, sourcePath, flatPath, ...NEUTRAL_FIELD.map(String))
    .split(/\s+/u).map(Number);
  if (options.canonicalCanvas && (options.canonicalCanvas.width !== srcWidth || options.canonicalCanvas.height !== srcHeight)) {
    throw new Error('canonicalCanvas must match the canonical source dimensions exactly');
  }
  const scale = options.scale ?? 1;
  const crop = options.sourceCrop;
  const baseWidth = crop?.width ?? srcWidth;
  const baseHeight = crop?.height ?? srcHeight;
  const width = options.targetSize?.width ?? align8(baseWidth * scale);
  const height = options.targetSize?.height ?? align8(baseHeight * scale);
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height)
    || width < 384 || height < 384 || width % 8 !== 0 || height % 8 !== 0) {
    throw new Error('targetSize must use 8-aligned integer dimensions of at least 384 pixels');
  }
  const preUpscaleInputSize = options.preUpscaleModel
    ? {
      width: align8(srcWidth * (options.preUpscaleInputScale ?? 0.5)),
      height: align8(srcHeight * (options.preUpscaleInputScale ?? 0.5)),
    }
    : null;

  const { workflow: baseline, workflowPath, evidencePath } = await loadVerifiedKrea2Baseline();
  const baselineSha = sha256(await readFile(workflowPath));
  const upload = await uploadKrea2Image(flatPath);
  const built = buildLatentRestyleWorkflow(baseline, {
    prompt: options.prompt, negativePrompt: options.negativePrompt,
    seed: options.seed, steps: options.steps, denoise: options.denoise,
    width, height, filenamePrefix: jobId, sourceFilename: upload.filename,
    preUpscaleModel: options.preUpscaleModel,
    preUpscaleInputSize,
    depthControl: options.depthControl,
    vaeTiled: options.vaeTiled === true,
    postStyleLora: options.postStyleLora,
    structureLock: options.structureLock === true,
  });
  const { workflow } = built;
  validateKrea2CanonicalLatentRestyle(workflow, {
    structureLock: options.structureLock === true,
    allowAuditedPostStyle: options.postStyleLora !== undefined,
  });
  const invocationSha = sha256(stableJson(workflow));
  const topologySha = workflowTopologySha256(workflow);
  const sourceSha = sha256(await readFile(sourcePath));
  const invocationPath = resolve(stagingDir, `${jobId}.workflow.json`);
  await writeFile(invocationPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
  const invocationFileSha = sha256(await readFile(invocationPath));

  const receipt = makeKrea2Receipt({
    jobId, promptSha256: sha256(options.prompt), baselineWorkflowSha256: baselineSha,
    invocationWorkflowSha256: invocationSha,
    invocationFileSha256: invocationFileSha,
    invocationWorkflowPath: relative(projectRoot, invocationPath).replaceAll('\\', '/'),
    topologySha256: topologySha, workflowPath,
    prompt: options.prompt, seed: options.seed, filenamePrefix: jobId,
    workflowSerialization: 'stable-json-v1', evidencePath,
    evidenceSha256: sha256(await readFile(evidencePath)),
    resolution: { width, height },
    referenceInputs: [{
      role: 'canonical-latent-origin',
      file: basename(sourcePath),
      path: relative(projectRoot, sourcePath).replaceAll('\\', '/'),
      sha256: sourceSha,
    }],
    referencesSentToModel: true,
    referenceNote: 'The canonical image is uploaded to local ComfyUI, VAE-encoded as the sampler latent origin, and may also drive structural control.',
    canonicalProduction: buildCanonicalMaterialReceiptFields(options, {
      path: relative(projectRoot, sourcePath).replaceAll('\\', '/'), sha256: sourceSha,
      canvas: options.canonicalCanvas ?? { width: srcWidth, height: srcHeight, alpha: true },
    }, { width, height, alpha: false }),
  });
  receipt.references.uploadedCanonical = {
    comfyFilename: upload.filename,
    sha256: upload.sha256,
    bytes: upload.bytes,
    sourceSha256: sourceSha,
    transform: 'flatten-alpha-over-neutral-field-34-34-38',
  };
  if (crop) {
    receipt.references.sourceCrop = { ...crop, scale };
  }
  receipt.method = 'krea2-latent-origin-canonical-restyle-v2';
  receipt.productionContract = {
    structureLock: options.structureLock === true,
    canonicalLatentOrigin: true,
    sixLoraBaselineRequired: true,
    outputQualityReviewRequired: true,
  };
  receipt.denoise = options.denoise;
  receipt.effectiveSampling = {
    schedulerSteps: workflow[Object.entries(workflow).find(([, node]) => node.class_type === 'BasicScheduler')?.[0]]?.inputs?.steps,
    denoise: options.denoise,
    preUpscale: built.topology.preUpscale,
    structuralControl: built.topology.structuralControl,
    postStyleLora: options.postStyleLora ?? null,
    targetSizing: built.topology.preUpscale
      ? 'model pre-upscale followed by lanczos target resampling'
      : 'lanczos target resampling without model pre-upscale',
    vaeIo: options.vaeTiled === true ? 'tiled encode and decode (1024 tile / 128 overlap)' : 'standard VAE encode and decode',
  };
  receipt.styleChain = validateKrea2ProductionStyleChain(workflow, { allowAuditedPostStyle: Boolean(options.postStyleLora) });

  const receiptPath = resolve(stagingDir, `${jobId}.receipt.json`);
  try {
    const { promptId } = await enqueueKrea2Job(workflow);
    // A local 8 GB GPU can spend over twenty minutes behind other Krea2 jobs.
    // This timeout covers both queue residence and execution, so it must not
    // mark a ComfyUI-completed image as failed merely because it waited its turn.
    const result = await waitForKrea2Output(promptId, { timeoutMs: options.timeoutMs ?? 7_200_000 });
    receipt.execution = {
      promptId,
      historySha256: sha256(JSON.stringify(result.history)),
      history: result.history,
      outputBinding: result.images[0],
    };
    const rgbPath = resolve(stagingDir, `${jobId}.rgb.png`);
    const output = await downloadKrea2Image(result.images[0], rgbPath);
    let finalPath = rgbPath;
    let alphaRestored = false;
    if (options.preserveAlpha !== false) {
      finalPath = resolve(stagingDir, `${jobId}.png`);
      if (options.sourceCrop) {
        const crop = options.sourceCrop;
        python(REAPPLY_CROP_ALPHA, sourcePath, rgbPath, finalPath, String(crop.x), String(crop.y), String(crop.width), String(crop.height));
      } else {
        python(REAPPLY_ALPHA, sourcePath, rgbPath, finalPath);
      }
      alphaRestored = true;
    }
    const finalBytes = await readFile(finalPath);
    receipt.status = 'completed';
    receipt.output = {
      path: finalPath,
      finalPath,
      finalSha256: sha256(finalBytes),
      sha256: sha256(finalBytes),
      bytes: finalBytes.length,
      filename: basename(finalPath),
      alphaRestored,
      intermediaryRgb: output,
    };
    await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
    return {
      jobId, sourcePath, sourceSha256: sourceSha, rgbPath, finalPath,
      finalSha256: sha256(finalBytes), width, height, receiptPath, receipt,
    };
  } catch (error) {
    await mkdir(dirname(receiptPath), { recursive: true });
    await writeFile(receiptPath, `${JSON.stringify(recordKrea2Failure(receipt, error), null, 2)}\n`, 'utf8');
    throw error;
  }
}
