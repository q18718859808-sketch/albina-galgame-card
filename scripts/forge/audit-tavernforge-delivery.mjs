import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const readJson = async relative => JSON.parse(await readFile(path.join(root, relative), 'utf8'));
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const readBytes = async relative => readFile(path.join(root, relative));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const rules = await readJson('scripts/forge/tavernforge-delivery-rules-v1.json');
const delivery = await readJson('content/worldbook/tavernforge-delivery-manifest-v1.json');
const schema = await readJson('content/worldbook/player-profile-schema-v1.json');
const initvar = await readJson('content/worldbook/player-profile-initvar-v1.json');
const updates = await readJson('content/worldbook/player-profile-update-rules-v1.json');
const matrix = await readJson('content/worldbook/player-profile-runtime-matrix-v1.json');
const runtime = await readJson('content/worldbook/player-profile-runtime-v1.json');
const packages = await readJson('content/worldbook/albina-worldbook-packages-v1.manifest.json');
const timeline = await readJson('content/worldbook/albina-worldbook-plot-full-timeline-v1.json');
const layering = delivery.layering;
const coverage = await readJson('content/worldbook/limbus-world-coverage-index-v1.json');
const sourceAudit = await readJson('content/worldbook/limbus-world-audit-v1.json');
const cantoIxRefresh = await readJson('content/worldbook/albina-canto-ix-refresh-v1.json');
const fullTimelineRefresh = await readJson('content/worldbook/albina-canto-i-viii-x-intervallo-refresh-v1.json');
const l0 = await readJson('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json');
const runtimeBoundary = await readJson('content/worldbook/worldbook-runtime-boundary-v1.json');
const card = await readJson('card/albina.card.json');
const cardTemplate = await readJson('card/character-card.template.json');
const canonicalWorldbook = await readJson('dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json');
const releaseWorldbook = await readJson('release/github-cdn-root/dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json');
const releaseTimeline = await readJson('release/github-cdn-root/dist/albina-galgame-card/worldbooks/albina-worldbook-plot-full-timeline-v1.json');

const fields = schema.fields.map(field => field.path);
const cardEntries = card.data?.character_book?.entries ?? [];
const templateEntries = cardTemplate.data?.character_book?.entries ?? [];
const canonicalEntries = canonicalWorldbook.entries ?? [];
const releaseEntries = releaseWorldbook.entries ?? [];
const cardIds = cardEntries.map(entry => entry.extensions?.entry_id);
const l0Ids = l0.entries.map(entry => entry.uid);
const cardBytes = await readFile(path.join(root, rules.originalEntryPolicy.cardPath));
const l0Bytes = await readFile(path.join(root, rules.originalEntryPolicy.l0Path));
const matrixDigest = sha256(l0Bytes);
const packageEntries = await Promise.all(packages.packages.map(async item => {
  const bytes = await readBytes(item.file);
  const payload = JSON.parse(bytes.toString('utf8'));
  return { ...item, declaredSha256: item.sha256, payload, actualSha256: sha256(bytes) };
}));
const packageUids = packageEntries.flatMap(item => item.payload.entries.map(entry => entry.uid));
const defaultPackageIds = packageEntries.filter(item => item.defaultEnabled).map(item => item.id);
const neverRuntimePackageIds = packages.presets.neverRuntime;
const auditTimeline = sourceAudit.timeline;
const coverageTimeline = coverage.fullCoverage?.timeline;

