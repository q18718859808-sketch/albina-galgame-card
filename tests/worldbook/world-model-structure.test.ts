import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const readJson = async (file: string) => JSON.parse(await readFile(file, 'utf8'));

describe('Albina world model structure', () => {
  it('adds a research-only graph and event scaffold without changing the preserved counts', async () => {
    const model = await readJson('content/worldbook/albina-world-model-structure-v1.json');
    const coverage = await readJson('content/worldbook/albina-worldbook-coverage-gap-contract-v1.json');

    expect(model.runtime).toMatchObject({
      defaultEnabled: false,
      runtimeEligible: false,
      injectionPolicy: 'research-only-until-each-record-has-current-source-review',
    });
    expect(model.preservation).toMatchObject({
      cardL0EntryCount: 16,
      plotTimelineEntryCount: 22,
      originalCardEntriesUntouched: true,
    });
    expect(coverage.releaseGate).toMatchObject({
      completeLivingWorldVerified: false,
      doNotClaimComplete: true,
    });
    expect(model.eventChains.map((chain: { chapter: string }) => chain.chapter)).toEqual([
      'Canto I', 'Canto II', 'Canto III', 'Canto IV',
      'Canto V', 'Canto VI', 'Canto VII', 'Canto VIII',
    ]);
  });

  it('keeps relationship endpoints and event causality structurally valid', async () => {
    const model = await readJson('content/worldbook/albina-world-model-structure-v1.json');
    const entityIds = new Set(model.entities.map((entity: { id: string }) => entity.id));
    const sourceIds = new Set(model.sources.map((source: { sourceId: string }) => source.sourceId));

    for (const relationship of model.relationships) {
      expect(entityIds.has(relationship.from)).toBe(true);
      expect(entityIds.has(relationship.to)).toBe(true);
      expect(relationship.reviewStatus).toBeTruthy();
      for (const sourceId of relationship.sourceRefs) expect(sourceIds.has(sourceId)).toBe(true);
    }

    for (const chain of model.eventChains) {
      expect(chain.reviewStatus).toBe('awaiting-current-source-review');
      for (const sourceId of chain.sourceRefs) expect(sourceIds.has(sourceId)).toBe(true);
      const eventIds = new Set<string>();
      for (const event of chain.events) {
        expect(eventIds.has(event.id)).toBe(false);
        eventIds.add(event.id);
        expect(event.status).toBe('canon-candidate');
        expect(event.branchBoundary).toBeTruthy();
        for (const prerequisite of event.preconditions) expect(eventIds.has(prerequisite)).toBe(true);
      }
    }
  });
});
