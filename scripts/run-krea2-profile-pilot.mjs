#!/usr/bin/env node
/**
 * One-image Krea2 profile pilot.
 *
 * The default mode is graph-only and never touches ComfyUI. `--execute` is
 * deliberately explicit, serial, and staging-only. Every route is dispatched
 * through the profile adapter; an unimplemented candidate cannot fall back to
 * the historical six-LoRA graph.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import {
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  makeKrea2Receipt,
  sha256,
  stableJson,
  uploadKrea2Image,
  waitForKrea2Output,
  workflowTopologySha256,
  writeKrea2Receipt,
} from './lib/krea2-comfyui.mjs';
import {
  getKrea2ProfileAdapter,
  loadKrea2ProfileAdapterContract,
  buildKrea2ProfileWorkflow,
} from './lib/krea2-profile-adapter.mjs';
import { bindKrea2ProfileToReceipt } from './lib/krea2-routing.mjs';

const root = resolve(import.meta.dirname, '..');
const designContract = JSON.parse(await readFile(
  resolve(root, 'content/media-production/albina-canonical-design-contract-v1.json'),
  'utf8',
));
const args = process.argv.slice(2);
const profileId = value('--profile') ?? 'baseline-six-lora';
const jobId = safe(value('--job-id') ?? `krea2-profile-pilot-${profileId}`);
const prompt = value('--prompt') ?? 'A precise original 2D visual-novel render with controlled industrial linework and material separation.';
const negativePrompt = value('--negative') ?? 'text, logo, watermark, blur, crop, inset, redesign, extra limbs, childlike proportions';
const seed = integer('--seed', 2026082501);
// ComfyUI latent dimensions must be 8-aligned; the canonical 588x1766 source
// is uploaded as reference data, while this pilot renders on an aligned target.
const width = integer('--width', 592);
const height = integer('--height', 1768);
const execute = args.includes('--execute');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const sourcePath = value('--source') ? resolve(value('--source')) : undefined;
const stagingDir = resolve(value('--staging-dir') ?? `staging/media/krea2-profile-pilots/${jobId}`);

const stylePath = value('--style-source') ? resolve(value('--style-source')) : undefined;
if (sourcePath && !['krea2-edit-grounded', 'albina-canonical-control', 'albina-embedded-canonical-control', 'albina-reference-style', 'albina-edit-detail-pass', 'albina-community-style-transfer', 'albina-community-dype-raw', 'albina-community-two-stage'].includes(profileId)) {
  throw new Error(`Profile ${profileId} does not accept a canonical source in this pilot runner`);
}
if (['krea2-edit-grounded', 'albina-canonical-control', 'albina-embedded-canonical-control', 'albina-reference-style', 'albina-edit-detail-pass', 'albina-community-style-transfer', 'albina-community-dype-raw', 'albina-community-two-stage'].includes(profileId) && !sourcePath) {
  throw new Error(`Profile ${profileId} requires --source`);
}
if (profileId === 'albina-reference-style' && !stylePath) {
  throw new Error('Profile albina-reference-style requires --style-source');
}
if (profileId === 'albina-community-style-transfer' && !stylePath) {
  throw new Error('Profile albina-community-style-transfer requires --style-source');
}

const adapter = await loadKrea2ProfileAdapterContract();
const profile = getKrea2ProfileAdapter(adapter, profileId);
if (profile.implementationStatus !== 'implemented') {
  throw new Error(`Krea2 profile ${profileId} is ${profile.implementationStatus}; no pilot graph is registered`);
}
// All Albina production pilots use the user-supplied embedded PNG workflow.
// Historical baselines remain research evidence and must never be selected by
// an implicit fallback from a character profile.
const baseline = await loadVerifiedKrea2Baseline({
  workflowPath: resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline.api.json'),
  evidencePath: resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
});
await mkdir(stagingDir, { recursive: true });

let uploaded;
let uploadedStyle;
let sourceSha256;
let styleSha256;
if (sourcePath) {
  sourceSha256 = sha256(await readFile(sourcePath));
  if (sourceSha256 !== designContract.authority.sha256) {
    throw new Error(`Canonical source SHA-256 mismatch: ${sourceSha256}`);
  }
}
if (execute && sourcePath) {
  uploaded = await uploadKrea2Image(sourcePath, { comfyUrl });
  if (uploaded.sha256 !== sourceSha256) {
    throw new Error('ComfyUI upload hash does not match the canonical source hash');
  }
}
if (stylePath) {
  styleSha256 = sha256(await readFile(stylePath));
  if (execute) uploadedStyle = await uploadKrea2Image(stylePath, { comfyUrl });
}
const sourceFilename = uploaded?.filename ?? (sourcePath ? basename(sourcePath) : undefined);
const styleFilename = uploadedStyle?.filename ?? (stylePath ? basename(stylePath) : undefined);
const builderOptions = {
  prompt,
  negativePrompt,
  systemPrompt: 'Preserve the supplied canonical design exactly. Apply rendering treatment only.',
  seed,
  filenamePrefix: jobId,
  aspectRatio: height >= width ? '9:16 (Portrait Widescreen)' : '16:9 (Widescreen)',
  megapixels: 1,
  ...(sourceFilename ? { subjectImage: sourceFilename, sourceFilename } : {}),
  ...(styleFilename ? { styleFilename } : {}),
  ...(profileId === 'krea2-edit-grounded' ? {
    postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
    cfg: 3,
    steps: 20,
    denoise: 1,
    samplerName: 'euler',
    groundingPixels: 1024,
    subjectReferenceBoost: 4,
    fitMode: 'fit',
  } : {}),
  ...(profileId === 'albina-edit-detail-pass' ? {
    baseRoute: 'raw-krea2',
    postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
    postStyleLora: { name: 'detailed-manga-inkwork-comfy.safetensors', strength: 0.35 },
    cfg: 3,
    steps: 20,
    denoise: 1,
    samplerName: 'euler',
    groundingPixels: 1024,
    subjectReferenceBoost: 3.5,
    fitMode: 'fit',
  } : {}),
  ...(profileId === 'albina-community-style-transfer' ? {
    styleImage: styleFilename,
    styleStrength: 1,
    refKStrength: 1.06,
    lowScaleEnd: 1.1,
    cfg: 1,
    steps: 8,
    samplerName: 'euler',
    baseRoute: 'raw-krea2',
  } : {}),
  ...(profileId === 'albina-community-dype-raw' ? {
    baseRoute: 'raw-krea2',
    cfg: 1,
    steps: 8,
    samplerName: 'euler',
    dypeMethod: 'vision_yarn',
    dypeBaseResolution: 1328,
    dypeScale: 2,
    dypeExponent: 1,
  } : {}),
  ...(profileId === 'albina-community-two-stage' ? {
    baseRoute: 'raw-krea2',
    cfg: 1,
    steps: 8,
    samplerName: 'euler',
    handoffPercent: 25,
    stage1Steps: 16,
    stage1Cfg: 3,
    stage1SamplerName: 'euler',
    stage1Scheduler: 'beta',
    stage2Steps: 8,
    stage2Cfg: 1,
    stage2SamplerName: 'euler',
    stage2Scheduler: 'beta',
  } : {}),
  width,
  height,
  targetSize: { width, height },
};
if (profileId === 'albina-canonical-control' || profileId === 'albina-embedded-canonical-control') {
  builderOptions.denoise = 0.24;
  builderOptions.steps = 20;
  builderOptions.identityStrength = 0.92;
  builderOptions.krea2Control = { kind: 'depth', strength: 0.45 };
}
if (profileId === 'albina-reference-style') {
  builderOptions.identityStrength = 0.84;
  builderOptions.styleStrength = 0.42;
}
const { workflow } = buildKrea2ProfileWorkflow(adapter, profileId, baseline.workflow, builderOptions);
const workflowPath = resolve(stagingDir, `${jobId}.workflow.json`);
await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
const workflowBytes = await readFile(workflowPath);
const receiptInputs = [
  ...(sourcePath ? [{
    path: relative(root, sourcePath).replaceAll('\\', '/'), role: 'canonical-source',
    sha256: sourceSha256, uploadedToComfy: Boolean(uploaded), comfyFilename: uploaded?.filename ?? null,
  }] : []),
  ...(stylePath ? [{
    path: relative(root, stylePath).replaceAll('\\', '/'), role: 'style-only-reference',
    sha256: styleSha256, uploadedToComfy: Boolean(uploadedStyle), comfyFilename: uploadedStyle?.filename ?? null,
  }] : []),
];
let receipt = bindKrea2ProfileToReceipt(makeKrea2Receipt({
  jobId,
  status: execute ? 'submitting' : 'dry-run',
  comfyUrl,
  comfyVersion: baseline.evidence.comfyui?.version,
  device: baseline.evidence.comfyui?.device,
  workflowPath: baseline.workflowPath,
  baselineWorkflowSha256: baseline.evidence.workflow.sha256,
  invocationWorkflowSha256: sha256(stableJson(workflow)),
  topologySha256: workflowTopologySha256(workflow),
  invocationWorkflowPath: relative(root, workflowPath).replaceAll('\\', '/'),
  workflowSerialization: 'stable-json-v1',
  evidencePath: baseline.evidencePath,
  evidenceSha256: sha256(await readFile(baseline.evidencePath)),
  promptSha256: sha256(prompt),
  prompt,
  seed,
  filenamePrefix: jobId,
  resolution: { width, height },
  referenceInputs: receiptInputs,
}), profile);
receipt.pilot = {
  execute,
  sourcePath: sourcePath ? relative(root, sourcePath).replaceAll('\\', '/') : null,
  sourceSha256: sourceSha256 ?? null,
  canonicalAuthoritySha256: designContract.authority.sha256,
  workflowSha256: sha256(workflowBytes),
};
receipt.references = {
  sentToModel: Boolean(execute && uploaded),
  graphBound: Boolean(sourcePath && workflowHasCanonicalLatentOrigin(workflow, sourceFilename)),
  bindings: ['albina-canonical-control', 'albina-embedded-canonical-control'].includes(profileId) ? {
    canonicalSource: true,
    referenceV10: Boolean(sourcePath),
    depthControl: Boolean(sourcePath),
    vaeLatentOrigin: Boolean(sourcePath && workflowHasCanonicalLatentOrigin(workflow, sourceFilename)),
    uploadedToComfy: Boolean(execute && uploaded),
  } : profileId === 'albina-reference-style' ? {
    canonicalSubject: true,
    styleOnlyReference: true,
    styleReferenceFinalDetailsOnly: true,
    styleReferenceCannotGuideShape: true,
    uploadedToComfy: Boolean(execute && uploadedStyle),
  } : null,
  inputs: receipt.references?.inputs ?? receiptInputs,
  note: sourcePath
    ? (execute && uploaded
      ? 'Canonical source was uploaded and bound to the profile-specific reference, depth, and latent-origin graph; direct visual review remains mandatory.'
      : 'Canonical source is graph-bound for dry-run inspection but was not uploaded or sent to ComfyUI; direct visual review remains mandatory after execution.')
    : 'No image reference was supplied for this text-to-image pilot.',
};

function workflowHasCanonicalLatentOrigin(graph, filename) {
  if (!filename) return false;
  const source = Object.entries(graph).find(([, node]) => node.class_type === 'LoadImage' && node.inputs?.image === filename)?.[0];
  const scale = Object.entries(graph).find(([, node]) => node.class_type === 'ImageScale' && node.inputs?.image?.[0] === source)?.[0];
  const encode = Object.entries(graph).find(([, node]) => node.class_type === 'VAEEncode' && node.inputs?.pixels?.[0] === scale)?.[0];
  return Boolean(encode && Object.values(graph).some((node) => node.class_type === 'SamplerCustomAdvanced'
    && node.inputs?.latent_image?.[0] === encode));
}

if (execute) {
  const queue = await fetch(`${comfyUrl}/queue`).then((response) => response.json());
  if ((queue.queue_running?.length ?? 0) > 0 || (queue.queue_pending?.length ?? 0) > 0) {
    throw new Error('ComfyUI queue is not empty; refusing a concurrent pilot');
  }
  try {
    const queued = await enqueueKrea2Job(workflow, { comfyUrl });
    const result = await waitForKrea2Output(queued.promptId, { comfyUrl, timeoutMs: 7_200_000 });
    if (result.images.length !== 1) throw new Error(`Pilot expected one image, got ${result.images.length}`);
    const outputPath = resolve(stagingDir, `${jobId}.png`);
    const output = await downloadKrea2Image(result.images[0], outputPath, { comfyUrl });
    receipt.status = 'completed-awaiting-direct-review';
    receipt.execution = { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), outputBinding: result.images[0] };
    receipt.output = output;
  } catch (error) {
    receipt.status = 'failed';
    receipt.failure = { message: error instanceof Error ? error.message : String(error) };
    await writeKrea2Receipt(jobId, receipt, { receiptRoot: stagingDir });
    throw error;
  }
}

const receiptPath = await writeKrea2Receipt(jobId, receipt, { receiptRoot: stagingDir });
console.log(JSON.stringify({ jobId, profileId, implementationStatus: profile.implementationStatus, status: receipt.status, workflowPath: relative(root, workflowPath), receiptPath }, null, 2));

function value(name) {
  const index = args.indexOf(name);
  if (index < 0) return undefined;
  const result = args[index + 1];
  if (!result || result.startsWith('--')) throw new Error(`${name} requires a value`);
  return result;
}
function integer(name, fallback) {
  const raw = value(name);
  const result = raw === undefined ? fallback : Number(raw);
  if (!Number.isSafeInteger(result) || result < 0) throw new Error(`${name} must be a non-negative integer`);
  return result;
}
function safe(value_) {
  if (!/^[a-z0-9][a-z0-9._-]{0,95}$/iu.test(value_)) throw new Error('--job-id must be filesystem-safe');
  return value_;
}
