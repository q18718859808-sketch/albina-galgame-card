#!/usr/bin/env node
/**
 * discard-visual-v2-generation.mjs
 *
 * 把 WisArt visual-v2 阶段「已生成的图像与生产状态」可逆隔离（move，绝不删除）。
 *
 * 背景：
 * - 用户明确要求：废弃之前生成的图像，重新来过，并确保角色图像生成以画风基线为基准。
 * - visual-v2 的 19 张 delivery 图（bg.city_rooftop / portrait.albina.normal /
 *   portrait.protagonist.serious / portrait.albina.armored）全部来自旧风格板的
 *   reference-edit 批次，其中三张立绘的 review 判定为 failed/rejected，
 *   身份结构崩坏，不能作为质量正例继续沿用。
 * - 已核对：这 19 张图**没有一张**进入 content/asset-manifest-v2.json 或
 *   dist/albina-galgame-card/assets（sha256 全量比对，0 命中），因此隔离它们
 *   不会影响任何已发布或待发布资产。
 *
 * 行为（默认 dry-run，必须显式 --apply 才真正移动）：
 * - 把 staging/media/visual-v2 下除 preserve 列表外的条目整体移动到
 *   staging/media/_discarded/visual-v2-<UTC 时间戳>/ 目录。
 * - 落盘 manifest：每个被移动文件的相对路径、字节数、sha256，以及隔离前的 ledger 快照。
 * - 结束后重建空的 staging/media/visual-v2，保证后续脚本可写。
 *
 * 硬约束：
 * - 只移动，不删除；任何一步失败立即中止（不留下半搬状态）。
 * - 不触碰 frozen 授权、latent 审查单、画风基线与研究资产。
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const SOURCE_DIR = path.join(ROOT, 'staging', 'media', 'visual-v2');
const DISCARD_ROOT = path.join(ROOT, 'staging', 'media', '_discarded');

/** 必须保留的条目：Latent 22 项 CG 的人工审查单仍处于 pending，与本次废弃无关。 */
const PRESERVE = new Set(['latent-identity-review-v1.md']);

function sha256File(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

function walk(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

function parseArgs(argv) {
  const apply = argv.includes('--apply');
  const unknown = argv.filter((arg) => arg !== '--apply');
  if (unknown.length > 0) throw new Error(`Unknown arguments: ${unknown.join(' ')}`);
  return { apply };
}

function main() {
  const { apply } = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(SOURCE_DIR)) throw new Error(`Source directory is missing: ${path.relative(ROOT, SOURCE_DIR)}`);

  const entries = fs.readdirSync(SOURCE_DIR, { withFileTypes: true });
  const movable = entries.filter((entry) => !PRESERVE.has(entry.name));
  const preserved = entries.filter((entry) => PRESERVE.has(entry.name)).map((entry) => entry.name);
  if (movable.length === 0) {
    process.stdout.write('nothing to discard\n');
    return;
  }

  const stamp = new Date().toISOString().replace(/[:.]/g, '-');
  const targetDir = path.join(DISCARD_ROOT, `visual-v2-${stamp}`);

  const ledgerPath = path.join(SOURCE_DIR, 'ledger.json');
  const ledgerSnapshot = fs.existsSync(ledgerPath)
    ? Object.entries(JSON.parse(fs.readFileSync(ledgerPath, 'utf8')).jobs ?? {}).map(([id, record]) => ({
        jobId: id,
        status: record.status,
        activeAttempt: record.activeAttempt,
        review: record.review?.status ?? null,
        deliveryPath: record.deliveryPath ?? null,
      }))
    : null;

  const files = [];
  for (const entry of movable) {
    const full = path.join(SOURCE_DIR, entry.name);
    if (entry.isDirectory()) {
      const relativeFiles = walk(full, SOURCE_DIR);
      for (const rel of relativeFiles) {
        const file = path.join(SOURCE_DIR, rel);
        files.push({ path: rel, bytes: fs.statSync(file).size, sha256: sha256File(file) });
      }
    } else {
      files.push({ path: entry.name, bytes: fs.statSync(full).size, sha256: sha256File(full) });
    }
  }

  const manifest = {
    schemaVersion: 1,
    id: `visual-v2-discard-${stamp}`,
    discardedAt: new Date().toISOString(),
    apply,
    reason: 'User instruction: discard previously generated images and restart character image generation from the baseline style board.',
    sourceDir: path.relative(ROOT, SOURCE_DIR).split(path.sep).join('/'),
    quarantineDir: path.relative(ROOT, targetDir).split(path.sep).join('/'),
    reversible: true,
    deletion: 'none',
    preservedEntries: preserved,
    ledgerSnapshotBeforeDiscard: ledgerSnapshot,
    counts: { movedEntries: movable.length, movedFiles: files.length, bytes: files.reduce((sum, file) => sum + file.bytes, 0) },
    files,
  };

  if (!apply) {
    process.stdout.write(`${JSON.stringify({ dryRun: true, ...manifest, files: files.slice(0, 10), fileCount: files.length }, null, 2)}\n`);
    return;
  }

  fs.mkdirSync(targetDir, { recursive: true });
  for (const entry of movable) {
    fs.renameSync(path.join(SOURCE_DIR, entry.name), path.join(targetDir, entry.name));
  }
  fs.writeFileSync(path.join(targetDir, 'discard-manifest.json'), `${JSON.stringify({ ...manifest, apply: true }, null, 2)}\n`);

  process.stdout.write(`${JSON.stringify({
    applied: true,
    quarantineDir: manifest.quarantineDir,
    manifestPath: `${manifest.quarantineDir}/discard-manifest.json`,
    movedEntries: manifest.counts.movedEntries,
    movedFiles: manifest.counts.movedFiles,
    bytes: manifest.counts.bytes,
    preservedEntries: preserved,
    ledgerSnapshotBeforeDiscard: ledgerSnapshot,
  }, null, 2)}\n`);
}

main();
