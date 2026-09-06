#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { LatentMoeClient, LatentMoeError } from '../media/dist/src/latent-moe-client.js';

const projectRoot = resolve(import.meta.dirname, '../..');
const comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199';
const jobsFile = resolve(projectRoot, 'scripts/krea2-canonical-restyle-batch.mjs');
const ledgerFile = resolve(projectRoot, 'staging/media/krea2-canonical-restyle/restyle-ledger-v1.json');
const stagedRunner = resolve(projectRoot, 'scripts/run-krea2-albina-staged-high-frequency.mjs');
const stagedOutputDir = resolve(projectRoot, 'staging/media/krea2-canonical-production/characters');
const latent = new LatentMoeClient();
let generationLock = false;

const tools = [
  { name: 'albina_production_status', description: 'Read local ComfyUI status, queue, and the pinned baseline record without generating anything.', inputSchema: { type: 'object', properties: {} } },
  { name: 'albina_list_jobs', description: 'List Krea2 jobs and their current ledger/review state.', inputSchema: { type: 'object', properties: { group: { type: 'string' }, only: { type: 'array', items: { type: 'string' } } } } },
  { name: 'albina_variant_production_contract', description: 'Validate the Albina 11-state queue has one canonical latent origin, fixed structure-lock settings, AU-reference isolation, and the six-LoRA baseline. Does not submit GPU work.', inputSchema: { type: 'object', properties: {} } },
  { name: 'albina_latent_status', description: 'Check Latent.moe worker capacity without submitting a generation.', inputSchema: { type: 'object', properties: {} } },
  { name: 'albina_run_krea2_job', description: 'Run exactly one non-Albina-variant Krea2 canonical job through the six-LoRA baseline. Albina state variants are intentionally rejected here and must use the staged high-frequency route.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string' }, execute: { type: 'boolean' } } } },
  { name: 'albina_run_staged_variant', description: 'Run one Albina state variant through the current two-pass high-frequency Krea2 route. Uses the sole canonical source and the fixed six-LoRA chain; requires execute=true and never promotes output.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string' }, execute: { type: 'boolean' } } } },
  { name: 'albina_run_reference_conditioned_pilot', description: 'Run the single guarded fresh-latent Albina Krea2 pilot: canonical image as identity/structure condition, full prompt bound to Reference V10, and the fixed six-LoRA chain. Requires execute=true; staging-only and never promotes.', inputSchema: { type: 'object', properties: { execute: { type: 'boolean' } } } },
  { name: 'albina_latent_generate', description: 'Run or dry-run one Latent.moe candidate. This route is never canonical and requires execute=true for submission.', inputSchema: { type: 'object', required: ['prompt'], properties: { prompt: { type: 'string' }, negativePrompt: { type: 'string' }, seed: { type: 'integer', minimum: 0 }, resolution: { enum: ['square', 'portrait', 'landscape'] }, steps: { type: 'integer', minimum: 8, maximum: 16 }, sampler: { enum: ['euler', 'euler_ancestral', 'dpmpp_2s_ancestral', 'dpmpp_2m', 'dpmpp_sde', 'dpmpp_2m_sde', 'ddim'] }, scheduler: { enum: ['karras', 'beta', 'normal', 'simple', 'exponential'] }, execute: { type: 'boolean' } } } },
  { name: 'albina_latent_cancel', description: 'Cancel one active Latent.moe generation job.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string', minLength: 8 } } } },
  { name: 'albina_record_direct_review', description: 'Record an operator direct-review verdict for an already produced staging image. The caller must have actually viewed the image.', inputSchema: { type: 'object', required: ['jobId', 'status', 'notes'], properties: { jobId: { type: 'string' }, status: { enum: ['accepted', 'rejected'] }, notes: { type: 'string', minLength: 1 }, passed: { type: 'array', items: { type: 'string' } } } } },
  { name: 'albina_promotion_check', description: 'Explain why a job is or is not eligible for promotion; never promotes by itself.', inputSchema: { type: 'object', required: ['jobId'], properties: { jobId: { type: 'string' } } } },
];

let buffer = '';
process.stdin.setEncoding('utf8');
process.stdin.on('data', (chunk) => { buffer += chunk; drain(); });

