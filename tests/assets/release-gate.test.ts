import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { describe, expect, it } from 'vitest';

import { deriveReleaseStatus, summarizeReleaseArtifacts } from '../../scripts/lib/release-status.mjs';
import { buildReleaseCommands, evaluateReleaseGate, hasPublishableWorktreeChanges } from '../../scripts/lib/release-gate.mjs';

const imageProbe = (available: boolean) => ({
  provider: 'x666-openai-compatible',
  models: { 'gpt-image-2': available },
  currentAvailability: { available },
});

const pieProbe = {
  provider: 'pie',
  models: { 'seedance-1.5-pro': true, 'speech-2.8-hd': true },
};

const completeCounts = {
  deterministicScenes: 64,
  endings: 9,
  fixedVoiceAssets: 166,
  pieProvenancedVoiceAssets: 166,
  animatedCgRuntime: 24,
  animatedCgDesktop: 24,
  staticCharacterPortraits: 27,
  staticAlbinaPortraits: 13,
  licensedBgm: 5,
};

const completeReadiness = { total: 109, ready: 109, blocked: 0, byRoot: {}, blockers: [] };

describe('release status and publication gate', () => {
  it('ignores only protected local production state when checking publishable changes', () => {
    const localOnly = [
      ' M tools/media/production/.ledger.json',
      '?? tools/media/production/jobs/new.json',
      '?? staging/media/visual-v2/ledger.json',
      '?? tmp/provider-response.json',
      '?? .codex/tasks/task/manifest.json',
    ].join('\n');
    expect(hasPublishableWorktreeChanges(localOnly)).toBe(false);
    expect(hasPublishableWorktreeChanges('M tools/media/jobs/example.image.json')).toBe(false);
    expect(hasPublishableWorktreeChanges(`${localOnly}\n M src/App.vue`)).toBe(true);
    expect(hasPublishableWorktreeChanges('M src/App.vue')).toBe(true);
    expect(hasPublishableWorktreeChanges('R  tools/old.json -> src/leak.json')).toBe(true);
  });

  it('derives incomplete status from blocked media and unavailable production provider', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0-rc.2',
      runtimeMediaApis: false,
      completed: { ...completeCounts, fixedVoiceAssets: 0, pieProvenancedVoiceAssets: 0 },
      mediaReadiness: { total: 109, ready: 0, blocked: 109, byRoot: {}, blockers: [{ path: 'cg/test.png', assetIds: ['cg.test'], ready: false, issues: ['rights'] }] },
      providerProbes: { probes: [imageProbe(false), pieProbe], compatibilityProbes: [] },
      pendingMediaJobs: 67,
    });

    expect(status.completeEdition).toBe(false);
    expect(status.releaseCandidate).toBe(true);
    expect(status.providers.image).toMatchObject({ available: false, model: 'gpt-image-2' });
    expect(status.gates.final.allowed).toBe(false);
    expect(status.gates.final.blockers).toEqual(expect.arrayContaining([
      'media-readiness:109-blocked',
      'provider:image:gpt-image-2-unavailable',
      'pending-media-jobs:67',
    ]));
  });

  it('allows an RC checkpoint while carrying an explicit incomplete marker', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0-rc.2',
      runtimeMediaApis: false,
      completed: { ...completeCounts, animatedCgRuntime: 0, animatedCgDesktop: 0 },
      mediaReadiness: { total: 109, ready: 61, blocked: 48, byRoot: {}, blockers: [] },
      providerProbes: { probes: [imageProbe(false), pieProbe], compatibilityProbes: [] },
      pendingMediaJobs: 0,
    });

    const gate = evaluateReleaseGate({ channel: 'rc', status });
    expect(gate).toMatchObject({ allowed: true, incomplete: true });
    expect(status.gates.rc).toMatchObject({ allowed: true, incomplete: true });
  });

  it('refuses the final gate until the package is a complete non-RC edition', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0-rc.2',
      runtimeMediaApis: false,
      completed: completeCounts,
      mediaReadiness: completeReadiness,
      providerProbes: { probes: [imageProbe(true), pieProbe], compatibilityProbes: [] },
      pendingMediaJobs: 0,
    });

    expect(status.completeEdition).toBe(true);
    expect(evaluateReleaseGate({ channel: 'final', status })).toMatchObject({
      allowed: false,
      blockers: expect.arrayContaining(['version:is-prerelease']),
    });
    expect(buildReleaseCommands({
      channel: 'final', status,
      repository: { workingTreeClean: true, branch: 'main', head: 'abc', remoteFinalTagExists: false },
    }).commands).toEqual([]);
  });

  it('builds an immutable RC tag and branch push only after the clean-worktree gate', () => {
    const status = deriveReleaseStatus({
      version: '2.0.0-rc.2', runtimeMediaApis: false,
      completed: { ...completeCounts, animatedCgRuntime: 0 },
      mediaReadiness: { total: 109, ready: 85, blocked: 24, byRoot: {}, blockers: [] },
      providerProbes: { probes: [imageProbe(true), pieProbe], compatibilityProbes: [] },
      pendingMediaJobs: 0,
    });
    const repository = {
      workingTreeClean: true,
      branch: 'codex/albina-v2-complete',
      head: 'abc',
      localReleaseTagCommit: null,
      remoteReleaseTagExists: false,
    };
    expect(buildReleaseCommands({ channel: 'rc', status, repository })).toMatchObject({
      allowed: true,
      incomplete: true,
      commands: [
        ['tag', '-a', 'v2.0.0-rc.2', '-m', 'Albina 2.0.0-rc.2', 'abc'],
        ['push', 'origin', 'HEAD:refs/heads/codex/albina-v2-complete'],
        ['push', 'origin', 'refs/tags/v2.0.0-rc.2'],
      ],
    });
    expect(buildReleaseCommands({
      channel: 'rc',
      status,
      repository: { ...repository, remoteReleaseTagExists: true },
    })).toMatchObject({
      allowed: false,
      commands: [],
      blockers: expect.arrayContaining(['tag:v2.0.0-rc.2-already-published']),
    });
    expect(buildReleaseCommands({ channel: 'rc', status, repository: { ...repository, workingTreeClean: false } })).toMatchObject({
      allowed: false,
      commands: [],
      blockers: expect.arrayContaining(['git:working-tree-dirty']),
    });
  });

  it('summarizes the current checked-in artifacts instead of trusting release-status.json', async () => {
    const [manifest, story, probes] = await Promise.all([
      readFile(join(process.cwd(), 'content/asset-manifest-v2.json'), 'utf8').then(JSON.parse),
      readFile(join(process.cwd(), 'dist/albina-galgame-card/data/game-script-v2.json'), 'utf8').then(JSON.parse),
      readFile(join(process.cwd(), 'content/media-production/provider-probes-v1.json'), 'utf8').then(JSON.parse),
    ]);
    const summary = summarizeReleaseArtifacts({ manifest, story, providerProbes: probes });
    expect(summary.mediaReadiness.total).toBeGreaterThan(0);
    expect(summary.completed.deterministicScenes).toBe(64);
    expect(summary.completed.endings).toBe(9);
    expect(summary.completed.fixedVoiceAssets).toBe(166);
    expect(summary.completed.animatedCgRuntime).toBe(24);
    expect(summary.completed.animatedCgDesktop).toBe(24);
    expect(summary.completed.staticCharacterPortraits).toBe(27);
    expect(summary.completed.staticAlbinaPortraits).toBe(13);
    expect(summary.completed.licensedBgm).toBe(5);
  });

  it('keeps final verification requirements visible in npm verify', async () => {
    const packageJson = JSON.parse(await readFile(join(process.cwd(), 'package.json'), 'utf8')) as { scripts: Record<string, string> };
    expect(packageJson.scripts.verify).toContain('media:readiness:strict');
    expect(packageJson.scripts.verify).toContain('test:e2e');
    expect(packageJson.scripts.verify).toContain('build');
  });
});
