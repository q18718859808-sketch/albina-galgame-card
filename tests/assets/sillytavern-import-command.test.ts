import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

const projectRoot = resolve(import.meta.dirname, '../..');

describe('SillyTavern import verification command', () => {
  it('uses an isolated local data root and the TavernForge import verifier', async () => {
    const script = await readFile(resolve(projectRoot, 'scripts/verify-sillytavern-import.mjs'), 'utf8');
    const host = await readFile(resolve(projectRoot, 'scripts/lib/sillytavern-host.mjs'), 'utf8');
    expect(host).toContain("'.verification'");
    expect(script).toContain("'scripts/st-verify.mjs'");
    expect(script).toContain("'card/albina.card.png'");
    expect(script).toContain("'--base', base");
    expect(script).toContain("'--browserLaunchEnabled', 'false'");
    expect(script).toContain("'--dataRoot', dataRoot");
    expect(script).toContain('albina-import-diagnostics.json');
    expect(script).toContain('probeModule');
    expect(script).toContain('resolveRelativeModuleUrl');
    expect(script).toContain('--retries');
    expect(script).toContain('TavernHelper CDN import script');
    expect(script).toContain('TAVERN_FORGE_ROOT');
    expect(script).toContain('SILLYTAVERN_ROOT');
    expect(script).toContain("'--base'");
    expect(script).not.toMatch(/[A-Z]:\\(?:Users|sillytavern)/u);
  });

  it('keeps runtime diagnostics bounded and does not add unknown SillyTavern API calls', async () => {
    const script = await readFile(resolve(projectRoot, 'scripts/verify-sillytavern-import.mjs'), 'utf8');
    expect(script).toContain("await writeFile(diagnosticsPath");
    expect(script).toContain("replace(/Bearer\\s+");
    expect(script).not.toMatch(/\/api\/(?:world|lore|variables|scripts)/u);
    expect(script).not.toContain('ST_FORGE_API_KEY');
    expect(script).not.toContain('GCLI_API_KEY');
    expect(script).not.toContain('body: body');
  });
});
