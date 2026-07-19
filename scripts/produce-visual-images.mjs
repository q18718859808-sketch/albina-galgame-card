import { runVisualBatch } from './lib/visual-production.mjs';

const options = parseArguments(process.argv.slice(2));
const summary = await runVisualBatch(options);
console.log(JSON.stringify({
  total: summary.total, completed: summary.completed, skipped: summary.skipped, failed: summary.failed,
  ambiguous: summary.ambiguous, needsReview: summary.needsReview, awaitingReview: summary.awaitingReview,
  blocked: summary.blocked, contractChanged: summary.contractChanged,
}));
for (const result of summary.results) console.log(`${result.status}: ${result.id}${result.error ? ` (${result.error})` : ''}`);
if (summary.ambiguous > 0) process.exitCode = 2;
else if (summary.failed > 0 || summary.needsReview > 0 || summary.contractChanged > 0) process.exitCode = 1;
else if (summary.awaitingReview > 0 || summary.blocked > 0) process.exitCode = 3;

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const mode = values.has('--all') ? 'all' : 'pilot';
  const ids = valueAfter(arguments_, '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  const interval = Number(valueAfter(arguments_, '--interval-ms') ?? (mode === 'all' ? 17_000 : 1_000));
  if (!Number.isInteger(interval) || interval < 0) throw new Error('--interval-ms must be a non-negative integer');
  const regenerate = values.has('--regenerate');
  if (regenerate && ids.length === 0) throw new Error('--regenerate requires an explicit --ids list');
  return { mode, ids, intervalMs: interval, regenerate, recoverStaleLock: values.has('--recover-stale-lock') };
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
