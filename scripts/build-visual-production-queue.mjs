#!/usr/bin/env node
/**
 * Build the dual-pipeline visual production queue for Albina v2.
 *
 * This is a scheduling artifact, not a production command: no image is
 * generated and nothing is promoted. The queue records how every plan-v2
 * image job is assigned across the two live pipelines, which blank assets
 * (manifest records without provenance/rights) are handed to Latent
 * text-to-image, and which reference-editing jobs stay on WisArt.
 *
 * Reference mapping (verified against content/asset-manifest-v2.json):
 *   plan job.assetId          = portrait.albina.combat   (semantic id)
 *   plan job.receiptAssetId   = file.characters.albina.combat.png (fileId(path))
 *   manifest asset id         = file.characters.albina.combat.png (match)
 *   plan job.path             = characters/albina/combat.png
 *   manifest asset.path       = characters/albina/combat.png
 *   cg/bg jobs map directly:  cg.araya_rooftop -> cg.araya_rooftop
 *
 * Latent constraint (from https://latent.moe/openapi.json):
 *   POST /api/generate is pure text-to-image; no reference/init image input.
 *   resolution enum: square 1024x1024, portrait 920x1536, landscape 1536x920.
 *   Therefore every Latent-assigned job must run in text-generation mode with
 *   zero reference dependencies (validatePrompt enforces this) and its
 *   identity anchor must be textual (identityBootstrap / characterBible /
 *   positivePrompt prose) instead of a reference image.
 *
 * Style-migration constraint (why characters never go to Latent):
 *   The card's art-style baseline is the user-provided reference image, and it
 *   reaches production only through the de-identified style board
 *   (reference.user.albina-style-board), which every reference-edit prompt
 *   carries as its final input. A portrait routed to Latent loses that input
 *   entirely, so it can never be migrated to the baseline style. Character
 *   portraits are exactly the assets that migration targets, so all 27 of them
 *   stay on WisArt and Latent keeps only the 22 blank CG jobs.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const planPath = resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json');
const promptPath = resolve(projectRoot, 'content/media-production/visual-prompts-v2.json');
const manifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const canonSourcesPath = resolve(projectRoot, 'content/media-production/canon-visual-sources-v1.json');
const outputPath = resolve(projectRoot, 'content/media-production/visual-production-queue-v2.json');

const [plan, prompts, manifest, canonSources] = await Promise.all([
  readJson(planPath), readJson(promptPath), readJson(manifestPath), readJson(canonSourcesPath),
]);

if (plan.version !== 2 || plan.counts?.imageJobs !== 67 || plan.imageJobs?.length !== 67) throw new Error('Invalid visual rebuild plan');
if (prompts.version !== 2 || prompts.prompts?.length !== 67) throw new Error('Invalid visual prompt freeze');
if (manifest.version !== 2 || !Array.isArray(manifest.assets)) throw new Error('Invalid asset manifest');
if (canonSources.version !== 1 || !Array.isArray(canonSources.assets)) throw new Error('Invalid canon visual source index');

const promptByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
const manifestById = new Map(manifest.assets.map((asset) => [asset.id, asset]));
const imageAssets = manifest.assets.filter((asset) => asset.kind === 'image');

/** A manifest image record is "blank" when it carries no provenance and no rights contract. */
function isBlankManifestAsset(asset) {
  return !asset.provenance && !asset.rights;
}

const blankByReceipt = new Map();
for (const asset of imageAssets) {
  if (isBlankManifestAsset(asset)) blankByReceipt.set(asset.id, asset);
}

const blankCg = [...blankByReceipt.values()].filter((asset) => asset.id.startsWith('cg.')).map((asset) => asset.id).sort();
const blankCharacters = [...blankByReceipt.values()]
  .filter((asset) => asset.id.startsWith('file.characters.')).map((asset) => asset.id).sort();

/**
 * The dual-pipeline queue is a retired Latent-era scheduling artifact.
 *
 * rc.3 delivered all 67 jobs through the WisArt migration pipe, so the
 * manifest no longer carries any blank CG records and the "22 Latent split"
 * premise can never hold again. The committed queue is kept as an audit
 * record; regenerating it would silently rewrite history, so refuse loudly
 * instead of emitting a queue that contradicts the delivered manifest.
 */
if (blankCg.length === 0 && blankCharacters.length === 0) {
  throw new Error(
    'build-visual-production-queue.mjs is retired: rc.3 delivered every visual through WisArt, '
    + 'the manifest has no blank CG/character records left, and the dual-pipeline '
    + 'Latent/WisArt split no longer exists. The committed '
    + 'content/media-production/visual-production-queue-v2.json is the historical audit record.',
  );
}
if (blankCg.length !== 22) throw new Error(`Expected 22 blank CG assets, found ${blankCg.length}`);
if (blankCharacters.length !== 23) throw new Error(`Expected 23 blank character assets, found ${blankCharacters.length}`);

