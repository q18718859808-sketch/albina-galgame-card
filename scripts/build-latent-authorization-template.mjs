#!/usr/bin/env node
/**
 * build-latent-authorization-template.mjs
 *
 * 为 Latent 22 项 text-generation prompt 产出历史审计参考工件。
 *
 * 该脚本保留旧文件名以避免破坏既有归档，但人工授权已全面取消：
 * - 产出的模板和审查单仅记录 prompt/job 哈希与输入事实，不是生产前置条件。
 * - 生产运行时不读取 latent-production-authorization-v1.json，也不要求人工签署。
 * - 若 freeze 被重建（prompt 或 latent job 集变化），哈希会更新，便于定位输入变化。
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { hash, latentJobSetSha256, latentPromptApprovalManifest } from './lib/visual-production.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'media-production');
const STAGING = path.join(ROOT, 'staging', 'media', 'visual-v2');

const PLAN_PATH = path.join(CONTENT, 'visual-rebuild-latent-v1.json');
const PROMPTS_PATH = path.join(CONTENT, 'latent-text-prompts-v1.json');
const OUT_TEMPLATE = path.join(CONTENT, 'latent-production-authorization-template-v1.json');
const OUT_SHEET = path.join(STAGING, 'latent-identity-review-v1.md');

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function fail(message) {
  process.stderr.write(`ERROR: ${message}\n`);
  process.exit(1);
}

const plan = readJson(PLAN_PATH);
const prompts = readJson(PROMPTS_PATH);

if (prompts.prompts?.length !== 22) fail(`latent prompt freeze must hold 22 prompts, found ${prompts.prompts?.length}`);
if (prompts.prompts.some((prompt) => prompt.category !== 'cg')) fail('latent prompt freeze must contain CG jobs only');
const latentJobs = (plan.imageJobs ?? []).filter((job) => job.provider === 'latent-moe');
if (latentJobs.length !== 22) fail(`latent plan variant must hold 22 latent jobs, found ${latentJobs.length}`);

const pending = plan.policy?.latentProductionAuthorization;
if (!pending || pending.required !== false || pending.humanIdentityApprovalRequired !== false) {
  fail('latent plan variant must explicitly disable human authorization');
}

const promptFreezeSha256 = hash(JSON.stringify(prompts));
const jobSetSha256 = latentJobSetSha256(plan);
const manifest = latentPromptApprovalManifest(prompts);
if (manifest.length !== 22) fail(`approval manifest must hold 22 entries, found ${manifest.length}`);

const promptById = new Map(prompts.prompts.map((entry) => [entry.jobId, entry]));
const jobById = new Map(latentJobs.map((job) => [job.id, job]));
for (const entry of manifest) {
  if (!promptById.has(entry.jobId)) fail(`approval manifest references an unknown prompt: ${entry.jobId}`);
  if (!jobById.has(entry.jobId)) fail(`approval manifest references a job absent from the latent plan: ${entry.jobId}`);
}

const template = {
  schemaVersion: 1,
  id: 'latent-production-authorization-template-v1',
  status: 'not-required',
  reviewer: null,
  reviewedAt: null,
  requiresHumanIdentityApproval: false,
  promptFreezeId: prompts.id ?? 'latent-text-prompts-v1',
  promptVersion: prompts.promptVersion ?? 'latent-text-v1',
  planVariantVersion: plan.version,
  promptFreezeSha256,
  latentJobSetSha256: jobSetSha256,
  instructions: [
    '本文件是历史审计参考，不是生产授权文件；生产运行时不读取任何人工授权文件。',
    'promptFreezeSha256 / latentJobSetSha256 与 promptSha256 绑定当前 freeze 内容，用于定位输入变化。',
    '身份覆盖、未覆盖角色声明、negative prompt 与 provider 合约仍由生成器和运行时自动校验。',
  ],
  approvals: manifest.map((entry) => {
    const prompt = promptById.get(entry.jobId);
    return {
      jobId: entry.jobId,
      promptSha256: entry.promptSha256,
      decision: 'not-required',
      notes: '人工授权已由项目所有者明确取消；此条目仅保留自动校验上下文。',
      reviewContext: {
        assetId: prompt.assetId,
        category: prompt.category,
        identityAnchor: prompt.identityAnchor ?? null,
        identitySubjects: jobById.get(entry.jobId)?.identitySubjects ?? [],
        cgIdentityCoverage: prompt.cgIdentityCoverage ?? null,
        delivery: prompt.delivery ?? null,
        promptChars: (prompt.latentRequest?.prompt ?? '').length,
      },
    };
  }),
};

fs.writeFileSync(OUT_TEMPLATE, `${JSON.stringify(template, null, 2)}\n`, 'utf8');

const lines = [
  '# Latent 22 项 CG prompt 人工内容审查单',
  '',
  `- promptFreeze: \`${template.promptFreezeId}\` (\`${template.promptVersion}\`)`,
  `- promptFreezeSha256: \`${promptFreezeSha256}\``,
  `- latentJobSetSha256: \`${jobSetSha256}\``,
  `- plan 变体: \`${plan.version}\``,
  '',
  '## 审查判据（每项都要过）',
  '',
  '1. 角色身份描述与权威设定一致（脸型/体型/发型/眼睛方向/义体分缝/服装结构/道具尺度）。',
  '2. 无在世艺术家风格模仿指令，无把已发布图片当参考的表述。',
  '3. 无色情化、无未成年化、无以血腥特写替代叙事。',
  '4. CG 中未被权威覆盖的角色（callisto/dante/faust/ren/vergilius）不得编造外观描述。',
  '5. AU/IF 原创部分标注清楚，不与 canon 混淆。',
  '6. 本审查单只覆盖 Latent 的 22 项 CG；角色立绘已改派 WisArt reference-edit，以接收去标识化风格板并迁移到画风基准。',
  '',
  '本文件仅用于查看当前 prompt/job 哈希与自动校验上下文，不需要人工填写或签署。',
  '',
  '---',
  '',
];

let index = 0;
for (const entry of manifest) {
  index += 1;
  const prompt = promptById.get(entry.jobId);
  const job = jobById.get(entry.jobId);
  lines.push(
    `## ${index}. \`${entry.jobId}\``,
    '',
    `- assetId: \`${prompt.assetId}\` · category: \`${prompt.category}\``,
    `- identityAnchor: \`${prompt.identityAnchor ?? 'none'}\``,
    `- identitySubjects: ${(job?.identitySubjects ?? []).map((id) => `\`${id}\``).join(', ') || '（无）'}`,
    `- generationSize: \`${prompt.generationSize}\` → delivery: \`${prompt.delivery?.width}x${prompt.delivery?.height}\` alpha=\`${prompt.delivery?.alpha}\` \`${prompt.delivery?.format}\``,
    `- promptSha256: \`${entry.promptSha256}\``,
    '',
    '<details><summary>positive prompt 正文</summary>',
    '',
    '```text',
    prompt.latentRequest?.prompt ?? '',
    '```',
    '',
    '</details>',
    '',
  );
  if (prompt.latentRequest?.negativePrompt) {
    lines.push('<details><summary>negative prompt</summary>', '', '```text', prompt.latentRequest.negativePrompt, '```', '', '</details>', '');
  }
  lines.push('人工授权：不需要（仅展示自动校验上下文）', '', '---', '');
}

fs.mkdirSync(STAGING, { recursive: true });
fs.writeFileSync(OUT_SHEET, `${lines.join('\n')}`, 'utf8');

process.stdout.write([
  `wrote ${path.relative(ROOT, OUT_TEMPLATE)} (22 not-required entries)`,
  `wrote ${path.relative(ROOT, OUT_SHEET)} (automatic validation context)`,
  `promptFreezeSha256=${promptFreezeSha256}`,
  `latentJobSetSha256=${jobSetSha256}`,
  'human authorization: not required',
  '',
].join('\n'));
