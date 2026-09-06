#!/usr/bin/env node
/**
 * Build the historical audit context for the WisArt style migration.
 * The project owner explicitly disabled human authorization. This script keeps
 * the legacy output path for archive compatibility but it is not a production gate.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { hash, migrationContentSha256 } from './lib/visual-production.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'media-production');
const STAGING = path.join(ROOT, 'staging', 'media', 'visual-v2');
const PLAN_PATH = path.join(CONTENT, 'visual-rebuild-migration-v1.json');
const PROMPTS_PATH = path.join(CONTENT, 'visual-prompts-migration-v1.json');
const SOURCES_PATH = path.join(CONTENT, 'canon-visual-sources-migration-v1.json');
const CLAIMS_PATH = path.join(ROOT, 'content', 'canon-claims-v1.json');
const OUT_TEMPLATE = path.join(CONTENT, 'wisart-migration-authorization-template-v1.json');
const OUT_SHEET = path.join(STAGING, 'wisart-migration-review-v1.md');

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function fail(message) { process.stderr.write(`ERROR: ${message}\n`); process.exit(1); }

const plan = readJson(PLAN_PATH);
const prompts = readJson(PROMPTS_PATH);
const sources = readJson(SOURCES_PATH);
const claims = readJson(CLAIMS_PATH);
const jobs = plan.imageJobs ?? [];
const promptById = new Map((prompts.prompts ?? []).map((entry) => [entry.jobId, entry]));
const board = sources.assets?.find((entry) => entry.id === 'reference.user.albina-style-board');

if (plan.version !== '2.3.0-migration-v2' || jobs.length !== 67) fail('migration plan must contain 67 jobs');
if (prompts.promptVersion !== 'albina-visual-migration-v1' || prompts.prompts?.length !== 67) fail('migration prompt freeze must contain 67 prompts');
if (!board || board.sha256 !== plan.policy?.styleMigrationAuthorization?.styleBoardSha256) fail('migration board hash is not bound consistently');
const authorizationPolicy = plan.policy?.styleMigrationAuthorization;
if (!authorizationPolicy || authorizationPolicy.required !== false
  || authorizationPolicy.humanWisartAuthorizationRequired !== false
  || authorizationPolicy.humanBoardReviewRequired !== false) {
  fail('migration plan must explicitly disable human authorization');
}
for (const job of jobs) {
  const prompt = promptById.get(job.id);
  if (!prompt) fail(`missing migration prompt: ${job.id}`);
  if (prompt.referenceSourceIds?.at(-1) !== board.id || prompt.styleReferenceMode !== 'deidentified-image-last') {
    fail(`migration prompt must end with the style board: ${job.id}`);
  }
}

const characterIds = jobs.filter((job) => job.category === 'characters').map((job) => job.id).sort();
const backgroundIds = jobs.filter((job) => job.category === 'bg').map((job) => job.id).sort();
const cgIds = jobs.filter((job) => job.category === 'cg').map((job) => job.id).sort();
const contentSha = migrationContentSha256(plan, prompts, sources, claims);
const template = {
  schemaVersion: 1,
  id: 'wisart-migration-authorization-template-v1',
  status: 'not-required',
  reviewer: null,
  reviewedAt: null,
  requiresHumanWisartAuthorization: false,
  requiresHumanBoardReview: false,
  planVariantVersion: plan.version,
  promptFreezeVersion: prompts.promptVersion,
  sourceIndexVersion: sources.id,
  migrationContentSha256: contentSha,
  styleBoardSha256: board.sha256,
  instructions: [
    '本文件是自动校验上下文，不是生产授权文件；运行时不读取任何人工授权文件。',
    '候选 macro-crop 风格板仅提供线条、上色、材质边缘和冷光语言；角色身份、姿态、解剖、服装、道具和构图仍由各作业既有输入约束。',
    'migrationContentSha256 与 styleBoardSha256 绑定当前冻结输入；任一输入重建或替换时自动校验会检测不匹配。',
    '本迁移仅生成本地私人二创资产；发布、分发和 rights 状态仍由独立发布链路控制。',
  ],
  reviews: [
    {
      scope: 'board',
      decision: 'not-required',
      notes: '人工审查不作为生产前置条件；保留候选板与哈希绑定上下文。',
      jobIds: [],
      context: { sourceId: board.id, localPath: board.localPath, sha256: board.sha256, bytes: board.bytes, width: board.width, height: board.height },
    },
    {
      scope: 'characterJobs',
      decision: 'not-required',
      notes: '人工审查不作为生产前置条件；保留 27 项角色作业范围与输入约束。',
      jobIds: characterIds,
      context: { count: characterIds.length, rule: '确认全量角色身份不被风格板替换，且风格板只影响线条、上色、材质边缘与冷光。' },
    },
    {
      scope: 'backgroundJobs',
      decision: 'not-required',
      notes: '人工审查不作为生产前置条件；保留 12 项背景作业范围与输入约束。',
      jobIds: backgroundIds,
      context: { count: backgroundIds.length, rule: '确认场景构图与叙事来源不被风格板中的局部构图复制。' },
    },
    {
      scope: 'cgJobs',
      decision: 'not-required',
      notes: '人工审查不作为生产前置条件；v2 起把 28 项 CG（含自 Latent 迁回的 22 项）纳入同一自动校验范围。',
      jobIds: cgIds,
      context: { count: cgIds.length, rule: '确认 CG 场景中的义体身份锚点（白色全身义体、黑白异色瞳、线缆束马尾）不被风格板或泛型化渲染替换。' },
    },
  ],
};

fs.writeFileSync(OUT_TEMPLATE, `${JSON.stringify(template, null, 2)}\n`, 'utf8');
fs.mkdirSync(STAGING, { recursive: true });
const lines = [
  '# WisArt 画风迁移自动校验上下文',
  '',
  `- plan: \`${plan.version}\``,
  `- prompt freeze: \`${prompts.promptVersion}\``,
  `- source index: \`${sources.id}\``,
  `- migrationContentSha256: \`${contentSha}\``,
  `- styleBoardSha256: \`${board.sha256}\``,
  '',
  '## 自动校验约束',
  '',
  '1. 候选板作为最后一个图像输入，只提供线条密度、平涂/厚涂比例、材质边缘、工业冷光与受限配色。',
  '2. 角色身份、姿态、解剖、服装、武器、道具与构图由作业自身 prompt 与既有输入约束，不从候选板复制。',
  '3. migrationContentSha256、styleBoardSha256、来源索引和 prompt freeze 会在加载生产输入时自动校验。',
  '4. 人工授权与人工审查不是本地私人二创生产的前置条件；发布与 rights 仍由独立链路控制。',
  '',
  '本文件仅供查看当前作业、风格板与哈希绑定；无需填写、签署或另存。',
  '',
  '---',
  '',
];
for (const [index, job] of jobs.entries()) {
  const prompt = promptById.get(job.id);
  lines.push(
    `## ${index + 1}. \`${job.id}\``,
    '',
    `- category: \`${job.category}\` · assetId: \`${job.assetId}\``,
    `- identitySubjects: ${(job.identitySubjects ?? []).map((id) => `\`${id}\``).join(', ') || '（无）'}`,
    `- style input: \`${prompt.referenceSourceIds?.at(-1)}\` · mode: \`${prompt.styleReferenceMode}\``,
    `- source inputs: ${(prompt.referenceSourceIds ?? []).map((id) => `\`${id}\``).join(', ')}`,
    '',
    '<details><summary>positive prompt 正文</summary>',
    '',
    '```text',
    prompt.positivePrompt,
    '```',
    '',
    '</details>',
    '',
    '人工授权：不需要（仅展示自动校验上下文）',
    '',
    '---',
    '',
  );
}
fs.writeFileSync(OUT_SHEET, lines.join('\n'), 'utf8');
process.stdout.write([
  `wrote ${path.relative(ROOT, OUT_TEMPLATE)} (not required, 4 audit scopes)`,
  `wrote ${path.relative(ROOT, OUT_SHEET)} (67 job automatic validation contexts)`,
  `migrationContentSha256=${contentSha}`,
  `styleBoardSha256=${board.sha256}`,
  'human authorization: not required',
  '',
].join('\n'));