check(rules.allowedWriteRoots.join('|') === 'docs|content/worldbook|scripts/forge', 'write scope drift');
check(rules.apiEvidencePolicy.unknownApi === 'forbidden', 'unknown API policy is not forbidden');
check(rules.requiredEvidence.includes('worldbook-runtime-boundary'), 'runtime boundary is not required evidence');
check(delivery.runtimeBoundary?.contract === 'content/worldbook/worldbook-runtime-boundary-v1.json', 'delivery manifest does not link the runtime boundary contract');
check(runtimeBoundary.status === 'contract-declared-not-runtime-observed', 'runtime boundary must remain unobserved in static delivery');
check(runtimeBoundary.selection?.sourceOfTruth === 'SaveV2.worldbook' && runtimeBoundary.selection?.operation === 'selectWorldbookPreset', 'runtime selection contract is not bound to the save selection operation');
const selectionVariableKey = matrix.worldbookSelectionVariableKey;
check(typeof selectionVariableKey === 'string' && selectionVariableKey.length > 0, 'worldbook selection variable key is missing from runtime matrix');
check(runtimeBoundary.selection?.projection?.variableKey === selectionVariableKey, 'runtime boundary projection variable differs from runtime matrix');
check(runtimeBoundary.selection?.projection?.writtenBy === 'src/runtime/default-host.ts' && runtimeBoundary.selection?.projection?.readBy === 'content/worldbook/player-profile-runtime-v1.json', 'runtime selection projection read/write boundary is incomplete');
check(runtimeBoundary.selection?.projection?.serialization === 'normalized WorldbookPackageSelection', 'runtime selection projection serialization is not declared');
check(runtimeBoundary.selection?.projection?.consistencyRule === 'The chat projection must equal the normalized SaveV2.worldbook selection before the runtime reader is used.', 'SaveV2 and chat projection consistency rule is missing');
check(delivery.runtimeBoundary?.selection === 'SaveV2.worldbook-with-chat-variable-projection', 'delivery manifest does not identify the selection projection');
check(delivery.runtimeBoundary?.selectionProjectionVariable === selectionVariableKey && delivery.runtimeBoundary?.runtimeReader === 'content/worldbook/player-profile-runtime-v1.json', 'delivery manifest selection projection linkage is stale');
check(runtimeBoundary.injection?.mode === 'manual-import-only' && runtimeBoundary.injection?.owner === 'SillyTavern normal worldbook UI', 'worldbook injection boundary is not manual-import-only');
check(runtimeBoundary.injection?.externalState === 'unverified-until-real-host-acceptance', 'external worldbook state must remain unverified');
check(runtimeBoundary.injection?.appMustNot?.includes('call an undocumented SillyTavern worldbook API') && runtimeBoundary.injection?.appMustNot?.includes('claim that a selected package is active in the external host'), 'runtime injection prohibitions are incomplete');
check(runtimeBoundary.hostBinding?.optionalSaveWorldbookSelectionCallback?.status === 'selection-metadata-hook-only', 'optional host callback is not constrained to metadata');
check(runtimeBoundary.hostBinding?.selectionPersistence?.variableKey === selectionVariableKey, 'host binding selection variable differs from runtime matrix');
check(runtimeBoundary.hostBinding?.fallback === 'embedded-l0-and-local-storage', 'runtime worldbook fallback drifted');
check(runtimeBoundary.packagePolicy?.manifest === 'content/worldbook/albina-worldbook-packages-v1.manifest.json' && runtimeBoundary.packagePolicy?.unknownPackageIdsFailClosed === true, 'runtime package policy is not bound to the checked-in manifest');
check(fields.length === 9 && new Set(fields).size === 9, 'player schema must contain nine unique fields');
check(JSON.stringify(fields) === JSON.stringify(Object.keys(initvar.defaults)), 'schema and InitVar fields differ');
check(schema.variableKey === initvar.variableKey && schema.variableKey === updates.variableKey, 'player variable key drift');
check(updates.rules.length === 3 && updates.rules.every(rule => rule.target === schema.variableKey), 'update rules are incomplete');
check(JSON.stringify(rules.fourLinkOrder) === JSON.stringify(Object.keys(matrix.chains)), 'four-link order differs from runtime matrix');
check(runtime.id === matrix.chains.readAndDisplay.source[0]?.split('/').pop()?.replace('.json', '') || runtime.id === 'albina_player_profile_runtime', 'runtime reader source is not linked');
check(runtime.content.includes("getvar('albinaPlayerProfileV1'"), 'runtime reader does not use the declared player variable');
check(runtime.content.includes(`getvar('${selectionVariableKey}'`), 'runtime reader does not use the declared worldbook selection variable');
check(timeline.entries.length === delivery.timeline.entryCount, 'timeline entry count drift');
check(timeline.defaultEnabled === true, 'full timeline is not default-enabled');
check(packages.packages.some(item => item.id === 'plot-full-timeline'), 'timeline package is missing from package manifest');
check(layering?.auditedEntryCount === 2481 && layering?.substantiveCandidateCount === 599 && layering?.sourceIndexBridgeCount === 1882, 'layering audit totals are missing or stale');
check(packageEntries.every(item => item.payload.entries.length === item.entryCount && item.actualSha256 === item.declaredSha256), 'worldbook package count or hash drift');
check(new Set(packageUids).size === packageUids.length, 'full worldbook packages contain duplicate UIDs');
check(packageUids.length === packages.invariants.auditedUniqueEntries, 'package UID total differs from package invariant');
check(packages.totals.substantiveCandidates === 599 && packages.totals.sourceIndexBridges === 1882, 'package manifest totals drift');
check(packages.invariants.fullPackagesAreUidDisjoint === true && packages.invariants.sourceIndexInjectsByDefault === false && packages.invariants.quarantineInjectsByDefault === false && packages.invariants.l0IsStandaloneAndExcludedFromFullSetCounts === true, 'package isolation invariants drift');
check(JSON.stringify(layering?.defaultEnabledPackageIds) === JSON.stringify(defaultPackageIds), 'default package layering policy drift');
check(JSON.stringify(layering?.neverRuntimePackageIds) === JSON.stringify(neverRuntimePackageIds), 'never-runtime layering policy drift');
check(layering?.fullPackageUidDisjoint === true && layering?.l0Standalone === true && layering?.l0ExclusiveWithFullPackages === true, 'worldbook isolation boundaries are not declared');
check(JSON.stringify(l0.exclusiveWith) === JSON.stringify(packages.packages.map(item => item.id)), 'L0 exclusive package boundary drift');
check(layering?.timelineEntryCount === timeline.entries.length && layering?.verifiedRefreshRecordCount === cantoIxRefresh.records.length + fullTimelineRefresh.records.length && layering?.verifiedRefreshRecordCount === sourceAudit.completionGate.verifiedRefreshRecords, 'timeline refresh evidence drift');
check(cantoIxRefresh.records.length === 8 && fullTimelineRefresh.records.length === 29, 'refresh overlay record counts drift');
check(cantoIxRefresh.records.some(record => record.id === 'refresh.canto-ix.9-14') && cantoIxRefresh.records.some(record => record.id === 'refresh.canto-ix.9-18') && cantoIxRefresh.records.some(record => record.id === 'refresh.canto-ix.9-37') && cantoIxRefresh.records.some(record => record.id === 'refresh.canto-ix.9-43') && cantoIxRefresh.records.some(record => record.id === 'refresh.au-boundary'), 'Canto IX/AU boundary evidence is incomplete');
check(JSON.stringify(layering?.canonBoundary?.requiredOrder) === JSON.stringify(['9-14', '9-18', '9-37', '9-43', 'AU/IF']), 'canon/AU boundary order is missing or stale');
check(JSON.stringify(coverage.fullCoverage) && JSON.stringify(coverage.fullCoverage.timeline) === JSON.stringify(auditTimeline), 'coverage timeline summary is not copied from source audit');
check(coverage.fullCoverage.auditedEntries === sourceAudit.entries.length && coverage.fullCoverage.substantiveEntries === sourceAudit.completionGate.substantiveEntries && coverage.fullCoverage.sourceIndexBridgeEntries === sourceAudit.completionGate.sourceIndexBridgeEntries, 'coverage audit totals drift');
check(coverage.counts.unresolvedSubstantiveEntries === coverage.counts.canonCandidates + coverage.counts.needsReview, 'coverage unresolved counts do not reconcile');
check(coverage.fullCoverage.integrity?.auditIdsUnique === true && coverage.fullCoverage.integrity?.unresolvedIdsUnique === true && coverage.fullCoverage.integrity?.unresolvedIdsAreAudited === true && coverage.fullCoverage.integrity?.sourceRefsCopiedFromAudit === true && coverage.fullCoverage.integrity?.timelineCountsDerivedFromAudit === true && coverage.fullCoverage.integrity?.packageIdsMatchAudit === true, 'coverage integrity evidence is incomplete');
check(l0.entries.length === rules.originalEntryPolicy.expectedEntryCount, 'L0 does not contain 16 entries');
check(cardEntries.length === rules.originalEntryPolicy.expectedEntryCount, 'card does not contain 16 entries');
check(JSON.stringify(l0Ids) === JSON.stringify(cardIds), 'card and L0 entry UID order differs');
check(cardEntries.every(entry => entry.extensions?.entry_id), 'card entry IDs are incomplete');
check(JSON.stringify(delivery.originalEntries.uidOrder) === JSON.stringify(cardIds), 'delivery manifest and card entry UID order differs');
check(JSON.stringify(templateEntries.map(entry => entry.extensions?.entry_id)) === JSON.stringify(cardIds), 'template and card entry UID order differs');
check(JSON.stringify(canonicalEntries.map(entry => entry.uid)) === JSON.stringify(cardIds), 'dist worldbook and card entry UID order differs');
check(JSON.stringify(releaseEntries.map(entry => entry.uid)) === JSON.stringify(cardIds), 'release worldbook and card entry UID order differs');
check(releaseTimeline.entries?.length === delivery.timeline.entryCount, 'release timeline entry count drift');
check((await readBytes('dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json')).equals(await readBytes('release/github-cdn-root/dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json')), 'dist and release canon worldbook bytes differ');
check((await readBytes('dist/albina-galgame-card/worldbooks/albina-worldbook-plot-full-timeline-v1.json')).equals(await readBytes('release/github-cdn-root/dist/albina-galgame-card/worldbooks/albina-worldbook-plot-full-timeline-v1.json')), 'dist and release timeline bytes differ');
check(matrix.embeddedWorldbook.entryCount === 16, 'runtime matrix does not record 16 embedded entries');
check(matrix.embeddedWorldbook.l0FileSha256 === matrixDigest, 'runtime matrix L0 hash is stale');
check(delivery.protectedCard.sha256 === sha256(cardBytes), 'delivery card hash does not match current read-only card');
check(delivery.protectedCard.sha256 === 'b7af44a57554a52cac601751971775de7ce8eb878094ab67e24648a05b77bff0', 'protected card baseline hash changed');
check(delivery.originalEntries.entryCount === 16, 'delivery manifest does not record 16 preserved entries');
check(delivery.originalEntries.uidOrder.length === 16, 'delivery manifest UID order is incomplete');
check(delivery.apiClaims.every(claim => claim.status !== 'confirmed'), 'delivery manifest contains an ungrounded confirmed API claim');

