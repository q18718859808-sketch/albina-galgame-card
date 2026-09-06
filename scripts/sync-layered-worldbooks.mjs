import { createHash } from 'node:crypto';
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { isDeepStrictEqual } from 'node:util';
import { basename, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const sourceRoot = resolve(projectRoot, 'content/worldbook');
const worldbookRoots = [
  resolve(projectRoot, 'dist/albina-galgame-card/worldbooks'),
  resolve(projectRoot, 'release/github-cdn-root/dist/albina-galgame-card/worldbooks'),
];
const canonicalWorldbookName = 'albina_canon_worldbook_v1.json';
const canonicalWorldbookPath = resolve(worldbookRoots[0], canonicalWorldbookName);
const sourceManifestPath = resolve(sourceRoot, 'albina-worldbook-packages-v1.manifest.json');
const releaseManifestName = 'albina_worldbook_packages_v1.json';
const allowedPackageIds = new Set([
  'l1-albina-core',
  'l2-canto-ix-and-main-cast',
  'l3-world-expansion',
  'plot-full-timeline',
  'l4-mechanics',
  'l5-reviewed-identities',
  'au-if',
]);
const forbiddenPackageIds = new Set(['quarantine-unverified-rp', 'source-index']);
const mode = process.argv.includes('--write') ? 'write' : 'check';

const sourceManifestBytes = await readFile(sourceManifestPath);
const sourceManifest = JSON.parse(sourceManifestBytes.toString('utf8'));
const packages = sourceManifest.packages.filter((entry) => allowedPackageIds.has(entry.id));
if (packages.length !== allowedPackageIds.size) throw new Error('Layered worldbook manifest is missing an approved release package');
if (sourceManifest.packages.some((entry) => forbiddenPackageIds.has(entry.id) && entry.defaultEnabled)) throw new Error('Forbidden worldbook package is enabled');

const l0Source = JSON.parse(await readFile(resolve(projectRoot, sourceManifest.l0.file), 'utf8'));
const canonicalWorldbookBytes = await readFile(canonicalWorldbookPath);
const canonicalWorldbook = JSON.parse(canonicalWorldbookBytes.toString('utf8'));
if (l0Source.entries.length !== sourceManifest.l0.entryCount) throw new Error('L0 source entry count does not match the manifest');
if (canonicalWorldbook.entries?.length !== sourceManifest.l0.entryCount) throw new Error('Canonical L0 worldbook must contain all 16 entries');
if (!isDeepStrictEqual(canonicalWorldbook.entries, l0Source.entries)) throw new Error('Canonical L0 worldbook entries differ from the L0 source');

const expectedFiles = new Map();
expectedFiles.set(canonicalWorldbookName, canonicalWorldbookBytes);
for (const entry of packages) {
  const sourcePath = resolve(projectRoot, entry.file);
  const bytes = await readFile(sourcePath);
  if (sha256(bytes) !== entry.sha256) throw new Error(`Layered worldbook hash mismatch: ${entry.id}`);
  expectedFiles.set(basename(sourcePath), bytes);
}

const releaseManifest = {
  schemaVersion: 1,
  id: 'albina-release-worldbook-packages-v1',
  sourceManifestSha256: sha256(sourceManifestBytes),
  l0: {
    id: 'l0-minimal-card-anchors',
    embeddedFile: 'albina_canon_worldbook_v1.json',
    entryCount: sourceManifest.l0.entryCount,
    policy: 'standalone fallback; do not combine with the layered full preset',
  },
  presets: {
    canonicalCore: sourceManifest.presets.canonicalCore,
    canonicalExpanded: sourceManifest.presets.canonicalExpanded,
    mechanicsOptIn: sourceManifest.presets.mechanicsOptIn,
    identityOptIn: sourceManifest.presets.identityOptIn,
    auOptIn: sourceManifest.presets.auOptIn,
  },
  packages: packages.map((entry) => ({
    id: entry.id,
    file: basename(entry.file),
    defaultEnabled: entry.defaultEnabled,
    entryCount: entry.entryCount,
    enabledEntryCount: entry.enabledEntryCount,
    contentCharacters: entry.contentCharacters,
    sha256: entry.sha256,
  })),
  excluded: {
    quarantine: { id: 'quarantine-unverified-rp', entryCount: 258, reason: 'unverified RP evidence; local audit only' },
    sourceIndex: { id: 'source-index', entryCount: 1882, reason: 'bridge/index records; never runtime injection' },
  },
};
expectedFiles.set(releaseManifestName, Buffer.from(`${JSON.stringify(releaseManifest, null, 2)}\n`, 'utf8'));

if (mode === 'write') {
  for (const root of worldbookRoots) {
    await mkdir(root, { recursive: true });
    for (const [name, bytes] of expectedFiles) await writeFile(resolve(root, name), bytes);
    await removeStaleLayeredFiles(root, expectedFiles);
  }
  console.log(`Synchronized ${packages.length} layered worldbook packages, the 16-entry L0 worldbook, and release manifests.`);
} else {
  for (const root of worldbookRoots) {
    for (const [name, expected] of expectedFiles) {
      const actual = await readFile(resolve(root, name));
      if (!actual.equals(expected)) throw new Error(`Layered worldbook release file is stale: ${root}/${name}`);
    }
  }
  console.log('Layered worldbook release files and the 16-entry L0 worldbook are synchronized.');
}

async function removeStaleLayeredFiles(root, expected) {
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (!entry.isFile() || expected.has(entry.name)) continue;
    if (/^albina[-_]worldbook|^albina_worldbook_packages/iu.test(entry.name)) await rm(resolve(root, entry.name), { force: true });
  }
}

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}
