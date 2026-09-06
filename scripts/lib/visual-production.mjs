import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { mkdir, open, readFile, readdir, rename, rm, writeFile } from 'node:fs/promises';
import { basename, relative, resolve } from 'node:path';
import { promisify } from 'node:util';

const runFile = promisify(execFile);
const projectRoot = resolve(import.meta.dirname, '../..');
const stagingRoot = resolve(projectRoot, 'staging/media/visual-v2');
const planPath = resolve(projectRoot, 'content/media-production/visual-rebuild-v2.json');
const promptPath = resolve(projectRoot, 'content/media-production/visual-prompts-v2.json');
// Latent 双管线变体：frozen albina-visual-v2 授权哈希绑定内容不可改，Latent 批次走独立 freeze + plan 变体
const latentPlanPath = resolve(projectRoot, 'content/media-production/visual-rebuild-latent-v1.json');
const latentPromptPath = resolve(projectRoot, 'content/media-production/latent-text-prompts-v1.json');
// 画风迁移变体：以 macro-crop 基线风格板重做 67 项全量 WisArt 作业（27 立绘 + 12 背景 + 28 CG），走独立索引/freeze，不动 frozen 链
const migrationPlanPath = resolve(projectRoot, 'content/media-production/visual-rebuild-migration-v1.json');
const migrationPromptPath = resolve(projectRoot, 'content/media-production/visual-prompts-migration-v1.json');
const migrationSourcePath = resolve(projectRoot, 'content/media-production/canon-visual-sources-migration-v1.json');
const canonVisualSourcePath = resolve(projectRoot, 'content/media-production/canon-visual-sources-v1.json');
const canonClaimsPath = resolve(projectRoot, 'content/canon-claims-v1.json');
const ledgerPath = resolve(stagingRoot, 'ledger.json');
const lockPath = resolve(stagingRoot, 'ledger.lock');
const defaultBaseUrl = 'https://wisart.kuaileshifu.com/v1';
const defaultLatentBaseUrl = 'https://latent.moe';
// 生产参考图只允许取自 research 树下的这两个子目录，避免索引被改动后读取任意项目文件。
const allowedResearchSourceDirectories = ['canon-visual/wiki-game-assets', 'style-reference'];
const hashPattern = /^[a-f0-9]{64}$/u;
const jobStatuses = new Set(['running', 'ambiguous', 'failed', 'provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed', 'rejected']);
export const pilotJobIds = [
  'visual.image.bg.backstreets_rain',
  'visual.image.portrait.albina.normal',
  'visual.image.portrait.protagonist.serious',
  'visual.image.portrait.albina.armored',
  'visual.image.cg.opening_rain',
];

// Latent is text-to-image and has no cross-job image dependencies. Its pilot
// must therefore be provider-local instead of inheriting the WisArt pilot set.
export const latentPilotJobIds = [
  'visual.image.cg.opening_rain',
  'visual.image.cg.art_resonance',
  'visual.image.cg.fascia_heartbeat',
  'visual.image.cg.golden_bough_rebuild',
  'visual.image.cg.white_canvas_choice',
];

// 迁移批次的 pilot 必须是 provider-local，且覆盖本次迁移的核心对象：
// 两张 Albina 立绘（含依赖链 normal -> armored）、一张主角立绘、一张背景、一张正史回顾 CG。
export const migrationPilotJobIds = [
  'visual.image.portrait.albina.normal',
  'visual.image.portrait.albina.armored',
  'visual.image.portrait.protagonist.serious',
  'visual.image.bg.backstreets_rain',
  'visual.image.cg.canon_recap_9_37',
];

export function hash(value) {
  return createHash('sha256').update(value).digest('hex');
}

export function inspectPng(buffer) {
  const signature = '89504e470d0a1a0a';
  if (buffer.length < 33 || buffer.subarray(0, 8).toString('hex') !== signature || buffer.subarray(12, 16).toString('ascii') !== 'IHDR') {
    throw new Error('Image response is not a valid PNG');
  }
  const colorType = buffer[25];
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20), colorType, alphaCapable: colorType === 4 || colorType === 6 };
}

export function selectImageJobs(plan, prompts, options = {}) {
  const variant = options.planVariant ?? 'frozen';
  if (!['frozen', 'latent', 'migration'].includes(variant)) throw new Error(`Unsupported plan variant: ${variant}`);
  const promptByJob = new Map(prompts.prompts.map((prompt) => [prompt.jobId, prompt]));
  const requested = new Set(options.ids ?? []);
  let jobs = plan.imageJobs;
  // Latent 变体只覆盖 22 个 CG job；全部角色立绘留在 WisArt reference-edit
  // 以便消费 reference.user.albina-style-board 进行基线画风迁移。
  if (variant === 'latent') jobs = jobs.filter((job) => job.provider === 'latent-moe');
  if (options.mode === 'pilot' && requested.size === 0) {
    const pilotIds = variant === 'latent' ? latentPilotJobIds : variant === 'migration' ? migrationPilotJobIds : pilotJobIds;
    const available = new Set(jobs.map((job) => job.id));
    pilotIds.forEach((id) => { if (available.has(id)) requested.add(id); });
    for (const job of jobs) {
      if (requested.size >= pilotIds.length) break;
      requested.add(job.id);
    }
  }
  if (requested.size > 0) jobs = jobs.filter((job) => requested.has(job.id));
  const missing = [...requested].filter((id) => !jobs.some((job) => job.id === id));
  if (missing.length > 0) throw new Error(`Unknown image jobs: ${missing.join(', ')}`);
  return orderByDependencies(jobs.map((job) => {
    const prompt = promptByJob.get(job.id);
    return { job, prompt, finalPrompt: expandPrompt(job, prompt, prompts, variant) };
  }));
}

export function productionReviewCriteria(entry) {
  const criteria = Array.isArray(entry?.prompt?.reviewCriteria) ? [...entry.prompt.reviewCriteria] : [];
  if (entry?.job?.category !== 'bg') {
    const required = [
      '中指最长且三段结构清晰',
      '手指自然分离不粘连且甲床清晰',
      '五趾清晰分离且大脚趾内侧',
      '机械手、鞋靴与承重关节结构正确',
      'Live2D 分层无漂移、无涂抹或隐藏背景污染',
    ];
    for (const criterion of required) if (!criteria.includes(criterion)) criteria.push(criterion);
  }
  return criteria;
}

export function approvalCriteriaEvidence(currentCriteria, criteriaEvidence) {
  if (!Array.isArray(currentCriteria) || currentCriteria.length === 0) throw new Error('Current review criteria are empty');
  if (!Array.isArray(criteriaEvidence) || criteriaEvidence.length !== currentCriteria.length
    || criteriaEvidence.some((item) => !item || typeof item !== 'object')) {
    throw new Error('Evidence is required for every current review criterion');
  }
  const seen = new Set();
  const normalized = criteriaEvidence.map((item) => {
    if (typeof item.criterion !== 'string' || !currentCriteria.includes(item.criterion) || seen.has(item.criterion)
      || typeof item.note !== 'string' || item.note.trim().length === 0
      || typeof item.evidence !== 'string' || item.evidence.trim().length === 0) {
      throw new Error('Review criterion evidence is incomplete');
    }
    seen.add(item.criterion);
    return { criterion: item.criterion, note: item.note.trim(), evidence: item.evidence.trim() };
  });
  if (seen.size !== currentCriteria.length || currentCriteria.some((criterion) => !seen.has(criterion))) {
    throw new Error('Evidence is required for every current review criterion');
  }
  return normalized;
}

export function orderedReferenceSourceIds(prompt) {
  const ids = prompt?.referenceSourceIds ?? [];
  if (!Array.isArray(ids) || new Set(ids).size !== ids.length) throw new Error('Reference source inputs must be unique');
  const userIds = ids.filter((id) => id.startsWith('reference.user.'));
  for (const id of userIds) {
    if (id !== 'reference.user.albina-style-board') throw new Error(`User-provided visual reference is forbidden: ${id}`);
  }
  const styleId = 'reference.user.albina-style-board';
  if (userIds.length > 0) {
    if (prompt.styleReferenceMode !== 'deidentified-image-last') throw new Error('An anonymized image board requires the explicit anonymized image board mode');
    if (ids.at(-1) !== styleId) throw new Error('The anonymized style board must be the final source input');
  }
  if (prompt.styleReferenceMode === 'deidentified-image-last' && !ids.includes(styleId)) {
    throw new Error('The anonymized style board must be the final source input');
  }
  return [...ids];
}

export function orderResolvedReferenceInputs(sourceInputs, jobInputs) {
  const styleId = 'reference.user.albina-style-board';
  const isStyle = (value) => value.sourceId === styleId || value.jobId === styleId;
  const canon = sourceInputs.filter((value) => !isStyle(value));
  const style = sourceInputs.filter(isStyle);
  return [...canon, ...jobInputs, ...style];
}

function expandPrompt(job, prompt, prompts, variant = 'frozen') {
  // Latent freeze 的 prompt 已在构建期完成自足组装（styleBible + 身份锚点 + 纯品红背景指令），
  // 运行时不得再叠加 WisArt 的 house style / 引用图契约 / 角色圣经 / 洋红覆盖指令。
  if (variant === 'latent') {
    if (!prompt?.latentRequest?.prompt) throw new Error(`Latent prompt missing precomposed text for ${job.id}`);
    return prompt.latentRequest.prompt;
  }
  const style = prompts.styleBible ?? {};
  const migrationDirective = variant === 'migration' ? prompts.migration?.styleDirective : undefined;
  const rule = job.category === 'characters' ? style.portraitRules : job.category === 'bg' ? style.backgroundRules : style.cgRules;
  const sections = [
    'House style: dense precise 2D anime linework, restrained cel shading, deliberate material edges, industrial cold light, charcoal black, surgical white, muted gold, and warning red accents. no text, captions, UI, watermark, or logo.',
    style.rendering, style.continuity, style.canonAuBoundary, rule, migrationDirective,
  ];
  if (prompt.mode === 'reference-edit') {
    sections.push('Input-image contract: preserve identity and scene authority from earlier inputs. The final input is an anonymized style board used only for line density, cel-shading balance, industrial palette, material edges, and lighting. Do not copy identity, pose, anatomy, costume, weapons, objects, or composition from the anonymized style board.');
  }
  if (job.category !== 'bg') sections.push(`角色设定圣经：${JSON.stringify(scopedCharacterBible(prompts.characterBible, prompt.identitySubjects))}`);
  if (job.category !== 'bg') sections.push('解剖与 Live2D 质量合同：每只五根手指；半透明指甲；中指最长且三段结构清晰；手指自然分离不粘连、甲床清晰；五趾清晰分离且大脚趾内侧；机械手、鞋靴与承重关节结构正确；Live2D 分层无漂移；不得改变任何其他部位。');
  sections.push(`任务画面：${prompt.positivePrompt}`, `强制排除：${prompt.negativePrompt}`);
  if (job.category === 'characters') {
    sections.push('渠道兼容覆盖指令：忽略上文“透明背景”的生成方式，人物仍须完整；画布背景必须是单一、完全均匀的纯洋红色 #FF00FF，不得画棋盘格、阴影、地面、渐变或反光。该纯色只用于本地离线抠图，最终交付仍为真透明 PNG。');
  }
  return sections.filter(Boolean).join('\n\n');
}

function scopedCharacterBible(bible, subjects = []) {
  const selected = {};
  for (const subject of subjects ?? []) {
    if (Object.hasOwn(bible ?? {}, subject)) selected[subject] = bible[subject];
    else if (Object.hasOwn(bible?.auSupportingCharacters ?? {}, subject)) {
      selected.auSupportingCharacters ??= {};
      selected.auSupportingCharacters[subject] = bible.auSupportingCharacters[subject];
    } else if (Object.hasOwn(bible?.canonSupportingCharacters ?? {}, subject)) {
      selected.canonSupportingCharacters ??= {};
      selected.canonSupportingCharacters[subject] = bible.canonSupportingCharacters[subject];
    }
  }
  return selected;
}

function orderByDependencies(entries) {
  const remaining = new Map(entries.map((entry) => [entry.job.id, entry]));
  const ordered = [];
  while (remaining.size > 0) {
    // Latent freeze 条目无 referenceJobIds（text-generation 零参考依赖），做兜底
    const ready = [...remaining.values()].filter((entry) => (entry.prompt?.referenceJobIds ?? []).every((id) => !remaining.has(id)));
    if (ready.length === 0) throw new Error('Visual prompt references contain a cycle');
    ready.sort((left, right) => left.job.id.localeCompare(right.job.id));
    for (const entry of ready) { ordered.push(entry); remaining.delete(entry.job.id); }
  }
  return ordered;
}

export async function loadProductionInputs(options = {}) {
  const variant = options.planVariant ?? 'frozen';
  if (!['frozen', 'latent', 'migration'].includes(variant)) throw new Error(`Unsupported plan variant: ${variant}`);
  const paths = variant === 'latent'
    ? { plan: latentPlanPath, prompts: latentPromptPath, sources: canonVisualSourcePath }
    : variant === 'migration'
      ? { plan: migrationPlanPath, prompts: migrationPromptPath, sources: migrationSourcePath }
      : { plan: planPath, prompts: promptPath, sources: canonVisualSourcePath };
  const [plan, prompts, canonVisualSources, canonClaims] = await Promise.all([
    readJson(paths.plan), readJson(paths.prompts), readJson(paths.sources), readJson(canonClaimsPath),
  ]);
  validateInputs(plan, prompts, canonVisualSources, canonClaims, variant);
  return { plan, prompts, canonVisualSources, canonClaims, authorization: undefined, planVariant: variant };
}

/**
 * Latent 生产输入校验：人工身份审查与授权已取消；保留 prompt/job 哈希绑定，
 * 输入重建或替换时自动更新并暴露当前校验上下文。
 */
export function latentJobSetSha256(plan) {
  const jobs = (plan?.imageJobs ?? [])
    .filter((job) => job.provider === 'latent-moe')
    .map(({ id, assetId, receiptAssetId, category, model, inputMode, latentResolution, delivery, promptVersion }) => ({
      id, assetId, receiptAssetId, category, model, inputMode, latentResolution, delivery, promptVersion,
    }))
    .sort((left, right) => left.id.localeCompare(right.id));
  return hash(JSON.stringify(jobs));
}

export function latentPromptApprovalManifest(prompts) {
  return (prompts?.prompts ?? [])
    .map((entry) => ({ jobId: entry.jobId, promptSha256: hash(entry?.latentRequest?.prompt ?? '') }))
    .sort((left, right) => left.jobId.localeCompare(right.jobId));
}

export function assertLatentProductionAuthorized(plan, prompts) {
  const policy = plan?.policy?.latentProductionAuthorization;
  if (!policy || policy.required !== false || policy.humanIdentityApprovalRequired !== false) {
    throw new Error('Latent production plan must explicitly disable human authorization');
  }
  if (!prompts) throw new Error('Latent production prompt freeze is required');
  return { status: 'not-required', promptFreezeSha256: hash(JSON.stringify(prompts)), latentJobSetSha256: latentJobSetSha256(plan) };
}

/**
 * 画风迁移内容哈希：绑定 prompt freeze、67 项作业、迁移来源索引、canon claims 与
 * 候选风格板本身。任一输入重建或换板即失效，旧授权自动作废。
 */
