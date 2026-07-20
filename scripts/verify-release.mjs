import { createHash } from 'node:crypto';
import { readFile, readdir } from 'node:fs/promises';
import { relative, resolve } from 'node:path';

const root = process.cwd();
const canonical = resolve(root, 'dist/albina-galgame-card');
const mirror = resolve(root, 'release/github-cdn-root/dist/albina-galgame-card');
const card = resolve(root, 'card');
const mirroredCard = resolve(root, 'release/github-cdn-root/card');
const hash = (bytes) => createHash('sha256').update(bytes).digest('hex');
async function walk(folder) { const result = []; for (const entry of await readdir(folder, { withFileTypes: true })) { const path = resolve(folder, entry.name); if (entry.isDirectory()) result.push(...await walk(path)); else result.push(path); } return result; }
async function map(folder) { return new Map(await Promise.all((await walk(folder)).map(async (path) => [relative(folder, path).replaceAll('\\', '/'), hash(await readFile(path))]))); }
const [distFiles, mirroredDistFiles, cardFiles, mirroredCardFiles] = await Promise.all([
  map(canonical),
  map(mirror),
  map(card),
  map(mirroredCard),
]);
const publishedCardFiles = new Set(['albina.card.json', 'albina.card.png']);
const left = new Map([
  ...[...distFiles].map(([path, digest]) => [`dist/${path}`, digest]),
  ...[...cardFiles].filter(([path]) => publishedCardFiles.has(path)).map(([path, digest]) => [`card/${path}`, digest]),
]);
const right = new Map([
  ...[...mirroredDistFiles].map(([path, digest]) => [`dist/${path}`, digest]),
  ...[...mirroredCardFiles].map(([path, digest]) => [`card/${path}`, digest]),
]);
const mismatches = [...new Set([...left.keys(), ...right.keys()])].filter((path) => left.get(path) !== right.get(path));
if (mismatches.length) { console.error(`Release mirror differs: ${mismatches.slice(0, 20).join(', ')}`); process.exitCode = 1; }
else console.log(`Release mirror verified: ${left.size} files.`);
