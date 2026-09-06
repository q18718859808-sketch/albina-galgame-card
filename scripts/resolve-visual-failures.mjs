import { resolveDefinitiveVisualFailures } from './lib/visual-production.mjs';

const ids = valueAfter(process.argv.slice(2), '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
const results = await resolveDefinitiveVisualFailures(ids);
for (const result of results) console.log(`${result.status}: ${result.id} (${result.resolution.providerErrorType})`);

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
