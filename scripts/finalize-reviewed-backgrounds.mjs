import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildKrea2Review,
  loadKrea2Receipt,
  validateKrea2CandidateBindings,
  validateKrea2ProductionBaseline,
  writeKrea2Review,
} from './lib/krea2-delivery.mjs';

const approved = {
  'visual.image.bg.backstreets_rain': 'Empty rain-soaked backstreet, no figures, human reflections, readable text, logo or watermark, with clear portrait and dialogue staging zones.',
  'visual.image.bg.city_rooftop': 'Empty rooftop, stable skyline, no text or people, usable side staging zones.',
  'visual.image.bg.golden_bough': 'Empty underground reactor chamber with a non-organic golden energy lattice, no tree anatomy, people, text, logo or watermark.',
  'visual.image.bg.lce_lab': 'Empty institutional research laboratory with blank powered-off panels, stable staging space, no people, readable text, logo or watermark.',
  'visual.image.bg.limbus_bus': 'Empty rain-lit bus, no people or human reflections, blank panels and clear aisle.',
  'visual.image.bg.mirror_corridor': 'Empty symmetric mirror corridor, no human-shaped reflections or text, stable vanishing point.',
  'visual.image.bg.nest_station': 'Empty controlled transit platform with clean geometric architecture, no tickets, people, readable signs, pseudo-text, logo or watermark.',
  'visual.image.bg.outskirts_dawn': 'Empty open outskirts road, no figures or text, layered ruins and restrained dawn horizon.',
  'visual.image.bg.rain_room': 'Empty rain chamber, no human-shaped reflections or text, central two-character staging space remains clear.',
  'visual.image.bg.ring_atelier': 'Empty precision atelier, all frames and papers visually blank, no figures, text, logos or gore.',
  'visual.image.bg.spider_gallery': 'Empty gallery, spider-web meaning is architectural only, central blank frame and side staging space are clear.',
  'visual.image.bg.white_canvas': 'Empty white-grey exhibition room with an untouched blank canvas, controlled natural light and no paint, marks, people, text, logo or watermark.',
};

const root = resolve(import.meta.dirname, '..');
const [plan, prompts, evidence, contract] = await Promise.all([
  readJson(resolve(root, 'content/media-production/visual-rebuild-v2.json')),
  readJson(resolve(root, 'content/media-production/visual-prompts-v2.json')),
  readJson(resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json')),
  readJson(resolve(root, 'content/media-production/krea2-img2img-baseline-v1.json')),
]);
const baseline = validateKrea2ProductionBaseline(evidence, contract.productionBaseline);
const jobs = new Map(plan.imageJobs.map((job) => [job.id, job]));
const promptMap = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));

for (const [id, summary] of Object.entries(approved)) {
  const job = jobs.get(id);
  const prompt = promptMap.get(id);
  if (!job || !prompt) throw new Error(`Unknown approved background: ${id}`);
  const receipt = await loadKrea2Receipt(id);
  await validateKrea2CandidateBindings(receipt, job, baseline);
  const evidenceItems = prompt.reviewCriteria.map((criterion) => ({
    criterion,
    note: `${summary} Criterion checked directly against the original-resolution candidate.`,
    evidence: `direct-original-resolution review of SHA-256 ${receipt.output.sha256}`,
  }));
  const review = buildKrea2Review(receipt, 'codex-direct-original-resolution-review', evidenceItems, 'approved');
  const reviewPath = await writeKrea2Review(id, review);
  console.log(`approved: ${id} -> ${reviewPath}`);
}

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}
