import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '../..');
const defaultComfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
// The user-supplied embedded PNG workflow is the active production baseline.
// The older root-level snapshot remains historical evidence only.
const defaultWorkflowPath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
const defaultEvidencePath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json');
const receiptRoot = resolve(projectRoot, 'staging/media/krea2-v1');
const hashPattern = /^[a-f0-9]{64}$/u;

export const KREA2_COMFY_GATEWAY_DEFAULTS = Object.freeze({
  enabled: false,
  url: 'http://127.0.0.1:5050',
  port: 5050,
  statusPath: '/system_stats',
  queuePath: '/queue',
  interruptPath: '/interrupt',
});
const productionStyleLoras = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];

export const KREA2_PRODUCTION_STYLE_LORAS = Object.freeze(productionStyleLoras.map(([name, strength], order) => Object.freeze({
  order: order + 1, name, strength,
})));

export const KREA2_CANONICAL_PRODUCTION_CONTRACT = Object.freeze({
  schemaVersion: 1,
  geometryAuthority: 'canonical-rgba',
  materialAuthority: 'krea2-rgb',
  renderPath: 'canonical-latent-origin-six-lora-restyle',
  alphaPolicy: 'canonical-alpha-restored-after-krea2-rgb-render',
  sixLoraChain: KREA2_PRODUCTION_STYLE_LORAS,
  forbidden: Object.freeze(['horizontal-flip', 'inset-generation', 'canvas-paste', 'unrecorded-crop', 'unrecorded-resize']),
  visualStyleEffectGate: Object.freeze({
    required: true,
    acceptedReviewMinimum: 2,
    criteria: Object.freeze([
      'linework', 'line-density', 'mechanical-edge', 'material-separation',
      'cel-shading', 'industrial-lighting', 'palette-treatment', 'surface-detail',
    ]),
    directOriginalResolutionOnly: true,
    automatedVisionCannotSatisfy: true,
    noVisibleStyleDeltaDecision: 'reject-and-stop-topology',
  }),
});

export function getKrea2CanonicalProductionContract() {
  return structuredClone(KREA2_CANONICAL_PRODUCTION_CONTRACT);
}

export function assertKrea2CanonicalProductionContract(contract = KREA2_CANONICAL_PRODUCTION_CONTRACT) {
  if (contract.geometryAuthority !== 'canonical-rgba' || contract.materialAuthority !== 'krea2-rgb'
    || contract.alphaPolicy !== 'canonical-alpha-restored-after-krea2-rgb-render') {
    throw new Error('Krea2 canonical production contract must keep geometry in canonical RGBA and material in Krea2 RGB');
  }
  if (JSON.stringify(contract.sixLoraChain) !== JSON.stringify(KREA2_PRODUCTION_STYLE_LORAS)) {
    throw new Error('Krea2 canonical production contract changed the locked six-LoRA order or strengths');
  }
  return true;
}

export function normalizeLocalComfyUrl(value = defaultComfyUrl) {
  const url = new URL(value);
  if (url.protocol !== 'http:' || !['127.0.0.1', 'localhost', '::1'].includes(url.hostname)) {
    throw new Error('ComfyUI endpoint must be a local loopback HTTP URL');
  }
  return url.toString().replace(/\/$/u, '');
}

/**
 * The gateway is deliberately a monitoring/recovery side channel. It is not
 * a ComfyUI prompt proxy: generation and image I/O continue to use 8199.
 */
export function normalizeKrea2ComfyGatewayUrl(value = KREA2_COMFY_GATEWAY_DEFAULTS.url) {
  const url = new URL(value);
  if (url.protocol !== 'http:' || !['127.0.0.1', 'localhost', '::1'].includes(url.hostname)) {
    throw new Error('ComfyuiGW endpoint must be a local loopback HTTP URL');
  }
  if (url.port !== String(KREA2_COMFY_GATEWAY_DEFAULTS.port)) {
    throw new Error('ComfyuiGW endpoint must use port 5050');
  }
  if (url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('ComfyuiGW endpoint must be a bare URL on port 5050');
  }
  return url.toString().replace(/\/$/u, '');
}

function envFlag(value) {
  return ['1', 'true', 'yes', 'on'].includes(String(value ?? '').trim().toLowerCase());
}

export function getKrea2ComfyGatewayConfig(env = process.env) {
  const enabled = envFlag(env.ALBINA_COMFY_GATEWAY_ENABLED);
  const url = enabled
    ? normalizeKrea2ComfyGatewayUrl(env.ALBINA_COMFY_GATEWAY_URL ?? KREA2_COMFY_GATEWAY_DEFAULTS.url)
    : KREA2_COMFY_GATEWAY_DEFAULTS.url;
  return Object.freeze({
    enabled,
    url,
    port: KREA2_COMFY_GATEWAY_DEFAULTS.port,
    statusPath: KREA2_COMFY_GATEWAY_DEFAULTS.statusPath,
    queuePath: KREA2_COMFY_GATEWAY_DEFAULTS.queuePath,
    interruptPath: KREA2_COMFY_GATEWAY_DEFAULTS.interruptPath,
  });
}

export function isKrea2ComfyGatewayEnabled(env = process.env) {
  return getKrea2ComfyGatewayConfig(env).enabled;
}

export async function getKrea2GatewayStatus(options = {}) {
  return gatewayJson('status', KREA2_COMFY_GATEWAY_DEFAULTS.statusPath, options);
}

export async function getKrea2GatewayQueue(options = {}) {
  return gatewayJson('queue', KREA2_COMFY_GATEWAY_DEFAULTS.queuePath, options);
}

export async function interruptKrea2Gateway(options = {}) {
  const config = getKrea2ComfyGatewayConfig(options.env ?? process.env);
  if (!config.enabled) return { enabled: false, status: 'disabled', operation: 'interrupt' };
  if (Object.hasOwn(options, 'workflow') || Object.hasOwn(options, 'prompt') || Object.hasOwn(options, 'images')
    || Object.hasOwn(options, 'inputs')) {
    throw new Error('ComfyuiGW interrupt helper does not accept generation payloads');
  }
  const response = await fetchComfy(`${config.url}${config.interruptPath}`, { method: 'POST' }, options);
  const data = await responseData(response);
  if (!response.ok) throw new Error(`ComfyuiGW interrupt request failed: ${response.status}`);
  return { enabled: true, operation: 'interrupt', endpoint: config.interruptPath, statusCode: response.status, data };
}

export async function getKrea2GatewayRecoverySnapshot(options = {}) {
  const config = getKrea2ComfyGatewayConfig(options.env ?? process.env);
  if (!config.enabled) return { enabled: false, status: 'disabled', statusData: null, queueData: null };
  const [status, queue] = await Promise.all([
    getKrea2GatewayStatus(options),
    getKrea2GatewayQueue(options),
  ]);
  return { enabled: true, statusData: status.data, queueData: queue.data };
}

export function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

