#!/usr/bin/env node
/**
 * build-latent-text-prompts.mjs
 *
 * 为 22 项 Latent.moe CG 资产产出独立的 text-generation prompt freeze（latent-text-v1）。
 *
 * 背景：
 * - frozen albina-visual-v2（visual-rebuild-v2.json + visual-prompts-v2.json）的
 *   policy.verifiedCandidate.authorization.authorizedContentSha256 绑定内容，任何修改都会
 *   破坏授权链。因此 Latent 的 text-generation 版本必须落为独立 freeze + plan 变体，
 *   原 frozen 文件保持字节不变。
 * - Latent.moe `POST /api/generate` 为纯 text-to-image：无任何参考图输入。原 reference-edit
 *   prompt 中的「继承 styleBible / 严格保留引用 X 的正史身份结构 / 透明背景」等语义必须
 *   改写为自足文本：styleBible 规则与 characterBible 身份描述直接注入 prompt。
 * - 角色立绘不再走 Latent。本卡的画风基准是用户提供的基线图，它只通过去标识化风格板
 *   （reference.user.albina-style-board，reference-edit 的末位输入）进入生产；Latent 收不到
 *   任何图像输入，因此立绘一旦分到 Latent 就无法迁移到基线画风。全部 27 项角色立绘留在
 *   WisArt reference-edit，Latent 只承担 22 项空白 CG（landscape）。
 *
 * 输出：
 * - content/media-production/latent-text-prompts-v1.json  —— 22 项 text-generation prompt freeze
 * - content/media-production/visual-rebuild-latent-v1.json —— plan 变体（67 jobs，22 latent + 45 wisart）
 *
 * 硬校验（fail-closed）：
 * - latent prompts 22 项，jobId 集合与队列（visual-production-queue-v2.json）latent 集合完全一致
 * - 每项类别为 cg、无角色立绘；referenceJobIds / referenceSourceIds 为空、无 styleReferenceMode
 * - CG 类注入 cgRules；uncovered 角色逐项登记（不编造描述）
 * - 每项 prompt 长度 >= 200 字符
 * - plan 变体 67 jobs，provider 分布 latent=22 / wisart-openai-compatible=45
 * - 原 frozen 文件未被修改（sha256 与启动时一致）
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
const OUT_PROMPTS = path.join(CONTENT, 'latent-text-prompts-v1.json');
const OUT_PLAN = path.join(CONTENT, 'visual-rebuild-latent-v1.json');

const LATENT_STEPS = 8; // 与 scripts/lib/visual-production.mjs requestLatentImage 保持一致
const PROMPT_VERSION = 'latent-text-v1';

function sha256(buf) {
  return createHash('sha256').update(buf).digest('hex');
}

/** 按 subject 拼接 characterBible 条目的权威字段文本（albina 全字段；其余仅 canonStatus+identity） */
function bibleEntryText(entry, subject) {
  const fields = subject === 'albina'
    ? ['canonStatus', 'identity', 'body', 'eyes', 'hair', 'tools', 'armor', 'fascia', 'auWardrobes']
    : ['canonStatus', 'identity'];
  const chunks = fields
    .filter((f) => typeof entry[f] === 'string' && entry[f].length > 0)
    .map((f) => entry[f]);
  if (chunks.length === 0) throw new Error(`No authoritative text for bible subject ${subject}`);
  return chunks.join(' ');
}

