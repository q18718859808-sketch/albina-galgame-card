import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { runVisualBatch } from './lib/visual-production.mjs';

// 运行时凭证注入：存在 .env.local（gitignore 内，不提交）则读取注入 process.env。
// 真实环境变量始终优先，文件值只补缺，便于 MCP/CI 覆盖；解析失败 fail-closed。
loadLocalEnvFile(join(dirname(fileURLToPath(import.meta.url)), '../.env.local'));

// main-guard：直接执行 CLI 才运行批次；被 import 时（如单测）不得触发任何真实生产动作。
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
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
}

function parseArguments(arguments_) {
  const values = new Set(arguments_);
  const mode = values.has('--all') ? 'all' : 'pilot';
  const ids = valueAfter(arguments_, '--ids')?.split(',').map((value) => value.trim()).filter(Boolean) ?? [];
  const interval = Number(valueAfter(arguments_, '--interval-ms') ?? (mode === 'all' ? 17_000 : 1_000));
  if (!Number.isInteger(interval) || interval < 0) throw new Error('--interval-ms must be a non-negative integer');
  const regenerate = values.has('--regenerate');
  if (regenerate && ids.length === 0) throw new Error('--regenerate requires an explicit --ids list');
  const planVariant = valueAfter(arguments_, '--plan-variant') ?? 'frozen';
  if (!['frozen', 'latent', 'migration'].includes(planVariant)) throw new Error('--plan-variant must be frozen, latent, or migration');
  return {
    mode,
    ids,
    intervalMs: interval,
    regenerate,
    planVariant,
    recoverStaleLock: values.has('--recover-stale-lock'),
    skipPilotGate: values.has('--skip-pilot-gate'),
    allowUnreviewedReferences: values.has('--allow-unreviewed-references'),
  };
}

function valueAfter(arguments_, name) {
  const index = arguments_.indexOf(name);
  if (index === -1) return undefined;
  const value = arguments_[index + 1];
  if (!value || value.startsWith('--')) throw new Error(`${name} requires a value`);
  return value;
}

export function parseLocalEnvFile(text) {
  const entries = [];
  for (const [index, rawLine] of (text ?? '').split(/\r?\n/u).entries()) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const separator = line.indexOf('=');
    if (separator <= 0) throw new Error(`.env.local line ${index + 1}: expected KEY=VALUE`);
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (!/^[A-Z][A-Z0-9_]*$/u.test(key)) throw new Error(`.env.local line ${index + 1}: invalid key name`);
    if (value.length === 0) throw new Error(`.env.local line ${index + 1}: empty value`);
    if (value.startsWith('"') !== value.endsWith('"') || value.startsWith("'") !== value.endsWith("'")) {
      throw new Error(`.env.local line ${index + 1}: unbalanced quotes`);
    }
    const unquoted = (value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))
      ? value.slice(1, -1)
      : value;
    entries.push([key, unquoted]);
  }
  return entries;
}

function loadLocalEnvFile(path) {
  if (!existsSync(path)) return;
  for (const [key, value] of parseLocalEnvFile(readFileSync(path, 'utf8'))) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}
