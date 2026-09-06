#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import {
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  uploadKrea2Image,
  waitForKrea2Output,
  workflowTopologySha256,
} from './lib/krea2-comfyui.mjs';
import { buildCanonicalControlRestyleWorkflow as buildControl } from './lib/krea2-restyle.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const contract = JSON.parse(await readFile(resolve(root, 'content/media-production/albina-depth-controlled-pilot-v1.json'), 'utf8'));
const sourcePath = resolve(root, contract.source);
const outDir = resolve(root, 'staging/media/krea2-depth-controlled-pilot');
const outputPath = resolve(outDir, `${contract.jobId}.png`);
const workflowPath = resolve(outDir, `${contract.jobId}.workflow.json`);
const receiptPath = resolve(outDir, `${contract.jobId}.receipt.json`);
const queue = await fetch(`${comfyUrl}/queue`).then((r) => r.json());
if ((queue.queue_running?.length ?? 0) || (queue.queue_pending?.length ?? 0)) throw new Error('ComfyUI queue is not empty');
if (contract.prompt.length < 500 || contract.negativePrompt.length < 200) throw new Error('depth pilot prompt contract incomplete');
await mkdir(outDir, { recursive: true });
const sourceBytes = await readFile(sourcePath);
const sourceSha = sha256(sourceBytes);
const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
const upload = await uploadKrea2Image(sourcePath, { comfyUrl });
const workflow = buildControl(baseline, {
  prompt: contract.prompt,
  negativePrompt: contract.negativePrompt,
  seed: contract.seed,
  filenamePrefix: contract.jobId,
  sourceFilename: upload.filename,
  width: contract.width,
  height: contract.height,
  identityStrength: contract.identityStrength,
  promptStrength: contract.promptStrength,
  krea2Control: { kind: 'depth', strength: contract.depthStrength },
});
const nodes = Object.values(workflow);
if (nodes.filter((n) => n.class_type === 'LoraLoaderModelOnly').length !== 6) throw new Error('depth pilot lost six LoRAs');
if (nodes.filter((n) => n.class_type === 'EmptyLatentImage').length !== 1) throw new Error('depth pilot requires one fresh target latent');
if (nodes.some((n) => n.class_type === 'VAEEncode' || n.class_type === 'Krea2EditModelPatch')) throw new Error('depth pilot contains forbidden latent/edit path');
if (!nodes.some((n) => n.class_type === 'Krea2ControlApply') || !nodes.some((n) => n.class_type === 'DepthAnythingV2Preprocessor')) throw new Error('depth control branch missing');
if (!nodes.some((n) => n.class_type === 'KGKrea2ImageGuideCardV10')) throw new Error('canonical guide missing');
if (!nodes.some((n) => n.class_type === 'KGTextEncodeKreaImageReferencesV10' && n.inputs?.['Final image prompt'] === contract.prompt)) throw new Error('full prompt not bound');
await writeFile(workflowPath, `${JSON.stringify(workflow, null, 2)}\n`, 'utf8');
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl, timeoutMs: 7_200_000 });
if (result.images.length !== 1) throw new Error('depth pilot expected one image');
const output = await downloadKrea2Image(result.images[0], outputPath, { comfyUrl });
const receipt = {
  schemaVersion: 1, kind: 'krea2-reference-depth-pilot-receipt', provider: 'comfyui-local-krea2', model: 'redcraft23FP8_30Krea2.safetensors',
  jobId: contract.jobId, status: 'completed-awaiting-direct-review', profile: contract.profile,
  source: { path: relative(root, sourcePath).replaceAll('\\', '/'), sha256: sourceSha, role: 'sole-identity-structure-and-depth-source' },
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  workflow: { path: relative(root, workflowPath).replaceAll('\\', '/'), sha256: sha256(await readFile(workflowPath)), topologySha256: workflowTopologySha256(workflow) },
  prompt: { sha256: sha256(contract.prompt), text: contract.prompt, negativeSha256: sha256(contract.negativePrompt), negativeText: contract.negativePrompt },
  conditioning: { freshTargetLatent: true, guide: 'KGKrea2ImageGuideCardV10', referenceEncoders: 2, depth: 'DepthAnythingV2Preprocessor', depthStrength: contract.depthStrength },
  loraChain: nodes.filter((n) => n.class_type === 'LoraLoaderModelOnly').map((n, i) => ({ order: i + 1, name: n.inputs.lora_name, strength: n.inputs.strength_model })),
  execution: { promptId: queued.promptId, historySha256: sha256(JSON.stringify(result.history)), outputBinding: result.images[0] }, output,
  review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true, promotionAllowed: false }, rights: { generatedOutput: 'review-required', thirdPartySourceRights: 'unverified' },
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ jobId: contract.jobId, status: receipt.status, outputPath, receiptPath }, null, 2));
