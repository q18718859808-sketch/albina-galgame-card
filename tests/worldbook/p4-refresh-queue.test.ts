import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('P4 refresh review queue', () => {
  it('contains only the 156 pending P4 targets and keeps every record fail-closed', async () => {
    const queue = JSON.parse(await readFile('content/worldbook/albina-p4-refresh-queue-v1.json', 'utf8')) as {
      status: string;
      sourceFile: string;
      targetCount: number;
      targets: Array<{ id: string; legacySourceRefs: unknown[]; review: { status: string; currentSourceRefs: unknown[]; claimIds: unknown[] } }>;
    };
    expect(queue).toMatchObject({
      status: 'awaiting-current-source-review',
      sourceFile: 'albina_p4_article_reviewed_identity_worldbook.json',
      targetCount: 156,
    });
    expect(queue.targets).toHaveLength(156);
    expect(new Set(queue.targets.map((target) => target.id)).size).toBe(156);
    expect(queue.targets.every((target) => target.legacySourceRefs.length > 0)).toBe(true);
    expect(queue.targets.every((target) => target.review.status === 'unreviewed')).toBe(true);
    expect(queue.targets.every((target) => target.review.currentSourceRefs.length === 0)).toBe(true);
    expect(queue.targets.every((target) => target.review.claimIds.length === 0)).toBe(true);
  });
});
