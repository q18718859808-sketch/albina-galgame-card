import { createHash } from 'node:crypto';
import { copyFile, readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { resolve } from 'node:path';
import {
  krea2ReviewPath,
  validateKrea2CandidateBindings,
  validateKrea2ProductionBaseline,
  validateKrea2ReviewBindings,
} from './lib/krea2-delivery.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-v1');
const outputRoot = resolve(projectRoot, 'content/media-receipts');
const promptVersion = 'albina-visual-v2';
const execute = process.argv.includes('--execute');
const run = promisify(execFile);

const plan = await readJson(resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json'));
const prompts = await readJson(resolve(projectRoot, 'content/media-production/visual-prompts-v2.json'));
const promptByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
const productionBaseline = validateKrea2ProductionBaseline(
  await readJson(resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json')),
  await readJson(resolve(projectRoot, 'content/media-production/krea2-img2img-baseline-v1.json')).then((contract) => contract.productionBaseline),
);
const baselineBinding = {
  workflowPath: 'staging/media/embedded-baseline/embedded-production-baseline.api.json',
  workflowSha256: productionBaseline.workflowSha256,
  evidencePath: 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json',
  evidenceSha256: sha256(await readFile(resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json'))),
  topologySha256: productionBaseline.topologySha256,
};
const jobs = plan.imageJobs.filter((job) => job.category === 'bg');
await mkdir(outputRoot, { recursive: true });

const results = [];
for (const job of jobs) {
  const receipt = await readJson(resolve(stagingRoot, `${job.id}.json`));
  const review = await readJson(resolve(stagingRoot, 'reviews', `${job.id}.json`));
  const prompt = promptByJob.get(job.id);
  const deliveryPath = resolve(stagingRoot, 'delivery', `${job.id}.jpg`);
  const delivery = await readFile(deliveryPath);
  if (!prompt) throw new Error(`Krea2 prompt contract is missing: ${job.id}`);
  await validateKrea2CandidateBindings(receipt, job, productionBaseline);
  await validateKrea2ReviewBindings(review, receipt, prompt.reviewCriteria, {
    job,
    productionBaseline,
    reviewPath: krea2ReviewPath(job.id),
  });

  const sourceJobHash = sha256(JSON.stringify({
    jobId: job.id,
    assetId: job.assetId,
    promptVersion,
    promptSha256: receipt.promptSha256,
    baselineWorkflowSha256: receipt.workflow.baselineSha256,
    baselineEvidenceSha256: baselineBinding.evidenceSha256,
    invocationWorkflowSha256: receipt.workflow.invocationSha256,
    topologySha256: receipt.workflow.topologySha256,
    seed: receipt.seed,
  }));
  const artifactSha256 = sha256(delivery);
  const canonicalPath = resolve(projectRoot, 'dist/albina-galgame-card/assets', job.path);
  const canonicalBytes = await readFile(canonicalPath);
  const canonicalSha256 = sha256(canonicalBytes);
  const changed = canonicalSha256 !== artifactSha256;
  if (!execute) {
    results.push({ id: job.id, assetId: job.assetId, changed, currentSha256: canonicalSha256, candidateSha256: artifactSha256 });
    continue;
  }
  await copyFile(deliveryPath, canonicalPath);
  const promotion = {
    version: 1,
    assetId: job.assetId,
    artifactSha256,
    provenance: {
      provider: 'comfyui-local-krea2',
      model: receipt.model,
      promptVersion,
      sourceJobHash,
      baseline: baselineBinding,
      review: {
        status: review.status,
        reviewer: review.reviewer,
        reviewedAt: review.reviewedAt,
      },
    },
    rights: {
      status: 'unverified',
      sourceType: 'model-output',
      redistribution: 'unverified',
      rightsBasis: 'Local Krea2 output is hash-bound and visually reviewed, but model/output redistribution terms have not been independently verified.',
    },
    lineage: {
      kind: 'original',
      processVersion: 'albina-krea2-v1',
      inputs: [],
    },
  };
  const path = resolve(outputRoot, `krea2.${job.assetId}.json`);
  await writeFile(path, `${JSON.stringify(promotion, null, 2)}\n`, 'utf8');
  results.push({ id: job.id, assetId: job.assetId, changed, artifactSha256, sourceJobHash, receipt: relativeProject(path) });
}
if (execute) await run(process.execPath, [resolve(projectRoot, 'scripts/audit-assets.mjs'), '--write'], { cwd: projectRoot, maxBuffer: 16 * 1024 * 1024 });
console.log(JSON.stringify({ provider: 'comfyui-local-krea2', total: results.length, status: execute ? 'adopted-rights-unverified' : 'dry-run', results }, null, 2));

function sha256(value) { return createHash('sha256').update(value).digest('hex'); }
async function readJson(path) { return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, '')); }
function relativeProject(path) { return path.replace(`${projectRoot}${path.includes('\\') ? '\\' : '/'}`, '').replaceAll('\\', '/').replace(/^\//u, ''); }
