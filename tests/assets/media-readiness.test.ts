import { describe, expect, it } from 'vitest';

import { analyzeMediaReadiness } from '../../scripts/lib/media-readiness.mjs';

const rights = {
  status: 'verified', sourceType: 'model-output', redistribution: 'allowed',
  rightsBasis: 'Verified provider terms.', holder: 'Project',
};
const provenance = {
  provider: 'x666-openai-compatible', model: 'gpt-image-2', upstreamPieVerified: false,
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

  it('blocks forged provider pairs and missing x666 upstream evidence', () => {
    const report = analyzeMediaReadiness({ assets: [
      { id: 'cg.pie-image', kind: 'image', path: 'cg/pie-image.png', rights, lineage, provenance: { ...provenance, provider: 'pie', upstreamPieVerified: undefined } },
      { id: 'cg.x666-unknown', kind: 'image', path: 'cg/x666-unknown.png', rights, lineage, provenance: { ...provenance, upstreamPieVerified: undefined } },
      { id: 'video.x666', kind: 'video', path: 'video/x666.mp4', rights, lineage, provenance },
    ] });
    expect(report).toMatchObject({ total: 3, ready: 0, blocked: 3 });
    expect(report.blockers.every((asset: { issues: string[] }) => asset.issues.includes('provenance'))).toBe(true);
  });
});
