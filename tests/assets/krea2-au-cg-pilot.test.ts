import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { describe, expect, it } from 'vitest';

describe('Krea2 AU key CG pilot', () => {
  it('uses only the local original anchor and keeps every CG out of public release', async () => {
    const script = await readFile(resolve(import.meta.dirname, '../../scripts/run-krea2-au-cg-pilot.mjs'), 'utf8');
    expect(script).toContain("purpose: 'original AU key CG candidate; local review only'");
    expect(script).toContain("provenance: 'local-original-au-anchor-candidate'");
    expect(script).toContain("'prohibited-until-originality-and-rights-review'");
    expect(script).toContain("'white-canvas'");
    expect(script).toContain("'golden-bough'");
    expect(script).toContain("'ring-gallery'");
    expect(script).toContain('width: 1280, height: 720');
    expect(script).toContain("staging/media/krea2-au-cg");
    expect(script).not.toContain("dist/albina-galgame-card");
    expect(script).not.toContain("release/github-cdn-root");
    expect(script).not.toContain("content/asset-manifest-v2.json");
    expect(script).toContain('validateKrea2ProductionStyleChain(workflow)');
    expect(script.indexOf('validateKrea2ProductionStyleChain(workflow)')).toBeLessThan(script.indexOf('copyFile(anchorPath'));
    expect(script.indexOf('validateKrea2ProductionStyleChain(workflow)')).toBeLessThan(script.indexOf('fetch(`${comfyUrl}/prompt`'));
  });
});
