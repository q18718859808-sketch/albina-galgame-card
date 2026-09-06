import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const worldbookDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(worldbookDir, '..', '..');
const auditPath = path.join(worldbookDir, 'limbus-world-audit-v1.json');
const inventoryPath = path.join(projectRoot, 'research', 'legacy-worldbooks', 'inventory-v1.json');
const l0Path = path.join(
  projectRoot,
  'dist',
  'albina-galgame-card',
  'worldbooks',
  'albina_canon_worldbook_v1.json',
);

const layerDefinitions = [
  {
    id: 'l1-albina-core',
    file: 'albina-worldbook-l1-albina-core-v1.json',
    name: 'L1 Albina core',
    defaultEnabled: true,
    select: entry =>
      entry.narrativeRole !== 'source-index-bridge' &&
      entry.legacyFile.startsWith('albina_p0_') &&
      entry.canonicality === 'canon-candidate',
  },
  {
    id: 'l2-canto-ix-and-main-cast',
    file: 'albina-worldbook-l2-canto-ix-main-cast-v1.json',
    name: 'L2 Canto IX and main cast',
    defaultEnabled: true,
    select: entry =>
      entry.narrativeRole !== 'source-index-bridge' &&
      entry.legacyFile.startsWith('albina_p1_') &&
      entry.canonicality === 'canon-candidate',
  },
  {
    id: 'l3-world-expansion',
    file: 'albina-worldbook-l3-world-expansion-v1.json',
    name: 'L3 world expansion',
    defaultEnabled: false,
    select: entry =>
      entry.legacyFile.startsWith('albina_p2_') &&
      entry.narrativeRole !== 'source-index-bridge' &&
      entry.narrativeRole !== 'timeline' &&
      entry.canonicality === 'canon-candidate',
  },
  {
    id: 'plot-full-timeline',
    file: 'albina-worldbook-plot-full-timeline-v1.json',
    name: 'Plot full timeline',
    defaultEnabled: true,
    select: entry => entry.narrativeRole === 'timeline' && entry.canonicality === 'canon-candidate',
  },
  {
    id: 'l4-mechanics',
    file: 'albina-worldbook-l4-mechanics-v1.json',
    name: 'L4 mechanics',
    defaultEnabled: false,
    select: entry =>
      entry.narrativeRole !== 'source-index-bridge' &&
      entry.legacyFile.startsWith('albina_p3_') &&
      entry.canonicality === 'canon-candidate',
  },
  {
    id: 'l5-reviewed-identities',
    file: 'albina-worldbook-l5-reviewed-identities-v1.json',
    name: 'L5 reviewed identities',
    defaultEnabled: false,
    select: entry =>
      entry.narrativeRole !== 'source-index-bridge' &&
      entry.legacyFile.startsWith('albina_p4_') &&
      entry.canonicality === 'canon-candidate',
  },
  {
    id: 'au-if',
    file: 'albina-worldbook-au-if-v1.json',
    name: 'AU and IF continuity',
    defaultEnabled: false,
    select: entry => entry.narrativeRole !== 'source-index-bridge' && entry.canonicality === 'AU_extension',
  },
  {
    id: 'quarantine-unverified-rp',
    file: 'albina-worldbook-quarantine-unverified-rp-v1.json',
    name: 'Quarantine: unverified RP material',
    defaultEnabled: false,
    forceDisabled: true,
    select: entry => entry.narrativeRole !== 'source-index-bridge' && entry.canonicality === 'needs-review',
  },
  {
    id: 'source-index',
    file: 'albina-worldbook-source-index-disabled-v1.json',
    name: 'Disabled source index',
    defaultEnabled: false,
    forceDisabled: true,
    select: entry => entry.narrativeRole === 'source-index-bridge',
  },
];

const readJson = async file => JSON.parse(await readFile(file, 'utf8'));
const sha256 = value => createHash('sha256').update(value).digest('hex');
const characters = entries => entries.reduce((sum, entry) => sum + String(entry.content ?? '').length, 0);

function normalizeEntry(source, audited, definition) {
  const disabled = definition.forceDisabled || !definition.defaultEnabled;
  return {
    ...source,
    disable: disabled,
    extensions: {
      ...(source.extensions ?? {}),
      albina_layer: definition.id,
      canonicality: audited.canonicality,
      narrative_role: audited.narrativeRole,
      timeline_placement: audited.timelinePlacement,
      audit_review: audited.review,
      source_package: audited.legacyFile,
      injection_policy: disabled ? 'disabled-by-default' : 'keyword-or-entry-policy',
    },
  };
}

async function loadLegacyEntries(audit, legacyRoot) {
  const requiredFiles = [...new Set(audit.entries.map(entry => entry.legacyFile))];
  const sourceByUid = new Map();

  for (const file of requiredFiles) {
    const absolute = path.join(legacyRoot, file);
    const raw = await readFile(absolute);
    const expectedHashes = new Set(
      audit.entries.filter(entry => entry.legacyFile === file).map(entry => entry.legacyFileSha256),
    );
    const actualHash = sha256(raw);
    if (expectedHashes.size !== 1 || !expectedHashes.has(actualHash)) {
      throw new Error(`Legacy package hash mismatch: ${file} (${actualHash})`);
    }

    const source = JSON.parse(raw.toString('utf8'));
    for (const entry of source.entries ?? []) {
      const key = `${file}\0${entry.uid}`;
      if (sourceByUid.has(key)) throw new Error(`Duplicate UID within source package: ${key}`);
      sourceByUid.set(key, entry);
    }
  }

  return sourceByUid;
}

