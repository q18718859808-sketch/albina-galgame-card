import { readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const readJson = async (relative) => JSON.parse(await readFile(path.join(root, relative), 'utf8'));
const errors = [];
const check = (condition, message) => { if (!condition) errors.push(message); };

const [contract, helper, card, l0] = await Promise.all([
  readJson('content/worldbook/lorebook-tool-call-guarded-contract-v1.json'),
  readJson('content/tavern-helper-v1.json'),
  readJson('card/albina.card.json'),
  readJson('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json'),
]);

const expectedTools = ['Glob', 'Grep', 'Read', 'Write', 'Edit', 'Delete', 'CreateLorebook', 'GetAttribute', 'SetAttribute'];
const expectedChecks = [
  { global: 'SillyTavern', method: 'isToolCallingSupported', requiredResult: true },
  { global: 'SillyTavern', method: 'canPerformToolCalls', arguments: ['function'], requiredResult: true },
];
const integration = helper.optionalIntegrations?.find((item) => item.id === 'lorebook-tool-call');
const embeddedEntries = card.data?.character_book?.entries ?? [];
const embeddedIds = embeddedEntries.map((entry) => entry.extensions?.entry_id);
const l0Ids = l0.entries?.map((entry) => entry.uid) ?? [];
const cardScripts = card.data?.extensions?.tavern_helper?.scripts ?? [];

check(contract?.schemaVersion === 1, 'guarded contract schemaVersion must be 1');
check(contract?.id === 'albina-lorebook-tool-call-guarded-contract-v1', 'unexpected guarded contract id');
check(contract?.integrationId === 'lorebook-tool-call', 'guarded contract integration id drift');
check(contract?.defaultEnabled === false, 'LorebookToolCall must default to disabled');
check(contract?.activation?.requiresExplicitUserOptIn === true, 'explicit opt-in guard is required');
check(contract?.activation?.requiresSeparateUserInstallation === true, 'separate installation guard is required');
check(contract?.activation?.requiresVisibleUpstreamAuthorization === true, 'visible upstream authorization guard is required');
check(JSON.stringify(contract?.activation?.hostCapabilityChecks) === JSON.stringify(expectedChecks), 'host capability checks must use only verified SillyTavern function-tool APIs');
for (const [key, expected] of Object.entries({
  noExtensionDiscoveryApi: true, noCardImport: true, noToolRegistration: true,
  noAutomaticInvocation: true, noAutomaticWorldbookMutation: true, startupDependency: false,
})) check(contract?.runtimeBoundary?.[key] === expected, `runtime boundary drift: ${key}`);
check(contract?.maintenanceScope?.dedicatedWorldbookNamePrefix === 'Albina - ', 'dedicated worldbook naming guard drift');
check(contract?.maintenanceScope?.recommendedEntryPrefix === 'albina.', 'entry naming convention drift');
check(contract?.maintenanceScope?.inputBoundary?.normalization === 'Unicode NFC followed by trim', 'dedicated worldbook input normalization guard drift');
check(contract?.maintenanceScope?.inputBoundary?.maxSuffixLength === 80, 'dedicated worldbook name length guard drift');
check(Array.isArray(contract?.maintenanceScope?.inputBoundary?.rejects) && contract.maintenanceScope.inputBoundary.rejects.length >= 6, 'dedicated worldbook unsafe-name rejection policy is required');
check(JSON.stringify(contract?.reportedTools) === JSON.stringify(expectedTools), 'reported tool list drift');
check(Array.isArray(contract?.evidencePolicy?.forbiddenClaims) && contract.evidencePolicy.forbiddenClaims.length > 0, 'forbidden evidence claims are required');

check(integration?.enabled === false, 'TavernHelper integration must remain disabled');
check(integration?.guardedContract === 'content/worldbook/lorebook-tool-call-guarded-contract-v1.json', 'TavernHelper integration must reference the guarded contract');
check(integration?.activation === "explicit-user-opt-in + separate-user-installation + SillyTavern.isToolCallingSupported() + SillyTavern.canPerformToolCalls('function')", 'TavernHelper activation guard drift');
check(JSON.stringify(integration?.capabilities) === JSON.stringify(expectedTools), 'TavernHelper and contract tool lists differ');
check(!cardScripts.some((script) => script?.data?.integration_id === 'lorebook-tool-call'), 'disabled LorebookToolCall must not be embedded in the card');
check(embeddedEntries.length === 16, 'card must retain exactly 16 embedded entries');
check(JSON.stringify(embeddedIds) === JSON.stringify(l0Ids), 'card and L0 entry order differs');

const report = {
  ok: errors.length === 0,
  evidence: {
    defaultEnabled: contract?.defaultEnabled,
    hostCapabilityChecks: contract?.activation?.hostCapabilityChecks ?? [],
    cardEmbeddedEntries: embeddedEntries.length,
    cardLoadsOptionalIntegration: cardScripts.some((script) => script?.data?.integration_id === 'lorebook-tool-call'),
  },
  errors,
};
console.log(JSON.stringify(report, null, 2));
if (errors.length) process.exitCode = 1;
