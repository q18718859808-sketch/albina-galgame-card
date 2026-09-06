import { createHash } from 'node:crypto';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { describe, expect, it } from 'vitest';

import { runAudit } from '../../scripts/audit-krea2-material-passes.mjs';

const hash = (value: string) => createHash('sha256').update(value).digest('hex');

async function fixtureRoot() {
  const root = await mkdtemp(join(tmpdir(), 'albina-krea2-material-audit-'));
  await mkdir(join(root, 'staging/research/canon-visual/wiki-game-assets'), { recursive: true });
  await mkdir(join(root, 'staging/media/characters'), { recursive: true });
  await mkdir(join(root, 'staging/media/backgrounds'), { recursive: true });
  await mkdir(join(root, 'staging/media/cg'), { recursive: true });
  return root;
}

async function writeReceipt(root: string, group: string, id: string, accepted = false) {
  const canonical = 'canonical-rgba';
  const material = `krea2-rgb-${id}`;
  const output = `composited-rgba-${id}`;
  const canonicalPath = join(root, 'staging/research/canon-visual/wiki-game-assets', `${id}.png`);
  const materialPath = join(root, 'staging/media', group, `${id}.rgb.png`);
  const outputPath = join(root, 'staging/media', group, `${id}.png`);
  const productionReceiptPath = join(root, 'staging/media', group, `${id}.krea2.receipt.json`);
  await Promise.all([
    writeFile(canonicalPath, canonical), writeFile(materialPath, material), writeFile(outputPath, output),
  ]);
  const receipt = {
    schemaVersion: 1,
    kind: 'canonical-structure-krea2-material-pass',
    status: accepted ? 'reviewed-structure-safe' : 'awaiting-direct-review',
    canonical: { path: `staging/research/canon-visual/wiki-game-assets/${id}.png`, sha256: hash(canonical) },
    krea2Material: { path: `staging/media/${group}/${id}.rgb.png`, sha256: hash(material), productionReceipt: `staging/media/${group}/${id}.krea2.receipt.json` },
    output: { path: `staging/media/${group}/${id}.png`, sha256: hash(output), bytes: Buffer.byteLength(output) },
    invariant: { structureSource: 'canonical-rgba', alphaSource: 'canonical', materialSource: 'krea2-rgb', generatedText: false, sixLoraReceiptRequired: true },
    promotionAllowed: false,
    review: { directImageReadRequired: true, automatedVisionAdvisoryOnly: true },
    ...(accepted ? { directReview: { status: 'accepted', promotionAllowed: false } } : {}),
  };
  await writeFile(productionReceiptPath, JSON.stringify({
    provider: 'comfyui-local-krea2', status: 'completed', styleChain: [
      { name: 'z3zz4-k2-4_c1-st5000.safetensors', strength: 0.55 },
      { name: 'Krea2Rella_c1-st8000.safetensors', strength: 0.65 },
      { name: 'onineko_k2_v1.safetensors', strength: 0.45 },
      { name: 'meion_krea2_style_v7.0_c1-st4000.safetensors', strength: 0.45 },
      { name: 'masterpieces-v51.safetensors', strength: 0.45 },
      { name: 'ichika-k2_c1-st5000.safetensors', strength: 0.35 },
    ],
  }));
  await writeFile(`${outputPath}.receipt.json`, JSON.stringify(receipt));
}

describe('Krea2 canonical material-pass audit', () => {
  it('audits character, scene, and CG receipts without allowing promotion after direct review', async () => {
    const root = await fixtureRoot();
    await writeReceipt(root, 'characters', 'albina', true);
    await writeReceipt(root, 'backgrounds', 'lce-lab');
    await writeReceipt(root, 'cg', 'scene-9-18');
    const manifest = await runAudit({ root, stagingRoot: resolve(root, 'staging/media') });
    expect(manifest.counts).toEqual({ total: 3, passed: 3, failed: 0 });
    expect(manifest.byGroup).toEqual({
      characters: { total: 1, passed: 1, failed: 0 },
      backgrounds: { total: 1, passed: 1, failed: 0 },
      cg: { total: 1, passed: 1, failed: 0 },
    });
    expect(manifest.results.find((entry) => entry.group === 'characters')).toMatchObject({ promotionAllowed: false, pass: true });
    expect(manifest.promotionPolicy).toContain('always-blocked');
  });

  it('fails closed on a material hash change and an output outside the canonical staging groups', async () => {
    const root = await fixtureRoot();
    await writeReceipt(root, 'characters', 'tampered');
    const receiptPath = join(root, 'staging/media/characters/tampered.png.receipt.json');
    const receipt = JSON.parse(await (await import('node:fs/promises')).readFile(receiptPath, 'utf8'));
    receipt.krea2Material.sha256 = '0'.repeat(64);
    receipt.output.path = 'staging/media/formal-assets/tampered.png';
    await writeFile(receiptPath, JSON.stringify(receipt));
    const manifest = await runAudit({ root, stagingRoot: resolve(root, 'staging/media') });
    expect(manifest.counts).toEqual({ total: 1, passed: 0, failed: 1 });
    expect(manifest.results[0]!.issues.map((entry) => entry.code)).toEqual(expect.arrayContaining(['krea2-material-hash', 'output-missing', 'asset-group']));
  });
});
