import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

import { ALBINA_CDN_BASE, ALBINA_RELEASE_VERSION } from '../../src/runtime/asset-resolver';

const run = promisify(execFile);
const projectRoot = process.cwd();
const releaseRoots = [
  'dist/albina-galgame-card',
  'release/github-cdn-root/dist/albina-galgame-card',
];
const allowedEntries = new Set(['assets', 'data', 'manifest.json', 'release-status.json', 'source', 'worldbooks']);
const releasedWorldbooks = [
  'albina-worldbook-au-if-v1.json',
  'albina-worldbook-l1-albina-core-v1.json',
  'albina-worldbook-l2-canto-ix-main-cast-v1.json',
  'albina-worldbook-l3-world-expansion-v1.json',
  'albina-worldbook-l4-mechanics-v1.json',
  'albina-worldbook-l5-reviewed-identities-v1.json',
  'albina-worldbook-plot-full-timeline-v1.json',
  'albina_canon_worldbook_v1.json',
  'albina_worldbook_packages_v1.json',
];

async function json(path: string): Promise<Record<string, unknown>> {
  return JSON.parse(await readFile(join(projectRoot, path), 'utf8')) as Record<string, unknown>;
}

async function isIgnored(path: string): Promise<boolean> {
  try {
    await run('git', ['check-ignore', '--no-index', '--quiet', '--', path], { cwd: projectRoot });
    return true;
  } catch (error) {
    if ((error as { code?: number }).code === 1) return false;
    throw error;
  }
}

