import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

describe('Krea2 AU character anchor pilot', () => {
  it('keeps the character anchor local, original, and free of image references', async () => {
    const script = await readFile(resolve(import.meta.dirname, '../../scripts/run-krea2-au-character-anchor-pilot.mjs'), 'utf8');
    expect(script).toContain("references: { sentToModel: false, inputs: []");
    expect(script).toContain("'original AU character anchor candidate; local review only'");
    expect(script).toContain("'prohibited-until-originality-and-rights-review'");
    expect(script).toContain("aspectRatio: '9:16 (Portrait Widescreen)'");
  });
});
