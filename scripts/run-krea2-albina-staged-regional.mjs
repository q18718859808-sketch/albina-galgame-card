import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, resolve } from 'node:path';
import {
  buildKrea2ImageEditWorkflow, buildKrea2RegionalCompositeWorkflow,
  downloadKrea2Image, enqueueKrea2Job, getKrea2StyleLoraContract,
  loadVerifiedKrea2Baseline, sha256, uploadKrea2Image,
  validateKrea2ProductionStyleChain, waitForKrea2Output, workflowTopology,
} from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const canonicalDefault = resolve(root, 'staging/research/canon-visual/wiki-game-assets/albina-unarmored-standing.png');
const outputRoot = resolve(root, 'staging/media/krea2-staged-regional/albina-canonical');
const canonicalGeometry = { width: 588, height: 1766 };
// ResolutionSelector(9:16, 1 MP, multiple 8) resolves to 768x1368.
const stageGeometry = { width: 768, height: 1368 };
function mapCanonicalRegion(region) {
  return {
    ...region,
    x: Math.round(region.x * stageGeometry.width / canonicalGeometry.width),
    y: Math.round(region.y * stageGeometry.height / canonicalGeometry.height),
    width: Math.round(region.width * stageGeometry.width / canonicalGeometry.width),
    height: Math.round(region.height * stageGeometry.height / canonicalGeometry.height),
  };
}
const regionMasks = {
  faceEye: { dimensions: stageGeometry, regions: [{ label: 'face-eyes', x: 105, y: 150, width: 380, height: 285 }, { label: 'fringe-cable-root', x: 50, y: 70, width: 490, height: 245 }].map(mapCanonicalRegion) },
  clothingMechanical: { dimensions: stageGeometry, regions: [{ label: 'chest-tailoring', x: 90, y: 405, width: 405, height: 330 }, { label: 'mechanical-forearm', x: 345, y: 565, width: 215, height: 350 }].map(mapCanonicalRegion) },
};
const stages = [
  { id: '01-canonical-preserve-base', kind: 'canonical-preserve-base', mask: null, preserveOnly: true, prompt: 'locked canonical Albina pixel base; no generative redesign is permitted', negative: 'any generated replacement, redesign, style substitution, child, loli, generic anime face, clothing change, anatomy change' },
  { id: '02-face-eye-region', kind: 'face-eye-region', mask: regionMasks.faceEye, prompt: 'regional repair of the same adult Albina: preserve the canonical mature narrow face, clearly asymmetric black-and-white eyes, structured silver-grey fringe and cable-root geometry; keep all other body silhouette unchanged, precise Krea2 visual novel rendering', negative: 'youthful face, child, loli, same-color eyes, round face, smile, natural fluffy hair, redesign, extra eyes, text, logo, watermark' },
  { id: '03-clothing-mechanical-region', kind: 'clothing-mechanical-region', mask: regionMasks.clothingMechanical, prompt: 'regional repair of the same adult Albina: preserve the canonical black-and-white institutional tailoring, hard chest panels, authored mechanical and prosthetic forearm construction, conduit interfaces and adult proportions; keep face, hair and overall silhouette unchanged, precise Krea2 visual novel rendering', negative: 'generic dress, casual coat, soft fashion outfit, missing machinery, organic arm, extra limbs, weapon, text, logo, watermark, redesign' },
  { id: '04-local-repair-mask-composite', kind: 'local-repair-mask-composite', mask: { dimensions: stageGeometry, regions: [...regionMasks.faceEye.regions, ...regionMasks.clothingMechanical.regions] }, prompt: 'final local repair of the same adult Albina only inside the supplied identity regions: correct facial anchors, asymmetric eyes, cable hair, institutional chest tailoring and mechanical forearm; preserve the canonical design and adult proportions everywhere else, one coherent polished Krea2 visual novel character', negative: 'generic anime substitution, child, loli, same-color eyes, clothing redesign, extra limbs, anatomy defects, text, logo, watermark, collage' },
];

function parseArgs(argv) {
  const execute = argv.includes('--execute');
  if (argv.some((arg) => arg === '--batch' || arg === '--all' || arg.startsWith('--ids='))) throw new Error('Staged Albina workflow is single-canonical only; batch arguments are forbidden');
  const sourceArg = argv.find((arg) => arg.startsWith('--canonical='));
  const seedArg = argv.find((arg) => arg.startsWith('--seed='));
  const stageArg = argv.find((arg) => arg.startsWith('--stage='));
  const seed = seedArg ? Number(seedArg.slice(7)) : 2026081416;
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error('Seed must be a non-negative safe integer');
  const stage = stageArg ? Number(stageArg.slice(8)) : undefined;
  if (stage !== undefined && (!Number.isSafeInteger(stage) || stage < 1 || stage > stages.length)) throw new Error(`Stage must be between 1 and ${stages.length}`);
  if (execute && stage === undefined) throw new Error('GPU execution requires exactly one --stage; continuous multi-stage execution is forbidden');
  return { execute, source: resolve(root, sourceArg?.slice(12) ?? canonicalDefault), seed, stage };
}

