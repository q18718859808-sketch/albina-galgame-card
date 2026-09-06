import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  buildKrea2Workflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  sha256,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const workflowPath = resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
const outputPath = resolve(root, 'staging', 'media', 'krea2-baseline-proof', 'krea2-corrected-baseline-proof.png');
const seed = 2026081101;
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const baseline = JSON.parse(await readFile(workflowPath, 'utf8'));
const chain = validateKrea2ProductionStyleChain(baseline);
const workflow = buildKrea2Workflow(baseline, {
  prompt: [
    'Original visual-novel illustration test frame, empty industrial transit platform in rain.',
    'Precise 2D linework, cool white and charcoal architecture, restrained old gold and warning-red practical lights.',
    'No people, text, logo, watermark, UI, signage, readable symbols, or licensed character likeness.',
  ].join(' '),
  seed,
  filenamePrefix: 'albina_krea2_corrected_baseline_proof',
  aspectRatio: '16:9 (Widescreen)',
  megapixels: 2,
});

await mkdir(resolve(root, 'staging', 'media', 'krea2-baseline-proof'), { recursive: true });
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Corrected baseline proof expected one image, received ${result.images.length}`);
const output = await downloadKrea2Image(result.images[0], outputPath, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'corrected-krea2-six-lora-baseline-proof',
  status: 'awaiting-human-image-review',
  createdAt: new Date().toISOString(),
  comfyUrl,
  promptId: queued.promptId,
  seed,
  workflowPath,
  workflowSha256: sha256(await readFile(workflowPath)),
  invocationTopologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
  styleLoraChain: chain,
  output,
  nextStep: 'Read the PNG. Only after image review succeeds, run build_verified_krea2_baseline.py with this proof PNG while ComfyUI is online.',
};
const receiptPath = outputPath.replace(/\.png$/u, '.json');
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
