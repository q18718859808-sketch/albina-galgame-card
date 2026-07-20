import { isDeepStrictEqual } from 'node:util';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = resolve(import.meta.dirname, '..');
const sourcePath = resolve(projectRoot, 'content/albina-card-canon-v1.json');
const canonSourcesPath = resolve(projectRoot, 'content/canon-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const tavernHelperPath = resolve(projectRoot, 'content/tavern-helper-v1.json');
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

function cardBook(source) {
  const book = source.card.character_book;
  return {
    name: book.name,
    description: book.description,
    scan_depth: book.scanDepth,
    entries: book.entries.map((entry) => cardEntry(entry, book.scanDepth)),
  };
}

function standaloneBook(source) {
  const book = cardBook(source);
  return {
    schemaVersion: 1,
    id: 'albina-canon-worldbook-v1',
    generatedFrom: 'content/albina-card-canon-v1.json + content/canon-claims-v1.json',
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
    }],
    variables: source.variables,
  };
}

function synchronizedCard(card, source, tavernHelper) {
  assert(card?.spec === 'chara_card_v3', 'target card must use chara_card_v3');
  assert(card.data && typeof card.data === 'object', 'target card.data is required');
  const next = structuredClone(card);
  for (const field of legacyFields) next[field] = source.card[field];
  for (const field of dataFields) next.data[field] = structuredClone(source.card[field]);
  next.data.character_book = cardBook(source);
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
  const [profile, sourceLedger, claimLedger, helperSource] = await Promise.all([
    readJson(sourcePath),
    readJson(canonSourcesPath),
    readJson(canonClaimsPath),
    readJson(tavernHelperPath),
  ]);
  const source = validateSource(profile, sourceLedger, claimLedger);
  const tavernHelper = validateTavernHelper(helperSource);
  const changes = [];
  for (const path of cardPaths) {
    const current = await readJson(path);
    const expected = synchronizedCard(current, source, tavernHelper);
    if (!isDeepStrictEqual(current, expected)) changes.push({ path, expected });
  }

  let currentWorldbook;
  try {
    currentWorldbook = await readJson(worldbookPath);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  const expectedWorldbook = standaloneBook(source);
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

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
