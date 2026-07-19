import { promoteVideoArtifacts } from './lib/video-production.mjs';

try {
  const results = await promoteVideoArtifacts(parseArguments(process.argv.slice(2)));
  for (const result of results) console.log(`${result.status}: ${result.id} ${result.variant} -> ${result.assetId}`);
  console.log(JSON.stringify({ total: results.length, promoted: results.filter((result) => result.status === 'promoted').length, skipped: results.filter((result) => result.status === 'skipped').length }));
} catch (error) {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
}

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const all = values.has('--all');
  const ids = valueAfter(arguments_, '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  if (all === (ids.length > 0)) throw new Error('Choose exactly one of --all or --ids');
  return {
    all,
    ids,
    recoverStaleLock: values.has('--recover-stale-lock'),
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
