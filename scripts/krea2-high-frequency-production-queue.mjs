#!/usr/bin/env node
/**
 * Review-gated queue for the accepted Albina two-pass Krea2 profile.
 *
 * This is intentionally a serial scheduler, not a GPU batch. It produces one
 * candidate, stops, and requires a direct-review receipt before advancing.
 * The six-LoRA chain is owned by the shared production builder.
 */
import { access, readFile, writeFile } from 'node:fs/promises';
import { constants } from 'node:fs';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const queuePath = resolve(argument('--queue') ?? 'content/media-production/krea2-high-frequency-queue-v1.json');
const statePath = resolve(argument('--state') ?? 'staging/media/krea2-canonical-production/high-frequency-queue-state-v1.json');
const execute = hasFlag('--execute');
const force = hasFlag('--force');

const queue = JSON.parse(await readFile(queuePath, 'utf8'));
if (queue?.profile !== 'albina-staged-high-frequency-v1' || queue?.execution?.maxConcurrentJobs !== 1) {
  throw new Error('high-frequency queue must declare the accepted serial Albina profile');
}
if (queue.execution?.batchGenerationAllowed === true) throw new Error('GPU batch generation is forbidden');

let state;
try { state = JSON.parse(await readFile(statePath, 'utf8')); } catch { state = { schemaVersion: 1, entries: {} }; }
const jobs = queue.jobs ?? [];
for (const job of jobs) {
  if (state.entries[job.id]?.status === 'accepted') continue;
  if (state.entries[job.id]?.status === 'rejected') {
    console.log(`${job.id}: blocked after rejection`);
    break;
  }
  const previous = jobs.slice(0, jobs.indexOf(job)).findLast((candidate) => state.entries[candidate.id]?.status !== 'accepted');
  if (previous) {
    console.log(`${job.id}: waiting for direct review of ${previous.id}`);
    break;
  }
  const receipt = resolve(root, job.receipt);
  if (await exists(receipt)) {
    const parsed = JSON.parse(await readFile(receipt, 'utf8'));
    const reviewPath = resolve(root, job.review ?? `${job.receipt.replace(/\.receipt\.json$/, '')}.direct-review.json`);
    const review = await readJsonIfPresent(reviewPath);
    const outputSha256 = parsed.output?.sha256 ?? null;
    const reviewAccepted = ['accepted-as-staging-anchor', 'accepted-as-staging-asset'].includes(review?.status);
    const reviewMatchesReceipt = review?.assetId === parsed.jobId
      && review?.candidateSha256 === outputSha256;
    if (parsed.jobId === job.id && reviewAccepted && reviewMatchesReceipt) {
      state.entries[job.id] = { status: 'accepted', receipt };
      await persist();
      continue;
    }
    if (review?.status === 'rejected' || review?.decision === 'rejected') {
      state.entries[job.id] = { status: 'rejected', receipt };
      await persist();
      console.log(`${job.id}: rejected; queue halted`);
      break;
    }
    console.log(`${job.id}: receipt found; waiting for matching direct review`);
    break;
  }
  if (!execute) {
    console.log(`${job.id}: ready; run with --execute to submit exactly one GPU job`);
    break;
  }
  if (!force && state.activeJob) throw new Error(`queue has active job ${state.activeJob}; clear it only after its receipt is reviewed`);
  state.activeJob = job.id;
  state.entries[job.id] = { status: 'running', startedAt: new Date().toISOString(), receipt };
  await persist();
  await run(job);
  state.activeJob = null;
  state.entries[job.id] = { status: 'awaiting-direct-review', receipt, completedAt: new Date().toISOString() };
  await persist();
  console.log(`${job.id}: completed; queue halted until direct review is recorded`);
  break;
}

async function run(job) {
  const args = [
    'scripts/run-krea2-albina-staged-high-frequency.mjs',
    `--job-id=${job.id}`,
    `--source=${job.source}`,
    `--subject=${job.subject}`,
    `--seed=${job.seed}`,
    `--stage1=${job.stage1}`,
    `--stage2=${job.stage2}`,
    `--stage1-denoise=${job.stage1Denoise}`,
    `--stage2-denoise=${job.stage2Denoise}`,
    `--stage1-steps=${job.stage1Steps}`,
    `--stage2-steps=${job.stage2Steps}`,
  ];
  await new Promise((resolveRun, reject) => {
    const child = spawn(process.execPath, args, { cwd: root, stdio: 'inherit' });
    child.once('error', reject);
    child.once('exit', (code, signal) => code === 0 ? resolveRun() : reject(new Error(`Krea2 job ${job.id} exited with ${code ?? signal}`)));
  });
}

async function persist() {
  const { mkdir } = await import('node:fs/promises');
  const { dirname } = await import('node:path');
  await mkdir(dirname(statePath), { recursive: true });
  await writeFile(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
}

async function exists(path) {
  try { await access(path, constants.F_OK); return true; } catch { return false; }
}
async function readJsonIfPresent(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}
function argument(name) {
  const inline = process.argv.find((value) => value.startsWith(`${name}=`));
  if (inline) return inline.slice(name.length + 1);
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}
function hasFlag(name) { return process.argv.includes(name); }
