import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  buildKrea2Workflow, downloadKrea2Image, enqueueKrea2Job, loadVerifiedKrea2Baseline,
  sha256, waitForKrea2Output,
} from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const root = resolve(projectRoot, 'staging/media/krea2-au-character-anchor');
const prompt = [
  'Original 2D industrial dark-fantasy visual-novel character design, full-body standing portrait, isolated on a transparent-friendly plain charcoal studio backdrop.',
  'An original adult heroine with an ivory ceramic prosthetic body, thin charcoal joint seams, asymmetric black-and-pale eyes, pale ash thread-like ponytail, and a white, muted yellow, and restrained gold artisan armor silhouette.',
  'Her folded mechanical forearm tools suggest precision craft rather than a copied weapon; poised calm expression, readable three-quarter pose, clean separated silhouette, boot tips fully visible.',
  'Precise ink linework, controlled flat color, restrained painterly shading, cold white industrial rim light with minimal warning-red accents.',
  'This is an original AU asset anchor. Do not recreate a published character, game costume, source image, logo, watermark, text, interface, or a living artist style. No extra limbs, no duplicate hands, no cropped feet.',
].join('\n');

const baseline = await loadVerifiedKrea2Baseline();
await mkdir(root, { recursive: true });
const workflow = buildKrea2Workflow(baseline.workflow, {
  prompt, seed: 2026080913, filenamePrefix: 'albina_au_character_anchor', aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 1.0,
});
const queued = await enqueueKrea2Job(workflow);
const result = await waitForKrea2Output(queued.promptId);
if (result.images.length !== 1) throw new Error(`Expected one AU character anchor, got ${result.images.length}`);
const output = await downloadKrea2Image(result.images[0], resolve(root, 'albina-au-anchor.png'));
const receipt = {
  schemaVersion: 1,
  provider: 'comfyui-local-krea2', status: 'awaiting-review',
  purpose: 'original AU character anchor candidate; local review only',
  createdAt: new Date().toISOString(), prompt, promptSha256: sha256(prompt), seed: 2026080913,
  workflow: { baselinePath: baseline.workflowPath, baselineSha256: baseline.evidence.workflow.sha256, invocationSha256: sha256(JSON.stringify(workflow)) },
  references: { sentToModel: false, inputs: [], note: 'No source-game image, user style-board, or external reference was sent to the model.' },
  output: { ...output, history: result.history },
  rights: { generatedOutput: 'review-required', publicRelease: 'prohibited-until-originality-and-rights-review' },
};
await writeFile(resolve(root, 'albina-au-anchor.json'), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(receipt, null, 2));
