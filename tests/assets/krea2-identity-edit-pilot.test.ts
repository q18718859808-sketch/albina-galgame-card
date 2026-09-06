import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');
const scriptPath = resolve(projectRoot, 'scripts/run-krea2-identity-edit-pilot.mjs');

describe('Krea2 Identity Edit local pilot', () => {
  it('uses an explicit ComfyUI prompt id and preserves the non-public candidate boundary', async () => {
    const script = await readFile(scriptPath, 'utf8');
    expect(script).toContain("prompt_id: promptId");
    expect(script).toContain("body.prompt_id !== promptId");
    expect(script).toContain("publicRelease: 'prohibited-until-rights-and-visual-review'");
    expect(script).toContain("purpose: 'non-public single-reference workflow pilot; no character or third-party reference input'");
  });

  it('keeps the pilot confined to a reviewed Krea2 background and staging output', async () => {
    const script = await readFile(scriptPath, 'utf8');
    expect(script).toContain('staging/media/krea2-v1/delivery/visual.image.bg.lce_lab.jpg');
    expect(script).toContain('staging/media/krea2-identity-edit/pilot-lce-lab.png');
    expect(script).toContain('Do not add people, silhouettes, readable text, logos, watermarks, or interface elements.');
  });
});
