import { execFile } from 'node:child_process';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const projectRoot = resolve(import.meta.dirname, '..');
const execute = promisify(execFile);

export const RELEASE_STEPS = Object.freeze([
  { id: 'canon:sync', path: 'scripts/sync-canon-card.mjs', args: ['--write'] },
  { id: 'card:sync', path: 'scripts/sync-character-card-png.mjs', args: ['--write'] },
  { id: 'assets:generate', path: 'scripts/audit-assets.mjs', args: ['--write'] },
  { id: 'story:compile', path: 'node_modules/vite-node/vite-node.mjs', args: ['scripts/compile-story.mjs'] },
  { id: 'source:build', path: 'node_modules/vite/bin/vite.js', args: ['build'] },
  { id: 'release:promote', path: 'scripts/build-release.mjs', args: [] },
  { id: 'assets:audit', path: 'scripts/audit-assets.mjs', args: [] },
]);

async function runStep(step) {
  const arguments_ = step.args.map((argument) => argument.startsWith('scripts/') ? resolve(projectRoot, argument) : argument);
  const result = await execute(process.execPath, [resolve(projectRoot, step.path), ...arguments_], {
    cwd: projectRoot,
    maxBuffer: 16 * 1024 * 1024,
  });
  if (result.stdout) process.stdout.write(result.stdout);
  if (result.stderr) process.stderr.write(result.stderr);
}

export async function runReleasePipeline(runner = runStep) {
  for (const step of RELEASE_STEPS) await runner(step);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await runReleasePipeline();
