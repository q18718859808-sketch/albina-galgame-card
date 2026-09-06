import { describe, expect, it } from 'vitest';

import { analyzeMediaReadiness } from '../../scripts/lib/media-readiness.mjs';

const rights = {
  status: 'verified', sourceType: 'model-output', redistribution: 'allowed',
  rightsBasis: 'Verified provider terms.', holder: 'Project',
};
const provenance = {
  provider: 'wisart-openai-compatible', model: 'gpt-image-2',
  promptVersion: 'image-v1', sourceJobHash: 'a'.repeat(64),
  review: { status: 'approved', reviewer: 'reviewer', reviewedAt: '2026-07-15T00:00:00.000Z' },
};
const lineage = { kind: 'original', processVersion: 'image-v1', inputs: [] };

describe('media release readiness', () => {
  it('deduplicates semantic and physical records by path and accepts complete evidence on either record', () => {
    const report = analyzeMediaReadiness({ assets: [
      { id: 'file.cg.test.png', kind: 'image', path: 'cg/test.png' },
      { id: 'cg.test', kind: 'image', path: 'cg/test.png', rights, provenance, lineage },
    ] });
    expect(report).toMatchObject({ total: 1, ready: 1, blocked: 0, byRoot: { cg: { total: 1, ready: 1, blocked: 0 } } });
  });

  it('blocks unverified rights, missing lineage, and model output without provenance', () => {
    const report = analyzeMediaReadiness({ assets: [
      { id: 'cg.unverified', kind: 'image', path: 'cg/unverified.png', rights: { ...rights, status: 'unverified', redistribution: 'unverified' }, lineage },
      { id: 'cg.no-lineage', kind: 'image', path: 'cg/no-lineage.png', rights, provenance },
      { id: 'cg.no-provenance', kind: 'image', path: 'cg/no-provenance.png', rights, lineage },
    ] });
    expect(report).toMatchObject({ total: 3, ready: 0, blocked: 3 });
    expect(report.blockers.map((asset: { issues: string[] }) => asset.issues)).toEqual(expect.arrayContaining([
      expect.arrayContaining(['rights']),
      expect.arrayContaining(['lineage']),
      expect.arrayContaining(['provenance']),
    ]));
  });

  it('allows project-authored visuals without a model provenance record', () => {
    const report = analyzeMediaReadiness({ assets: [{
      id: 'ui.icon', kind: 'image', path: 'ui/icon.svg',
      rights: { ...rights, sourceType: 'project-authored' }, lineage,
    }] });
    expect(report).toMatchObject({ total: 1, ready: 1, blocked: 0 });
  });

  it('blocks forged provider pairs', () => {
    const report = analyzeMediaReadiness({ assets: [
      { id: 'cg.pie-image', kind: 'image', path: 'cg/pie-image.png', rights, lineage, provenance: { ...provenance, provider: 'pie' } },
      { id: 'cg.x666', kind: 'image', path: 'cg/x666.png', rights, lineage, provenance: { ...provenance, provider: 'x666-openai-compatible' } },
      { id: 'video.wisart', kind: 'video', path: 'video/wisart.mp4', rights, lineage, provenance },
    ] });
    expect(report).toMatchObject({ total: 3, ready: 0, blocked: 3 });
    expect(report.blockers.every((asset: { issues: string[] }) => asset.issues.includes('provenance'))).toBe(true);
  });

  it('accepts the latent-moe async image provenance pair as part of the production whitelist', () => {
    const report = analyzeMediaReadiness({ assets: [{
      id: 'cg.latent', kind: 'image', path: 'cg/latent.png', rights, lineage,
      provenance: { ...provenance, provider: 'latent-moe', model: 'latent-moe-async' },
    }] });
    expect(report).toMatchObject({ total: 1, ready: 1, blocked: 0 });
  });

  it('blocks latent-moe pairs when the model identifier is not on the whitelist', () => {
    const report = analyzeMediaReadiness({ assets: [{
      id: 'cg.latent-bad-model', kind: 'image', path: 'cg/latent-bad.png', rights, lineage,
      provenance: { ...provenance, provider: 'latent-moe', model: 'latent-moe-v2' },
    }] });
    expect(report).toMatchObject({ total: 1, ready: 0, blocked: 1 });
    expect(report.blockers[0]?.issues).toContain('provenance');
  });

  it('reports a missing or invalid rights source type even when the rights object exists', () => {
    const { sourceType: _sourceType, ...rightsWithoutSourceType } = rights;
    const report = analyzeMediaReadiness({ assets: [
      { id: 'cg.missing-source-type', kind: 'image', path: 'cg/missing-source-type.png', rights: rightsWithoutSourceType, lineage },
      { id: 'cg.invalid-source-type', kind: 'image', path: 'cg/invalid-source-type.png', rights: { ...rights, sourceType: 'unknown' }, lineage },
    ] });
    expect(report).toMatchObject({ total: 2, ready: 0, blocked: 2 });
    expect(report.blockers.every((asset: { issues: string[] }) => asset.issues.includes('source-type'))).toBe(true);
  });
});
