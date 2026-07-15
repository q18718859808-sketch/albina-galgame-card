import { createHash } from 'node:crypto';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

import { validateAssetIntegrity } from './lib/asset-integrity.mjs';
import { attachPromotionProvenance, loadPromotionReceipts } from './lib/promotion-receipts.mjs';
import { hasReleaseDifferences, isExcludedReleaseAssetPath, isLegacyPublishablePath, isPrivateEnvironmentPath } from './lib/release-integrity.mjs';
import { collectStoryAssetReferences, findUnresolvedStoryReferences, materializeStoryMedia } from './lib/story-media.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const canonicalRoot = resolve(projectRoot, 'dist/albina-galgame-card');
const assetRoot = resolve(canonicalRoot, 'assets');
const releaseRoot = resolve(projectRoot, 'release/github-cdn-root');
const releaseMirrorRoot = resolve(releaseRoot, 'dist/albina-galgame-card');
const contentManifestPath = resolve(projectRoot, 'content/asset-manifest-v2.json');
const pendingGalleryCgsPath = resolve(projectRoot, 'content/pending-gallery-cgs.json');
const audioLicenseRegistryPath = resolve(projectRoot, 'content/audio-licenses-v1.json');
const promotionReceiptsRoot = resolve(projectRoot, 'tools/media/production/receipts');
const audioCreditsPath = resolve(assetRoot, 'audio/CREDITS.json');
const bgmRoot = resolve(assetRoot, 'audio/bgm');
const releaseVersion = '2.0.0-rc.1';
const previewBase = '.';
const mediaExtensions = new Set(['.jpg', '.json', '.mp3', '.mp4', '.png', '.svg', '.wav']);

const toPosix = (path) => path.replaceAll('\\', '/');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const fileId = (path) => `file.${path.toLowerCase().replace(/[^a-z0-9]+/gu, '.').replace(/^\.|\.$/gu, '')}`;

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}

function assertHttpsUrl(value, label) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`${label} must be a valid URL`); }
  if (url.protocol !== 'https:') throw new Error(`${label} must use HTTPS`);
}

