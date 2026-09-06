import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { krea2ReviewPath, loadKrea2Receipt, loadKrea2Review, prepareKrea2Landscape, validateKrea2CandidateBindings, validateKrea2ProductionBaseline, validateKrea2ReviewBindings } from './lib/krea2-delivery.mjs';

const ids = required('--ids').split(',').map((value) => value.trim()).filter(Boolean);
const plan = await readJson(resolve(import.meta.dirname, '../content/media-production/visual-rebuild-v2.json'));
const prompts = await readJson(resolve(import.meta.dirname, '../content/media-production/visual-prompts-v2.json'));
const jobs = new Map(plan.imageJobs.map((job) => [job.id, job]));
const promptsByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
const embedded = {
  workflowPath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline.api.json'),
  evidencePath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
};
const historical = {
  evidencePath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
  contractPath: resolve(import.meta.dirname, '../content/media-production/krea2-img2img-baseline-v1.json'),
};

for (const id of ids) {
  const job = jobs.get(id);
  const prompt = promptsByJob.get(id);
  if (!job || !prompt || job.category !== 'bg') throw new Error(`Krea2 delivery currently accepts reviewed background jobs only: ${id}`);
  const receipt = await loadKrea2Receipt(id);
  const source = receipt.profile?.profileId === 'albina-embedded-image-baseline' ? embedded : historical;
  const productionBaseline = source === embedded
    ? await readJson(source.evidencePath).then((evidence) => ({ workflowSha256: evidence.workflow.sha256, topologySha256: evidence.runtime.topologySha256 }))
    : validateKrea2ProductionBaseline(await readJson(source.evidencePath), await readJson(source.contractPath).then((contract) => contract.productionBaseline));
  const validationOptions = source === embedded ? { baselineWorkflowPath: source.workflowPath } : {};
  await validateKrea2CandidateBindings(receipt, job, productionBaseline, validationOptions);
  await validateKrea2ReviewBindings(await loadKrea2Review(id), receipt, prompt.reviewCriteria, {
    job, productionBaseline, reviewPath: krea2ReviewPath(id), ...validationOptions,
  });
  console.log(JSON.stringify({ id, status: 'delivered-for-rights-review', output: await prepareKrea2Landscape(receipt, job, { productionBaseline, ...validationOptions }) }));
}

function required(name) { const index = process.argv.indexOf(name); const value = index < 0 ? undefined : process.argv[index + 1]; if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`); return value; }
async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, '')); }