async function writePackage(definition, auditedEntries, sourceByUid) {
  const entries = auditedEntries.map(audited => {
    const source = sourceByUid.get(`${audited.legacyFile}\0${audited.id}`);
    if (!source) throw new Error(`Audited UID missing from source package: ${audited.legacyFile}:${audited.id}`);
    return normalizeEntry(source, audited, definition);
  });

  const payload = {
    schemaVersion: 1,
    id: definition.id,
    name: definition.name,
    description: `Generated from the reviewed migration ledger. Package policy: ${definition.defaultEnabled ? 'enabled' : 'disabled'} by default.`,
    generatedFrom: 'content/worldbook/limbus-world-audit-v1.json',
    sourcePolicy: 'Paraphrased legacy entries fixed by source-package SHA-256; source-index and quarantine never inject by default.',
    defaultEnabled: definition.defaultEnabled,
    scan_depth: 4,
    entries,
  };
  const output = `${JSON.stringify(payload, null, 2)}\n`;
  await writeFile(path.join(worldbookDir, definition.file), output, 'utf8');
  return {
    id: definition.id,
    file: `content/worldbook/${definition.file}`,
    defaultEnabled: definition.defaultEnabled,
    entryCount: entries.length,
    enabledEntryCount: entries.filter(entry => entry.disable !== true).length,
    contentCharacters: characters(entries),
    constantCharacters: characters(entries.filter(entry => entry.constant && entry.disable !== true)),
    sha256: sha256(output),
  };
}

async function main() {
  const [audit, inventory, l0] = await Promise.all([
    readJson(auditPath),
    readJson(inventoryPath),
    readJson(l0Path),
  ]);
  const sourceByUid = await loadLegacyEntries(audit, inventory.legacyRoot);
  const assigned = new Map();
  const packageReports = [];

  for (const definition of layerDefinitions) {
    const selected = audit.entries.filter(definition.select);
    for (const entry of selected) {
      if (assigned.has(entry.id)) {
        throw new Error(`UID assigned to multiple full packages: ${entry.id}`);
      }
      assigned.set(entry.id, definition.id);
    }
    packageReports.push(await writePackage(definition, selected, sourceByUid));
  }

  if (assigned.size !== audit.entries.length) {
    const missing = audit.entries.filter(entry => !assigned.has(entry.id)).map(entry => entry.id);
    throw new Error(`Unassigned audited entries (${missing.length}): ${missing.slice(0, 10).join(', ')}`);
  }

  const l0Output = {
    ...l0,
    id: 'l0-minimal-card-anchors',
    name: 'L0 minimal card anchors',
    description: 'Standalone minimal preset copied from the current card worldbook. Do not combine with the full layered set.',
    defaultEnabled: true,
    exclusiveWith: packageReports.map(report => report.id),
  };
  const l0Text = `${JSON.stringify(l0Output, null, 2)}\n`;
  const l0File = 'albina-worldbook-l0-minimal-anchors-v1.json';
  await writeFile(path.join(worldbookDir, l0File), l0Text, 'utf8');

  const substantiveReports = packageReports.filter(report => report.id !== 'source-index');
  const manifest = {
    schemaVersion: 1,
    id: 'albina-layered-worldbooks-v1',
    generatedFrom: [
      'content/worldbook/limbus-world-audit-v1.json',
      'research/legacy-worldbooks/inventory-v1.json',
    ],
    invariants: {
      auditedUniqueEntries: 2481,
      substantiveCandidates: 599,
      sourceIndexBridges: 1882,
      fullPackagesAreUidDisjoint: true,
      sourceIndexInjectsByDefault: false,
      quarantineInjectsByDefault: false,
      l0IsStandaloneAndExcludedFromFullSetCounts: true,
    },
    budgetPolicy: {
      unit: 'UTF-16 content characters',
      defaultEnabledConstantCharacterLimit: 12000,
      defaultEnabledInventoryCharacterLimit: 120000,
      note: 'Keyword-triggered inventory is not simultaneous prompt cost. Disabled packages and entries count as zero runtime budget.',
    },
    presets: {
      minimal: ['l0-minimal-card-anchors'],
      canonicalCore: ['l1-albina-core', 'l2-canto-ix-and-main-cast', 'plot-full-timeline'],
      canonicalExpanded: ['l1-albina-core', 'l2-canto-ix-and-main-cast', 'plot-full-timeline', 'l3-world-expansion'],
      mechanicsOptIn: ['l4-mechanics'],
      identityOptIn: ['l5-reviewed-identities'],
      auOptIn: ['au-if'],
      neverRuntime: ['source-index', 'quarantine-unverified-rp'],
    },
    l0: {
      id: 'l0-minimal-card-anchors',
      file: `content/worldbook/${l0File}`,
      defaultEnabled: true,
      entryCount: l0Output.entries.length,
      enabledEntryCount: l0Output.entries.filter(entry => entry.disable !== true).length,
      contentCharacters: characters(l0Output.entries),
      constantCharacters: characters(l0Output.entries.filter(entry => entry.constant && entry.disable !== true)),
      sha256: sha256(l0Text),
    },
    packages: packageReports,
    totals: {
      substantiveCandidates: substantiveReports.reduce((sum, report) => sum + report.entryCount, 0),
      sourceIndexBridges: packageReports.find(report => report.id === 'source-index').entryCount,
      defaultEnabledInventoryCharacters: packageReports
        .filter(report => report.defaultEnabled)
        .reduce((sum, report) => sum + report.contentCharacters, 0),
      defaultEnabledConstantCharacters: packageReports.reduce(
        (sum, report) => sum + report.constantCharacters,
        0,
      ),
    },
  };
  await writeFile(
    path.join(worldbookDir, 'albina-worldbook-packages-v1.manifest.json'),
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf8',
  );
}

await main();