function validateAudioTrack(track, index) {
  const label = `Audio license track ${index}`;
  const required = ['assetId', 'path', 'sha256', 'cueAlias', 'title', 'creator', 'isrc', 'sourceUrl', 'licenseId', 'licenseUrl', 'attribution'];
  if (!track || typeof track !== 'object' || required.some((key) => typeof track[key] !== 'string' || !track[key])) {
    throw new Error(`${label} is missing required metadata`);
  }
  if (!/^audio\/bgm\/[a-z0-9_]+\.(?:mp3|wav)$/u.test(track.path)) throw new Error(`${label} has an invalid BGM path`);
  if (track.cueAlias !== track.path.replace(/^audio\/bgm\//u, '').replace(/\.(?:mp3|wav)$/u, '')) throw new Error(`${label} cue alias does not match its file`);
  if (track.assetId !== fileId(track.path)) throw new Error(`${label} asset id does not match its path`);
  if (!/^[a-f0-9]{64}$/u.test(track.sha256)) throw new Error(`${label} has an invalid SHA-256`);
  if (!/^[A-Z]{2}[A-Z0-9]{3}\d{7}$/u.test(track.isrc)) throw new Error(`${label} has an invalid ISRC`);
  if (track.licenseId !== 'CC-BY-4.0' || track.licenseUrl !== 'https://creativecommons.org/licenses/by/4.0/') {
    throw new Error(`${label} must use the registered CC BY 4.0 license`);
  }
  if (track.creator !== 'Kevin MacLeod') throw new Error(`${label} must identify Kevin MacLeod as creator`);
  assertHttpsUrl(track.sourceUrl, `${label} source URL`);
  assertHttpsUrl(track.licenseUrl, `${label} license URL`);
  const source = new URL(track.sourceUrl);
  if (source.hostname !== 'incompetech.com' || source.pathname !== '/music/royalty-free/index.html' || source.searchParams.get('isrc') !== track.isrc) {
    throw new Error(`${label} source URL must be its Incompetech ISRC page`);
  }
  if (![track.title, track.creator, 'CC BY 4.0'].every((value) => track.attribution.includes(value))) {
    throw new Error(`${label} attribution must identify title, creator, and license`);
  }
}

async function loadAudioLicenseRegistry() {
  const registry = await readJson(audioLicenseRegistryPath);
  if (registry.version !== 1 || registry.projectId !== 'albina-galgame-card' || typeof registry.packagedNotice !== 'string' || !Array.isArray(registry.tracks) || registry.tracks.length !== 5) {
    throw new Error('Invalid audio license registry');
  }
  registry.tracks.forEach(validateAudioTrack);
  for (const key of ['assetId', 'path', 'sha256', 'cueAlias', 'isrc']) {
    if (new Set(registry.tracks.map((track) => track[key])).size !== registry.tracks.length) throw new Error(`Duplicate audio license ${key}`);
  }
  const official = registry.officialSoundtrack;
  if (!official || official.publisher !== 'ProjectMoon' || official.bundled !== false || official.cached !== false || !Array.isArray(official.links) || official.links.length !== 2) {
    throw new Error('Official soundtrack links must remain external-only');
  }
  official.links.forEach((link, index) => assertHttpsUrl(link?.url, `Official soundtrack link ${index}`));
  const officialUrls = new Set(official.links.map((link) => link.url));
  if (!officialUrls.has('https://www.youtube.com/playlist?list=PL9-RBacZ4KMzFjhRY4zD7_GbwL1LgNWXD') || !officialUrls.has('https://www.youtube.com/watch?v=n5GI6EkCXCo')) {
    throw new Error('Official soundtrack links must include the ProjectMoon playlist and Canto IX video');
  }
  if (official.termsUrl !== 'https://limbuscompany.com/terms-of-service/') throw new Error('Unexpected ProjectMoon terms URL');
  return registry;
}

function licenseForTrack(track) {
  return Object.fromEntries(['cueAlias', 'title', 'creator', 'isrc', 'sourceUrl', 'licenseId', 'licenseUrl', 'attribution'].map((key) => [key, track[key]]));
}

function attachAudioLicenses(assets, registry) {
  const tracks = new Map(registry.tracks.map((track) => [track.path, track]));
  return assets.map((asset) => {
    if (!asset.path.startsWith('audio/bgm/')) return asset;
    const track = tracks.get(asset.path);
    if (!track) throw new Error(`Unregistered packaged BGM: ${asset.path}`);
    if (asset.id !== track.assetId || asset.sha256 !== track.sha256) throw new Error(`Packaged BGM identity mismatch: ${asset.path}`);
    return { ...asset, license: licenseForTrack(track) };
  });
}

async function writeAudioCredits(registry) {
  await mkdir(resolve(assetRoot, 'audio'), { recursive: true });
  await writeFile(audioCreditsPath, `${JSON.stringify(registry, null, 2)}\n`);
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
    if (!mediaExtensions.has(extname(path).toLowerCase()) || ignored.has(relativePath) || isExcludedReleaseAssetPath(relativePath)) continue;
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
  return materializeStoryMedia(scenes);
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

async function staticAlbinaPortraits() {
  const root = resolve(assetRoot, 'characters/albina');
  const portraits = [];
  for (const path of await walkFiles(root)) {
    if (extname(path).toLowerCase() !== '.png') continue;
    const expression = relative(root, path).replaceAll('\\', '/').replace(/\.png$/u, '');
    if (expression.includes('/')) continue;
    portraits.push({
      version: 2, id: `portrait.albina.${expression}`, characterId: 'albina',
      path: `characters/albina/${expression}.png`, animation: { kind: 'static' },
    });
  }
  return portraits;
}

async function completedStripPortraits() {
  const root = resolve(assetRoot, 'sprite-atlas');
  const portraits = [];
  for (const path of await walkFiles(root)) {
    const outputPath = toPosix(relative(assetRoot, path));
    if (!outputPath.endsWith('_strip.png') || isExcludedReleaseAssetPath(outputPath)) continue;
    const name = toPosix(relative(root, path)).replace(/_strip\.png$/u, '');
    const [characterId, ...expressionParts] = name.split('/');
    const expression = expressionParts.join('.');
    const source = `characters/${characterId}/${expression}.png`;
    const dimensions = pngDimensions(await readFile(path));
    portraits.push({
      version: 2, id: `portrait.${characterId}.${expression}`, characterId, path: outputPath,
      animation: { kind: 'strip', frameCount: 8, frameWidth: dimensions.width / 8, frameHeight: dimensions.height, fps: 8 },
      fallbackAssetId: fileId(source),
    });
  }
  return portraits;
}

async function approvedPortraits() {
  const portraits = [...await staticAlbinaPortraits(), ...await completedStripPortraits()];
  return portraits.sort((a, b) => a.id.localeCompare(b.id));
}

async function pendingGalleryCgs() {
  const plan = await readJson(pendingGalleryCgsPath);
  if (plan.version !== 1 || !Array.isArray(plan.assets)) throw new Error('Invalid pending gallery CG registry');
  const assets = [];
  const jobs = [];
  for (const entry of plan.assets) {
    if (!entry || typeof entry.id !== 'string' || typeof entry.path !== 'string' || typeof entry.sourceAssetId !== 'string'
      || !Number.isInteger(entry.width) || !Number.isInteger(entry.height) || typeof entry.promptVersion !== 'string') {
      throw new Error('Invalid pending gallery CG entry');
    }
    if (await pathExists(resolve(assetRoot, entry.path))) continue;
    const inputAssetIds = [entry.sourceAssetId];
    assets.push({ id: entry.id, kind: 'image', path: entry.path, mimeType: 'image/png' });
    jobs.push({
      version: 2, id: `job.${entry.id}`, assetId: entry.id, kind: 'image-edit', provider: 'pie', model: 'gpt-image-2', promptVersion: entry.promptVersion, status: 'pending',
      contentHash: hash(JSON.stringify({ assetId: entry.id, inputAssetIds, outputPath: entry.path, width: entry.width, height: entry.height, provider: 'pie', model: 'gpt-image-2', promptVersion: entry.promptVersion })),
      inputAssetIds, outputPath: entry.path, attempts: 0,
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
        version: 2, id: `job.${assetId}`, assetId, kind: 'speech', provider: 'pie', model: 'speech-2.8-hd', promptVersion: 'albina-speech-v1', status: 'pending',
        contentHash: hash(JSON.stringify({ assetId, outputPath, provider: 'pie', model: 'speech-2.8-hd', promptVersion: 'albina-speech-v1' })), inputAssetIds: [], outputPath, attempts: 0,
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
      if (isExcludedReleaseAssetPath(outputPath)) continue;
      const bytes = await readFile(path);
      assets.push({ id: `video.animated.${profile}.${name}`, kind: 'video', path: outputPath, mimeType: 'video/mp4', sha256: hash(bytes), bytes: bytes.length });
    }
  }
  return assets;
}

async function buildManifest(audioLicenseRegistry) {
  const references = collectStoryAssetReferences(await readStory());
  const galleryCgs = await pendingGalleryCgs();
  const voices = await voiceAssets(references);
  const assets = [...await physicalAssets(), ...await semanticAssets(references), ...await videoAssets(), ...galleryCgs.assets, ...voices.assets];
  assets.sort((a, b) => a.id.localeCompare(b.id));
  const licensedAssets = attachAudioLicenses(assets, audioLicenseRegistry);
  const receiptPaths = (await walkFiles(promotionReceiptsRoot)).filter((path) => extname(path).toLowerCase() === '.json');
  const assetsWithProvenance = attachPromotionProvenance(licensedAssets, await loadPromotionReceipts(receiptPaths));
  return { version: 2, projectId: 'albina-galgame-card', basePath: 'assets', assets: assetsWithProvenance, portraits: await approvedPortraits(), mediaJobs: [...galleryCgs.jobs, ...voices.jobs].sort((a, b) => a.id.localeCompare(b.id)) };
}

function runtimeUrl(basePath, path) {
  return `${basePath}/${path.split('/').map(encodeURIComponent).join('/')}`;
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
  return { version: 2, projectId: manifest.projectId, base: previewBase, assetsById, portraitsById, pendingById };
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
  for (const key of Object.keys(legacy)) if (/^_v\d/u.test(key)) delete legacy[key];
  for (const key of ['bridge', 'sfe', 'cinema']) delete legacy[key];
  legacy.base = previewBase;
  legacy.version = releaseVersion;
  legacy.asset_manifest_v2 = 'assets/asset-manifest-v2.json';
  legacy.runtime_lookup = 'assets/runtime-lookup.json';
  legacy.bg = await directoryMap('bg', 'bg', ['.jpg', '.png', '.svg']);
  legacy.cg = await directoryMap('cg', 'cg', ['.jpg', '.png', '.svg']);
  legacy.characters = await characterMap();
  legacy.ui = await directoryMap('ui', 'ui', ['.png', '.svg']);
  legacy.videos = {};
  legacy.audio = { ...await directoryMap('audio/bgm', 'audio.bgm', ['.mp3', '.wav']), ...await directoryMap('audio/se', 'audio.se', ['.mp3', '.wav']) };
  await writeFile(path, `${JSON.stringify(legacy, null, 2)}\n`);
}

async function writeGeneratedArtifacts() {
  const audioLicenseRegistry = await loadAudioLicenseRegistry();
  await writeAudioCredits(audioLicenseRegistry);
  const manifest = await buildManifest(audioLicenseRegistry);
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
  if (typeof value === 'string' && /^assets\//u.test(value)) references.push(value);
  else if (Array.isArray(value)) value.forEach((item) => collectLocalReferences(item, references));
  else if (value && typeof value === 'object') Object.values(value).forEach((item) => collectLocalReferences(item, references));
  return references;
}

async function auditManifest(manifest, lookup) {
  const unresolved = [];
  const ids = new Set([...manifest.assets.map((asset) => asset.id), ...manifest.portraits.map((portrait) => portrait.id)]);
  const pendingIds = new Set(manifest.mediaJobs.filter((job) => job.status === 'pending').map((job) => job.assetId));
  unresolved.push(...await validateAssetIntegrity(assetRoot, manifest.assets, pendingIds));
  for (const portrait of manifest.portraits) if (!(await pathExists(resolve(assetRoot, portrait.path)))) unresolved.push(`missing portrait: ${portrait.id} -> ${portrait.path}`);
  for (const job of manifest.mediaJobs) {
    if (!ids.has(job.assetId)) unresolved.push(`unknown job asset: ${job.id} -> ${job.assetId}`);
    job.inputAssetIds.filter((id) => !ids.has(id)).forEach((id) => unresolved.push(`unknown job input: ${job.id} -> ${id}`));
  }
  const lookupIds = new Set([...Object.keys(lookup.assetsById), ...Object.keys(lookup.portraitsById), ...Object.keys(lookup.pendingById)]);
  for (const id of ids) if (!lookupIds.has(id)) unresolved.push(`missing runtime lookup: ${id}`);
  return unresolved;
}

function sameJson(left, right) {
  return JSON.stringify(left) === JSON.stringify(right);
}

async function auditAudioLicenses(manifest) {
  const registry = await loadAudioLicenseRegistry();
  const unresolved = [];
  const tracksByPath = new Map(registry.tracks.map((track) => [track.path, track]));
  const manifestBgm = manifest.assets.filter((asset) => asset.path.startsWith('audio/bgm/'));
  const bgmFiles = (await walkFiles(bgmRoot)).filter((path) => ['.mp3', '.wav'].includes(extname(path).toLowerCase()));
  if (!(await pathExists(audioCreditsPath))) unresolved.push('missing packaged audio credits: audio/CREDITS.json');
  else if (!sameJson(await readJson(audioCreditsPath), registry)) unresolved.push('packaged audio credits differ from registry');
  for (const path of bgmFiles) {
    const relativePath = toPosix(relative(assetRoot, path));
    const track = tracksByPath.get(relativePath);
    if (!track) { unresolved.push(`unregistered packaged BGM: ${relativePath}`); continue; }
    if (hash(await readFile(path)) !== track.sha256) unresolved.push(`registered BGM hash mismatch: ${relativePath}`);
  }
  for (const asset of manifestBgm) if (!tracksByPath.has(asset.path)) unresolved.push(`manifest contains unregistered BGM: ${asset.path}`);
  for (const track of registry.tracks) {
    if (!(await pathExists(resolve(assetRoot, track.path)))) unresolved.push(`registered BGM is missing: ${track.path}`);
    const asset = manifestBgm.find((candidate) => candidate.path === track.path);
    if (!asset) { unresolved.push(`registered BGM missing from manifest: ${track.path}`); continue; }
    if (asset.id !== track.assetId || asset.sha256 !== track.sha256) unresolved.push(`manifest BGM identity mismatch: ${track.path}`);
    if (!sameJson(asset.license, licenseForTrack(track))) unresolved.push(`manifest BGM license mismatch: ${track.path}`);
  }
  return unresolved;
}

async function auditNoWebGenerationTools() {
  const findings = [];
  for (const root of [canonicalRoot, releaseMirrorRoot]) {
    for (const path of await walkFiles(root)) {
      const relativePath = toPosix(relative(root, path));
      if (isLegacyPublishablePath(relativePath)) findings.push(`legacy path in web release: ${relativePath}`);
      if (isPrivateEnvironmentPath(relativePath)) findings.push(`private environment file in web release: ${relativePath}`);
      if (/(?:^|\/)(?:tools?|scripts?)(?:\/|$)/iu.test(relativePath) || /\.(?:bat|cmd|ps1|py|sh)$/iu.test(relativePath)) {
        findings.push(`generation tool in web release: ${relativePath}`);
      }
    }
  }
  return findings;
}

async function auditLegacyManifest() {
  const legacy = await readJson(resolve(canonicalRoot, 'manifest.json'));
  const unresolved = [];
  for (const key of ['bridge', 'sfe', 'cinema']) if (key in legacy) unresolved.push(`legacy manifest key: ${key}`);
  for (const path of collectLocalReferences(legacy)) if (!(await pathExists(resolve(canonicalRoot, path)))) unresolved.push(`missing legacy reference: ${path}`);
  return unresolved;
}

async function auditStory(lookup) {
  return findUnresolvedStoryReferences(await readStory(), lookup).map((id) => `missing story reference: ${id}`);
}

async function auditMutableLoaders() {
  const files = ['card/albina.card.json', 'card/character-card.template.json', 'card/card-protocol.md', 'card/character_card_protocol.md', 'public/albina-classic-loader.js', 'built-harness.html', 'index.html'];
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
  const unresolved = [...await auditManifest(manifest, lookup), ...await auditAudioLicenses(manifest), ...await auditLegacyManifest(), ...await auditStory(lookup), ...await auditMutableLoaders(), ...await auditNoWebGenerationTools()];
  return { unresolved, release: await classifyRelease(), inventory: { canonicalFiles: (await walkFiles(canonicalRoot)).length, releaseFiles: (await walkFiles(releaseRoot)).length } };
}

const arguments_ = new Set(process.argv.slice(2));
const writeMode = arguments_.has('--write');
if (writeMode) await writeGeneratedArtifacts();
const report = await audit();
if (arguments_.has('--json')) process.stdout.write(`${JSON.stringify(report)}\n`);
else console.log(`Asset audit: ${report.unresolved.length} unresolved; release missing=${report.release.missing.length}, mismatch=${report.release.mismatch.length}, stale=${report.release.stale.length}`);
if (report.unresolved.length > 0 || (!writeMode && hasReleaseDifferences(report.release))) process.exitCode = 1;
