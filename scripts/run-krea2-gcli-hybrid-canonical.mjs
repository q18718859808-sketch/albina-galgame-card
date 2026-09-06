import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { analyzeCanonicalImage, reviewImagePair } from './lib/gemini-visual-review.mjs';
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
const source = resolve(argument('--source') ?? resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png'));
const detailSource = resolve(root, 'staging/research/canon-visual/anchor-probes/albina-face-eye-anchor.png');
const outputRoot = resolve(root, 'staging/media/krea2-hybrid-canonical');
const variant = safeVariant(argument('--variant') ?? 'v2');
const stem = `albina-unarmored-hybrid-six-lora-${variant}`;
const output = resolve(outputRoot, `${stem}.png`);
const analysisPath = resolve(outputRoot, `${stem}.analysis.json`);
const reviewPath = resolve(outputRoot, `${stem}.external-review.json`);
const receiptPath = resolve(outputRoot, `${stem}.json`);
const designContractPath = resolve(root, 'content/media-production/albina-canonical-design-contract-v1.json');
const designContract = JSON.parse((await readFile(designContractPath, 'utf8')).replace(/^\uFEFF/u, ''));
const designRequirements = designContract.designAnchors.map(({ id, requirement }) => `${id}: ${requirement}`).join('\n');
const fallbackPrompt = `STRICT FULL-CANVAS REDRAW of the supplied unmirrored canonical adult Albina standing sprite. The source image controls identity, silhouette, component topology, image-side assignments, pose and proportions. In image coordinates, the image-left eye is the white-light structure, the image-right eye is the black-dark structure, and the rear cable bundle extends toward image-right before folding back. Horizontal mirroring is forbidden. Render one complete standalone character, never an inset, patch, collage or source-image composite. Apply the complete locked Krea2 six-LoRA production finish only to line quality, material rendering, controlled flat color and restrained shading. Preserve every requirement exactly:\n${designRequirements}\nKeep the extremely tall slender body, crossed mechanical arms, open abdominal frame and feet visible at the same dominant full-canvas occupancy as the canonical source. Use a plain neutral background with no text. This is a faithful Krea2-style rendering of the original authored design, not a redesign or reinterpretation.`;
const fallbackNegative = 'child, loli, youthful round face, generic anime girl, beauty-face substitution, ordinary heterochromia, swapped eye value sides, natural fluffy ponytail, costume redesign, dress, skirt, coat, closed abdomen, organic arms, altered crossed-arm pose, altered proportions, extra limbs, bad hands, cropped feet, inset image, pasted patch, collage, seam, text, logo, watermark, UI';

await mkdir(outputRoot, { recursive: true });
const analysis = process.env.GCLI_API_KEY
  ? await analyzeCanonicalImage({ imagePath: source })
  : { schemaVersion: 1, status: 'deferred-no-runtime-key', source: { path: source, sha256: sha256(await readFile(source)) }, analysis: '' };
await writeFile(analysisPath, `${JSON.stringify(analysis, null, 2)}\n`, 'utf8');
const prompt = validatedPrompt(extractSection(analysis.analysis, 'PRESERVE_PROMPT'), fallbackPrompt, ['adult', 'eye', 'cable', 'mechanical', 'abdomen']);
const negativePrompt = validatedPrompt(extractSection(analysis.analysis, 'NEGATIVE_PROMPT'), fallbackNegative, ['child', 'generic', 'eye', 'costume', 'watermark']);
const { workflow: baseline, evidence } = await loadVerifiedKrea2Baseline();
const uploaded = await uploadKrea2Image(source, { comfyUrl });
const detailUploaded = await uploadKrea2Image(detailSource, { comfyUrl });
const workflow = buildKrea2ImageEditWorkflow(baseline, {
  prompt,
  negativePrompt,
  systemPrompt: 'The supplied canonical image is the sole authority for character identity, adult age, eyes, hair or cable structure, prosthetics, clothing, anatomy, pose, silhouette, and composition. Preserve all visible authored design facts. The complete six-LoRA chain controls only the final Krea2 production rendering treatment.',
  seed: Number(argument('--seed') ?? 2026081401),
  filenamePrefix: `albina_hybrid_canonical_six_lora_${variant}`,
  aspectRatio: '9:16 (Portrait Widescreen)',
  megapixels: 1,
  targetSize: { width: 512, height: 1536 },
  subjectImage: uploaded.filename,
  subjectCompositeBackground: { width: 588, height: 1766, color: 0xf2f0ec },
  subjectReferenceMask: 'alpha',
  detailImage: detailUploaded.filename,
  detailReferenceBoost: Number(argument('--detail-boost') ?? 2),
  krea2Control: { kind: 'depth', strength: Number(argument('--depth-strength') ?? 1) },
  postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
  subjectReferenceBoost: Number(argument('--reference-boost') ?? 5),
  fitMode: 'fit',
  groundingPixels: 1024,
});
const styleLoraChain = validateKrea2ProductionStyleChain(workflow);
const queued = await enqueueKrea2Job(workflow, { comfyUrl });
const result = await waitForKrea2Output(queued.promptId, { comfyUrl });
if (result.images.length !== 1) throw new Error(`Hybrid canonical run expected one image, received ${result.images.length}`);
const saved = await downloadKrea2Image(result.images[0], output, { comfyUrl });
const externalReview = process.env.GCLI_API_KEY
  ? await reviewImagePair({ referencePath: source, candidatePath: output })
  : { schemaVersion: 1, status: 'deferred-no-runtime-key', promotion: 'prohibited-until-external-and-direct-review' };
await writeFile(reviewPath, `${JSON.stringify(externalReview, null, 2)}\n`, 'utf8');
const [analysisBytes, reviewBytes] = await Promise.all([readFile(analysisPath), readFile(reviewPath)]);
const receipt = {
  schemaVersion: 1,
  purpose: 'formal canonical Albina hybrid img2img plus text-guided Krea2 six-LoRA production gate',
  status: 'awaiting-direct-image-review',
  createdAt: new Date().toISOString(),
  baseline: { workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 },
  source: { path: source, sha256: sha256(await readFile(source)), uploadedSha256: uploaded.sha256, role: 'canonical identity, design, structure, and composition authority' },
  detailSource: { path: detailSource, sha256: sha256(await readFile(detailSource)), uploadedSha256: detailUploaded.sha256, role: 'canonical face and eye-detail authority cropped from the same source design' },
  designContract: { path: designContractPath, sha256: sha256(await readFile(designContractPath)), anchors: designContract.designAnchors.map(({ id }) => id) },
  promptSource: analysis.status,
  prompt,
  promptSha256: sha256(prompt),
  negativePrompt,
  negativePromptSha256: sha256(negativePrompt),
  styleLoraChain,
  workflow: {
    sha256: sha256(JSON.stringify(workflow)),
    topologySha256: sha256(JSON.stringify(workflowTopology(workflow))),
    identityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1, placement: 'after exact six-LoRA style chain' },
    structureControl: { kind: 'depth', strength: Number(argument('--depth-strength') ?? 1), source: 'canonical full-body image' },
    targetSize: { width: 512, height: 1536, aspectRatio: '1:3', purpose: 'direct full-canvas latent matching the canonical tall-body composition' },
    outputComposition: 'direct complete Krea2 render; no post-generation ImageCompositeMasked or inset paste',
  },
  execution: { comfyUrl, promptId: queued.promptId, seed: Number(argument('--seed') ?? 2026081401) },
  output: saved,
  reviews: {
    canonicalAnalysis: { path: analysisPath, sha256: sha256(analysisBytes), responseSha256: sha256(analysis.analysis ?? '') },
    externalPairedReview: { path: reviewPath, sha256: sha256(reviewBytes), status: externalReview.status },
    directImageReviewRequired: true,
  },
  promotionAllowed: false,
};
await writeFile(receiptPath, `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));

function argument(name) {
  const index = process.argv.indexOf(name);
  const value = index < 0 ? undefined : process.argv[index + 1];
  return value?.startsWith('--') ? undefined : value;
}

function extractSection(text, heading) {
  if (typeof text !== 'string' || !text.trim()) return undefined;
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/gu, '\\$&');
  const match = text.match(new RegExp(`(?:^|\\n)${escaped}\\s*:?\\s*([\\s\\S]*?)(?=\\n[A-Z][A-Z_]+\\s*:|$)`, 'u'));
  return match?.[1]?.trim() || undefined;
}

function safeVariant(value) {
  if (!/^[a-z0-9][a-z0-9_-]{0,31}$/iu.test(value)) throw new Error('--variant must be a short alphanumeric staging identifier');
  return value;
}

function validatedPrompt(value, fallback, requiredAnchors) {
  if (typeof value !== 'string') return fallback;
  const normalized = value.trim();
  if (normalized.length < 40 || normalized.length > 2400) return fallback;
  const lower = normalized.toLowerCase();
  return requiredAnchors.every((anchor) => lower.includes(anchor)) ? normalized : fallback;
}
