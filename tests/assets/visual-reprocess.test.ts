import { describe, expect, it } from 'vitest';

import { recordLocallyReprocessedArtifact } from '../../scripts/lib/visual-production.mjs';

describe('local visual reprocessing', () => {
  it('updates only delivery evidence while preserving paid-request provenance', () => {
    const paidRecord = {
      jobId: 'visual.image.portrait.albina.armored',
      status: 'needs-review',
      sourceJobHash: 'a'.repeat(64),
      requestKey: 'b'.repeat(64),
      receiptAssetId: 'file.characters.albina.armored.png',
      activeAttempt: 4,
      attempts: [{
        attempt: 4, status: 'needs-review', startedAt: '2026-07-21T01:00:00.000Z',
        responseReceivedAt: '2026-07-21T01:01:00.000Z', failedAt: '2026-07-21T01:02:00.000Z',
      }],
      requestId: 'request-4',
      responseSha256: 'c'.repeat(64),
      rawResponsePath: 'staging/media/visual-v2/visual.image.portrait.albina.armored/response-04.raw',
      sourcePath: 'staging/media/visual-v2/visual.image.portrait.albina.armored/source-04.png',
      sourceSha256: 'd'.repeat(64),
      error: 'Portrait post-processing failed',
      review: { status: 'rejected' },
      reviewPath: 'staging/media/visual-v2/visual.image.portrait.albina.armored/review-04.json',
      history: [{ status: 'rejected', requestKey: 'old-paid-request' }],
    };
    const entry = {
      job: { id: paidRecord.jobId, category: 'characters' },
      prompt: { reviewCriteria: ['identity matches'] },
    };
    const artifact = {
      path: 'D:\\创作\\albina-v2-complete\\staging\\media\\visual-v2\\visual.image.portrait.albina.armored\\delivery-04.png',
      sha256: 'e'.repeat(64), bytes: 1234,
      sourceInfo: { width: 1024, height: 1536 }, deliveryInfo: { width: 1024, height: 1536 },
      pixels: { source: { nonBlank: true }, delivery: { hasTransparency: true } },
    };

    const result = recordLocallyReprocessedArtifact(paidRecord as any, entry as any, artifact as any, '2026-07-21T02:00:00.000Z');

    expect(result).toMatchObject({
      status: 'awaiting-review', requestKey: paidRecord.requestKey, requestId: paidRecord.requestId,
      responseSha256: paidRecord.responseSha256, sourcePath: paidRecord.sourcePath,
      sourceSha256: paidRecord.sourceSha256, artifactSha256: artifact.sha256, artifactBytes: 1234,
      locallyReprocessedAt: '2026-07-21T02:00:00.000Z', history: paidRecord.history,
    });
    expect(result).not.toHaveProperty('error');
    expect(result).not.toHaveProperty('review');
    expect(result).not.toHaveProperty('reviewPath');
    expect(result.attempts[0]).toMatchObject({
      status: 'awaiting-review', startedAt: '2026-07-21T01:00:00.000Z',
      responseReceivedAt: '2026-07-21T01:01:00.000Z',
      previousProcessingFailure: {
        failedAt: '2026-07-21T01:02:00.000Z', error: 'Portrait post-processing failed',
      },
    });
  });
});
