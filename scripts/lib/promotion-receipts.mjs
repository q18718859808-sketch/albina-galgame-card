import { readFile } from 'node:fs/promises';

const hashPattern = /^[a-f0-9]{64}$/iu;
const promptVersionPattern = /^[a-z0-9][a-z0-9._-]*$/iu;
const models = {
  pie: new Set(['gpt-image-2', 'seedance-1.5-pro', 'speech-2.8-hd']),
};

export async function loadPromotionReceipts(paths) {
  const receipts = new Map();
  for (const path of paths.sort()) {
    const receipt = parsePromotionReceipt(JSON.parse(await readFile(path, 'utf8')));
    if (receipts.has(receipt.assetId)) throw new Error(`Duplicate promotion receipt for ${receipt.assetId}`);
    receipts.set(receipt.assetId, receipt);
  }
  return receipts;
}

export function attachPromotionProvenance(assets, receipts) {
  const used = new Set();
  const result = assets.map((asset) => {
    const receipt = receipts.get(asset.id);
    if (!receipt) return asset;
    if (asset.sha256 !== receipt.artifactSha256) throw new Error(`Promotion receipt hash mismatch for ${asset.id}`);
    used.add(asset.id);
    return { ...asset, provenance: receipt.provenance };
  });
  for (const assetId of receipts.keys()) if (!used.has(assetId)) throw new Error(`Promotion receipt references unknown asset ${assetId}`);
  return result;
}

export function parsePromotionReceipt(value) {
  const receipt = object(value, 'promotion receipt');
  exactKeys(receipt, ['artifactSha256', 'assetId', 'provenance', 'version'], 'promotion receipt');
  if (receipt.version !== 1 || typeof receipt.assetId !== 'string' || !hashPattern.test(String(receipt.artifactSha256))) throw new Error('Invalid promotion receipt identity');
  return { version: 1, assetId: receipt.assetId, artifactSha256: receipt.artifactSha256, provenance: provenance(receipt.provenance) };
}

function provenance(value) {
  const record = object(value, 'promotion provenance');
  exactKeys(record, ['model', 'promptVersion', 'provider', 'review', 'sourceJobHash'], 'promotion provenance');
  if (typeof record.provider !== 'string' || typeof record.model !== 'string' || !models[record.provider]?.has(record.model)) throw new Error('Invalid promotion provider/model');
  if (!promptVersionPattern.test(String(record.promptVersion)) || !hashPattern.test(String(record.sourceJobHash))) throw new Error('Invalid promotion job provenance');
  return { provider: record.provider, model: record.model, promptVersion: record.promptVersion, sourceJobHash: record.sourceJobHash, review: review(record.review) };
}

function review(value) {
  const record = object(value, 'promotion review');
  exactKeys(record, ['reviewedAt', 'reviewer', 'status'], 'promotion visual review');
  const timestamp = typeof record.reviewedAt === 'string' ? Date.parse(record.reviewedAt) : Number.NaN;
  if (record.status !== 'approved' || typeof record.reviewer !== 'string' || record.reviewer.trim().length === 0 || Number.isNaN(timestamp)) throw new Error('Invalid promotion visual review');
  return { status: 'approved', reviewer: record.reviewer, reviewedAt: record.reviewedAt };
}

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value;
}

function exactKeys(value, expected, label) {
  if (Object.keys(value).sort().join(',') !== [...expected].sort().join(',')) throw new Error(`Invalid ${label} fields`);
}
