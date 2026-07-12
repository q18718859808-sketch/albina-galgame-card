import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const sha256 = (bytes) => createHash('sha256').update(bytes).digest('hex');

export async function validateAssetIntegrity(assetRoot, assets, pendingIds = new Set()) {
  const findings = [];
  for (const asset of assets) {
    if (pendingIds.has(asset.id)) continue;
    if (!asset.sha256 || asset.bytes === undefined) {
      findings.push(`missing integrity metadata: ${asset.id}`);
      continue;
    }
    try {
      const bytes = await readFile(resolve(assetRoot, asset.path));
      if (bytes.length !== asset.bytes) findings.push(`byte mismatch: ${asset.id} expected=${asset.bytes} actual=${bytes.length}`);
      const actualHash = sha256(bytes);
      if (actualHash !== asset.sha256) findings.push(`hash mismatch: ${asset.id} expected=${asset.sha256} actual=${actualHash}`);
    } catch {
      findings.push(`missing asset: ${asset.id} -> ${asset.path}`);
    }
  }
  return findings;
}
