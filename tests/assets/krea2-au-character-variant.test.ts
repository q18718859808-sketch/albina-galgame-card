import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Krea2 AU character variants', () => {
  it('derives variants only from the local AU anchor and retains the review boundary', async () => {
    const script = await readFile(resolve(import.meta.dirname, '../../scripts/run-krea2-au-character-variant-pilot.mjs'), 'utf8');
    expect(script).toContain("provenance: 'local-original-au-anchor-candidate'");
    expect(script).toContain("ref_boost: 4");
    expect(script).toContain("'prohibited-until-originality-and-rights-review'");
    expect(script).toContain("'white-canvas'");
    expect(script).toContain("seedFor(variant)");
    expect(script).toContain("Unsupported --variant");
    expect(script).toContain('validateKrea2ProductionStyleChain(workflow)');
    expect(script.indexOf('validateKrea2ProductionStyleChain(workflow)')).toBeLessThan(script.indexOf('copyFile(anchorPath'));
    expect(script.indexOf('validateKrea2ProductionStyleChain(workflow)')).toBeLessThan(script.indexOf('fetch(`${comfyUrl}/prompt`'));
  });
});