async function hashFile(path) {
  const bytes = await readFile(path);
  return { path, bytes: bytes.length, sha256: sha256(bytes) };
}

function hashPrompt(stage) { return sha256(`${stage.prompt}\n---NEGATIVE---\n${stage.negative}`); }

function assertCanonical(source) {
  if (resolve(source) !== canonicalDefault) throw new Error('Only the locked Albina canonical source may be used');
  if (!basename(source).toLowerCase().includes('albina')) throw new Error('Canonical source must be an Albina asset');
}

function makeWorkflow(baseline, stage, inputImage, seed, prefix, canonicalImage = inputImage) {
  if (stage.preserveOnly) throw new Error('Canonical preserve stage must not invoke ComfyUI');
  const edit = buildKrea2ImageEditWorkflow(baseline, {
    prompt: stage.prompt, negativePrompt: stage.negative,
    systemPrompt: 'Canonical Albina is the sole identity authority. Apply only the named regional mask and preserve all non-masked authored design.',
    seed, filenamePrefix: prefix, aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 1,
    subjectImage: inputImage,
    detailImage: stage.mask ? canonicalImage : undefined,
    detailReferenceBoost: stage.mask ? 4 : undefined,
    subjectReferenceMask: stage.mask ? 'regions' : 'alpha',
    subjectReferenceMaskDimensions: stage.mask?.dimensions,
    subjectReferenceRegions: stage.mask?.regions,
    subjectReferenceBoost: stage.mask ? 6 : 3, fitMode: 'fit', groundingPixels: 1024,
    postStyleIdentityEdit: { name: 'krea2_identity_edit_v1_2.safetensors', strength: 1 },
  });
  validateKrea2ProductionStyleChain(edit);
  if (!stage.mask) return edit;
  const save = Object.values(edit).find((node) => node.class_type === 'SaveImage');
  if (!save?.inputs?.images || !Array.isArray(save.inputs.images) || save.inputs.images.length !== 2) throw new Error('Regional repair workflow has no repair image output');
  return buildKrea2RegionalCompositeWorkflow({
    repairWorkflow: edit, repairImage: save.inputs.images,
    baseImage: inputImage, maskRegions: stage.mask.regions, maskDimensions: stage.mask.dimensions,
    x: 0, y: 0,
    filenamePrefix: prefix,
  });
}

async function runStage(stage, baseline, input, canonical, canonicalUpload, seed, index) {
  const prefix = `albina_staged_${String(index + 1).padStart(2, '0')}_${stage.kind}`;
  const inputUpload = await uploadKrea2Image(input.path, { filename: `${prefix}-input.png` });
  const workflow = makeWorkflow(baseline.workflow, stage, inputUpload.filename, seed + index, prefix, canonicalUpload.filename);
  const queued = await enqueueKrea2Job(workflow);
  const result = await waitForKrea2Output(queued.promptId);
  if (result.images.length !== 1) throw new Error(`${stage.id} expected exactly one image`);
  const outputPath = resolve(outputRoot, `${prefix}.png`);
  const output = await downloadKrea2Image(result.images[0], outputPath);
  const maskSpec = stage.mask ?? { kind: 'alpha-canonical-subject-mask', sourceSha256: input.sha256, dimensions: canonicalGeometry };
  const maskPath = resolve(outputRoot, 'masks', `${stage.id}.mask.json`);
  await mkdir(resolve(outputRoot, 'masks'), { recursive: true });
  await writeFile(maskPath, `${JSON.stringify(maskSpec, null, 2)}\n`, 'utf8');
  const mask = await hashFile(maskPath);
  return { stageId: stage.id, kind: stage.kind, input: { ...input, upload: inputUpload }, canonicalReference: { ...canonical, upload: canonicalUpload }, output, mask, prompt: stage.prompt, negativePrompt: stage.negative, promptSha256: hashPrompt(stage), styleLoras: getKrea2StyleLoraContract(), workflow: { sha256: sha256(JSON.stringify(workflow)), topologySha256: sha256(JSON.stringify(workflowTopology(workflow))) }, execution: { promptId: queued.promptId, seed: seed + index }, pairedReview: { status: 'pending', interface: 'GCLI Gemini paired review', referenceSha256: canonical.sha256, candidateSha256: output.sha256 }, promotion: { allowed: false, reason: 'staged canonical requires direct original-resolution review and GCLI paired review' } };
}

