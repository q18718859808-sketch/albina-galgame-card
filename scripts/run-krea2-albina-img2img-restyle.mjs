#!/usr/bin/env node
/**
 * Krea2 canonical restyle through true low-denoise latent img2img.
 *
 * Every earlier Albina probe used Krea2EditModelPatch reference boosting and was
 * rejected for losing the authored design topology (asymmetric mechanical eyes,
 * segmented hair plates, image-right conduit bundle, open abdominal frame,
 * crossed mechanical forearms, long black/white lower-body partition).
 *
 * This path keeps the canonical pixels as the sampling origin: the canonical
 * PNG is composited over a neutral field, scaled to an 8-aligned production
 * size, VAE-encoded, and fed to SamplerCustomAdvanced as `latent_image` with a
 * partial denoise. The six-LoRA production style chain is untouched, so the
 * output is Krea2 rendering applied to the original design rather than a
 * re-imagined character.
 */
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';

import {
  buildKrea2Workflow,
  downloadKrea2Image,
  enqueueKrea2Job,
  loadVerifiedKrea2Baseline,
  makeKrea2Receipt,
  recordKrea2Failure,
  sha256,
  stableJson,
  uploadKrea2Image,
  validateKrea2ProductionStyleChain,
  waitForKrea2Output,
  workflowTopologySha256,
} from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');

const PROMPT = [
  'Krea2 production rendering of an existing authored character illustration.',
  'Keep every design element of the source exactly as drawn: the adult, extremely slender and vertically elongated proportions, the long narrow mature face, the asymmetric mechanical eyes with a bright white-light aperture on image-left and a dark black aperture on image-right, the pale rigid segmented hair plates, the thick conduit bundle leaving the head toward image-right and folding back, the white hard shell plates over black inner mechanical construction, the open abdominal frame with visible structural members, the crossed mechanical forearms in front of the waist, and the long narrow black lower-body structure with white panel partitions.',
  'Do not redesign, do not restyle the silhouette, do not close the abdominal frame, do not convert armour into clothing.',
  'Only upgrade rendering quality: dense polished linework, controlled flat colour with restrained material shading, clean specular reads on the white shell, deep value separation in the black inner structure, crisp edge definition, plain neutral studio background.',
  'No text, no logo, no watermark, no UI.',
].join(' ');

const NEGATIVE = [
  'child, loli, chibi, round face, oversized eyes, generic anime beauty face,',
  'symmetric ordinary irises, mirrored eye assignment, fluffy natural ponytail,',
  'dress, skirt, coat, corset, bare skin, closed abdomen, organic arms, fused arms,',
  'extra limbs, bad hands, broken joints, cropped feet, inset, collage, duplicated figure,',
  'text, logo, watermark, UI, signature',
].join(' ');

function parseArgs(argv) {
  const args = { denoise: 0.42, seed: 20260816, steps: 8, scale: 1.25, execute: false, label: 'v1' };
  for (const raw of argv) {
    const [key, value] = raw.startsWith('--') ? raw.slice(2).split('=') : [raw, undefined];
    if (key === 'execute') args.execute = true;
    else if (key === 'denoise') args.denoise = Number(value);
    else if (key === 'seed') args.seed = Number.parseInt(value, 10);
    else if (key === 'steps') args.steps = Number.parseInt(value, 10);
    else if (key === 'scale') args.scale = Number(value);
    else if (key === 'label') args.label = String(value);
    else if (key === 'source') args.source = String(value);
  }
  if (!Number.isFinite(args.denoise) || args.denoise <= 0 || args.denoise >= 1) {
    throw new Error('denoise must be between 0 and 1 exclusive; a full denoise discards the canonical design');
  }
  if (!Number.isSafeInteger(args.steps) || args.steps < 4 || args.steps > 40) throw new Error('steps must be between 4 and 40');
  return args;
}

function align8(value) {
  return Math.max(384, Math.round(value / 8) * 8);
}

/**
 * Wire true img2img: replace the sampler latent origin with a VAE encode of the
 * canonical pixels and lower the scheduler denoise. The LoRA chain, model,
 * CLIP, guider and sampler selection stay exactly as the verified baseline.
 */
