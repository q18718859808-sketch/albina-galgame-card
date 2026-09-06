import { execFile } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { afterAll, describe, expect, it } from 'vitest';

import {
  assertLatentProductionAuthorized,
  assertWisartMigrationAuthorized,
  hash,
  latentJobSetSha256,
  migrationContentSha256,
  migrationPilotJobIds,
  latentPilotJobIds,
  latentPromptApprovalManifest,
  loadProductionInputs,
  selectImageJobs,
} from '../../scripts/lib/visual-production.mjs';

const runFile = promisify(execFile);
const projectRoot = process.cwd();
const contentRoot = join(projectRoot, 'content', 'media-production');

const queuePath = join(contentRoot, 'visual-production-queue-v2.json');
const latentPromptPath = join(contentRoot, 'latent-text-prompts-v1.json');
const latentPlanPath = join(contentRoot, 'visual-rebuild-latent-v1.json');
const templatePath = join(contentRoot, 'latent-production-authorization-template-v1.json');
const migrationPlanPath = join(contentRoot, 'visual-rebuild-migration-v1.json');
const migrationPromptPath = join(contentRoot, 'visual-prompts-migration-v1.json');
const migrationSourcesPath = join(contentRoot, 'canon-visual-sources-migration-v1.json');
const migrationTemplatePath = join(contentRoot, 'wisart-migration-authorization-template-v1.json');
const frozenPlanPath = join(contentRoot, 'visual-rebuild-v2.json');
const frozenPromptPath = join(contentRoot, 'visual-prompts-v2.json');

// The generators write in place, so every rebuild check snapshots the byte content up
// front and restores it afterwards. Only the three generated artifacts are ever
// written back: the authorized albina-visual-v2 freeze is compared read-only, because
// other suites read it concurrently and a restore write would race their reads.
const guarded = [queuePath, latentPromptPath, latentPlanPath, migrationPromptPath, migrationPlanPath, migrationSourcesPath];
const snapshots = new Map<string, string>();

async function snapshot(): Promise<void> {
  for (const file of guarded) {
    if (!snapshots.has(file)) snapshots.set(file, await readFile(file, 'utf8'));
  }
}

async function restore(): Promise<void> {
  for (const [file, content] of snapshots) await writeFile(file, content, 'utf8');
}

afterAll(restore);

async function readJson(file: string): Promise<any> {
  return JSON.parse((await readFile(file, 'utf8')).replace(/^\uFEFF/u, ''));
}

/** Keep a shared comparison helper for legacy generated artifacts. */
function withoutTimestamps(value: any): any {
  return JSON.parse(JSON.stringify(value));
}

describe('build-visual-production-queue.mjs', () => {
  it('reproduces the committed dual-pipeline queue deterministically', async () => {
    await snapshot();
    const before = await readJson(queuePath);
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-visual-production-queue.mjs')], { cwd: projectRoot });
    const after = await readJson(queuePath);
    expect(withoutTimestamps(after)).toEqual(withoutTimestamps(before));
    expect(after.generatedAt).toEqual(expect.any(String));
    await restore();
  }, 60_000);

  it('allocates 22 latent CG + 45 wisart jobs with the documented blank-asset split', async () => {
    const queue = await readJson(queuePath);
    expect(queue.schemaVersion).toBe(2);
    expect(queue.counts).toMatchObject({ total: 67, wisart: 45, latent: 22, blankCg: 22, blankCharacters: 23, canonRecap: 6 });
    expect(queue.assignments).toHaveLength(67);
    const byProvider = queue.assignments.reduce((acc: Record<string, number>, entry: any) => {
      acc[entry.provider] = (acc[entry.provider] ?? 0) + 1;
      return acc;
    }, {});
    expect(byProvider).toEqual({ 'latent-moe': 22, 'wisart-openai-compatible': 45 });
    expect(new Set(queue.assignments.map((entry: any) => entry.jobId)).size).toBe(67);
  });

  it('keeps every latent assignment reference-free and limits it to blank landscape CGs', async () => {
    const queue = await readJson(queuePath);
    const latent = queue.assignments.filter((entry: any) => entry.provider === 'latent-moe');
    expect(latent).toHaveLength(22);
    for (const entry of latent) {
      expect(entry.model).toBe('latent-moe-async');
      expect(entry.category).toBe('cg');
      expect(entry.blankAsset).toBe(true);
      expect(entry.generationSize).toBe('landscape');
      expect(entry.inputMode).toBe('text-generation');
      expect(entry.referenceDependencies.referenceJobIds).toEqual([]);
      expect(entry.referenceDependencies.referenceSourceIds).toEqual([]);
    }
  });

  it('routes all 27 character portraits to WisArt reference-edit so they can consume the style board', async () => {
    const queue = await readJson(queuePath);
    const portraits = queue.assignments.filter((entry: any) => entry.category === 'characters');
    expect(portraits).toHaveLength(27);
    for (const entry of portraits) {
      expect(entry.provider).toBe('wisart-openai-compatible');
      expect(entry.inputMode).toBe('reference-edit');
    }
  });

  it('declares the no-human-approval and no-automatic-production policy', async () => {
    const queue = await readJson(queuePath);
    expect(queue.policy).toMatchObject({
      krea2LocalProductionCancelled: true,
      dualPipeline: true,
      noAutomaticProduction: true,
      noAutomaticPromotion: true,
      humanIdentityApprovalRequired: false,
    });
    expect(queue.policy.pipelines.latent).toMatchObject({
      provider: 'latent-moe', serialGeneration: true, noReferenceInput: true,
    });
  });
});

