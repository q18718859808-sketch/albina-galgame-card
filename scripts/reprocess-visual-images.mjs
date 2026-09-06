import { reprocessVisualArtifacts } from './lib/visual-production.mjs';

const arguments_ = process.argv.slice(2);
const ids = requiredValue(arguments_, '--ids').split(',').map((value) => value.trim()).filter(Boolean);
const results = await reprocessVisualArtifacts({ ids, recoverStaleLock: new Set(arguments_).has('--recover-stale-lock') });
for (const result of results) console.log(`${result.status}: ${result.id} (${result.artifactSha256})`);

function requiredValue(values, name) {
  const index = values.indexOf(name);
  const value = index === -1 ? undefined : values[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
