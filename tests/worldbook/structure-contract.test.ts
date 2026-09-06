import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

// @ts-expect-error Script-only validator intentionally has no declaration file.
import { validateWorldbookStructure } from '../../scripts/sync-canon-card.mjs';

const readJson = async (file: string) => JSON.parse(await readFile(file, 'utf8'));

describe('worldbook structure contract', () => {
  it('preserves the 16-entry L0 and the ordered plot timeline', async () => {
    const [contract, source, timeline, l0, runtime] = await Promise.all([
      readJson('content/worldbook/worldbook-structure-contract-v1.json'),
      readJson('content/albina-card-canon-v1.json'),
      readJson('content/worldbook/albina-worldbook-plot-full-timeline-v1.json'),
      readJson('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json'),
      readJson('content/worldbook/player-profile-runtime-v1.json'),
    ]);
    expect(() => validateWorldbookStructure(contract, source, timeline, l0, runtime)).not.toThrow();
    expect(l0.entries).toHaveLength(16);
    expect(source.card.character_book.entries).toHaveLength(15);
  });

  it('fails closed when a timeline order or UID is changed', async () => {
    const [contract, source, timeline, l0, runtime] = await Promise.all([
      readJson('content/worldbook/worldbook-structure-contract-v1.json'),
      readJson('content/albina-card-canon-v1.json'),
      readJson('content/worldbook/albina-worldbook-plot-full-timeline-v1.json'),
      readJson('content/worldbook/albina-worldbook-l0-minimal-anchors-v1.json'),
      readJson('content/worldbook/player-profile-runtime-v1.json'),
    ]);
    const broken = structuredClone(timeline);
    broken.entries[1].uid = broken.entries[0].uid;
    expect(() => validateWorldbookStructure(contract, source, broken, l0, runtime)).toThrow(/UID\/order changed|UIDs must be unique/i);
  });
});