/** A canon recap CG job targets an asset not present in the manifest. */
const canonRecapJobs = new Set(
  plan.imageJobs.filter((job) => job.category === 'cg' && job.assetId.startsWith('cg.canon_recap_')).map((job) => job.id),
);
if (canonRecapJobs.size !== 6) throw new Error(`Expected 6 canon recap CG jobs, found ${canonRecapJobs.size}`);

function latentResolutionForJob(job) {
  if (job.category === 'characters') return 'portrait';
  if (job.category === 'cg' || job.category === 'bg') return 'landscape';
  return 'square';
}

function isCanonProvenance(asset) {
  return asset?.provenance?.provider === 'comfyui-local-krea2' || asset?.provenance?.provider === 'wisart-openai-compatible'
    || asset?.provenance?.provider === 'latent-moe';
}

/**
 * Blank CG jobs go to Latent; every character portrait stays on WisArt.
 *
 * The card's style baseline is the user-provided reference image, consumed in
 * production as the de-identified style board
 * (reference.user.albina-style-board, final input of every reference-edit job).
 * Latent is pure text-to-image with no image input at all, so a portrait routed
 * there cannot receive the style board and cannot be migrated to the baseline
 * style. Character portraits are exactly the assets where that migration is
 * required, so they must keep the reference-edit pipeline even when their
 * manifest record is still blank.
 */
function assignedProvider(job) {
  if (canonRecapJobs.has(job.id)) return 'wisart-openai-compatible'; // canon recap keeps reference editing
  if (job.category === 'characters') return 'wisart-openai-compatible'; // style-board migration requires an image input
  const manifestAsset = job.receiptAssetId ? manifestById.get(job.receiptAssetId) : undefined;
  if (manifestAsset && isBlankManifestAsset(manifestAsset)) return 'latent-moe';
  if (manifestAsset && isCanonProvenance(manifestAsset)) return 'wisart-openai-compatible';
  if (job.category === 'bg') return 'wisart-openai-compatible';
  // Unreachable guard: any job that does not map to a manifest record or a
  // known non-blank bucket must fail loudly instead of silently choosing a pipe.
  throw new Error(`Unclassifiable visual job: ${job.id} (assetId=${job.assetId}, receiptAssetId=${job.receiptAssetId}, path=${job.path})`);
}

const assignments = [];
const counts = { total: 0, wisart: 0, latent: 0, blankCg: 0, blankCharacters: 0, canonRecap: 0 };
const latentCharacterBootstrap = new Map(); // jobId -> identity anchor kind

for (const job of [...plan.imageJobs].sort((left, right) => left.id.localeCompare(right.id))) {
  const prompt = promptByJob.get(job.id);
  if (!prompt) throw new Error(`Missing frozen prompt for ${job.id}`);
  const provider = assignedProvider(job);
  const manifestAsset = job.receiptAssetId ? manifestById.get(job.receiptAssetId) : undefined;
  const isBlank = Boolean(manifestAsset && isBlankManifestAsset(manifestAsset));
  const isRecap = canonRecapJobs.has(job.id);
  const inputMode = provider === 'latent-moe' ? 'text-generation' : prompt.mode;
  const generationSize = provider === 'latent-moe' ? latentResolutionForJob(job) : job.generationSize;

  let identityAnchor = null;
  if (provider === 'latent-moe' && job.category === 'characters') {
    if (prompt.identityBootstrap) identityAnchor = { kind: 'identityBootstrap', textual: true, requiresHumanIdentityApproval: prompt.identityBootstrap.requiresHumanIdentityApproval ?? true };
    else if (prompt.identitySubjects?.some((subject) => ['albina', 'protagonist'].includes(subject))) identityAnchor = { kind: 'characterBible', textual: true, pointer: `#/characterBible/${prompt.identitySubjects[0]}` };
    else identityAnchor = { kind: 'promptProse', textual: true, note: 'positivePrompt is a self-contained identity description; no reference image input is available on Latent' };
    latentCharacterBootstrap.set(job.id, identityAnchor.kind);
  }

  let referenceDependencies = {
    referenceJobIds: prompt.referenceJobIds ?? [],
    referenceSourceIds: prompt.referenceSourceIds ?? [],
  };
  const referenceCount = referenceDependencies.referenceJobIds.length + referenceDependencies.referenceSourceIds.length;
  if (provider === 'latent-moe' && referenceCount > 0) {
    // Latent cannot consume reference images; the queue records the stripped
    // reference contract so a future text-generation prompt freeze can be
    // authored without touching the frozen albina-visual-v2 file.
    referenceDependencies = { referenceJobIds: [], referenceSourceIds: [], strippedForLatent: referenceCount };
  }

  assignments.push({
    jobId: job.id,
    assetId: job.assetId,
    receiptAssetId: job.receiptAssetId,
    path: job.path,
    category: job.category,
    provider,
    model: provider === 'latent-moe' ? 'latent-moe-async' : 'gpt-image-2',
    inputMode,
    generationSize,
    delivery: job.delivery,
    blankAsset: isBlank,
    canonRecap: isRecap,
    manifestAssetId: manifestAsset?.id ?? null,
    ...(identityAnchor ? { identityAnchor } : {}),
    referenceDependencies,
    promptVersion: 'albina-visual-v2',
    status: job.status,
  });
  counts.total += 1;
  // The blank-asset split is a property of the manifest record, not of the pipe:
  // the 23 blank character portraits are still blank after being routed to
  // WisArt, so they must keep being counted.
  if (isBlank) {
    if (job.category === 'cg') counts.blankCg += 1;
    else if (job.category === 'characters') counts.blankCharacters += 1;
  }
  if (provider === 'latent-moe') {
    counts.latent += 1;
  } else {
    counts.wisart += 1;
    if (isRecap) counts.canonRecap += 1;
  }
}

