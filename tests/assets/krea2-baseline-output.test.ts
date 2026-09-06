import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { describe, expect, it } from 'vitest';

const run = promisify(execFile);

describe('Krea2 verified baseline output contract', () => {
  it('records style-reference incompatibility without probing ComfyUI', async () => {
    const tempRoot = await mkdtemp(join(tmpdir(), 'krea2-baseline-'));
    const outputPath = join(tempRoot, 'baseline.json');

    try {
      await run('python', [
        'scripts/build_verified_krea2_baseline.py',
        '--no-probe',
        '--out',
        outputPath,
      ], { cwd: process.cwd(), timeout: 20_000 });

      const record = JSON.parse(await readFile(outputPath, 'utf8'));
      expect(record.verified).toBe(true);
      expect(record.issues).toEqual([]);
      expect(record.comfyui.performed).toBe(false);
      expect(record.hybridPipeline.styleReferenceLocalCompatibility).toEqual({
        node: 'Krea2StyleReferenceNode',
        consumer: 'Krea2ImageNode',
        compatible: false,
        decision: 'do-not-use-in-local-six-lora-production',
      });
    } finally {
      await rm(tempRoot, { recursive: true, force: true });
    }
  });
});
