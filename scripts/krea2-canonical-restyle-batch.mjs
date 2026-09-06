#!/usr/bin/env node
/**
 * Batch Krea2 restyle of every canonical Limbus source asset used by the card.
 *
 * This file remains as a historical batch index only. The former
 * canonical-latent, low-denoise route kept outputs too close to the source and
 * is not an approved production topology. Keep the index for receipt and
 * review archaeology, but require an explicit opt-in before it can enqueue
 * anything so a stale command cannot silently republish the failed route.
 *
 * Usage:
 *   node scripts/krea2-canonical-restyle-batch.mjs --list
 *   node scripts/krea2-canonical-restyle-batch.mjs --only=albina-unarmored --execute
 *   node scripts/krea2-canonical-restyle-batch.mjs --group=characters --execute --allow-legacy-near-copy
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { ALBINA_STRUCTURE_LOCK_PROFILE, PRE_UPSCALE_MODELS, produceCanonicalRestyle, RESTYLE_NEGATIVE } from './lib/krea2-restyle.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const canonRoot = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');
const ledgerPath = resolve(stagingRoot, 'restyle-ledger-v1.json');

const PRESERVE = [
  'Krea2 production rendering of an existing authored character illustration.',
  'Keep every design element of the source exactly as drawn: proportions, silhouette, face structure, eye design and their exact left/right assignment, hair construction, every mechanical or fabric part, every colour block and its placement, pose, hands and layer order.',
  'Do not redesign, do not re-pose, do not change the costume, do not add or remove parts.',
  'Only upgrade rendering quality: dense polished linework, controlled flat colour with restrained material shading, clean specular reads, deep value separation, crisp edge definition.',
  'No text, no logo, no watermark, no UI.',
].join(' ');

const SCENE_PRESERVE = [
  'Krea2 production rendering of an existing authored scene illustration.',
  'Keep the exact composition, camera, perspective, architecture, props, character placement, poses and colour blocking of the source.',
  'Do not redesign, do not recompose, do not add or remove elements.',
  'Only upgrade rendering quality: dense polished linework, controlled flat colour with restrained material shading, coherent light direction, deep atmospheric value separation, crisp edge definition.',
  'No text, no logo, no watermark, no UI, no speech bubbles.',
].join(' ');

const SCENE_NEGATIVE = [
  'recomposed scene, different camera, different architecture, added characters, removed characters,',
  'blurry, smeared detail, melted geometry, warped perspective, duplicated structures,',
  'text, subtitles, speech bubble, logo, watermark, UI, signature',
].join(' ');

/** @type {{id:string,group:string,source:string,target:string|null,scale:number,denoise:number,seed:number,alpha:boolean,prompt:string,negative:string}[]} */
export const JOBS = [
  // characters: canonical standing art becomes the shipped portrait base
  // Albina identity plates use the higher-resolution structure-lock profile.
  // The source is small and mechanically dense; the old 1.15 scale / 16-step
  // path softened the eye and abdominal-frame linework before review.
  job({ id: 'albina-unarmored', group: 'characters', source: 'albina-unarmored-standing.png', target: 'characters/albina/normal.png', scale: 1.4, denoise: 0.12, seed: 20260816, steps: 20, structureLock: true }),
  job({ id: 'albina-armored', group: 'characters', source: 'albina-armored-standing.png', target: 'characters/albina/armored.png', scale: 1.4, denoise: 0.12, seed: 20260817, steps: 20, structureLock: true }),
  // Albina variants use the canonical standing source as the only content
  // input. Earlier AU identity-edit renders are research references only and
  // must never become a second image-conditioning source for this queue.
  variantJob('albina-combat', 'combat', 'characters/albina/combat.png', 20261001),
  variantJob('albina-endgame', 'endgame', 'characters/albina/endgame.png', 20261002),
  variantJob('albina-fascia-open', 'fascia-open', 'characters/albina/fascia-open.png', 20261003),
  variantJob('albina-furious', 'furious', 'characters/albina/furious.png', 20261004),
  variantJob('albina-golden-bough', 'golden-bough', 'characters/albina/golden-bough.png', 20261005),
  variantJob('albina-maestro', 'maestro', 'characters/albina/maestro.png', 20261006),
  variantJob('albina-rain', 'rain', 'characters/albina/rain.png', 20261007),
  variantJob('albina-ring-conspiracy', 'ring-conspiracy', 'characters/albina/ring-conspiracy.png', 20261008),
  variantJob('albina-shy', 'shy', 'characters/albina/shy.png', 20261009),
  variantJob('albina-surgical', 'surgical', 'characters/albina/surgical.png', 20261010),
  variantJob('albina-white-canvas', 'white-canvas', 'characters/albina/white-canvas.png', 20261011),
  job({ id: 'callisto', group: 'characters', source: 'callisto-standing.png', target: 'characters/callisto/normal.png', scale: 1.25, denoise: 0.42, seed: 20260818, steps: 24, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 0.75 }),
  job({ id: 'dante', group: 'characters', source: 'dante-standing.png', target: 'characters/dante/normal.png', scale: 1.40, denoise: 0.42, seed: 20260819, steps: 24, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'faust', group: 'characters', source: 'faust-standing.png', target: 'characters/faust/normal.png', scale: 1.30, denoise: 0.42, seed: 20260820, steps: 24, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'ren', group: 'characters', source: 'ren-standing.png', target: 'characters/ren/normal.png', scale: 1.35, denoise: 0.42, seed: 20260821, steps: 24, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'vergilius', group: 'characters', source: 'vergilius-standing.png', target: 'characters/vergilius/normal.png', scale: 1.40, denoise: 0.42, seed: 20260822, steps: 24, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  // auxiliary canonical assets: square story markers, logs and promotional art
  job({ id: 'albina-story-icon', group: 'auxiliary', source: 'albina-story-icon.png', target: null, scale: 2, denoise: 0.12, seed: 20260901, steps: 20, structureLock: true }),
  job({ id: 'albina-armored-story-icon', group: 'auxiliary', source: 'albina-armored-story-icon.png', target: null, scale: 2, denoise: 0.12, seed: 20260902, steps: 20, structureLock: true }),
  job({ id: 'albina-unarmored-storylog', group: 'auxiliary', source: 'albina-unarmored-storylog.png', target: null, scale: 2, denoise: 0.12, seed: 20260903, steps: 20, structureLock: true }),
  job({ id: 'albina-armored-storylog', group: 'auxiliary', source: 'albina-armored-storylog.png', target: null, scale: 2, denoise: 0.12, seed: 20260904, steps: 20, structureLock: true }),
  job({ id: 'callisto-story-icon', group: 'auxiliary', source: 'callisto-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260905, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'callisto-storylog', group: 'auxiliary', source: 'callisto-storylog.png', target: null, scale: 2, denoise: 0.30, seed: 20260906, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'dante-story-icon', group: 'auxiliary', source: 'dante-9-18-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260907, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'dante-storylog', group: 'auxiliary', source: 'dante-storylog.png', target: null, scale: 2, denoise: 0.30, seed: 20260908, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'faust-story-icon', group: 'auxiliary', source: 'faust-9-37-9-43-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260909, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'faust-storylog', group: 'auxiliary', source: 'faust-storylog.png', target: null, scale: 2, denoise: 0.30, seed: 20260910, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'ren-story-icon', group: 'auxiliary', source: 'ren-9-18-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260911, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'ren-storylog', group: 'auxiliary', source: 'ren-storylog.png', target: null, scale: 2, denoise: 0.30, seed: 20260912, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'vergilius-storylog', group: 'auxiliary', source: 'vergilius-storylog.png', target: null, scale: 2, denoise: 0.30, seed: 20260913, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'alyssa-story-icon', group: 'auxiliary', source: 'alyssa-9-37-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260914, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'sinclair-story-icon', group: 'auxiliary', source: 'sinclair-smoke-war-9-43-story-icon.png', target: null, scale: 2, denoise: 0.30, seed: 20260915, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.anime, preUpscaleInputScale: 1 }),
  job({ id: 'faust-promotional', group: 'auxiliary', source: 'faust-promotional.jpg', target: null, scale: 1, denoise: 0.32, seed: 20260916, steps: 20, structureLock: false, preUpscaleModel: PRE_UPSCALE_MODELS.sharp, preUpscaleInputScale: 1 }),
  // backgrounds
  scene('bg-lce-lab', 'backgrounds', '9-18-lce-lab-bg.png', 'bg/lce_lab.png', 1, 0.44, 20260823),
  scene('bg-ring-corridor', 'backgrounds', '9-43-ring-corridor-bg.png', 'bg/ring_corridor.png', 1, 0.44, 20260824),
  // story CG
  scene('cg-9-14-s908', 'cg', '9-14-s908.png', 'cg/canon_9_14_s908.png', 1, 0.44, 20260825),
  scene('cg-9-14-s914', 'cg', '9-14-s914.png', 'cg/canon_9_14_s914.png', 1, 0.44, 20260826),
  scene('cg-9-18-s909-1', 'cg', '9-18-s909-1.png', 'cg/canon_9_18_s909_1.png', 1, 0.44, 20260827),
  scene('cg-9-18-s909-2', 'cg', '9-18-s909-2.png', 'cg/canon_9_18_s909_2.png', 1, 0.44, 20260828),
  scene('cg-9-18-s918', 'cg', '9-18-s918.png', 'cg/canon_9_18_s918.png', 1, 0.44, 20260829),
  scene('cg-9-37-s937', 'cg', '9-37-s937.png', 'cg/canon_9_37_s937.png', 1, 0.44, 20260830),
  scene('cg-9-43-s929-1', 'cg', '9-43-s929-1.png', 'cg/canon_9_43_s929_1.png', 1, 0.44, 20260831),
  scene('cg-9-43-s929-2', 'cg', '9-43-s929-2.png', 'cg/canon_9_43_s929_2.png', 1, 0.44, 20260832),
  scene('cg-9-43-s930-1', 'cg', '9-43-s930-1.png', 'cg/canon_9_43_s930_1.png', 1, 0.44, 20260833),
  scene('cg-9-43-s930-2', 'cg', '9-43-s930-2.png', 'cg/canon_9_43_s930_2.png', 1, 0.44, 20260834),
  scene('cg-9-43-s943-1', 'cg', '9-43-s943-1.png', 'cg/canon_9_43_s943_1.png', 1, 0.44, 20260835),
  scene('cg-9-43-s943-2', 'cg', '9-43-s943-2.png', 'cg/canon_9_43_s943_2.png', 1, 0.44, 20260836),
];

function job(config) {
  if (!config || typeof config !== 'object') throw new Error('Krea2 batch job requires an object configuration');
  const {
    id, group, source, target, scale, denoise, seed,
    steps = ALBINA_STRUCTURE_LOCK_PROFILE.steps,
    structureLock = false,
    preUpscaleModel = null,
    preUpscaleInputScale = null,
    prompt = PRESERVE,
    negative = RESTYLE_NEGATIVE,
  } = config;
  if (typeof id !== 'string' || typeof group !== 'string' || typeof source !== 'string' || (target !== null && typeof target !== 'string')) throw new Error('Krea2 batch job identity is incomplete');
  if (!Number.isSafeInteger(steps) || steps < 1) throw new Error(`Invalid Krea2 steps for ${id}`);
  if (typeof structureLock !== 'boolean') throw new Error(`Invalid Krea2 structureLock for ${id}`);
  if (preUpscaleModel !== null && typeof preUpscaleModel !== 'string') throw new Error(`Invalid Krea2 preUpscaleModel for ${id}`);
  if (preUpscaleInputScale !== null && (typeof preUpscaleInputScale !== 'number' || preUpscaleInputScale <= 0)) throw new Error(`Invalid Krea2 preUpscaleInputScale for ${id}`);
  if (typeof prompt !== 'string' || prompt.trim().length < 32) throw new Error(`Invalid Krea2 prompt for ${id}`);
  if (typeof negative !== 'string' || negative.trim().length < 16) throw new Error(`Invalid Krea2 negative prompt for ${id}`);
  return { id, group, source, target, scale, denoise, seed, steps, preUpscaleModel, preUpscaleInputScale, depthControl: null, alpha: true, structureLock, prompt, negative };
}
function variantJob(id, variant, target, seed) {
  return job({
    id, group: 'albina-variants', source: 'albina-unarmored-standing.png', target,
    scale: 1.4, denoise: 0.16, seed, steps: 24, structureLock: true,
    prompt: [
      PRESERVE,
      `State variant only: ${variant}. Preserve the canonical full-body pose and component topology while changing only the restrained expression, lighting, material state and explicitly authored variant cues for this state.`,
      'The canonical image is the sole content source. Do not use AU, identity-edit, reference-image, pose-control, depth-control, crop, or secondary conditioning inputs.',
    ].join(' '),
  });
}
function scene(id, group, source, target, scale, denoise, seed) {
  return { id, group, source, target, scale, denoise, seed, steps: 20, preUpscaleModel: PRE_UPSCALE_MODELS.sharp, preUpscaleInputScale: 1, depthControl: null, alpha: false, structureLock: false, prompt: SCENE_PRESERVE, negative: SCENE_NEGATIVE };
}

function parseArgs(argv) {
  const args = { execute: false, only: null, group: null, list: false, limit: Infinity, skipCompleted: false, namespace: 'restyle_v2', allowLegacyNearCopy: false };
  for (const raw of argv) {
    const [key, value] = raw.startsWith('--') ? raw.slice(2).split('=') : [raw, undefined];
    if (key === 'execute') args.execute = true;
    else if (key === 'list') args.list = true;
    else if (key === 'only') args.only = String(value).split(',');
    else if (key === 'group') args.group = String(value);
    else if (key === 'limit') args.limit = Number.parseInt(value, 10);
    else if (key === 'skip-completed') args.skipCompleted = true;
    else if (key === 'allow-legacy-near-copy') {
      if (value !== undefined && value !== 'true') throw new Error('--allow-legacy-near-copy accepts no value (or only =true)');
      args.allowLegacyNearCopy = true;
    }
    else if (key === 'namespace' && value) args.namespace = String(value).replace(/[^a-zA-Z0-9_-]/gu, '_');
  }
  return args;
}

async function loadLedger() {
  try {
    return JSON.parse(await readFile(ledgerPath, 'utf8'));
  } catch {
    return { schemaVersion: 1, method: 'krea2-latent-origin-canonical-restyle', entries: {} };
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  let jobs = JOBS;
  if (args.group) jobs = jobs.filter((entry) => entry.group === args.group);
  if (args.only) jobs = jobs.filter((entry) => args.only.includes(entry.id));
  jobs = jobs.slice(0, args.limit);

  if (args.list || !args.execute) {
    console.log('WARNING: this is a retired near-copy topology; it is not an approved production path.');
    for (const entry of jobs) console.log(`${entry.id.padEnd(20)} ${entry.group.padEnd(12)} ${entry.source} -> ${entry.target}`);
    console.log(`${jobs.length} job(s); pass --execute to produce`);
    return;
  }

  if (!args.allowLegacyNearCopy) {
    throw new Error('Refusing to enqueue retired canonical-latent near-copy topology. Use a reviewed replacement topology; pass --allow-legacy-near-copy only for forensic reproduction.');
  }

  const ledger = await loadLedger();
  const pendingJobs = args.skipCompleted
    ? jobs.filter((entry) => ledger.entries[entry.id]?.directReview !== 'accepted'
      && ledger.entries[entry.id]?.directReview !== 'rejected')
    : jobs;
  for (const [index, entry] of pendingJobs.entries()) {
    const started = Date.now();
    console.log(`[${index + 1}/${jobs.length}] ${entry.id}`);
    const result = await produceCanonicalRestyle({
      jobId: `${args.namespace}_${entry.id.replaceAll('-', '_')}`,
      sourcePath: resolve(canonRoot, entry.source),
      stagingDir: resolve(stagingRoot, entry.group),
      prompt: entry.prompt, negativePrompt: entry.negative,
      seed: entry.seed, denoise: entry.denoise, steps: entry.steps, scale: entry.scale,
      preUpscaleModel: entry.preUpscaleModel, preUpscaleInputScale: entry.preUpscaleInputScale,
      depthControl: entry.depthControl,
      structureLock: entry.structureLock,
      timeoutMs: 7_200_000,
      preserveAlpha: entry.alpha,
    });
    ledger.entries[entry.id] = {
      group: entry.group, source: entry.source, target: entry.target,
      denoise: entry.denoise, steps: entry.steps, preUpscaleModel: entry.preUpscaleModel, preUpscaleInputScale: entry.preUpscaleInputScale, depthControl: entry.depthControl, seed: entry.seed, scale: entry.scale,
      productionEvidence: {
        contract: 'krea2-latent-origin-canonical-restyle-v2',
        canonicalContentSource: entry.source,
        canonicalOnly: entry.group === 'albina-variants',
        fixedSixLoraChainRequired: true,
        styleLoraOrder: [144, 145, 146, 147, 148, 149],
        structureLock: entry.structureLock,
        promptSha256: result.receipt.promptSha256,
        workflowSha256: result.receipt.workflow?.baselineSha256 ?? null,
        topologySha256: result.receipt.workflow?.topologySha256 ?? null,
      },
      sourceSha256: result.sourceSha256, outputSha256: result.finalSha256,
      outputPath: result.finalPath, receiptPath: result.receiptPath,
      width: result.width, height: result.height,
      alphaRestored: entry.alpha,
      directReview: 'pending',
      promotionAllowed: false,
      producedAt: new Date().toISOString(),
      elapsedMs: Date.now() - started,
    };
    await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
    console.log(`  -> ${result.finalPath} (${Math.round((Date.now() - started) / 1000)}s)`);
  }
  console.log(`ledger: ${ledgerPath}; produced=${pendingJobs.length}; skipped=${jobs.length - pendingJobs.length}`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
