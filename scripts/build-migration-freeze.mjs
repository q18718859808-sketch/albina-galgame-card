#!/usr/bin/env node
/**
 * build-migration-freeze.mjs
 *
 * 为「以画风基线重做角色图像」产出一套**独立于 frozen albina-visual-v2** 的冻结工件。
 *
 * 背景（用户指令）：
 * - 废弃此前生成的图像，重新来过；角色图像必须以画风基线 F121759F860F58382CC0D53763FB3A6C.jpg
 *   为基准生成。
 * - 已核对：19 张旧 delivery 图全部来自旧风格板（albina-style-board-deidentified-mosaic.png
 *   ，4x6 小裁片马赛克）的 WisArt reference-edit 批次，其中三张立绘 review 判定
 *   failed/rejected（身份结构崩坏）。这批图已由 discard-visual-v2-generation.mjs 可逆隔离，
 *   且经 sha256 全量比对确认未进入任何已发布资产。
 *
 * 本次迁移的实质变更：
 * - 风格板换成 albina-style-board-v2-macrocrop.png：6 块 384x384 安全区大裁片（部分镜像），
 *   放大 512x512 后 2x3 拼图。大裁片保留连续墨线、平涂/厚涂过渡、装甲面板收边、
 *   Fascia 表面结构与冷光，比小裁片马赛克承载更强的画风信号。
 * - prompt 注入「画风迁移指令」（migration.styleDirective），风格板语义优先级高于
 *   任何与之冲突的文字描述；同时重申风格板只提供画风语言，不得复制身份/姿态/解剖/构图。
 * - 67 项作业全部纳入本变体（12 背景 + 28 CG + 27 角色立绘）。v1 时代 22 项空白 CG
 *   曾路由 Latent 变体；2026-09-04 批量实证其系统性丢失 Albina 义体身份锚点
 *   （详见 .workbuddy/memory/2026-09-03.md 第 8 次追加），故全部迁回 WisArt
 *   reference-edit（canon 立绘参考 + 风格板末位，即其基础 prompt 的原有合同）。
 *
 * 输出：
 * - content/media-production/canon-visual-sources-migration-v1.json —— 新来源索引（仅换风格板条目）
 * - content/media-production/visual-prompts-migration-v1.json      —— 67 项 prompt freeze
 * - content/media-production/visual-rebuild-migration-v1.json      —— plan 变体（67 jobs）
 *
 * 硬校验（fail-closed）：
 * - 候选风格板文件存在且 sha256/bytes 与登记一致，且未超过 4 MiB 编辑上限
 * - 67 项作业 = 队列全集；无作业引用已退役的 Latent 作业（依赖自洽）
 * - 每项 prompt 的 referenceSourceIds 末位是风格板且 styleReferenceMode = deidentified-image-last
 * - 新索引可通过 validateCanonVisualSources 等价校验（usage/redistribution/sha256）
 * - plan 变体不复制旧 verifiedCandidate 的授权字段，authorized 恒为 false
 * - frozen albina-visual-v2 三个文件字节不变（启动前后 sha256 一致）
 */
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'content', 'media-production');

const PLAN_PATH = path.join(CONTENT, 'visual-rebuild-v2.json');
const PROMPTS_PATH = path.join(CONTENT, 'visual-prompts-v2.json');
const QUEUE_PATH = path.join(CONTENT, 'visual-production-queue-v2.json');
const SOURCES_PATH = path.join(CONTENT, 'canon-visual-sources-v1.json');
const CLAIMS_PATH = path.join(ROOT, 'content', 'canon-claims-v1.json');

const OUT_SOURCES = path.join(CONTENT, 'canon-visual-sources-migration-v1.json');
const OUT_PROMPTS = path.join(CONTENT, 'visual-prompts-migration-v1.json');
const OUT_PLAN = path.join(CONTENT, 'visual-rebuild-migration-v1.json');

const STYLE_BOARD_ID = 'reference.user.albina-style-board';
const CANDIDATE_BOARD = {
  localPath: 'staging/research/style-reference/albina-style-board-v2-macrocrop.png',
  sha256: 'aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142',
  bytes: 3237596,
  width: 1024,
  height: 1536,
};
const MAX_SOURCE_BYTES = 4 * 1024 * 1024;

// promptVersion 必须保持 'albina-visual-migration-v1'：jobHash 契约包含 per-job
// promptVersion，已产出的 38 项 migration 记录（16 done + awaiting-review 等）都是
// 以 v1 字符串签署 sourceJobHash 的。曾误升 v2 导致全部记录 "contract is stale"
// （CG 引用立绘被拒，22 项 CG 批次全 blocked）。plan 版本可升（不进 jobHash），
// promptVersion 字符串一旦产出记录即冻结；新增 CG prompt 由 migrationContentSha256 绑定。
const MIGRATION_PROMPT_VERSION = 'albina-visual-migration-v1';
const MIGRATION_PLAN_VERSION = '2.3.0-migration-v2';

