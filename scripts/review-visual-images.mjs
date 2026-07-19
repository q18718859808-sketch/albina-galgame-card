import { reviewVisualArtifacts } from './lib/visual-production.mjs';

const options = parseArguments(process.argv.slice(2));
const results = await reviewVisualArtifacts(options);
for (const result of results) console.log(`${result.status}: ${result.id}`);

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const approved = values.has('--approve');
  const rejected = values.has('--reject');
  if (approved === rejected) throw new Error('Choose exactly one of --approve or --reject');
  const ids = requiredValue(arguments_, '--ids').split(',').map((value) => value.trim()).filter(Boolean);
  const reviewer = requiredValue(arguments_, '--reviewer');
  const notes = valueAfter(arguments_, '--notes');
  return { ids, reviewer, notes, decision: approved ? 'approved' : 'rejected', recoverStaleLock: values.has('--recover-stale-lock') };
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
