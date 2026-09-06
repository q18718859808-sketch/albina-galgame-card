#!/usr/bin/env node
/**
 * Build a hash-bound production ledger for every shipped image.
 *
 * This does not promote or rewrite assets. It makes the missing evidence
 * explicit: every image needs a canonical source, a Krea2 material receipt,
 * a direct visual review, and a rights decision before release.
 */
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const manifestPath = resolve(root, 'content/asset-manifest-v2.json');
const outputPath = resolve(root, 'staging/media/krea2-material-production-manifest-v1.json');
const canonPath = resolve(root, 'content/media-production/canon-visual-sources-v1.json');

const digest = (bytes) => createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
const canon = JSON.parse(await readFile(canonPath, 'utf8'));
const canonicalByPath = new Map((canon.assets ?? []).map((asset) => [asset.localPath.replaceAll('\\', '/'), asset]));
const images = [...new Map((manifest.assets ?? [])
  .filter((asset) => asset.kind === 'image')
  .map((asset) => [asset.path, asset])).values()];
const sourceFiles = new Map((canon.assets ?? []).map((asset) => [asset.localPath.replaceAll('\\', '/'), asset]));
const classify = (asset) => {
  if (asset.path.startsWith('characters/')) return 'character';
  if (asset.path.startsWith('bg/')) return 'background';
  if (asset.path.startsWith('cg/')) return 'cg';
  return 'image';
};
const byBase = new Map([...sourceFiles.values()].map((asset) => [asset.localPath.split('/').at(-1)?.toLowerCase(), asset]));
const explicitCanonical = new Map([
  ['bg/lce_lab.jpg', '9-18-lce-lab-bg.png'],
  ['bg/ring_corridor.jpg', '9-43-ring-corridor-bg.png'],
  ['characters/albina/normal.png', 'albina-unarmored-standing.png'],
  ['characters/albina/armored.png', 'albina-armored-standing.png'],
  ['characters/callisto/normal.png', 'callisto-standing.png'],
  ['characters/dante/normal.png', 'dante-standing.png'],
  ['characters/faust/normal.png', 'faust-standing.png'],
  ['characters/ren/normal.png', 'ren-standing.png'],
  ['characters/vergilius/normal.png', 'vergilius-standing.png'],
  ['cg/9_14_s908.jpg', '9-14-s908.png'],
  ['cg/9_14_s914.jpg', '9-14-s914.png'],
  ['cg/9_18_s909_1.jpg', '9-18-s909-1.png'],
  ['cg/9_18_s909_2.jpg', '9-18-s909-2.png'],
  ['cg/9_18_s918.jpg', '9-18-s918.png'],
  ['cg/9_37_s937.jpg', '9-37-s937.png'],
  ['cg/9_43_s929_1.jpg', '9-43-s929-1.png'],
  ['cg/9_43_s929_2.jpg', '9-43-s929-2.png'],
  ['cg/9_43_s930_1.jpg', '9-43-s930-1.png'],
  ['cg/9_43_s930_2.jpg', '9-43-s930-2.png'],
  ['cg/9_43_s943_1.jpg', '9-43-s943-1.png'],
  ['cg/9_43_s943_2.jpg', '9-43-s943-2.png'],
]);
function guessCanonical(asset) {
  const explicit = explicitCanonical.get(asset.path);
  if (explicit) return [...sourceFiles.values()].find((candidate) => candidate.localPath.split('/').at(-1) === explicit) ?? null;
  const base = asset.path.split('/').at(-1)?.toLowerCase();
  const direct = byBase.get(base?.replace(/\.(jpg|jpeg|webp)$/u, '.png')) ?? byBase.get(base);
  if (direct) return direct;
  const stem = base?.replace(/\.[^.]+$/u, '').replaceAll('_', '-');
  return [...sourceFiles.values()].find((candidate) => {
    const candidateStem = candidate.localPath.split('/').at(-1)?.toLowerCase().replace(/\.[^.]+$/u, '');
    return candidateStem && stem && (candidateStem.includes(stem) || stem.includes(candidateStem));
  }) ?? null;
}
const entries = images.map((asset) => {
  const canonical = guessCanonical(asset);
  const shippedPath = resolve(root, 'dist/albina-galgame-card/assets', asset.path);
  const shippedBytes = (() => {
    try { return readFileSync(shippedPath); } catch { return null; }
  })();
  return {
    id: asset.id,
    kind: classify(asset),
    shipped: { path: asset.path, sha256: asset.sha256, bytes: asset.bytes, present: Boolean(shippedBytes), currentSha256: shippedBytes ? digest(shippedBytes) : null },
    canonical: canonical ? { id: canonical.id, path: canonical.localPath, sha256: canonical.sha256, reviewStatus: canonical.reviewStatus } : null,
    production: {
      method: canonical ? 'canonical-structure-krea2-material-pass' : 'missing-canonical-source',
      sixLoraBaselineRequired: true,
      krea2Receipt: null,
      directReview: 'blocked',
      promotionAllowed: false,
      rights: 'blocked-unverified',
    },
  };
});
const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  purpose: 'full-shipped-image-krea2-production-ledger',
  counts: { images: entries.length, character: entries.filter((x) => x.kind === 'character').length, background: entries.filter((x) => x.kind === 'background').length, cg: entries.filter((x) => x.kind === 'cg').length },
  policy: {
    structureAuthority: 'canonical-reference',
    materialAuthority: 'krea2-six-lora-output',
    directImageReadRequired: true,
    automatedVisionAdvisoryOnly: true,
    unverifiedRightsBlockPromotion: true,
  },
  entries,
};
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ outputPath, counts: output.counts, blocked: entries.length }, null, 2));
