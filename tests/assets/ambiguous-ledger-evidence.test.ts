import { describe, expect, it } from 'vitest';

import { failLedgerJob, type VisualLedgerRecord } from '../../scripts/lib/visual-production.mjs';

describe('ambiguous ledger evidence consistency', () => {
  it('records the provider http status so ambiguous evidence stays verifiable', () => {
    const ledger: { jobs: Record<string, VisualLedgerRecord> } = {
      jobs: {
        'visual.image.bg.city_rooftop': {
          jobId: 'visual.image.bg.city_rooftop',
          status: 'running',
          activeAttempt: 3,
          attempts: [{ attempt: 3, status: 'running' }],
        },
      },
    };

    const rawRecord = {
      status: 504,
      requestId: 'req-abc',
      endpoint: '/images/generations',
      contentType: 'application/json; charset=utf-8',
      responseSha256: 'a'.repeat(64),
      rawResponsePath: 'staging/media/visual-v2/visual.image.bg.city_rooftop/response-03.raw',
      responseMetaPath: 'staging/media/visual-v2/visual.image.bg.city_rooftop/response-03.meta.json',
    };

    failLedgerJob(ledger, 'visual.image.bg.city_rooftop', 3, new Error('Provider HTTP 504'), true, rawRecord);
    const record = ledger.jobs['visual.image.bg.city_rooftop'];
    if (!record) throw new Error('ledger record is missing');

    expect(record.status).toBe('ambiguous');
    expect(record.httpStatus).toBe(504);
    expect(record.responseContentType).toBe('application/json; charset=utf-8');
    expect(record.requestId).toBe('req-abc');
  });
});
