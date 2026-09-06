#!/usr/bin/env node
/**
 * One-image Krea2 pilot: fresh latent plus the canonical image as the sole
 * identity/structure condition. The six production LoRAs remain untouched.
 * This is staging-only and never promotes an output.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import {
  buildKrea2ReferenceConditioningWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopologySha256,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const contract = JSON.parse(await readFile(resolve(root, 'content/media-production/albina-reference-conditioned-pilot-v1.json'), 'utf8'));
const sourcePath = resolve(root, contract.source);
const stagingDir = resolve(root, 'staging/media/krea2-reference-conditioned-pilot');
const outputPath = resolve(stagingDir, `${contract.jobId}.png`);
const workflowPath = resolve(stagingDir, `${contract.jobId}.workflow.json`);
const receiptPath = resolve(stagingDir, `${contract.jobId}.receipt.json`);

if (contract.profile !== 'krea2-reference-conditioned-fresh-latent-v1') throw new Error('reference-conditioned pilot profile mismatch');
if (contract.prompt.length < 400 || !contract.prompt.includes('sole identity and structural authority')) throw new Error('reference-conditioned pilot prompt contract is incomplete');
if (contract.negativePrompt.length < 200) throw new Error('reference-conditioned pilot negative prompt contract is incomplete');
const queue = await fetch(`${comfyUrl}/queue`).then((response) => response.json());
if ((queue.queue_running?.length ?? 0) > 0 || (queue.queue_pending?.length ?? 0) > 0) throw new Error('ComfyUI queue is not empty; refusing a second GPU job');

await mkdir(stagingDir, { recursive: true });
const sourceBytes = await readFile(sourcePath);
const sourceSha = sha256(sourceBytes);
const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
const uploaded = await uploadKrea2Image(sourcePath, { comfyUrl });
const workflow = buildKrea2ReferenceConditioningWorkflow(baseline, {
  prompt: contract.prompt,
  negativePrompt: contract.negativePrompt,
  seed: contract.seed,
  filenamePrefix: contract.jobId,
  targetSize: contract.targetSize,
  subjectImage: uploaded.filename,
  identityStrength: contract.identityStrength,
});
validateKrea2ProductionStyleChain(workflow);
const nodes = Object.values(workflow);
if (nodes.filter((node) => node.class_type === 'LoraLoaderModelOnly').length !== 6) throw new Error('pilot lost the six-LoRA chain');
if (nodes.filter((node) => node.class_type === 'KGrea2ImageGuideCardV10' || node.class_type === 'KGKrea2ImageGuideCardV10').length !== 1) throw new Error('pilot lacks canonical image guide');
if (nodes.filter((node) => node.class_type === 'KGTextEncodeKreaImageReferencesV10').length !== 2) throw new Error('pilot lacks paired reference conditioning');
if (nodes.some((node) => node.class_type === 'VAEEncode')) throw new Error('fresh-latent pilot must not use canonical VAEEncode as latent origin');
const positive = nodes.find((node) => node.class_type === 'KGTextEncodeKreaImageReferencesV10' && node.inputs?.['Final image prompt'] === contract.prompt);
if (!positive) throw new Error('full positive prompt is not bound to the reference conditioning node');
await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl, timeoutMs: 7_200_000 });
if (result.images.length !== 1) throw new Error('reference-conditioned pilot must produce exactly one image');
const saved = await downloadKrea2Image(result.images[0], outputPath, { comfyUrl });
const workflowBytes = await readFile(workflowPath);
const receipt = {
  schemaVersion: 1,
  kind: 'krea2-reference-conditioned-pilot-receipt',
  provider: 'comfyui-local-krea2',
  model: 'redcraft23FP8_30Krea2.safetensors',
  jobId: contract.jobId,
  status: 'completed-awaiting-direct-review',
  profile: contract.profile,
  source: { path: relative(root, sourcePath).replaceAll('\\', '/'), sha256: sourceSha, role: 'sole-identity-and-structure-authority' },
  uploadedCanonical: { filename: uploaded.filename, sha256: uploaded.sha256 },
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  workflow: { path: relative(root, workflowPath).replaceAll('\\', '/'), sha256: sha256(workflowBytes), topologySha256: workflowTopologySha256(workflow) },
  prompt: { sha256: sha256(contract.prompt), text: contract.prompt, negativeSha256: sha256(contract.negativePrompt), negativeText: contract.negativePrompt },
  conditioning: { freshTargetLatent: true, identityStrength: contract.identityStrength, canonicalOnly: true, guide: 'KGKrea2ImageGuideCardV10', encoders: 2 },
  loraChain: nodes.filter((node) => node.class_type === 'LoraLoaderModelOnly').map((node, index) => ({ order: index + 1, name: node.inputs.lora_name, strength: node.inputs.strength_model })),
  execution: { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), outputBinding: result.images[0] },
  output: saved,
  review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true, promotionAllowed: false },
  rights: { generatedOutput: 'review-required', thirdPartySourceRights: 'unverified' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId: contract.jobId, status: receipt.status, outputPath, receiptPath }, null, 2));
