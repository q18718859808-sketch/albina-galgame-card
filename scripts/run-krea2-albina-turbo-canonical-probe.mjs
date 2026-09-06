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

const projectRoot = resolve(import.meta.dirname, '..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const source = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const output = resolve(projectRoot, 'staging/media/krea2-canonical-sample/albina-unarmored-turbo-six-lora-identity-edit-v1.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const prompt = 'One coherent full-body adult woman visual-novel standing portrait, based only on the supplied canonical design source. Preserve the mature cold narrow face, clearly black-and-white asymmetrical eyes, structured pale silver-grey fringe, cable-bound high ponytail with visible conduit geometry, black-and-white formal institutional tailoring with hard collar and chest panels, and readable mechanical or prosthetic construction at the torso and forearm. Keep the original restrained authoritative expression, adult proportions, original silhouette, and grounded visible feet. Re-render solely as a dense polished Krea2 2D visual-novel illustration on a neutral background. No redesign, youthful face, natural fluffy hair, ordinary same-color anime eyes, generic dress, generic coat, text, logo, watermark, UI, extra person, extra limbs, weapon, cropped feet, cropped face, or collage.';
const negativePrompt = 'child, loli, young girl, chibi, youthful face, generic silver-haired anime girl, same-color eyes, natural hair, generic black dress, generic coat, text, logo, watermark, UI, collage, tiled panels, duplicate figure, extra limbs, malformed anatomy, cropped face, cropped feet';
const systemPrompt = 'The supplied image is the sole identity and authored design authority. Preserve its adult face, asymmetrical eyes, structured cable hair, mechanical body details, and exact black-white institutional tailoring. Produce one coherent portrait, not a collage.';

const { workflow: verifiedBaseline, evidence } = await loadVerifiedKrea2Baseline();
const baseline = structuredClone(verifiedBaseline);
const unet = Object.values(baseline).find((node) => node.class_type === 'UNETLoader');
if (!unet) throw new Error('Verified Krea2 baseline has no UNETLoader');
unet.inputs.unet_name = 'krea2_turbo_fp8_scaled.safetensors';

await mkdir(resolve(projectRoot, 'staging/media/krea2-canonical-sample'), { recursive: true });
const sourceUpload = await uploadKrea2Image(source, { comfyUrl });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt,
  negativePrompt,
  systemPrompt,
  seed: 2026081301,
  filenamePrefix: 'albina_unarmored_turbo_six_lora_identity_edit_v1',
  aspectRatio: '2:3 (Portrait Photo)',
  megapixels: 1,
  subjectImage: sourceUpload.filename,
  subjectReferenceBoost: 4,
  fitMode: 'fit',
  groundingPixels: 768,
  postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Turbo canonical probe expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-single-canonical-turbo-six-lora-identity-edit-gate-v1',
  status: 'awaiting-human-and-external-visual-review',
  createdAt: new Date().toISOString(),
  candidateBaseline: {
    sourceBaselineWorkflowSha256: evidence.workflow.sha256,
    sourceBaselineTopologySha256: evidence.runtime.topologySha256,
    model: 'krea2_turbo_fp8_scaled.safetensors',
    sampling: 'inherited verified Krea2 workflow: cfg 1, 8 steps, beta scheduler',
  },
  references: {
    canonicalSubject: {
      path: source,
      sha256: sha256(await readFile(source)),
      input: sourceUpload.filename,
      uploadedSha256: sourceUpload.sha256,
      role: 'sole canonical identity and authored design authority',
    },
    prohibited: ['style reference', 'dual reference', 'depth control', 'crop or reference mask', 'failed generated image as reference'],
  },
  prompt,
  negativePrompt,
  systemPrompt,
  styleLoraChain,
  identityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1, placement: 'after the sixth mandatory style LoRA' },
  workflow: {
    sha256: sha256(JSON.stringify(workflow)),
    topologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
    dualReferenceGrounding: false,
    controlPath: false,
  },
  execution: { comfyUrl, promptId: queued.promptId, seed: 2026081301 },
  output: saved,
  acceptance: [
    'Open the canonical source and output side-by-side at 100 percent.',
    'Require all six identity anchors: mature cold adult face, black-white asymmetric eyes, cable/conduit high ponytail, black-white mechanical institutional tailoring, readable mechanical interface language, and restrained adult authoritative body language.',
    'Reject any generic silver-haired substitution, youth drift, missing anchor, anatomy defect, text, logo, watermark, collage, or unreadable composition.',
    'Run the Gemini paired visual review against the original canonical source. Its result is advisory; it cannot replace human direct-image review.',
    'This is a staging probe only. A pass permits a new production-baseline review, not character batch production by itself.',
  ],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