export function migrationContentSha256(plan, prompts, canonVisualSources, canonClaims) {
  return hash(JSON.stringify({
    promptFreeze: prompts,
    imageJobs: plan?.imageJobs ?? [],
    canonVisualSources,
    canonClaims,
    styleBoardSha256: plan?.policy?.styleMigrationAuthorization?.styleBoardSha256 ?? null,
  }));
}

/** 迁移审计上下文的三块范围（不构成人工授权要求）。 */
export const migrationReviewScopes = ['board', 'characterJobs', 'backgroundJobs'];

/**
 * WisArt 画风迁移输入校验：人工复核与授权已取消；保留内容哈希、风格板哈希与作业范围
 * 绑定，防止 freeze/source/claims 被意外替换后静默生产。
 */
export function assertWisartMigrationAuthorized(plan, prompts, canonVisualSources, canonClaims) {
  const policy = plan?.policy?.styleMigrationAuthorization;
  if (!policy || policy.required !== false || policy.humanWisartAuthorizationRequired !== false
    || policy.humanBoardReviewRequired !== false) {
    throw new Error('WisArt migration plan must explicitly disable human authorization');
  }
  if (!prompts || !canonVisualSources) throw new Error('WisArt migration inputs are required');
  return {
    status: 'not-required',
    migrationContentSha256: migrationContentSha256(plan, prompts, canonVisualSources, canonClaims),
    styleBoardSha256: policy.styleBoardSha256,
  };
}

function validateInputs(plan, prompts, canonVisualSources, canonClaims, variant = 'frozen') {
  if (variant === 'latent') {
    validateLatentInputs(plan, prompts, canonClaims);
    return;
  }
  if (variant === 'migration') {
    validateMigrationInputs(plan, prompts, canonVisualSources, canonClaims);
    return;
  }
  if (plan.version !== 2 || plan.counts?.imageJobs !== 67 || plan.imageJobs?.length !== 67) throw new Error('Invalid visual rebuild plan');
  if (prompts.version !== 2 || prompts.promptVersion !== 'albina-visual-v2' || prompts.prompts?.length !== 67) throw new Error('Invalid visual prompt freeze');
  const planById = new Map(plan.imageJobs.map((job) => [job.id, job]));
  const planIds = new Set(planById.keys());
  const promptIds = new Set(prompts.prompts.map((prompt) => prompt.jobId));
  if (planIds.size !== 67 || promptIds.size !== 67 || [...planIds].some((id) => !promptIds.has(id))) throw new Error('Visual prompt coverage mismatch');
  const candidate = plan.policy?.verifiedCandidate;
  const authorizedHash = hash(JSON.stringify({ promptFreeze: prompts, imageJobs: plan.imageJobs, canonVisualSources, canonClaims }));
  if (!['wisart-openai-compatible', 'latent-moe'].includes(plan.policy?.requiredImageProvider)
    || (plan.policy?.requiredImageProvider === 'latent-moe' && candidate?.authorizedForProduction !== true)
    || (plan.policy?.requiredImageProvider === 'wisart-openai-compatible'
      && (candidate?.authorizedForProduction !== true
        || candidate?.generationVerified !== true
        || (candidate?.upstreamPieVerified !== undefined && candidate?.upstreamPieVerified !== false)
        || candidate?.authorization?.authorizedContentSha256 !== authorizedHash))
    || plan.policy?.canonClaimsSha256 !== hash(JSON.stringify(canonClaims))) {
    throw new Error('Visual production authorization is missing or does not match the frozen content');
  }
  for (const job of plan.imageJobs) validatePlanJob(job);
  const sourceById = validateCanonVisualSources(canonVisualSources);
  const claimById = validateCanonClaims(canonClaims);
  for (const prompt of prompts.prompts) validatePrompt(prompt, planById, sourceById, claimById);
  for (const prompt of prompts.prompts) validatePlanPromptBinding(planById.get(prompt.jobId), prompt);
}

/**
 * Latent 双管线变体契约校验：frozen albina-visual-v2 的授权哈希只绑定其自身内容，
 * 因此 latent 变体不走 verifiedCandidate 内容哈希校验；本变体显式取消人工授权，
 * 改由 prompt/job/canon 哈希与 provider 合约校验把关。
 */
function validateLatentInputs(plan, prompts, canonClaims) {
  if (plan.version !== '2.1.0-latent-v1' || plan.counts?.imageJobs !== 67 || plan.imageJobs?.length !== 67) {
    throw new Error('Invalid latent plan variant');
  }
  if (prompts.id !== 'albina-latent-text-prompts-v1' || prompts.promptVersion !== 'latent-text-v1' || prompts.prompts?.length !== 22) {
    throw new Error('Invalid latent prompt freeze');
  }
  const latentJobs = plan.imageJobs.filter((job) => job.provider === 'latent-moe');
  if (latentJobs.length !== 22) throw new Error(`Latent plan variant must contain 22 latent jobs, got ${latentJobs.length}`);
  const latentJobIds = new Set(latentJobs.map((job) => job.id));
  const promptIds = new Set(prompts.prompts.map((entry) => entry.jobId));
  if (promptIds.size !== 22 || [...promptIds].some((id) => !latentJobIds.has(id))) throw new Error('Latent prompt coverage mismatch');
  if (plan.policy?.canonClaimsSha256 !== hash(JSON.stringify(canonClaims))) throw new Error('Latent plan canonClaimsSha256 mismatch');
  const authorizationPolicy = plan.policy?.latentProductionAuthorization;
  if (!authorizationPolicy || authorizationPolicy.required !== false || authorizationPolicy.humanIdentityApprovalRequired !== false) {
    throw new Error('Latent plan must explicitly disable human authorization');
  }
  if (prompts.policy?.authorizationRequired !== false || prompts.policy?.humanIdentityApprovalRequired !== false) {
    throw new Error('Latent prompt freeze must explicitly disable human authorization');
  }
  for (const entry of prompts.prompts) validateLatentPromptEntry(entry);
  for (const job of latentJobs) validateLatentPlanJob(job);
  if (latentJobs.some((job) => job.category !== 'cg') || prompts.prompts.some((entry) => entry.category !== 'cg')) {
    throw new Error('Latent is reserved for the 22 blank CG jobs; character portraits must stay on WisArt reference-edit for baseline-style migration');
  }
}

function validateLatentPlanJob(job) {
  if (job.category !== 'cg') throw new Error(`Latent job ${job.id} must be a CG job`);
  if (job.latentResolution !== 'landscape') throw new Error(`Latent CG job ${job.id} must use landscape resolution`);
  if (job.inputMode !== 'text-generation') throw new Error(`Latent job ${job.id} must use text-generation`);
  if (job.model !== 'latent-moe-async') throw new Error(`Latent job ${job.id} must use latent-moe-async`);
  if (!Array.isArray(job.referenceJobIds) || job.referenceJobIds.length !== 0) throw new Error(`Latent job ${job.id} must not carry referenceJobIds`);
  if (!Array.isArray(job.referenceSourceIds) || job.referenceSourceIds.length !== 0) throw new Error(`Latent job ${job.id} must not carry referenceSourceIds`);
  if (job.styleReferenceMode !== null) throw new Error(`Latent job ${job.id} must not carry styleReferenceMode`);
  if (!['portrait', 'landscape', 'square'].includes(job.latentResolution)) throw new Error(`Latent job ${job.id} has invalid latentResolution`);
}

function validateLatentPromptEntry(entry) {
  const request = entry.latentRequest;
  if (!request || typeof request.prompt !== 'string' || request.prompt.length < 200) throw new Error(`Invalid latent prompt for ${entry.jobId}`);
  if (entry.category !== 'cg' || entry.generationSize !== 'landscape' || request.resolution !== 'landscape') {
    throw new Error(`Latent prompt ${entry.jobId} must be a landscape CG prompt`);
  }
  if (request.steps !== 8 && request.steps !== 16) throw new Error(`Invalid latent steps for ${entry.jobId}`);
  if (entry.inputMode !== 'text-generation') throw new Error(`Latent prompt ${entry.jobId} must use text-generation`);
  if (!entry.delivery || typeof entry.delivery.width !== 'number' || typeof entry.delivery.height !== 'number') {
    throw new Error(`Latent prompt ${entry.jobId} has invalid delivery`);
  }
}

function validatePlanJob(job) {
  if (job.provider === 'latent-moe' && job.model === 'latent-moe-async') {
    if (job.upstreamPieVerified !== undefined && job.upstreamPieVerified !== false) {
      throw new Error(`Invalid image provider contract for ${job.id}`);
    }
    if (!['1920x1080', '1024x1536', 'portrait', 'landscape', 'square'].includes(job.generationSize)
      || typeof job.receiptAssetId !== 'string' || job.status !== 'authorized-prompt-frozen') {
      throw new Error(`Invalid image delivery contract for ${job.id}`);
    }
    return;
  }
  if (job.provider !== 'wisart-openai-compatible' || job.model !== 'gpt-image-2'
    || (job.upstreamPieVerified !== undefined && job.upstreamPieVerified !== false)) {
    throw new Error(`Invalid image provider contract for ${job.id}`);
  }
  if (!['1920x1080', '1024x1536'].includes(job.generationSize) || typeof job.receiptAssetId !== 'string' || job.status !== 'authorized-prompt-frozen') {
    throw new Error(`Invalid image delivery contract for ${job.id}`);
  }
}

/**
 * 画风迁移变体契约校验：67 项全量 WisArt 作业（27 立绘 + 12 背景 + 28 CG）。
 * 28 项 CG = 6 项正史回顾 CG + 22 项从 Latent 管线迁回的空白 CG
 * （实证：Latent 文本管线系统性丢失 canon Albina 义体人造人身份，且约四成
 * 交付带水印，故全部 CG 收敛到 WisArt reference-edit，风格板最后一项输入）。
 * 全部作业与 macro-crop 基线风格板严格互绑；frozen albina-visual-v2 的授权哈希
 * 不覆盖本变体，本变体显式取消人工授权，生产放行由内容哈希、来源绑定与
 * provider 合约校验把关。
 */
function validateMigrationInputs(plan, prompts, canonVisualSources, canonClaims) {
  if (plan.version !== '2.3.0-migration-v2' || plan.counts?.imageJobs !== 67 || plan.imageJobs?.length !== 67) {
    throw new Error('Invalid migration plan variant');
  }
  // promptVersion 锁定 v1：jobHash 含 per-job promptVersion，已产出记录均以 v1 签署，
  // 升字符串会使全部历史交付 stale（先例：22 项 CG 批次全 blocked）。
  if (prompts.promptVersion !== 'albina-visual-migration-v1' || prompts.prompts?.length !== 67) throw new Error('Invalid migration prompt freeze');
  if (typeof prompts.migration?.styleDirective !== 'string' || prompts.migration.styleDirective.length === 0) {
    throw new Error('Migration prompt freeze must carry a style directive');
  }
  const pending = plan.policy?.styleMigrationAuthorization;
  if (!pending || pending.required !== false || pending.humanWisartAuthorizationRequired !== false
    || pending.humanBoardReviewRequired !== false) {
    throw new Error('Migration plan must explicitly disable human authorization');
  }
  const boardSha256 = pending.styleBoardSha256;
  if (!hashPattern.test(boardSha256 ?? '') || prompts.migration.styleBoardSha256 !== boardSha256) {
    throw new Error('Migration style board hash mismatch');
  }
  if (plan.policy?.canonClaimsSha256 !== hash(JSON.stringify(canonClaims))) throw new Error('Migration plan canonClaimsSha256 mismatch');
  if (plan.policy?.canonVisualSourceIndexSha256 !== hash(JSON.stringify(canonVisualSources))) {
    throw new Error('Migration plan canonVisualSourceIndexSha256 mismatch');
  }
  const sourceById = validateCanonVisualSources(canonVisualSources);
  const board = sourceById.get('reference.user.albina-style-board');
  if (!board || board.sha256 !== boardSha256) throw new Error('Migration source index must register the bound style board');
  if (board.reviewStatus !== 'source-identified') throw new Error('Migration style board is not identified for production reference');
  const planById = new Map(plan.imageJobs.map((job) => [job.id, job]));
  const promptIds = new Set(prompts.prompts.map((entry) => entry.jobId));
  if (promptIds.size !== 67 || [...promptIds].some((id) => !planById.has(id))) throw new Error('Migration prompt coverage mismatch');
  for (const job of plan.imageJobs) {
    validatePlanJob(job);
    if (job.promptVersion !== 'albina-visual-migration-v1') throw new Error(`Migration job ${job.id} must use the migration prompt version`);
    if (job.styleMigration?.boardSha256 !== boardSha256 || job.styleMigration?.status !== 'authorization-not-required') {
      throw new Error(`Migration job ${job.id} must stay bound to the style board`);
    }
  }
  const claimById = validateCanonClaims(canonClaims);
  for (const prompt of prompts.prompts) {
    validatePrompt(prompt, planById, sourceById, claimById);
    validatePlanPromptBinding(planById.get(prompt.jobId), prompt);
    if (prompt.referenceSourceIds?.at(-1) !== 'reference.user.albina-style-board' || prompt.styleReferenceMode !== 'deidentified-image-last') {
      throw new Error(`Migration prompt ${prompt.jobId} must end with the de-identified style board`);
    }
  }
  const characters = plan.imageJobs.filter((job) => job.category === 'characters').length;
  const backgrounds = plan.imageJobs.filter((job) => job.category === 'bg').length;
  const cgs = plan.imageJobs.filter((job) => job.category === 'cg').length;
  if (characters !== 27 || backgrounds !== 12 || cgs !== 28) throw new Error(`Migration job mix must stay 27/12/28, got ${characters}/${backgrounds}/${cgs}`);
}

function validatePlanPromptBinding(job, prompt) {
  if (job.inputMode !== prompt.mode || JSON.stringify(job.referenceJobIds) !== JSON.stringify(prompt.referenceJobIds)
    || JSON.stringify(job.referenceSourceIds ?? []) !== JSON.stringify(prompt.referenceSourceIds ?? [])
    || JSON.stringify(job.canonClaimIds ?? []) !== JSON.stringify(prompt.canonClaimIds ?? [])) {
    throw new Error(`Visual plan and prompt freeze disagree for ${job.id}`);
  }
}

function validatePrompt(prompt, planById, sourceById, claimById) {
  const planJob = planById.get(prompt.jobId);
  const sourceIds = prompt.referenceSourceIds ?? [];
  const claimIds = prompt.canonClaimIds ?? [];
  if (!['text-generation', 'reference-edit'].includes(prompt.mode) || !Array.isArray(prompt.referenceJobIds) || !Array.isArray(sourceIds)) throw new Error(`Invalid prompt mode for ${prompt.jobId}`);
  if (typeof prompt.positivePrompt !== 'string' || prompt.positivePrompt.length < 40 || typeof prompt.negativePrompt !== 'string') throw new Error(`Incomplete prompt for ${prompt.jobId}`);
  if (!planJob || prompt.assetId !== planJob.assetId || !Array.isArray(prompt.reviewCriteria) || prompt.reviewCriteria.length === 0) throw new Error(`Prompt identity mismatch for ${prompt.jobId}`);
  if (prompt.referenceJobIds.some((id) => !planById.has(id) || id === prompt.jobId)) throw new Error(`Invalid prompt reference for ${prompt.jobId}`);
  if (sourceIds.some((id) => !sourceById.has(id)) || new Set(sourceIds).size !== sourceIds.length) throw new Error(`Invalid canon visual source reference for ${prompt.jobId}`);
  if (!Array.isArray(claimIds) || claimIds.some((id) => !claimById.has(id)) || new Set(claimIds).size !== claimIds.length) throw new Error(`Invalid canon claim reference for ${prompt.jobId}`);
  if ((prompt.mode === 'reference-edit') !== (prompt.referenceJobIds.length + sourceIds.length > 0)) throw new Error(`Prompt reference mode mismatch for ${prompt.jobId}`);
}

