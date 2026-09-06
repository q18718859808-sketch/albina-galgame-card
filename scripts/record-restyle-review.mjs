#!/usr/bin/env node
/**
 * Record a direct (human-eye) review verdict for one Krea2 canonical restyle
 * and persist structure-safety evidence. A direct review never grants release
 * promotion; the release policy and rights gate remain separate decisions.
 *
 * Direct review is the final authority: this script only persists a verdict
 * that was already reached by opening the candidate and the canonical source.
 *
 * Usage:
 *   node scripts/record-restyle-review.mjs --id=albina-unarmored --status=accepted --passed="a" --passed="b"
 */
import { createHash } from 'node:crypto';
import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');
const ledgerPath = resolve(stagingRoot, 'restyle-ledger-v1.json');
const ledgerLockPath = `${ledgerPath}.lock`;
const canonRoot = resolve(projectRoot, 'staging/research/canon-visual/wiki-game-assets');

const REVIEW_METHOD = [
  'opened the candidate at original resolution and compared it against the canonical source',
  'through paired face / torso / lower-body / feet crops (face at nearest-neighbour 2x zoom);',
  'manual direct review is the final authority and no automated vision score can override it',
].join(' ');

const STYLE_EFFECT_TERMS = new Set([
  'linework', 'line-density', 'mechanical-edge', 'material-separation',
  'cel-shading', 'industrial-lighting', 'palette-treatment', 'surface-detail',
]);

function routeUsesSixLoraBaseline(receipt, fallbackId = '') {
  const id = receipt?.profile?.profileId ?? fallbackId;
  if (id === 'albina-community-style-transfer' || id === 'albina-edit-detail-pass') return false;
  const chain = receipt?.canonicalProduction?.sixLoraChain
    ?? receipt?.material?.loraChain
    ?? receipt?.styleChain
    ?? receipt?.loraChain;
  return Array.isArray(chain) && chain.length === 6;
}

function parseArgs(argv) {
  const args = { passed: [], rejected: [] };
  for (const raw of argv) {
    if (!raw.startsWith('--')) continue;
    const [key, ...rest] = raw.slice(2).split('=');
    const value = rest.join('=');
    if (key === 'passed' || key === 'rejected') args[key].push(value);
    else args[key] = value;
  }
  return args;
}

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.id) throw new Error('--id is required');
  const status = args.status ?? 'accepted';
  let lockHeld = false;
  for (let attempt = 0; attempt < 120; attempt += 1) {
    try {
      await mkdir(ledgerLockPath);
      lockHeld = true;
      break;
    } catch (error) {
      if (error.code !== 'EEXIST') throw error;
      await new Promise((resolveWait) => setTimeout(resolveWait, 100));
    }
  }
  if (!lockHeld) throw new Error(`timed out waiting for ledger lock: ${ledgerLockPath}`);

  try {
  const ledger = JSON.parse(await readFile(ledgerPath, 'utf8'));
  let entry = ledger.entries[args.id];
  if (!entry && args.receipt) {
    const receiptPath = resolve(projectRoot, args.receipt);
    const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
    // Krea2 pilots predate the canonical-restyle receipt schema.  Accept their
    // explicit `source`/`output` fields so a failed pilot can never evade the
    // direct-review ledger merely because its receipt was newer than this tool.
    const source = receipt.references?.inputs?.find((item) => item.role === 'canonical-source')?.path
      ?? receipt.pilot?.sourcePath ?? receipt.source?.path;
    const outputPath = receipt.output?.finalPath ?? receipt.output?.path;
    const sourceSha256 = receipt.references?.inputs?.find((item) => item.role === 'canonical-source')?.sha256
      ?? receipt.pilot?.sourceSha256 ?? receipt.source?.sha256;
    const outputSha256 = receipt.output?.finalSha256 ?? receipt.output?.sha256;
    if (!source || !outputPath) throw new Error(`receipt lacks canonical source or output for ${args.id}`);
    entry = ledger.entries[args.id] = {
      id: args.id,
      group: 'characters',
      source: source.replace(/^staging\/research\/canon-visual\/wiki-game-assets\//u, ''),
      receiptPath: resolve(projectRoot, args.receipt),
      outputPath: resolve(projectRoot, outputPath),
      outputSha256,
      sourceSha256,
      denoise: receipt.denoise,
      seed: receipt.seed,
      structuralControl: receipt.effectiveSampling?.structuralControl ?? null,
      depthControl: receipt.effectiveSampling?.structuralControl ?? null,
    };
  }
  if (!entry) throw new Error(`no ledger entry for ${args.id}; produce it first`);

  const candidateSha = sha256(await readFile(entry.outputPath));
  if (candidateSha !== entry.outputSha256) {
    throw new Error(`candidate hash drifted for ${args.id}; refusing to record a stale review`);
  }
  const sourceSha = sha256(await readFile(resolve(canonRoot, entry.source)));
  if (sourceSha !== entry.sourceSha256) {
    throw new Error(`canonical source hash drifted for ${args.id}`);
  }

  const receiptPath = entry.receiptPath ?? `${entry.outputPath.replace(/\.png$/u, '')}.receipt.json`;
  let receipt;
  try {
    receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
  } catch (error) {
    throw new Error(`receipt is required to record baseline evidence for ${args.id}: ${error instanceof Error ? error.message : String(error)}`);
  }

  const review = {
    schemaVersion: 1,
    id: args.id,
    status,
    reviewer: 'codex-direct-original-resolution-review',
    reviewMethod: REVIEW_METHOD,
    reviewPairsDir: `staging/media/krea2-canonical-restyle/review-v2/${args.id}`,
    method: ledger.method,
    referenceSha256: sourceSha,
    candidateSha256: candidateSha,
    workflow: {
      sixStyleLorasPreserved: routeUsesSixLoraBaseline(receipt, args.id),
      identityEditUsed: false,
      structuralControlUsed: Boolean(entry.structuralControl ?? entry.depthControl),
      postGenerationComposite: false,
      denoise: entry.denoise,
      seed: entry.seed,
    },
    passed: args.passed,
    rejected: args.rejected,
    styleEffectEvidence: args.passed.filter((value) => STYLE_EFFECT_TERMS.has(value)),
    notes: args.notes ?? '',
    promotionAllowed: false,
    releaseDecision: 'pending-explicit-release-policy',
    reviewedAt: new Date().toISOString(),
  };
  if (status === 'accepted' && review.styleEffectEvidence.length < 2) {
    throw new Error('accepted direct review requires at least two named, directly observed Krea2 style-effect criteria');
  }
  const reviewPath = `${entry.outputPath.replace(/\.png$/u, '')}.direct-review.json`;
  await writeFile(reviewPath, `${JSON.stringify(review, null, 2)}\n`, 'utf8');

  entry.directReview = status;
  entry.promotionAllowed = false;
  entry.releaseDecision = 'pending-explicit-release-policy';
  entry.directReviewPath = reviewPath;
  entry.directReviewedAt = review.reviewedAt;
    await writeFile(ledgerPath, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
    console.log(`${args.id}: ${status} -> ${reviewPath}`);
  } finally {
    await rm(ledgerLockPath, { recursive: true, force: true });
  }
}

await main();
