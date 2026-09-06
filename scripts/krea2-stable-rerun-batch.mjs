#!/usr/bin/env node
/**
 * Reproducible, staging-only Krea2 batch coordinator.
 *
 * It never promotes or rewrites formal assets. Production is opt-in with
 * --execute; audit is explicit per batch so an interrupted run can resume
 * without pretending that unrelated historical receipts are new evidence.
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve } from 'node:path';
import { spawn } from 'node:child_process';

const projectRoot = resolve(import.meta.dirname, '..');
const stagingRoot = resolve(projectRoot, 'staging/media/krea2-canonical-restyle');
const batches = {
  characters: { root: resolve(stagingRoot, 'characters'), group: 'characters', ids: ['callisto', 'dante', 'faust', 'ren', 'vergilius'] },
  backgrounds: { root: resolve(stagingRoot, 'backgrounds'), group: 'backgrounds', ids: ['bg-lce-lab', 'bg-ring-corridor'] },
  cg: { root: resolve(stagingRoot, 'cg'), group: 'cg', ids: ['cg-9-14-s908', 'cg-9-14-s914', 'cg-9-18-s909-1', 'cg-9-18-s909-2', 'cg-9-18-s918', 'cg-9-37-s937', 'cg-9-43-s929-1', 'cg-9-43-s929-2', 'cg-9-43-s930-1', 'cg-9-43-s930-2', 'cg-9-43-s943-1', 'cg-9-43-s943-2'] },
};

async function exists(path) { try { await stat(path); return true; } catch { return false; } }
async function receiptFor(root, id) {
  const prefix = `restyle_${id.replaceAll('-', '_')}`;
  const names = await readdir(root).catch(() => []);
  const name = names.find((candidate) => candidate === `${prefix}.receipt.json`);
  return name ? resolve(root, name) : null;
}
async function statusOf(root, id) {
  const receiptPath = await receiptFor(root, id);
  if (!receiptPath) return { id, status: 'missing', receiptPath: null };
  try {
    const receipt = JSON.parse(await readFile(receiptPath, 'utf8'));
    return { id, status: receipt.status ?? 'unknown', receiptPath, serialization: receipt.workflow?.serialization ?? 'legacy', output: receipt.output?.finalPath ?? receipt.output?.path ?? null };
  } catch (error) { return { id, status: 'invalid-receipt', receiptPath, error: error.message }; }
}
async function listBatch(name) {
  const batch = batches[name];
  if (!batch) throw new Error(`Unknown batch: ${name}`);
  return { name, root: batch.root, entries: await Promise.all(batch.ids.map((id) => statusOf(batch.root, id))) };
}
function runNode(args) {
  return new Promise((resolvePromise, reject) => {
    const child = spawn(process.execPath, args, { cwd: projectRoot, stdio: 'inherit', windowsHide: true });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolvePromise() : reject(new Error(`command exited with ${code}`)));
  });
}
function parse(argv) {
  const options = { batch: 'characters', execute: false, audit: false, limit: Infinity };
  for (const raw of argv) {
    const [key, value] = raw.startsWith('--') ? raw.slice(2).split('=') : [raw, undefined];
    if (key === 'batch') options.batch = String(value);
    else if (key === 'execute') options.execute = true;
    else if (key === 'audit') options.audit = true;
    else if (key === 'limit') options.limit = Number.parseInt(value, 10);
    else if (key === 'list') options.list = true;
    else throw new Error(`Unknown option: --${key}`);
  }
  return options;
}

const options = parse(process.argv.slice(2));
const selected = batches[options.batch];
if (!selected) throw new Error(`Unknown batch: ${options.batch}`);
// Keep the historical group selector explicit in the staging contract, even
// though this retired coordinator refuses to enqueue the old topology.
const selectedGroupArg = `--group=${selected.group}`;
const before = await listBatch(options.batch);
if (options.list || (!options.execute && !options.audit)) {
  console.log(JSON.stringify(before, null, 2));
} else if (options.execute) {
  throw new Error('Stable rerun is retired: its canonical-latent near-copy topology is blocked. Use a reviewed replacement pilot before enqueueing GPU work.');
}
if (options.audit) {
  const after = await listBatch(options.batch);
  console.log(JSON.stringify({ batch: options.batch, before, after }, null, 2));
  const report = resolve(projectRoot, `staging/media/krea2-audit/${options.batch}-stable-rerun-v1.json`);
  await runNode(['scripts/audit-krea2-evidence.mjs', `--receipt-root=${selected.root}`, `--report=${report}`, '--no-comfy-probe']);
}
