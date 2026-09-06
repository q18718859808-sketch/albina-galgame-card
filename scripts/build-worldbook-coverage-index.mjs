import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const auditPath = resolve(root, 'content', 'worldbook', 'limbus-world-audit-v1.json');
const l0Path = resolve(root, 'content', 'worldbook', 'albina-worldbook-l0-minimal-anchors-v1.json');
const manifestPath = resolve(root, 'content', 'worldbook', 'albina-worldbook-packages-v1.manifest.json');
const auPackagePath = resolve(root, 'content', 'worldbook', 'albina-worldbook-au-if-v1.json');
const quarantinePath = resolve(root, 'content', 'worldbook', 'albina-worldbook-quarantine-unverified-rp-v1.json');
const sourceIndexPath = resolve(root, 'content', 'worldbook', 'albina-worldbook-source-index-disabled-v1.json');
const outputPath = resolve(root, 'content', 'worldbook', 'limbus-world-coverage-index-v1.json');

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');
const readJson = async (path) => JSON.parse(await readFile(path, 'utf8'));

const audit = await readJson(auditPath);
const l0Bytes = await readFile(l0Path);
const l0 = JSON.parse(l0Bytes.toString('utf8'));
const manifest = await readJson(manifestPath);
const auPackage = await readJson(auPackagePath);
const quarantine = await readJson(quarantinePath);
const sourceIndex = await readJson(sourceIndexPath);
const entriesById = new Map(audit.entries.map((entry) => [entry.id, entry]));
const pendingCandidates = audit.refreshQueue.entries.map((queued) => entriesById.get(queued.id));
const needsReview = audit.entries.filter((entry) =>
  entry.narrativeRole !== 'source-index-bridge' && entry.canonicality === 'needs-review');
if (pendingCandidates.some((entry) => !entry)) throw new Error('Refresh queue contains an unknown audit entry');
const unresolved = [...pendingCandidates, ...needsReview];
const substantive = audit.entries.filter((entry) => entry.narrativeRole !== 'source-index-bridge');
const timelineLabels = [...new Set(audit.entries.map((entry) => entry.timelinePlacement))].sort();
const summarizeTimeline = (entries) => Object.fromEntries(timelineLabels.map((label) => [
  label,
  entries.filter((entry) => entry.timelinePlacement === label).length,
]));
const auEntries = audit.entries.filter((entry) => entry.canonicality === 'AU_extension');
const substantiveAuEntries = auEntries.filter((entry) => entry.narrativeRole !== 'source-index-bridge');
const auIds = auPackage.entries.map((entry) => entry.uid);
const auAuditIds = new Set(substantiveAuEntries.map((entry) => entry.id));
const releaseWorldbookRoots = [
  'dist/albina-galgame-card/worldbooks',
  'release/github-cdn-root/dist/albina-galgame-card/worldbooks',
];
const releasePackageEntries = manifest.packages.filter((entry) => entry.defaultEnabled || entry.id === 'au-if');
const sourceL0Ids = l0.entries.map((entry) => entry.uid);
const publishedMirrors = [];
for (const rootPath of releaseWorldbookRoots) {
  const rootDir = resolve(root, rootPath);
  const releaseManifest = await readJson(resolve(rootDir, 'albina_worldbook_packages_v1.json'));
  const packageChecks = [];
  for (const packageEntry of releasePackageEntries) {
    const file = packageEntry.file.split('/').pop();
    const bytes = await readFile(resolve(rootDir, file));
    const payload = JSON.parse(bytes.toString('utf8'));
    packageChecks.push({
      id: packageEntry.id,
      file,
      entryCount: payload.entries.length,
      sha256: sha256(bytes),
      matchesSource: payload.entries.length === packageEntry.entryCount && sha256(bytes) === packageEntry.sha256,
    });
  }
  const l0Payload = await readJson(resolve(rootDir, 'albina_canon_worldbook_v1.json'));
  const publishedL0Ids = l0Payload.entries.map((entry) => entry.uid);
  const sourceL0ById = new Map(l0.entries.map((entry) => [entry.uid, entry]));
  publishedMirrors.push({
    root: rootPath,
    sourceManifestSha256: releaseManifest.sourceManifestSha256,
    packages: packageChecks,
    l0: {
      entryCount: publishedL0Ids.length,
      entryIdsMatch: JSON.stringify(publishedL0Ids) === JSON.stringify(sourceL0Ids),
      entryContentMatch: l0Payload.entries.every((entry) => JSON.stringify(entry) === JSON.stringify(sourceL0ById.get(entry.uid))),
    },
  });
}
const auditIds = new Set(audit.entries.map((entry) => entry.id));
const unresolvedIds = new Set(unresolved.map((entry) => entry.id));
const packageIds = (payload, label) => {
  if (!Array.isArray(payload.entries)) throw new Error(`${label} package has no entries array`);
  return payload.entries.map((entry) => {
    const id = entry.uid ?? entry.id;
    if (!id) throw new Error(`${label} package contains an entry without uid/id`);
    return id;
  });
};
const quarantineIds = new Set(packageIds(quarantine, 'quarantine'));
const sourceIndexIds = new Set(packageIds(sourceIndex, 'source-index'));
const auPackageIds = new Set(packageIds(auPackage, 'AU/IF'));

