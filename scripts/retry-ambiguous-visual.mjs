import { existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { executeAmbiguousRetry, retryAmbiguousVisual } from './lib/visual-production.mjs';
import { parseLocalEnvFile } from './produce-visual-images.mjs';

// 与 produce-visual-images.mjs 相同的运行时凭证注入：.env.local 只补缺，真实环境变量优先。
for (const [key, value] of existsSync(join(dirname(fileURLToPath(import.meta.url)), '../.env.local'))
  ? parseLocalEnvFile(readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../.env.local'), 'utf8'))
  : []) {
  if (process.env[key] === undefined) process.env[key] = value;
}

const options = parseArguments(process.argv.slice(2));
const result = await (options.execute ? executeAmbiguousRetry(options) : retryAmbiguousVisual(options));
console.log(`${result.status}: ${result.id}${result.error ? ` (${result.error})` : ''}`);
if (result.status === 'authorized') console.log(`authorization: ${result.authorizationPath}`);
else if (result.status === 'ambiguous') process.exitCode = 2;
else if (result.status === 'failed' || result.status === 'needs-review') process.exitCode = 1;
else if (result.status === 'awaiting-review') process.exitCode = 3;

function parseArguments(arguments_) {
  const valueOptions = new Set([
    '--id', '--operator', '--reason', '--expected-attempt', '--expected-request-key', '--expected-source-job-hash',
    '--expected-current-contract-sha256', '--expected-final-prompt-sha256', '--plan-variant',
  ]);
  const repeatableValueOptions = new Set(['--expected-reference']);
  const flagOptions = new Set([
    '--acknowledge-possible-duplicate-charge', '--recover-stale-lock', '--expect-no-reference-inputs', '--execute',
    '--allow-unreviewed-references',
  ]);
  const values = new Map();
  for (let index = 0; index < arguments_.length; index += 1) {
    const argument = arguments_[index];
    if (!argument.startsWith('--')) throw new Error(`Unexpected ambiguous retry argument: ${argument}`);
    if (!valueOptions.has(argument) && !repeatableValueOptions.has(argument) && !flagOptions.has(argument)) {
      throw new Error('Ambiguous retry accepts exactly one --id and cannot use batch, regeneration, or unsupported flags');
    }
    if (values.has(argument) && !repeatableValueOptions.has(argument)) {
      throw new Error(`Ambiguous retry option may be provided only once: ${argument}`);
    }
    if (valueOptions.has(argument) || repeatableValueOptions.has(argument)) {
      const value = arguments_[index + 1];
      if (!value || value.startsWith('--')) throw new Error(`${argument} requires a value`);
      if (repeatableValueOptions.has(argument)) values.set(argument, [...(values.get(argument) ?? []), parseExpectedReference(value)]);
      else values.set(argument, value);
      index += 1;
    } else values.set(argument, true);
  }
  const valueAfter = (name) => {
    const value = values.get(name);
    if (typeof value !== 'string') throw new Error(`${name} is required`);
    return value;
  };
  const id = valueAfter('--id');
  if (id.includes(',')) throw new Error('Ambiguous retry accepts exactly one --id');
  const expectedAttempt = Number(valueAfter('--expected-attempt'));
  if (!Number.isInteger(expectedAttempt) || expectedAttempt < 1) throw new Error('--expected-attempt must be a positive integer');
  if (values.get('--acknowledge-possible-duplicate-charge') !== true) throw new Error('--acknowledge-possible-duplicate-charge is required');
  const expectedCurrentContractSha256 = values.get('--expected-current-contract-sha256');
  const expectedFinalPromptSha256 = values.get('--expected-final-prompt-sha256');
  const planVariant = values.get('--plan-variant');
  if (planVariant !== undefined && !['frozen', 'latent', 'migration'].includes(planVariant)) {
    throw new Error('--plan-variant must be one of frozen, latent, migration');
  }
  const expectsNoReferenceInputs = values.get('--expect-no-reference-inputs') === true;
  if (expectsNoReferenceInputs && values.has('--expected-reference')) {
    throw new Error('--expect-no-reference-inputs cannot be combined with --expected-reference');
  }
  const expectedReferenceInputs = expectsNoReferenceInputs ? [] : values.get('--expected-reference');
  return {
    id,
    operator: valueAfter('--operator'),
    reason: valueAfter('--reason'),
    expectedAttempt,
    expectedRequestKey: valueAfter('--expected-request-key'),
    expectedSourceJobHash: valueAfter('--expected-source-job-hash'),
    ...(expectedCurrentContractSha256 === undefined ? {} : { expectedCurrentContractSha256 }),
    ...(expectedFinalPromptSha256 === undefined ? {} : { expectedFinalPromptSha256 }),
    ...(expectedReferenceInputs === undefined ? {} : { expectedReferenceInputs }),
    ...(planVariant === undefined ? {} : { planVariant }),
    acknowledgePossibleDuplicateCharge: true,
    recoverStaleLock: values.get('--recover-stale-lock') === true,
    execute: values.get('--execute') === true,
    allowUnreviewedReferences: values.get('--allow-unreviewed-references') === true,
  };
}

function parseExpectedReference(value) {
  const separator = value.lastIndexOf(':');
  const jobId = value.slice(0, separator);
  const sha256 = value.slice(separator + 1);
  if (separator < 1 || !/^[a-f0-9]{64}$/u.test(sha256)) {
    throw new Error('--expected-reference must use jobId:sha256');
  }
  return { jobId, sha256 };
}
