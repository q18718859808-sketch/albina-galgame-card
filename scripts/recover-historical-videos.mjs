import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { promisify } from 'node:util';
import { resolve } from 'node:path';

import { recoverHistoricalVideos } from './lib/historical-video-recovery.mjs';

const exec = promisify(execFile);
const root = resolve(import.meta.dirname, '..');
const checkOnly = new Set(process.argv.slice(2)).has('--check');
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const planPath = resolve(root, 'content/media-production/visual-rebuild-v2.json');
const manifestPath = resolve(root, 'content/asset-manifest-v2.json');
const ledgerPath = resolve(root, 'tools/media/production/.ledger.json');
const plan = await readJson(planPath);
const ledger = await readJson(ledgerPath);
const manifest = await readJson(manifestPath);
const loadHistoricalJob = async (job) => {
  const stem = job.runtime.path.split('/').at(-1).replace(/\.mp4$/u, '').replaceAll('_', '-');
  const path = `tools/media/production/jobs/job.video.${stem}.json`;
  const { stdout } = await exec('git', ['show', `bfd4ffc:${path}`], { cwd: root, maxBuffer: 1024 * 1024 });
  return JSON.parse(stdout);
};
const result = await recoverHistoricalVideos({
  plan, ledger, manifest, sourceCommit: 'bfd4ffc', loadHistoricalJob,
  stagingRoot: resolve(root, 'staging/media/video'),
  assetRoot: resolve(root, 'dist/albina-galgame-card/assets'),
  receiptRoot: resolve(root, 'content/media-receipts'),
  auditPath: resolve(root, 'content/media-production/historical-video-recovery-v1.json'),
}, { checkOnly });
if (!checkOnly) {
  const nextPlan = { ...plan, videoJobs: plan.videoJobs.map((job) => ({ ...job, status: 'frozen-existing-artifact' })) };
  await writeFile(planPath, `${JSON.stringify(nextPlan, null, 2)}\n`);
}
console.log(`${checkOnly ? 'Checked' : 'Recovered'} ${result.recoveredJobs} historical video jobs and ${result.receipts} delivery receipts; changed=${result.changedFiles}`);
