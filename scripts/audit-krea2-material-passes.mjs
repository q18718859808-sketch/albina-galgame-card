#!/usr/bin/env node
/**
 * Build a read-only inventory for canonical-structure Krea2 material passes.
 *
 * A material pass is a staging derivative: canonical pixels own structure and
 * alpha, Krea2 contributes RGB material, and direct image review never grants
 * promotion by itself.
 */
import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { isAbsolute, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const defaultStagingRoot = resolve(projectRoot, 'staging/media');
const defaultManifestPath = resolve(defaultStagingRoot, 'krea2-material-pass-manifest-v1.json');
const hashPattern = /^[a-f0-9]{64}$/u;
const groups = new Set(['characters', 'backgrounds', 'cg']);

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function exists(path) {
  try { await stat(path); return true; } catch { return false; }
}

async function walk(dir) {
  if (!(await exists(dir))) return [];
  const result = [];
  for (const name of await readdir(dir)) {
    const path = resolve(dir, name);
    const info = await stat(path);
    if (info.isDirectory()) result.push(...await walk(path));
    else if (name.endsWith('.receipt.json')) result.push(path);
  }
  return result.sort((a, b) => a.localeCompare(b));
}

function issue(code, detail) { return { code, detail }; }

function receiptPath(root, value, label, boundary) {
  if (typeof value !== 'string' || value.trim().length === 0) return null;
  const path = isAbsolute(value) ? resolve(value) : resolve(root, value);
  const local = relative(boundary, path).replaceAll('\\', '/');
  if (!local || local === '..' || local.startsWith('../') || isAbsolute(local)) return null;
  return path;
}

function groupFor(outputPath, stagingRoot) {
  const local = relative(stagingRoot, outputPath).replaceAll('\\', '/');
  return local.split('/').find((segment) => groups.has(segment)) ?? null;
}

export async function auditMaterialReceipt(receiptFile, { root = projectRoot, stagingRoot = defaultStagingRoot } = {}) {
  const issues = [];
  let receipt;
  try {
    receipt = JSON.parse(await readFile(receiptFile, 'utf8'));
  } catch (error) {
    return { id: receiptFile, receiptPath: receiptFile, group: null, pass: false, issues: [issue('receipt-json', error.message)] };
  }
  if (receipt?.kind !== 'canonical-structure-krea2-material-pass') return null;
  const add = (code, detail) => issues.push(issue(code, detail));
  const stagingMedia = resolve(stagingRoot);
  const canonicalBoundary = resolve(root, 'staging/research/canon-visual');
  const canonicalPath = receiptPath(root, receipt.canonical?.path, 'canonical', canonicalBoundary);
  const materialPath = receiptPath(root, receipt.krea2Material?.path, 'Krea2 material', stagingMedia);
  const outputPath = receiptPath(root, receipt.output?.path, 'material-pass output', stagingMedia);
  const productionReceiptPath = receiptPath(root, receipt.krea2Material?.productionReceipt, 'Krea2 production receipt', root);
  const group = outputPath ? groupFor(outputPath, stagingMedia) : null;

  if (receipt.schemaVersion !== 1) add('schema-version', receipt.schemaVersion);
  if (!['awaiting-direct-review', 'reviewed-structure-safe', 'reviewed-rejected'].includes(receipt.status)) add('status', receipt.status);
  if (receipt.promotionAllowed !== false) add('promotion-block', receipt.promotionAllowed);
  if (receipt.invariant?.structureSource !== 'canonical-rgba') add('structure-source', receipt.invariant?.structureSource);
  if (receipt.invariant?.alphaSource !== 'canonical') add('alpha-source', receipt.invariant?.alphaSource);
  if (receipt.invariant?.materialSource !== 'krea2-rgb') add('material-source', receipt.invariant?.materialSource);
  if (receipt.invariant?.generatedText !== false) add('generated-text', receipt.invariant?.generatedText);
  if (receipt.invariant?.sixLoraReceiptRequired !== true) add('six-lora-receipt-required', receipt.invariant?.sixLoraReceiptRequired);
  if (receipt.review?.directImageReadRequired !== true) add('direct-review-required', receipt.review);
  if (receipt.review?.automatedVisionAdvisoryOnly !== true) add('automated-review-policy', receipt.review);
  if (!canonicalPath) add('canonical-boundary', receipt.canonical?.path);
  if (!materialPath) add('material-boundary', receipt.krea2Material?.path);
  if (!outputPath) add('output-boundary', receipt.output?.path);
  if (!group) add('asset-group', receipt.output?.path);
  if (!productionReceiptPath) add('production-receipt-boundary', receipt.krea2Material?.productionReceipt);
  else if (!(await exists(productionReceiptPath))) add('production-receipt-missing', productionReceiptPath);
  else {
    let productionReceipt;
    try { productionReceipt = JSON.parse(await readFile(productionReceiptPath, 'utf8')); }
    catch (error) { add('production-receipt-json', error.message); }
    const expectedChain = [
      ['z3zz4-k2-4_c1-st5000.safetensors', 0.55],
      ['Krea2Rella_c1-st8000.safetensors', 0.65],
      ['onineko_k2_v1.safetensors', 0.45],
      ['meion_krea2_style_v7.0_c1-st4000.safetensors', 0.45],
      ['masterpieces-v51.safetensors', 0.45],
      ['ichika-k2_c1-st5000.safetensors', 0.35],
    ];
    const actualChain = Array.isArray(productionReceipt?.styleChain)
      ? productionReceipt.styleChain.map((entry) => [entry?.name, entry?.strength]) : null;
    if (productionReceipt?.provider !== 'comfyui-local-krea2') add('production-receipt-provider', productionReceipt?.provider);
    if (JSON.stringify(actualChain) !== JSON.stringify(expectedChain)) add('production-receipt-six-lora-chain', actualChain);
    if (productionReceipt?.status !== 'completed') add('production-receipt-status', productionReceipt?.status);
  }

  const files = [
    ['canonical', canonicalPath, receipt.canonical?.sha256],
    ['krea2-material', materialPath, receipt.krea2Material?.sha256],
    ['output', outputPath, receipt.output?.sha256],
  ];
  for (const [label, path, expected] of files) {
    if (!path || !(await exists(path))) { add(`${label}-missing`, path ?? null); continue; }
    if (!hashPattern.test(expected ?? '')) { add(`${label}-hash-format`, expected); continue; }
    const bytes = await readFile(path);
    const actual = sha256(bytes);
    if (actual !== expected) add(`${label}-hash`, { expected, actual });
    if (label === 'output' && receipt.output?.bytes !== bytes.length) add('output-bytes', { expected: receipt.output?.bytes, actual: bytes.length });
  }

  const directReview = receipt.directReview;
  if (directReview && directReview.promotionAllowed !== false) add('direct-review-promotion-block', directReview.promotionAllowed);
  if (receipt.status === 'reviewed-structure-safe' && directReview?.status !== 'accepted') add('accepted-review-missing', directReview?.status);
  if (receipt.status === 'awaiting-direct-review' && directReview) add('unexpected-direct-review', directReview.status);
  return {
    id: receipt.output?.path ?? receiptFile,
    receiptPath: receiptFile,
    group,
    status: receipt.status,
    promotionAllowed: false,
    pass: issues.length === 0,
    issues,
  };
}

export async function runAudit({ root = projectRoot, stagingRoot = defaultStagingRoot, outputPath } = {}) {
  const results = [];
  for (const receiptFile of await walk(stagingRoot)) {
    const result = await auditMaterialReceipt(receiptFile, { root, stagingRoot });
    if (result) results.push(result);
  }
  results.sort((a, b) => a.id.localeCompare(b.id));
  const byGroup = Object.fromEntries([...groups].map((group) => {
    const entries = results.filter((result) => result.group === group);
    return [group, { total: entries.length, passed: entries.filter((entry) => entry.pass).length, failed: entries.filter((entry) => !entry.pass).length }];
  }));
  const manifest = {
    schemaVersion: 1,
    kind: 'krea2-canonical-material-pass-manifest',
    method: 'receipt-hash-boundary-direct-review-audit',
    promotionPolicy: 'always-blocked-until-explicit-release-policy',
    auditedAt: new Date().toISOString(),
    counts: { total: results.length, passed: results.filter((entry) => entry.pass).length, failed: results.filter((entry) => !entry.pass).length },
    byGroup,
    results,
  };
  if (outputPath) await writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.filename)) {
  const write = process.argv.includes('--write');
  const manifest = await runAudit({ outputPath: write ? defaultManifestPath : undefined });
  console.log(JSON.stringify({ ...manifest.counts, byGroup: manifest.byGroup, outputPath: write ? defaultManifestPath : null }, null, 2));
  if (process.argv.includes('--strict') && manifest.counts.failed > 0) process.exitCode = 1;
}