describe('build-latent-text-prompts.mjs', () => {
  it('reproduces the committed latent freeze and plan variant deterministically', async () => {
    await snapshot();
    const [promptsBefore, planBefore, frozenPlanBefore, frozenPromptBefore] = await Promise.all([
      readJson(latentPromptPath), readJson(latentPlanPath),
      readFile(frozenPlanPath, 'utf8'), readFile(frozenPromptPath, 'utf8'),
    ]);
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-latent-text-prompts.mjs')], { cwd: projectRoot });
    const [promptsAfter, planAfter, frozenPlanAfter, frozenPromptAfter] = await Promise.all([
      readJson(latentPromptPath), readJson(latentPlanPath),
      readFile(frozenPlanPath, 'utf8'), readFile(frozenPromptPath, 'utf8'),
    ]);
    expect(withoutTimestamps(promptsAfter)).toEqual(withoutTimestamps(promptsBefore));
    expect(withoutTimestamps(planAfter)).toEqual(withoutTimestamps(planBefore));
    // The authorized albina-visual-v2 freeze must survive the rebuild byte-for-byte.
    expect(frozenPlanAfter).toBe(frozenPlanBefore);
    expect(frozenPromptAfter).toBe(frozenPromptBefore);
    await restore();
  }, 60_000);

  it('freezes 22 self-contained landscape CG prompts matching the queue latent set', async () => {
    const [prompts, queue] = await Promise.all([readJson(latentPromptPath), readJson(queuePath)]);
    expect(prompts.promptVersion).toBe('latent-text-v1');
    expect(prompts.policy.scope).toBe('blank-cg-only');
    expect(prompts.prompts).toHaveLength(22);
    const queueLatent = new Set(queue.assignments.filter((entry: any) => entry.provider === 'latent-moe').map((entry: any) => entry.jobId));
    expect(new Set(prompts.prompts.map((entry: any) => entry.jobId))).toEqual(queueLatent);
    for (const entry of prompts.prompts) {
      expect(entry.provider).toBe('latent-moe');
      expect(entry.category).toBe('cg');
      expect(entry.generationSize).toBe('landscape');
      expect(entry.inputMode).toBe('text-generation');
      expect(entry.latentRequest.resolution).toBe('landscape');
      expect(entry.latentRequest.prompt.length).toBeGreaterThanOrEqual(200);
    }
  });

  it('strips every reference-conditioning semantic from the latent prompts', async () => {
    const prompts = await readJson(latentPromptPath);
    for (const entry of prompts.prompts) {
      const prose = entry.latentRequest.prompt;
      expect(prose).not.toMatch(/参考图|引用图|reference image|附图|上传的图/u);
      expect(entry.strippedForLatent).toBeTruthy();
    }
  });

  it('anchors CG identity through coverage declarations without retaining portrait anchors', async () => {
    const prompts = await readJson(latentPromptPath);
    expect(prompts.counts.identityAnchors).toBeUndefined();
    for (const entry of prompts.prompts) {
      expect(entry.category).toBe('cg');
      expect(entry.identityAnchor).toBeNull();
      expect(Array.isArray(entry.cgIdentityCoverage.uncovered)).toBe(true);
      expect(entry.latentRequest.prompt).toContain('CG 构图规则');
    }
  });

  it('emits a plan variant with human authorization explicitly disabled', async () => {
    const [plan, prompts] = await Promise.all([readJson(latentPlanPath), readJson(latentPromptPath)]);
    expect(plan.counts).toMatchObject({ imageJobs: 67, latent: 22, wisart: 45 });
    expect(plan.policy.latentProductionAuthorization).toMatchObject({
      required: false, humanIdentityApprovalRequired: false,
    });
    expect(prompts.policy).toMatchObject({ authorizationRequired: false, humanIdentityApprovalRequired: false });
    expect(plan.policy.frozenSourceUnchanged).toBeTruthy();
  });
});

