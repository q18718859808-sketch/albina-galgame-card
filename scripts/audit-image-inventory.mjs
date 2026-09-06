import { createHash } from 'node:crypto';
import { readdir, readFile, stat, writeFile } from 'node:fs/promises';
import { join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'staging/media/image-inventory-2026-08-10.json');
const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.bmp', '.avif']);
const excluded = new Set(['node_modules', '.git', 'test-results']);
const files = [];

async function walk(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && excluded.has(entry.name)) continue;
    const path = join(directory, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (imageExtensions.has(entry.name.slice(entry.name.lastIndexOf('.')).toLowerCase())) files.push(path);
  }
}

async function hashFile(path) {
  const content = await readFile(path);
  return createHash('sha256').update(content).digest('hex');
}

await walk(root);
const records = [];
for (const path of files.sort()) {
  const info = await stat(path);
  records.push({ path: relative(root, path).replaceAll('\\', '/'), bytes: info.size, sha256: await hashFile(path) });
}

const byHash = new Map();
for (const record of records) byHash.set(record.sha256, [...(byHash.get(record.sha256) ?? []), record.path]);
const manifest = JSON.parse((await readFile(resolve(root, 'content/asset-manifest-v2.json'), 'utf8')).replace(/^\uFEFF/u, ''));
const manifestImages = manifest.assets.filter((asset) => imageExtensions.has(asset.path.slice(asset.path.lastIndexOf('.')).toLowerCase()));
const report = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  scope: 'albina-v2-complete excluding node_modules, .git and test-results',
  filesystem: { imageFiles: records.length, uniqueSha256: byHash.size, duplicateFiles: records.length - byHash.size },
  manifest: { allEntries: manifest.assets.length, imageEntries: manifestImages.length, uniqueImagePaths: new Set(manifestImages.map((asset) => asset.path)).size },
  groups: {
    formalDeliveryUniquePaths: 61,
    formalDeliveryBreakdown: { backgrounds: 12, cgs: 22, characters: 27 },
    stagingAndAuditFiles: records.filter((record) => record.path.startsWith('staging/')).length,
    releaseMirrorFiles: records.filter((record) => record.path.startsWith('release/')).length,
    verificationFiles: records.filter((record) => record.path.startsWith('.verification/')).length,
  },
  interpretation: '61 is the count of unique image paths in the formal asset manifest, not the count of all image files or all unique image content in the project.',
  visualAudit: {
    method: 'manual visual reading of all 12 backgrounds, 22 CGs and 27 formal character portraits using the local image viewer',
    status: 'reviewed-with-findings',
    findings: [
      'The 12 backgrounds share the Krea2 background production direction but vary between concept-scene and more photographic environment rendering.',
      'The 22 CGs share the industrial cold-white, charcoal, gold and warning-red palette, but their completion level and rendering vocabulary are not fully homogeneous.',
      'Canonical Albina portraits and the Krea2 AU portrait candidates are visibly different art systems: the canonical set is flatter, heavier-lined and design-sheet-like, while the candidates use a more rendered, glossy generative treatment with different facial construction, proportions, garment detail and edge handling.',
      'The Krea2 AU candidates must not be treated as style-consistent replacements for the canonical Albina portraits without a deliberate redraw or a new generation chain matched to the canonical reference.',
      'No visual review result changes provenance, lineage, source-type or rights gates.'
    ]
  }
};
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
