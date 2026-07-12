import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const projectRoot = resolve(import.meta.dirname, '..');
const canonicalRoot = resolve(projectRoot, 'dist/albina-galgame-card');
const assetRoot = resolve(canonicalRoot, 'assets');
const releaseRoot = resolve(projectRoot, 'release/github-cdn-root');
const releaseMirrorRoot = resolve(releaseRoot, 'dist/albina-galgame-card');
const contentManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const releaseVersion = '2.0.0';
const cdnBase = `https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v${releaseVersion}/dist/albina-galgame-card`;
const mediaExtensions = new Set(['.jpg', '.json', '.mp3', '.mp4', '.png', '.svg', '.wav']);

const toPosix = (path) => path.replaceAll('\\', '/');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const fileId = (path) => `file.${path.toLowerCase().replace(/[^a-z0-9]+/gu, '.').replace(/^\.|\.$/gu, '')}`;
const stripId = (path) => `strip.${path.replace(/_strip\.png$/u, '').replace(/[^a-z0-9-]+/giu, '.').replace(/^\.|\.$/gu, '')}`;

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}

async function pathExists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function walkFiles(root) {
  if (!(await pathExists(root))) return [];
  const result = [];
  for (const entry of (await readdir(root, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) {
    const path = resolve(root, entry.name);
    if (entry.isDirectory()) result.push(...await walkFiles(path));
    else result.push(path);
  }
  return result;
}

function kindFor(path) {
  const extension = extname(path).toLowerCase();
  if (['.jpg', '.png', '.svg'].includes(extension)) return 'image';
  if (extension === '.mp4') return 'video';
  if (['.mp3', '.wav'].includes(extension)) return 'audio';
  return 'json';
}

function mimeFor(path) {
  return ({
    '.jpg': 'image/jpeg', '.json': 'application/json', '.mp3': 'audio/mpeg', '.mp4': 'video/mp4',
    '.png': 'image/png', '.svg': 'image/svg+xml', '.wav': 'audio/wav',
  })[extname(path).toLowerCase()];
}

async function physicalAssets() {
  const ignored = new Set(['manifest.json', 'manifest.template.json', 'sprite-atlas/_progress.json', 'asset-manifest-v2.json', 'runtime-lookup.json']);
  const records = [];
  for (const path of await walkFiles(assetRoot)) {
    const relativePath = toPosix(relative(assetRoot, path));
    if (!mediaExtensions.has(extname(path).toLowerCase()) || ignored.has(relativePath)) continue;
    const bytes = await readFile(path);
    records.push({ id: fileId(relativePath), kind: kindFor(relativePath), path: relativePath, mimeType: mimeFor(relativePath), sha256: hash(bytes), bytes: bytes.length });
  }
  return records;
}

async function preferredPath(folder, name, extensions) {
  for (const extension of extensions) {
    const candidate = `${folder}/${name}${extension}`;
    if (await pathExists(resolve(assetRoot, candidate))) return candidate;
  }
  return undefined;
}

async function readStory() {
  const index = await readJson(resolve(projectRoot, 'content/game-script-v2.json'));
  const scenes = [];
  for (const dialogueFile of index.dialogueFiles) {
    scenes.push(...await readJson(resolve(projectRoot, 'content', dialogueFile)));
  }
  return scenes;
}

function collectStoryReferences(scenes) {
  const references = new Set();
  for (const scene of scenes) {
    ['backgroundAssetId', 'cgAssetId', 'voiceAssetId', 'bgmAssetId'].forEach((key) => scene[key] && references.add(scene[key]));
    scene.portraits.forEach((portrait) => references.add(portrait.portraitAssetId));
    (scene.sfxAssetIds ?? []).forEach((id) => references.add(id));
    scene.choices.forEach((choice) => choice.resultVoiceAssetId && references.add(choice.resultVoiceAssetId));
  }
  return [...references].sort();
}

async function semanticAssets(references) {
  const records = [];
  for (const id of references) {
    const [family, ...parts] = id.split('.');
    if (!['bg', 'cg'].includes(family)) continue;
    const path = await preferredPath(family, parts.join('.'), ['.jpg', '.png', '.svg']);
    if (!path) continue;
    const bytes = await readFile(resolve(assetRoot, path));
    records.push({ id, kind: 'image', path, mimeType: mimeFor(path), sha256: hash(bytes), bytes: bytes.length });
  }
  return records;
}

function pngDimensions(bytes) {
  if (bytes.toString('ascii', 1, 4) !== 'PNG') throw new Error('Strip is not a PNG');
  return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
}

async function completedPortraits(progress) {
  const portraits = [];
  for (const [key, entry] of Object.entries(progress).filter(([, value]) => value.status === 'done').sort()) {
    const path = toPosix(entry.output).replace(/^assets\//u, '');
    const source = toPosix(entry.source).replace(/^assets\//u, '');
    const bytes = await readFile(resolve(assetRoot, path));
    const dimensions = pngDimensions(bytes);
    const name = key.replace(/_strip\.png$/u, '');
    const [characterId, ...expressionParts] = name.split('/');
    portraits.push({
      version: 2, id: `portrait.${characterId}.${expressionParts.join('.')}`, characterId, path,
      animation: { kind: 'strip', frameCount: 8, frameWidth: dimensions.width / 8, frameHeight: dimensions.height, fps: 8 },
      fallbackAssetId: fileId(source),
    });
  }
  portraits.push({ version: 2, id: 'portrait.fascia.normal', characterId: 'fascia', path: 'characters/albina/fascia-open.png', animation: { kind: 'static' } });
  return portraits.sort((a, b) => a.id.localeCompare(b.id));
}

function pendingStripEntries(progress) {
  const failed = Object.entries(progress).filter(([, entry]) => entry.status === 'failed');
  const unattempted = ['original_albina_sprites/sad_strip.png', 'original_albina_sprites/smile_strip.png'].map((key) => [key, {
    source: `assets/${key.replace('_strip.png', '.png')}`, output: `assets/sprite-atlas/${key}`, attempts: 0,
  }]);
  return [...failed, ...unattempted].sort(([left], [right]) => left.localeCompare(right));
}

function stripJobs(progress) {
  const assets = [];
  const jobs = [];
  for (const [key, entry] of pendingStripEntries(progress)) {
    const outputPath = toPosix(entry.output).replace(/^assets\//u, '');
    const inputPath = toPosix(entry.source).replace(/^assets\//u, '');
    const assetId = stripId(key);
    assets.push({ id: assetId, kind: 'image', path: outputPath, mimeType: 'image/png' });
    jobs.push({
      version: 2, id: `job.${assetId}`, assetId, kind: 'image-edit', model: 'gpt-image-2', status: 'pending',
      contentHash: hash(JSON.stringify({ assetId, inputPath, outputPath })), inputAssetIds: [fileId(inputPath)], outputPath,
      attempts: entry.attempts ?? 0, ...(entry.error ? { error: entry.error } : {}),
    });
  }
  return { assets, jobs };
}

async function voiceAssets(references) {
  const assets = [];
  const jobs = [];
  for (const assetId of references.filter((id) => id.startsWith('voice.'))) {
    const outputPath = `audio/voice/${assetId.replace(/^voice\./u, '').replaceAll('.', '/')}.mp3`;
    if (await pathExists(resolve(assetRoot, outputPath))) {
      const bytes = await readFile(resolve(assetRoot, outputPath));
      assets.push({ id: assetId, kind: 'audio', path: outputPath, mimeType: 'audio/mpeg', sha256: hash(bytes), bytes: bytes.length });
    } else {
      assets.push({ id: assetId, kind: 'audio', path: outputPath, mimeType: 'audio/mpeg' });
      jobs.push({
        version: 2, id: `job.${assetId}`, assetId, kind: 'speech', model: 'speech-2.8-hd', status: 'pending',
        contentHash: hash(JSON.stringify({ assetId, outputPath })), inputAssetIds: [], outputPath, attempts: 0,
      });
    }
  }
  return { assets, jobs };
}

async function videoAssets() {
  const assets = [];
  for (const profile of ['runtime', 'desktop']) {
    const root = resolve(assetRoot, 'video/animated', profile);
    for (const path of await walkFiles(root)) {
      if (extname(path).toLowerCase() !== '.mp4') continue;
      const name = relative(root, path).replaceAll('\\', '/').replace(/\.mp4$/u, '');
      const outputPath = `video/animated/${profile}/${name}.mp4`;
      const bytes = await readFile(path);
      assets.push({ id: `video.animated.${profile}.${name}`, kind: 'video', path: outputPath, mimeType: 'video/mp4', sha256: hash(bytes), bytes: bytes.length });
    }
  }
  return assets;
}

async function buildManifest() {
  const progress = await readJson(resolve(assetRoot, 'sprite-atlas/_progress.json'));
  const references = collectStoryReferences(await readStory());
  const strips = stripJobs(progress);
  const voices = await voiceAssets(references);
  const assets = [...await physicalAssets(), ...await semanticAssets(references), ...await videoAssets(), ...strips.assets, ...voices.assets];
  assets.sort((a, b) => a.id.localeCompare(b.id));
  return { version: 2, projectId: 'albina-galgame-card', basePath: 'assets', assets, portraits: await completedPortraits(progress), mediaJobs: [...strips.jobs, ...voices.jobs].sort((a, b) => a.id.localeCompare(b.id)) };
}

function runtimeUrl(basePath, path) {
  return `${cdnBase}/${basePath}/${path.split('/').map(encodeURIComponent).join('/')}`;
}

function buildLookup(manifest) {
  const pendingIds = new Set(manifest.mediaJobs.filter((job) => job.status === 'pending').map((job) => job.assetId));
  const assetsById = {};
  const portraitsById = {};
  const pendingById = {};
  for (const asset of manifest.assets) {
    const url = runtimeUrl(manifest.basePath, asset.path);
    if (pendingIds.has(asset.id)) pendingById[asset.id] = url;
    else assetsById[asset.id] = url;
  }
  for (const portrait of manifest.portraits) portraitsById[portrait.id] = runtimeUrl(manifest.basePath, portrait.path);
  return { version: 2, projectId: manifest.projectId, base: cdnBase, assetsById, portraitsById, pendingById };
}

async function directoryMap(folder, prefix, extensions) {
  const result = {};
  const root = resolve(assetRoot, folder);
  if (!(await pathExists(root))) return result;
  for (const path of await walkFiles(root)) {
    const extension = extname(path).toLowerCase();
    if (!extensions.includes(extension)) continue;
    const name = toPosix(relative(root, path)).slice(0, -extension.length);
    if (name.includes('/') || result[name]) continue;
    result[name] = `assets/${folder}/${name}${extension}`;
  }
  return Object.fromEntries(Object.entries(result).sort(([a], [b]) => a.localeCompare(b)));
}

async function characterMap() {
  const result = {};
  const root = resolve(assetRoot, 'characters');
  for (const path of await walkFiles(root)) {
    const extension = extname(path).toLowerCase();
    if (!['.png', '.svg'].includes(extension)) continue;
    const [character, file] = toPosix(relative(root, path)).split('/');
    if (!character || !file) continue;
    const expression = file.slice(0, -extension.length);
    result[character] ??= {};
    if (!result[character][expression] || extension === '.png') result[character][expression] = `assets/characters/${character}/${file}`;
  }
  return result;
}

async function updateLegacyManifest() {
  const path = resolve(canonicalRoot, 'manifest.json');
  const legacy = await readJson(path);
  legacy.base = cdnBase;
  legacy.version = releaseVersion;
  legacy.asset_manifest_v2 = 'assets/asset-manifest-v2.json';
  legacy.runtime_lookup = 'assets/runtime-lookup.json';
  legacy.bg = await directoryMap('bg', 'bg', ['.jpg', '.png', '.svg']);
  legacy.cg = await directoryMap('cg', 'cg', ['.jpg', '.png', '.svg']);
  legacy.characters = await characterMap();
  legacy.ui = await directoryMap('ui', 'ui', ['.png', '.svg']);
  legacy.videos = await directoryMap('videos', 'video', ['.mp4']);
  legacy.audio = { ...await directoryMap('audio/bgm', 'audio.bgm', ['.mp3', '.wav']), ...await directoryMap('audio/se', 'audio.se', ['.mp3', '.wav']) };
  await writeFile(path, `${JSON.stringify(legacy, null, 2)}\n`);
}

async function writeGeneratedArtifacts() {
  const manifest = await buildManifest();
  const lookup = buildLookup(manifest);
  await mkdir(resolve(canonicalRoot, 'assets'), { recursive: true });
  await writeFile(contentManifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(resolve(assetRoot, 'asset-manifest-v2.json'), `${JSON.stringify(manifest, null, 2)}\n`);
  await writeFile(resolve(assetRoot, 'runtime-lookup.json'), `${JSON.stringify(lookup, null, 2)}\n`);
  await updateLegacyManifest();
  return { manifest, lookup };
}

async function hashedFiles(root) {
  const files = await walkFiles(root);
  return new Map(await Promise.all(files.map(async (path) => [toPosix(relative(root, path)), hash(await readFile(path))])));
}

async function classifyRelease() {
  const [canonicalFiles, releaseFiles] = await Promise.all([hashedFiles(canonicalRoot), hashedFiles(releaseRoot)]);
  const report = { duplicate: [], missing: [], mismatch: [], stale: [] };
  const mirrorSeen = new Set();
  for (const [releasePath, releaseHash] of releaseFiles) {
    const nestedPrefix = 'dist/albina-galgame-card/';
    const canonicalPath = releasePath.startsWith(nestedPrefix) ? releasePath.slice(nestedPrefix.length) : releasePath;
    if (releasePath.startsWith(nestedPrefix)) mirrorSeen.add(canonicalPath);
    if (!canonicalFiles.has(canonicalPath)) report.stale.push(releasePath);
    else if (canonicalFiles.get(canonicalPath) === releaseHash) report.duplicate.push(releasePath);
    else report.mismatch.push(releasePath);
  }
  for (const canonicalPath of canonicalFiles.keys()) if (!mirrorSeen.has(canonicalPath)) report.missing.push(`dist/albina-galgame-card/${canonicalPath}`);
  Object.values(report).forEach((paths) => paths.sort());
  return report;
}

function collectLocalReferences(value, references = []) {
  if (typeof value === 'string' && /^(?:assets|albina-bridge|cinema|sfe)\//u.test(value)) references.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectLocalReferences(item, references));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectLocalReferences(item, references));
  return references;
}

async function auditManifest(manifest, lookup) {
  const unresolved = [];
  const ids = new Set([...manifest.assets.map((asset) => asset.id), ...manifest.portraits.map((portrait) => portrait.id)]);
  const pendingIds = new Set(manifest.mediaJobs.filter((job) => job.status === 'pending').map((job) => job.assetId));
  for (const asset of manifest.assets) if (!pendingIds.has(asset.id) && !(await pathExists(resolve(assetRoot, asset.path)))) unresolved.push(`missing asset: ${asset.id} -> ${asset.path}`);
  for (const portrait of manifest.portraits) if (!(await pathExists(resolve(assetRoot, portrait.path)))) unresolved.push(`missing portrait: ${portrait.id} -> ${portrait.path}`);
  for (const job of manifest.mediaJobs) {
    if (!ids.has(job.assetId)) unresolved.push(`unknown job asset: ${job.id} -> ${job.assetId}`);
    job.inputAssetIds.filter((id) => !ids.has(id)).forEach((id) => unresolved.push(`unknown job input: ${job.id} -> ${id}`));
  }
  const lookupIds = new Set([...Object.keys(lookup.assetsById), ...Object.keys(lookup.portraitsById), ...Object.keys(lookup.pendingById)]);
  for (const id of ids) if (!lookupIds.has(id)) unresolved.push(`missing runtime lookup: ${id}`);
  return unresolved;
}

async function auditLegacyManifest() {
  const legacy = await readJson(resolve(canonicalRoot, 'manifest.json'));
  const unresolved = [];
  for (const path of collectLocalReferences(legacy)) if (!(await pathExists(resolve(canonicalRoot, path)))) unresolved.push(`missing legacy reference: ${path}`);
  return unresolved;
}

async function auditStory(lookup) {
  const resolvable = new Set([...Object.keys(lookup.assetsById), ...Object.keys(lookup.portraitsById), ...Object.keys(lookup.pendingById)]);
  return collectStoryReferences(await readStory()).filter((id) => !resolvable.has(id)).map((id) => `missing story reference: ${id}`);
}

async function auditMutableLoaders() {
  const files = ['card/albina.card.json', 'card/character-card.template.json', 'card/card-protocol.md', 'card/character_card_protocol.md', 'dist/albina-galgame-card/albina-bridge/albina-bridge.js', 'dist/albina-galgame-card/albina-bridge/albina-sprite-atlas.js', 'dist/albina-galgame-card/sfe/sfe-director.js', 'dist/albina-galgame-card/video-injector.js'];
  const text = (await Promise.all(files.map((path) => readFile(resolve(projectRoot, path), 'utf8')))).join('\n');
  const unresolved = [];
  if (/@v(?!2\.0\.0\b)\d+\.\d+\.\d+/u.test(text)) unresolved.push('mixed CDN version tags');
  if (text.includes('/release/github-cdn-root/')) unresolved.push('release-tree CDN path');
  if (text.includes('https://cdn.jsdelivr.net/gh/malove/foo')) unresolved.push('placeholder CDN root');
  if (/["'`]\/assets\/audio\//u.test(text)) unresolved.push('root-relative audio URL');
  return unresolved;
}

async function audit() {
  const manifest = await readJson(contentManifestPath);
  const lookup = await readJson(resolve(assetRoot, 'runtime-lookup.json'));
  const unresolved = [...await auditManifest(manifest, lookup), ...await auditLegacyManifest(), ...await auditStory(lookup), ...await auditMutableLoaders()];
  return { unresolved, release: await classifyRelease(), inventory: { canonicalFiles: (await walkFiles(canonicalRoot)).length, releaseFiles: (await walkFiles(releaseRoot)).length } };
}

const arguments_ = new Set(process.argv.slice(2));
if (arguments_.has('--write')) await writeGeneratedArtifacts();
const report = await audit();
if (arguments_.has('--json')) process.stdout.write(`${JSON.stringify(report)}\n`);
else console.log(`Asset audit: ${report.unresolved.length} unresolved; release missing=${report.release.missing.length}, mismatch=${report.release.mismatch.length}, stale=${report.release.stale.length}`);
if (report.unresolved.length > 0) process.exitCode = 1;
