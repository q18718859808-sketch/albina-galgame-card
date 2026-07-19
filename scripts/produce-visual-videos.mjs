import { runVideoBatch } from './lib/video-production.mjs';

const options = parseArguments(process.argv.slice(2));
try {
  const results = await runVideoBatch(options);
  const summary = summarize(results);
  console.log(JSON.stringify(summary));
  for (const result of results) console.log(`${result.status}: ${result.id}${result.error ? ` (${result.error})` : ''}`);
  if (summary.ambiguous > 0) process.exitCode = 2;
  else if (summary.failed > 0 || summary.processingFailed > 0 || summary.contractChanged > 0) process.exitCode = 1;
  else if (summary.polling > 0 || summary.awaitingReview > 0) process.exitCode = 3;
} catch (error) {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
}

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const all = values.has('--all');
  const ids = valueAfter(arguments_, '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  if (all === (ids.length > 0)) throw new Error('Choose exactly one of --all or --ids');
  const maxPolls = integerAfter(arguments_, '--max-polls', 60);
  const pollIntervalMs = integerAfter(arguments_, '--poll-interval-ms', 10_000);
  const regenerate = values.has('--regenerate');
  if (regenerate && ids.length === 0) throw new Error('--regenerate requires explicit --ids');
  return { all, ids, maxPolls, pollIntervalMs, regenerate, recoverStaleLock: values.has('--recover-stale-lock') };
}

function summarize(results) {
  return {
    total: results.length,
    polling: results.filter((result) => result.status === 'polling').length,
    awaitingReview: results.filter((result) => result.status === 'awaiting-review').length,
    failed: results.filter((result) => result.status === 'failed').length,
    processingFailed: results.filter((result) => result.status === 'processing-failed').length,
    ambiguous: results.filter((result) => result.status === 'ambiguous').length,
    contractChanged: results.filter((result) => result.status === 'contract-changed').length,
  };
}

function integerAfter(arguments_, name, fallback) {
  const raw = valueAfter(arguments_, name);
  const value = raw === undefined ? fallback : Number(raw);
  if (!Number.isInteger(value) || value < 0) throw new Error(`${name} must be a non-negative integer`);
  return value;
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}
