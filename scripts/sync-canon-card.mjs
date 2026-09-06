import { isDeepStrictEqual } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(import.meta.dirname, '..');
const sourcePath = resolve(projectRoot, 'content/albina-card-canon-v1.json');
const canonSourcesPath = resolve(projectRoot, 'content/canon-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const tavernHelperPath = resolve(projectRoot, 'content/tavern-helper-v1.json');
const playerProfileRuntimePath = resolve(projectRoot, 'content/worldbook/player-profile-runtime-v1.json');
const worldbookStructureContractPath = resolve(projectRoot, 'content/worldbook/worldbook-structure-contract-v1.json');
const timelinePath = resolve(projectRoot, 'content/worldbook/albina-worldbook-plot-full-timeline-v1.json');
const l0WorldbookPath = resolve(projectRoot, 'content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json');
const cardPaths = [
  resolve(projectRoot, 'card/albina.card.json'),
  resolve(projectRoot, 'card/character-card.template.json'),
];
const worldbookPath = resolve(
  projectRoot,
  'dist/albina-galgame-card/worldbooks/albina_canon_worldbook_v1.json',
);
const legacyFields = ['description', 'personality', 'scenario', 'first_mes', 'mes_example'];
const dataFields = [
  ...legacyFields,
  'system_prompt',
  'post_history_instructions',
  'creator_notes',
  'alternate_greetings',
];
const classifications = new Set([
  'canon_exact',
  'canon_paraphrase',
  'supported_inference',
  'AU_extension',
  'rejected',
]);

function assert(condition, message) {
  if (!condition) throw new Error(`Invalid canon card source: ${message}`);
}

function nonEmptyString(value, label) {
  assert(typeof value === 'string' && value.trim().length > 0, `${label} must be a non-empty string`);
}

function stringArray(value, label) {
  assert(Array.isArray(value) && value.length > 0, `${label} must be a non-empty array`);
  for (const [index, item] of value.entries()) nonEmptyString(item, `${label}[${index}]`);
}

function sourceRefsForClaims(claimIds, claimsById) {
  const sourceRefs = new Set();
  for (const claimId of claimIds) {
    const claim = claimsById.get(claimId);
    assert(claim, `references unknown claim ${claimId}`);
    claim.evidence.forEach((evidence) => sourceRefs.add(evidence.sourceId));
  }
  return [...sourceRefs].sort();
}

function normalizedEntry(entry, claimsById) {
  stringArray(entry.claimIds, `${entry.id}.claimIds`);
  const claims = entry.claimIds.map((claimId) => claimsById.get(claimId));
  assert(claims.every(Boolean), `${entry.id} references an unknown claim`);
  const entryClasses = new Set(claims.map((claim) => claim.classification));
  assert(entryClasses.size === 1, `${entry.id} must not mix claim classifications`);
  const contentClassification = [...entryClasses][0];
  assert(contentClassification !== 'rejected', `${entry.id} cannot publish rejected claims`);
  return {
    ...entry,
    contentClassification,
    sourceRefs: sourceRefsForClaims(entry.claimIds, claimsById),
  };
}

function validateSource(source, sourceLedger, claimLedger) {
  assert(source?.schemaVersion === 1, 'schemaVersion must be 1');
  assert(source?.id === 'albina-card-canon-v1', 'unexpected source id');
  assert(source.sources === undefined, 'sources must come from content/canon-sources-v1.json');
  assert(source.claims === undefined, 'claims must come from content/canon-claims-v1.json');
  assert(sourceLedger?.version === 1 && Array.isArray(sourceLedger.sources), 'canonical sources are required');
  assert(claimLedger?.version === 1 && Array.isArray(claimLedger.claims), 'canonical claims are required');
  assert(source.card && typeof source.card === 'object', 'card is required');
  for (const field of dataFields) {
    if (field === 'alternate_greetings') stringArray(source.card[field], `card.${field}`);
    else nonEmptyString(source.card[field], `card.${field}`);
  }

  const sourceIds = new Set(sourceLedger.sources.map((sourceItem) => sourceItem.id));
  const claimsById = new Map(claimLedger.claims.map((claim) => [claim.id, claim]));
  assert(sourceIds.size === sourceLedger.sources.length, 'source ids must be unique');
  assert(claimsById.size === claimLedger.claims.length, 'claim ids must be unique');
  for (const claim of claimLedger.claims) for (const evidence of claim.evidence) {
    assert(sourceIds.has(evidence.sourceId), `${claim.id} references unknown source ${evidence.sourceId}`);
  }

  const book = source.card.character_book;
  assert(book && typeof book === 'object', 'card.character_book is required');
  nonEmptyString(book.name, 'card.character_book.name');
  nonEmptyString(book.description, 'card.character_book.description');
  assert(Number.isInteger(book.scanDepth) && book.scanDepth > 0, 'character_book.scanDepth must be positive');
  assert(Array.isArray(book.entries) && book.entries.length >= 10, 'character_book must contain at least 10 entries');
  const entryIds = new Set();
  const entries = [];
  for (const entry of book.entries) {
    nonEmptyString(entry.id, 'character_book entry id');
    assert(!entryIds.has(entry.id), `duplicate character_book entry id ${entry.id}`);
    entryIds.add(entry.id);
    stringArray(entry.keys, `${entry.id}.keys`);
    assert(Array.isArray(entry.secondaryKeys), `${entry.id}.secondaryKeys must be an array`);
    nonEmptyString(entry.comment, `${entry.id}.comment`);
    nonEmptyString(entry.content, `${entry.id}.content`);
    assert(typeof entry.constant === 'boolean', `${entry.id}.constant must be boolean`);
    assert(typeof entry.selective === 'boolean', `${entry.id}.selective must be boolean`);
    assert(Number.isInteger(entry.order), `${entry.id}.order must be an integer`);
    stringArray(entry.claimIds, `${entry.id}.claimIds`);
    assert(entry.contentClassification === undefined, `${entry.id}.contentClassification must be derived from canonical claims`);
    assert(entry.sourceRefs === undefined, `${entry.id}.sourceRefs must be derived from canonical claims`);
    const normalized = normalizedEntry(entry, claimsById);
    assert(classifications.has(normalized.contentClassification), `${entry.id} has an invalid classification`);
    entries.push(normalized);
  }
  return {
    ...source,
    sources: sourceLedger.sources,
    claims: claimLedger.claims.map((claim) => ({
      id: claim.id,
      classification: claim.classification,
      statement: claim.statement,
      sourceRefs: [...new Set(claim.evidence.map((evidence) => evidence.sourceId))].sort(),
    })),
    card: { ...source.card, character_book: { ...book, entries } },
  };
}

function cardEntry(entry, scanDepth) {
  return {
    keys: entry.keys,
    secondary_keys: entry.secondaryKeys,
    comment: entry.comment,
    content: entry.content,
    constant: entry.constant,
    selective: entry.selective,
    insertion_order: entry.order,
    enabled: true,
    position: entry.position,
    extensions: {
      depth: scanDepth,
      role: 'system',
      entry_id: entry.id,
      content_classification: entry.contentClassification,
      claim_ids: entry.claimIds,
      source_refs: entry.sourceRefs,
      copyright_mode: 'paraphrase_only',
      review_status: 'source_checked',
    },
  };
}

function validatePlayerProfileRuntime(entry) {
  assert(entry?.schemaVersion === 1, 'player profile runtime schemaVersion must be 1');
  assert(entry.id === 'albina_player_profile_runtime', 'unexpected player profile runtime id');
  nonEmptyString(entry.name, 'player profile runtime name');
  assert(entry.constant === true && entry.selective === false, 'player profile runtime must be constant');
  assert(entry.enabled === true, 'player profile runtime must be enabled');
  assert(Number.isInteger(entry.insertion_order), 'player profile runtime insertion_order must be an integer');
  assert(entry.position === 'after_character_definition', 'player profile runtime position must be after_character_definition');
  nonEmptyString(entry.content, 'player profile runtime content');
  assert(!entry.content.startsWith('@@private'), 'player profile runtime must not use the SillyTavern-import-filtered private prefix');
  assert(entry.content.includes("getvar('albinaPlayerProfileV1', { defaults: {} })"), 'player profile runtime must use the verified chat variable key and default');
  assert(entry.content.includes('initial_relationship_tendency:'), 'player profile runtime must inject the initial relationship tendency');
  return entry;
}

function validateWorldbookStructure(contract, source, timeline, l0Worldbook, playerProfileRuntime) {
  assert(contract?.schemaVersion === 1, 'worldbook structure contract schemaVersion must be 1');
  assert(contract.id === 'albina-worldbook-structure-contract-v1', 'unexpected worldbook structure contract id');
  const cardEntries = source.card.character_book.entries;
  const canonical = contract.canonicalCard;
  assert(cardEntries.length === canonical.sourceEntryCount, 'canonical source entry count changed');
  assert(cardEntries.map((entry) => entry.id).join('\u0000') === canonical.sourceEntryIds.join('\u0000'), 'canonical source entry ids/order changed');
  assert(cardEntries.map((entry) => entry.order).join(',') === canonical.sourceOrders.join(','), 'canonical source insertion orders changed');
  assert(playerProfileRuntime.id === canonical.runtimeEntryId, 'runtime entry id is not part of the contract');
  assert(cardEntries.find((entry) => entry.id === canonical.canonOutcomeEntryId)?.order < cardEntries.find((entry) => entry.id === canonical.auBoundaryEntryId)?.order, 'AU boundary must follow canon outcome');
  assert(canonical.embeddedEntryCount === canonical.sourceEntryCount + 1, 'embedded entry count must include exactly one runtime entry');

  assert(timeline?.id === 'plot-full-timeline', 'unexpected plot timeline id');
  assert(timeline.defaultEnabled === contract.plotTimeline.requireDefaultEnabled, 'plot timeline default-enabled policy changed');
  assert(Array.isArray(timeline.entries) && timeline.entries.length === contract.plotTimeline.entryCount, 'plot timeline entry count changed');
  const timelineUids = timeline.entries.map((entry) => entry.uid);
  assert(new Set(timelineUids).size === timelineUids.length, 'plot timeline UIDs must be unique');
  assert(timelineUids.join('\u0000') === contract.plotTimeline.uids.join('\u0000'), 'plot timeline UID/order changed');
  const placements = new Set();
  let previousOrder = -Infinity;
  for (const entry of timeline.entries) {
    assert(Number.isInteger(entry.order) && (!contract.plotTimeline.strictlyIncreasingOrders || entry.order > previousOrder), `plot timeline order is not strictly increasing at ${entry.uid}`);
    previousOrder = entry.order;
    const extensions = entry.extensions ?? {};
    placements.add(extensions.timeline_placement);
    assert(extensions.narrative_role === contract.plotTimeline.requireTimelineRole, `${entry.uid} is not marked as timeline`);
    assert(extensions.canonicality === contract.plotTimeline.requireCanonicality, `${entry.uid} is not a canon candidate`);
    assert(Array.isArray(extensions.source_refs) && (!contract.plotTimeline.requireSourceRefs || extensions.source_refs.length > 0), `${entry.uid} lacks source refs`);
  }
  for (const placement of contract.plotTimeline.requiredTimelinePlacements) assert(placements.has(placement), `plot timeline is missing placement ${placement}`);

  assert(l0Worldbook?.id === 'l0-minimal-card-anchors', 'unexpected L0 worldbook id');
  assert(l0Worldbook.entries.length === canonical.embeddedEntryCount, 'L0 must preserve all 16 embedded entries');
  assert(l0Worldbook.entries.slice(0, canonical.sourceEntryCount).map((entry) => entry.uid).join('\u0000') === canonical.sourceEntryIds.join('\u0000'), 'L0 source entries changed');
  assert(l0Worldbook.entries.at(-1)?.uid === canonical.runtimeEntryId, 'L0 runtime entry is missing or moved');
}

function playerProfileCardEntry(entry, scanDepth) {
  return {
    keys: [],
    secondary_keys: [],
    comment: entry.name,
    content: entry.content,
    constant: true,
    selective: false,
    insertion_order: entry.insertion_order,
    enabled: true,
    position: entry.position,
    extensions: {
      depth: scanDepth,
      role: 'system',
      entry_id: entry.id,
      content_classification: 'AU_extension',
      claim_ids: [],
      source_refs: [],
      copyright_mode: 'original_runtime_template',
      review_status: 'ejs-source-checked',
      variable_source: 'TavernHelper.setVariables(chat)',
    },
  };
}

function cardBook(source, playerProfileRuntime) {
  const book = source.card.character_book;
  return {
    name: book.name,
    description: book.description,
    scan_depth: book.scanDepth,
    entries: [...book.entries.map((entry) => cardEntry(entry, book.scanDepth)), playerProfileCardEntry(playerProfileRuntime, book.scanDepth)],
  };
}

function standaloneBook(source, playerProfileRuntime) {
  const book = cardBook(source, playerProfileRuntime);
  return {
    schemaVersion: 1,
    id: 'albina-canon-worldbook-v1',
    generatedFrom: 'content/albina-card-canon-v1.json + content/canon-claims-v1.json + content/worldbook/player-profile-runtime-v1.json',
    copyrightPolicy: source.copyrightPolicy,
    name: book.name,
    description: book.description,
    scan_depth: book.scan_depth,
    entries: book.entries.map((entry) => ({
      uid: entry.extensions.entry_id,
      key: entry.keys,
      keysecondary: entry.secondary_keys,
      comment: entry.comment,
      content: entry.content,
      constant: entry.constant,
      selective: entry.selective,
      position: entry.position,
      order: entry.insertion_order,
      disable: !entry.enabled,
      extensions: entry.extensions,
    })),
  };
}

function validateTavernHelper(source) {
  assert(source?.schemaVersion === 1, 'Tavern Helper schemaVersion must be 1');
  nonEmptyString(source.releaseVersion, 'Tavern Helper releaseVersion');
  nonEmptyString(source.cdnUrl, 'Tavern Helper cdnUrl');
  assert(source.cdnUrl.includes(`@v${source.releaseVersion}/`), 'Tavern Helper CDN tag must match releaseVersion');
  assert(source.script?.type === 'script', 'Tavern Helper script type must be script');
  assert(source.script.enabled === true, 'Tavern Helper script must be enabled');
  nonEmptyString(source.script.name, 'Tavern Helper script name');
  nonEmptyString(source.script.id, 'Tavern Helper script id');
  assert(source.script.info === '', 'Tavern Helper script info must be empty');
  assert(source.script.button?.enabled === true, 'Tavern Helper button must be enabled');
  assert(source.script.button.buttons?.length === 1, 'Tavern Helper must expose one button');
  nonEmptyString(source.script.button.buttons[0].name, 'Tavern Helper button name');
  assert(source.script.button.buttons[0].visible === true, 'Tavern Helper button must be visible');
  assert(isDeepStrictEqual(source.script.data, {}), 'Tavern Helper script data must be empty');
  assert(Array.isArray(source.optionalIntegrations), 'optionalIntegrations must be an array');
  const integrationIds = new Set();
  for (const integration of source.optionalIntegrations) {
    nonEmptyString(integration.id, 'integration id');
    assert(!integrationIds.has(integration.id), `duplicate integration id ${integration.id}`);
    integrationIds.add(integration.id);
    assert(typeof integration.enabled === 'boolean', `${integration.id}.enabled must be boolean`);
    nonEmptyString(integration.name, `${integration.id}.name`);
    nonEmptyString(integration.releaseVersion, `${integration.id}.releaseVersion`);
    nonEmptyString(integration.cdnUrl, `${integration.id}.cdnUrl`);
    assert(integration.cdnUrl.includes(`@v${integration.releaseVersion}/`), `${integration.id} CDN tag must match releaseVersion`);
    stringArray(integration.capabilities, `${integration.id}.capabilities`);
    nonEmptyString(integration.fallback, `${integration.id}.fallback`);
    nonEmptyString(integration.scope, `${integration.id}.scope`);
  }
  assert(isDeepStrictEqual(source.variables, {}), 'Tavern Helper variables must be empty');
  return source;
}

function helperExtension(source) {
  return {
    scripts: [{
      type: source.script.type,
      enabled: source.script.enabled,
      name: source.script.name,
      id: source.script.id,
      content: `import '${source.cdnUrl}'\n`,
      info: source.script.info,
      button: source.script.button,
      data: source.script.data,
    }, ...source.optionalIntegrations.filter((integration) => integration.enabled).map((integration) => ({
      type: 'script',
      enabled: true,
      name: integration.name,
      id: `albina-integration-${integration.id}-v${integration.releaseVersion}`,
      content: `import '${integration.cdnUrl}'\n`,
      info: integration.role,
      button: { enabled: false, buttons: [] },
      data: {
        integration_id: integration.id,
        capabilities: integration.capabilities,
        fallback: integration.fallback,
        scope: integration.scope,
      },
    }))],
    variables: source.variables,
  };
}

function synchronizedCard(card, source, tavernHelper, playerProfileRuntime) {
  assert(card?.spec === 'chara_card_v3', 'target card must use chara_card_v3');
  assert(card.data && typeof card.data === 'object', 'target card.data is required');
  const next = structuredClone(card);
  for (const field of legacyFields) next[field] = source.card[field];
  for (const field of dataFields) next.data[field] = structuredClone(source.card[field]);
  next.data.character_book = cardBook(source, playerProfileRuntime);
  next.data.character_version = tavernHelper.releaseVersion;
  next.data.tags = next.data.tags.filter((tag) => !/^v2\.0\.0-rc\.\d+$/u.test(tag));
  next.data.tags.push(`v${tavernHelper.releaseVersion}`);
  next.data.extensions.albina_galgame_card.cdn_import = tavernHelper.cdnUrl;
  next.data.extensions.tavern_helper = helperExtension(tavernHelper);
  next.data.cdn_import = tavernHelper.cdnUrl;
  return next;
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function synchronize(writeMode) {
  const [profile, sourceLedger, claimLedger, helperSource, playerProfileRuntimeSource, worldbookStructureContract, timeline, l0Worldbook] = await Promise.all([
    readJson(sourcePath),
    readJson(canonSourcesPath),
    readJson(canonClaimsPath),
    readJson(tavernHelperPath),
    readJson(playerProfileRuntimePath),
    readJson(worldbookStructureContractPath),
    readJson(timelinePath),
    readJson(l0WorldbookPath),
  ]);
  const source = validateSource(profile, sourceLedger, claimLedger);
  const tavernHelper = validateTavernHelper(helperSource);
  const playerProfileRuntime = validatePlayerProfileRuntime(playerProfileRuntimeSource);
  validateWorldbookStructure(worldbookStructureContract, source, timeline, l0Worldbook, playerProfileRuntime);
  const changes = [];
  for (const path of cardPaths) {
    const current = await readJson(path);
    const expected = synchronizedCard(current, source, tavernHelper, playerProfileRuntime);
    if (!isDeepStrictEqual(current, expected)) changes.push({ path, expected });
  }

  let currentWorldbook;
  try {
    currentWorldbook = await readJson(worldbookPath);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  const expectedWorldbook = standaloneBook(source, playerProfileRuntime);
  if (!isDeepStrictEqual(currentWorldbook, expectedWorldbook)) {
    changes.push({ path: worldbookPath, expected: expectedWorldbook });
  }

  if (changes.length === 0) {
    console.log('Canon card, template, and worldbook are synchronized.');
    return;
  }
  if (!writeMode) {
    for (const change of changes) console.error(`Canon content differs: ${change.path}`);
    console.error('Run node scripts/sync-canon-card.mjs --write.');
    process.exitCode = 1;
    return;
  }
  for (const change of changes) await writeFile(change.path, serialize(change.expected), 'utf8');
  console.log(`Synchronized ${changes.length} canon content target(s).`);
}

async function main() {
  const arguments_ = new Set(process.argv.slice(2));
  const writeMode = arguments_.delete('--write');
  if (arguments_.size > 0) throw new Error(`Unknown arguments: ${[...arguments_].join(', ')}`);
  await synchronize(writeMode);
}

export { validateWorldbookStructure };

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