/** 删除 reference-edit 专属语义短语（其含义由 styleBible/characterBible 注入文本承载） */
function stripReferenceEditSemantics(text) {
  let out = text;
  out = out.replace(/继承\s*styleBible\s*[。，,、]?\s*/g, '');
  out = out.replace(/严格保留引用\s*\S+\s*的正史身份结构\s*[，,。]?\s*/g, '');
  out = out.replace(/保持引用\s*\S+\s*的正史身份结构\s*[，,。]?\s*/g, '');
  out = out.replace(/严格保持引用\s*\S+\s*的\s*/g, '');
  out = out.replace(/引用\s*\S+\s*的正史身份结构\s*[，,。]?\s*/g, '');
  out = out.replace(/使用\s*[\d一二三四五六七八九十]+\s*张引用立绘保持身份\s*[，,。]?\s*/g, '');
  out = out.replace(/使用引用立绘保持身份\s*[，,。]?\s*/g, '');
  out = out.replace(/参照引用立绘\s*[，,。]?\s*/g, '');
  // CG 常见引用身份表述（多形态，锚定「引用…身份/立绘」语义）
  out = out.replace(/严格保持[^，。]{0,20}引用[^，。]{0,16}身份\s*[，,。]?\s*/g, '');
  out = out.replace(/严格保持\s*[\d一二三四五六七八九十]+\s*张引用立绘[^，。]{0,12}\s*[，,。]?\s*/g, '');
  out = out.replace(/严格保持引用身份\s*[，,。]?\s*/g, '');
  // 风格板是 reference-edit 专属输入，Latent 无参考图：删除含「风格板」的整句
  out = out.replace(/[^。；;]{0,12}风格板[^。；;]{0,24}[。；;]?\s*/g, '');
  out = out.replace(/透明背景\s*[、，,。]?\s*/g, '');
  out = out.replace(/透明底\s*[、，,。]?\s*/g, '');
  return out.replace(/^[，,。、\s]+/, '').trim();
}

/** Latent 适配版 CG 构图规则：原文「与引用立绘同一身份」依赖参考图，Latent 无参考 */
const LATENT_CG_RULES =
  '16:9 横构图；只表现指定场景的关键动作、关系距离与道具，不写台词或标题。' +
  '角色必须保持与权威身份设定一致（见角色身份段），手、眼、武器和空间接触关系可逐项审核；' +
  '画面不得色情化或以血腥特写替代叙事。';

/** 组装 styleBible 注入段落（Latent 只承担 CG，纯文生图适配版） */
function composeStyleSection(bible) {
  return [
    `【画风与连续性（必须遵守）】${bible.rendering} ${bible.continuity}`,
    `【CG 构图规则（必须遵守）】${LATENT_CG_RULES}`,
  ].join('\n');
}

/** 可注入 bible 文本的角色集合（其余 canon 角色无权威文本，禁止编造） */
const BIBLE_SUBJECTS = new Set(['albina', 'protagonist', 'golden_apparition', 'lce_doctor', 'ring_agent']);

/** 为 CG 解析可注入身份的角色；返回 { injected: [...], uncovered: [...] } */
function resolveCgIdentityCoverage(promptEntry, promptsRoot) {
  const subjects = promptEntry.identitySubjects ?? [];
  const injected = [];
  const uncovered = [];
  for (const s of subjects) {
    if (!BIBLE_SUBJECTS.has(s)) {
      uncovered.push(s);
      continue;
    }
    if (s === 'albina' || s === 'protagonist') {
      const entry = promptsRoot.characterBible[s];
      if (!entry) throw new Error(`characterBible missing subject ${s} for ${promptEntry.jobId}`);
      injected.push(`- ${s}：${bibleEntryText(entry, s)}`);
    } else {
      const text = promptsRoot.characterBible.auSupportingCharacters?.[s];
      if (typeof text !== 'string' || text.length === 0) {
        throw new Error(`auSupportingCharacters missing ${s} for ${promptEntry.jobId}`);
      }
      injected.push(`- ${s}：${text}`);
    }
  }
  return { injected, uncovered };
}

/** 解析一条 prompt 的身份锚点（identityBootstrap -> characterBible -> promptProse） */

