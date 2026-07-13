import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { syncCharacterCardPng } from './lib/character-card-png.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const jsonPath = resolve(projectRoot, 'card/albina.card.json');
const pngPath = resolve(projectRoot, 'card/albina.card.png');
const arguments_ = new Set(process.argv.slice(2));
const writeMode = arguments_.delete('--write');

if (arguments_.size > 0) throw new Error(`Unknown arguments: ${[...arguments_].join(', ')}`);

const [source, png] = await Promise.all([readFile(jsonPath, 'utf8'), readFile(pngPath)]);
const card = JSON.parse(source);
const synchronized = syncCharacterCardPng(png, card);

if (synchronized.equals(png)) {
  console.log('Character card PNG metadata is synchronized.');
} else if (writeMode) {
  await writeFile(pngPath, synchronized);
  console.log('Synchronized character card PNG metadata.');
} else {
  console.error('Character card PNG metadata differs from card/albina.card.json. Run npm run card:sync.');
  process.exitCode = 1;
}
