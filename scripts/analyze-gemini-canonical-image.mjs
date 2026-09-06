import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

import { analyzeCanonicalImage } from './lib/gemini-visual-review.mjs';

const args = process.argv.slice(2);
const imagePath = required('--image');
const outputPath = resolve(required('--out'));
const result = await analyzeCanonicalImage({
  imagePath,
  gateway: optional('--gateway'),
  model: optional('--model'),
});
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, 'utf8');
console.log(`canonical analysis written: ${outputPath}`);

function required(name) {
  const value = optional(name);
  if (!value) throw new Error(`${name} requires a value`);
  return value;
}

function optional(name) {
  const index = args.indexOf(name);
  const value = index < 0 ? undefined : args[index + 1];
  return value?.startsWith('--') ? undefined : value;
}