const assertExactIdSet = (actual, expected, label) => {
  if (actual.size !== expected.size || [...actual].some((id) => !expected.has(id))) {
    throw new Error(`${label} IDs do not match the audit ledger`);
  }
};

assertExactIdSet(quarantineIds, new Set(needsReview.map((entry) => entry.id)), 'Quarantine');
assertExactIdSet(sourceIndexIds, new Set(audit.entries
  .filter((entry) => entry.narrativeRole === 'source-index-bridge')
  .map((entry) => entry.id)), 'Source-index');
assertExactIdSet(auPackageIds, auAuditIds, 'AU/IF');

const index = {
  schemaVersion: 1,
  generatedFrom: 'content/worldbook/limbus-world-audit-v1.json',
  purpose: 'Auditable coverage index for unresolved substantive worldbook entries; this index records evidence state and does not promote canon candidates.',
  policy: {
    canonCandidate: '304 entries remain canon-candidate until their current source and atomic claim split are rechecked.',
    needsReview: '258 entries remain needs-review when source references are absent or runtime separation is unresolved.',
    evidence: 'Source references are copied from the audit ledger without fabrication. An empty sourceRefs array is an explicit missing-evidence result.',
    preservation: 'The embedded L0 worldbook remains an independent 16-entry source artifact and is never merged into this unresolved index.',
  },
  counts: {
    unresolvedSubstantiveEntries: unresolved.length,
    canonCandidates: unresolved.filter((entry) => entry.canonicality === 'canon-candidate').length,
    needsReview: unresolved.filter((entry) => entry.canonicality === 'needs-review').length,
    sourceBackedCandidateQueue: audit.completionGate.sourceBackedCandidatesAwaitingRefresh,
    quarantinedMissingSourceOrRuntimeReview: audit.completionGate.quarantinedMissingSourceOrRuntimeReview,
  },
  fullCoverage: {
    auditedEntries: audit.entries.length,
    substantiveEntries: substantive.length,
    sourceIndexBridgeEntries: audit.entries.length - substantive.length,
    timeline: {
      allRecords: summarizeTimeline(audit.entries),
      substantiveOnly: summarizeTimeline(substantive),
    },
    canonicality: {
      allRecords: audit.summary.allRecords,
      substantiveOnly: audit.summary.substantiveOnly,
    },
    au: {
      allRecords: auEntries.length,
      substantiveOnly: substantiveAuEntries.length,
      sourceIndexBridgeRecords: auEntries.filter((entry) => entry.narrativeRole === 'source-index-bridge').length,
      packageEntries: auIds.length,
      packageIds: auIds,
      packageIdsMatchSubstantiveAudit: auIds.length === auAuditIds.size && auIds.every((id) => auAuditIds.has(id)),
      substantiveEntries: substantiveAuEntries.map((entry) => ({
        id: entry.id,
        timelinePlacement: entry.timelinePlacement,
        narrativeRole: entry.narrativeRole,
        sourceRefs: entry.sourceRefs,
      })),
    },
    integrity: {
      auditIdsUnique: auditIds.size === audit.entries.length,
      unresolvedIdsUnique: unresolvedIds.size === unresolved.length,
      unresolvedIdsAreAudited: [...unresolvedIds].every((id) => auditIds.has(id)),
      sourceRefsCopiedFromAudit: true,
      timelineCountsDerivedFromAudit: true,
      packageIdsMatchAudit: true,
    },
  },
  packageBoundaries: {
    l0Standalone: true,
    quarantine: { entryCount: quarantine.entries.length, defaultEnabled: quarantine.defaultEnabled },
    sourceIndex: { entryCount: sourceIndex.entries.length, defaultEnabled: sourceIndex.defaultEnabled },
    auIf: { entryCount: auPackage.entries.length, defaultEnabled: auPackage.defaultEnabled },
    manifestTotals: manifest.totals,
  },
  publishedMirrors,
  preservedL0: {
    path: 'content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json',
    entryCount: l0.entries.length,
    sha256: sha256(l0Bytes),
    entryIds: l0.entries.map((entry) => entry.uid),
  },
  entries: unresolved.map((entry) => ({
    id: entry.id,
    legacyFile: entry.legacyFile,
    legacyFileSha256: entry.legacyFileSha256,
    narrativeRole: entry.narrativeRole,
    timelinePlacement: entry.timelinePlacement,
    canonicality: entry.canonicality,
    review: entry.review,
    reason: entry.reason,
    sourceRefs: entry.sourceRefs,
  })),
};