/** Stable JSON is the serialization used for reproducibility hashes. */
export function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(',')}]`;
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export async function loadVerifiedKrea2Baseline(options = {}) {
  const workflowPath = resolve(options.workflowPath ?? defaultWorkflowPath);
  const evidencePath = resolve(options.evidencePath ?? defaultEvidencePath);
  const [workflow, evidence, workflowBytes] = await Promise.all([
    readJson(workflowPath), readJson(evidencePath), readFile(workflowPath),
  ]);
  assertVerifiedEvidence(evidence, workflowPath, workflowBytes);
  return { workflow, evidence, workflowPath, evidencePath };
}

export function buildKrea2Workflow(baseline, options) {
  const workflow = structuredClone(baseline);
  const textNodes = nodesOf(workflow, 'CLIPTextEncode');
  if (textNodes.length !== 1) throw new Error('Krea2 baseline must have exactly one text encoder');
  textNodes[0].inputs.text = requiredString(options.prompt, 'prompt');
  const noiseNodes = nodesOf(workflow, 'RandomNoise');
  if (noiseNodes.length !== 1) throw new Error('Krea2 baseline must have exactly one noise node');
  if (!Number.isSafeInteger(options.seed) || options.seed < 0) throw new Error('Krea2 seed must be a non-negative safe integer');
  noiseNodes[0].inputs.noise_seed = options.seed;
  const saveNodes = nodesOf(workflow, 'SaveImage');
  if (saveNodes.length !== 1) throw new Error('Krea2 baseline must have exactly one output node');
  saveNodes[0].inputs.filename_prefix = requiredString(options.filenamePrefix, 'filenamePrefix');
  const resolutionNodes = nodesOf(workflow, 'ResolutionSelector');
  if (resolutionNodes.length !== 1) throw new Error('Krea2 baseline must have exactly one resolution selector');
  resolutionNodes[0].inputs.aspect_ratio = options.aspectRatio ?? resolutionNodes[0].inputs.aspect_ratio;
  resolutionNodes[0].inputs.megapixels = options.megapixels ?? resolutionNodes[0].inputs.megapixels;
  if (options.targetSize) {
    const { width, height } = options.targetSize;
    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 384 || height < 384 || width % 8 !== 0 || height % 8 !== 0) {
      throw new Error('Krea2 targetSize width and height must be 8-aligned integers of at least 384 pixels');
    }
    const latents = nodesOf(workflow, 'EmptyLatentImage');
    if (latents.length !== 1) throw new Error('Krea2 baseline must have exactly one empty latent image');
    latents[0].inputs.width = width;
    latents[0].inputs.height = height;
    delete workflow[Object.keys(workflow).find((id) => workflow[id] === resolutionNodes[0])];
  }
  return workflow;
}

export function buildKrea2ImageEditWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, options);
  const rawBase = options.baseRoute === 'raw-krea2';
  if (rawBase) {
    const unet = singleNodeId(workflow, 'UNETLoader');
    const loraIds = Object.entries(workflow)
      .filter(([, node]) => node.class_type === 'LoraLoaderModelOnly')
      .map(([id]) => id);
    for (const id of loraIds) delete workflow[id];
    for (const node of Object.values(workflow)) {
      for (const [key, value] of Object.entries(node.inputs ?? {})) {
        if (Array.isArray(value) && loraIds.includes(value[0])) node.inputs[key] = [unet, value[1]];
      }
    }
  } else {
    assertProductionStyleLoras(workflow);
  }
  const subjectImage = requiredString(options.subjectImage, 'subject image');
  const styleImage = options.styleImage ? requiredString(options.styleImage, 'style image') : null;
  const detailImage = options.detailImage ? requiredString(options.detailImage, 'detail image') : null;
  if (styleImage && detailImage) throw new Error('Krea2 image edit cannot combine styleImage and detailImage in the same two-reference graph');
  if (styleImage && options.allowDualReferenceExperimental !== true) {
    throw new Error('Dual-reference Krea2 editing is experimental; set allowDualReferenceExperimental=true explicitly');
  }
  if (options.fitMode && !['fit', 'crop (legacy)'].includes(options.fitMode)) throw new Error('Krea2 fitMode must be fit or crop (legacy)');
  for (const [name, value] of [['subjectReferenceBoost', options.subjectReferenceBoost], ['styleReferenceBoost', options.styleReferenceBoost], ['detailReferenceBoost', options.detailReferenceBoost]]) {
    if (value !== undefined && (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 1000)) throw new Error(`Krea2 ${name} must be between 0 and 1000`);
  }
  if (options.groundingPixels !== undefined && (!Number.isSafeInteger(options.groundingPixels) || options.groundingPixels < 384 || options.groundingPixels > 4096)) throw new Error('Krea2 groundingPixels must be an integer between 384 and 4096');
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };

  const finalModel = rawBase ? singleNodeId(workflow, 'UNETLoader') : finalStyleModelId(workflow);
  const latent = singleNodeId(workflow, 'EmptyLatentImage');
  const vae = singleNodeId(workflow, 'VAELoader');
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const scheduler = singleNodeId(workflow, 'BasicScheduler');
  const sampler = singleNodeId(workflow, 'SamplerCustomAdvanced');
  const positive = singleNodeId(workflow, 'CLIPTextEncode');
  const negative = singleNodeId(workflow, 'ConditioningZeroOut');

  if (options.cfg !== undefined) {
    if (typeof options.cfg !== 'number' || !Number.isFinite(options.cfg) || options.cfg <= 0 || options.cfg > 5) {
      throw new Error('Krea2 image edit cfg must be between 0 and 5');
    }
    workflow[guider].inputs.cfg = options.cfg;
  }
  if (options.steps !== undefined) {
    if (!Number.isSafeInteger(options.steps) || options.steps < 8 || options.steps > 32) {
      throw new Error('Krea2 image edit steps must be between 8 and 32');
    }
    workflow[scheduler].inputs.steps = options.steps;
  }
  if (options.denoise !== undefined) {
    if (typeof options.denoise !== 'number' || options.denoise <= 0 || options.denoise > 1) {
      throw new Error('Krea2 image edit denoise must be between 0 and 1');
    }
    workflow[scheduler].inputs.denoise = options.denoise;
  }
  if (options.samplerName !== undefined) {
    if (typeof options.samplerName !== 'string' || !options.samplerName.trim()) throw new Error('Krea2 samplerName is required');
    workflow[singleNodeId(workflow, 'KSamplerSelect')].inputs.sampler_name = options.samplerName;
  }

  const subject = add('LoadImage', { image: subjectImage });
  const subjectNode = addSubjectCompositeBackground(add, subject, subjectImage, options.subjectCompositeBackground);
  const croppedSubjectPixels = addSubjectCrop(workflow, add, subjectNode, options.subjectCrop);
  const subjectLatent = add('VAEEncode', { pixels: croppedSubjectPixels, vae: [vae, 0] });
  let groundedImage = croppedSubjectPixels;
  const postStyleModel = addPostStyleIdentityEdit(add, finalModel, options.postStyleIdentityEdit, options.postStyleLora);
  const editModel = addKrea2CanonicalControl(workflow, add, postStyleModel, croppedSubjectPixels, latent, vae, options.krea2Control);
  let patchInputs = {
    model: editModel, source_latent: [subjectLatent, 0], source_image: croppedSubjectPixels,
    target_latent: [latent, 0], vae: [vae, 0], ref_boost: options.subjectReferenceBoost ?? 4,
    fit_mode: options.fitMode ?? 'fit',
  };
  if (options.subjectReferenceMask === 'alpha') {
    // ImageCrop normalizes RGBA to RGB on this ComfyUI build. Extract alpha first,
    // then crop its mask with the exact same coordinates as the source pixels.
    const sourceMask = add('LoadImageMask', { image: subjectImage, channel: 'alpha' });
    const mask = addSubjectMaskCrop(add, sourceMask, options.subjectCrop);
    patchInputs.ref_boost_mask = [mask, 0];
  } else if (options.subjectReferenceMask === 'regions') {
    const mask = addSubjectRegionMask(add, options.subjectCrop ?? options.subjectReferenceMaskDimensions, options.subjectReferenceRegions);
    patchInputs.ref_boost_mask = [mask, 0];
  }
  if (styleImage) {
    const style = add('LoadImage', { image: styleImage });
    const styleLatent = add('VAEEncode', { pixels: [style, 0], vae: [vae, 0] });
    patchInputs = {
      ...patchInputs, source_latent: [styleLatent, 0], source_latent_b: [subjectLatent, 0],
      source_image: [style, 0], source_image_b: croppedSubjectPixels, ref_boost: options.styleReferenceBoost ?? 1,
      ref_boost_a: options.subjectReferenceBoost ?? 4,
    };
    groundedImage = [style, 0];
  } else if (detailImage) {
    const detail = add('LoadImage', { image: detailImage });
    const detailLatent = add('VAEEncode', { pixels: [detail, 0], vae: [vae, 0] });
    patchInputs = {
      ...patchInputs,
      source_latent_b: [detailLatent, 0],
      source_image_b: [detail, 0],
      ref_boost_a: options.detailReferenceBoost ?? 4,
    };
  }
  const patch = add('Krea2EditModelPatch', patchInputs);
  const positiveEdit = add('Krea2EditGroundedEncode', {
    clip: [clip, 0], image: groundedImage, prompt: requiredString(options.prompt, 'prompt'),
    grounding_px: options.groundingPixels ?? 768,
    system_prompt: requiredString(options.systemPrompt ?? 'Preserve the canonical subject design exactly.', 'system prompt'),
  });
  const negativeEdit = add('Krea2EditGroundedEncode', {
    clip: [clip, 0], image: groundedImage, prompt: options.negativePrompt ?? '',
    grounding_px: options.groundingPixels ?? 768, system_prompt: '',
  });
  if (styleImage) {
    workflow[positiveEdit].inputs.image_b = croppedSubjectPixels;
    workflow[negativeEdit].inputs.image_b = croppedSubjectPixels;
  } else if (detailImage) {
    const detailNode = patchInputs.source_image_b;
    workflow[positiveEdit].inputs.image_b = detailNode;
    workflow[negativeEdit].inputs.image_b = detailNode;
  }
  workflow[guider].inputs.model = [patch, 0];
  workflow[guider].inputs.positive = [positiveEdit, 0];
  workflow[guider].inputs.negative = [negativeEdit, 0];
  workflow[scheduler].inputs.model = [patch, 0];
  workflow[sampler].inputs.latent_image = [latent, 0];
  delete workflow[positive];
  delete workflow[negative];
  return workflow;
}

/** Build an independent community StyleTransfer route from the bare Krea2 model. */
export function buildKrea2CommunityStyleTransferWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, options);
  const unet = singleNodeId(workflow, 'UNETLoader');
  const loraIds = Object.entries(workflow)
    .filter(([, node]) => node.class_type === 'LoraLoaderModelOnly').map(([id]) => id);
  for (const id of loraIds) delete workflow[id];
  for (const node of Object.values(workflow)) {
    for (const [key, value] of Object.entries(node.inputs ?? {})) {
      if (Array.isArray(value) && loraIds.includes(value[0])) node.inputs[key] = [unet, value[1]];
    }
  }
  const styleImage = requiredString(options.styleImage, 'styleImage');
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const vae = singleNodeId(workflow, 'VAELoader');
  const latent = singleNodeId(workflow, 'EmptyLatentImage');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const scheduler = singleNodeId(workflow, 'BasicScheduler');
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => { const id = String(nextId++); workflow[id] = { class_type, inputs }; return id; };
  const style = add('LoadImage', { image: styleImage });
  const reference = add('Krea2StyleReference', {
    vae: [vae, 0], target_latent: [latent, 0], reference_image: [style, 0],
    fit: options.styleFit ?? 'crop', upscale_method: 'lanczos',
  });
  const positive = singleNodeId(workflow, 'CLIPTextEncode');
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? '' });
  const transfer = add('Krea2StyleTransfer', {
    model: [unet, 0], reference_latent: [reference, 0], ref_conditioning: [positive, 0],
    mode: options.styleMode ?? 'recommended', style_strength: options.styleStrength ?? 1,
    value_adain_strength: options.valueAdainStrength ?? 0.65, ref_value_mix: options.refValueMix ?? 1,
    ref_k_strength: options.refKStrength ?? 1.06, rf_mode: options.rfMode ?? 'flowturbo_pc',
    gamma: options.gamma ?? 0.5, beta: options.beta ?? 2.5,
    high_scale_start: options.highScaleStart ?? 1.04, high_scale_end: options.highScaleEnd ?? 0,
    low_scale_start: options.lowScaleStart ?? 1, low_scale_end: options.lowScaleEnd ?? 1.1,
    adain_strength: options.adainStrength ?? 0.85, blocks: options.blocks ?? '7-27',
  });
  workflow[guider].inputs.model = [transfer, 0];
  workflow[guider].inputs.negative = [negative, 0];
  workflow[scheduler].inputs.model = [transfer, 0];
  if (options.cfg !== undefined) workflow[guider].inputs.cfg = options.cfg;
  if (options.steps !== undefined) workflow[scheduler].inputs.steps = options.steps;
  if (options.samplerName) workflow[singleNodeId(workflow, 'KSamplerSelect')].inputs.sampler_name = options.samplerName;
  return workflow;
}

/** Build the installed community DyPE + Krea2 raw-dynamic sampling route. */
export function buildKrea2CommunityDypeWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, options);
  const unet = singleNodeId(workflow, 'UNETLoader');
  const loraIds = Object.entries(workflow)
    .filter(([, node]) => node.class_type === 'LoraLoaderModelOnly').map(([id]) => id);
  for (const id of loraIds) delete workflow[id];
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const latent = singleNodeId(workflow, 'EmptyLatentImage');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const scheduler = singleNodeId(workflow, 'BasicScheduler');
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => { const id = String(nextId++); workflow[id] = { class_type, inputs }; return id; };
  const dype = add('DyPE_FLUX', {
    model: [unet, 0], width: options.width, height: options.height,
    model_type: 'qwen', method: options.dypeMethod ?? 'vision_yarn',
    yarn_alt_scaling: false, enable_dype: true, base_resolution: options.dypeBaseResolution ?? 1328,
    dype_start_sigma: options.dypeStartSigma ?? 1,
    dype_scale: options.dypeScale ?? 2, dype_exponent: options.dypeExponent ?? 1,
    base_shift: options.dypeBaseShift ?? 0.5, max_shift: options.dypeMaxShift ?? 1.15,
  });
  const sampling = add('Krea2ModelSampling', {
    model: [dype, 0], sampling_mode: 'raw_dynamic', width: options.width, height: options.height, manual_shift: 1.15,
  });
  workflow[guider].inputs.model = [sampling, 0];
  workflow[scheduler].inputs.model = [sampling, 0];
  if (options.cfg !== undefined) workflow[guider].inputs.cfg = options.cfg;
  if (options.steps !== undefined) workflow[scheduler].inputs.steps = options.steps;
  if (options.samplerName) workflow[singleNodeId(workflow, 'KSamplerSelect')].inputs.sampler_name = options.samplerName;
  // Keep the generated graph explicitly text-conditioned and single-image.
  if (!workflow[guider].inputs.positive?.[0] || !workflow[guider].inputs.negative?.[0]) {
    const positive = add('CLIPTextEncode', { clip: [clip, 0], text: options.prompt });
    const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? '' });
    workflow[guider].inputs.positive = [positive, 0];
    workflow[guider].inputs.negative = [negative, 0];
  }
  return workflow;
}

/** Build the installed community Raw -> Turbo Krea two-stage sampler route. */
export function buildKrea2CommunityTwoStageWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, options);
  const loraIds = Object.entries(workflow)
    .filter(([, node]) => node.class_type === 'LoraLoaderModelOnly').map(([id]) => id);
  for (const id of loraIds) delete workflow[id];
  const rawLoader = singleNodeId(workflow, 'UNETLoader');
  const vae = singleNodeId(workflow, 'VAELoader');
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const latent = singleNodeId(workflow, 'EmptyLatentImage');
  const positive = singleNodeId(workflow, 'CLIPTextEncode');
  const oldNegative = singleNodeId(workflow, 'ConditioningZeroOut');
  const save = singleNodeId(workflow, 'SaveImage');
  const decode = singleNodeId(workflow, 'VAEDecode');
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => { const id = String(nextId++); workflow[id] = { class_type, inputs }; return id; };
  const turbo = add('UNETLoader', { unet_name: 'krea2_turbo_fp8_scaled.safetensors', weight_dtype: 'default' });
  const rawSampling = add('Krea2ModelSampling', {
    model: [rawLoader, 0], sampling_mode: 'raw_dynamic', width: options.width, height: options.height, manual_shift: 1.15,
  });
  const turboSampling = add('Krea2ModelSampling', {
    model: [turbo, 0], sampling_mode: 'turbo_fixed', width: options.width, height: options.height, manual_shift: 1.15,
  });
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? '' });
  const stage = add('KreaTwoStageSampler', {
    stage1_model: [rawSampling, 0], stage2_model: [turboSampling, 0],
    positive: [positive, 0], negative: [negative, 0], latent_image: [latent, 0],
    seed: options.seed, handoff_percent: options.handoffPercent ?? 25,
    stage1_steps: options.stage1Steps ?? 16, stage1_cfg: options.stage1Cfg ?? 3,
    stage1_sampler_name: options.stage1SamplerName ?? 'euler', stage1_scheduler: options.stage1Scheduler ?? 'beta',
    stage2_steps: options.stage2Steps ?? 8, stage2_cfg: options.stage2Cfg ?? 1,
    stage2_sampler_name: options.stage2SamplerName ?? 'euler', stage2_scheduler: options.stage2Scheduler ?? 'beta',
    final_width: options.finalWidth ?? options.width, final_height: options.finalHeight ?? options.height,
    upscale_method: options.upscaleMethod ?? 'bislerp',
  });
  workflow[decode].inputs.samples = [stage, 0];
  workflow[decode].inputs.vae = [vae, 0];
  workflow[save].inputs.images = [decode, 0];
  delete workflow[oldNegative];
  for (const id of ['130', '131', '132', '135', '140']) delete workflow[id];
  return workflow;
}

export function buildKrea2ReferenceConditioningWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, options);
  assertProductionStyleLoras(workflow);
  if (Object.values(workflow).some((node) => node.class_type === 'LoraLoaderModelOnly'
    && node.inputs?.lora_name === 'krea2_identity_edit_v1_2.safetensors')) {
    throw new Error('Krea2 reference conditioning forbids the identity-edit extension');
  }
  const subjectImage = requiredString(options.subjectImage, 'subject image');
  if ((options.additionalReferences?.length || options.styleImage) && options.allowStyleOnlyReference !== true) {
    throw new Error('Krea2 reference conditioning requires exactly one canonical subject reference');
  }
  const identityStrength = options.identityStrength ?? 0.9;
  if (typeof identityStrength !== 'number' || !Number.isFinite(identityStrength) || identityStrength < 0.8 || identityStrength > 0.95) {
    throw new Error('Krea2 reference identityStrength must be between 0.8 and 0.95');
  }

  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const latent = singleNodeId(workflow, 'EmptyLatentImage');
  const vae = singleNodeId(workflow, 'VAELoader');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const positive = singleNodeId(workflow, 'CLIPTextEncode');
  const negative = singleNodeId(workflow, 'ConditioningZeroOut');
  const source = add('LoadImage', { image: subjectImage });
  const guide = add('KGKrea2ImageGuideCardV10', {
    'Reference image': [source, 0],
    'How strongly this image guides': identityStrength,
    'Use image for': 'keep the same subject',
    'Manual mode borrows': 'same person/product/object',
    'Prepare image by': 'use image as-is',
    'Color kept': 1,
    'Small details kept': 1,
    'Study this image at': 'very high - most exact (768)',
    'Frame this reference by': 'keep full image shape',
    'Subject copying': 'preserve same subject',
    'Early layout guidance': 1,
    'Final detail copying': 1,
    'Maximum image pull': 3,
    'Shape copied': 1,
    'Overall style reach': 1,
    'Guide direction': 'toward this image',
    'When this card guides': 'whole image',
    'Structure layers pull': 1,
    'Finish layers pull': 1,
  });
  let styleGuide;
  if (options.styleImage && options.allowStyleOnlyReference === true) {
    const style = add('LoadImage', { image: requiredString(options.styleImage, 'style image') });
    styleGuide = add('KGKrea2ImageGuideCardV10', {
      'Reference image': [style, 0],
      'How strongly this image guides': options.styleStrength ?? 0.45,
      'Use image for': 'suggest the visual style',
      'Manual mode borrows': 'colors and art style',
      'Prepare image by': 'use image as-is',
      'Color kept': 1,
      'Small details kept': 0,
      'Study this image at': 'high - more exact (512)',
      'Frame this reference by': 'keep full image shape',
      'Subject copying': 'avoid copying subject',
      'Early layout guidance': 0,
      'Final detail copying': 1,
      'Maximum image pull': options.styleStrength ?? 0.45,
      'Shape copied': 0,
      'Overall style reach': 1,
      'Guide direction': 'toward this image',
      'When this card guides': 'final details only',
      'Structure layers pull': 0.15,
      'Finish layers pull': 0.7,
    });
  }
  const positiveReference = add('KGTextEncodeKreaImageReferencesV10', {
    'Krea CLIP': [clip, 0],
    'Final image prompt': requiredString(options.prompt, 'prompt'),
    'Written prompt strength': options.promptStrength ?? 1,
    'Image slider feel': 'literal slider values',
    'Image detail level': 'very high - most exact (768)',
    'Image framing': 'keep full image shape',
    'When images guide': 'guide the whole image',
    'Early-to-final handoff': 0.4,
    'Text/logo guard prompt handling': 'gentle guard - keep my prompt words',
    'Balance strong cards': 'off - use my values',
    'Reuse image studies': 'always re-study',
    'Reference 1 guide card': [guide, 0],
    ...(styleGuide ? { 'Reference 2 guide card': [styleGuide, 0] } : {}),
  });
  const negativeReference = add('KGTextEncodeKreaImageReferencesV10', {
    'Krea CLIP': [clip, 0],
    'Final image prompt': options.negativePrompt ?? '',
    'Written prompt strength': 1,
    'Image slider feel': 'literal slider values',
    'Image detail level': 'low - loose idea (256)',
    'Image framing': 'keep full image shape',
    'When images guide': 'guide the whole image',
    'Early-to-final handoff': 0.4,
    'Text/logo guard prompt handling': 'gentle guard - keep my prompt words',
    'Balance strong cards': 'off - use my values',
    'Reuse image studies': 'always re-study',
  });
  workflow[guider].inputs.positive = [positiveReference, 0];
  workflow[guider].inputs.negative = [negativeReference, 0];
  if (options.krea2Control) {
    const finalModel = finalStyleModelId(workflow);
    const controlledModel = addKrea2CanonicalControl(
      workflow, add, finalModel, [source, 0], latent, vae, options.krea2Control,
    );
    workflow[guider].inputs.model = controlledModel;
    const scheduler = singleNodeId(workflow, 'BasicScheduler');
    workflow[scheduler].inputs.model = controlledModel;
  }
  delete workflow[positive];
  delete workflow[negative];
  return workflow;
}

/**
 * Build the final, non-generative part of a staged regional run. The repair
 * image must be a node output from the same workflow; loading it from disk
 * would make the composite non-atomic and would break stage provenance.
 */
export function buildKrea2RegionalCompositeWorkflow(options = {}) {
  const baseImage = requiredString(options.baseImage, 'regional composite base image');
  if (!Array.isArray(options.repairImage) || options.repairImage.length !== 2) {
    throw new Error('Krea2 regional composite requires an internal repair image link');
  }
  if (!Number.isSafeInteger(options.x) || options.x < 0 || !Number.isSafeInteger(options.y) || options.y < 0) {
    throw new Error('Krea2 regional composite requires non-negative x and y');
  }
  const workflow = structuredClone(options.repairWorkflow ?? {});
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = ids.length ? Math.max(...ids) + 1 : 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };
  const base = add('LoadImage', { image: baseImage });
  const regions = options.maskRegions;
  if (!Array.isArray(regions) || regions.length === 0) throw new Error('Krea2 regional composite requires explicit mask regions');
  const width = options.maskDimensions?.width;
  const height = options.maskDimensions?.height;
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height) || width < 1 || height < 1) {
    throw new Error('Krea2 regional composite requires positive mask dimensions');
  }
  let mask = add('SolidMask', { value: 0, width, height });
  for (const [index, region] of regions.entries()) {
    for (const key of ['x', 'y', 'width', 'height']) {
      if (!Number.isSafeInteger(region?.[key]) || region[key] < 0) throw new Error(`Krea2 composite region ${index} ${key} must be a non-negative safe integer`);
    }
    if (region.width < 1 || region.height < 1 || region.x + region.width > width || region.y + region.height > height) {
      throw new Error(`Krea2 composite region ${index} is outside the mask dimensions`);
    }
    const source = add('SolidMask', { value: 1, width: region.width, height: region.height });
    mask = add('MaskComposite', { destination: [mask, 0], source: [source, 0], x: region.x, y: region.y, operation: 'add' });
  }
  const composite = add('ImageCompositeMasked', {
    destination: [base, 0], source: options.repairImage,
    x: options.x, y: options.y, resize_source: false, mask: [mask, 0],
  });
  const save = add('SaveImage', { images: [composite, 0], filename_prefix: requiredString(options.filenamePrefix, 'regional composite filenamePrefix') });
  for (const [id, node] of Object.entries(workflow)) {
    if (node.class_type === 'SaveImage' && id !== save) delete workflow[id];
  }
  return workflow;
}

export function getKrea2StyleLoraContract() {
  return KREA2_PRODUCTION_STYLE_LORAS.map((entry) => ({ ...entry }));
}

function addSubjectCrop(workflow, add, subjectNode, crop) {
  if (!crop) return [subjectNode, 0];
  for (const key of ['width', 'height', 'x', 'y']) {
    if (!Number.isSafeInteger(crop[key]) || crop[key] < 0) throw new Error(`Krea2 subject crop ${key} must be a non-negative safe integer`);
  }
  if (crop.width < 1 || crop.height < 1) throw new Error('Krea2 subject crop dimensions must be positive');
  const cropped = add('ImageCrop', { image: [subjectNode, 0], width: crop.width, height: crop.height, x: crop.x, y: crop.y });
  return [cropped, 0];
}

function addSubjectMaskCrop(add, sourceMask, crop) {
  if (!crop) return sourceMask;
  const cropped = add('CropMask', {
    mask: [sourceMask, 0], width: crop.width, height: crop.height, x: crop.x, y: crop.y,
  });
  return cropped;
}

function addSubjectRegionMask(add, dimensions, regions) {
  if (!dimensions || !Array.isArray(regions) || regions.length === 0) {
    throw new Error('Krea2 regional reference mask requires dimensions and at least one region');
  }
  const base = add('SolidMask', { value: 0, width: dimensions.width, height: dimensions.height });
  let destination = base;
  for (const [index, region] of regions.entries()) {
    for (const key of ['x', 'y', 'width', 'height']) {
      if (!Number.isSafeInteger(region?.[key]) || region[key] < 0) throw new Error(`Krea2 reference region ${index} ${key} must be a non-negative safe integer`);
    }
    if (region.width < 1 || region.height < 1 || region.x + region.width > dimensions.width || region.y + region.height > dimensions.height) {
      throw new Error(`Krea2 reference region ${index} is outside the subject mask dimensions`);
    }
    const source = add('SolidMask', { value: 1, width: region.width, height: region.height });
    destination = add('MaskComposite', {
      destination: [destination, 0], source: [source, 0], x: region.x, y: region.y, operation: 'add',
    });
  }
  return destination;
}

function addSubjectCompositeBackground(add, subject, subjectImage, background) {
  if (!background) return subject;
  for (const key of ['width', 'height', 'color']) {
    if (!Number.isSafeInteger(background[key]) || background[key] < 0) throw new Error(`Krea2 subject composite ${key} must be a non-negative safe integer`);
  }
  if (background.width < 1 || background.height < 1 || background.color > 0xffffff) throw new Error('Krea2 subject composite dimensions or color are invalid');
  const alpha = add('LoadImageMask', { image: subjectImage, channel: 'alpha' });
  const neutral = add('EmptyImage', { width: background.width, height: background.height, batch_size: 1, color: background.color });
  const composite = add('ImageCompositeMasked', { destination: [neutral, 0], source: [subject, 0], x: 0, y: 0, resize_source: false, mask: [alpha, 0] });
  return composite;
}

function addKrea2CanonicalControl(workflow, add, finalModel, subjectPixels, targetLatent, vae, control) {
  if (!control) return [finalModel, 0];
  if (control.kind !== 'depth') throw new Error(`Only verified Krea2 depth control is allowed; received: ${control.kind}`);
  if (Object.hasOwn(control, 'lowThreshold') || Object.hasOwn(control, 'highThreshold')) {
    throw new Error('Krea2 depth control does not accept Canny threshold parameters');
  }
  const strength = control.strength ?? 1;
  if (typeof strength !== 'number' || !Number.isFinite(strength) || strength < 0 || strength > 1) {
    throw new Error('Krea2 depth control strength must be between 0 and 1');
  }
  const controlLora = add('Krea2ControlLoRALoader', {
    model: [finalModel, 0], lora_name: 'depth-control-lora.safetensors', strength,
  });
  const depth = add('DepthAnythingV2Preprocessor', {
    image: subjectPixels,
    ckpt_name: 'depth_anything_v2_vitl.pth',
    resolution: 512,
  });
  const controlLatent = add('Krea2ControlImageEncode', {
    control_image: [depth, 0], vae: [vae, 0], latent: [targetLatent, 0],
    resize: 'match_latent_size', upscale_method: 'lanczos', crop: 'disabled',
    channel_mode: 'grayscale', normalize: 'none', invert: false, batch_mode: 'independent_images',
  });
  const controlled = add('Krea2ControlApply', { model: [controlLora, 0], control_latent: [controlLatent, 0] });
  return [controlled, 0];
}

function addPostStyleIdentityEdit(add, finalModel, identityEdit, postStyleLora) {
  let model = finalModel;
  if (identityEdit) {
    if (identityEdit.name !== 'krea2_identity_edit_v1_2.safetensors' || identityEdit.strength !== 1) {
      throw new Error('Only the audited Krea2 identity-edit extension at strength 1 may follow the production style chain');
    }
    model = add('LoraLoaderModelOnly', {
      model: [model, 0], lora_name: identityEdit.name, strength_model: identityEdit.strength,
    });
  }
  if (!postStyleLora) return model;
  const allowed = new Set([
    'delicate-lineart-coloring-comfy.safetensors',
    'detailed-manga-inkwork-comfy.safetensors',
    'detail_slider_krea2_loraholic.safetensors',
  ]);
  if (!allowed.has(postStyleLora.name) || typeof postStyleLora.strength !== 'number'
    || !Number.isFinite(postStyleLora.strength) || postStyleLora.strength < 0 || postStyleLora.strength > 1) {
    throw new Error('Post-style Krea2 LoRA is not an audited local detail LoRA or has an invalid strength');
  }
  return add('LoraLoaderModelOnly', {
    model: [model, 0], lora_name: postStyleLora.name, strength_model: postStyleLora.strength,
  });
}

export function buildKrea2TextOverlayWorkflow(options) {
  if (!options?.font || !options?.text) throw new Error('Krea2 text overlay requires font and text');
  if (!Number.isSafeInteger(options.width) || !Number.isSafeInteger(options.height) || options.width < 16 || options.height < 16) throw new Error('Krea2 text overlay requires valid dimensions');
  const hasSource = typeof options.sourceImage === 'string' && options.sourceImage.trim().length > 0;
  const hasBackground = Number.isSafeInteger(options.backgroundColor)
    && options.backgroundColor >= 0 && options.backgroundColor <= 0xffffff;
  if (hasSource === hasBackground) throw new Error('Krea2 text overlay requires exactly one source image or background color');
  return {
    '1': hasSource
      ? { class_type: 'LoadImage', inputs: { image: options.sourceImage } }
      : { class_type: 'EmptyImage', inputs: { width: options.width, height: options.height, batch_size: 1, color: options.backgroundColor } },
    '2': { class_type: 'CreateTextMask', inputs: {
      invert: false, frames: 1, text_x: options.x ?? 0, text_y: options.y ?? 0,
      font_size: options.fontSize ?? 32, font_color: options.color ?? '#ffffff', text: options.text,
      font: options.font, width: options.width, height: options.height, start_rotation: 0, end_rotation: 0,
    } },
    '3': { class_type: 'ImageCompositeMasked', inputs: { destination: ['1', 0], source: ['2', 0], x: 0, y: 0, resize_source: false, mask: ['2', 1] } },
    '4': { class_type: 'SaveImage', inputs: { images: ['3', 0], filename_prefix: options.filenamePrefix ?? 'albina_krea2_text_overlay' } },
  };
}

/**
 * Build a single-image two-pass latent refinement graph using only nodes
 * verified by the local Krea2 baseline. Pass one starts from the canonical
 * VAE latent. Pass two re-encodes only pass one's decoded image at the final
 * canvas size, so high-frequency detail is added without introducing a second
 * identity/reference image or a separate LoRA chain.
 */
export function buildKrea2StagedHighFrequencyWorkflow(baseline, options) {
  const workflow = structuredClone(baseline);
  const textNodes = nodesOf(workflow, 'CLIPTextEncode');
  if (textNodes.length !== 1) throw new Error('Krea2 staged workflow must have exactly one text encoder');
  textNodes[0].inputs.text = requiredString(options.prompt, 'prompt');
  const saveId = singleNodeId(workflow, 'SaveImage');
  const vae = singleNodeId(workflow, 'VAELoader');
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const samplerSelect = singleNodeId(workflow, 'KSamplerSelect');
  const model = finalStyleModelId(workflow);
  assertProductionStyleLoras(workflow);
  for (const [id, node] of Object.entries(workflow)) {
    if (['RandomNoise', 'BasicScheduler', 'SamplerCustomAdvanced', 'VAEDecode', 'EmptyLatentImage', 'ResolutionSelector', 'ConditioningZeroOut'].includes(node.class_type)) {
      delete workflow[id];
    }
  }
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };
  const dimensions = (value, name) => {
    if (!Number.isSafeInteger(value?.width) || !Number.isSafeInteger(value?.height)
      || value.width < 384 || value.height < 384 || value.width % 8 !== 0 || value.height % 8 !== 0) {
      throw new Error(`Krea2 ${name} dimensions must be 8-aligned integers of at least 384 pixels`);
    }
    return value;
  };
  const stage1 = dimensions(options.stage1Size, 'stage1');
  const stage2 = dimensions(options.stage2Size, 'stage2');
  if (stage2.width < stage1.width || stage2.height < stage1.height) throw new Error('Krea2 stage2 must not be smaller than stage1');
  for (const [name, value] of [['stage1Denoise', options.stage1Denoise], ['stage2Denoise', options.stage2Denoise]]) {
    if (typeof value !== 'number' || !Number.isFinite(value) || value <= 0 || value > 1) throw new Error(`Krea2 ${name} must be greater than 0 and at most 1`);
  }
  for (const [name, value] of [['stage1Steps', options.stage1Steps], ['stage2Steps', options.stage2Steps]]) {
    if (!Number.isSafeInteger(value) || value < 1 || value > 40) throw new Error(`Krea2 ${name} must be an integer between 1 and 40`);
  }
  if (!Number.isSafeInteger(options.seed) || options.seed < 0) throw new Error('Krea2 staged seed must be a non-negative safe integer');
  const source = add('LoadImage', { image: requiredString(options.sourceFilename, 'canonical source filename') });
  const sourceScaled = add('ImageScale', { image: [source, 0], upscale_method: 'lanczos', width: stage1.width, height: stage1.height, crop: 'disabled' });
  const canonicalLatent = add('VAEEncode', { pixels: [sourceScaled, 0], vae: [vae, 0] });
  const noise1 = add('RandomNoise', { noise_seed: options.seed });
  const sigma1 = add('BasicScheduler', { scheduler: options.scheduler ?? 'beta', steps: options.stage1Steps, denoise: options.stage1Denoise, model: [model, 0] });
  const sampler1 = add('SamplerCustomAdvanced', {
    noise: [noise1, 0], guider: [guider, 0], sampler: [samplerSelect, 0], sigmas: [sigma1, 0], latent_image: [canonicalLatent, 0],
  });
  const decoded1 = add('VAEDecode', { samples: [sampler1, 0], vae: [vae, 0] });
  const highRes = add('ImageScale', { image: [decoded1, 0], upscale_method: 'lanczos', width: stage2.width, height: stage2.height, crop: 'disabled' });
  const refinedLatent = add('VAEEncode', { pixels: [highRes, 0], vae: [vae, 0] });
  const noise2 = add('RandomNoise', { noise_seed: options.seed });
  const sigma2 = add('BasicScheduler', { scheduler: options.scheduler ?? 'beta', steps: options.stage2Steps, denoise: options.stage2Denoise, model: [model, 0] });
  const sampler2 = add('SamplerCustomAdvanced', {
    noise: [noise2, 0], guider: [guider, 0], sampler: [samplerSelect, 0], sigmas: [sigma2, 0], latent_image: [refinedLatent, 0],
  });
  const decoded2 = add('VAEDecode', { samples: [sampler2, 0], vae: [vae, 0] });
  workflow[saveId].inputs.images = [decoded2, 0];
  workflow[saveId].inputs.filename_prefix = requiredString(options.filenamePrefix, 'filenamePrefix');
  delete workflow[guider].inputs.positive;
  delete workflow[guider].inputs.negative;
  const positive = add('CLIPTextEncode', { clip: [clip, 0], text: options.prompt });
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? '' });
  workflow[guider].inputs.positive = [positive, 0];
  workflow[guider].inputs.negative = [negative, 0];
  return {
    workflow,
    stages: {
      stage1: { source, sourceScaled, canonicalLatent, noise: noise1, scheduler: sigma1, sampler: sampler1, decoded: decoded1, size: stage1, denoise: options.stage1Denoise, steps: options.stage1Steps },
      stage2: { input: highRes, refinedLatent, noise: noise2, scheduler: sigma2, sampler: sampler2, decoded: decoded2, size: stage2, denoise: options.stage2Denoise, steps: options.stage2Steps },
    },
    removedResolutionNodes: nodesOf(baseline, 'ResolutionSelector').length,
  };
}

/**
 * Build the single-pass canonical latent route used for high-detail identity
 * anchors.  It keeps the source as the sampler latent origin and deliberately
 * avoids the second image decode/encode cycle used by the older two-pass
 * staging route, which can soften small mechanical edges.
 */
export function buildKrea2CanonicalSinglePassWorkflow(baseline, options) {
  const workflow = structuredClone(baseline);
  const textNodes = nodesOf(workflow, 'CLIPTextEncode');
  if (textNodes.length !== 1) throw new Error('Krea2 single-pass workflow must have exactly one text encoder');
  textNodes[0].inputs.text = requiredString(options.prompt, 'prompt');
  const saveId = singleNodeId(workflow, 'SaveImage');
  const vae = singleNodeId(workflow, 'VAELoader');
  const clip = singleNodeId(workflow, 'CLIPLoader');
  const guider = singleNodeId(workflow, 'CFGGuider');
  const samplerSelect = singleNodeId(workflow, 'KSamplerSelect');
  const model = finalStyleModelId(workflow);
  assertProductionStyleLoras(workflow);
  for (const [id, node] of Object.entries(workflow)) {
    if (['RandomNoise', 'BasicScheduler', 'SamplerCustomAdvanced', 'VAEDecode', 'EmptyLatentImage', 'ResolutionSelector', 'ConditioningZeroOut'].includes(node.class_type)) delete workflow[id];
  }
  const ids = Object.keys(workflow).map(Number).filter(Number.isSafeInteger);
  let nextId = Math.max(...ids) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };
  const source = add('LoadImage', { image: requiredString(options.sourceFilename, 'canonical source filename') });
  const scaled = add('ImageScale', {
    image: [source, 0], upscale_method: 'lanczos',
    width: options.width, height: options.height, crop: 'disabled',
  });
  const latent = add('VAEEncode', { pixels: [scaled, 0], vae: [vae, 0] });
  const noise = add('RandomNoise', { noise_seed: options.seed });
  const scheduler = add('BasicScheduler', {
    scheduler: options.scheduler ?? 'beta', steps: options.steps, denoise: options.denoise, model: [model, 0],
  });
  const sampler = add('SamplerCustomAdvanced', {
    noise: [noise, 0], guider: [guider, 0], sampler: [samplerSelect, 0], sigmas: [scheduler, 0], latent_image: [latent, 0],
  });
  const decoded = add('VAEDecode', { samples: [sampler, 0], vae: [vae, 0] });
  workflow[saveId].inputs.images = [decoded, 0];
  workflow[saveId].inputs.filename_prefix = requiredString(options.filenamePrefix, 'filenamePrefix');
  delete workflow[guider].inputs.positive;
  delete workflow[guider].inputs.negative;
  const positive = add('CLIPTextEncode', { clip: [clip, 0], text: options.prompt });
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt ?? RESTYLE_NEGATIVE });
  workflow[guider].inputs.positive = [positive, 0];
  workflow[guider].inputs.negative = [negative, 0];
  return { workflow, source, scaled, latent, noise, scheduler, sampler, decoded };
}

export function validateKrea2ProductionStyleChain(workflow, options = {}) {
  assertProductionStyleLoras(workflow, options);
  return productionStyleLoras.map(([name, strength]) => ({ name, strength }));
}

/**
 * Hard contract for the canonical latent-origin restyle path. This prevents a
 * receipt from claiming an img2img run when the source image is merely loaded
 * as an unused reference or when the baseline negative conditioning was left
 * in place.
 */
export function validateKrea2CanonicalLatentRestyle(workflow, options = {}) {
  validateKrea2ProductionStyleChain(workflow, {
    allowAuditedPostStyle: options.allowAuditedPostStyle === true,
  });
  const nodes = Object.entries(workflow);
  const one = (type) => {
    const matches = nodes.filter(([, node]) => node.class_type === type);
    if (matches.length !== 1) {
      const label = type === 'VAEEncode' ? 'VAEEncode latent origin' : type;
      throw new Error(`Krea2 canonical restyle requires exactly one ${label}`);
    }
    return matches[0];
  };
  const [, sampler] = one('SamplerCustomAdvanced');
  const [, scheduler] = one('BasicScheduler');
  const [, latentOrigin] = one('VAEEncode');
  const latentId = nodes.find(([id, node]) => node.class_type === 'VAEEncode' && sampler.inputs?.latent_image?.[0] === id)?.[0];
  if (!latentId) throw new Error('Krea2 sampler latent_image is not connected to the canonical VAEEncode');
  const loadImages = nodes.filter(([, node]) => node.class_type === 'LoadImage');
  if (loadImages.length !== 1) throw new Error('Krea2 canonical restyle requires exactly one canonical source image');
  const sourceId = loadImages[0][0];
  const encodePixels = latentOrigin.inputs?.pixels;
  if (!Array.isArray(encodePixels) || encodePixels[0] !== sourceId
    && !nodes.some(([id, node]) => node.class_type === 'ImageScale' && id === encodePixels[0])) {
    throw new Error('Krea2 canonical VAEEncode must descend from the single canonical source image');
  }
  const batchNodes = nodes.filter(([, node]) => Number(node.inputs?.batch_size) !== 1 && node.inputs?.batch_size !== undefined);
  if (batchNodes.length) throw new Error('Krea2 canonical restyle is single-image staging only; batch_size must be 1');
  if (nodes.some(([, node]) => ['Krea2EditModelPatch', 'Krea2EditGroundedEncode', 'ConditioningZeroOut'].includes(node.class_type))) {
    throw new Error('Krea2 canonical restyle forbids reference re-synthesis and zeroed negative conditioning');
  }
  if (options.structureLock === true) {
    if (nodes.some(([, node]) => ['Krea2ControlLoRALoader', 'Krea2ControlApply', 'DepthAnythingV2Preprocessor', 'VAEEncodeTiled', 'VAEDecodeTiled', 'UpscaleModelLoader', 'ImageUpscaleWithModel'].includes(node.class_type))) {
      throw new Error('Albina structure lock contains an unapproved control, tiled VAE, or pre-upscale node');
    }
    if (nodes.filter(([, node]) => node.class_type === 'LoraLoaderModelOnly').length !== productionStyleLoras.length) {
      throw new Error('Albina canonical staging structure lock permits exactly the fixed six-LoRA chain');
    }
    if (scheduler.inputs?.denoise < 0.08 || scheduler.inputs?.denoise > 0.18 || scheduler.inputs?.steps < 16 || scheduler.inputs?.steps > 28) {
      throw new Error('Albina structure lock sampling settings are outside the approved geometry-preserving range');
    }
  }
  return true;
}

export function validateKrea2StagedHighFrequencyWorkflow(workflow) {
  validateKrea2ProductionStyleChain(workflow);
  const entries = Object.entries(workflow);
  const count = (type) => entries.filter(([, node]) => node.class_type === type);
  const sources = count('LoadImage');
  const encodes = count('VAEEncode');
  const decodes = count('VAEDecode');
  const samplers = count('SamplerCustomAdvanced');
  const schedulers = count('BasicScheduler');
  if (sources.length !== 1 || encodes.length !== 2 || decodes.length !== 2 || samplers.length !== 2 || schedulers.length !== 2) {
    throw new Error('Krea2 staged high-frequency workflow must contain one source and exactly two latent refinement passes');
  }
  const [encode1, encode2] = encodes;
  const [decode1, decode2] = decodes;
  const [sampler1, sampler2] = samplers;
  if (!imageLineageContains(entries, encode1[1].inputs?.pixels, sources[0][0])) throw new Error('stage1 VAEEncode is not bound to the canonical source');
  if (sampler1[1].inputs?.latent_image?.[0] !== encode1[0]) throw new Error('stage1 sampler is not bound to canonical latent origin');
  const stage2Pixels = encode2[1].inputs?.pixels;
  const stage2Scale = stage2Pixels && entries.find(([id]) => id === stage2Pixels[0]);
  if (!stage2Scale || stage2Scale[1].class_type !== 'ImageScale' || stage2Scale[1].inputs?.image?.[0] !== decode1[0]) {
    throw new Error('stage2 VAEEncode is not bound to stage1 decoded image');
  }
  if (sampler2[1].inputs?.latent_image?.[0] !== encode2[0]) throw new Error('stage2 sampler is not bound to stage2 refined latent');
  if (entries.some(([, node]) => node.class_type === 'Krea2EditModelPatch' || node.class_type === 'Krea2EditGroundedEncode')) throw new Error('staged high-frequency route forbids alternate reference-edit branches');
  if (entries.some(([, node]) => node.class_type === 'ConditioningZeroOut')) throw new Error('staged high-frequency route requires real negative CLIP conditioning');
  if (entries.some(([, node]) => node.inputs?.batch_size !== undefined && node.inputs.batch_size !== 1)) throw new Error('staged high-frequency route is single-image only');
  if (count('LoraLoaderModelOnly').length !== productionStyleLoras.length) throw new Error('staged high-frequency route must retain exactly six style LoRAs');
  return true;
}

export function validateKrea2CanonicalSinglePassWorkflow(workflow) {
  validateKrea2ProductionStyleChain(workflow);
  const entries = Object.entries(workflow);
  const one = (type) => {
    const matches = entries.filter(([, node]) => node.class_type === type);
    if (matches.length !== 1) throw new Error(`Krea2 single-pass workflow requires exactly one ${type}`);
    return matches[0];
  };
  const source = one('LoadImage');
  const scale = one('ImageScale');
  const encode = one('VAEEncode');
  const sampler = one('SamplerCustomAdvanced');
  one('BasicScheduler');
  one('VAEDecode');
  if (scale[1].inputs?.image?.[0] !== source[0] || encode[1].inputs?.pixels?.[0] !== scale[0]) throw new Error('Krea2 single-pass source path is not canonical');
  if (sampler[1].inputs?.latent_image?.[0] !== encode[0]) throw new Error('Krea2 single-pass sampler is not bound to canonical latent origin');
  if (entries.some(([, node]) => ['Krea2EditModelPatch', 'Krea2EditGroundedEncode', 'ConditioningZeroOut'].includes(node.class_type))) throw new Error('Krea2 single-pass route contains an alternate edit branch');
  if (entries.some(([, node]) => ['ImageUpscaleWithModel', 'UpscaleModelLoader', 'VAEEncodeTiled', 'VAEDecodeTiled'].includes(node.class_type))) throw new Error('Krea2 single-pass route contains an unapproved upscale or tiled VAE branch');
  if (entries.filter(([, node]) => node.class_type === 'LoraLoaderModelOnly').length !== productionStyleLoras.length) throw new Error('Krea2 single-pass route must retain exactly six style LoRAs');
  return true;
}

function imageLineageContains(entries, link, wantedId) {
  if (!Array.isArray(link) || typeof link[0] !== 'string') return false;
  const nodes = new Map(entries);
  const visited = new Set();
  const visit = (id) => {
    if (id === wantedId) return true;
    if (visited.has(id)) return false;
    visited.add(id);
    const node = nodes.get(id);
    if (!node) return false;
    return Object.values(node.inputs ?? {}).some((value) => Array.isArray(value) && value.length >= 2 && visit(value[0]));
  };
  return visit(link[0]);
}

/**
 * Hard contract for the canonical/control route. The source must be used as
 * Reference V10 conditioning and as depth control while the sampler starts
 * from the baseline EmptyLatentImage. This is intentionally distinct from
 * validateKrea2CanonicalLatentRestyle, whose defining invariant is VAEEncode
 * -> SamplerCustomAdvanced.latent_image.
 */
export function validateKrea2CanonicalControlRestyle(workflow) {
  validateKrea2ProductionStyleChain(workflow);
  const entries = Object.entries(workflow);
  const one = (type) => {
    const matches = entries.filter(([, node]) => node.class_type === type);
    if (matches.length !== 1) throw new Error(`Krea2 canonical/control route requires exactly one ${type}`);
    return matches[0];
  };
  const sampler = one('SamplerCustomAdvanced');
  const targetLatent = one('EmptyLatentImage');
  const source = one('LoadImage');
  const guide = one('KGKrea2ImageGuideCardV10');
  const referenceEncoders = entries.filter(([, node]) => node.class_type === 'KGTextEncodeKreaImageReferencesV10');
  if (referenceEncoders.length !== 2) {
    throw new Error('Krea2 canonical/control route requires positive and negative Reference V10 encoders');
  }
  const depth = one('DepthAnythingV2Preprocessor');
  const controlEncode = one('Krea2ControlImageEncode');
  const controlApply = one('Krea2ControlApply');
  const controlLoader = one('Krea2ControlLoRALoader');
  if (sampler[1].inputs?.latent_image?.[0] !== targetLatent[0]) {
    throw new Error('Krea2 canonical/control route must sample from a fresh target EmptyLatentImage');
  }
  if (guide[1].inputs?.['Reference image']?.[0] !== source[0]) {
    throw new Error('Krea2 canonical/control route reference card is not bound to the canonical image');
  }
  if (depth[1].inputs?.image?.[0] !== source[0] || controlEncode[1].inputs?.control_image?.[0] !== depth[0]) {
    throw new Error('Krea2 canonical/control route depth branch is not bound to the canonical image');
  }
  if (controlEncode[1].inputs?.latent?.[0] !== targetLatent[0] || controlApply[1].inputs?.model?.[0] !== controlLoader[0]) {
    throw new Error('Krea2 canonical/control route control model or target latent is disconnected');
  }
  if (entries.some(([, node]) => ['VAEEncode', 'VAEEncodeTiled', 'Krea2EditModelPatch', 'Krea2EditGroundedEncode', 'ConditioningZeroOut'].includes(node.class_type))) {
    throw new Error('Krea2 canonical/control route must not use latent-origin or reference re-synthesis nodes');
  }
  if (controlLoader[1].inputs?.model?.[0] !== finalStyleModelId(workflow)) {
    throw new Error('Krea2 canonical/control depth LoRA must follow the complete six-LoRA style chain');
  }
  return true;
}

export function workflowTopology(workflow) {
  return Object.fromEntries(Object.entries(workflow).map(([id, node]) => [id, {
    class_type: node.class_type,
    inputs: Object.fromEntries(Object.entries(node.inputs ?? {}).filter(([key]) => ![
      'text', 'noise_seed', 'filename_prefix', 'aspect_ratio', 'megapixels',
    ].includes(key))),
  }]));
}

export function workflowTopologySha256(workflow) {
  return sha256(stableJson(workflowTopology(workflow)));
}

export function makeKrea2Receipt(input) {
  if (!input?.jobId || !hashPattern.test(input.promptSha256 ?? '') || !hashPattern.test(input.baselineWorkflowSha256 ?? '')
    || !hashPattern.test(input.invocationWorkflowSha256 ?? '')) {
    throw new Error('Krea2 receipt identity is incomplete');
  }
  const productionRecord = input.canonicalProduction ?? KREA2_CANONICAL_PRODUCTION_CONTRACT;
  assertKrea2CanonicalProductionContract(productionRecord.contract ?? productionRecord);
  return {
    schemaVersion: 1, provider: 'comfyui-local-krea2', model: 'redcraft23FP8_30Krea2.safetensors',
    jobId: input.jobId, status: input.status ?? 'queued', createdAt: input.createdAt ?? new Date().toISOString(),
    comfyui: { url: input.comfyUrl ?? defaultComfyUrl, version: input.comfyVersion, device: input.device },
    workflow: {
      path: input.workflowPath, baselineSha256: input.baselineWorkflowSha256,
      invocationSha256: input.invocationWorkflowSha256, topologySha256: input.topologySha256,
      invocationPath: input.invocationWorkflowPath,
      invocationFileSha256: input.invocationFileSha256,
      serialization: input.workflowSerialization ?? 'stable-json-v1',
      evidencePath: input.evidencePath,
      evidenceSha256: input.evidenceSha256,
    },
    promptSha256: input.promptSha256, prompt: input.prompt, seed: input.seed, filenamePrefix: input.filenamePrefix,
    resolution: input.resolution,
    references: {
      sentToModel: input.referencesSentToModel ?? false,
      inputs: input.referenceInputs ?? [],
      note: input.referenceNote ?? 'The verified text-to-image baseline has no image-input nodes; references are governance context only.',
    },
    canonicalProduction: input.canonicalProduction ?? getKrea2CanonicalProductionContract(),
    output: input.output ?? null, rights: { generatedOutput: 'review-required', thirdPartySourceRights: 'unverified' },
  };
}

export function recordKrea2Failure(receipt, error, options = {}) {
  if (!receipt || typeof receipt !== 'object') throw new Error('Krea2 failure receipt requires a receipt object');
  const message = error instanceof Error ? error.message : String(error);
  return {
    ...receipt,
    status: 'failed',
    failedAt: options.failedAt ?? new Date().toISOString(),
    failure: {
      kind: options.kind ?? 'comfyui-execution',
      message: message.replaceAll(/[\r\n]+/gu, ' ').trim().slice(0, 2000),
    },
  };
}

export async function enqueueKrea2Job(workflow, options = {}) {
  const comfyUrl = normalizeLocalComfyUrl(options.comfyUrl ?? defaultComfyUrl);
  const promptId = options.promptId ?? randomUUID();
  const response = await fetchComfy(`${comfyUrl}/prompt`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ prompt: workflow, client_id: options.clientId ?? randomUUID(), prompt_id: promptId }),
  }, options);
  const body = await response.json();
  if (!response.ok || body.error || body.node_errors && Object.keys(body.node_errors).length > 0) {
    throw new Error(`ComfyUI rejected prompt ${promptId}: ${JSON.stringify(body)}`);
  }
  if (typeof body.prompt_id !== 'string' || body.prompt_id.length === 0) throw new Error('ComfyUI accepted a prompt without returning its prompt_id');
  return { promptId: body.prompt_id, number: body.number, nodeErrors: body.node_errors ?? {} };
}

export async function waitForKrea2Output(promptId, options = {}) {
  const comfyUrl = normalizeLocalComfyUrl(options.comfyUrl ?? defaultComfyUrl);
  const deadline = Date.now() + (options.timeoutMs ?? 900000);
  while (Date.now() < deadline) {
    const history = await getJson(`${comfyUrl}/history/${encodeURIComponent(promptId)}`, options);
    const item = history[promptId];
    if (item) {
      const images = outputImages(item);
      if (images.length > 0) return { promptId, history: item, images };
      const status = item.status?.status_str;
      if (status === 'error') throw new Error(`ComfyUI execution failed: ${JSON.stringify(item.status)}`);
      if (status === 'success') {
        throw new Error(`ComfyUI completed without an image: ${promptId}; outputs=${Object.keys(item.outputs ?? {}).join(',')}`);
      }
    }
    await delay(options.pollMs ?? 1500);
  }
  throw new Error(`ComfyUI prompt timed out: ${promptId}`);
}

export async function downloadKrea2Image(image, destination, options = {}) {
  const params = new URLSearchParams({ filename: image.filename, subfolder: image.subfolder ?? '', type: image.type ?? 'output' });
  const response = await fetchComfy(`${normalizeLocalComfyUrl(options.comfyUrl ?? defaultComfyUrl)}/view?${params}`, {}, options);
  if (!response.ok) throw new Error(`ComfyUI image download failed: ${response.status}`);
  const bytes = Buffer.from(await response.arrayBuffer());
  await mkdir(dirname(destination), { recursive: true });
  await writeFile(destination, bytes);
  return { path: destination, bytes: bytes.length, sha256: sha256(bytes), filename: basename(destination) };
}

export async function uploadKrea2Image(sourcePath, options = {}) {
  const comfyUrl = normalizeLocalComfyUrl(options.comfyUrl ?? defaultComfyUrl);
  const bytes = await readFile(sourcePath);
  const extension = basename(sourcePath).includes('.') ? basename(sourcePath).slice(basename(sourcePath).lastIndexOf('.')) : '.png';
  const filename = options.filename ?? `albina-${sha256(bytes).slice(0, 16)}-${randomUUID()}${extension}`;
  const form = new FormData();
  form.append('image', new Blob([bytes], { type: options.mimeType ?? 'image/png' }), filename);
  form.append('overwrite', 'false');
  const response = await fetchComfy(`${comfyUrl}/upload/image`, { method: 'POST', body: form }, options);
  const body = await response.json();
  if (!response.ok || typeof body.name !== 'string' || body.name.length === 0) {
    throw new Error(`ComfyUI image upload failed: ${JSON.stringify(body)}`);
  }
  return { filename: body.subfolder ? `${body.subfolder}/${body.name}` : body.name, sha256: sha256(bytes), bytes: bytes.length };
}

export async function writeKrea2Receipt(jobId, receipt, options = {}) {
  const root = resolve(options.receiptRoot ?? receiptRoot);
  const path = resolve(root, `${safe(jobId)}.json`);
  await mkdir(dirname(path), { recursive: true });
  await writeFile(path, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
  return relative(projectRoot, path).replaceAll('\\', '/');
}

function assertVerifiedEvidence(evidence, workflowPath, workflowBytes) {
  if (evidence?.verified !== true || !sameLocalPath(evidence.workflow?.path, workflowPath) || evidence.workflow?.sha256 !== sha256(workflowBytes)) throw new Error('Krea2 baseline evidence does not match the workflow');
  if (evidence.contract?.missingRequiredNodes?.length || evidence.contract?.missingModelFiles?.length) throw new Error('Krea2 baseline has missing contract dependencies');
}

function sameLocalPath(left, right) {
  if (typeof left !== 'string' || typeof right !== 'string') return false;
  const normalize = (value) => resolve(value).replaceAll('\\\\', '/');
  const normalizedLeft = normalize(left);
  const normalizedRight = normalize(right);
  return process.platform === 'win32'
    ? normalizedLeft.toLowerCase() === normalizedRight.toLowerCase()
    : normalizedLeft === normalizedRight;
}

function nodesOf(workflow, classType) { return Object.values(workflow).filter((node) => node.class_type === classType); }
function singleNodeId(workflow, classType) {
  const ids = Object.entries(workflow).filter(([, node]) => node.class_type === classType).map(([id]) => id);
  if (ids.length !== 1) throw new Error(`Krea2 baseline must have exactly one ${classType}`);
  return ids[0];
}
function finalStyleModelId(workflow) {
  const loaders = Object.entries(workflow).filter(([, node]) => node.class_type === 'LoraLoaderModelOnly');
  const outputs = new Set(loaders.map(([id]) => id));
  for (const [, node] of loaders) {
    const source = node.inputs?.model?.[0];
    if (typeof source === 'string') outputs.delete(source);
  }
  if (outputs.size !== 1) throw new Error('Krea2 baseline must have one terminal style-LoRA model');
  return [...outputs][0];
}
function assertProductionStyleLoras(workflow, options = {}) {
  const loaders = Object.entries(workflow).filter(([, node]) => node.class_type === 'LoraLoaderModelOnly');
  const ids = new Set(loaders.map(([id]) => id));
  const start = loaders.find(([, node]) => !ids.has(node.inputs?.model?.[0]));
  if (!start) throw new Error('Krea2 baseline style-LoRA chain has no start node');
  const actual = [];
  const visited = new Set();
  let current = start;
  while (current) {
    if (visited.has(current[0])) throw new Error('Krea2 style-LoRA chain contains a cycle');
    visited.add(current[0]);
    if (Object.hasOwn(current[1].inputs ?? {}, 'strength_clip')) {
      throw new Error('Krea2 production baseline uses model-only LoRA nodes and must not carry a CLIP strength override');
    }
    actual.push([current[1].inputs?.lora_name, current[1].inputs?.strength_model]);
    const currentId = current[0];
    const nextLoaders = loaders.filter(([, node]) => node.inputs?.model?.[0] === currentId);
    if (nextLoaders.length > 1) throw new Error('Krea2 style-LoRA chain contains a branch');
    const next = nextLoaders[0];
    current = next ?? null;
  }
  if (visited.size !== loaders.length) throw new Error('Krea2 style-LoRA graph contains an orphaned LoRA node');
  const stylePrefix = actual.slice(0, productionStyleLoras.length);
  const extensions = actual.slice(productionStyleLoras.length);
  const validIdentityExtension = extensions.length === 0
    || JSON.stringify(extensions) === JSON.stringify([['krea2_identity_edit_v1_2.safetensors', 1]]);
  const validAuditedPostStyle = options.allowAuditedPostStyle === true
    && extensions.length === 1
    && typeof extensions[0][0] === 'string'
    && ['delicate-lineart-coloring-comfy.safetensors', 'detailed-manga-inkwork-comfy.safetensors', 'detail_slider_krea2_loraholic.safetensors'].includes(extensions[0][0])
    && typeof extensions[0][1] === 'number'
    && extensions[0][1] >= 0 && extensions[0][1] <= 1;
  if (JSON.stringify(stylePrefix) !== JSON.stringify(productionStyleLoras) || (!validIdentityExtension && !validAuditedPostStyle)) {
    throw new Error('Krea2 image edit must retain the exact six-LoRA production baseline');
  }
}
function outputImages(history) { return Object.values(history.outputs ?? {}).flatMap((output) => output.images ?? []); }
async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, '')); }
async function getJson(url, options) { const response = await fetchComfy(url, {}, options); if (!response.ok) throw new Error(`ComfyUI request failed: ${response.status}`); return response.json(); }
async function gatewayJson(operation, path, options = {}) {
  const config = getKrea2ComfyGatewayConfig(options.env ?? process.env);
  if (!config.enabled) return { enabled: false, status: 'disabled', operation };
  const response = await fetchComfy(`${config.url}${path}`, {}, options);
  const data = await responseData(response);
  if (!response.ok) throw new Error(`ComfyuiGW ${operation} request failed: ${response.status}`);
  return { enabled: true, operation, endpoint: path, statusCode: response.status, data };
}
async function responseData(response) {
  const text = await response.text();
  if (!text) return null;
  try { return JSON.parse(text); } catch { return text; }
}
async function fetchComfy(url, init = {}, options = {}) {
  const timeoutMs = options.requestTimeoutMs ?? 30000;
  try { return await fetch(url, { ...init, signal: AbortSignal.timeout(timeoutMs) }); }
  catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`ComfyUI request failed for ${url}: ${message}`);
  }
}
function requiredString(value, name) { if (typeof value !== 'string' || value.trim().length === 0) throw new Error(`Krea2 ${name} is required`); return value; }
function safe(value) { return value.replaceAll(/[^a-z0-9._-]/giu, '-'); }
function delay(ms) { return new Promise((resolve_) => setTimeout(resolve_, ms)); }