/** 组装一条 Latent text-generation prompt（Latent 只承担 CG） */
function composeLatentPrompt(entry, promptEntry, promptsRoot, queueAssignment) {
  const bible = promptsRoot.styleBible;
  if (queueAssignment.category !== 'cg') {
    throw new Error(`Latent only carries CG jobs, got ${queueAssignment.category} for ${entry.jobId}`);
  }

  const sections = [];

  // 1) styleBible 注入
  sections.push(composeStyleSection(bible));

  // 2) 身份注入：可注入角色 + uncovered 标注（不编造未覆盖角色的外观）
  const cgCoverage = resolveCgIdentityCoverage(promptEntry, promptsRoot);
  if (cgCoverage.injected.length > 0) {
    sections.push(`【角色身份（权威锚点，必须遵守）】${cgCoverage.injected.join('\n')}`);
  }
  if (cgCoverage.uncovered.length > 0) {
    sections.push(
      `【角色身份说明】场景中出现的其余正史角色（${cgCoverage.uncovered.join('、')}）采用与立绘一致的权威设定：` +
      '保持原作轮廓与配色、可识别性，不做 AU 换装或凭空改造。'
    );
  }

  // 3) 场景主体：strip reference-edit 语义后的原 positivePrompt
  const sceneBody = stripReferenceEditSemantics(promptEntry.positivePrompt);
  if (sceneBody.length < 40) {
    throw new Error(`Scene body too short after stripping for ${entry.jobId}: ${JSON.stringify(sceneBody)}`);
  }
  sections.push(`【画面内容】${sceneBody}`);

  const prompt = sections.join('\n\n');

  // 由队列提供 Latent 枚举尺寸；交付尺寸由 plan delivery 提供
  const latentResolution = queueAssignment.generationSize;
  if (latentResolution !== 'landscape') {
    throw new Error(`Latent CG must be landscape, got ${latentResolution} for ${entry.jobId}`);
  }

  return {
    prompt,
    steps: LATENT_STEPS,
    resolution: latentResolution,
    sampler: 'euler',
    scheduler: 'normal',
    negativePrompt: promptEntry.negativePrompt ?? null,
    cgCoverage,
  };
}