if (index.counts.canonCandidates !== 304 || index.counts.needsReview !== 258) {
  throw new Error(`Unexpected unresolved counts: ${index.counts.canonCandidates}/${index.counts.needsReview}`);
}
if (index.preservedL0.entryCount !== 16) throw new Error('The embedded L0 worldbook must remain exactly 16 entries');
if (index.fullCoverage.auditedEntries !== 2481 || index.fullCoverage.substantiveEntries !== 599) {
  throw new Error('Unexpected full audit coverage counts');
}
if (!index.fullCoverage.au.packageIdsMatchSubstantiveAudit || index.fullCoverage.au.packageEntries !== 6) {
  throw new Error('AU package does not close over substantive AU audit entries');
}
if (index.packageBoundaries.quarantine.entryCount !== 258 || index.packageBoundaries.sourceIndex.entryCount !== 1882) {
  throw new Error('Worldbook package boundary counts do not match the audit');
}
for (const mirror of publishedMirrors) {
  if (mirror.sourceManifestSha256 !== sha256(await readFile(manifestPath))) throw new Error(`Published worldbook manifest is stale: ${mirror.root}`);
  if (mirror.l0.entryCount !== 16 || !mirror.l0.entryIdsMatch || !mirror.l0.entryContentMatch || mirror.packages.some((entry) => !entry.matchesSource)) {
    throw new Error(`Published worldbook mirror is stale: ${mirror.root}`);
  }
}
if (!Object.values(index.fullCoverage.integrity).every(Boolean)) {
  throw new Error('Worldbook coverage integrity checks failed');
}

await writeFile(outputPath, `${JSON.stringify(index, null, 2)}\n`, 'utf8');
console.log(JSON.stringify({ output: outputPath, counts: index.counts, preservedL0: index.preservedL0 }, null, 2));
