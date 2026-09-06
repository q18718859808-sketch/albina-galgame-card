import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { extname, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const legacyRoot = resolve(root, '..', 'albina-cdn-release', 'dist', 'albina-galgame-card', 'worldbooks');
const output = resolve(root, 'content', 'worldbook', 'limbus-world-audit-v1.json');
const refreshPath = resolve(root, 'content', 'worldbook', 'albina-canto-ix-refresh-v1.json');
const chapterRefreshPath = resolve(root, 'content', 'worldbook', 'albina-canto-i-viii-x-intervallo-refresh-v1.json');

const SOURCE_FILES = [
  'albina_p0_core_worldbook.json',
  'albina_p1_canto_ix_scene_worldbook.json',
  'albina_p1_limbus_core_worldbook.json',
  'albina_p1_sinner_voice_worldbook.json',
  'albina_p2_canto_backbone_worldbook.json',
  'albina_p2_ego_identities_worldbook.json',
  'albina_p2_enemy_ecology_worldbook.json',
  'albina_p2_event_support_worldbook.json',
  'albina_p2_identity_association_worldbook.json',
  'albina_p2_intervallo_story_worldbook.json',
  'albina_p2_named_character_ecology_worldbook.json',
  'albina_p2_theme_atmosphere_worldbook.json',
  'albina_p2_urban_factions_worldbook.json',
  'albina_p3_bloodfiend_abnormality_worldbook.json',
  'albina_p3_combat_mechanics_worldbook.json',
  'albina_p3_ego_abnormality_anchors_worldbook.json',
  'albina_p3_ego_sin_worldbook.json',
  'albina_p4_article_reviewed_identity_worldbook.json',
  'albina_p4_manifest_bridge_worldbook.json',
  'albina_rp_static_worldbook.json',
];

const CANTO_PATTERN = /Canto\s+(I{1,3}|IV|V|VI|VII|VIII|IX|X)\b/iu;
const INTERVALLO_PATTERN = /Intervallo|Hell's Chicken|Sea Vacation|Murder on the WARP Express|Timekilling Time|Miracle in District 20|Clear All Cathy|Limbus Company/iu;
const AU_PATTERN = /\b(?:AU|IF)\b|镜像分支|存活线|玩家原创|原创路线/iu;

const sha256 = (input) => createHash('sha256').update(input).digest('hex');
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));
const entryId = (entry) => String(entry.uid ?? entry.id ?? entry.extensions?.entry_id ?? 'unknown');
const sources = (entry) => Array.isArray(entry.extensions?.source_refs) ? entry.extensions.source_refs : [];
const text = (entry) => [entry.comment, entry.content, ...(entry.key ?? []), ...(entry.keysecondary ?? [])].filter(Boolean).join('\n');

function validateRefreshRecord(record, knownClaims, knownSourceIds) {
  const errors = [];
  if (!record.id || !Array.isArray(record.targetIds) || record.targetIds.length === 0) errors.push('missing id/targetIds');
  if (!Array.isArray(record.atomicFacts) || record.atomicFacts.length < 2) errors.push('atomicFacts must contain at least two facts');
  if (!record.narrativeBoundary || record.narrativeBoundary.length < 20) errors.push('narrativeBoundary is missing');
  if (!Array.isArray(record.claimIds) || record.claimIds.length === 0) errors.push('claimIds are missing');
  for (const claimId of record.claimIds ?? []) if (!knownClaims.has(claimId)) errors.push(`unknown claim ${claimId}`);
  if (!Array.isArray(record.sourceRefs) || record.sourceRefs.length === 0) errors.push('sourceRefs are missing');
  for (const source of record.sourceRefs ?? []) {
    if (!knownSourceIds.has(source.sourceId)) errors.push(`unknown source ${source.sourceId}`);
    if (!source.locator || !source.checkedAt) errors.push(`incomplete source locator for ${source.sourceId}`);
    if (/source\.wiki\./iu.test(source.sourceId) && !Number.isInteger(source.revisionId)) errors.push(`wiki source needs revision ${source.sourceId}`);
  }
  return errors;
}

function narrativeRole(file) {
  if (file.includes('canto_backbone') || file.includes('intervallo')) return 'timeline';
  if (file.includes('sinner_voice')) return 'character-voice';
  if (file.includes('urban_factions') || file.includes('identity_association')) return 'city-faction';
  if (file.includes('enemy_ecology') || file.includes('bloodfiend') || file.includes('combat')) return 'conflict-ecology';
  if (file.includes('ego_')) return 'ego-and-identity';
  if (file.includes('manifest_bridge')) return 'source-index-bridge';
  if (file.includes('rp_static')) return 'runtime-and-au';
  return 'character-and-world';
}