function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'));
  const prompts = JSON.parse(fs.readFileSync(PROMPTS_PATH, 'utf8'));
  const queue = JSON.parse(fs.readFileSync(QUEUE_PATH, 'utf8'));

  const frozenPlanSha256Before = sha256(fs.readFileSync(PLAN_PATH));
  const frozenPromptsSha256Before = sha256(fs.readFileSync(PROMPTS_PATH));

  // ---- 基础结构校验 ----
  if (!Array.isArray(plan.imageJobs) || plan.imageJobs.length !== 67) throw new Error(`plan.imageJobs must be 67, got ${plan.imageJobs?.length}`);
  if (!Array.isArray(prompts.prompts) || prompts.prompts.length !== 67) throw new Error(`prompts.prompts must be 67, got ${prompts.prompts?.length}`);
  if (typeof prompts.characterBible?.albina !== 'object') throw new Error('prompts.characterBible.albina missing');
  if (typeof prompts.styleBible?.rendering !== 'string') throw new Error('prompts.styleBible.rendering missing');

  const queueLatent = queue.assignments.filter((a) => a.provider === 'latent-moe');
  if (queueLatent.length !== 22) throw new Error(`queue latent must be 22, got ${queueLatent.length}`);

  const planByJobId = new Map(plan.imageJobs.map((j) => [j.id, j]));
  const promptByJobId = new Map(prompts.prompts.map((p) => [p.jobId, p]));

  // ---- 组装 22 项 Latent CG prompt ----
  const entries = [];
  for (const qa of queueLatent) {
    const planJob = planByJobId.get(qa.jobId);
    const promptEntry = promptByJobId.get(qa.jobId);
    if (!planJob) throw new Error(`plan job missing for ${qa.jobId}`);
    if (!promptEntry) throw new Error(`prompt missing for ${qa.jobId}`);
    if (qa.category !== 'cg') {
      throw new Error(`Latent must only carry cg jobs; ${qa.jobId} is ${qa.category}. Character portraits stay on WisArt reference-edit so they can consume the style board.`);
    }

    const latentRequest = composeLatentPrompt(planJob, promptEntry, prompts, qa);

    const stripped = (promptEntry.referenceJobIds ?? []).length + (promptEntry.referenceSourceIds ?? []).length;
    entries.push({
      jobId: qa.jobId,
      assetId: qa.assetId,
      receiptAssetId: qa.receiptAssetId,
      path: qa.path,
      category: qa.category,
      provider: 'latent-moe',
      inputMode: 'text-generation',
      generationSize: qa.generationSize,
      latentRequest,
      identityAnchor: null,
      cgIdentityCoverage: {
        injected: latentRequest.cgCoverage.injected.length,
        uncovered: latentRequest.cgCoverage.uncovered,
      },
      strippedForLatent: stripped,
      delivery: { ...qa.delivery },
      promptVersion: PROMPT_VERSION,
      status: 'authorization-not-required',
    });
  }

  // ---- 硬校验 ----
  for (const e of entries) {
    if (e.latentRequest.prompt.length < 200) throw new Error(`prompt too short for ${e.jobId} (${e.latentRequest.prompt.length})`);
    if (!e.latentRequest.prompt.includes('CG 构图规则')) {
      throw new Error(`cg prompt missing cgRules injection: ${e.jobId}`);
    }
    if (e.latentRequest.prompt.includes('引用立绘')) {
      throw new Error(`cg prompt still contains reference semantics: ${e.jobId}`);
    }
    if (e.latentRequest.prompt.includes('风格板')) {
      throw new Error(`latent prompt must not mention the style board it cannot receive: ${e.jobId}`);
    }
  }
  // CG 身份覆盖统计：uncovered 角色必须逐项登记（不编造描述，风险显式暴露）
  const uncoveredByJob = entries.filter((e) => e.cgIdentityCoverage.uncovered.length > 0)
    .map((e) => ({ jobId: e.jobId, uncovered: e.cgIdentityCoverage.uncovered }));
  const uncoveredSubjectsAll = [...new Set(uncoveredByJob.flatMap((x) => x.uncovered))].sort();

  // ---- 写 prompt freeze ----
  const freeze = {
    schemaVersion: 1,
    // promptVersion 置于顶层，与 frozen visual-prompts-v2.json 的结构约定一致（生产库校验读取顶层字段）
    promptVersion: PROMPT_VERSION,
    id: 'albina-latent-text-prompts-v1',
    // Freeze 工件参与内容哈希与可重复生产；不得写入动态时间戳。
    method: 'text-generation-freeze-from-reference-edit',
    policy: {
      provider: 'latent-moe',
      inputMode: 'text-generation',
      noReferenceInput: true,
      serialGeneration: true,
      steps: LATENT_STEPS,
      resolutions: { square: '1024x1024', portrait: '920x1536', landscape: '1536x920' },
      humanIdentityApprovalRequired: false,
      authorizationRequired: false,
      authorization: null, // 用户已明确取消人工身份审查与授权；保留内容哈希与输入校验
      sourcePromptVersion: prompts.promptVersion ?? 'albina-visual-v2',
      sourcePromptVersionHeader: prompts.promptVersion,
      frozenSourceUnchanged: true,
      frozenSourceSha256: { plan: frozenPlanSha256Before, prompts: frozenPromptsSha256Before },
      scope: 'blank-cg-only',
      note: 'Latent 纯文生图，只承担 22 项空白 CG；参考依赖已剥离，styleBible/characterBible 文本注入。角色立绘全部留在 WisArt reference-edit，因为画风迁移必须消费去标识化风格板这一图像输入，而 Latent 无任何图像输入。',
    },
    counts: {
      total: entries.length,
      cg: entries.length,
      characters: 0,
      cgIdentityCoverage: {
        jobsWithUncovered: uncoveredByJob.length,
        uncoveredSubjects: uncoveredSubjectsAll,
      },
    },
    prompts: entries,
  };
  if (freeze.counts.cg !== 22 || freeze.counts.characters !== 0) throw new Error(`freeze category counts mismatch: ${JSON.stringify(freeze.counts)}`);
  fs.writeFileSync(OUT_PROMPTS, JSON.stringify(freeze, null, 2) + '\n');

  // ---- 写 plan 变体（22 latent 改写 + 45 wisart 原样，frozen 不动） ----
  const wisartCount = plan.imageJobs.length - queueLatent.length;
  const imageJobs = plan.imageJobs.map((job) => {
    const qa = queueLatent.find((x) => x.jobId === job.id);
    if (!qa) {
      // Latent plan variant inherits the WisArt jobs for completeness, but all
      // human-approval metadata is disabled consistently across this variant.
      if (job.provider !== 'wisart-openai-compatible') {
        throw new Error(`non-latent job ${job.id} provider is ${job.provider}, expected wisart-openai-compatible`);
      }
      return {
        ...job,
        identityBootstrap: job.identityBootstrap
          ? { ...job.identityBootstrap, requiresHumanIdentityApproval: false }
          : null,
      };
    }
    return {
      ...job,
      identityBootstrap: job.identityBootstrap
        ? { ...job.identityBootstrap, requiresHumanIdentityApproval: false }
        : null,
      provider: 'latent-moe',
      model: 'latent-moe-async',
      inputMode: 'text-generation',
      promptVersion: PROMPT_VERSION,
      referenceJobIds: [],
      referenceSourceIds: [],
      styleReferenceMode: null,
      latentResolution: qa.generationSize,
      status: 'authorization-not-required',
    };
  });

  const latentPlanVariant = {
    version: '2.1.0-latent-v1',
    projectId: plan.projectId,
    policy: {
      ...plan.policy,
      promptFreeze: 'latent-text-prompts-v1.json',
      dualPipelinePlan: true,
      latentProductionAuthorization: {
        required: false,
        humanIdentityApprovalRequired: false,
        note: '用户已明确取消人工身份审查与授权；生产仍受 prompt/job/canon 哈希、输入自洽和 provider 合约校验约束。角色立绘不在此变体范围，全部保留 WisArt reference-edit 以接收风格板。',
      },
      frozenPlanSha256: frozenPlanSha256Before,
      frozenSourceUnchanged: true,
    },
    counts: { imageJobs: imageJobs.length, latent: queueLatent.length, wisart: wisartCount },
    imageJobs,
  };
  if (latentPlanVariant.counts.latent !== 22 || latentPlanVariant.counts.wisart !== 45) {
    throw new Error(`plan variant counts mismatch: ${JSON.stringify(latentPlanVariant.counts)}`);
  }
  fs.writeFileSync(OUT_PLAN, JSON.stringify(latentPlanVariant, null, 2) + '\n');

  // ---- 最终交叉校验：frozen 文件未被修改 ----
  const frozenPlanSha256After = sha256(fs.readFileSync(PLAN_PATH));
  const frozenPromptsSha256After = sha256(fs.readFileSync(PROMPTS_PATH));
  if (frozenPlanSha256After !== frozenPlanSha256Before || frozenPromptsSha256After !== frozenPromptsSha256Before) {
    throw new Error('FROZEN SOURCE MODIFIED during build — aborting');
  }

  console.log(JSON.stringify({
    outputPrompts: OUT_PROMPTS,
    outputPlan: OUT_PLAN,
    total: entries.length,
    cg: freeze.counts.cg,
    characters: freeze.counts.characters,
    cgIdentityCoverage: { jobsWithUncovered: uncoveredByJob.length, uncoveredSubjects: uncoveredSubjectsAll },
    planVariant: { imageJobs: imageJobs.length, latent: latentPlanVariant.counts.latent, wisart: latentPlanVariant.counts.wisart },
    frozenSourceSha256: { plan: frozenPlanSha256After, prompts: frozenPromptsSha256After },
  }, null, 2));
}

main();
