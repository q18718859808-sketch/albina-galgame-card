import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

const indexPath = 'content/media-production/krea2-community-solution-index-v3.json';

describe('Krea2 community solution index', () => {
  it('keeps candidates auditable without making six-LoRA compatibility a hard gate', async () => {
    const index = JSON.parse(await readFile(indexPath, 'utf8'));
    expect(index.schemaVersion).toBe(3);
    expect(index.policy.sixLora).toMatch(/informational/);
    expect(index.candidates.length).toBeGreaterThanOrEqual(15);
    for (const candidate of index.candidates) {
      expect(candidate.id).toBeTruthy();
      expect(candidate.category).toBeTruthy();
      expect(candidate.decision).toMatch(/priority-pilot|staging-only|research-only|reject/);
      expect(candidate.evidenceStatus).toBeTruthy();
      expect(candidate.sixLoraCompatibility).toMatch(/native|can-compose|replaces-chain|unknown|incompatible/);
      if (candidate.decision === 'priority-pilot') {
        expect(candidate.latestStableCommit).toBeTruthy();
        expect(candidate.licenseEvidence).toBeTruthy();
        expect(candidate.localRuntimeStatus).not.toBe('unknown');
      }
    }
  });
});
