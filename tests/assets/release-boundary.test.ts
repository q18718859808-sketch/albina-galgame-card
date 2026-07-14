import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

const run = promisify(execFile);
const projectRoot = process.cwd();
const releaseRoots = [
  'dist/albina-galgame-card',
  'release/github-cdn-root/dist/albina-galgame-card',
];
const allowedEntries = new Set(['assets', 'data', 'manifest.json', 'release-status.json', 'source', 'worldbooks']);

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
    expect(normalized.every((path) => !/^(?:albina-bridge|cinema|console|sfe)(?:\/|$)/u.test(path))).toBe(true);
  });

  it.each(releaseRoots)('removes bridge, SFE, and cinema keys from %s/manifest.json', async (root) => {
    const manifest = await json(join(root, 'manifest.json'));
    expect(manifest).not.toHaveProperty('bridge');
    expect(manifest).not.toHaveProperty('sfe');
    expect(manifest).not.toHaveProperty('cinema');
  });

  it('ignores environment files at every depth while retaining examples', async () => {
    await expect(isIgnored('.env')).resolves.toBe(true);
    await expect(isIgnored('nested/.env')).resolves.toBe(true);
    await expect(isIgnored('nested/deeper/.env.production')).resolves.toBe(true);
    await expect(isIgnored('.env.example')).resolves.toBe(false);
    await expect(isIgnored('nested/.env.example')).resolves.toBe(false);
  });

  it('documents an unpublished preview without a runnable public CDN snippet', async () => {
    const documentation = await Promise.all([
      'README.md',
      'TAGGING.md',
      'CDN_IMPORT.md',
      'SECURITY.md',
      'card/card-protocol.md',
      'card/character_card_protocol.md',
    ].map((path) => readFile(join(projectRoot, path), 'utf8')));
    const joined = documentation.join('\n');
    expect(joined).toMatch(/(?:local preview|本地预览)/iu);
    expect(joined).toMatch(/(?:reserved|保留)/iu);
    expect(joined).not.toMatch(/import\s+['"]https:\/\/cdn\.jsdelivr\.net/iu);
    expect(joined).not.toMatch(/document\.createElement\(['"]script['"]\)/iu);
    expect(joined).not.toMatch(/git\s+tag\s+v2\.0\.0/iu);
  });

  it.each(['card/albina.card.json', 'card/character-card.template.json'])('keeps stale CDN metadata fail-closed in %s', async (path) => {
    const card = await json(path) as {
      data: { cdn_import?: string; extensions: { albina_galgame_card: { cdn_import?: string } } };
    };
    const values = [card.data.cdn_import, card.data.extensions.albina_galgame_card.cdn_import].filter(Boolean).join('\n');
    expect(values).toMatch(/(?:reserved|保留)/iu);
    expect(values).not.toMatch(/import\s+['"]https:/iu);
  });
});