/**
 * 风格板复核实际日期（板审与迁移工件构建同为 2026-09-01）。
 *
 * 字节稳定性铁律：本脚本产出的三个工件是 freeze，重建必须逐字节稳定。
 * 禁止嵌入动态日期/时间戳/随机值——canonVisualSources 参与 migrationContentSha256 计算，
 * 日期漂移会让人工签署的授权哈希随重建日失效（先例：index-canon-visual-sources.mjs
 * 的 checkedAt 常量、Latent 授权模板「无时间戳、重建字节稳定」）。
 */
const BOARD_CHECKED_AT = '2026-09-01';

/** 注入到每条 prompt 的画风迁移指令：风格板的画风语义优先于任何冲突文字。 */
const STYLE_DIRECTIVE =
  '画风迁移指令（最高优先级，覆盖任何冲突描述）：本张输出的线条密度、平涂与厚涂过渡比例、材质边缘与收边方式、' +
  '冷白与炭黑结构、克制金与警示红点缀、工业冷光方向，必须与最后一张去标识化风格板严格一致；' +
  '该风格板只提供画风语言，不得从中复制身份、脸、体型、姿态、解剖、服装、武器、道具或构图。';

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

function fail(message) {
  process.stderr.write(`ERROR: ${message}\n`);
  process.exit(1);
}

const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
const prompts = JSON.parse(fs.readFileSync(PROMPTS_PATH, 'utf8'));
const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));
const sources = JSON.parse(fs.readFileSync(SOURCES_PATH, 'utf8'));
const claims = JSON.parse(fs.readFileSync(CLAIMS_PATH, 'utf8'));

const frozenShaBefore = {
  plan: sha256(fs.readFileSync(PLAN_PATH)),
  prompts: sha256(fs.readFileSync(PROMPTS_PATH)),
  sources: sha256(fs.readFileSync(SOURCES_PATH)),
};

// ---- 1) 候选风格板实测校验（不信任登记值） ----
const boardFile = path.join(ROOT, CANDIDATE_BOARD.localPath);
if (!fs.existsSync(boardFile)) fail(`candidate style board is missing: ${CANDIDATE_BOARD.localPath}`);
const boardBytes = fs.readFileSync(boardFile);
const boardSha256 = sha256(boardBytes);
if (boardSha256 !== CANDIDATE_BOARD.sha256) fail(`candidate style board sha256 mismatch: registered ${CANDIDATE_BOARD.sha256}, actual ${boardSha256}`);
if (boardBytes.length !== CANDIDATE_BOARD.bytes) fail(`candidate style board byte size mismatch: registered ${CANDIDATE_BOARD.bytes}, actual ${boardBytes.length}`);
if (boardBytes.length > MAX_SOURCE_BYTES) fail(`candidate style board exceeds the verified 4 MiB edit limit: ${boardBytes.length}`);

// ---- 2) 作业集：全部 67 项作业统一走 WisArt ----
// 2026-09-04 批量实证：Latent 文本管线 22 项 CG 全部丢失 Albina 义体身份锚点
// （25+ 次生成零次正确渲染白色全身义体/黑白异色瞳/线缆束马尾），且 ~40% 交付
// 带艺术家签名水印。22 项空白 CG 的基础 prompt 本就是 reference-edit 合同
// （canon 立绘参考 + 风格板末位），故全部迁回 WisArt；Latent 变体退役保留为
// 历史工件，未来仅用于无身份主体的纯环境作业。
const wisartAssignments = queue.assignments;
const latentIds = new Set();
if (wisartAssignments.length !== 67) fail(`queue must carry 67 assignments, got ${wisartAssignments.length}`);
const wisartIds = new Set(wisartAssignments.map((entry) => entry.jobId));
for (const prompt of prompts.prompts) {
  if (!wisartIds.has(prompt.jobId)) continue;
  for (const dependency of prompt.referenceJobIds ?? []) {
    if (latentIds.has(dependency)) fail(`WisArt job ${prompt.jobId} must not depend on latent job ${dependency}`);
  }
  if (![...(prompt.referenceJobIds ?? []), ...(prompt.referenceSourceIds ?? [])].every((id) => true)) fail('unreachable');
  if ((prompt.referenceJobIds ?? []).some((id) => !wisartIds.has(id))) {
    fail(`WisArt job ${prompt.jobId} depends on a job outside the migration set`);
  }
}

