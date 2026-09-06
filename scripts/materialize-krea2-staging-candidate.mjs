#!/usr/bin/env node
/** Materialize only directly reviewed Krea2 staging assets into an isolated candidate pack. */
import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { basename, dirname, resolve } from 'node:path';
import { createHash } from 'node:crypto';

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'content/media-production/krea2-staged-production-manifest-v1.json');
const candidateRoot = resolve(root, 'staging/release-candidate/krea2-v1');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const assets = [];

for (const item of manifest.acceptedStaging) {
  const review = JSON.parse(await readFile(resolve(root, item.review), 'utf8'));
  if (!String(review.status).startsWith('accepted-') || review.promotionAllowed === true) {
    throw new Error(`staging item is not review-eligible: ${item.id}`);
  }
  const source = resolve(root, item.output);
  const target = resolve(candidateRoot, targetFor(item.id));
  await mkdir(dirname(target), { recursive: true });
  await copyFile(source, target);
  const bytes = await readFile(target);
  const artifactSha256 = sha256(bytes);
  if (artifactSha256 !== review.candidateSha256) throw new Error(`review hash mismatch: ${item.id}`);
  assets.push({
    id: item.id,
    source: item.source,
    candidatePath: relativeCandidate(target),
    artifactSha256,
    review: item.review,
    reviewStatus: review.status,
    rights: 'unverified',
    releasePromotionAllowed: false,
  });
}

const output = {
  schemaVersion: 1,
  kind: 'krea2-release-candidate-pack',
  status: 'candidate-only-rights-and-release-review-required',
  productionProfile: manifest.productionProfile,
  generatedAt: new Date().toISOString(),
  assets,
  policy: 'This pack never replaces dist or release assets. Promotion requires verified rights, formal promotion receipt, and final release sync.',
};
await writeFile(resolve(candidateRoot, 'candidate-manifest.json'), `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ candidateRoot, materialized: assets.length, promotionAllowed: false }, null, 2));

function sha256(bytes) { return createHash('sha256').update(bytes).digest('hex'); }
function relativeCandidate(path) { return path.slice(candidateRoot.length + 1).replaceAll('\\', '/'); }
function targetFor(id) {
  if (id.startsWith('cg-')) return `assets/cg/${id.replaceAll('-', '_')}.png`;
  if (id.startsWith('bg-')) return `assets/bg/${id.slice(3).replaceAll('-', '_')}.png`;
  if (id === 'albina-unarmored') return 'assets/characters/albina/normal.png';
  if (id === 'albina-armored') return 'assets/characters/albina/armored.png';
  if (['callisto', 'dante', 'faust', 'ren', 'vergilius'].includes(id)) return `assets/characters/${id}/normal.png`;
  throw new Error(`no candidate target mapping for ${id}`);
}
