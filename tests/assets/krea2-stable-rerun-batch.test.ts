import { readFile } from 'node:fs/promises';
import { describe, expect, it } from 'vitest';

describe('Krea2 stable rerun coordinator', () => {
  it('uses explicit staging batches and never invokes promotion or formal asset paths', async () => {
    const script = await readFile('scripts/krea2-stable-rerun-batch.mjs', 'utf8');
    expect(script).toContain('krea2-canonical-restyle');
    expect(script).toContain('--receipt-root=');
    expect(script).toContain('--no-comfy-probe');
    expect(script).toContain('candidate === `${prefix}.receipt.json`');
    expect(script).not.toContain('candidate.startsWith(`${prefix}.`)');
    expect(script).not.toContain('promote-visual');
    expect(script).not.toContain('dist/albina-galgame-card/assets');
  });

  it('keeps the production batch partition explicit', async () => {
    const script = await readFile('scripts/krea2-stable-rerun-batch.mjs', 'utf8');
    expect(script).toContain("characters: {");
    expect(script).toContain("backgrounds: {");
    expect(script).toContain("cg: {");
    expect(script).toContain("--group=${selected.group}");
  });
});