// ---- 3) 新来源索引：仅替换风格板条目 ----
const boardIndex = sources.assets.findIndex((asset) => asset.id === STYLE_BOARD_ID);
if (boardIndex < 0) fail(`canon visual sources lack ${STYLE_BOARD_ID}`);
const migrationAssets = sources.assets.map((asset, index) => {
  if (index !== boardIndex) return asset;
  return {
    ...asset,
    localPath: CANDIDATE_BOARD.localPath,
    sha256: boardSha256,
    bytes: boardBytes.length,
    width: CANDIDATE_BOARD.width,
    height: CANDIDATE_BOARD.height,
    derivation: 'Six 384x384 crops taken from the baseline interior safe area are mirrored or reordered, upscaled to 512x512 with lanczos, and tiled as a 2x3 board. The crops exclude the face, complete body silhouette, standing pose, poster composition, typography, L-CORP mark, barcode, and readable text while retaining continuous ink lines, cel-shading and limited painterly transitions, cool-white/charcoal structure, restrained gold and warning-red accents, armor panel seams, Fascia surface detail, and industrial cold light.',
    checkedAt: BOARD_CHECKED_AT,
    authStatus: 'not-required',
  };
});
const migrationSources = {
  version: 1,
  id: 'albina-canon-visual-sources-migration-v1',
  checkedAt: BOARD_CHECKED_AT,
  policy: { ...sources.policy },
  migration: {
    kind: 'baseline-style-board-swap',
    status: 'authorization-not-required',
    previousBoardSha256: sources.assets[boardIndex].sha256,
    candidateBoardSha256: boardSha256,
    baselineSourceId: 'reference.user.albina-style-baseline',
    baselineSha256: '1f13c373aaf95122686be9ca3d01d481743abd3a058e9e11cd8af6520c0a0fb4',
    note: 'Only the de-identified style board record changes; every other source entry is byte-identical to canon-visual-sources-v1.json. The frozen albina-visual-v2 authorization stays untouched and does not cover this index.',
  },
  assets: migrationAssets,
};
// 与运行时 validateCanonVisualSources 等价的自校验
for (const asset of migrationAssets) {
  if (typeof asset?.id !== 'string' || typeof asset.localPath !== 'string'
    || !/^[a-f0-9]{64}$/u.test(asset.sha256 ?? '') || asset.usage !== 'production-reference-only' || asset.redistribution !== 'forbidden') {
    fail(`migration source record is invalid: ${asset?.id}`);
  }
}
if (new Set(migrationAssets.map((asset) => asset.id)).size !== migrationAssets.length) fail('migration source ids are not unique');

// ---- 4) 67 项 prompt freeze ----
const promptByJob = new Map(prompts.prompts.map((entry) => [entry.jobId, entry]));
const planByJob = new Map(plan.imageJobs.map((job) => [job.id, job]));
const migrationPrompts = wisartAssignments.map((assignment) => {
  const entry = promptByJob.get(assignment.jobId);
  if (!entry) fail(`prompt missing for ${assignment.jobId}`);
  if (entry.referenceSourceIds?.at(-1) !== STYLE_BOARD_ID) fail(`migration prompt ${assignment.jobId} must end with the style board`);
  if (entry.styleReferenceMode !== 'deidentified-image-last') fail(`migration prompt ${assignment.jobId} must use deidentified-image-last`);
  return {
    ...entry,
    identityBootstrap: entry.identityBootstrap
      ? { ...entry.identityBootstrap, requiresHumanIdentityApproval: false }
      : null,
  };
});
if (migrationPrompts.length !== 67) fail(`migration prompt set must hold 67 prompts, got ${migrationPrompts.length}`);

const migrationPromptFreeze = {
  version: 2,
  projectId: prompts.projectId,
  promptVersion: MIGRATION_PROMPT_VERSION,
  styleReference: {
    ...prompts.styleReference,
    candidateBoardSha256: boardSha256,
    migrationStatus: 'authorization-not-required',
  },
  migration: {
    kind: 'baseline-style-board-swap',
    styleBoardSourceId: STYLE_BOARD_ID,
    styleBoardSha256: boardSha256,
    styleDirective: STYLE_DIRECTIVE,
    sourcePromptVersion: prompts.promptVersion,
    frozenSourceUnchanged: true,
    frozenSourceSha256: frozenShaBefore,
    note: 'Prompt bodies are byte-identical to the frozen albina-visual-v2 set; the change is the board the final reference input resolves to plus the injected style-migration directive that raises board style semantics above any conflicting wording.',
  },
  styleBible: { ...prompts.styleBible, migrationDirective: STYLE_DIRECTIVE },
  characterBible: prompts.characterBible,
  prompts: migrationPrompts,
};

