import { reviewVideoArtifacts } from './lib/video-production.mjs';

try {
  const results = await reviewVideoArtifacts(parseArguments(process.argv.slice(2)));
  for (const result of results) console.log(`${result.status}: ${result.id}`);
} catch (error) {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
}

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const approve = values.has('--approve');
  const reject = values.has('--reject');
  if (approve === reject) throw new Error('Choose exactly one of --approve or --reject');
  const ids = requiredValue(arguments_, '--ids').split(',').map((value) => value.trim()).filter(Boolean);
  return {
    ids,
    decision: approve ? 'approved' : 'rejected',
    reviewer: requiredValue(arguments_, '--reviewer'),
    notes: valueAfter(arguments_, '--notes'),
    recoverStaleLock: values.has('--recover-stale-lock'),
  };
}

function requiredValue(arguments_, name) {
  const value = valueAfter(arguments_, name);
  if (!value) throw new Error(`${name} requires a value`);
  return value;
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