function validateCanonClaims(ledger) {
  if (ledger?.version !== 1 || !Array.isArray(ledger.claims)) throw new Error('Invalid canon claim ledger');
  const claimById = new Map();
  for (const claim of ledger.claims) {
    if (typeof claim?.id !== 'string' || claimById.has(claim.id) || typeof claim.statement !== 'string' || claim.statement.length === 0) throw new Error('Invalid canon claim ledger entry');
    claimById.set(claim.id, claim);
  }
  return claimById;
}

function validateCanonVisualSources(index) {
  if (index?.version !== 1 || !Array.isArray(index.assets)) throw new Error('Invalid canon visual source index');
  const sourceById = new Map();
  for (const source of index.assets) {
    if (typeof source?.id !== 'string' || sourceById.has(source.id) || typeof source.localPath !== 'string'
      || !hashPattern.test(source.sha256 ?? '') || source.usage !== 'production-reference-only' || source.redistribution !== 'forbidden') {
      throw new Error('Invalid canon visual source record');
    }
    sourceById.set(source.id, source);
  }
  return sourceById;
}

export async function runVisualBatch(options, environment = process.env) {
  // Latent 批次仍受 pilot gate 约束：不绕过既有门禁（pilot 审查先于全量放量）
  const planVariant = options.planVariant ?? 'frozen';
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const { plan, prompts, canonVisualSources } = await loadProductionInputs({ planVariant });
    const allEntries = selectImageJobs(plan, prompts, { mode: 'all', planVariant });
    const entryById = new Map(allEntries.map((entry) => [entry.job.id, entry]));
    const selected = selectImageJobs(plan, prompts, { ...options, planVariant });
    const ledger = await loadLedger();
    const pilotIds = planVariant === 'latent' ? latentPilotJobIds : planVariant === 'migration' ? migrationPilotJobIds : pilotJobIds;
    if (!options.skipPilotGate && selected.some(({ job }) => !pilotIds.includes(job.id)) && !await pilotGatePassed(ledger, entryById, canonVisualSources, pilotIds)) {
      throw new Error(`Full ${planVariant} production is locked until all ${pilotIds.length} provider-local pilot jobs have approved visual reviews`);
    }
    await preflightLocalMediaTools();
    const config = providerConfigs(environment);
    const results = [];
    for (const entry of selected) {
      if (results.length > 0 && options.intervalMs > 0) await delay(options.intervalMs);
      const result = await runJob(entry, ledger, config, options, entryById, canonVisualSources);
      results.push(result);
      if (result.status === 'ambiguous' || result.stopBatch) break;
    }
    return summarize(results);
  } finally {
    await releaseLock();
  }
}

export async function reviewVisualArtifacts(options) {
  // Pure argument validation stays outside the exclusive lock so a rejected command
  // cannot leave the ledger locked for a concurrent operator.
  if (!Array.isArray(options.ids) || options.ids.length === 0 || !['approved', 'rejected'].includes(options.decision)) throw new Error('A review decision and explicit job ids are required');
  if (typeof options.reviewer !== 'string' || options.reviewer.trim().length < 3) throw new Error('A named visual reviewer is required');
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const [{ plan, prompts, canonVisualSources }, ledger] = await Promise.all([loadProductionInputs({ planVariant: options.planVariant }), loadLedger()]);
    const entries = selectImageJobs(plan, prompts, { mode: 'all', planVariant: options.planVariant });
    const entryById = new Map(entries.map((entry) => [entry.job.id, entry]));
    const reviewed = [];
    for (const id of options.ids) reviewed.push(await reviewOne(ledger, id, options, entryById, canonVisualSources));
    await saveLedger(ledger);
    return reviewed;
  } finally {
    await releaseLock();
  }
}

export async function withVisualPromotionCandidates(options, action) {
  if (typeof action !== 'function') throw new Error('A visual promotion action is required');
  // Reject invalid id selections before taking the lock; only ledger-dependent
  // resolution (`--all` expansion) needs the exclusive section.
  validatePromotionIdOptions(options);
  const allowUnreviewedReferences = options.allowUnreviewedReferences === true;
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const [{ plan, prompts, canonVisualSources }, ledger] = await Promise.all([loadProductionInputs({ planVariant: options.planVariant }), loadLedger()]);
    const entries = selectImageJobs(plan, prompts, { mode: 'all', planVariant: options.planVariant });
    const entryById = new Map(entries.map((entry) => [entry.job.id, entry]));
    const ids = promotionIds(options, ledger);
    const candidates = [];
    for (const id of ids) {
      const entry = entryById.get(id);
      const record = ledger.jobs[id];
      if (!entry || !record) throw new Error(`Unknown visual production job: ${id}`);
      const approvedViaRevision = record.reviewContractRevision?.status === 'approved';
      if (record.status !== 'completed' || (record.review?.status !== 'approved' && !approvedViaRevision)) {
        throw new Error(`Visual artifact is not eligible for promotion: ${id}`);
      }
      const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]), allowUnreviewedReferences);
      const currentSourceJobHash = jobHash(entry, references);
      const currentReview = currentVisualContractReview(record, currentSourceJobHash, productionReviewCriteria(entry));
      if (!currentReview) throw new Error(`Visual artifact does not match the current contract: ${id}`);
      const deliveryPath = resolvePersistedJobPath(id, record.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u);
      if (basename(deliveryPath) !== `delivery-${String(record.activeAttempt).padStart(2, '0')}.${entry.job.delivery.format}`) {
        throw new Error(`Visual artifact does not match the active attempt: ${id}`);
      }
      const artifactSha256 = hash(await readFile(deliveryPath));
      if (artifactSha256 !== record.artifactSha256) throw new Error(`Visual artifact hash mismatch: ${id}`);
      await verifyRecordedReview(record, id);
      candidates.push({
        jobId: id,
        receiptAssetId: entry.job.receiptAssetId,
        outputPath: entry.job.path,
        provider: entry.job.provider,
        model: entry.job.model,
        upstreamPieVerified: false,
        promptVersion: entry.job.promptVersion,
        status: record.status,
        sourceJobHash: record.sourceJobHash,
        currentSourceJobHash,
        artifactSha256,
        deliveryPath,
        review: currentReview.review,
        reviewContractRevision: record.reviewContractRevision,
        currentReviewCriteria: productionReviewCriteria(entry),
        inputs: references.map(({ jobId, sha256, receiptAssetId, sourceId }) => ({
          jobId, sha256,
          ...(receiptAssetId ? { receiptAssetId } : {}),
          ...(sourceId ? { sourceId } : {}),
        })),
      });
    }
    return await action(candidates);
  } finally {
    await releaseLock();
  }
}

function validatePromotionIdOptions(options) {
  const explicit = options.ids ?? [];
  if (!Array.isArray(explicit) || explicit.some((id) => typeof id !== 'string' || id.length === 0)) {
    throw new Error('Visual promotion job ids are invalid');
  }
  if (options.all === true && explicit.length > 0) throw new Error('Choose either --all or explicit visual promotion ids');
  if (options.all !== true && explicit.length === 0) throw new Error('Visual promotion requires --all or explicit job ids');
  if (new Set(explicit).size !== explicit.length) throw new Error('Visual promotion job ids must be unique');
  return explicit;
}

function promotionIds(options, ledger) {
  const explicit = validatePromotionIdOptions(options);
  if (options.all === true) {
    return Object.entries(ledger.jobs)
      .filter(([, record]) => record.status === 'completed'
        && (record.review?.status === 'approved' || record.reviewContractRevision?.status === 'approved'))
      .map(([id]) => id)
      .sort();
  }
  return [...explicit].sort();
}

async function verifyRecordedReview(record, id) {
  // 契约修订路径下 record.review 可以缺席（修订即批准证据），此时只核验修订文件。
  if (typeof record.reviewPath !== 'string' && !record.reviewContractRevision) {
    throw new Error(`Visual review evidence is missing: ${id}`);
  }
  if (typeof record.reviewPath === 'string') {
    const reviewPath = resolvePersistedJobPath(id, record.reviewPath, /^review-\d+\.json$/u);
    if (basename(reviewPath) !== `review-${String(record.activeAttempt).padStart(2, '0')}.json`) {
      throw new Error(`Visual review does not match the active attempt: ${id}`);
    }
    const review = await readJson(reviewPath);
    if (JSON.stringify(review) !== JSON.stringify(record.review)) throw new Error(`Visual review evidence mismatch: ${id}`);
  }
  // 契约修订记录同样必须落盘核验：修订是批准证据的一部分，ledger 内嵌副本
  // 与磁盘文件不一致时视同审查证据失真，拒绝进入 promote 候选。
  if (record.reviewContractRevision) {
    if (typeof record.reviewContractRevisionPath !== 'string') throw new Error(`Visual review-contract evidence is missing: ${id}`);
    const revisionPath = resolvePersistedJobPath(id, record.reviewContractRevisionPath, /^review-contract-\d+-[a-f0-9]{64}\.json$/u);
    const revision = await readJson(revisionPath);
    if (JSON.stringify(revision) !== JSON.stringify(record.reviewContractRevision)) throw new Error(`Visual review-contract evidence mismatch: ${id}`);
  }
}

async function reviewOne(ledger, id, options, entryById, canonVisualSources) {
  const record = ledger.jobs[id];
  const entry = entryById.get(id);
  if (!record) throw new Error(`Unknown visual production job: ${id}`);
  if (!entry) throw new Error(`Visual job is absent from the current frozen plan: ${id}`);
  if (options.decision === 'approved') {
    // 与生产路径相同的引用语义：契约哈希必须按生产时的 allowUnreviewedReferences
    // 口径重算，否则以 awaiting-review 参考生成的交付永远无法通过审查。
    const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]), options.allowUnreviewedReferences === true);
    if (record.sourceJobHash !== jobHash(entry, references)) throw new Error(`Visual artifact contract is stale: ${id}`);
  }
  if (options.decision === 'approved' && (record.status !== 'awaiting-review' || !await validRecordedArtifact(record, id))) {
    throw new Error(`Visual artifact is not eligible for approval: ${id}`);
  }
  if (options.decision === 'rejected' && !['awaiting-review', 'needs-review'].includes(record.status)) throw new Error(`Visual artifact is not reviewable: ${id}`);
  const review = {
    status: options.decision, reviewer: options.reviewer.trim(), reviewedAt: new Date().toISOString(),
    criteria: (options.decision === 'approved'
      ? approvalCriteriaEvidence(productionReviewCriteria(entry), options.criteriaEvidence?.[id] ?? options.criteriaEvidence ?? [])
      : (record.reviewCriteria ?? []).map((criterion) => ({ criterion, status: 'failed' }))),
    ...(options.notes ? { notes: options.notes } : {}),
  };
  const reviewPath = resolve(stagingRoot, safe(id), `review-${String(record.activeAttempt).padStart(2, '0')}.json`);
  await atomicWrite(reviewPath, Buffer.from(`${JSON.stringify(review, null, 2)}\n`));
  ledger.jobs[id] = {
    ...record, status: options.decision === 'approved' ? 'completed' : 'rejected', review,
    reviewPath: relative(projectRoot, reviewPath).replaceAll('\\', '/'),
  };
  return { id, status: review.status };
}

export function isUsableX666ApiKey(value) {
  return typeof value === 'string' && /^sk-[a-z0-9_-]{20,}$/iu.test(value);
}

export async function adoptVisualReviewContract(options) {
  // Argument and plan-membership checks touch no ledger state, so they run before the
  // exclusive lock: a malformed command must never occupy the production lock.
  if (!Array.isArray(options.ids) || options.ids.length === 0) throw new Error('Visual review-contract adoption requires job ids');
  const planVariant = options.planVariant ?? 'frozen';
  if (!['frozen', 'latent', 'migration'].includes(planVariant)) throw new Error(`Unsupported plan variant: ${planVariant}`);
  const rawPlan = await readJson(planVariant === 'latent' ? latentPlanPath : planVariant === 'migration' ? migrationPlanPath : planPath);
  const knownIds = new Set((rawPlan.imageJobs ?? []).map((job) => job.id));
  const unknown = options.ids.filter((id) => !knownIds.has(id));
  if (unknown.length > 0) throw new Error(`Unknown image jobs: ${unknown.join(', ')}`);
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const [{ plan, prompts, canonVisualSources }, ledger] = await Promise.all([loadProductionInputs({ planVariant }), loadLedger()]);
    const entries = selectImageJobs(plan, prompts, { mode: 'all', planVariant });
    const entryById = new Map(entries.map((entry) => [entry.job.id, entry]));
    const results = [];
    for (const id of options.ids) {
      const entry = entryById.get(id);
      const record = ledger.jobs[id];
      if (!entry || !record) throw new Error(`Unknown image jobs: ${id}`);
      const references = await resolveReferenceInputs(
        entry.prompt, ledger, entryById, canonVisualSources, new Set([id]),
        options.allowUnreviewedReferences === true, /* allowStaleReferenceContracts */ true,
      );
      const currentJobHash = jobHash(entry, references);
      const updated = adoptVisualReviewContractRecord(record, currentJobHash, productionReviewCriteria(entry), {
        ...options, criteriaEvidence: options.criteriaEvidence?.[id],
      });
      const path = resolve(stagingRoot, safe(id), `review-contract-${String(record.activeAttempt).padStart(2, '0')}-${currentJobHash}.json`);
      updated.reviewContractRevisionPath = relative(projectRoot, path).replaceAll('\\', '/');
      await atomicWrite(path, Buffer.from(`${JSON.stringify(updated.reviewContractRevision, null, 2)}\n`));
      ledger.jobs[id] = updated;
      results.push({ id, status: 'approved', currentJobHash, artifactSha256: record.artifactSha256 });
    }
    await saveLedger(ledger);
    return results;
  } finally { await releaseLock(); }
}

export function isUsableWisartApiKey(value) {
  return typeof value === 'string' && /^sk-[a-z0-9_-]{20,}$/iu.test(value);
}

export function isUsableLatentApiKey(value) {
  return typeof value === 'string' && /^lat_sk_[a-z0-9_-]{10,}$/iu.test(value);
}

function providerConfig(environment) {
  const baseUrl = (environment.WISART_BASE_URL || defaultBaseUrl).replace(/\/$/u, '');
  if (baseUrl !== defaultBaseUrl) throw new Error(`WISART_BASE_URL must equal ${defaultBaseUrl}`);
  const configuredApiKey = environment.WISART_API_KEY;
  const apiKey = isUsableWisartApiKey(configuredApiKey) ? configuredApiKey : undefined;
  return { apiKey, invalidApiKey: Boolean(configuredApiKey) && !apiKey, baseUrl, timeoutMs: 300_000 };
}

