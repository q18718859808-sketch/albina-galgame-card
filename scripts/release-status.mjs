import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { deriveReleaseStatus, summarizeReleaseArtifacts } from './lib/release-status.mjs';
import { runAudit as runKrea2EvidenceAudit } from './audit-krea2-evidence.mjs';

const projectRoot = resolve(import.meta.dirname, '..');
const statusPath = resolve(projectRoot, 'dist/albina-galgame-card/release-status.json');

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

async function runtimeMediaApis() {
  const paths = [
    resolve(projectRoot, 'src'),
    resolve(projectRoot, 'public'),
    resolve(projectRoot, 'dist/albina-galgame-card/source'),
  ];
  const { readdir } = await import('node:fs/promises');
  const files = [];
  async function collect(folder) {
    let entries;
    try { entries = await readdir(folder, { withFileTypes: true }); } catch { return; }
    for (const entry of entries) {
      const path = resolve(folder, entry.name);
      if (entry.isDirectory()) await collect(path);
      else if (/\.(?:js|mjs|ts|vue)$/u.test(entry.name)) files.push(path);
    }
  }
  for (const path of paths) await collect(path);
  const source = (await Promise.all(files.map((path) => readFile(path, 'utf8')))).join('\n');
  return /(?:(?:PIE|X666|OPENAI)_API_KEY|api\.pie-xian\.com|x666\.me|\/v1\/(?:images\/generations|videos?|audio\/speech))/iu.test(source);
}

export async function buildCurrentReleaseStatus() {
  const [packageJson, manifest, story, providerProbes, worldbookAudit] = await Promise.all([
    readJson(resolve(projectRoot, 'package.json')),
    readJson(resolve(projectRoot, 'content/asset-manifest-v2.json')),
    readJson(resolve(projectRoot, 'dist/albina-galgame-card/data/game-script-v2.json')),
    readJson(resolve(projectRoot, 'content/media-production/provider-probes-v1.json')).catch(() => ({})),
    readJson(resolve(projectRoot, 'content/worldbook/limbus-world-audit-v1.json')).catch(() => ({})),
  ]);
  const productionPlan = await readJson(resolve(projectRoot, 'content/media-production/visual-rebuild-migration-v1.json')).catch(() => ({}));
  // 台账是作业状态的唯一权威：plan 文件里的 status 是静态快照，不会随生产推进更新。
  const ledger = await readJson(resolve(projectRoot, 'staging/media/visual-v2/ledger.json')).catch(() => ({ jobs: {} }));
  if (productionPlan?.imageJobs && ledger?.jobs) {
    productionPlan.imageJobs = productionPlan.imageJobs.map((job) => ({
      ...job,
      status: ledger.jobs[job.id]?.status ?? job.status,
    }));
  }
  const [summary, krea2EvidenceAudit] = await Promise.all([
    summarizeReleaseArtifacts({ manifest, story, providerProbes, productionPlan, ledgerJobs: ledger?.jobs ?? {} }),
    runKrea2EvidenceAudit({ outputPath: null, skipComfyProbe: true }),
  ]);
  return deriveReleaseStatus({
    version: packageJson.version,
    runtimeMediaApis: await runtimeMediaApis(),
    ...summary,
    pendingMediaJobs: summary.pendingMediaJobs,
    worldbookAudit,
    krea2EvidenceAudit: krea2EvidenceAudit.report.shipped,
  });
}

function serialize(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

export async function writeOrCheckReleaseStatus({ write = false } = {}) {
  const expected = await buildCurrentReleaseStatus();
  let current;
  try { current = await readJson(statusPath); } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
  if (JSON.stringify(current) !== JSON.stringify(expected)) {
    if (!write) throw new Error('release-status.json is stale; run npm run release:status:write');
    await writeFile(statusPath, serialize(expected), 'utf8');
    console.log(`Wrote ${statusPath}`);
  } else console.log(`Release status verified: ${statusPath}`);
  return expected;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const args = new Set(process.argv.slice(2));
  const write = args.delete('--write');
  const print = args.delete('--print');
  if (args.size > 0) throw new Error(`Unknown arguments: ${[...args].join(', ')}`);
  const status = print && !write ? await buildCurrentReleaseStatus() : await writeOrCheckReleaseStatus({ write });
  if (print) console.log(JSON.stringify(status, null, 2));
}