function drain() {
  for (;;) {
    const end = buffer.indexOf('\n');
    if (end < 0) return;
    const line = buffer.slice(0, end).trim();
    buffer = buffer.slice(end + 1);
    if (line) {
      try { void handle(JSON.parse(line)); }
      catch { reply(null, undefined, { code: -32700, message: 'Parse error' }); }
    }
  }
}

async function handle(message) {
  if (message.method === 'initialize') return reply(message.id, { protocolVersion: '2025-06-18', capabilities: { tools: {} }, serverInfo: { name: 'albina-production', version: '1.0.0' } });
  if (message.method === 'notifications/initialized') return;
  if (message.method === 'tools/list') return reply(message.id, { tools });
  if (message.method !== 'tools/call') return reply(message.id, undefined, { code: -32601, message: 'Method not found' });
  try {
    const result = await callTool(message.params?.name, message.params?.arguments ?? {});
    return reply(message.id, { content: [{ type: 'text', text: JSON.stringify(result) }] });
  } catch (error) {
    return reply(message.id, { isError: true, content: [{ type: 'text', text: JSON.stringify({ error: safeError(error) }) }] });
  }
}

async function callTool(name, args) {
  if (name === 'albina_production_status') return productionStatus();
  if (name === 'albina_list_jobs') return listJobs(args);
  if (name === 'albina_variant_production_contract') return runProcess('node', ['scripts/check-albina-variant-production-contract.mjs'], projectRoot);
  if (name === 'albina_latent_status') return latent.status();
  if (name === 'albina_run_krea2_job') return runKrea2(args);
  if (name === 'albina_run_staged_variant') return runStagedVariant(args);
  if (name === 'albina_run_reference_conditioned_pilot') return runReferenceConditionedPilot(args);
  if (name === 'albina_latent_generate') {
    const { execute, ...input } = args;
    return latent.generate(input, { execute: execute === true });
  }
  if (name === 'albina_latent_cancel') return latent.cancel(args.jobId);
  if (name === 'albina_record_direct_review') return recordReview(args);
  if (name === 'albina_promotion_check') return promotionCheck(args.jobId);
  throw new Error('unknown_tool');
}

async function productionStatus() {
  const [system, queue, baseline] = await Promise.all([
    getJson('/system_stats'),
    getJson('/queue'),
    readJson(resolve(projectRoot, 'content/media-production/krea2-verified-baseline-v1.json')),
  ]);
  return {
    comfyui: { reachable: true, version: system?.system?.comfyui_version ?? null, running: queue?.queue_running?.length ?? 0, pending: queue?.queue_pending?.length ?? 0 },
    baseline: { verified: baseline?.verified === true, workflowSha256: baseline?.workflow?.sha256 ?? null, styleLoraCount: baseline?.styleLoraChain?.length ?? 0, identityGate: baseline?.characterIdentityGate?.status ?? null },
    policy: { directImageReviewRequired: true, automatedVisionAdvisoryOnly: true, sixLoraBaselineRequired: true, credentialsPersisted: false },
  };
}

