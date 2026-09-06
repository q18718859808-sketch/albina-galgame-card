#!/usr/bin/env node
/**
 * Reproducible audit for Krea2 six-LoRA production receipts.
 *
 * This deliberately audits an explicit production receipt root. It does not
 * scan every staging receipt because background, probe, and post-processing
 * receipts have different contracts. The default root and baseline are the
 * current user-supplied PNG workflow; historical roots remain opt-in.
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, isAbsolute, relative, resolve } from 'node:path';

import { stableJson, workflowTopology, workflowTopologySha256 } from './lib/krea2-comfyui.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const defaultReceiptRoots = [
  resolve(projectRoot, 'staging/media/krea2-v1'),
];
const defaultReportPath = resolve(projectRoot, 'staging/media/krea2-audit/krea2-production-evidence-audit-v2.json');
const defaultManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const defaultProvenanceReceiptRoot = resolve(projectRoot, 'content/media-receipts');
const baselinePath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
const baselineEvidencePath = resolve(projectRoot, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json');
const expectedStyleChain = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];
const expectedWeights = {
  diffusion_models: 'redcraft23FP8_30Krea2.safetensors',
  text_encoders: 'qwen3vl_4b_fp8_scaled.safetensors',
  vae: 'qwen_image_vae.safetensors',
};
const hashPattern = /^[a-f0-9]{64}$/u;

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
async function exists(path) { try { await stat(path); return true; } catch { return false; } }
async function readJson(path) { return JSON.parse(await readFile(path, 'utf8')); }
async function walk(dir) {
  if (!(await exists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) paths.push(...await walk(path));
    else if (entry.name.endsWith('.receipt.json') || (entry.name.startsWith('visual.image.') && entry.name.endsWith('.json'))) paths.push(path);
  }
  return paths;
}

async function findByBasename(name) {
  if (!name) return null;
  const candidates = [];
  for (const root of [projectRoot, resolve(projectRoot, 'staging')]) candidates.push(...await walkAllFiles(root));
  return candidates.filter((path) => basename(path) === basename(name));
}
async function walkAllFiles(dir) {
  if (!(await exists(dir))) return [];
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = [];
  for (const entry of entries) {
    const path = resolve(dir, entry.name);
    if (entry.isDirectory()) paths.push(...await walkAllFiles(path));
    else paths.push(path);
  }
  return paths;
}
async function resolveRecordedPath(value) {
  if (typeof value !== 'string' || !value.trim()) return { path: null, resolution: 'missing' };
  const direct = isAbsolute(value) ? resolve(value) : resolve(projectRoot, value);
  if (await exists(direct)) return { path: direct, resolution: 'recorded' };
  const candidates = await findByBasename(value);
  if (candidates.length === 1) return { path: candidates[0], resolution: 'basename-fallback' };
  if (candidates.length > 1) return { path: null, resolution: 'basename-ambiguous', candidates: candidates.map(relativePath) };
  return { path: null, resolution: 'unresolved' };
}
function issue(code, detail) { return { code, detail }; }
function styleChainOf(receipt) {
  return Array.isArray(receipt.styleChain) ? receipt.styleChain.map((entry) => [entry?.name, entry?.strength]) : null;
}
function sameJson(left, right) { return JSON.stringify(left) === JSON.stringify(right); }
function relativePath(path) { return path ? relative(projectRoot, path).replaceAll('\\', '/') : null; }

function pathFromReceipt(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  return isAbsolute(value) ? resolve(value) : resolve(projectRoot, value);
}

async function loadEmbeddedBaseline() {
  const [workflowBytes, evidence] = await Promise.all([
    readFile(baselinePath),
    readJson(baselineEvidencePath),
  ]);
  const workflow = JSON.parse(workflowBytes.toString('utf8').replace(/^\uFEFF/u, ''));
  const workflowSha256 = sha256(workflowBytes);
  const topologySha256 = workflowTopologySha256(workflow);
  const sourcePath = pathFromReceipt(evidence.source?.png);
  if (evidence.verified !== true || evidence.workflow?.sha256 !== workflowSha256
    || evidence.runtime?.topologySha256 !== topologySha256 || !sourcePath || !(await exists(sourcePath))) {
    throw new Error('Embedded PNG Krea2 baseline evidence is stale or incomplete');
  }
  const sourceBytes = await readFile(sourcePath);
  const sourceSha256 = sha256(sourceBytes);
  if (evidence.source?.sourceSha256 !== sourceSha256) throw new Error('Embedded PNG Krea2 baseline source hash is invalid');
  return {
    workflowSha256,
    topologySha256,
    evidenceSha256: sha256(await readFile(baselineEvidencePath)),
    evidencePath: baselineEvidencePath,
    sourcePath,
    sourceSha256,
  };
}

export function validateFormalKrea2BaselineBinding(receipt, baseline) {
  const binding = receipt?.provenance?.baseline;
  return Boolean(baseline && binding
    && binding.workflowPath === 'staging/media/embedded-baseline/embedded-production-baseline.api.json'
    && binding.evidencePath === 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json'
    && binding.workflowSha256 === baseline.workflowSha256
    && binding.evidenceSha256 === baseline.evidenceSha256
    && binding.topologySha256 === baseline.topologySha256);
}

function recordedStyleChain(receipt) {
  const chain = Array.isArray(receipt.styleChain) ? receipt.styleChain : receipt.canonicalProduction?.sixLoraChain;
  return Array.isArray(chain) ? chain.map((entry) => [entry?.name, entry?.strength ?? entry?.strengthModel]) : null;
}

function graphStyleChain(workflow) {
  const loaders = Object.entries(workflow).filter(([, node]) => node?.class_type === 'LoraLoaderModelOnly');
  const ids = new Set(loaders.map(([id]) => id));
  const starts = loaders.filter(([, node]) => !ids.has(node.inputs?.model?.[0]));
  if (starts.length !== 1) return null;
  const chain = [];
  const visited = new Set();
  let current = starts[0];
  while (current) {
    if (visited.has(current[0])) return null;
    visited.add(current[0]);
    chain.push([current[1].inputs?.lora_name, current[1].inputs?.strength_model]);
    const next = loaders.filter(([, node]) => node.inputs?.model?.[0] === current[0]);
    if (next.length > 1) return null;
    current = next[0] ?? null;
  }
  return visited.size === loaders.length ? chain : null;
}

function invocationWorkflowOf(receipt) {
  if (receipt.workflow?.invocationPath) return { path: receipt.workflow.invocationPath };
  const workflow = receipt.output?.history?.prompt?.[2];
  return workflow && typeof workflow === 'object' ? { workflow, resolution: 'output-history' } : null;
}

async function auditReceipt(receiptPath, baseline) {
  const receipt = await readJson(receiptPath);
  const issues = [];
  const add = (code, detail) => issues.push(issue(code, detail));
  if (receipt.provider !== 'comfyui-local-krea2') add('provider', receipt.provider);
  if (!['awaiting-review', 'completed'].includes(receipt.status)) add('status', receipt.status);
  if (!sameJson(recordedStyleChain(receipt), expectedStyleChain)) add('six-lora-chain', recordedStyleChain(receipt));
  if (!hashPattern.test(receipt.promptSha256 ?? '') || sha256(receipt.prompt ?? '') !== receipt.promptSha256) add('prompt-hash', receipt.promptSha256);
  if (receipt.workflow?.baselineSha256 !== baseline.workflowSha256) add('baseline-hash', { recorded: receipt.workflow?.baselineSha256, actual: baseline.workflowSha256 });
  const evidence = receipt.workflow?.evidencePath ? await resolveRecordedPath(receipt.workflow.evidencePath) : { path: null };
  if (!evidence.path || evidence.path !== baseline.evidencePath || receipt.workflow?.evidenceSha256 !== baseline.evidenceSha256) {
    add('baseline-evidence-binding', { recordedPath: receipt.workflow?.evidencePath, resolvedPath: relativePath(evidence.path), recordedSha256: receipt.workflow?.evidenceSha256 });
  }

  const recordedInvocation = invocationWorkflowOf(receipt);
  const invocation = recordedInvocation?.path ? await resolveRecordedPath(recordedInvocation.path) : recordedInvocation;
  let invocationInfo = { recorded: recordedInvocation?.path ?? null, resolved: relativePath(invocation?.path), resolution: invocation?.resolution ?? 'missing' };
  if (invocation?.resolution === 'basename-ambiguous') add('path-basename-ambiguous', { field: 'workflow.invocationPath', candidates: invocation.candidates });
  if (!invocation?.workflow && !invocation?.path) add('invocation-missing', recordedInvocation?.path ?? null);
  else {
    const bytes = invocation.workflow ? Buffer.from(JSON.stringify(invocation.workflow)) : await readFile(invocation.path);
    const workflow = invocation.workflow ?? JSON.parse(bytes.toString('utf8').replace(/^\uFEFF/u, ''));
    const invocationSha256 = receipt.workflow?.serialization === 'stable-json-v1'
      ? sha256(stableJson(workflow)) : sha256(JSON.stringify(workflow));
    const topologySha256 = receipt.workflow?.serialization === 'stable-json-v1'
      ? workflowTopologySha256(workflow) : sha256(JSON.stringify(workflowTopology(workflow)));
    invocationInfo = { ...invocationInfo, fileSha256: sha256(bytes), invocationSha256, topologySha256 };
    if (recordedInvocation.path && receipt.workflow?.invocationFileSha256 !== invocationInfo.fileSha256) add('invocation-file-hash', receipt.workflow?.invocationFileSha256);
    if (receipt.workflow?.invocationSha256 !== invocationSha256) add('invocation-hash', receipt.workflow?.invocationSha256);
    if (receipt.workflow?.topologySha256 !== topologySha256 || topologySha256 !== baseline.topologySha256) add('invocation-topology-hash', { recorded: receipt.workflow?.topologySha256, actual: topologySha256, baseline: baseline.topologySha256 });
    // Node IDs in the embedded graph are not semantic ordering. Follow each
    // LoRA's MODEL edge from UNETLoader so the audit reflects execution order.
    const chain = graphStyleChain(workflow);
    if (!sameJson(chain, expectedStyleChain)) add('invocation-six-lora-chain', chain);
  }

  const output = await resolveRecordedPath(receipt.output?.finalPath ?? receipt.output?.path);
  let outputInfo = { recorded: receipt.output?.finalPath ?? receipt.output?.path ?? null, resolved: relativePath(output.path), resolution: output.resolution };
  if (output.resolution === 'basename-ambiguous') add('path-basename-ambiguous', { field: 'output.finalPath', candidates: output.candidates });
  if (!output.path) add('output-missing', outputInfo.recorded);
  else {
    const bytes = await readFile(output.path);
    outputInfo = { ...outputInfo, bytes: bytes.length, sha256: sha256(bytes) };
    if (receipt.output?.finalSha256 !== outputInfo.sha256 || receipt.output?.sha256 !== outputInfo.sha256) add('output-hash', { recorded: receipt.output, actual: outputInfo.sha256 });
  }

  const canonical = Array.isArray(receipt.references?.inputs) ? receipt.references.inputs.find((entry) => entry?.role === 'canonical-latent-origin') : null;
  const canonicalPath = canonical ? await resolveRecordedPath(canonical.path ?? canonical.file) : { path: null, resolution: 'missing' };
  const canonicalInfo = { recorded: canonical?.path ?? canonical?.file ?? null, resolved: relativePath(canonicalPath.path), resolution: canonicalPath.resolution, sha256: canonical?.sha256 ?? null };
  if (receipt.references?.sentToModel === true) {
    if (canonicalPath.resolution === 'basename-ambiguous') add('path-basename-ambiguous', { field: 'references.inputs.canonical-latent-origin', candidates: canonicalPath.candidates });
    if (!canonical || !hashPattern.test(canonical.sha256 ?? '')) add('canonical-evidence', canonical ?? null);
    else if (!canonicalPath.path) add('canonical-missing', canonicalInfo.recorded);
    else if (sha256(await readFile(canonicalPath.path)) !== canonical.sha256) add('canonical-hash', canonical.sha256);
  } else if (receipt.references?.sentToModel !== false) {
    add('reference-input-contract', receipt.references?.sentToModel);
  }

  const reviewPath = output.path ? resolve(dirname(output.path), basename(output.path).replace(/\.png$/iu, '.direct-review.json')) : null;
  let review = null;
  if (reviewPath && await exists(reviewPath)) review = await readJson(reviewPath);
  if (!review || review.status !== 'accepted' || review.promotionAllowed !== false || review.candidateSha256 !== outputInfo.sha256) add('direct-review', review ? { status: review.status, promotionAllowed: review.promotionAllowed, candidateSha256: review.candidateSha256 } : null);
  return {
    id: receipt.jobId ?? relativePath(receiptPath), receiptPath: relativePath(receiptPath),
    pass: issues.length === 0, issues, styleChain: recordedStyleChain(receipt), invocation: invocationInfo,
    output: outputInfo, canonical: canonicalInfo,
    directReview: review ? { path: relativePath(reviewPath), status: review.status, promotionAllowed: review.promotionAllowed, candidateSha256: review.candidateSha256, referenceSha256: review.referenceSha256 } : null,
  };
}

function shippedKrea2Assets(manifest) {
  return [...(manifest?.assets ?? []), ...(manifest?.portraits ?? [])]
    .filter((asset) => asset?.provenance?.provider === 'comfyui-local-krea2');
}

export function auditShippedAssets({ manifest, results, baseline }) {
  const receiptsByOutputHash = new Map();
  for (const result of results) {
    const hash = result.output?.sha256;
    if (!hash) continue;
    const matches = receiptsByOutputHash.get(hash) ?? [];
    matches.push(result);
    receiptsByOutputHash.set(hash, matches);
  }
  const entries = shippedKrea2Assets(manifest).map((asset) => {
    const receipts = receiptsByOutputHash.get(asset.sha256) ?? [];
    const receipt = receipts.length === 1 ? receipts[0] : null;
    const issues = [];
    if (receipts.length === 0) issues.push('receipt-output-unbound');
    if (receipts.length > 1) issues.push('receipt-output-ambiguous');
    if (receipt && !receipt.pass) issues.push('receipt-audit-failed');
    if (receipt && receipt.output.sha256 !== asset.sha256) issues.push('output-hash-mismatch');
    if (receipt && (!receipt.canonical?.recorded || !hashPattern.test(receipt.directReview?.referenceSha256 ?? '') || receipt.directReview.referenceSha256 !== receipt.canonical.sha256)) issues.push('canonical-review-unbound');
    if (receipt && (receipt.directReview?.status !== 'accepted' || receipt.directReview.candidateSha256 !== asset.sha256)) issues.push('direct-review-unbound');
    return {
      id: asset.id,
      path: asset.path,
      sha256: asset.sha256,
      receiptId: receipt?.id ?? null,
      receiptPath: receipt?.receiptPath ?? null,
      pass: issues.length === 0,
      issues,
    };
  });
  return {
    total: entries.length,
    bound: entries.filter((entry) => entry.pass).length,
    unbound: entries.filter((entry) => !entry.pass).length,
    entries,
  };
}

async function readKrea2ProvenanceReceipts(root) {
  const receipts = [];
  if (!(await exists(root))) return receipts;
  for (const name of await readdir(root)) {
    if (!name.endsWith('.json')) continue;
    const path = resolve(root, name);
    const receipt = await readJson(path);
    if (receipt?.provenance?.provider === 'comfyui-local-krea2') receipts.push({ path, receipt });
  }
  return receipts;
}

async function comfyProbe(url) {
  const base = new URL(url);
  if (base.protocol !== 'http:' || !['127.0.0.1', 'localhost', '::1'].includes(base.hostname)) throw new Error('ComfyUI URL must be loopback HTTP');
  const get = async (suffix) => {
    const response = await fetch(`${base.toString().replace(/\/$/u, '')}${suffix}`, { signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error(`${suffix} returned HTTP ${response.status}`);
    return response.json();
  };
  const [system, info] = await Promise.all([get('/system_stats'), get('/object_info')]);
  const enumValues = (node, field) => (((info[node]?.input?.required ?? {})[field] ?? [])[0] ?? []);
  const loras = enumValues('LoraLoaderModelOnly', 'lora_name');
  const weights = Object.fromEntries(Object.entries(expectedWeights).map(([slot, expected]) => [slot, { expected, present: enumValues({ diffusion_models: 'UNETLoader', text_encoders: 'CLIPLoader', vae: 'VAELoader' }[slot], { diffusion_models: 'unet_name', text_encoders: 'clip_name', vae: 'vae_name' }[slot]).includes(expected) }]));
  return { url: base.toString().replace(/\/$/u, ''), version: system.system?.comfyui_version, device: system.devices?.[0]?.name ?? null, weights, loras: { required: expectedStyleChain.map(([name]) => name), missing: expectedStyleChain.map(([name]) => name).filter((name) => !loras.includes(name)) } };
}

export async function runAudit({ receiptRoot, receiptRoots = defaultReceiptRoots, outputPath = defaultReportPath, manifestPath = defaultManifestPath, provenanceReceiptRoot = defaultProvenanceReceiptRoot, comfyUrl = process.env.ALBINA_COMFY_URL ?? 'http://127.0.0.1:8199', skipComfyProbe = false } = {}) {
  const baseline = await loadEmbeddedBaseline();
  const roots = receiptRoot ? [resolve(receiptRoot)] : receiptRoots.map((root) => resolve(root));
  const receiptPaths = [...new Set((await Promise.all(roots.map((root) => walk(root)))).flat())].sort();
  const results = [];
  for (const path of receiptPaths) {
    const receipt = await readJson(path);
    if (receipt.provider === 'comfyui-local-krea2' && sameJson(recordedStyleChain(receipt), expectedStyleChain)) results.push(await auditReceipt(path, baseline));
  }
  const probe = skipComfyProbe ? { skipped: true, url: comfyUrl } : await comfyProbe(comfyUrl);
  const manifest = await readJson(manifestPath);
  const provenanceReceipts = await readKrea2ProvenanceReceipts(provenanceReceiptRoot);
  const shipped = auditShippedAssets({ manifest, results, baseline });
  const provenanceByJobHash = new Map(provenanceReceipts.map(({ path, receipt }) => [receipt.provenance.sourceJobHash, { path, receipt }]));
  for (const entry of shipped.entries) {
    const asset = shippedKrea2Assets(manifest).find((candidate) => candidate.id === entry.id);
    const provenance = provenanceByJobHash.get(asset?.provenance?.sourceJobHash);
    if (!provenance) {
      if (!entry.issues.includes('provenance-receipt-missing')) entry.issues.push('provenance-receipt-missing');
      entry.pass = false;
      continue;
    }
    entry.provenanceReceiptPath = relativePath(provenance.path);
    if (provenance.receipt.artifactSha256 !== entry.sha256) entry.issues.push('provenance-artifact-hash-mismatch');
    if (!validateFormalKrea2BaselineBinding(provenance.receipt, baseline)) entry.issues.push('provenance-baseline-unbound');
    if (!entry.receiptId) entry.issues.push('production-receipt-missing');
    entry.pass = entry.issues.length === 0;
  }
  shipped.bound = shipped.entries.filter((entry) => entry.pass).length;
  shipped.unbound = shipped.entries.length - shipped.bound;
  // shipped.failed 只统计「已发布资产」的绑定失败（与 bound/unbound 同口径）；
  // staging 收据自身的审计失败记录在 counts.failed，不属于 shipped 口径。
  shipped.failed = shipped.unbound;
  const report = { schemaVersion: 3, auditedAt: new Date().toISOString(), method: 'embedded-png-baseline-receipt-output-history-direct-review-reverse-binding', baseline: { path: relativePath(baselinePath), sha256: baseline.workflowSha256, topologySha256: baseline.topologySha256, evidencePath: relativePath(baseline.evidencePath), evidenceSha256: baseline.evidenceSha256, sourcePng: relativePath(baseline.sourcePath), sourceSha256: baseline.sourceSha256 }, comfyui: probe, scope: { receiptRoots: roots.map(relativePath), discoveredReceipts: receiptPaths.length, sixLoraReceipts: results.length }, counts: { total: results.length, passed: results.filter((entry) => entry.pass).length, failed: results.filter((entry) => !entry.pass).length }, shipped, results };
  if (outputPath) {
    await mkdir(dirname(outputPath), { recursive: true });
    await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  }
  return { report, outputPath };
}

function cliOptions(argv) {
  const options = {};
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const index = raw.indexOf('=');
    const key = raw.slice(2, index < 0 ? undefined : index);
    const value = index < 0 ? true : raw.slice(index + 1);
    if (key === 'receipt-root') options.receiptRoot = value;
    else if (key === 'report') options.outputPath = resolve(String(value));
    else if (key === 'comfy-url') options.comfyUrl = String(value);
    else if (key === 'no-comfy-probe') options.skipComfyProbe = true;
    else throw new Error(`Unknown audit option: --${key}`);
  }
  return options;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const strict = process.argv.includes('--strict');
  try {
    const options = cliOptions(process.argv.slice(2).filter((arg) => arg !== '--strict'));
    const { report, outputPath } = await runAudit(options);
    const comfy = report.comfyui?.version ?? 'probe-skipped';
    console.log(`${report.counts.passed}/${report.counts.total} six-LoRA receipts pass; ComfyUI ${comfy}; report=${outputPath}`);
    for (const result of report.results.filter((entry) => !entry.pass)) console.log(`${result.id}: ${result.issues.map((entry) => entry.code).join(', ')}`);
    if (strict && (report.counts.failed > 0 || report.shipped.unbound > 0 || report.comfyui?.loras?.missing?.length > 0 || Object.values(report.comfyui?.weights ?? {}).some((entry) => !entry.present))) process.exitCode = 1;
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
