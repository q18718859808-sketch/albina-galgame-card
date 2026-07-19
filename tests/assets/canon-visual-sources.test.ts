import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('canon visual production references', () => {
  it('binds every research-only source copy to a hash without allowing redistribution', async () => {
    const index = JSON.parse(await readFile('content/media-production/canon-visual-sources-v1.json', 'utf8'));
    const files = (await readdir('staging/research/canon-visual/wiki-game-assets')).filter((name) => /\.(?:jpg|jpeg|png)$/iu.test(name));
    expect(index.version).toBe(1);
    expect(index.assets).toHaveLength(37);
    expect(index.assets.map((asset: any) => asset.localPath.split('/').at(-1)).sort()).toEqual(files.sort());
    for (const asset of index.assets) {
      expect(asset.localPath).toMatch(/^staging\/research\/canon-visual\/wiki-game-assets\/[^/]+\.(?:jpg|jpeg|png)$/iu);
      expect(asset.localPath).not.toMatch(/(?:dist|release)\//iu);
      expect(asset.usage).toBe('production-reference-only');
      expect(asset.redistribution).toBe('forbidden');
      const bytes = await readFile(asset.localPath);
      expect((await stat(asset.localPath)).size).toBe(asset.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
      expect(asset.width).toBeGreaterThan(0); expect(asset.height).toBeGreaterThan(0);
      if (asset.reviewStatus === 'source-identified') {
        expect(asset.sourceAssetName).toBeTruthy(); expect(asset.sourceUrl).toMatch(/^https:\/\/limbuscompany\.wiki\.gg\/images\//u);
      }
    }
    const subjects = new Set(index.assets.map((asset: any) => asset.subject));
    for (const subject of ['albina', 'callisto', 'ren', 'dante', 'faust', 'vergilius', 'alyssa', 'sinclair-smoke-war']) expect(subjects.has(subject)).toBe(true);
  });

  it('allows frozen prompts to use only source-identified reference copies', async () => {
    const index = JSON.parse(await readFile('content/media-production/canon-visual-sources-v1.json', 'utf8'));
    const prompts = JSON.parse(await readFile('content/media-production/visual-prompts-v2.json', 'utf8'));
    const sources = new Map<string, any>(index.assets.map((asset: any) => [asset.id, asset]));
    const referenced = prompts.prompts.flatMap((prompt: any) => prompt.referenceSourceIds ?? []);
    expect(new Set(referenced).size).toBe(12);
    for (const id of referenced) expect(sources.get(id)?.reviewStatus).toBe('source-identified');
    for (const unrelated of [
      'canon.visual.canto-ix.9-14.s914',
      'canon.visual.canto-ix.9-18.s909-1',
      'canon.visual.canto-ix.9-18.s909-2',
      'canon.visual.canto-ix.9-18.s918',
      'canon.visual.canto-ix.9-37.s937',
      'canon.visual.canto-ix.9-43.s929-1',
      'canon.visual.canto-ix.9-43.s929-2',
      'canon.visual.canto-ix.9-43.s930-1',
      'canon.visual.canto-ix.9-43.s930-2',
      'canon.visual.canto-ix.9-43.s943-1',
      'canon.visual.canto-ix.9-43.s943-2',
    ]) expect(referenced).not.toContain(unrelated);
    const canonRecapFreeze = JSON.stringify(prompts.prompts.filter((prompt: any) => prompt.jobId.includes('.canon_recap_')));
    expect(canonRecapFreeze).not.toMatch(/\bS(?:909|914|918|929|930|937|943)\b/u);
  });

  it('binds every canon recap prompt to the exact claims carried by its scene', async () => {
    const prompts = JSON.parse(await readFile('content/media-production/visual-prompts-v2.json', 'utf8'));
    const story = JSON.parse(await readFile('dist/albina-galgame-card/data/game-script-v2.json', 'utf8'));
    const claims = JSON.parse(await readFile('content/canon-claims-v1.json', 'utf8'));
    const claimIds = new Set(claims.claims.map((claim: any) => claim.id));
    const sceneById = new Map<string, any>(story.scenes.map((scene: any): [string, any] => [scene.id, scene]));
    const recapPrompts = prompts.prompts.filter((prompt: any) => prompt.jobId.startsWith('visual.image.cg.canon_recap_'));
    expect(recapPrompts).toHaveLength(6);
    for (const prompt of recapPrompts) {
      const sceneId = prompt.jobId.replace('visual.image.cg.', '');
      const expected = sceneById.get(sceneId)?.provenance?.claimIds;
      expect(prompt.canonClaimIds, prompt.jobId).toEqual(expected);
      expect(prompt.canonClaimIds.length, prompt.jobId).toBeGreaterThan(0);
      for (const id of prompt.canonClaimIds) expect(claimIds.has(id), `${prompt.jobId}: ${id}`).toBe(true);
    }
  });
});
