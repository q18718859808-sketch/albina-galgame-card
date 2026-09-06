import { readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import {
  loadVerifiedKrea2Baseline, makeKrea2Receipt, enqueueKrea2Job,
  waitForKrea2Output, downloadKrea2Image, recordKrea2Failure, sha256, stableJson, workflowTopologySha256, writeKrea2Receipt,
} from './lib/krea2-comfyui.mjs';
import { assertKrea2CharacterProductionGate } from './lib/krea2-delivery.mjs';
import {
  bindKrea2ProfileToReceipt,
} from './lib/krea2-routing.mjs';
import {
  buildKrea2ProfileWorkflow,
  loadKrea2ProfileAdapterContract,
  getKrea2ProfileAdapter,
} from './lib/krea2-profile-adapter.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const args = process.argv.slice(2);
const requestedIds = optional('--ids')?.split(',').map((id) => id.trim()).filter(Boolean) ?? [];
const allBackgrounds = args.includes('--all-backgrounds');
const allImages = args.includes('--all-images');
const execute = args.includes('--execute');
const force = args.includes('--force');
const profileId = optional('--profile') ?? 'albina-embedded-image-baseline';
const allowResearch = args.includes('--allow-research');
const baseline = await loadVerifiedKrea2Baseline({
  workflowPath: resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline.api.json'),
  evidencePath: resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
});
const adapter = await loadKrea2ProfileAdapterContract();
const productionProfile = getKrea2ProfileAdapter(adapter, profileId);
if (productionProfile.implementationStatus !== 'implemented') {
  throw new Error(`Krea2 profile ${profileId} is ${productionProfile.implementationStatus}; refusing to execute without an explicit workflow builder`);
}
if (allowResearch && productionProfile.implementationStatus === 'research-only') {
  throw new Error(`--allow-research cannot turn a non-executable Krea2 profile into a production workflow: ${profileId}`);
}
const prompts = await readJson(resolve(projectRoot, 'content/media-production/visual-prompts-v2.json'));
const plan = await readJson(resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json'));
const characterGate = await readJson(resolve(projectRoot, 'content/media-production/krea2-character-gate-v1.json'));
const promptById = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
if ([allBackgrounds, allImages, requestedIds.length > 0].filter(Boolean).length !== 1) throw new Error('Choose exactly one of --ids, --all-backgrounds, or --all-images');
const ids = allImages
  ? plan.imageJobs.map((job) => job.id)
  : allBackgrounds
    ? plan.imageJobs.filter((job) => job.category === 'bg').map((job) => job.id)
    : requestedIds;
const jobs = plan.imageJobs.filter((job) => ids.includes(job.id));
if (jobs.length !== ids.length) throw new Error(`Unknown Krea2 jobs: ${ids.filter((id) => !jobs.some((job) => job.id)).join(', ')}`);
for (const job of jobs) assertKrea2CharacterProductionGate(characterGate, job);
for (const job of jobs) await produce(job, promptById.get(job.id), baseline, execute);

async function produce(job, prompt, baseline_, shouldExecute) {
  if (!prompt) throw new Error(`Missing visual prompt: ${job.id}`);
  const existing = force ? undefined : await reusableReceipt(job.id, baseline_, productionProfile);
  if (existing) { console.log(JSON.stringify({ jobId: job.id, status: 'skipped-existing-candidate', receipt: existing })); return; }
  const seedValue = valueFor(job.id, 'seed') ?? '2026080909';
  const seed = Number(seedValue);
  if (!Number.isSafeInteger(seed) || seed < 0) throw new Error(`Invalid seed for ${job.id}`);
  const prefix = `albina_krea2_${job.id.replaceAll(/[^a-z0-9]+/giu, '_')}`;
  const finalPrompt = composeKrea2Prompt(job, prompt);
  const dispatched = buildKrea2ProfileWorkflow(adapter, profileId, baseline_.workflow, {
    prompt: finalPrompt,
    seed,
    filenamePrefix: prefix,
    aspectRatio: job.category === 'bg' ? '16:9 (Widescreen)' : '9:16 (Portrait Widescreen)',
    megapixels: job.category === 'bg' ? 1.0 : 2.0,
  });
  const workflow = dispatched.workflow;
  const workflowSha256 = sha256(stableJson(workflow));
  let receipt = makeKrea2Receipt({
    jobId: job.id, status: shouldExecute ? 'submitting' : 'dry-run', comfyUrl: process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199',
    comfyVersion: baseline_.evidence.comfyui.version, device: baseline_.evidence.comfyui.device,
    workflowPath: baseline_.workflowPath, baselineWorkflowSha256: baseline_.evidence.workflow.sha256,
    invocationWorkflowSha256: workflowSha256, topologySha256: workflowTopologySha256(workflow),
    workflowSerialization: 'stable-json-v1', invocationFileSha256: workflowSha256, evidencePath: baseline_.evidencePath,
    evidenceSha256: sha256(await readFile(baseline_.evidencePath)),
    promptSha256: sha256(finalPrompt), prompt: finalPrompt, seed, filenamePrefix: prefix,
    resolution: { generationSize: job.generationSize, delivery: job.delivery },
    referenceInputs: [...(job.referenceSourceIds ?? []), ...(job.referenceJobIds ?? [])],
  });
  receipt = bindKrea2ProfileToReceipt(receipt, productionProfile);
  if (!shouldExecute) { console.log(JSON.stringify(receipt, null, 2)); return; }
  try {
    const queued = await enqueueKrea2Job(workflow);
    receipt.promptId = queued.promptId; receipt.status = 'running';
    const result = await waitForKrea2Output(queued.promptId);
    if (result.images.length !== 1) throw new Error(`Expected one Krea2 output for ${job.id}, got ${result.images.length}`);
    const destination = resolve(projectRoot, `staging/media/krea2-v1/${job.id.replaceAll(/[^a-z0-9]+/giu, '-')}.png`);
    const output = await downloadKrea2Image(result.images[0], destination);
    receipt.status = 'awaiting-review'; receipt.output = { ...output, history: result.history }; receipt.completedAt = new Date().toISOString();
    await writeKrea2Receipt(job.id, receipt);
    console.log(JSON.stringify(receipt, null, 2));
  } catch (error) {
    const failed = recordKrea2Failure(receipt, error);
    await writeKrea2Receipt(job.id, failed);
    console.error(JSON.stringify(failed, null, 2));
    throw error;
  }
}

function composeKrea2Prompt(job, prompt) {
  const houseStyle = [
    'Original 2D visual-novel illustration; precise industrial ink linework; controlled flat color and restrained painterly shading.',
    'Cold white, charcoal black, small gold accents, and warning red; cinematic industrial-city light.',
    'No readable text, logo, watermark, or interface overlay. Do not imitate a living artist or reproduce any existing published image.',
    'This verified text-to-image baseline receives no reference images; any listed references are governance-only context.',
  ].join(' ');
  const subjectContract = job.category === 'bg'
    ? 'Render an unoccupied environment only: no people, silhouettes, reflections of people, corpses, or recognizable characters.'
    : 'When hands or feet are visible, render five separated fingers or toes per limb with correct anatomy; preserve clean layer-friendly silhouettes for later Live2D work.';
  const frozen = backgroundPromptOverride(job.id);
  const positive = frozen?.positive ?? prompt.positivePrompt;
  const negative = frozen?.negative ?? prompt.negativePrompt;
  const finalPrompt = [houseStyle, subjectContract, positive, negative ? `Avoid: ${negative}` : 'Avoid readable text.'].join('\n');
  if (looksMojibake(finalPrompt)) throw new Error(`Visual prompt contains mojibake and is not production-safe: ${job.id}`);
  return finalPrompt;
}

function backgroundPromptOverride(jobId) {
  const sharedBackgroundNegative = 'people, silhouettes, human reflections, corpses, readable signs, pseudo-letters, glyph-like marks, text, logos, watermarks, UI, tilted horizon, excessive neon, clutter in portrait slots or dialogue-safe lower area';
  return ({
  'visual.image.bg.backstreets_rain': { positive: 'An empty narrow industrial backstreet at night in heavy rain: wet asphalt, drainage channels, overhead utility pipes, old brick and metal walls, cold white practical lamps with restrained warning-red reflections, a clear turn at the far end, clean left and right portrait staging zones. Every wall panel and sign surface is blank geometric material with no symbols or lettering.', negative: sharedBackgroundNegative },
  'visual.image.bg.city_rooftop': { positive: 'An empty high industrial-city rooftop at blue hour, stable horizontal skyline, service rails and restrained mechanical equipment, cold white searchlight haze with sparse muted gold dust, clear foreground and side portrait staging zones.', negative: sharedBackgroundNegative },
  'visual.image.bg.golden_bough': { positive: 'An empty subterranean black-and-white industrial reactor chamber. At its center floats an abstract non-organic golden energy lattice made of geometric luminous rods, fractured rings, branching electrical conduits and suspended crystalline lines. It is machinery-like anomalous energy with no trunk, bark, leaves, roots, soil or natural vegetation. Keep a clean central staging zone and a dark dialogue-safe lower band.', negative: `${sharedBackgroundNegative}, tree, natural tree, trunk, bark, branches made of wood, leaves, roots, forest, vegetation` },
  'visual.image.bg.lce_lab': { positive: 'An empty wide institutional industrial research laboratory, clearly a laboratory rather than a corridor: central blank maintenance platform, sealed observation window, overhead articulated service arms, clean side equipment bays and rail tracks, cold white light with tiny solid warning-red dots. All monitors are powered off black rectangles; all panels are plain and contain no glyphs, symbols, diagrams or labels.', negative: `${sharedBackgroundNegative}, corridor-only composition, readable screen, pseudo-text, control-panel glyphs, alphanumeric marks, diagrams` },
  'visual.image.bg.limbus_bus': { positive: 'An empty old industrial bus interior during rain, red-black structural frame, worn seats, rain-streaked windows, quiet aisle and paired seating composition, all placards and panels blank with no letters or symbols.', negative: sharedBackgroundNegative },
  'visual.image.bg.mirror_corridor': { positive: 'An empty long mirror corridor with a stable central vanishing point, fractured reflective panels and restrained spatial misalignment, cold white overhead light, clear side portrait zones, no figures or human-shaped reflections.', negative: sharedBackgroundNegative },
  'visual.image.bg.nest_station': { positive: 'An empty severe transit platform inside an affluent industrial district, with clearly visible dark train rails, platform edge, clean columns and cold white platform lights. No tickets, papers, posters, screens or signs are present. Every architectural panel is a plain solid geometric surface without marks.', negative: `${sharedBackgroundNegative}, ticket, paper, poster, screen, signboard, black marks on floor, glyphs` },
  'visual.image.bg.outskirts_dawn': { positive: 'An empty ruined industrial outskirts road at dawn, low grass, broken walls and a distant fog-veiled city, cool grey atmosphere with one restrained warm horizon line, open foreground for ending props.', negative: sharedBackgroundNegative },
  'visual.image.bg.rain_room': { positive: 'An empty architectural rain chamber with vertical metal frames, shallow reflective water and fine controlled rain lines forming a visual frame, enough central space for two characters at half-step distance, no human-shaped reflections.', negative: sharedBackgroundNegative },
  'visual.image.bg.ring_atelier': { positive: 'An empty precision art atelier with blank frames, mounting tools, rails, a clean workbench and covered display stands, controlled white-black-red industrial palette, pressure conveyed through order and enclosure rather than gore. Every paper and frame is blank.', negative: sharedBackgroundNegative },
  'visual.image.bg.spider_gallery': { positive: 'An empty gallery whose suspended cables and radiating slender frames imply a spider-web structure without depicting a creature, one blank central frame under focused light, clear side staging space.', negative: sharedBackgroundNegative },
  'visual.image.bg.white_canvas': { positive: 'An empty white-grey exhibition room with one large pristine pure-white stretched canvas. The canvas surface is perfectly uniform and completely untouched: no paint, sketch, stain, texture, symbol, signature, line or shadow on its face. Use subtle wall and floor separation, controlled soft room shadows, clear left and right portrait zones and a dialogue-safe lower area.', negative: `${sharedBackgroundNegative}, painting, sketch, brushstroke, scribble, stain, canvas texture, image on canvas, signature, grey marks on canvas` },
  })[jobId];
}

function looksMojibake(value) {
  return /(?:銆|锛|绔|鍙|浣|缁|鏃|闄|瀹|褰|鐨|浠|鍏|浜|璇)/u.test(value);
}

function valueFor(id, name) { const index = args.indexOf(`--${name}`); return index < 0 ? undefined : args[index + 1]; }
function optional(name) { const index = args.indexOf(name); const result = index < 0 ? undefined : args[index + 1]; if (index >= 0 && (!result || result.startsWith('--'))) throw new Error(`${name} requires a value`); return result; }
async function reusableReceipt(jobId, baseline_, profile) {
  const path = resolve(projectRoot, `staging/media/krea2-v1/${jobId.replaceAll(/[^a-z0-9._-]/giu, '-')}.json`);
  try {
    const receipt = await readJson(path);
    if (receipt.status !== 'awaiting-review' || typeof receipt.output?.path !== 'string') return undefined;
    if (receipt.profile?.profileId !== profile.profileId) return undefined;
    if (receipt.workflow?.baselineSha256 !== baseline_.evidence.workflow.sha256) return undefined;
    await stat(receipt.output.path);
    return path;
  } catch { return undefined; }
}
async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, '')); }