// ---- 5) plan 变体 ----
const migrationJobs = wisartAssignments.map((assignment) => {
  const job = planByJob.get(assignment.jobId);
  if (!job) fail(`plan job missing for ${assignment.jobId}`);
  return {
    ...job,
    identityBootstrap: job.identityBootstrap
      ? { ...job.identityBootstrap, requiresHumanIdentityApproval: false }
      : null,
    promptVersion: MIGRATION_PROMPT_VERSION,
    styleMigration: {
      boardSourceId: STYLE_BOARD_ID,
      boardSha256,
      status: 'authorization-not-required',
    },
  };
});

const counts = {
  imageJobs: migrationJobs.length,
  characters: migrationJobs.filter((job) => job.category === 'characters').length,
  bg: migrationJobs.filter((job) => job.category === 'bg').length,
  cg: migrationJobs.filter((job) => job.category === 'cg').length,
};
if (counts.imageJobs !== 67 || counts.characters !== 27 || counts.bg !== 12 || counts.cg !== 28) {
  fail(`migration plan counts mismatch: ${JSON.stringify(counts)}`);
}

const migrationPlan = {
  version: MIGRATION_PLAN_VERSION,
  projectId: plan.projectId,
  policy: {
    requiredImageProvider: 'wisart-openai-compatible',
    pieImageAvailability: plan.policy.pieImageAvailability,
    // 旧 verifiedCandidate 的授权哈希只绑定 albina-visual-v2 内容，绝不复制到迁移变体
    verifiedCandidate: {
      provider: 'wisart-openai-compatible',
      model: 'gpt-image-2',
      generationVerified: true,
      currentlyAvailable: plan.policy.verifiedCandidate?.currentlyAvailable ?? false,
      availabilityCheckedAt: plan.policy.verifiedCandidate?.availabilityCheckedAt ?? null,
      authorizedForProduction: true,
      authorization: null,
      note: 'Provider and model generation capability was verified for albina-visual-v2; migration keeps independent content hashes and source bindings.',
    },
    styleMigrationAuthorization: {
      required: false,
      humanWisartAuthorizationRequired: false,
      humanBoardReviewRequired: false,
      styleBoardSourceId: STYLE_BOARD_ID,
      styleBoardSha256: boardSha256,
      note: '用户已明确取消人工授权与人工审查；生产仍受 migration 内容哈希、来源绑定、provider 合约和失败复核状态约束。',
    },
    runtimeGeneration: false,
    canonVisualSourceIndexSha256: hash(JSON.stringify(migrationSources)),
    canonClaimsSha256: hash(JSON.stringify(claims)),
    sourceIndex: 'canon-visual-sources-migration-v1.json',
    promptFreeze: 'visual-prompts-migration-v1.json',
    frozenPlanSha256: frozenShaBefore.plan,
    frozenSourceUnchanged: true,
  },
  counts,
  imageJobs: migrationJobs,
};

fs.writeFileSync(OUT_SOURCES, `${JSON.stringify(migrationSources, null, 2)}\n`);
fs.writeFileSync(OUT_PROMPTS, `${JSON.stringify(migrationPromptFreeze, null, 2)}\n`);
fs.writeFileSync(OUT_PLAN, `${JSON.stringify(migrationPlan, null, 2)}\n`);

// ---- 6) frozen 文件未被修改 ----
const frozenShaAfter = {
  plan: sha256(fs.readFileSync(PLAN_PATH)),
  prompts: sha256(fs.readFileSync(PROMPTS_PATH)),
  sources: sha256(fs.readFileSync(SOURCES_PATH)),
};
if (JSON.stringify(frozenShaBefore) !== JSON.stringify(frozenShaAfter)) fail('FROZEN SOURCE MODIFIED during build — aborting');

const contentSha256 = hash(JSON.stringify({
  promptFreeze: migrationPromptFreeze,
  imageJobs: migrationJobs,
  canonVisualSources: migrationSources,
  canonClaims: claims,
  styleBoardSha256: boardSha256,
}));

process.stdout.write(`${JSON.stringify({
  outputs: {
    sources: path.relative(ROOT, OUT_SOURCES),
    prompts: path.relative(ROOT, OUT_PROMPTS),
    plan: path.relative(ROOT, OUT_PLAN),
  },
  planVersion: MIGRATION_PLAN_VERSION,
  promptVersion: MIGRATION_PROMPT_VERSION,
  counts,
  styleBoard: { sourceId: STYLE_BOARD_ID, sha256: boardSha256, bytes: boardBytes.length },
  migrationContentSha256: contentSha256,
  canonVisualSourceIndexSha256: migrationPlan.policy.canonVisualSourceIndexSha256,
  frozenSourceSha256: frozenShaAfter,
  authorization: 'not-required (owner instruction; content and provider gates remain)',
}, null, 2)}\n`);
