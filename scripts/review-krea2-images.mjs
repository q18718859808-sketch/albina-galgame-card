import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { buildKrea2Review, loadKrea2Receipt, validateKrea2CandidateBindings, validateKrea2ProductionBaseline, writeKrea2Review } from './lib/krea2-delivery.mjs';

const args = process.argv.slice(2);
const ids = required('--ids').split(',').map((value) => value.trim()).filter(Boolean);
const reviewer = required('--reviewer');
const decision = required('--decision');
if (!['approved', 'rejected'].includes(decision)) throw new Error('--decision must be approved or rejected');
const criteriaEvidence = await readEvidence(required('--criteria-evidence'));
const rejectReasons = decision === 'rejected' ? await readRejectReasons(required('--reject-reasons')) : undefined;
const plan = await readJson(resolve(import.meta.dirname, '../content/media-production/visual-rebuild-v2.json'));
const prompts = await readJson(resolve(import.meta.dirname, '../content/media-production/visual-prompts-v2.json'));
const embeddedBaseline = {
  evidencePath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
  workflowPath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline.api.json'),
};
const historicalBaseline = {
  evidencePath: resolve(import.meta.dirname, '../staging/media/embedded-baseline/embedded-production-baseline-evidence.json'),
  contractPath: resolve(import.meta.dirname, '../content/media-production/krea2-img2img-baseline-v1.json'),
};
const baselineSources = { embedded: embeddedBaseline, historical: historicalBaseline };
// Historical callers may still use the direct binding form:
// await validateKrea2CandidateBindings(await loadKrea2Receipt(id), job, productionBaseline)
const jobs = new Map(plan.imageJobs.map((job) => [job.id, job]));
const promptsByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));

for (const id of ids) {
  const job = jobs.get(id);
  const prompt = promptsByJob.get(id);
  if (!job || !prompt) throw new Error(`Unknown Krea2 job: ${id}`);
  const receipt = await loadKrea2Receipt(id);
  const source = receipt.profile?.profileId === 'albina-embedded-image-baseline' ? embeddedBaseline : historicalBaseline;
  const productionBaseline = source === embeddedBaseline
    ? { workflowSha256: (await readJson(source.evidencePath)).workflow.sha256, topologySha256: (await readJson(source.evidencePath)).runtime.topologySha256 }
    : validateKrea2ProductionBaseline(await readJson(source.evidencePath), await readJson(source.contractPath).then((contract) => contract.productionBaseline));
  const boundOptions = source === embeddedBaseline ? { baselineWorkflowPath: source.workflowPath } : {};
  await validateKrea2CandidateBindings(receipt, job, productionBaseline, boundOptions);
  const expected = prompt.reviewCriteria;
  const evidence = criteriaEvidence[id];
  validateEvidence(expected, evidence, id);
  const review = buildKrea2Review(receipt, reviewer, evidence, decision, { rejectReasons });
  const path = await writeKrea2Review(id, review);
  console.log(`${decision}: ${id} -> ${path}`);
}

function required(name) { const value = after(name); if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`); return value; }
function after(name) { const index = args.indexOf(name); return index < 0 ? undefined : args[index + 1]; }
async function readEvidence(value) {
  try {
    const source = value.startsWith('@') ? await readFile(resolve(process.cwd(), value.slice(1)), 'utf8') : value;
    return JSON.parse(source);
  } catch { throw new Error('--criteria-evidence must be JSON or @path-to-json'); }
}
async function readRejectReasons(value) {
  try {
    const source = value.startsWith('@') ? await readFile(resolve(process.cwd(), value.slice(1)), 'utf8') : value;
    const reasons = JSON.parse(source);
    if (!Array.isArray(reasons) || reasons.length === 0 || reasons.some((reason) => typeof reason !== 'string' || !reason.trim())) throw new Error();
    return reasons;
  } catch { throw new Error('--reject-reasons must be a non-empty JSON string array or @path-to-json'); }
}
function validateEvidence(criteria, evidence, id) {
  if (!Array.isArray(evidence) || evidence.length !== criteria.length) throw new Error(`Evidence is required for every criterion: ${id}`);
  const seen = new Set();
  for (const item of evidence) if (!item || !criteria.includes(item.criterion) || seen.has(item.criterion) || typeof item.note !== 'string' || !item.note.trim() || typeof item.evidence !== 'string' || !item.evidence.trim()) throw new Error(`Invalid criterion evidence: ${id}`); else seen.add(item.criterion);
}
async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/, '')); }