export function resolveLatentBaseUrl(environment) {
  const modern = environment.LATENT_MOE_BASE_URL;
  const legacy = environment.LATENT_BASE_URL;
  if (modern && legacy && modern.replace(/\/$/u, '') !== legacy.replace(/\/$/u, '')) {
    throw new Error('LATENT_MOE_BASE_URL and LATENT_BASE_URL conflict');
  }
  const configured = modern ?? legacy;
  const baseUrl = (configured || defaultLatentBaseUrl).replace(/\/$/u, '');
  if (baseUrl !== defaultLatentBaseUrl) throw new Error(`LATENT_MOE_BASE_URL must equal ${defaultLatentBaseUrl}`);
  return baseUrl;
}

function latentProviderConfig(environment) {
  const baseUrl = resolveLatentBaseUrl(environment);
  // Provider config publishes LATENT_MOE_API_KEY. Accept the former local name
  // only as a backward-compatible fallback so a documented credential works.
  const configuredApiKey = environment.LATENT_MOE_API_KEY ?? environment.LATENT_API_KEY;
  const apiKey = isUsableLatentApiKey(configuredApiKey) ? configuredApiKey : undefined;
  return {
    apiKey,
    invalidApiKey: Boolean(configuredApiKey) && !apiKey,
    baseUrl,
    submitTimeoutMs: 60_000,
    pollIntervalMs: 5_000,
    maxPolls: 120,
  };
}

function providerConfigs(environment) {
  return { wisart: providerConfig(environment), latent: latentProviderConfig(environment) };
}

function selectProviderConfig(configs, provider) {
  if (provider === 'latent-moe') return { provider: 'latent-moe', ...configs.latent };
  return { provider: 'wisart-openai-compatible', ...configs.wisart };
}

async function pilotGatePassed(ledger, entryById, canonVisualSources, pilotIds = pilotJobIds) {
  const checks = await Promise.all(pilotIds.map(async (id) => {
    const record = ledger.jobs[id];
    const entry = entryById.get(id);
    if (!entry || record?.status !== 'completed' || record.review?.status !== 'approved' || !await validRecordedArtifact(record, id)) return false;
    try {
      const references = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([id]));
      return record.sourceJobHash === jobHash(entry, references);
    } catch { return false; }
  }));
  return checks.every(Boolean);
}

async function runJob(entry, ledger, configs, options, entryById, canonVisualSources) {
  let referenceInputs;
  try {
    referenceInputs = await resolveReferenceInputs(
      entry.prompt,
      ledger,
      entryById,
      canonVisualSources,
      new Set([entry.job.id]),
      options.allowUnreviewedReferences === true,
    );
  } catch (error) {
    return { id: entry.job.id, status: 'blocked', error: publicError(error) };
  }
  const sourceJobHash = jobHash(entry, referenceInputs);
  const previous = ledger.jobs[entry.job.id];
  if (['running', 'ambiguous'].includes(previous?.status)) {
    return { id: entry.job.id, status: 'ambiguous', error: 'Previous paid request has an uncertain outcome; automatic resubmission is disabled' };
  }
  const sameContract = previous?.sourceJobHash === sourceJobHash;
  if (previous && !sameContract && !options.regenerate) {
    return { id: entry.job.id, status: 'contract-changed', error: 'Generation contract changed; explicit --regenerate with this job id is required', stopBatch: true };
  }
  if (!options.regenerate && sameContract && previous?.status === 'completed' && previous.review?.status === 'approved' && await validRecordedArtifact(previous, entry.job.id)) {
    return { id: entry.job.id, status: 'skipped', artifactSha256: previous.artifactSha256 };
  }
  if (!options.regenerate && sameContract && previous?.status === 'awaiting-review' && await validRecordedArtifact(previous, entry.job.id)) {
    return { id: entry.job.id, status: 'awaiting-review', artifactSha256: previous.artifactSha256 };
  }
  if (!options.regenerate && sameContract && canResumeProcessing(previous)) {
    return resumeProcessing(entry, ledger, previous, referenceInputs, options);
  }
  if (!options.regenerate && sameContract && previous?.status === 'needs-review') {
    return { id: entry.job.id, status: 'needs-review', error: previous.error ?? 'Generated artifact requires review', stopBatch: options.mode === 'pilot' };
  }
  if (!options.regenerate && sameContract && previous?.status === 'rejected') {
    return { id: entry.job.id, status: 'needs-review', error: 'Artifact was rejected; explicit --regenerate with this job id is required', stopBatch: options.mode === 'pilot' };
  }
  if (!options.regenerate && sameContract && previous?.status === 'failed') {
    return { id: entry.job.id, status: 'failed', error: previous.error ?? 'Previous request failed; explicit --regenerate is required', stopBatch: true };
  }
  return submitPaidRequest(entry, ledger, configs, options, referenceInputs, sourceJobHash);
}

// 普通批次与授权重试共用的付费提交路径。overrides 仅限内部授权重试使用：
// requestKey 必须与 ambiguous retry 授权工件中的 authorizedNewRequestKey 一致；
// resubmission 会在 setLedgerJob 归档旧 ambiguous 记录后立刻挂到新 running 记录上，
// 使 ledger 在任何持久化时刻都满足 resubmission 链校验（防止半途可读的孤儿付费请求）。
async function submitPaidRequest(entry, ledger, configs, options, referenceInputs, sourceJobHash, overrides = {}) {
  const config = overrides.config ?? selectProviderConfig(configs, entry.job.provider);
  if (!config.apiKey) return {
    id: entry.job.id,
    status: 'failed',
    error: config.invalidApiKey
      ? (config.provider === 'latent-moe' ? 'LATENT_MOE_API_KEY is not a usable lat_sk_ credential' : 'WISART_API_KEY is not a usable sk- credential')
      : (config.provider === 'latent-moe' ? 'LATENT_MOE_API_KEY is required for a new paid request' : 'WISART_API_KEY is required for a new paid request'),
    stopBatch: true,
  };
  const attempt = maximumAttempt(ledger.jobs[entry.job.id]?.attempts) + 1;
  const requestKey = overrides.requestKey ?? hash(JSON.stringify({ sourceJobHash, attempt, regeneration: options.regenerate === true, provider: config.provider }));
  const jobDirectory = resolve(stagingRoot, safe(entry.job.id));
  await mkdir(jobDirectory, { recursive: true });
  setLedgerJob(ledger, entry, sourceJobHash, requestKey, attempt, 'running');
  if (overrides.resubmission) ledger.jobs[entry.job.id].resubmission = overrides.resubmission;
  await saveLedger(ledger);
  let responseReceived = false;
  try {
    const response = await requestImage(entry, referenceInputs, config, requestKey);
    responseReceived = true;
    const rawRecord = await saveRawResponse(jobDirectory, attempt, response);
    recordProviderCompletion(ledger, entry.job.id, attempt, response, rawRecord);
    await saveLedger(ledger);
    return processRecordedResponse(entry, ledger, response, rawRecord, referenceInputs, options);
  } catch (error) {
    const rawRecord = error instanceof ProviderError ? await saveRawResponse(jobDirectory, attempt, error.response) : undefined;
    const ambiguous = responseReceived || isAmbiguousRequestError(error);
    failLedgerJob(ledger, entry.job.id, attempt, error, ambiguous, rawRecord);
    await saveLedger(ledger);
    return { id: entry.job.id, status: ambiguous ? 'ambiguous' : 'failed', error: publicError(error), stopBatch: true };
  }
}

export async function resolveReferenceInputs(prompt, ledger, entryById, canonVisualSources, ancestors = new Set(), allowUnreviewedReferences = false, allowStaleReferenceContracts = false) {
  const sourceById = new Map(canonVisualSources.assets.map((source) => [source.id, source]));
  const sourceInputs = await Promise.all((prompt.referenceSourceIds ?? []).map(async (sourceId) => {
    const source = sourceById.get(sourceId);
    if (!source || source.reviewStatus !== 'source-identified') throw new Error(`Canon visual source is not approved for production reference: ${sourceId}`);
    const path = resolveCanonVisualSourcePath(source.localPath);
    const bytes = await readFile(path);
    if (hash(bytes) !== source.sha256 || bytes.length !== source.bytes) throw new Error(`Canon visual source hash mismatch: ${sourceId}`);
    if (bytes.length > 4 * 1024 * 1024) throw new Error(`Canon visual source exceeds the verified 4 MiB edit limit: ${sourceId}`);
    return { jobId: sourceId, path, bytes, sha256: source.sha256, sourceId };
  }));
  // Latent prompt records are text-only and carry no referenceJobIds by
  // design; an absent field must resolve to zero reference inputs, never to
  // a blocked job (runJob surfaces thrown errors as blocked).
  const jobInputs = await Promise.all((prompt.referenceJobIds ?? []).map(async (jobId) => {
    const reference = ledger.jobs[jobId];
    const parentEntry = entryById.get(jobId);
    if (!parentEntry || ancestors.has(jobId)) throw new Error(`Reference job is absent or cyclic: ${jobId}`);
    const usableStatus = reference?.status === 'completed'
      || (allowUnreviewedReferences && reference?.status === 'awaiting-review');
    if (!usableStatus || (!allowUnreviewedReferences && reference.review?.status !== 'approved') || !hashPattern.test(reference.artifactSha256 ?? '')) {
      throw new Error(`Reference job is not available: ${jobId}`);
    }
    const path = resolvePersistedJobPath(jobId, reference.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u);
    const bytes = await readFile(path);
    if (hash(bytes) !== reference.artifactSha256) throw new Error(`Reference artifact hash mismatch: ${jobId}`);
    if (bytes.length > 4 * 1024 * 1024) throw new Error(`Reference artifact exceeds the verified 4 MiB edit limit: ${jobId}`);
    const parentAncestors = new Set(ancestors); parentAncestors.add(jobId);
    const parentInputs = await resolveReferenceInputs(
      parentEntry.prompt,
      ledger,
      entryById,
      canonVisualSources,
      parentAncestors,
      allowUnreviewedReferences,
      allowStaleReferenceContracts,
    );
    const parentHash = jobHash(parentEntry, parentInputs);
    // 已批准的契约修订（reviewContractRevision）同样能认证参考交付：修订保留了
    // generationJobHash/artifactSha256 绑定，跨引用传播时无需重放原始生成契约。
    const referenceUsable = currentVisualContractReview(reference, parentHash, productionReviewCriteria(parentEntry));
    if (!referenceUsable && !allowStaleReferenceContracts) throw new Error(`Reference job contract is stale: ${jobId}`);
    return { jobId, path, bytes, sha256: reference.artifactSha256, receiptAssetId: reference.receiptAssetId };
  }));
  return orderResolvedReferenceInputs(sourceInputs, jobInputs);
}

async function validRecordedArtifact(record, jobId = record?.jobId) {
  if (!record.deliveryPath || !hashPattern.test(record.artifactSha256 ?? '')) return false;
  try { return hash(await readFile(resolvePersistedJobPath(jobId, record.deliveryPath, /^delivery-\d+\.(?:jpg|png)$/u))) === record.artifactSha256; } catch { return false; }
}

function canResumeProcessing(record) {
  return typeof record?.rawResponsePath === 'string' && hashPattern.test(record.responseSha256 ?? '')
    && ['provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed'].includes(record.status);
}

async function resumeProcessing(entry, ledger, record, references, options) {
  try {
    const response = await loadRecordedResponse(record);
    const rawRecord = { rawResponsePath: record.rawResponsePath, responseSha256: record.responseSha256, responseMetaPath: record.responseMetaPath };
    return processRecordedResponse(entry, ledger, response, rawRecord, references, options);
  } catch (error) {
    markProcessingFailure(ledger, entry.job.id, error);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'needs-review', error: publicError(error), stopBatch: true };
  }
}

async function processRecordedResponse(entry, ledger, response, rawRecord, references, options) {
  const jobDirectory = resolve(stagingRoot, safe(entry.job.id));
  try {
    const source = await loadOrMaterializeSource(response.body, jobDirectory, ledger.jobs[entry.job.id]);
    recordSourceMaterialized(ledger, entry.job.id, source);
    await saveLedger(ledger);
    const artifact = await prepareDelivery(entry.job, source, jobDirectory, ledger.jobs[entry.job.id].activeAttempt);
    recordArtifactReady(ledger, entry, ledger.jobs[entry.job.id].sourceJobHash, response, rawRecord, artifact, references);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'awaiting-review', artifactSha256: artifact.sha256 };
  } catch (error) {
    markProcessingFailure(ledger, entry.job.id, error);
    await saveLedger(ledger);
    return { id: entry.job.id, status: 'needs-review', error: publicError(error), stopBatch: true };
  }
}

function jobHash(entry, references) {
  const contract = {
    id: entry.job.id, assetId: entry.job.assetId, receiptAssetId: entry.job.receiptAssetId, path: entry.job.path,
    provider: entry.job.provider, model: entry.job.model,
    upstreamPieVerified: false, promptVersion: entry.job.promptVersion ?? entry.prompt.promptVersion ?? 'albina-visual-v2', mode: entry.prompt.mode,
    finalPrompt: entry.finalPrompt, reviewCriteria: entry.prompt.reviewCriteria,
    canonClaimIds: entry.prompt.canonClaimIds ?? [],
    sceneIds: entry.job.sceneIds, sourceTextHashes: entry.job.sourceTextHashes,
    generationSize: entry.job.generationSize, delivery: entry.job.delivery,
    inputs: references.map(({ jobId, sha256 }) => ({ jobId, sha256 })),
  };
  return hash(JSON.stringify(contract));
}

async function requestImage(entry, references, config, idempotencyKey) {
  if (config.provider === 'latent-moe') return requestLatentImage(entry, config, idempotencyKey);
  return requestWisartImage(entry, references, config, idempotencyKey);
}

export const requestLatentImageForTest = requestLatentImage;

async function requestWisartImage(entry, references, config, idempotencyKey) {
  const endpoint = references.length > 0 ? '/images/edits' : '/images/generations';
  let request;
  try { request = references.length > 0 ? await editRequest(entry, references) : generationRequest(entry); }
  catch (error) { throw new RequestPhaseError('preflight', error); }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), config.timeoutMs);
  try {
    let response;
    try {
      response = await fetch(`${config.baseUrl}${endpoint}`, {
        method: 'POST', headers: { Authorization: `Bearer ${config.apiKey}`, 'Idempotency-Key': idempotencyKey, ...request.headers },
        body: request.body, signal: controller.signal,
      });
    } catch (error) { throw new RequestPhaseError('submitting', error); }
    let rawBytes;
    try { rawBytes = await readResponseLimited(response, 48 * 1024 * 1024); }
    catch (error) { throw new RequestPhaseError('response-received', error); }
    const body = parseResponseBody(rawBytes.toString('utf8'));
    const metadata = {
      status: response.status, requestId: response.headers.get('x-oneapi-request-id'), endpoint,
      contentType: response.headers.get('content-type'), rawBytes, body,
    };
    if (!response.ok) throw new ProviderError(response.status, metadata);
    return metadata;
  } finally {
    clearTimeout(timeout);
  }
}

