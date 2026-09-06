#!/usr/bin/env node
/**
 * Audit image receipts before a Krea2 asset can be promoted.
 * This is intentionally stricter than the visual asset manifest: a receipt
 * proves the graph that ran, while direct review proves the pixels are usable.
 */
import { createHash } from 'node:crypto';
import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';

import { stableJson, validateKrea2ProductionStyleChain, workflowTopologySha256 } from './lib/krea2-comfyui.mjs';

const root = resolve(import.meta.dirname, '..');
const staging = resolve(root, 'staging/media/krea2-canonical-restyle');
const reportPath = resolve(staging, 'krea2-production-audit-v1.json');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
const hashPattern = /^[a-f0-9]{64}$/u;

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function walk(dir) {
  if (!(await exists(dir))) return [];
  const out = [];
  for (const name of await readdir(dir)) {
    const path = resolve(dir, name);
    const info = await stat(path);
    if (info.isDirectory()) out.push(...await walk(path));
    else if (name.endsWith('.receipt.json')) out.push(path);
  }
  return out;
}

function issue(code, detail) { return { code, detail }; }

const EXPECTED_STYLE_CHAIN = [
  ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
  ['Krea2Rella_c1-st8000.safetensors', 0.65],
  ['onineko_k2_v1.safetensors', 0.45],
  ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
  ['masterpieces-v51.safetensors', 0.45],
  ['ichika-k2_c1-st5000.safetensors', 0.35],
];
const STYLE_EFFECT_CRITERIA = new Set([
  'linework', 'line-density', 'mechanical-edge', 'material-separation',
  'cel-shading', 'industrial-lighting', 'palette-treatment', 'surface-detail',
]);

function graphStyleChain(workflow) {
  const loaders = Object.entries(workflow).filter(([, node]) => node?.class_type === 'LoraLoaderModelOnly');
  const ids = new Set(loaders.map(([id]) => id));
  const start = loaders.find(([, node]) => !ids.has(node.inputs?.model?.[0]));
  if (!start) return null;
  const chain = [];
  const seen = new Set();
  let current = start;
  while (current) {
    if (seen.has(current[0])) return null;
    seen.add(current[0]);
    chain.push([current[1].inputs?.lora_name, current[1].inputs?.strength_model]);
    const next = loaders.filter(([, node]) => node.inputs?.model?.[0] === current[0]);
    if (next.length > 1) return null;
    current = next[0] ?? null;
  }
  return seen.size === loaders.length ? chain : null;
}

function canonicalLatentContract(workflow) {
  const entries = Object.entries(workflow);
  const sampler = entries.find(([, node]) => node?.class_type === 'SamplerCustomAdvanced');
  const latentOrigin = entries.find(([id, node]) => node?.class_type === 'VAEEncode'
    && sampler?.[1]?.inputs?.latent_image?.[0] === id);
  return {
    latentOrigin: Boolean(latentOrigin),
    zeroedNegative: entries.some(([, node]) => node?.class_type === 'ConditioningZeroOut'),
    styleChain: graphStyleChain(workflow),
  };
}

function pathFromReceipt(value, boundary) {
  if (typeof value !== 'string' || !value.trim()) return null;
  const path = isAbsolute(value) ? resolve(value) : resolve(root, value);
  if (boundary) {
    const local = relative(resolve(boundary), path).replaceAll('\\', '/');
    if (!local || local === '..' || local.startsWith('../') || isAbsolute(local)) return null;
  }
  return path;
}

function topology(workflow) {
  return Object.fromEntries(Object.entries(workflow).map(([id, node]) => [id, {
    class_type: node.class_type,
    inputs: Object.fromEntries(Object.entries(node.inputs ?? {}).filter(([key]) => ![
      'text', 'noise_seed', 'filename_prefix', 'aspect_ratio', 'megapixels',
    ].includes(key))),
  }]));
}