function classify(entry, file) {
  const value = text(entry);
  const refs = sources(entry);
  const hasSources = refs.length > 0;
  if (AU_PATTERN.test(value)) return { canonicality: 'AU_extension', review: 'au-package-review', reason: 'explicit AU/IF continuity marker' };
  if (!hasSources) return { canonicality: 'needs-review', review: 'missing-source-reference', reason: 'no source reference recorded' };
  if (file.includes('rp_static')) return { canonicality: 'needs-review', review: 'runtime-separation-review', reason: 'runtime guidance must be separated from source facts' };
  return { canonicality: 'canon-candidate', review: 'refresh-source-and-claim', reason: 'source-backed paraphrase candidate; narrative guidance must be split from atomic facts' };
}

function timelinePlacement(entry) {
  const value = text(entry);
  const canto = value.match(CANTO_PATTERN)?.[1];
  if (canto) return `Canto ${canto}`;
  if (INTERVALLO_PATTERN.test(value)) return 'Intervallo-or-core';
  return 'cross-timeline';
}

function refreshPriority(entry) {
  if (entry.timelinePlacement === 'Canto IX' && /Albina|Callisto|fascia|LCE/iu.test(entry.comment)) return 0;
  if (entry.timelinePlacement === 'Canto IX') return 1;
  if (entry.narrativeRole === 'timeline') return 2;
  if (entry.narrativeRole === 'character-voice' || entry.narrativeRole === 'character-and-world') return 3;
  return 4;
}

function buildRefreshQueue(entries) {
  return entries
    .filter((entry) => entry.narrativeRole !== 'source-index-bridge' && entry.canonicality === 'canon-candidate')
    .map((entry) => ({
      id: entry.id,
      legacyFile: entry.legacyFile,
      narrativeRole: entry.narrativeRole,
      timelinePlacement: entry.timelinePlacement,
      comment: entry.comment,
      sourceRefs: entry.sourceRefs,
      action: 'refresh-current-source-split-atomic-claims-and-re-review',
      priority: refreshPriority(entry),
    }))
    .sort((a, b) => a.priority - b.priority || a.timelinePlacement.localeCompare(b.timelinePlacement) || a.id.localeCompare(b.id));
}

