import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import {
  buildSillyTavernInstallPlan,
  probeSillyTavern,
} from './lib/sillytavern-host.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const options = parseArgs(process.argv.slice(2));
const plan = buildSillyTavernInstallPlan({
  projectRoot,
  base: options.base,
  dataRoot: options.dataRoot,
});
const host = await probeSillyTavern(plan.base, { timeoutMs: options.timeoutMs });
const result = {
  schema: 'albina-sillytavern-host-verifier-v1',
  checkedAt: new Date().toISOString(),
  host,
  install: plan,
  verdict: host.status === 'api-ready' ? 'api-ready-runtime-ui-unverified' : 'host-unavailable',
};

const output = `${JSON.stringify(result, null, 2)}\n`;
if (options.output) await writeFile(resolve(options.output), output, 'utf8');
process.stdout.write(output);
if (host.status !== 'api-ready') process.exitCode = 1;

function parseArgs(argv) {
  const value = (flag, fallback) => {
    const index = argv.indexOf(flag);
    return index >= 0 ? argv[index + 1] ?? fallback : fallback;
  };
  const timeoutMs = Number(value('--timeout-ms', '3000'));
  if (!Number.isInteger(timeoutMs) || timeoutMs < 100 || timeoutMs > 30_000) throw new Error('Invalid --timeout-ms.');
  return {
    base: value('--base', undefined),
    dataRoot: value('--data-root', undefined),
    output: value('--output', undefined),
    timeoutMs,
  };
}
