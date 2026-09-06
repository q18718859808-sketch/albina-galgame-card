import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('worldbook coverage gap contract', () => {
  it('preserves the original card and declares unresolved coverage explicitly', async () => {
    const contract = JSON.parse(await readFile(
      'content/worldbook/albina-worldbook-coverage-gap-contract-v1.json',
      'utf8',
    ));
    expect(contract.preservation).toMatchObject({
      cardL0EntryCount: 16,
      plotTimelineEntryCount: 22,
      originalCardEntriesUntouched: true,
      sourceIndexAndQuarantineRemainNonRuntime: true,
    });
    expect(contract.releaseGate).toMatchObject({
      completeLivingWorldVerified: false,
      doNotClaimComplete: true,
    });
    expect(contract.gaps.map((gap: { id: string }) => gap.id)).toEqual([
      'gap.current-source-refresh',
      'gap.normalized-relationship-graph',
      'gap.event-level-canto-i-viii',
    ]);
  });
});