async function listJobs(args) {
  const source = await readFile(jobsFile, 'utf8');
  const entries = [...source.matchAll(/job\(\{\s*id:\s*'([^']+)',\s*group:\s*'([^']+)'/gu)].map((match) => ({ id: match[1], group: match[2] }));
  const variants = [...source.matchAll(/variantJob\('([^']+)'/gu)].map((match) => ({ id: match[1], group: 'albina-variants' }));
  const jobs = [...entries, ...variants];
  const ledger = await readJson(ledgerFile) ?? { entries: {} };
  const wanted = args.only?.length ? jobs.filter(({ id }) => args.only.includes(id)) : jobs;
  const grouped = args.group ? wanted.filter((entry) => entry.group === args.group) : wanted;
  return grouped.map(({ id, group }) => ({ id, group, ledger: ledger.entries?.[id] ?? { directReview: 'unproduced', promotionAllowed: false } }));
}

async function runKrea2({ jobId, execute }) {
  if (typeof jobId !== 'string' || !/^[a-z0-9-]+$/u.test(jobId)) throw new Error('invalid_job_id');
  const known = await listJobs({ only: [jobId] });
  if (known.length !== 1) throw new Error('unknown_job_id');
  if (known[0].group === 'albina-variants') throw new Error('albina_variant_requires_staged_high_frequency_route');
  if (execute !== true) return { dryRun: true, command: `node scripts/krea2-canonical-restyle-batch.mjs --only=${jobId} --execute`, policy: 'one job only; direct image review required after completion' };
  if (generationLock) throw new Error('local_generation_lock');
  generationLock = true;
  try {
    return await runProcess('node', ['scripts/krea2-canonical-restyle-batch.mjs', `--only=${jobId}`, '--execute'], projectRoot);
  } finally {
    generationLock = false;
  }
}

async function runStagedVariant({ jobId, execute }) {
  if (typeof jobId !== 'string' || !/^[a-z0-9-]+$/u.test(jobId)) throw new Error('invalid_job_id');
  const known = await listJobs({ only: [jobId] });
  if (known.length !== 1 || known[0].group !== 'albina-variants') throw new Error('unknown_albina_variant_job_id');
  const args = [
    stagedRunner,
    `--staging-dir=${stagedOutputDir}`,
    `--variant-job=${jobId}`,
    '--stage1-denoise=0.12', '--stage2-denoise=0.07', '--stage1-steps=28', '--stage2-steps=24',
  ];
  if (execute !== true) return { dryRun: true, command: ['node', ...args], policy: 'one GPU job only; direct original-resolution review required; output is staging-only' };
  if (generationLock) throw new Error('local_generation_lock');
  generationLock = true;
  try {
    return await runProcess('node', args, projectRoot);
  } finally {
    generationLock = false;
  }
}

async function runReferenceConditionedPilot({ execute }) {
  const script = resolve(projectRoot, 'scripts/run-krea2-albina-reference-conditioned-pilot.mjs');
  if (execute !== true) return { dryRun: true, command: ['node', script], policy: 'one GPU pilot only; direct original-resolution review required; staging-only' };
  if (generationLock) throw new Error('local_generation_lock');
  generationLock = true;
  try {
    return await runProcess('node', [script], projectRoot);
  } finally {
    generationLock = false;
  }
}

async function recordReview({ jobId, status, notes, passed = [] }) {
  if (!/^[a-z0-9-]+$/u.test(jobId) || !['accepted', 'rejected'].includes(status) || typeof notes !== 'string' || notes.length < 1) throw new Error('invalid_review');
  const reviewScript = resolve(projectRoot, 'scripts/record-restyle-review.mjs');
  const args = [`--id=${jobId}`, `--status=${status}`, `--notes=${notes}`, ...passed.map((item) => `--passed=${item}`)];
  return runProcess('node', [reviewScript, ...args], projectRoot);
}

async function promotionCheck(jobId) {
  const ledger = await readJson(ledgerFile);
  const entry = ledger?.entries?.[jobId];
  if (!entry) return { jobId, eligible: false, reasons: ['job_not_in_ledger'] };
  const reasons = [];
  if (entry.directReview !== 'accepted') reasons.push('direct_image_review_not_accepted');
  if (entry.promotionAllowed !== true) reasons.push('ledger_promotion_gate_is_closed');
  return { jobId, eligible: reasons.length === 0, reasons, outputSha256: entry.outputSha256 ?? null };
}

async function getJson(path) {
  const response = await fetch(`${comfyUrl}${path}`);
  if (!response.ok) throw new Error(`comfyui_http_${response.status}`);
  return response.json();
}

async function readJson(path) {
  try { return JSON.parse(await readFile(path, 'utf8')); } catch { return null; }
}

function runProcess(command, args, cwd) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(command, args, { cwd, windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    let stdout = ''; let stderr = '';
    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });
    child.on('error', reject);
    child.on('close', (code) => code === 0 ? resolvePromise({ ok: true, stdout: stdout.trim() }) : reject(new Error(stderr.trim() || `process_exit_${code}`)));
  });
}

function safeError(error) {
  if (error instanceof LatentMoeError) return /^[a-z0-9_-]+$/u.test(error.code) ? error.code : 'tool_failed';
  if (!(error instanceof Error)) return 'tool_failed';
  const message = error.message.replace(/Bearer\s+\S+/giu, 'Bearer [REDACTED]').replace(/(?:key|token|secret|authorization)[=:]\s*\S+/giu, '$1=[REDACTED]');
  return /^[a-z0-9_-]+$/u.test(message) ? message : 'tool_failed';
}

function reply(id, result, error) { process.stdout.write(`${JSON.stringify({ jsonrpc: '2.0', id, ...(error ? { error } : { result }) })}\n`); }