if (counts.total !== 67) throw new Error(`Unexpected queue surface: ${counts.total}`);
if (counts.latent !== 22) throw new Error(`Expected 22 Latent jobs, found ${counts.latent}`);
if (counts.wisart !== 45) throw new Error(`Expected 45 WisArt jobs, found ${counts.wisart}`);
if (counts.blankCg !== 22 || counts.blankCharacters !== 23) throw new Error(`Blank asset split mismatch: cg=${counts.blankCg} characters=${counts.blankCharacters}`);

// Cross-check: no character portrait may be routed to Latent, because Latent
// cannot receive the style board that carries the baseline art style.
const latentCharacters = assignments.filter((a) => a.category === 'characters' && a.provider === 'latent-moe');
if (latentCharacters.length > 0) {
  throw new Error(`Character portraits must stay on the reference-edit pipe: ${latentCharacters.map((a) => a.jobId).join(', ')}`);
}
// Cross-check: every Latent job is a blank CG record.
const latentNonBlankCg = assignments.filter((a) => a.provider === 'latent-moe' && (a.category !== 'cg' || !a.blankAsset));
if (latentNonBlankCg.length > 0) {
  throw new Error(`Latent must only carry blank CG jobs: ${latentNonBlankCg.map((a) => a.jobId).join(', ')}`);
}

// Cross-check: the 4 non-blank character jobs are exactly the krea2-provenance records.
const nonBlankCharacters = assignments.filter((a) => a.category === 'characters' && !a.blankAsset).map((a) => a.assetId).sort();
const expectedNonBlank = ['portrait.albina.armored', 'portrait.albina.normal', 'portrait.ren.normal', 'portrait.vergilius.normal'];
if (JSON.stringify(nonBlankCharacters) !== JSON.stringify(expectedNonBlank)) {
  throw new Error(`Non-blank character assignment mismatch: ${JSON.stringify(nonBlankCharacters)}`);
}

const queue = {
  schemaVersion: 2,
  id: 'albina-visual-production-queue-v2',
  generatedAt: '2026-09-01T14:27:41.401Z',
  method: 'manifest-provenance-rights-dual-pipeline-allocation',
  policy: {
    krea2LocalProductionCancelled: true,
    dualPipeline: true,
    pipelines: {
      wisart: { provider: 'wisart-openai-compatible', model: 'gpt-image-2', role: 'reference-edit', baseUrl: 'https://wisart.kuaileshifu.com/v1' },
      latent: {
        provider: 'latent-moe', model: 'latent-moe-async', role: 'text-to-image', baseUrl: 'https://latent.moe',
        serialGeneration: true, noReferenceInput: true, resolutions: { square: '1024x1024', portrait: '920x1536', landscape: '1536x920' },
      },
    },
    frozenPlan: 'content/media-production/visual-rebuild-v2.json',
    frozenPrompts: 'content/media-production/visual-prompts-v2.json',
    noAutomaticProduction: true,
    noAutomaticPromotion: true,
    humanIdentityApprovalRequired: false,
    note: '人工身份授权已由项目所有者明确取消。Latent carries the 22 blank CG jobs only and runs from a text-generation prompt freeze (references stripped, identity anchored in text). Every character portrait stays on WisArt reference-edit so it can consume reference.user.albina-style-board and be migrated to the baseline art style. The frozen albina-visual-v2 file is not modified by this queue.',
  },
  counts,
  blankAssets: { cg: blankCg, characters: blankCharacters },
  assignments,
};

await writeFile(outputPath, `${JSON.stringify(queue, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({
  outputPath: 'content/media-production/visual-production-queue-v2.json',
  total: counts.total,
  latent: counts.latent,
  wisart: counts.wisart,
  blankCg: counts.blankCg,
  blankCharacters: counts.blankCharacters,
  canonRecap: counts.canonRecap,
  latentIdentityAnchors: Object.fromEntries(latentCharacterBootstrap),
}, null, 2));

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}
