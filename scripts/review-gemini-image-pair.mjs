import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { reviewImagePair } from './lib/gemini-visual-review.mjs';

const args = process.argv.slice(2);
const referencePath = required('--reference');
const candidatePath = required('--candidate');
const out = required('--out');
const result = await reviewImagePair({
  referencePath,
  candidatePath,
  gateway: after('--gateway'),
  model: after('--model'),
  prompt: after('--prompt'),
});
const output = resolve(out);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(`external review written: ${output}`);

function required(name) {
  const value = after(name);
  if (!value) throw new Error(`${name} requires a value`);
  return value;
}

function after(name) {
  const index = args.indexOf(name);
  const value = index < 0 ? undefined : args[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