describe('build-migration-freeze.mjs and build-wisart-authorization-template.mjs', () => {
  it('keeps freeze generators byte-stable (no dynamic dates or randomness in source)', async () => {
    // 字节稳定性铁律：freeze 工件重建必须逐字节稳定。动态日期会造成内容哈希漂移。
    // 这里直接断言三个生成器源码不含动态值来源，防止回归。
    const freezeSource = await readFile(join(projectRoot, 'scripts', 'build-migration-freeze.mjs'), 'utf8');
    const latentFreezeSource = await readFile(join(projectRoot, 'scripts', 'build-latent-text-prompts.mjs'), 'utf8');
    const templateSource = await readFile(join(projectRoot, 'scripts', 'build-wisart-authorization-template.mjs'), 'utf8');
    for (const source of [freezeSource, latentFreezeSource, templateSource]) {
      expect(source).not.toMatch(/new Date\s*\(|Date\.now\s*\(|Math\.random\s*\(|randomUUID\s*\(/u);
    }
    expect(freezeSource).toContain("BOARD_CHECKED_AT = '2026-09-01'");
  });

  it('keeps the migration set independent and bound to the candidate board', async () => {
    const [plan, prompts, sources, template] = await Promise.all([
      readJson(migrationPlanPath), readJson(migrationPromptPath), readJson(migrationSourcesPath), readJson(migrationTemplatePath),
    ]);
    expect(plan.version).toBe('2.3.0-migration-v2');
    // v2 起 22 项空白 CG 自 Latent 迁回 WisArt（批量实证 latent 丢失义体身份锚点）
    expect(plan.counts).toEqual({ imageJobs: 67, characters: 27, bg: 12, cg: 28 });
    expect(prompts.promptVersion).toBe('albina-visual-migration-v1');
    expect(prompts.prompts).toHaveLength(67);
    expect(plan.policy.styleMigrationAuthorization).toMatchObject({
      required: false, humanWisartAuthorizationRequired: false, humanBoardReviewRequired: false,
    });
    expect(plan.policy.canonVisualSourceIndexSha256).toBe(hash(JSON.stringify(sources)));
    expect(template.status).toBe('not-required');
    expect(template.reviewer).toBeNull();
    expect(template.reviewedAt).toBeNull();
    expect(template.requiresHumanWisartAuthorization).toBe(false);
    expect(template.requiresHumanBoardReview).toBe(false);
    expect(template.reviews).toHaveLength(4);
    expect(template.reviews.map((entry: any) => entry.scope).sort()).toEqual(['backgroundJobs', 'board', 'cgJobs', 'characterJobs']);
    expect(template.reviews.every((entry: any) => entry.decision === 'not-required' && entry.notes.length > 0)).toBe(true);
    expect(template.migrationContentSha256).toBe(migrationContentSha256(plan, prompts, sources, await readJson(join(projectRoot, 'content', 'canon-claims-v1.json'))));
    expect(template.styleBoardSha256).toBe('aaf89630110b6fef687b86334404b00cd39fd29c84451971575b26a29ce51142');
  });

  it('accepts the explicit no-authorization policy and selects a provider-local pilot', async () => {
    const [plan, prompts, sources, claims] = await Promise.all([
      readJson(migrationPlanPath), readJson(migrationPromptPath), readJson(migrationSourcesPath), readJson(join(projectRoot, 'content', 'canon-claims-v1.json')),
    ]);
    expect(assertWisartMigrationAuthorized(plan, prompts, sources, claims).status).toBe('not-required');
    const selected = selectImageJobs(plan, prompts, { mode: 'pilot', planVariant: 'migration' });
    expect(selected).toHaveLength(migrationPilotJobIds.length);
    expect(new Set(selected.map((entry) => entry.job.id))).toEqual(new Set(migrationPilotJobIds));
    expect(selected.every((entry) => entry.job.provider === 'wisart-openai-compatible')).toBe(true);
    expect(selected.every((entry) => entry.finalPrompt.includes('画风迁移指令'))).toBe(true);
  });

  it('loads migration inputs without a separate authorization artifact', async () => {
    const loaded = await loadProductionInputs({ planVariant: 'migration' });
    expect(loaded.authorization).toBeUndefined();
    expect(loaded.planVariant).toBe('migration');
  });
});

describe('build-latent-authorization-template.mjs', () => {
  it('regenerates byte-identical no-authorization audit context', async () => {
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-latent-text-prompts.mjs')], { cwd: projectRoot });
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-latent-authorization-template.mjs')], { cwd: projectRoot });
    const first = await readFile(templatePath, 'utf8');
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-latent-text-prompts.mjs')], { cwd: projectRoot });
    await runFile(process.execPath, [join(projectRoot, 'scripts', 'build-latent-authorization-template.mjs')], { cwd: projectRoot });
    // Freeze and audit context carry no dynamic metadata: repeated builds must be stable.
    expect(await readFile(templatePath, 'utf8')).toBe(first);
    await restore();
  }, 60_000);

  it('binds the template to the current latent freeze and plan variant', async () => {
    const [plan, prompts, template] = await Promise.all([
      readJson(latentPlanPath), readJson(latentPromptPath), readJson(templatePath),
    ]);
    expect(template.schemaVersion).toBe(1);
    expect(template.promptFreezeSha256).toBe(hash(JSON.stringify(prompts)));
    expect(template.latentJobSetSha256).toBe(latentJobSetSha256(plan));
    expect(template.planVariantVersion).toBe(plan.version);
    expect(template.approvals).toHaveLength(22);
    expect(template.approvals.map((entry: any) => ({ jobId: entry.jobId, promptSha256: entry.promptSha256 })))
      .toEqual(latentPromptApprovalManifest(prompts));
  });

  it('marks the audit template explicitly not-required while retaining input hashes', async () => {
    const [plan, prompts, template] = await Promise.all([
      readJson(latentPlanPath), readJson(latentPromptPath), readJson(templatePath),
    ]);
    expect(template.status).toBe('not-required');
    expect(template.reviewer).toBeNull();
    expect(template.reviewedAt).toBeNull();
    expect(template.requiresHumanIdentityApproval).toBe(false);
    expect(template.approvals.every((entry: any) => entry.decision === 'not-required' && entry.notes.length > 0)).toBe(true);
    expect(assertLatentProductionAuthorized(plan, prompts).status).toBe('not-required');
  });

  it('carries automatic validation context for each current prompt', async () => {
    const template = await readJson(templatePath);
    expect(template.instructions.join('\n')).toMatch(/不是生产授权文件/u);
    for (const entry of template.approvals) {
      expect(entry.reviewContext.category).toMatch(/^(cg|characters)$/u);
      expect(entry.reviewContext.promptChars).toBeGreaterThanOrEqual(200);
      expect(entry.reviewContext.delivery).not.toBeNull();
    }
  });

  it('loads latent inputs without a human authorization artifact', async () => {
    const loaded = await loadProductionInputs({ planVariant: 'latent' });
    expect(loaded.authorization).toBeUndefined();
    expect(loaded.planVariant).toBe('latent');
  });

  it('selects a provider-local latent pilot set that is fully latent', async () => {
    const [plan, prompts] = await Promise.all([readJson(latentPlanPath), readJson(latentPromptPath)]);
    const selected = selectImageJobs(plan, prompts, { mode: 'pilot', planVariant: 'latent' });
    expect(selected).toHaveLength(latentPilotJobIds.length);
    expect(new Set(selected.map((entry) => entry.job.id))).toEqual(new Set(latentPilotJobIds));
    expect(selected.every((entry) => entry.job.provider === 'latent-moe')).toBe(true);
    expect(selected.every((entry) => entry.finalPrompt.length > 0)).toBe(true);
  });
});
