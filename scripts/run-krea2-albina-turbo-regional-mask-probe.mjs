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
const output = resolve(projectRoot, 'staging/media/krea2-canonical-sample/albina-upper-body-turbo-regional-mask-six-lora-identity-edit-v1.png');
const receiptPath = output.replace(/\.png$/u, '.json');
const subjectCrop = { width: 588, height: 882, x: 0, y: 70 };
const subjectReferenceRegions = [
  { label: 'face-eyes', x: 110, y: 90, width: 370, height: 270 },
  { label: 'fringe-cable-root', x: 60, y: 0, width: 470, height: 250 },
  { label: 'chest-tailoring', x: 105, y: 350, width: 380, height: 320 },
  { label: 'mechanical-forearm', x: 350, y: 500, width: 200, height: 330 },
];
const prompt = 'One coherent adult woman upper-body visual-novel portrait. Preserve the supplied canonical subject exactly: mature cold narrow face, clearly black-and-white asymmetrical eyes, structured pale silver-grey fringe, cable-bound high ponytail with visible conduit geometry, black-and-white formal institutional tailoring with hard chest panels, and readable mechanical or prosthetic construction at the torso and forearm. Keep the original restrained authoritative expression and adult proportions. Re-render only in a dense polished Krea2 2D visual-novel treatment. Neutral background. No redesign, youthful face, natural fluffy hair, ordinary same-color anime eyes, generic dress, generic coat, text, logo, watermark, UI, extra person, extra limbs, weapon, or collage.';
const negativePrompt = 'child, loli, young girl, chibi, round baby face, idol, smile, same-color eyes, natural hair, fantasy dress, casual coat, text, logo, watermark, ui, extra person, extra limbs, collage, tiled image';
const systemPrompt = 'The source image is canonical. The regional reference mask boosts only face and eyes, cable-root hair, chest tailoring, and mechanical forearm areas. Preserve every authored identity fact in those regions and do not replace them with generic anime features. Produce a single coherent portrait.';

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
  seed: 2026081302,
  filenamePrefix: 'albina_upper_body_turbo_regional_mask_six_lora_identity_edit_v1',
  aspectRatio: '2:3 (Portrait Photo)',
  megapixels: 1,
  subjectImage: sourceUpload.filename,
  subjectCrop,
  subjectReferenceMask: 'regions',
  subjectReferenceRegions,
  subjectReferenceBoost: 12,
  fitMode: 'fit',
  groundingPixels: 1024,
  postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Turbo regional mask probe expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const receipt = {
  schemaVersion: 1,
  purpose: 'albina-upper-body-turbo-regional-identity-mask-six-lora-identity-edit-probe-v1',
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
      crop: subjectCrop,
      regions: subjectReferenceRegions,
    },
    prohibited: ['style reference', 'dual reference', 'depth control', 'failed generated image as reference'],
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
    refBoostMask: 'SolidMask + MaskComposite union of named identity regions; Krea2Edit attention bias only',
  },
  execution: {
    comfyUrl,
    promptId: queued.promptId,
    seed: 2026081302,
    experiment: 'Turbo and post-style identity-edit combined with the exact 2:3 regional attention-mask geometry previously tested under RedCraft; no other reference or control path.',
  },
  output: saved,
  acceptance: [
    'Open the canonical source and output side-by-side at 100 percent.',
    'Require all six identity anchors: mature cold adult face, black-white asymmetric eyes, cable/conduit high ponytail, black-white mechanical institutional tailoring, readable mechanical interface language, and restrained adult authoritative body language.',
    'Reject any generic silver-haired substitution, youth drift, missing anchor, anatomy defect, text, logo, watermark, collage, or unreadable composition.',
    'Run the Gemini paired visual review against the original canonical source. Its result is advisory; it cannot replace human direct-image review.',
    'This staging probe cannot promote an asset or unlock character production.',
  ],
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