async function comfySnapshot() {
  try {
    const response = await fetch('http://127.0.0.1:8199/system_stats', { signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return { status: 'online', capturedAt: new Date().toISOString(), ...(await response.json()) };
  } catch (error) {
    return { status: 'offline', capturedAt: new Date().toISOString(), error: error instanceof Error ? error.message : String(error) };
  }
}

async function freeComfyModels() {
  try {
    const response = await fetch('http://127.0.0.1:8199/free', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ unload_models: true, free_memory: true }),
      signal: AbortSignal.timeout(15000),
    });
    return { status: response.ok ? 'requested' : 'failed', httpStatus: response.status, capturedAt: new Date().toISOString() };
  } catch (error) {
    return { status: 'unavailable', capturedAt: new Date().toISOString(), error: error instanceof Error ? error.message : String(error) };
  }
}

async function readManifest(path, fallback) {
  try { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, '')); }
  catch { return fallback; }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  assertCanonical(args.source);
  const source = await hashFile(args.source);
  const baseline = await loadVerifiedKrea2Baseline();
  const manifestPath = resolve(outputRoot, 'staged-regional-manifest.json');
  await mkdir(outputRoot, { recursive: true });
  const fresh = { schemaVersion: 2, purpose: 'albina-single-canonical-staged-regional-production', status: 'planned', promotion: { allowed: false }, canonical: source, geometry: { canonical: canonicalGeometry, stages: stageGeometry, aspectRatio: '9:16 (Portrait Widescreen)', megapixels: 1 }, baseline: { workflowSha256: baseline.evidence.workflow.sha256, topologySha256: baseline.evidence.runtime.topologySha256, styleLoras: getKrea2StyleLoraContract() }, stages: stages.map((stage) => ({ stageId: stage.id, kind: stage.kind, mask: stage.mask, promptSha256: hashPrompt(stage), pairedReview: { status: 'pending', interface: 'GCLI Gemini paired review' } })), receipts: [], directReview: { status: 'rejected', reason: 'Previous continuous run changed the canonical design; restart from locked canonical pixels.' } };
  const manifest = await readManifest(manifestPath, fresh);
  Object.assign(manifest, { schemaVersion: 2, canonical: source, geometry: fresh.geometry, baseline: fresh.baseline, stages: fresh.stages, promotion: { allowed: false } });
  if (args.execute) {
    const index = args.stage - 1;
    const stage = stages[index];
    const completed = new Map(manifest.receipts.map((receipt) => [receipt.stageId, receipt]));
    if (index > 0 && !completed.has(stages[index - 1].id)) throw new Error(`Stage ${args.stage} requires completed stage ${args.stage - 1}`);
    const input = index === 0 ? source : completed.get(stages[index - 1].id).output;
    const before = await comfySnapshot();
    let receipt;
    if (stage.preserveOnly) {
      receipt = { stageId: stage.id, kind: stage.kind, input: source, canonicalReference: source, output: source, prompt: stage.prompt, negativePrompt: stage.negative, promptSha256: hashPrompt(stage), styleLoras: getKrea2StyleLoraContract(), execution: { mode: 'locked-canonical-copy', seed: args.seed + index }, pairedReview: { status: 'pending', interface: 'GCLI Gemini paired review', referenceSha256: source.sha256, candidateSha256: source.sha256 }, promotion: { allowed: false, reason: 'regional repairs and direct review are incomplete' } };
    } else {
      const canonicalUpload = await uploadKrea2Image(source.path, { filename: `albina-canonical-${source.sha256.slice(0, 16)}.png` });
      receipt = await runStage(stage, baseline, input, source, canonicalUpload, args.seed, index);
    }
    receipt.runtime = { before, release: await freeComfyModels(), after: await comfySnapshot() };
    const validStageIds = new Set(stages.slice(0, index).map((item) => item.id));
    manifest.receipts = [...manifest.receipts.filter((item) => validStageIds.has(item.stageId)), receipt]
      .sort((a, b) => stages.findIndex((item) => item.id === a.stageId) - stages.findIndex((item) => item.id === b.stageId));
    manifest.status = 'awaiting-review';
    manifest.supersededContinuousRun = { status: 'rejected', reason: 'Full-body generative base changed canonical identity and was invalidated by staged preserve reset.' };
  }
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(JSON.stringify({ manifestPath, status: manifest.status, stages: manifest.stages.length, executed: args.execute }, null, 2));
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) await main();

export { canonicalGeometry, parseArgs, stageGeometry, stages, makeWorkflow, hashPrompt, freeComfyModels };
