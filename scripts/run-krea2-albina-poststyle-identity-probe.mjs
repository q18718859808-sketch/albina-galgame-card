import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2ImageEditWorkflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  sha256,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const source = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const output = resolve(root, 'staging/media/krea2-canonical-sample/albina-upper-body-poststyle-identity-six-lora-v1.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const subjectCrop = { width: 588, height: 990, x: 0, y: 70 };
const identityEdit = { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 };
const prompt = 'One coherent adult woman upper-body visual-novel portrait. Preserve this canonical subject exactly: a mature cold narrow face, unmistakable black-and-white asymmetrical eyes, structured pale silver-grey fringe, cable-bound high ponytail construction, black-and-white formal tailoring with readable collar and chest panels, and visible mechanical or prosthetic construction integrated into the torso or forearm. Maintain the original authoritative expression and adult proportions. Re-render only in a polished dense Krea2 2D visual-novel illustration treatment. Neutral light background. No redesign, beauty retouch, youthful face, natural-hair substitution, ordinary anime eyes, casual black dress, text, logo, watermark, UI, extra person, extra limbs, weapon, cropped face, or collage.';
const negativePrompt = 'child, loli, young girl, chibi, round baby face, smiling idol, normal same-color anime eyes, natural fluffy ponytail, fantasy dress, casual coat, text, logo, watermark, ui, extra person, extra limbs, collage, tiled image';
const systemPrompt = 'The original canonical crop is the sole authority for identity and authored design. The post-style identity edit extension exists only to preserve that source after the complete six-LoRA Krea2 production style chain. Preserve the adult face, asymmetrical eyes, structured fringe, cable hair construction, formal black-and-white tailoring, and mechanical body language exactly. Do not substitute generic anime features.';

const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
await mkdir(resolve(root, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt, negativePrompt, systemPrompt, seed: 2026081206,
  filenamePrefix: 'albina_upper_body_poststyle_identity_six_lora_v1', aspectRatio: '2:3 (Portrait Photo)', megapixels: 1,
  subjectImage: sourceUpload.filename, subjectCrop, postStyleIdentityEdit: identityEdit, subjectReferenceBoost: 4,
  fitMode: 'fit', groundingPixels: 1024,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Albina post-style identity probe expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-upper-body-post-style-identity-edit-probe-six-lora',
  status: 'awaiting-human-visual-review',
  createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  references: {
    canonicalSource: {
      path: source, sha256: sha256(await readFile(source)), input: sourceUpload.filename, uploadedSha256: sourceUpload.sha256,
      role: 'sole canonical identity and authored design authority', crop: subjectCrop,
    },
  },
  prompt,
  negativePrompt,
  systemPrompt,
  styleLoraChain,
  workflow: {
    sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
    dualReferenceGrounding: false,
    postStyleIdentityEdit: {
      ...identityEdit,
      placement: 'immediately after the intact terminal six-LoRA production chain and before Krea2EditModelPatch',
    },
  },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081206, experiment: 'post-style identity-edit compatibility probe; not a production asset' },
  output: saved,
  acceptance: [
    'Read the image beside the original unarmored standing canonical at 100 percent.',
    'Pass only if an adult Albina is immediately recognizable through mature cold face, black-white asymmetric eyes, cable ponytail, formal black-white tailoring, and mechanical construction.',
    'This staging probe never promotes an asset; a pass only permits an independently reviewed full-body canonical gate.',
  ],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