export async function auditLimbusWorldbook({ legacyRoot: sourceRoot = legacyRoot, output: outputPath = output, refreshFile = refreshPath } = {}) {
  await mkdir(resolve(outputPath, '..'), { recursive: true });
  const filesOnDisk = new Set(await readdir(sourceRoot));
  const missing = SOURCE_FILES.filter((file) => !filesOnDisk.has(file));
  if (missing.length > 0) {
    throw new Error(`Limbus worldbook source set is incomplete; missing: ${missing.join(', ')}`);
  }
  const files = [...SOURCE_FILES];
  const entries = [];
  for (const file of files) {
    const bytes = await readFile(resolve(sourceRoot, file));
    const book = JSON.parse(bytes.toString('utf8'));
    for (const entry of book.entries ?? []) {
      const status = classify(entry, file);
      entries.push({
        legacyFile: relative(sourceRoot, resolve(sourceRoot, file)),
        legacyFileSha256: sha256(bytes),
        id: entryId(entry),
        comment: entry.comment ?? '',
        narrativeRole: narrativeRole(file),
        timelinePlacement: timelinePlacement(entry),
        canonicality: status.canonicality,
        review: status.review,
        reason: status.reason,
        sourceRefs: sources(entry).map((source) => ({
          title: source.source_title ?? source.title ?? 'unknown',
          url: source.source_url ?? source.url ?? '',
          legacyRevisionId: source.revision_id ?? source.revisionId ?? null,
          checkedAt: source.verified_at ?? null,
        })),
      });
    }
  }
  const statusKeys = ['canon-candidate', 'AU_extension', 'needs-review'];
  const summary = Object.fromEntries(statusKeys.map((key) => [key, entries.filter((entry) => entry.canonicality === key).length]));
  const substantiveEntries = entries.filter((entry) => entry.narrativeRole !== 'source-index-bridge');
  const substantiveSummary = Object.fromEntries(statusKeys.map((key) => [key, substantiveEntries.filter((entry) => entry.canonicality === key).length]));
  const timeline = Object.fromEntries([...new Set(entries.map((entry) => entry.timelinePlacement))].sort().map((key) => [key, entries.filter((entry) => entry.timelinePlacement === key).length]));
  const substantiveTimeline = Object.fromEntries([...new Set(substantiveEntries.map((entry) => entry.timelinePlacement))].sort().map((key) => [key, substantiveEntries.filter((entry) => entry.timelinePlacement === key).length]));
  const completionGate = {
    substantiveEntries: substantiveEntries.length,
    sourceIndexBridgeEntries: entries.length - substantiveEntries.length,
    sourceBackedCandidatesAwaitingRefresh: substantiveSummary['canon-candidate'],
    quarantinedMissingSourceOrRuntimeReview: substantiveSummary['needs-review'],
    crossTimelineSubstantiveEntries: substantiveTimeline['cross-timeline'] ?? 0,
    preciselyPlacedSubstantiveEntries: substantiveEntries.filter((entry) => entry.timelinePlacement !== 'cross-timeline').length,
    completeLivingWorldVerified: substantiveSummary['canon-candidate'] === 0
      && substantiveSummary['needs-review'] === 0
      && (substantiveTimeline['cross-timeline'] ?? 0) === 0,
  };
  const refreshQueue = buildRefreshQueue(entries);
  const refreshOverlays = sourceRoot === legacyRoot && refreshFile
    ? [await readJson(refreshFile), await readJson(chapterRefreshPath)]
    : [];
  const refreshRecords = refreshOverlays.flatMap((overlay) => overlay.records ?? []);
  const knownClaimIds = new Set((await readJson(resolve(root, 'content', 'canon-claims-v1.json'))).claims.map(claim => claim.id));
  const knownSourceIds = new Set((await readJson(resolve(root, 'content', 'canon-sources-v1.json'))).sources.map(source => source.id));
  for (const overlay of refreshOverlays) {
    for (const claimId of overlay.claimIds ?? []) knownClaimIds.add(claimId);
    for (const source of overlay.sources ?? []) knownSourceIds.add(source.id);
  }
  const refreshErrors = refreshRecords.flatMap(record => validateRefreshRecord(record, knownClaimIds, knownSourceIds).map(error => `${record.id}: ${error}`));
  const auditedIds = new Set(entries.map(entry => entry.id));
  const l0 = await readJson(resolve(root, 'content', 'worldbook', 'albina-worldbook-l0-minimal-anchors-v1.json'));
  const allowedTargetIds = new Set([...auditedIds, ...(l0.entries ?? []).map(entry => entry.uid)]);
  for (const record of refreshRecords) {
    for (const targetId of record.targetIds ?? []) {
      if (!allowedTargetIds.has(targetId)) refreshErrors.push(`${record.id}: unknown target ${targetId}`);
    }
  }
  if (refreshErrors.length > 0) throw new Error(`Invalid Limbus refresh overlays: ${refreshErrors.join('; ')}`);
  const refreshedTargetIds = new Set(refreshRecords.flatMap(record => record.targetIds));
  const pendingRefreshQueue = refreshQueue.filter(entry => !refreshedTargetIds.has(entry.id));
  const auditedCompletionGate = {
    ...completionGate,
    sourceBackedCandidatesAwaitingRefresh: pendingRefreshQueue.length,
    verifiedRefreshRecords: refreshRecords.length,
    verifiedRefreshTargetIds: [...refreshedTargetIds].sort(),
    refreshOverlays: refreshOverlays.map((overlay) => overlay.id),
  };
  const audit = {
    schemaVersion: 1,
    generatedAt: new Date().toISOString(),
    purpose: 'Full Limbus Company living-world audit queue. Canonicality, narrative use, and timeline placement are independent axes.',
    policy: {
      canon: 'A canon-candidate must be rechecked against a current primary or revision-pinned source before release packaging.',
      narrative: 'Narrative guidance can shape a Galgame scene but does not by itself change canonicality.',
      au: 'AU/IF is an explicit continuity layer, not a bucket for all interactive or roleplay-oriented material.',
      package: 'Card-internal anchors remain compact. Audited P0-P4 world packages are independently importable and managed through the optional WTC workbench.',
    },
    sourceFiles: files,
    summary: {
      allRecords: summary,
      substantiveOnly: substantiveSummary,
      note: 'Source-index bridge records are provenance pointers, not narrative worldbook content. Use substantiveOnly for coverage claims.',
    },
    timeline: {
      allRecords: timeline,
      substantiveOnly: substantiveTimeline,
    },
    completionGate: auditedCompletionGate,
    refreshQueue: {
      schemaVersion: 1,
      status: pendingRefreshQueue.length === 0 ? 'empty' : 'awaiting-source-refresh',
      total: pendingRefreshQueue.length,
      priorityPolicy: '0 Albina/Canto IX core, 1 remaining Canto IX, 2 Canto I-VIII/X and Intervallo timeline, 3 character/world, 4 other mechanics and ecology',
      entries: pendingRefreshQueue,
      refreshedRecords: refreshRecords.map(record => ({ id: record.id, targetIds: record.targetIds, claimIds: record.claimIds, timelinePlacement: record.timelinePlacement })),
    },
    entries,
  };
  await writeFile(outputPath, `${JSON.stringify(audit, null, 2)}\n`, 'utf8');
  return { output: outputPath, files: files.length, entries: entries.length, summary: audit.summary, timeline: audit.timeline, completionGate: auditedCompletionGate };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const result = await auditLimbusWorldbook();
  console.log(JSON.stringify(result, null, 2));
}

export { SOURCE_FILES };