function latentResolutionForJob(generationSize) {
  if (generationSize === '1920x1080') return 'landscape';
  if (generationSize === '1024x1536' || generationSize === 'portrait') return 'portrait';
  if (generationSize === 'square') return 'square';
  throw new Error(`Unsupported Latent resolution mapping for ${generationSize}`);
}

async function requestLatentImage(entry, config, idempotencyKey) {
  // 参数优先取 freeze/latent prompt 契约中的值（latentRequest），缺省回落到已验证默认值
  const spec = entry.prompt?.latentRequest ?? {};
  const submitPayload = {
    prompt: entry.finalPrompt,
    steps: spec.steps ?? 8,
    resolution: spec.resolution ?? latentResolutionForJob(entry.job.generationSize),
    sampler: spec.sampler ?? 'euler',
    scheduler: spec.scheduler ?? 'normal',
  };
  // Latent 的 GenerationRequest 支持 negativePrompt（<=2000 字符）；省略时站点默认负面词
  // 不会被套用，因此 freeze 里声明的排除项必须显式随请求发出，否则等于没有负面约束。
  if (typeof spec.negativePrompt === 'string' && spec.negativePrompt.length > 0) {
    submitPayload.negativePrompt = spec.negativePrompt.slice(0, 2000);
  }
  const submitBody = JSON.stringify(submitPayload);
  const submitController = new AbortController();
  const submitTimer = setTimeout(() => submitController.abort(), config.submitTimeoutMs);
  let submitResponse;
  try {
    try {
      submitResponse = await fetch(`${config.baseUrl}/api/generate`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${config.apiKey}`, 'Content-Type': 'application/json', 'Idempotency-Key': idempotencyKey },
        body: submitBody,
        signal: submitController.signal,
      });
    } catch (error) { throw new RequestPhaseError('submitting', error); }
    let submitRaw;
    try { submitRaw = await readResponseLimited(submitResponse, 1 * 1024 * 1024); }
    catch (error) { throw new RequestPhaseError('response-received', error); }
    const submitBodyJson = parseResponseBody(submitRaw.toString('utf8'));
    const submitMeta = {
      status: submitResponse.status,
      endpoint: '/api/generate',
      contentType: submitResponse.headers.get('content-type'),
      rawBytes: submitRaw,
      body: submitBodyJson,
    };
    if (!submitResponse.ok) throw new ProviderError(submitResponse.status, submitMeta);
    if (submitBodyJson?.error === 'too_many_active') throw new ProviderError(409, submitMeta);
    const jobId = submitBodyJson?.id;
    if (typeof jobId !== 'string' || jobId.length === 0) throw new ProviderError(submitResponse.status, submitMeta);

    let finalJob = submitBodyJson;
    for (let poll = 0; poll < config.maxPolls; poll += 1) {
      await delay(config.pollIntervalMs);
      const pollController = new AbortController();
      const pollTimer = setTimeout(() => pollController.abort(), config.submitTimeoutMs);
      let pollResponse;
      try {
        pollResponse = await fetch(`${config.baseUrl}/api/generate/${jobId}`, {
          headers: { Authorization: `Bearer ${config.apiKey}` },
          signal: pollController.signal,
        });
      } catch (error) { clearTimeout(pollTimer); throw new RequestPhaseError('polling', error); }
      clearTimeout(pollTimer);
      let pollRaw;
      try { pollRaw = await readResponseLimited(pollResponse, 64 * 1024); }
      catch (error) { throw new RequestPhaseError('polling', error); }
      const pollJson = parseResponseBody(pollRaw.toString('utf8'));
      const pollMeta = {
        status: pollResponse.status,
        endpoint: `/api/generate/${jobId}`,
        contentType: pollResponse.headers.get('content-type'),
        rawBytes: pollRaw,
        body: pollJson,
      };
      if (!pollResponse.ok) throw new ProviderError(pollResponse.status, pollMeta);
      finalJob = pollJson;
      if (finalJob?.status === 'succeeded' && typeof finalJob.artworkId === 'string') break;
      if (finalJob?.status === 'failed') throw new ProviderError(422, pollMeta);
    }

    const artworkId = finalJob?.artworkId;
    if (typeof artworkId !== 'string' || artworkId.length === 0) {
      throw new Error(`Latent job ${jobId} did not produce an artworkId after ${config.maxPolls} polls`);
    }

    const mediaController = new AbortController();
    const mediaTimer = setTimeout(() => mediaController.abort(), config.submitTimeoutMs);
    let mediaResponse;
    try {
      mediaResponse = await fetch(`${config.baseUrl}/api/media/${artworkId}`, {
        headers: { Authorization: `Bearer ${config.apiKey}` },
        signal: mediaController.signal,
      });
    } catch (error) { clearTimeout(mediaTimer); throw new RequestPhaseError('media-fetch', error); }
    clearTimeout(mediaTimer);
    let mediaRaw;
    try { mediaRaw = await readResponseLimited(mediaResponse, 48 * 1024 * 1024); }
    catch (error) { throw new RequestPhaseError('media-fetch', error); }
    const mediaMeta = {
      status: mediaResponse.status,
      endpoint: `/api/media/${artworkId}`,
      contentType: mediaResponse.headers.get('content-type'),
      rawBytes: mediaRaw,
      body: { data: [{ b64_json: mediaRaw.toString('base64') }] },
    };
    if (!mediaResponse.ok) throw new ProviderError(mediaResponse.status, mediaMeta);
    inspectPng(mediaRaw);
    return {
      status: 200,
      requestId: jobId,
      endpoint: 'latent-async',
      contentType: 'image/png',
      rawBytes: mediaRaw,
      body: mediaMeta.body,
      latentJobId: jobId,
      latentArtworkId: artworkId,
      latentSubmitResponse: submitBodyJson,
      latentFinalJob: finalJob,
    };
  } finally {
    clearTimeout(submitTimer);
  }
}

async function readResponseLimited(response, maximumBytes) {
  const declared = Number(response.headers.get('content-length'));
  if (Number.isFinite(declared) && declared > maximumBytes) throw new Error(`Provider response exceeds ${maximumBytes} bytes`);
  if (!response.body) return Buffer.alloc(0);
  const reader = response.body.getReader();
  const chunks = []; let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maximumBytes) { await reader.cancel(); throw new Error(`Provider response exceeds ${maximumBytes} bytes`); }
    chunks.push(Buffer.from(value));
  }
  return Buffer.concat(chunks, total);
}

function generationRequest(entry) {
  const payload = commonRequestFields(entry);
  return { headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) };
}

export async function editRequest(entry, references) {
  if (!Array.isArray(references) || references.length < 1 || references.length > 16) {
    throw new Error('WisArt edit references must be between 1 and 16 inputs');
  }
  const form = new FormData();
  for (const [key, value] of Object.entries(commonRequestFields(entry))) form.append(key, String(value));
  for (const reference of references) {
    const extension = reference.path.toLowerCase().endsWith('.jpg') || reference.path.toLowerCase().endsWith('.jpeg') ? 'jpg' : 'png';
    form.append('image', new Blob([reference.bytes], { type: mimeFor(reference.path) }), `${safe(reference.jobId)}.${extension}`);
  }
  return { headers: {}, body: form };
}

export function currentVisualContractReview(record, currentJobHash, currentCriteria) {
  if (!record || typeof currentJobHash !== 'string' || !Array.isArray(currentCriteria) || currentCriteria.length === 0) return undefined;
  const revision = record.reviewContractRevision;
  if (revision?.status === 'approved' && revision.currentJobHash === currentJobHash
    && revision.generationJobHash === record.sourceJobHash && revision.artifactSha256 === record.artifactSha256) {
    try {
      const criteria = approvalCriteriaEvidence(currentCriteria, revision.criteria);
      return { kind: 'revision', review: { ...revision, criteria } };
    } catch { return undefined; }
  }
  if (record.sourceJobHash !== currentJobHash || record.review?.status !== 'approved') return undefined;
  try {
    const criteria = approvalCriteriaEvidence(currentCriteria, record.review.criteria);
    return { kind: 'generation', review: { ...record.review, criteria } };
  } catch { return undefined; }
}

export function adoptVisualReviewContractRecord(record, currentJobHash, currentCriteria, options, reviewedAt = new Date().toISOString()) {
  if (!record || typeof record !== 'object' || typeof currentJobHash !== 'string' || !hashPattern.test(currentJobHash)) {
    throw new Error('Visual review contract adoption is invalid');
  }
  if (options?.decision !== 'approved' || typeof options.reviewer !== 'string' || options.reviewer.trim().length === 0
    || typeof options.reason !== 'string' || options.reason.trim().length === 0
    || typeof options.notes !== 'string' || options.notes.trim().length === 0) {
    throw new Error('Visual review contract adoption requires reviewer, reason, and notes');
  }
  const criteria = approvalCriteriaEvidence(currentCriteria, options.criteriaEvidence);
  const revision = {
    version: 1, status: 'approved', generationHistoryPreserved: true,
    generationJobHash: record.sourceJobHash, currentJobHash, artifactSha256: record.artifactSha256,
    reviewer: options.reviewer.trim(), reviewedAt, reason: options.reason.trim(), notes: options.notes.trim(), criteria,
  };
  return {
    ...record,
    status: 'completed',
    reviewContractRevision: revision,
    reviewContractRevisionPath: record.reviewContractRevisionPath,
  };
}

export function resolveDefinitiveFailureRecord(record, rawBytes, metadata, resolvedAt = new Date().toISOString()) {
  if (!record || !hashPattern.test(record.responseSha256 ?? '') || !Buffer.isBuffer(rawBytes)
    || hash(rawBytes) !== record.responseSha256 || metadata?.responseSha256 !== record.responseSha256
    || !Number.isInteger(metadata?.status) || metadata.status < 400) {
    throw new Error('Stored response is not a definitive failure');
  }
  let body;
  try { body = JSON.parse(rawBytes.toString('utf8')); } catch { body = undefined; }
  const providerErrorType = body?.error?.type;
  if (metadata.status >= 500 && !providerErrorType) throw new Error('Stored response is not a definitive failure');
  if (isAmbiguousProviderResponse(metadata.status, body)) throw new Error('Stored response is not a definitive failure');
  return {
    ...record,
    status: 'failed',
    resolution: { status: 'definitive-failure', providerErrorType: providerErrorType ?? body?.error?.code ?? 'http-error', resolvedAt },
    attempts: (record.attempts ?? []).map((attempt) => attempt.attempt === record.activeAttempt ? { ...attempt, status: 'failed', resolvedAt } : attempt),
  };
}

/**
 * 不确定付费结果的统一判定：ambiguous 是显式的不确定态；被强杀进程遗留的
 * running 记录（无响应证据）在语义上完全等价——付费请求可能已到达 provider，
 * 自动重提必须走同一条授权链，绝不静默重发。
 */
export function isUncertainPaidOutcome(record) {
  return Boolean(record) && (record.status === 'ambiguous'
    || (record.status === 'running' && !record.responseSha256));
}

export function validateAmbiguousRetryOptions(options) {
  if (!options || typeof options.id !== 'string' || options.id.trim().length === 0) throw new Error('Retry id is required');
  if (typeof options.operator !== 'string' || options.operator.trim().length < 3) throw new Error('Retry operator is required');
  if (typeof options.reason !== 'string' || options.reason.trim().length === 0) throw new Error('Retry reason is required');
  if (!Number.isInteger(options.expectedAttempt) || options.expectedAttempt < 1) throw new Error('Retry expected attempt is invalid');
  for (const key of ['expectedRequestKey', 'expectedSourceJobHash']) if (!hashPattern.test(options[key] ?? '')) throw new Error(`Retry ${key} is invalid`);
  for (const key of ['expectedCurrentContractSha256', 'expectedFinalPromptSha256']) if (options[key] !== undefined && !hashPattern.test(options[key])) throw new Error(`Retry ${key} is invalid`);
  if (!Array.isArray(options.expectedReferenceInputs ?? [])) throw new Error('Retry reference inputs are invalid');
  if (options.expectedReferenceInputs?.some((input) => !input || typeof input.jobId !== 'string' || !hashPattern.test(input.sha256 ?? ''))) throw new Error('Retry reference inputs are invalid');
  if (options.acknowledgePossibleDuplicateCharge !== true) throw new Error('Retry must acknowledge possible duplicate charge');
  return options;
}

export function createAmbiguousRetryAuthorization(entry, record, sourceJobHash, references, options, generated) {
  validateAmbiguousRetryOptions(options);
  if (!record || !isUncertainPaidOutcome(record) || record.activeAttempt !== options.expectedAttempt
    || record.requestKey !== options.expectedRequestKey || record.sourceJobHash !== options.expectedSourceJobHash) {
    throw new Error('Ambiguous retry does not match the superseded paid request');
  }
  const ordered = references.map(({ jobId, sha256 }) => ({ jobId, sha256 }));
  if (options.expectedCurrentContractSha256 && sourceJobHash !== options.expectedCurrentContractSha256) throw new Error('Retry does not match the current contract');
  if (options.expectedReferenceInputs && JSON.stringify(options.expectedReferenceInputs) !== JSON.stringify(ordered)) throw new Error('Retry does not match the current contract');
  const finalPromptSha256 = hash(entry.finalPrompt);
  if (options.expectedFinalPromptSha256 && finalPromptSha256 !== options.expectedFinalPromptSha256) throw new Error('Retry does not match the current contract');
  if (!generated || typeof generated.authorizationId !== 'string' || typeof generated.authorizedAt !== 'string' || !hashPattern.test(generated.requestKey ?? '')) throw new Error('Retry authorization metadata is invalid');
  const authorization = {
    version: 1, authorizationId: generated.authorizationId, authorizedAt: generated.authorizedAt,
    operator: options.operator.trim(), reason: options.reason.trim(), jobId: record.jobId,
    provider: 'wisart-openai-compatible', baseUrl: 'https://wisart.kuaileshifu.com/v1', model: 'gpt-image-2',
    endpoint: '/images/edits', responseFormat: 'b64_json', supersededAttempt: record.activeAttempt,
    supersededRequestKey: record.requestKey, supersededSourceJobHash: record.sourceJobHash,
    currentContractSha256: sourceJobHash, finalPromptSha256, referenceInputs: ordered,
    authorizedNextAttempt: record.activeAttempt + 1, authorizedNewRequestKey: generated.requestKey,
    acknowledgedPossibleDuplicateCharge: true,
  };
  return { ...authorization, authorizationSha256: hash(JSON.stringify(authorization)) };
}

export function validateAmbiguousRetryAuthorization(value) {
  if (!value || value.version !== 1 || typeof value.authorizationId !== 'string' || typeof value.jobId !== 'string'
    || value.provider !== 'wisart-openai-compatible' || value.model !== 'gpt-image-2' || value.endpoint !== '/images/edits'
    || value.responseFormat !== 'b64_json' || !Number.isInteger(value.supersededAttempt) || !Number.isInteger(value.authorizedNextAttempt)
    || value.authorizedNextAttempt !== value.supersededAttempt + 1 || value.acknowledgedPossibleDuplicateCharge !== true
    || !Array.isArray(value.referenceInputs) || !hashPattern.test(value.supersededRequestKey ?? '')
    || !hashPattern.test(value.supersededSourceJobHash ?? '') || !hashPattern.test(value.currentContractSha256 ?? '')
    || !hashPattern.test(value.finalPromptSha256 ?? '') || !hashPattern.test(value.authorizedNewRequestKey ?? '')) {
    throw new Error('Invalid ambiguous retry authorization');
  }
  const expectedHash = hash(JSON.stringify(Object.fromEntries(Object.entries(value).filter(([key]) => key !== 'authorizationSha256'))));
  if (value.authorizationSha256 !== expectedHash) throw new Error('Ambiguous retry authorization hash mismatch');
  return value;
}

export function validateAmbiguousRetryLink(jobId, record, authorization) {
  const value = validateAmbiguousRetryAuthorization(authorization);
  const link = record?.resubmission;
  if (!record || record.jobId !== jobId || record.requestKey !== value.authorizedNewRequestKey || record.activeAttempt !== value.authorizedNextAttempt
    || record.sourceJobHash !== value.currentContractSha256 || !link || link.authorizationId !== value.authorizationId
    || link.authorizationSha256 !== value.authorizationSha256 || link.supersededAttempt !== value.supersededAttempt
    || link.supersededRequestKey !== value.supersededRequestKey || link.supersededSourceJobHash !== value.supersededSourceJobHash
    || link.authorizedNewRequestKey !== value.authorizedNewRequestKey
    || (link.currentContractSha256 !== undefined && link.currentContractSha256 !== value.currentContractSha256)
    || (link.finalPromptSha256 !== undefined && link.finalPromptSha256 !== value.finalPromptSha256)
    || (link.referenceInputs !== undefined && JSON.stringify(link.referenceInputs) !== JSON.stringify(value.referenceInputs))) {
    throw new Error('Ambiguous retry link risks a duplicate paid request');
  }
  return value;
}

export async function verifyAmbiguousRetryAuthorizationEvidence(jobId, record) {
  const path = resolvePersistedJobPath(jobId, record?.resubmission?.authorizationPath, /^ambiguous-retry-authorization-\d+-to-\d+-.+\.json$/u);
  const value = validateAmbiguousRetryAuthorization(JSON.parse(await readFile(path, 'utf8')));
  validateAmbiguousRetryLink(jobId, record, value);
}

function resolveRetryPlanVariant(options) {
  const variant = options.planVariant ?? 'frozen';
  if (!['frozen', 'latent', 'migration'].includes(variant)) throw new Error(`Unsupported plan variant: ${variant}`);
  return variant;
}

async function resolveRetryEntry(options, planVariant) {
  const { plan, prompts, canonVisualSources } = await loadProductionInputs({ planVariant });
  const entries = selectImageJobs(plan, prompts, { mode: 'all', planVariant });
  const entry = entries.find(({ job }) => job.id === options.id);
  if (!entry) throw new Error(`Unknown image jobs: ${options.id}`);
  return { entry, entries, canonVisualSources };
}

async function writeAmbiguousRetryAuthorization(entry, record, currentHash, references, options, requestKey) {
  const authorization = createAmbiguousRetryAuthorization(entry, record, currentHash, references, options, {
    authorizationId: `retry-${record.activeAttempt}-to-${record.activeAttempt + 1}-${Date.now()}`,
    authorizedAt: new Date().toISOString(), requestKey,
  });
  const directory = resolve(stagingRoot, safe(options.id));
  const authorizationPath = relative(projectRoot, resolve(directory, `ambiguous-retry-authorization-${record.activeAttempt}-to-${record.activeAttempt + 1}-${authorization.authorizationId}.json`)).replaceAll('\\', '/');
  await atomicWrite(resolve(projectRoot, authorizationPath), Buffer.from(`${JSON.stringify(authorization, null, 2)}\n`));
  return { authorization, authorizationPath };
}

// 授权验证器：锁外复核证据并落盘授权工件，绝不提交付费请求。
export async function retryAmbiguousVisual(options, environment = process.env) {
  validateAmbiguousRetryOptions(options);
  const planVariant = resolveRetryPlanVariant(options);
  const { entry, entries, canonVisualSources } = await resolveRetryEntry(options, planVariant);
  const ledger = await loadLedger();
  const record = ledger.jobs[options.id];
  if (!isUncertainPaidOutcome(record)) throw new Error('Visual job is not eligible for ambiguous retry');
  const entryById = new Map(entries.map((item) => [item.job.id, item]));
  const refs = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([options.id]), options.allowUnreviewedReferences === true);
  const currentHash = jobHash(entry, refs);
  const { authorization, authorizationPath } = await writeAmbiguousRetryAuthorization(entry, record, currentHash, refs, options, hash(`${options.id}:${Date.now()}`));
  return {
    id: options.id, status: 'authorized', planVariant,
    authorizationId: authorization.authorizationId, authorizationPath,
    supersededAttempt: record.activeAttempt, authorizedNextAttempt: authorization.authorizedNextAttempt,
  };
}

// 授权重试执行路径：锁内复核证据 → 落盘授权工件 → 复用付费提交路径（requestKey 与
// resubmission 链经 overrides 注入，由 setLedgerJob 归档旧 ambiguous 记录后挂到新记录）。
export async function executeAmbiguousRetry(options, environment = process.env) {
  validateAmbiguousRetryOptions(options);
  const planVariant = resolveRetryPlanVariant(options);
  const { entry, entries, canonVisualSources } = await resolveRetryEntry(options, planVariant);
  const configs = providerConfigs(environment);
  const config = selectProviderConfig(configs, entry.job.provider);
  if (!config.apiKey) throw new Error(config.invalidApiKey
    ? 'Provider API key is configured but not usable for the authorized retry'
    : `Provider API key is required for the authorized retry of ${options.id}`);
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock === true);
  try {
    const ledger = await loadLedger();
    const record = ledger.jobs[options.id];
    if (!isUncertainPaidOutcome(record)) throw new Error('Visual job is not eligible for ambiguous retry');
    const entryById = new Map(entries.map((item) => [item.job.id, item]));
    // 与 produce 主路径相同的引用语义：显式 opt-in 时允许 awaiting-review 交付作为
    // 重试参考。漏传该参数曾让依赖未审交付的作业（protagonist.shadow 等）在锁内
    // 抛 "Reference job is not available"，付费请求从未发出。
    const refs = await resolveReferenceInputs(entry.prompt, ledger, entryById, canonVisualSources, new Set([options.id]), options.allowUnreviewedReferences === true);
    const currentHash = jobHash(entry, refs);
    const nextAttempt = record.activeAttempt + 1;
    const requestKey = hash(JSON.stringify({ sourceJobHash: currentHash, attempt: nextAttempt, regeneration: true, provider: config.provider }));
    const { authorization, authorizationPath } = await writeAmbiguousRetryAuthorization(entry, record, currentHash, refs, options, requestKey);
    const resubmission = {
      authorizationId: authorization.authorizationId,
      authorizationSha256: authorization.authorizationSha256,
      authorizationPath,
      supersededAttempt: record.activeAttempt,
      supersededRequestKey: record.requestKey,
      supersededSourceJobHash: record.sourceJobHash,
      currentContractSha256: currentHash,
      finalPromptSha256: authorization.finalPromptSha256,
      referenceInputs: authorization.referenceInputs,
      authorizedNewRequestKey: requestKey,
      authorizedAt: authorization.authorizedAt,
      operator: authorization.operator,
    };
    const result = await submitPaidRequest(entry, ledger, configs, options, refs, currentHash, { config, requestKey, resubmission });
    return { ...result, planVariant, authorizationId: authorization.authorizationId, authorizationPath };
  } finally { await releaseLock(); }
}

function commonRequestFields(entry) {
  return {
    model: 'gpt-image-2', prompt: entry.finalPrompt, n: 1, size: entry.job.generationSize,
    // 显式要 b64_json：本地 fail-closed 策略禁止下载 provider URL；此前写 'url' 依赖
    // provider 忽略该字段总是回 b64 的旧行为，provider 开始忠实执行后即互斥。
    response_format: 'b64_json',
  };
}

function parseResponseBody(text) {
  try { return JSON.parse(text); } catch { return { unparsedText: text }; }
}

async function saveRawResponse(directory, attempt, response) {
  const stem = `response-${String(attempt).padStart(2, '0')}`;
  const rawPath = resolve(directory, `${stem}.raw`);
  const metaPath = resolve(directory, `${stem}.meta.json`);
  const responseSha256 = hash(response.rawBytes);
  await atomicWrite(rawPath, response.rawBytes);
  const metadata = {
    status: response.status, requestId: response.requestId, endpoint: response.endpoint,
    contentType: response.contentType, responseSha256,
    rawResponsePath: relative(projectRoot, rawPath).replaceAll('\\', '/'),
  };
  await atomicWrite(metaPath, Buffer.from(`${JSON.stringify(metadata, null, 2)}\n`));
  return { ...metadata, responseMetaPath: relative(projectRoot, metaPath).replaceAll('\\', '/') };
}

async function loadRecordedResponse(record) {
  const rawBytes = await readFile(resolvePersistedJobPath(record.jobId, record.rawResponsePath, /^response-\d+\.raw$/u));
  if (hash(rawBytes) !== record.responseSha256) throw new Error('Stored provider response hash mismatch');
  return {
    status: record.httpStatus, requestId: record.requestId, endpoint: record.endpoint,
    contentType: record.responseContentType, rawBytes, body: parseResponseBody(rawBytes.toString('utf8')),
  };
}

async function materializeSource(body, directory, attempt) {
  const candidate = body?.data?.[0] ?? body?.output?.[0] ?? body;
  if (!candidate?.b64_json) throw new Error('Provider did not honor response_format=b64_json; URL downloads are disabled');
  const bytes = Buffer.from(candidate.b64_json, 'base64');
  inspectPng(bytes);
  const path = resolve(directory, `source-${String(attempt).padStart(2, '0')}.png`);
  await atomicWrite(path, bytes);
  return { path, bytes, sha256: hash(bytes) };
}

async function loadOrMaterializeSource(body, directory, record) {
  if (record.sourcePath && hashPattern.test(record.sourceSha256 ?? '')) {
    try {
      const path = resolvePersistedJobPath(record.jobId, record.sourcePath, /^source-\d+\.png$/u);
      const bytes = await readFile(path);
      if (hash(bytes) === record.sourceSha256) return { path, bytes, sha256: record.sourceSha256 };
    } catch {}
  }
  return materializeSource(body, directory, record.activeAttempt);
}

async function prepareDelivery(job, source, directory, attempt) {
  const sourceInfo = inspectPng(source.bytes);
  if (job.provider !== 'latent-moe') {
    const expected = dimensions(job.generationSize);
    if (sourceInfo.width !== expected.width || sourceInfo.height !== expected.height) throw new Error(`Unexpected source dimensions ${sourceInfo.width}x${sourceInfo.height}`);
  }
  const pixels = await inspectPixels(source.path);
  if (!pixels.nonBlank) throw new Error('Generated image is visually blank');
  const deliveryPath = resolve(directory, `delivery-${String(attempt).padStart(2, '0')}.${job.delivery.format}`);
  if (job.category === 'characters') await preparePortrait(job, source.path, deliveryPath, sourceInfo, pixels);
  else await prepareLandscape(job, source.path, deliveryPath);
  const bytes = await readFile(deliveryPath);
  const stream = await probeImage(deliveryPath);
  const deliveryPixels = await inspectPixels(deliveryPath);
  if (stream.width !== job.delivery.width || stream.height !== job.delivery.height) throw new Error('Delivery dimensions do not match plan');
  if (job.category === 'characters' && !deliveryPixels.hasTransparency) throw new Error('Portrait post-processing did not produce a usable transparent channel');
  if (job.category === 'characters' && deliveryPixels.borderTransparencyRatio < 0.85) throw new Error('Portrait post-processing did not clear the canvas boundary');
  if (job.category === 'characters' && deliveryPixels.opaqueKeyRatio > 0.01) throw new Error('Portrait post-processing left an opaque chroma-key background');
  if (job.category === 'characters' && deliveryPixels.transparentMagentaRatio > 0.08) throw new Error('Portrait post-processing left magenta RGB in transparent pixels');
  return { path: deliveryPath, sha256: hash(bytes), bytes: bytes.length, sourceInfo, deliveryInfo: stream, pixels: { source: pixels, delivery: deliveryPixels } };
}

export async function preparePortrait(job, sourcePath, deliveryPath, sourceInfo, pixels) {
  if (job.provider === 'latent-moe') {
    // Latent emits opaque 920x1536 portrait masters (ratio 0.599) while the
    // delivery contract is 1024x1536 (ratio 0.667). Fit the subject inside
    // the delivery canvas with a sampled chroma-key pad, then key it to
    // transparency so the delivery passes the transparent-channel checks.
    await runLatentPortraitKey(sourcePath, deliveryPath, job.delivery.width, job.delivery.height);
    return;
  }
  if (sourceInfo.width !== job.delivery.width || sourceInfo.height !== job.delivery.height) throw new Error('Portrait delivery requires exact source dimensions');
  if (sourceInfo.alphaCapable && pixels.hasTransparency && pixels.borderTransparencyRatio >= 0.85
    && pixels.opaqueKeyRatio <= 0.01 && (pixels.residualMagentaRatio ?? 0) <= 0.08) {
    await atomicWrite(deliveryPath, await readFile(sourcePath));
    return;
  }
  if (sourceInfo.alphaCapable && pixels.transparentRatio > 0
    && pixels.opaqueKeyRatio <= 0.01 && (pixels.residualMagentaRatio ?? 0) <= 0.08) {
    // gpt-image-2 会返回原生 alpha 立绘（实测 ~47% 像素透明），而 colorkey 会把已有
    // alpha 整体清空（实测 0.473→0），因此带原生 alpha 且无品红背景可抠的源绝不能
    // 走 colorkey：先只硬化半透明残留；若人物贴边导致边框透明率仍不达标，则按
    // “固定锚点”要求等比缩小并垫透明边距。有显著品红（gradient/magenta 背景）时
    // 仍必须走 colorkey 路径。
    await hardenPortraitAlpha(sourcePath, deliveryPath);
    const hardened = await inspectPixels(deliveryPath);
    if (hardened.hasTransparency && hardened.borderTransparencyRatio >= 0.85 && hardened.opaqueKeyRatio <= 0.01) return;
    await insetPortraitWithMargin(job, sourcePath, deliveryPath);
    return;
  }
  // Some image-edit responses arrive as RGB PNGs with a light checkerboard
  // baked into the canvas. Try a border-connected near-white key first; if it
  // does not clear the canvas, fall back to the established chroma-key path.
  if (!sourceInfo.alphaCapable) {
    await runNearWhitePortraitKey(sourcePath, deliveryPath, sourceInfo.width, sourceInfo.height);
    const keyed = await inspectPixels(deliveryPath);
    if (keyed.hasTransparency && keyed.borderTransparencyRatio >= 0.85) return;
  }
  await runAdaptivePortraitKey(sourcePath, deliveryPath);
}

async function runNearWhitePortraitKey(sourcePath, deliveryPath, width, height) {
  const { stdout } = await runFile(ffmpegPath(), [
    '-v', 'error', '-i', sourcePath, '-vf', 'format=rgba', '-frames:v', '1',
    '-f', 'rawvideo', '-'], mediaToolOptions({ encoding: 'buffer', maxBuffer: width * height * 4 + 1024 }));
  const rgba = Buffer.from(stdout);
  const pixelCount = rgba.length / 4;
  const visited = new Uint8Array(pixelCount);
  const queue = new Int32Array(pixelCount);
  let head = 0; let tail = 0;
  const isCanvasPixel = (index) => {
    const offset = index * 4;
    const red = rgba[offset]; const green = rgba[offset + 1]; const blue = rgba[offset + 2];
    return red >= 225 && green >= 225 && blue >= 225
      && Math.max(red, green, blue) - Math.min(red, green, blue) <= 14;
  };
  const enqueue = (index) => {
    if (index < 0 || index >= pixelCount || visited[index] || !isCanvasPixel(index)) return;
    visited[index] = 1; queue[tail] = index; tail += 1;
  };
  for (let x = 0; x < width; x += 1) { enqueue(x); enqueue((height - 1) * width + x); }
  for (let y = 0; y < height; y += 1) { enqueue(y * width); enqueue(y * width + width - 1); }
  while (head < tail) {
    const index = queue[head]; head += 1;
    const x = index % width; const y = Math.floor(index / width);
    if (x > 0) enqueue(index - 1);
    if (x + 1 < width) enqueue(index + 1);
    if (y > 0) enqueue(index - width);
    if (y + 1 < height) enqueue(index + width);
  }
  for (let index = 0; index < pixelCount; index += 1) {
    if (!visited[index]) continue;
    const offset = index * 4;
    rgba[offset] = 0; rgba[offset + 1] = 0; rgba[offset + 2] = 0; rgba[offset + 3] = 0;
  }
  const rawPath = `${deliveryPath}.near-white.rgba`;
  try {
    await writeFile(rawPath, rgba);
    await runFile(ffmpegPath(), [
      '-v', 'error', '-y', '-f', 'rawvideo', '-pixel_format', 'rgba',
      '-video_size', `${width}x${height}`, '-i', rawPath, '-frames:v', '1', deliveryPath,
    ], mediaToolOptions());
  } finally {
    await rm(rawPath, { force: true });
  }
}

async function runLatentPortraitKey(sourcePath, deliveryPath, width, height) {
  const key = await samplePortraitKey(sourcePath);
  const keyHex = key.map((value) => value.toString(16).padStart(2, '0')).join('');
  const filter = [
    `scale=${width}:${height}:force_original_aspect_ratio=decrease`,
    `pad=${width}:${height}:(ow-iw)/2:(oh-ih)/2:color=0x${keyHex}`,
    `colorkey=0x${keyHex}:0.08:0.01`,
    // gpt-image-2/Anima 会返回原生 alpha，但常在底部残留半透明灰底（alpha 78-191），
    // colorkey 抠不掉导致透明率门禁失败；硬化低 alpha 像素为全透明。
    hardenAlphaFilter(),
    'format=rgba',
  ].join(',');
  await runFile(ffmpegPath(), ['-v', 'error', '-y', '-i', sourcePath, '-vf', filter, '-frames:v', '1', deliveryPath], mediaToolOptions());
}

async function samplePortraitKey(sourcePath) {
  const { stdout } = await runFile(ffmpegPath(), [
    '-v', 'error', '-i', sourcePath, '-vf', 'scale=32:32:flags=neighbor,format=rgba',
    '-frames:v', '1', '-f', 'rawvideo', '-'], mediaToolOptions({ encoding: 'buffer', maxBuffer: 32 * 32 * 4 + 1024 }));
  const pixels = Buffer.from(stdout);
  const candidates = [];
  for (let index = 0; index + 3 < pixels.length; index += 4) {
    const red = pixels[index]; const green = pixels[index + 1]; const blue = pixels[index + 2]; const alpha = pixels[index + 3];
    if (alpha > 200 && red + blue > green * 4 && red > 170 && blue > 140) candidates.push([red, green, blue]);
  }
  return candidates.length > 0
    ? candidates.reduce((sum, value) => sum.map((channel, index) => channel + value[index]), [0, 0, 0]).map((value) => Math.round(value / candidates.length))
    : [255, 0, 255];
}

async function runAdaptivePortraitKey(sourcePath, deliveryPath) {
  const key = await samplePortraitKey(sourcePath);
  const keyHex = key.map((value) => value.toString(16).padStart(2, '0')).join('');
  await runFile(ffmpegPath(), [
    '-v', 'error', '-y', '-i', sourcePath,
    '-vf', `colorkey=0x${keyHex}:0.08:0.01,${hardenAlphaFilter()},${edgeDespillFilter(3)},format=rgba`,
    '-frames:v', '1', deliveryPath,
  ], mediaToolOptions());
}

// gpt-image-2 实测会在人物立绘底部留下半透明灰底（地面/投影，alpha 78-191），
// 仅按品红 colorkey 无法满足透明率门禁；把低 alpha 像素硬化为全透明是标准抠像收边。
// RGB 也必须清零，否则浏览器/Live2D 缩放透明像素时会把洋红背景插值回可见边缘。
function hardenAlphaFilter() {
  return "geq=r='if(lt(alpha(X,Y),200),0,r(X,Y))':g='if(lt(alpha(X,Y),200),0,g(X,Y))':b='if(lt(alpha(X,Y),200),0,b(X,Y))':a='if(lt(alpha(X,Y),200),0,alpha(X,Y))'";
}

function edgeDespillFilter(radius) {
  const edge = edgeTransparencyExpression(radius);
  const cast = "gt(min(r(X,Y),b(X,Y))-g(X,Y),40)*gt(b(X,Y)*100,r(X,Y)*55)";
  const guard = `(${edge})*(${cast})`;
  return `geq=r='if(${guard},min(r(X,Y),g(X,Y)+12),r(X,Y))':g='g(X,Y)':b='if(${guard},min(b(X,Y),g(X,Y)+12),b(X,Y))':a='alpha(X,Y)'`;
}

function edgeTransparencyExpression(radius) {
  const offsets = [];
  for (let distance = 1; distance <= radius; distance += 1) {
    offsets.push(
      [-distance, 0], [distance, 0], [0, -distance], [0, distance],
      [-distance, -distance], [distance, distance], [-distance, distance], [distance, -distance],
    );
  }
  let terms = offsets.map(([x, y]) => `alpha(X${x >= 0 ? '+' : ''}${x},Y${y >= 0 ? '+' : ''}${y})`);
  while (terms.length > 1) {
    const reduced = [];
    for (let index = 0; index < terms.length; index += 2) {
      reduced.push(index + 1 < terms.length ? `min(${terms[index]},${terms[index + 1]})` : terms[index]);
    }
    terms = reduced;
  }
  return `lt(${terms[0]},8)`;
}

async function hardenPortraitAlpha(sourcePath, deliveryPath) {
  await runFile(ffmpegPath(), [
    '-v', 'error', '-y', '-i', sourcePath,
    '-vf', `${hardenAlphaFilter()},format=rgba`,
    '-frames:v', '1', deliveryPath,
  ], mediaToolOptions());
}

// 人物贴住画布底边（全身站姿常见）会让边框透明率门禁失败；按“固定锚点”要求
// 等比缩小到 92% 并垫透明边距，保证四周边框均为可锚定的背景区。
async function insetPortraitWithMargin(job, sourcePath, deliveryPath) {
  await runFile(ffmpegPath(), [
    '-v', 'error', '-y', '-i', sourcePath,
    '-vf', `scale=iw*0.92:ih*0.92:flags=lanczos,format=rgba,pad=${job.delivery.width}:${job.delivery.height}:(ow-iw)/2:(oh-ih)/2:color=black@0,${hardenAlphaFilter()},format=rgba`,
    '-frames:v', '1', deliveryPath,
  ], mediaToolOptions());
}

async function prepareLandscape(job, sourcePath, deliveryPath) {
  const filter = `scale=${job.delivery.width}:${job.delivery.height}:force_original_aspect_ratio=increase,crop=${job.delivery.width}:${job.delivery.height}`;
  await runFile(ffmpegPath(), ['-v', 'error', '-y', '-i', sourcePath, '-vf', filter, '-frames:v', '1', '-q:v', '2', deliveryPath], mediaToolOptions());
}

async function probeImage(path) {
  const { stdout } = await runFile(ffprobePath(), ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,pix_fmt', '-of', 'json', path], mediaToolOptions());
  const stream = JSON.parse(stdout).streams?.[0];
  if (!stream) throw new Error('Unable to probe generated image');
  return stream;
}

async function preflightLocalMediaTools() {
  await Promise.all([
    runFile(ffmpegPath(), ['-version'], mediaToolOptions({ timeout: 15_000 })),
    runFile(ffprobePath(), ['-version'], mediaToolOptions({ timeout: 15_000 })),
  ]);
}

export async function inspectPixels(path) {
  const { stdout } = await runFile(ffmpegPath(), ['-v', 'error', '-i', path, '-vf', 'scale=32:32,format=rgba', '-frames:v', '1', '-f', 'rawvideo', '-'], mediaToolOptions({ encoding: 'buffer', maxBuffer: 32 * 32 * 4 + 1024 }));
  const pixels = Buffer.from(stdout);
  let minAlpha = 255; let maxAlpha = 0; let minRgb = 255; let maxRgb = 0; let transparent = 0; let opaqueKey = 0; let magenta = 0; let transparentMagenta = 0; let borderTransparent = 0; let borderPixels = 0;
  for (let index = 0; index + 3 < pixels.length; index += 4) {
    const pixelIndex = index / 4; const x = pixelIndex % 32; const y = Math.floor(pixelIndex / 32);
    const red = pixels[index]; const green = pixels[index + 1]; const blue = pixels[index + 2]; const alpha = pixels[index + 3];
    const border = x === 0 || x === 31 || y === 0 || y === 31;
    const isMagenta = red >= 180 && blue >= 150 && red + blue > green * 4 && Math.abs(red - blue) < 100;
    minRgb = Math.min(minRgb, red, green, blue);
    maxRgb = Math.max(maxRgb, red, green, blue);
    minAlpha = Math.min(minAlpha, alpha); maxAlpha = Math.max(maxAlpha, alpha);
    if (alpha < 16) { transparent += 1; if (isMagenta) transparentMagenta += 1; }
    if (alpha > 200 && red >= 230 && green <= 30 && blue >= 230) opaqueKey += 1;
    if (alpha > 200 && isMagenta) magenta += 1;
    if (border) { borderPixels += 1; if (alpha < 16) borderTransparent += 1; }
  }
  const total = pixels.length / 4;
  return {
    nonBlank: maxAlpha > 0 && maxRgb - minRgb > 4,
    hasTransparency: transparent / total >= 0.01 && maxAlpha > 200,
    transparentRatio: transparent / total,
    borderTransparencyRatio: borderPixels ? borderTransparent / borderPixels : 0,
    opaqueKeyRatio: opaqueKey / total,
    residualMagentaRatio: magenta / total,
    transparentMagentaRatio: transparentMagenta / total,
    minAlpha, maxAlpha, minRgb, maxRgb,
  };
}

function recordArtifactReady(ledger, entry, sourceJobHash, response, rawRecord, artifact, references) {
  const previous = ledger.jobs[entry.job.id];
  ledger.jobs[entry.job.id] = {
    ...previous, ...rawRecord, status: 'awaiting-review', sourceJobHash, receiptAssetId: entry.job.receiptAssetId,
    ...(entry.job.portraitAssetId ? { portraitAssetId: entry.job.portraitAssetId } : {}),
    artifactSha256: artifact.sha256, artifactBytes: artifact.bytes,
    deliveryPath: relative(projectRoot, artifact.path).replaceAll('\\', '/'),
    requestId: response.requestId, upstreamPieVerified: false,
    reviewCriteria: entry.prompt.reviewCriteria,
    inputs: references.map(({ jobId, sha256, receiptAssetId }) => ({ jobId, sha256, receiptAssetId })),
    validation: { source: artifact.sourceInfo, delivery: artifact.deliveryInfo, pixels: artifact.pixels },
    attempts: replaceAttempt(previous.attempts, previous.activeAttempt, { attempt: previous.activeAttempt, status: 'awaiting-review', httpStatus: response.status, artifactReadyAt: new Date().toISOString() }),
  };
}

export function recordLocallyReprocessedArtifact(record, entry, artifact, reprocessedAt = new Date().toISOString()) {
  if (!record || typeof record !== 'object' || !entry?.job?.id || record.jobId !== entry.job.id
    || !hashPattern.test(record.sourceJobHash ?? '') || !hashPattern.test(record.requestKey ?? '')
    || !hashPattern.test(record.responseSha256 ?? '') || !hashPattern.test(record.sourceSha256 ?? '')
    || !hashPattern.test(artifact?.sha256 ?? '') || !Number.isInteger(artifact?.bytes) || artifact.bytes < 1) {
    throw new Error('Local visual reprocessing record is invalid');
  }
  const { error: _error, review: _review, reviewPath: _reviewPath, reviewContractRevision: _revision,
    reviewContractRevisionPath: _revisionPath, ...preserved } = record;
  const priorAttempt = (record.attempts ?? []).find((attempt) => attempt.attempt === record.activeAttempt) ?? {};
  const previousFailureError = priorAttempt.error ?? record.error;
  const previousProcessingFailure = priorAttempt.failedAt || previousFailureError
    ? { ...(priorAttempt.failedAt ? { failedAt: priorAttempt.failedAt } : {}), ...(previousFailureError ? { error: previousFailureError } : {}) }
    : undefined;
  return {
    ...preserved,
    status: 'awaiting-review',
    receiptAssetId: entry.job.receiptAssetId ?? record.receiptAssetId,
    ...(entry.job.portraitAssetId ? { portraitAssetId: entry.job.portraitAssetId } : {}),
    artifactSha256: artifact.sha256,
    artifactBytes: artifact.bytes,
    deliveryPath: relative(projectRoot, artifact.path).replaceAll('\\', '/'),
    reviewCriteria: entry.prompt?.reviewCriteria ?? record.reviewCriteria,
    validation: { source: artifact.sourceInfo, delivery: artifact.deliveryInfo, pixels: artifact.pixels },
    locallyReprocessedAt: reprocessedAt,
    attempts: replaceAttempt(record.attempts, record.activeAttempt, {
      attempt: record.activeAttempt,
      status: 'awaiting-review',
      artifactReadyAt: reprocessedAt,
      ...(previousProcessingFailure ? { previousProcessingFailure } : {}),
    }),
  };
}

export async function reprocessVisualArtifacts(options = {}) {
  const ids = [...new Set(options.ids ?? [])];
  if (ids.length === 0 || ids.some((id) => typeof id !== 'string' || id.trim().length === 0)) {
    throw new Error('Local visual reprocessing requires one or more job ids');
  }
  const releaseLock = await acquireLedgerLock(options.recoverStaleLock);
  try {
    const [{ plan, prompts }, ledger] = await Promise.all([loadProductionInputs(), loadLedger()]);
    const entries = new Map(selectImageJobs(plan, prompts, { mode: 'all' }).map((entry) => [entry.job.id, entry]));
    const results = [];
    for (const id of ids) {
      const entry = entries.get(id);
      const record = ledger.jobs[id];
      if (!entry || !record) throw new Error(`Unknown image jobs: ${id}`);
      if (!record.sourcePath || !hashPattern.test(record.sourceSha256 ?? '')) throw new Error(`Visual source is unavailable for reprocessing: ${id}`);
      const sourcePath = resolvePersistedJobPath(id, record.sourcePath, /^source-\d+\.png$/u);
      const sourceBytes = await readFile(sourcePath);
      if (hash(sourceBytes) !== record.sourceSha256) throw new Error(`Visual source hash mismatch: ${id}`);
      const artifact = await prepareDelivery(entry.job, { path: sourcePath, bytes: sourceBytes }, resolve(stagingRoot, safe(id)), record.activeAttempt);
      ledger.jobs[id] = recordLocallyReprocessedArtifact(record, entry, artifact);
      results.push({ id, status: 'awaiting-review', artifactSha256: artifact.sha256 });
    }
    await saveLedger(ledger);
    return results;
  } finally { await releaseLock(); }
}

function setLedgerJob(ledger, entry, sourceJobHash, requestKey, attempt, status) {
  const previous = ledger.jobs[entry.job.id];
  const attempts = previous?.attempts;
  const history = previous ? [...(previous.history ?? []), historySnapshot(previous)] : [];
  ledger.jobs[entry.job.id] = {
    jobId: entry.job.id, status, sourceJobHash, requestKey, receiptAssetId: entry.job.receiptAssetId, activeAttempt: attempt,
    ...(history.length > 0 ? { history } : {}),
    attempts: replaceAttempt(attempts, attempt, { attempt, status, startedAt: new Date().toISOString() }),
  };
}

function historySnapshot(record) {
  const { history: _history, ...snapshot } = record;
  return { archivedAt: new Date().toISOString(), ...snapshot };
}

function recordProviderCompletion(ledger, jobId, attempt, response, rawRecord) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, ...rawRecord, status: 'provider-completed', httpStatus: response.status,
    requestId: response.requestId, endpoint: response.endpoint, responseContentType: response.contentType,
    attempts: replaceAttempt(previous.attempts, attempt, { attempt, status: 'provider-completed', httpStatus: response.status, responseReceivedAt: new Date().toISOString() }),
  };
}

function recordSourceMaterialized(ledger, jobId, source) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, status: 'source-materialized', sourcePath: relative(projectRoot, source.path).replaceAll('\\', '/'), sourceSha256: source.sha256,
  };
}

function markProcessingFailure(ledger, jobId, error) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, status: 'needs-review', error: publicError(error),
    attempts: replaceAttempt(previous.attempts, previous.activeAttempt, {
      attempt: previous.activeAttempt, status: 'needs-review', failedAt: new Date().toISOString(), error: publicError(error),
    }),
  };
}

export function failLedgerJob(ledger, jobId, attempt, error, ambiguous, rawRecord) {
  const previous = ledger.jobs[jobId];
  ledger.jobs[jobId] = {
    ...previous, ...rawRecord, status: ambiguous ? 'ambiguous' : 'failed', error: publicError(error),
    ...(Number.isInteger(rawRecord?.status) ? { httpStatus: rawRecord.status } : {}),
    ...(typeof rawRecord?.contentType === 'string' ? { responseContentType: rawRecord.contentType } : {}),
    attempts: replaceAttempt(previous.attempts, attempt, { attempt, status: ambiguous ? 'ambiguous' : 'failed', failedAt: new Date().toISOString(), error: publicError(error) }),
  };
}

function replaceAttempt(attempts = [], number, value) {
  const previous = attempts.find((attempt) => attempt.attempt === number) ?? {};
  return [...attempts.filter((attempt) => attempt.attempt !== number), { ...previous, ...value }].sort((left, right) => left.attempt - right.attempt);
}

async function loadLedger() {
  try {
    return validateLedger(await readJson(ledgerPath));
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    await assertNoOrphanedPaidHistory();
    return emptyLedger();
  }
}

export function validateLedger(value) {
  if (value?.version !== 2 || value.projectId !== 'albina-galgame-card'
    || !['x666-openai-compatible', 'wisart-openai-compatible'].includes(value.provider) || value.model !== 'gpt-image-2'
    || (value.upstreamPieVerified !== undefined && value.upstreamPieVerified !== false)
    || !value.jobs || typeof value.jobs !== 'object' || Array.isArray(value.jobs)) {
    throw new Error('Invalid visual production ledger; refusing to forget paid request history');
  }
  for (const [jobId, record] of Object.entries(value.jobs)) validateLedgerJob(jobId, record);
  return value;
}

function validateLedgerJob(jobId, record) {
  if (!record || typeof record !== 'object' || Array.isArray(record) || record.jobId !== jobId
    || !jobStatuses.has(record.status) || !hashPattern.test(record.sourceJobHash ?? '') || !hashPattern.test(record.requestKey ?? '')
    || typeof record.receiptAssetId !== 'string' || !Number.isInteger(record.activeAttempt) || record.activeAttempt < 1
    || !Array.isArray(record.attempts) || record.attempts.length === 0) throw invalidLedgerJob(jobId);
  const attemptNumbers = record.attempts.map((attempt) => {
    if (!attempt || typeof attempt !== 'object' || !Number.isInteger(attempt.attempt) || attempt.attempt < 1 || !jobStatuses.has(attempt.status)) throw invalidLedgerJob(jobId);
    return attempt.attempt;
  });
  if (new Set(attemptNumbers).size !== attemptNumbers.length || Math.max(...attemptNumbers) !== record.activeAttempt) throw invalidLedgerJob(jobId);
  if (['provider-completed', 'source-materialized', 'needs-review', 'awaiting-review', 'completed', 'rejected'].includes(record.status)
    && (!hashPattern.test(record.responseSha256 ?? '') || typeof record.rawResponsePath !== 'string')) throw invalidLedgerJob(jobId);
  if (['awaiting-review', 'completed'].includes(record.status)
    && (!hashPattern.test(record.artifactSha256 ?? '') || typeof record.deliveryPath !== 'string')) throw invalidLedgerJob(jobId);
  if (record.status === 'completed' && record.review?.status !== 'approved' && record.reviewContractRevision?.status !== 'approved') throw invalidLedgerJob(jobId);
  if (record.status === 'completed' && record.reviewContractRevision) {
    const revision = record.reviewContractRevision;
    if (revision.status !== 'approved' || revision.generationHistoryPreserved !== true || revision.generationJobHash !== record.sourceJobHash
      || revision.artifactSha256 !== record.artifactSha256 || !hashPattern.test(revision.currentJobHash ?? '')
      || !Array.isArray(revision.criteria)) throw invalidLedgerJob(jobId);
  }
  if (record.resubmission) {
    const link = record.resubmission;
    const archived = record.history?.find((item) => item.activeAttempt === link.supersededAttempt);
    if (!archived || archived.requestKey !== link.supersededRequestKey || archived.sourceJobHash !== link.supersededSourceJobHash
      || link.authorizedNewRequestKey !== record.requestKey || (link.currentContractSha256 && link.currentContractSha256 !== record.sourceJobHash)
      || (link.finalPromptSha256 && !hashPattern.test(link.finalPromptSha256)) || !Array.isArray(link.referenceInputs)) {
      throw invalidLedgerJob(jobId);
    }
  }
}

function invalidLedgerJob(jobId) {
  return new Error(`Invalid visual production ledger job ${jobId}; refusing to risk a duplicate paid request`);
}

function maximumAttempt(attempts = []) {
  return attempts.reduce((maximum, attempt) => Math.max(maximum, attempt.attempt), 0);
}

async function assertNoOrphanedPaidHistory() {
  const entries = await readdir(stagingRoot, { withFileTypes: true }).catch((error) => error?.code === 'ENOENT' ? [] : Promise.reject(error));
  const artifacts = entries.filter((entry) => entry.name !== 'ledger.lock'
    && !entry.name.startsWith('ledger.lock.stale-')
    && !entry.name.endsWith('.md'));
  const receiptRoot = resolve(projectRoot, 'content/media-receipts');
  const receipts = await readdir(receiptRoot).catch((error) => error?.code === 'ENOENT' ? [] : Promise.reject(error));
  if (artifacts.length > 0 || receipts.some((name) => name.startsWith('visual.image.'))) {
    throw new Error('Visual production ledger is missing while paid artifacts or receipts exist; refusing to initialize an empty ledger');
  }
}

function emptyLedger() {
  return { version: 2, projectId: 'albina-galgame-card', provider: 'wisart-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false, jobs: {} };
}

async function saveLedger(ledger) {
  await mkdir(stagingRoot, { recursive: true });
  ledger.updatedAt = new Date().toISOString();
  await atomicWrite(ledgerPath, Buffer.from(`${JSON.stringify(ledger, null, 2)}\n`));
}

function summarize(results) {
  const summary = {
    total: results.length, completed: 0, skipped: 0, failed: 0, ambiguous: 0,
    needsReview: 0, awaitingReview: 0, blocked: 0, contractChanged: 0, results,
  };
  for (const result of results) {
    if (result.status === 'needs-review') summary.needsReview += 1;
    else if (result.status === 'awaiting-review') summary.awaitingReview += 1;
    else if (result.status === 'contract-changed') summary.contractChanged += 1;
    else summary[result.status] += 1;
  }
  return summary;
}

function isAmbiguousRequestError(error) {
  if (error instanceof ProviderError) return isAmbiguousProviderResponse(error.status, error.response?.body);
  return error instanceof RequestPhaseError && error.phase !== 'preflight';
}

export function isAmbiguousProviderResponse(status, body) {
  if (status < 500) return false;
  if (body?.error?.type === 'image_generation_error') return false;
  return body?.error?.code !== 'model_not_found';
}

async function acquireLedgerLock(recoverStaleLock = false) {
  await mkdir(stagingRoot, { recursive: true });
  let handle;
  try {
    handle = await open(lockPath, 'wx');
  } catch (error) {
    if (error?.code === 'EEXIST' && recoverStaleLock) {
      await archiveStaleLock();
      handle = await open(lockPath, 'wx');
    } else if (error?.code === 'EEXIST') {
      throw new Error(`Visual production ledger is locked: ${relative(projectRoot, lockPath)}; use --recover-stale-lock only after verifying its process is gone`);
    }
    if (!handle) throw error;
  }
  // Record the owning command line: a stale lock is otherwise indistinguishable from a
  // live one once the pid is recycled, and operators need to know which run stranded it.
  await handle.writeFile(`${JSON.stringify({ pid: process.pid, createdAt: new Date().toISOString(), argv: process.argv.slice(1) })}\n`, 'utf8');
  return async () => {
    await handle.close();
    await rm(lockPath, { force: true });
  };
}

async function archiveStaleLock() {
  const value = JSON.parse(await readFile(lockPath, 'utf8'));
  if (!Number.isInteger(value.pid) || processIsRunning(value.pid)) throw new Error('Visual production lock belongs to a running or unknown process');
  await rename(lockPath, `${lockPath}.stale-${Date.now()}`);
}

function processIsRunning(pid) {
  try { process.kill(pid, 0); return true; } catch (error) { return error?.code !== 'ESRCH'; }
}

export async function atomicWrite(path, bytes) {
  const temporaryPath = `${path}.${process.pid}.${Date.now()}.tmp`;
  await writeFile(temporaryPath, bytes);
  await rename(temporaryPath, path);
}

function publicError(error) {
  if (error instanceof ProviderError) return `Provider HTTP ${error.status}`;
  if (error instanceof RequestPhaseError) return `Request ${error.phase} failed: ${publicError(error.cause)}`;
  if (error?.name === 'AbortError') return 'Provider request timed out; result is uncertain';
  return String(error?.message ?? error).replaceAll(/sk-[a-z0-9_-]{20,}/giu, '[REDACTED]');
}

function dimensions(value) {
  const [width, height] = value.split('x').map(Number);
  return { width, height };
}

function safe(value) {
  return value.replaceAll(/[^a-z0-9._-]/giu, '-');
}

function resolvePersistedJobPath(jobId, persistedPath, filePattern) {
  if (typeof jobId !== 'string' || typeof persistedPath !== 'string' || persistedPath.includes('\\') || persistedPath.includes(':') || persistedPath.startsWith('/')) {
    throw new Error('Invalid persisted visual production path');
  }
  const jobRoot = resolve(stagingRoot, safe(jobId));
  const path = resolve(projectRoot, persistedPath);
  const local = relative(jobRoot, path).replaceAll('\\', '/');
  if (!local || local.includes('/') || !filePattern.test(local)) throw new Error('Persisted visual production path escaped its job directory');
  return path;
}

export function resolveCanonVisualSourcePath(localPath) {
  if (typeof localPath !== 'string' || localPath.includes('\\') || localPath.includes(':') || localPath.startsWith('/')) throw new Error('Invalid canon visual source path');
  // 允许根目录是整个 staging/research：canon wiki 素材与去身份化风格板分属不同子目录，
  // 索引里的 localPath 一律相对项目根，这里只收紧到 research 树内并禁止向上穿越。
  const root = resolve(projectRoot, 'staging/research');
  const path = resolve(projectRoot, localPath);
  // 归一化后重新求相对路径：先折叠 .. 再判定越界，避免“带 .. 但仍落在允许目录内”被误杀，
  // 也避免“归一化后越界却因段数凑巧”被放行。
  const local = relative(root, resolve(path)).replaceAll('\\', '/');
  const segments = local ? local.split('/') : [];
  const escaped = local.length === 0 || segments[0] === '..' || segments.includes('..');
  // 只允许“白名单目录 + 单层图片文件”，不接受更深层级或非图片扩展名。
  const directory = segments.slice(0, -1).join('/');
  const file = segments.at(-1) ?? '';
  if (escaped || segments.length < 2 || !allowedResearchSourceDirectories.includes(directory)) throw new Error('Canon visual source escaped the research asset directory');
  if (!/^[^/]+\.(?:jpg|jpeg|png)$/iu.test(file)) throw new Error('Canon visual source escaped the research asset directory');
  return path;
}

function mimeFor(path) {
  return /\.(?:jpg|jpeg)$/iu.test(path) ? 'image/jpeg' : 'image/png';
}

function ffmpegPath() {
  return process.env.FFMPEG_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffmpeg.exe';
}

function ffprobePath() {
  return process.env.FFPROBE_PATH || 'C:\\Program Files\\Kdenlive\\bin\\ffprobe.exe';
}

function mediaToolOptions(overrides = {}) {
  const environment = { ...process.env };
  for (const name of ['WISART_API_KEY', 'LATENT_MOE_API_KEY', 'LATENT_API_KEY', 'X666_API_KEY', 'OPENAI_API_KEY', 'PIE_API_KEY', 'CLOSEAPI_API_KEY']) delete environment[name];
  return { env: environment, ...overrides };
}

async function readJson(path) {
  return JSON.parse((await readFile(path, 'utf8')).replace(/^\uFEFF/u, ''));
}

function delay(milliseconds) {
  return new Promise((resolveDelay) => setTimeout(resolveDelay, milliseconds));
}

class ProviderError extends Error {
  constructor(status, response) {
    super(`Provider HTTP ${status}`);
    this.status = status;
    this.response = response;
  }
}

class RequestPhaseError extends Error {
  constructor(phase, cause) {
    super(`Request ${phase} failed`, { cause });
    this.phase = phase;
    this.cause = cause;
  }
}