function buildRestyleWorkflow(baseline, options) {
  const workflow = buildKrea2Workflow(baseline, {
    prompt: options.prompt,
    seed: options.seed,
    filenamePrefix: options.filenamePrefix,
    targetSize: { width: options.width, height: options.height },
  });
  validateKrea2ProductionStyleChain(workflow);

  const idOf = (classType) => {
    const ids = Object.entries(workflow).filter(([, node]) => node.class_type === classType).map(([id]) => id);
    if (ids.length !== 1) throw new Error(`restyle workflow needs exactly one ${classType}`);
    return ids[0];
  };
  const vae = idOf('VAELoader');
  const sampler = idOf('SamplerCustomAdvanced');
  const scheduler = idOf('BasicScheduler');
  const clip = idOf('CLIPLoader');
  const guider = idOf('CFGGuider');
  const zeroOut = idOf('ConditioningZeroOut');

  let nextId = Math.max(...Object.keys(workflow).map(Number).filter(Number.isSafeInteger)) + 1;
  const add = (class_type, inputs) => {
    const id = String(nextId++);
    workflow[id] = { class_type, inputs };
    return id;
  };

  const source = add('LoadImage', { image: options.sourceFilename });
  const scaled = add('ImageScale', {
    image: [source, 0], upscale_method: 'lanczos',
    width: options.width, height: options.height, crop: 'disabled',
  });
  const encoded = add('VAEEncode', { pixels: [scaled, 0], vae: [vae, 0] });
  workflow[sampler].inputs.latent_image = [encoded, 0];
  workflow[scheduler].inputs.denoise = options.denoise;
  workflow[scheduler].inputs.steps = options.steps;

  // A real negative prompt replaces the zeroed-out conditioning so the design
  // guards above are actually enforced instead of silently dropped.
  const negative = add('CLIPTextEncode', { clip: [clip, 0], text: options.negativePrompt });
  workflow[guider].inputs.negative = [negative, 0];
  delete workflow[zeroOut];
  return workflow;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const sourcePath = resolve(args.source ?? resolve(
    projectRoot, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png',
  ));
  const flatPath = resolve(stagingRoot, `albina-canonical-flat-${args.label}.png`);
  await mkdir(stagingRoot, { recursive: true });

  const { spawnSync } = await import('node:child_process');
  const flatten = spawnSync('python', ['-c', [
    'import sys',
    'from PIL import Image',
    'src, dst = sys.argv[1], sys.argv[2]',
    "im = Image.open(src).convert('RGBA')",
    "bg = Image.new('RGBA', im.size, (34, 34, 38, 255))",
    'bg.alpha_composite(im)',
    "bg.convert('RGB').save(dst)",
    'print(im.size[0], im.size[1])',
  ].join('\n'), sourcePath, flatPath], { encoding: 'utf8' });
  if (flatten.status !== 0) throw new Error(`canonical flatten failed: ${flatten.stderr}`);
  const [srcWidth, srcHeight] = flatten.stdout.trim().split(/\s+/u).map(Number);
  const width = align8(srcWidth * args.scale);
  const height = align8(srcHeight * args.scale);

  const sourceBytes = await readFile(sourcePath);
  const { workflow: baseline, workflowPath, evidencePath } = await loadVerifiedKrea2Baseline();
  const baselineSha = sha256(await readFile(workflowPath));
  const upload = await uploadKrea2Image(flatPath);

  const filenamePrefix = `albina_canonical_restyle_${args.label}`;
  const workflow = buildRestyleWorkflow(baseline, {
    prompt: PROMPT, negativePrompt: NEGATIVE, seed: args.seed, steps: args.steps,
    denoise: args.denoise, width, height, filenamePrefix, sourceFilename: upload.filename,
  });
  const invocationSha = sha256(stableJson(workflow));
  const topologySha = workflowTopologySha256(workflow);

  const plan = {
    schemaVersion: 1,
    purpose: 'albina-canonical-krea2-restyle-true-img2img',
    method: 'canonical pixels VAE-encoded as the sampler latent origin with partial denoise; six-LoRA production chain unchanged',
    canonicalSource: { path: sourcePath, sha256: sha256(sourceBytes), width: srcWidth, height: srcHeight },
    flattenedInput: { path: flatPath, comfyFilename: upload.filename, sha256: upload.sha256 },
    target: { width, height, denoise: args.denoise, steps: args.steps, seed: args.seed },
    styleChain: validateKrea2ProductionStyleChain(workflow),
    workflow: { baselineSha256: baselineSha, invocationSha256: invocationSha, topologySha256: topologySha },
    prompt: PROMPT, negativePrompt: NEGATIVE,
    promotionAllowed: false,
    status: args.execute ? 'queued' : 'plan-only',
  };
  const planPath = resolve(stagingRoot, `${filenamePrefix}.json`);
  await writeFile(planPath, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
  console.log(`plan: ${planPath}`);
  console.log(`target: ${width}x${height} denoise=${args.denoise} steps=${args.steps} seed=${args.seed}`);
  if (!args.execute) return;

  const receipt = makeKrea2Receipt({
    jobId: filenamePrefix, promptSha256: sha256(PROMPT), baselineWorkflowSha256: baselineSha,
    invocationWorkflowSha256: invocationSha, topologySha256: topologySha, workflowPath,
    prompt: PROMPT, seed: args.seed, filenamePrefix,
    workflowSerialization: 'stable-json-v1', evidencePath,
    evidenceSha256: sha256(await readFile(evidencePath)),
    resolution: { width, height },
    referenceInputs: [{
      role: 'canonical-latent-origin',
      file: basename(sourcePath),
      path: relative(projectRoot, sourcePath).replaceAll('\\', '/'),
      sha256: plan.canonicalSource.sha256,
    }],
    referencesSentToModel: true,
  });
  try {
    const { promptId } = await enqueueKrea2Job(workflow);
    const result = await waitForKrea2Output(promptId, { timeoutMs: 1200000 });
    const outputPath = resolve(stagingRoot, `${filenamePrefix}.png`);
    const output = await downloadKrea2Image(result.images[0], outputPath);
    plan.status = 'produced';
    plan.output = output;
    receipt.status = 'completed';
    receipt.output = output;
    await writeFile(planPath, `${JSON.stringify(plan, null, 2)}\n`, 'utf8');
    await writeFile(resolve(stagingRoot, `${filenamePrefix}.receipt.json`), `${JSON.stringify(receipt, null, 2)}\n`, 'utf8');
    console.log(`output: ${output.path} sha256=${output.sha256}`);
  } catch (error) {
    const failed = recordKrea2Failure(receipt, error);
    await writeFile(resolve(stagingRoot, `${filenamePrefix}.receipt.json`), `${JSON.stringify(failed, null, 2)}\n`, 'utf8');
    throw error;
  }
}

await main();