const report = {
  ok: errors.length === 0,
  checks: {
    playerProfileFourLinks: errors.every(error => !error.includes('player')),
    fullPlotTimeline: errors.every(error => !error.includes('timeline')),
    originalSixteenEntries: errors.every(error => !error.includes('16') && !error.includes('card') && !error.includes('L0')),
    apiBoundary: rules.apiEvidencePolicy.unknownApi === 'forbidden' && delivery.apiClaims.every(claim => claim.status !== 'confirmed'),
    layeredWorldbookBoundaries: errors.every(error => !error.includes('layering') && !error.includes('package') && !error.includes('worldbook isolation') && !error.includes('canon/AU')),
  },
  evidence: {
    profileFieldCount: fields.length,
    timelineEntryCount: timeline.entries.length,
    preservedEntryCount: cardEntries.length,
    preservedUidOrder: cardIds,
    cardSha256: sha256(cardBytes),
    l0Sha256: matrixDigest,
    layeredPackageCount: packageEntries.length,
    layeredPackageUidCount: packageUids.length,
    defaultPackageIds,
    neverRuntimePackageIds,
    refreshRecordCount: cantoIxRefresh.records.length + fullTimelineRefresh.records.length,
    substantiveCandidateCount: packages.totals.substantiveCandidates,
    sourceIndexBridgeCount: packages.totals.sourceIndexBridges,
    unresolvedCoverageCount: coverage.counts.unresolvedSubstantiveEntries,
    timelineCounts: auditTimeline.substantiveOnly,
  },
  errors,
};
process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (errors.length) process.exitCode = 1;