export function validateKrea2ProductionAuditWorkflow(workflow) {
  validateKrea2ProductionStyleChain(workflow);
  const nodes = Object.entries(workflow);
  const styleLoaders = nodes.filter(([, node]) => node.class_type === 'LoraLoaderModelOnly');
  if (styleLoaders.length !== 6) {
    throw new Error('Krea2 production workflow must contain exactly the six fixed style LoRAs');
  }
  if (nodes.some(([, node]) => node.class_type === 'ConditioningZeroOut')) {
    throw new Error('Krea2 production workflow forbids ConditioningZeroOut');
  }
  const samplers = nodes.filter(([, node]) => node.class_type === 'SamplerCustomAdvanced');
  if (samplers.length !== 1) {
    throw new Error('Krea2 production workflow requires exactly one SamplerCustomAdvanced');
  }
  const latentId = samplers[0][1].inputs?.latent_image?.[0];
  if (!nodes.some(([id, node]) => id === latentId && node.class_type === 'VAEEncode')) {
    throw new Error('Krea2 SamplerCustomAdvanced.latent_image must be connected to VAEEncode');
  }
  return true;
}

async function auditReceipt(path) {
  const receipt = JSON.parse(await readFile(path, 'utf8'));
  // Staging receipts for non-Krea2 finishing/compositing steps are audited by
  // their own contracts. Do not treat them as six-LoRA production receipts.
  if (receipt.provider !== 'comfyui-local-krea2') return null;
  const id = receipt.jobId ?? path;
  const issues = [];
  const add = (code, detail) => issues.push(issue(code, detail));
  if (receipt.provider !== 'comfyui-local-krea2') add('provider', receipt.provider);
  if (receipt.status !== 'completed') add('status', receipt.status);
  if (receipt.references?.sentToModel !== true) add('canonical-not-sent', receipt.references?.sentToModel);
  const recordedChain = Array.isArray(receipt.styleChain)
    ? receipt.styleChain.map((entry) => [entry?.name, entry?.strength])
    : null;
  if (stableJson(recordedChain) !== stableJson(EXPECTED_STYLE_CHAIN)) add('style-chain-receipt', receipt.styleChain);
  if (!hashPattern.test(receipt.promptSha256 ?? '') || hash(receipt.prompt ?? '') !== receipt.promptSha256) add('prompt-hash', receipt.promptSha256);
  const references = receipt.references?.inputs;
  const canonical = Array.isArray(references) ? references.find((entry) => entry?.role === 'canonical-latent-origin') : null;
  if (!canonical || !hashPattern.test(canonical.sha256 ?? '') || typeof canonical.path !== 'string') add('canonical-input-evidence', canonical ?? null);
  const recordedInvocationPath = receipt.workflow?.invocationPath;
  const invocationPath = pathFromReceipt(recordedInvocationPath, resolve(staging));
  if (!invocationPath || !(await exists(invocationPath))) {
    add('invocation-missing', recordedInvocationPath ?? null);
  } else {
    const invocationBytes = await readFile(invocationPath);
    let workflow;
    try { workflow = JSON.parse(invocationBytes.toString('utf8')); }
    catch (error) { add('invocation-json', error.message); }
    if (workflow) {
      try { validateKrea2ProductionAuditWorkflow(workflow); }
      catch (error) { add('style-chain-graph', error.message); }
      const contract = canonicalLatentContract(workflow);
      if (stableJson(contract.styleChain?.slice(0, EXPECTED_STYLE_CHAIN.length)) !== stableJson(EXPECTED_STYLE_CHAIN)) {
        add('style-chain-invocation', contract.styleChain);
      }
      if (!contract.latentOrigin) add('canonical-latent-disconnected', 'SamplerCustomAdvanced.latent_image must use VAEEncode');
      if (contract.zeroedNegative) add('zeroed-negative-conditioning', 'canonical restyle must use a real negative CLIPTextEncode');
      const legacyInvocationHash = hash(JSON.stringify(workflow));
      const reproducibleInvocationHash = hash(stableJson(workflow));
      const invocationHash = receipt.workflow?.invocationSha256;
      if (invocationHash !== legacyInvocationHash && invocationHash !== reproducibleInvocationHash) add('invocation-hash', { expected: [legacyInvocationHash, reproducibleInvocationHash], actual: invocationHash });
      if (receipt.workflow?.serialization === 'stable-json-v1' && invocationHash !== reproducibleInvocationHash) add('invocation-serialization', receipt.workflow?.serialization);
      if (receipt.workflow?.invocationFileSha256 !== hash(invocationBytes)) add('invocation-file-hash', receipt.workflow?.invocationFileSha256);
      const legacyTopologyHash = hash(JSON.stringify(topology(workflow)));
      const stableTopologyHash = workflowTopologySha256(workflow);
      if (![legacyTopologyHash, stableTopologyHash].includes(receipt.workflow?.topologySha256)) add('invocation-topology-hash', { expected: [legacyTopologyHash, stableTopologyHash], actual: receipt.workflow?.topologySha256 });
    }
  }
  const baselinePath = pathFromReceipt(receipt.workflow?.path) ?? resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline.api.json');
  if (!(await exists(baselinePath))) add('baseline-missing', baselinePath);
  else if (receipt.workflow?.baselineSha256 !== hash(await readFile(baselinePath))) add('baseline-hash', receipt.workflow?.baselineSha256);
  const evidencePath = pathFromReceipt(receipt.workflow?.evidencePath) ?? resolve(root, 'staging/media/embedded-baseline/embedded-production-baseline-evidence.json');
  if (receipt.workflow?.evidenceSha256 !== undefined) {
    if (!(await exists(evidencePath))) add('baseline-evidence-missing', evidencePath);
    else if (receipt.workflow.evidenceSha256 !== hash(await readFile(evidencePath))) add('baseline-evidence-hash', receipt.workflow.evidenceSha256);
  }
  const recordedOutputPath = receipt.output?.finalPath ?? receipt.output?.path;
  const outputPath = typeof recordedOutputPath === 'string'
    ? (recordedOutputPath.startsWith('/') || /^[A-Za-z]:[\\/]/u.test(recordedOutputPath)
      ? recordedOutputPath
      : resolve(root, recordedOutputPath))
    : null;
  let outputSha = null;
  if (typeof outputPath !== 'string' || !(await exists(outputPath))) add('output-missing', outputPath ?? null);
  else {
    outputSha = hash(await readFile(outputPath));
    if (receipt.output?.finalSha256 !== outputSha || receipt.output?.sha256 !== outputSha) add('output-hash', { expected: receipt.output, actual: outputSha });
  }
  if (canonical) {
    const canonicalPath = pathFromReceipt(canonical.path, resolve(root, 'staging/research/canon-visual'))
      ?? (typeof canonical.file === 'string' ? resolve(root, 'staging/research/canon-visual/wiki-game-assets', canonical.file) : null);
    if (!canonicalPath || !(await exists(canonicalPath))) add('canonical-missing', canonical.path);
    else if (hash(await readFile(canonicalPath)) !== canonical.sha256) add('canonical-hash', canonical.sha256);
  }
  const uploadedCanonical = receipt.references?.uploadedCanonical;
  if (canonical && uploadedCanonical) {
    // The uploaded input is intentionally a flattened RGB derivative of the
    // source PNG. Its bytes must not equal the source PNG bytes; bind both
    // hashes and require the declared transform instead.
    if (!hashPattern.test(uploadedCanonical.sha256 ?? '')) add('uploaded-canonical-hash', uploadedCanonical);
    if (uploadedCanonical.sourceSha256 !== canonical.sha256) add('uploaded-source-binding', uploadedCanonical);
    if (uploadedCanonical.transform !== 'flatten-alpha-over-neutral-field-34-34-38') add('uploaded-transform', uploadedCanonical);
    if (uploadedCanonical.path) {
      const uploadedPath = pathFromReceipt(uploadedCanonical.path, resolve(staging));
      if (!uploadedPath || !(await exists(uploadedPath))) add('uploaded-canonical-missing', uploadedCanonical.path);
      else if (hash(await readFile(uploadedPath)) !== uploadedCanonical.sha256) add('uploaded-canonical-file-hash', uploadedCanonical.sha256);
    }
  } else if (canonical) {
    add('uploaded-canonical-hash', uploadedCanonical ?? null);
  }
  if (!receipt.execution?.promptId || !hashPattern.test(receipt.execution?.historySha256 ?? '') || !receipt.execution?.outputBinding?.filename || !receipt.execution?.history) {
    add('execution-evidence', receipt.execution ?? null);
  } else {
    if (hash(JSON.stringify(receipt.execution.history)) !== receipt.execution.historySha256) add('execution-history-hash', receipt.execution.historySha256);
    const historyWorkflow = receipt.execution.history.prompt?.[2];
    if (historyWorkflow) {
      const contract = canonicalLatentContract(historyWorkflow);
      if (stableJson(contract.styleChain?.slice(0, EXPECTED_STYLE_CHAIN.length)) !== stableJson(EXPECTED_STYLE_CHAIN)) {
        add('execution-style-chain', contract.styleChain);
      }
      if (!contract.latentOrigin) add('execution-canonical-latent-disconnected', 'history sampler is not bound to VAEEncode');
      if (contract.zeroedNegative) add('execution-zeroed-negative-conditioning', 'history contains ConditioningZeroOut');
    }
    const historyInvocationHash = historyWorkflow ? hash(JSON.stringify(historyWorkflow)) : null;
    const historyStableHash = historyWorkflow ? hash(stableJson(historyWorkflow)) : null;
    if (!historyWorkflow || ![receipt.workflow?.invocationSha256, historyInvocationHash, historyStableHash].every((value) => value !== null && value !== undefined) || ![historyInvocationHash, historyStableHash].includes(receipt.workflow?.invocationSha256)) add('execution-invocation-binding', receipt.execution.history.prompt);
    if (historyWorkflow) {
      try { validateKrea2ProductionAuditWorkflow(historyWorkflow); }
      catch (error) { add('execution-style-chain-graph', error.message); }
    }
    const historyImage = Object.values(receipt.execution.history.outputs ?? {}).flatMap((output) => output.images ?? []).find((image) => image.filename === receipt.execution.outputBinding.filename);
    if (!historyImage) add('execution-output-binding', receipt.execution.outputBinding);
  }
  const reviewPath = typeof outputPath === 'string' ? outputPath.replace(/(?:\.rgb)?\.png$/u, '.direct-review.json') : null;
  if (!reviewPath || !(await exists(reviewPath))) add('direct-review-missing', reviewPath);
  else {
    const review = JSON.parse(await readFile(reviewPath, 'utf8'));
    if (review.status !== 'accepted' || review.candidateSha256 !== outputSha || review.referenceSha256 !== canonical?.sha256) add('direct-review', { status: review.status, candidateSha256: review.candidateSha256, outputSha });
    if (review.promotionAllowed === true) add('direct-review-overreach', 'direct review cannot grant promotion');
    const styleEvidence = Array.isArray(review.styleEffectEvidence)
      ? review.styleEffectEvidence.filter((criterion) => STYLE_EFFECT_CRITERIA.has(criterion))
      : [];
    if (styleEvidence.length < 2) {
      add('style-effect-evidence', 'accepted review must name at least two directly observed Krea2 style-effect criteria');
    }
  }
  return { id, receiptPath: path, outputPath, outputSha, pass: issues.length === 0, issues };
}

export { auditReceipt };

export async function runAudit({ stagingRoot = staging, outputPath = reportPath } = {}) {
  const results = [];
  for (const receiptPath of await walk(stagingRoot)) {
    const result = await auditReceipt(receiptPath);
    if (result) results.push(result);
  }
  results.sort((a, b) => a.id.localeCompare(b.id));
  const report = {
    schemaVersion: 1,
    auditedAt: new Date().toISOString(),
    method: 'receipt-invocation-six-lora-direct-review-gate',
    counts: {
      total: results.length,
      passed: results.filter((result) => result.pass).length,
      failed: results.filter((result) => !result.pass).length,
    },
    results,
  };
  await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
  return report;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const report = await runAudit();
  console.log(`${report.counts.passed}/${report.counts.total} receipts pass -> ${reportPath}`);
  for (const result of report.results.filter((entry) => !entry.pass)) console.log(`${result.id}: ${result.issues.map((entry) => entry.code).join(', ')}`);
  if (process.argv.includes('--strict') && report.counts.failed > 0) process.exitCode = 1;
}
