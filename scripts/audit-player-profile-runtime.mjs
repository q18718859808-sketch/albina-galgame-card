import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const readJson = async (relativePath) => JSON.parse(await readFile(resolve(root, relativePath), 'utf8'));
const hash = async (relativePath) => createHash('sha256').update(await readFile(resolve(root, relativePath))).digest('hex');
const fail = (message) => { throw new Error(`Player profile runtime audit failed: ${message}`); };

const schema = await readJson('content/worldbook/player-profile-schema-v1.json');
const initvar = await readJson('content/worldbook/player-profile-initvar-v1.json');
const rules = await readJson('content/worldbook/player-profile-update-rules-v1.json');
const matrix = await readJson('content/worldbook/player-profile-runtime-matrix-v1.json');
const runtime = await readJson('content/worldbook/player-profile-runtime-v1.json');
const card = await readJson('card/albina.card.json');
const l0 = await readJson('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json');
const domainSource = await readFile(resolve(root, 'src/domain/player-profile.ts'), 'utf8');
const cardEntries = card.data?.character_book?.entries ?? [];
const fields = schema.fields.map((field) => field.path);
if (schema.variableKey !== initvar.variableKey || schema.variableKey !== rules.variableKey || schema.variableKey !== matrix.profileVariableKey) fail('variable key drift');
if (fields.length !== 9 || new Set(fields).size !== fields.length) fail('schema field set is not exactly nine unique fields');
if (fields.some((field) => !(field in initvar.defaults))) fail('InitVar does not cover schema fields');
if (schema.fields.some((field) => initvar.defaults[field.path] !== field.default)) fail('schema and InitVar defaults differ');
if (fields.some((field) => !domainSource.includes(`${field}:`))) fail('domain schema does not cover every contract field');
if (rules.rules.length !== 3 || !rules.rules.every((rule) => rule.target === schema.variableKey)) fail('update rules do not cover the complete event map');
if (runtime.id !== matrix.embeddedWorldbook.requiredEntryId || !runtime.content.includes("getvar('albinaPlayerProfileV1', { defaults: {} })")) fail('EJS read entry is not bound to the verified key');
if (l0.entries.length !== 16 || cardEntries.length !== 16) fail('embedded worldbook must remain exactly 16 entries');
const l0Ids = l0.entries.map((entry) => entry.uid);
const cardIds = cardEntries.map((entry) => entry.extensions?.entry_id);
if (JSON.stringify(l0Ids) !== JSON.stringify(cardIds)) fail('embedded 16-entry UID order changed');
if (await hash('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json') !== matrix.embeddedWorldbook.l0FileSha256) fail('L0 source hash changed');
if (!matrix.chains.persistence.contract.includes("{ type: 'chat' }")) fail('chat persistence contract missing');
if (matrix.acceptance.toolCallRequiredForStartup !== false || matrix.acceptance.unknownApi !== 'forbidden') fail('runtime safety boundary drift');
console.log(JSON.stringify({
  ok: true,
  variableKey: schema.variableKey,
  fieldCount: fields.length,
  embeddedWorldbookEntries: cardEntries.length,
  l0Sha256: matrix.embeddedWorldbook.l0FileSha256,
  chains: Object.fromEntries(Object.entries(matrix.chains).map(([name, value]) => [name, value.status])),
  runtimeStates: Object.fromEntries(matrix.runtimeStates.map((state) => [state, 'covered-by-contract'])),
}, null, 2));
