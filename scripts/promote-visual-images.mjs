import { promoteVisualArtifacts } from './lib/visual-promotion.mjs';

const options = parseArguments(process.argv.slice(2));
const results = await promoteVisualArtifacts(options);
for (const result of results) console.log(`${result.status}: ${result.id} -> ${result.assetId}`);
console.log(JSON.stringify({ total: results.length, promoted: results.filter((result) => result.status === 'promoted').length, skipped: results.filter((result) => result.status === 'skipped').length }));

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const all = values.has('--all');
  const ids = valueAfter(arguments_, '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  if (all === (ids.length > 0)) throw new Error('Choose exactly one of --all or --ids');
  const planVariant = valueAfter(arguments_, '--plan-variant');
  if (planVariant !== undefined && !['frozen', 'latent', 'migration'].includes(planVariant)) {
    throw new Error('--plan-variant must be one of frozen, latent, migration');
  }
  return {
    all,
    ids,
    recoverStaleLock: values.has('--recover-stale-lock'),
    ...(planVariant === undefined ? {} : { planVariant }),
    allowUnreviewedReferences: values.has('--allow-unreviewed-references'),
    rights: {
      ...(valueAfter(arguments_, '--rights-basis') ? { rightsBasis: valueAfter(arguments_, '--rights-basis') } : {}),
      ...(valueAfter(arguments_, '--rights-source-url') ? { sourceUrl: valueAfter(arguments_, '--rights-source-url') } : {}),
    },
  };
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
