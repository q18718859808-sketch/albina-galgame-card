import { createHash } from 'node:crypto';
import { readFile, readdir, stat } from 'node:fs/promises';

import { describe, expect, it } from 'vitest';

describe('canon visual production references', () => {
  it('binds every research-only source copy to a hash without allowing redistribution', async () => {
    const index = JSON.parse(await readFile('content/media-production/canon-visual-sources-v1.json', 'utf8'));
    const files = (await readdir('staging/research/canon-visual/wiki-game-assets')).filter((name) => /\.(?:jpg|jpeg|png)$/iu.test(name));
    const wikiAssets = index.assets.filter((asset: any) => asset.localPath.startsWith('staging/research/canon-visual/wiki-game-assets/'));
    expect(index.version).toBe(1);
    expect(index.assets).toHaveLength(files.length + 2);
    expect(wikiAssets.map((asset: any) => asset.localPath.split('/').at(-1)).sort()).toEqual(files.sort());
    expect(index.assets.find((asset: any) => asset.id === 'reference.user.albina-style-board')).toMatchObject({
      role: 'deidentified-style-reference',
      derivedFromSourceId: 'reference.user.albina-style-baseline',
      localPath: 'staging/research/style-reference/albina-style-board-deidentified-mosaic.png',
    });
    expect(index.assets.find((asset: any) => asset.id === 'reference.user.albina-style-baseline')).toMatchObject({
      role: 'character-reference-only',
    });
    for (const asset of index.assets) {
      expect(asset.localPath).toMatch(/^staging\/research\/(?:canon-visual\/wiki-game-assets|style-reference)\/[^/]+\.(?:jpg|jpeg|png)$/iu);
      expect(asset.localPath).not.toMatch(/(?:dist|release)\//iu);
      expect(asset.usage).toBe('production-reference-only');
      expect(asset.redistribution).toBe('forbidden');
      const bytes = await readFile(asset.localPath);
      expect((await stat(asset.localPath)).size).toBe(asset.bytes);
      expect(createHash('sha256').update(bytes).digest('hex')).toBe(asset.sha256);
      expect(asset.width).toBeGreaterThan(0); expect(asset.height).toBeGreaterThan(0);
      if (asset.reviewStatus === 'source-identified' && asset.localPath.includes('/canon-visual/')) {
        expect(asset.sourceAssetName).toBeTruthy(); expect(asset.sourceUrl).toMatch(/^https:\/\/limbuscompany\.wiki\.gg\/images\//u);
      }
    }
    const subjects = new Set(index.assets.map((asset: any) => asset.subject));
    for (const subject of ['albina', 'callisto', 'ren', 'dante', 'faust', 'vergilius', 'alyssa', 'sinclair-smoke-war']) expect(subjects.has(subject)).toBe(true);
  });

  it('records the higher-fidelity baseline style-board candidate outside the frozen source index', async () => {
    const migration = JSON.parse(await readFile('content/media-production/style-migration-v1.json', 'utf8'));
    const board = migration.candidateStyleBoard;
    const bytes = await readFile(board.localPath);
    expect(migration.status).toBe('authorization-not-required');
    expect(migration.scope).toMatchObject({
      totalCharacterPortraits: 27,
      blankCharacterPortraits: 23,
      provider: 'wisart-openai-compatible',
      inputMode: 'reference-edit',
      styleBoardPosition: 'last',
    });
    expect(board.role).toBe('pending-deidentified-style-reference');
    expect(bytes.length).toBe(board.bytes);
    expect(createHash('sha256').update(bytes).digest('hex')).toBe(board.sha256);
    expect(migration.migrationContract.join('\n')).toMatch(/Latent has no image input/u);
    expect(migration.migrationContract.join('\n')).toMatch(/does not require a human authorization artifact/u);
    expect(migration.migrationContract.join('\n')).toMatch(/does not authorize promotion, release, or distribution/u);
  });

  it('allows frozen prompts to use only source-identified reference copies', async () => {
    const index = JSON.parse(await readFile('content/media-production/canon-visual-sources-v1.json', 'utf8'));
    const prompts = JSON.parse(await readFile('content/media-production/visual-prompts-v2.json', 'utf8'));
    const sources = new Map<string, any>(index.assets.map((asset: any) => [asset.id, asset]));
    const referenced = prompts.prompts.flatMap((prompt: any) => prompt.referenceSourceIds ?? []);
    expect(new Set(referenced).size).toBe(13);
    for (const id of referenced) expect(sources.get(id)?.reviewStatus).toBe('source-identified');
    for (const prompt of prompts.prompts) {
      expect(prompt.referenceSourceIds ?? [], prompt.jobId).toContain('reference.user.albina-style-board');
      expect(prompt.referenceSourceIds?.at(-1), prompt.jobId).toBe('reference.user.albina-style-board');
      expect(prompt.referenceSourceIds ?? [], prompt.jobId).not.toContain('reference.user.albina-style-baseline');
      expect(
        (prompt.referenceSourceIds ?? []).filter((id: string) => id.startsWith('reference.user.') && id !== 'reference.user.albina-style-board'),
        prompt.jobId,
      ).toEqual([]);
    }
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

  it('keeps Albina canon identity references out of unrelated portrait and CG jobs', async () => {
    const prompts = JSON.parse(await readFile('content/media-production/visual-prompts-v2.json', 'utf8'));
    const albinaIdentityJobs = new Set([
      'visual.image.portrait.albina.normal',
      'visual.image.portrait.albina.armored',
      'visual.image.cg.canon_recap_9_18',
      'visual.image.cg.canon_recap_9_37',
      'visual.image.cg.canon_recap_albina_fascia',
      'visual.image.cg.canon_recap_9_37_battle',
      'visual.image.cg.canon_recap_9_43_outcome',
    ]);
    const portraitOrCg = prompts.prompts.filter((prompt: any) => /^visual\.image\.(?:portrait|cg)\./u.test(prompt.jobId));
    for (const prompt of portraitOrCg) {
      const albinaSources = (prompt.referenceSourceIds ?? []).filter((id: string) => id.startsWith('canon.visual.albina.'));
      if (albinaIdentityJobs.has(prompt.jobId)) {
        expect(albinaSources.length, prompt.jobId).toBeGreaterThan(0);
        expect(prompt.positivePrompt, prompt.jobId).toMatch(/Albina/u);
      } else {
        expect(albinaSources, prompt.jobId).toEqual([]);
      }
    }
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
