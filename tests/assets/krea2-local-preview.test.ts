import { execFile } from 'node:child_process';
import { access, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';
import { promisify } from 'node:util';

import { describe, expect, it } from 'vitest';

const run = promisify(execFile);
const root = process.cwd();
const preview = join(root, 'staging/media/krea2-local-preview');
// The vitest worker inherits a NODE_OPTIONS --require shim injected by the
// desktop host, which adds ~30s of startup time to every node child process.
// The build script is a plain Node script and must run unshimmed, exactly as
// it does from a bare shell.
//
// Under a full vitest run the host job object can terminate a spawned child
// at an arbitrary moment; if a grandchild still holds the inherited stdio
// handles the execFile promise never settles. Guard with a hard timeout and
// retry once: the script's PID-file lock marks the dead holder as orphaned,
// so the retry takes over immediately.
const runPlainNode = (args: string[], { retries = 1 }: { retries?: number } = {}): Promise<{ stdout: string }> => {
  const attempt = (remaining: number): Promise<{ stdout: string }> => run(process.execPath, args, {
    cwd: root,
    env: { ...process.env, NODE_OPTIONS: '' },
    timeout: 120_000,
  }).catch((error: unknown) => {
    if (remaining <= 0) throw error;
    console.warn(`[krea2] execFile attempt failed, retrying: ${(error as Error).message}`);
    return new Promise((resolve_) => setTimeout(resolve_, 1_000))
      .then(() => attempt(remaining - 1));
  });
  return attempt(retries);
};

describe.sequential('Krea2 local preview assembly', () => {
  it('builds a non-release background preview with reviewed deliveries only', async () => {
    const { stdout } = await runPlainNode(['scripts/build-krea2-local-preview.mjs']);
    expect(JSON.parse(stdout)).toMatchObject({ backgrounds: 11, portraits: 13, cgs: 0, status: 'local-preview-only' });
    const evidence = JSON.parse(await readFile(join(preview, 'KREA2_LOCAL_PREVIEW.json'), 'utf8')) as {
      purpose: string;
      backgrounds: Array<{ path: string; deliverySha256: string; rights: { generatedOutput: string } }>;
      portraits: Array<{ path: string; deliverySha256: string; status: string; rights: { publicRelease: string } }>;
      cgs: Array<{ path: string; status: string; rights: { publicRelease: string } }>;
    };
    expect(evidence.purpose).toMatch(/not a public-release artifact/i);
    expect(evidence.backgrounds).toHaveLength(11);
    expect(evidence.backgrounds.every((item) => item.rights.generatedOutput === 'review-required')).toBe(true);
    for (const item of evidence.backgrounds) {
      const output = join(preview, 'assets', item.path);
      await expect(access(output)).resolves.toBeUndefined();
      expect((await stat(output)).size).toBeGreaterThan(0);
    }
    expect(evidence.portraits.map((portrait) => portrait.path)).toEqual([
      'characters/albina/normal.png', 'characters/albina/rain.png', 'characters/albina/combat.png',
      'characters/albina/armored.png', 'characters/albina/endgame.png', 'characters/albina/fascia-open.png',
      'characters/albina/furious.png', 'characters/albina/golden-bough.png', 'characters/albina/maestro.png',
      'characters/albina/ring-conspiracy.png', 'characters/albina/shy.png', 'characters/albina/surgical.png',
      'characters/albina/white-canvas.png',
    ]);
    for (const item of evidence.portraits) {
      expect(item).toMatchObject({
        status: 'local-preview-only',
        rights: { publicRelease: 'prohibited-until-originality-and-rights-review' },
      });
      const portrait = join(preview, 'assets', item.path);
      await expect(access(portrait)).resolves.toBeUndefined();
      expect((await stat(portrait)).size).toBeGreaterThan(0);
    }
    await expect(access(join(preview, 'portrait-review.html'))).resolves.toBeUndefined();
    expect(evidence.cgs).toEqual([]);
    await expect(access(join(preview, 'cg-review.html'))).resolves.toBeUndefined();
  }, 300_000);

  it('injects all three AU key CGs only through the explicit local-review flag', async () => {
    const { stdout } = await runPlainNode(['scripts/build-krea2-local-preview.mjs', '--include-au-cg']);
    // The rejected nest_station background stays out of both preview modes, so
    // the AU CG flag must not change the reviewed background count.
    expect(JSON.parse(stdout)).toMatchObject({ backgrounds: 11, portraits: 13, cgs: 3, status: 'local-preview-only' });
    const evidence = JSON.parse(await readFile(join(preview, 'KREA2_LOCAL_PREVIEW.json'), 'utf8')) as {
      purpose: string;
      cgs: Array<{ shot: string; assetId: string; path: string; status: string; rights: { publicRelease: string } }>;
    };
    expect(evidence.purpose).toMatch(/not a public-release artifact/i);
    expect(evidence.cgs).toEqual([
      expect.objectContaining({ shot: 'white-canvas', assetId: 'cg.white_canvas_choice', path: 'cg/white_canvas_choice.jpg' }),
      expect.objectContaining({ shot: 'golden-bough', assetId: 'cg.golden_bough_rebuild', path: 'cg/golden_bough_rebuild.jpg' }),
      expect.objectContaining({ shot: 'ring-gallery', assetId: 'cg.ring_conspiracy_ending', path: 'cg/ring_conspiracy_ending.jpg' }),
    ]);
    for (const item of evidence.cgs) {
      expect(item).toMatchObject({
        status: 'local-preview-only',
        rights: { publicRelease: 'prohibited-until-originality-and-rights-review' },
      });
      const cg = join(preview, 'assets', item.path);
      await expect(access(cg)).resolves.toBeUndefined();
      expect((await stat(cg)).size).toBeGreaterThan(0);
    }
  }, 300_000);
});