describe('offline release boundary', () => {
  it.each(releaseRoots)('contains only the approved v2 surface in %s', async (root) => {
    const entries = await readdir(join(projectRoot, root));
    expect(entries.sort()).toEqual([...allowedEntries].sort());
  });

  it.each(releaseRoots)('has no bridge, cinema, console, SFE, or video injector in %s', async (root) => {
    const entries = await readdir(join(projectRoot, root), { recursive: true });
    const normalized = entries.map((path) => path.replaceAll('\\', '/'));
    expect(normalized).not.toContain('video-injector.js');
    expect(normalized.every((path) => !/(?:^|\/)(?:albina-bridge|cinema|console|sfe)(?:\/|$)|(?:^|\/)video-injector\.js$/u.test(path))).toBe(true);
  });

  it.each(releaseRoots)('keeps Krea2 local-review evidence out of %s', async (root) => {
    const entries = await readdir(join(projectRoot, root), { recursive: true });
    const normalized = entries.map((path) => path.replaceAll('\\', '/'));
    expect(normalized.every((path) => !/(?:^|\/)(?:krea2-au-cg|krea2-local-preview|KREA2_LOCAL_PREVIEW\.json|(?:preview|portrait|cg)-review\.html)(?:\/|$)/iu.test(path))).toBe(true);
  });

  it.each(releaseRoots)('excludes production progress, retired source art, Albina strips, and every retired video in %s', async (root) => {
    const entries = await readdir(join(projectRoot, root), { recursive: true });
    const normalized = entries.map((path) => path.replaceAll('\\', '/'));
    const forbidden = /(?:^|\/)assets\/(?:original_albina_sprites|original_bg_story|original_cg|videos|video\/animated)(?:\/|$)|(?:^|\/)assets\/sprite-atlas\/(?:_progress\.json|(?:albina|original_[^/]+)(?:\/|$))/u;

    expect(normalized.filter((path) => forbidden.test(path))).toEqual([]);
  });

  it.each(releaseRoots)('publishes the layered runtime worldbooks but excludes audit-only indexes in %s', async (root) => {
    const worldbooks = await readdir(join(projectRoot, root, 'worldbooks'), { recursive: true });
    const normalized = worldbooks.map((path) => path.replaceAll('\\', '/')).sort();
    expect(normalized).toEqual([...releasedWorldbooks].sort());
    expect(normalized.every((path) => !/quarantine|source-index/iu.test(path))).toBe(true);
    const manifest = await json(join(root, 'worldbooks/albina_worldbook_packages_v1.json')) as {
      packages: Array<{ id: string; entryCount: number }>;
      excluded: { quarantine: { entryCount: number }; sourceIndex: { entryCount: number } };
    };
    expect(manifest.packages.reduce((sum, entry) => sum + entry.entryCount, 0)).toBe(341);
    expect(manifest.excluded).toEqual({
      quarantine: expect.objectContaining({ entryCount: 258 }),
      sourceIndex: expect.objectContaining({ entryCount: 1882 }),
    });
  });

  it.each(releaseRoots)('removes bridge, SFE, and cinema keys from %s/manifest.json', async (root) => {
    const manifest = await json(join(root, 'manifest.json'));
    for (const key of [
      'bridge', 'sfe', 'cinema',
      'original_cg', 'original_albina_sprites', 'original_bg_story', 'original_bg_battle',
      'bgm_metadata', '_removed_official_resources_note',
    ]) expect(manifest).not.toHaveProperty(key);
  });

  it('ignores environment files at every depth while retaining examples', async () => {
    await expect(isIgnored('.env')).resolves.toBe(true);
    await expect(isIgnored('nested/.env')).resolves.toBe(true);
    await expect(isIgnored('nested/deeper/.env.production')).resolves.toBe(true);
    await expect(isIgnored('.env.example')).resolves.toBe(false);
    await expect(isIgnored('nested/.env.example')).resolves.toBe(false);
  });

  it('documents an immutable release candidate while reserving the final tag', async () => {
    const documentation = await Promise.all([
      'README.md',
      'TAGGING.md',
      'CDN_IMPORT.md',
      'SECURITY.md',
      'card/card-protocol.md',
      'card/character_card_protocol.md',
    ].map((path) => readFile(join(projectRoot, path), 'utf8')));
    const joined = documentation.join('\n');
    expect(joined).toMatch(/release candidate/iu);
    expect(joined).toMatch(/(?:reserved|保留)/iu);
    expect(joined).toContain('@v2.0.0-rc.2/');
    expect(joined).not.toContain('@v2.0.0/');
    expect(joined).not.toMatch(/document\.createElement\(['"]script['"]\)/iu);
    expect(joined).not.toMatch(/git\s+tag\s+v2\.0\.0/iu);
  });

  it('defines an executable tag-then-public-verification release protocol', async () => {
    const tagging = await readFile(join(projectRoot, 'TAGGING.md'), 'utf8');
    const phases = ['Pre-tag gate', 'Immutable tag', 'Public verification', 'Release attestation'];
    const positions = phases.map((phase) => tagging.indexOf(phase));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect(positions).toEqual([...positions].sort((left, right) => left - right));
    expect(tagging).toContain('does not permit moving the tag');
  });

  it.each(['card/albina.card.json', 'card/character-card.template.json'])('pins CDN metadata to the immutable RC in %s', async (path) => {
    const card = await json(path) as {
      data: { cdn_import?: string; extensions: { albina_galgame_card: { cdn_import?: string } } };
    };
    const values = [card.data.cdn_import, card.data.extensions.albina_galgame_card.cdn_import].filter(Boolean).join('\n');
    expect(values).toContain('@v2.0.0-rc.2/');
    expect(values).not.toContain('@v2.0.0/');
  });

  it('keeps generated RC metadata import-relative for tag-portable assets', async () => {
    const manifest = await json('dist/albina-galgame-card/manifest.json');
    const lookup = await json('dist/albina-galgame-card/assets/runtime-lookup.json') as {
      base: string; assetsById: Record<string, string>; portraitsById: Record<string, string>;
    };
    expect(manifest.version).toBe('2.0.0-rc.2');
    expect(manifest.base).toBe('.');
    expect(lookup.base).toBe('.');
    expect([...Object.values(lookup.assetsById), ...Object.values(lookup.portraitsById)]
      .every((path) => path.startsWith('assets/') && !path.includes('://'))).toBe(true);
    expect(ALBINA_RELEASE_VERSION).toBe('2.0.0-rc.2');
    expect(ALBINA_CDN_BASE).toBe('.');
  });

  it('does not instruct removed cinematic engines or claim a compatibility fallback', async () => {
    const card = await readFile(join(projectRoot, 'card/albina.card.json'), 'utf8');
    expect(card).not.toMatch(/\[cinema:[^\]]+\]/iu);
    expect(card).not.toContain('文件级兼容回退');
  });
});
