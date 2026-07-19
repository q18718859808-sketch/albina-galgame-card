import { readFile } from 'node:fs/promises';

const hashPattern = /^[a-f0-9]{64}$/iu;
const promptVersionPattern = /^[a-z0-9][a-z0-9._-]*$/iu;
const models = {
  pie: new Set(['seedance-1.5-pro', 'speech-2.8-hd']),
  'x666-openai-compatible': new Set(['gpt-image-2']),
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
    return {
      ...asset,
      provenance: receipt.provenance,
      ...(receipt.rights ? { rights: receipt.rights } : {}),
      ...(receipt.lineage ? { lineage: receipt.lineage } : {}),
    };
  });
  for (const assetId of receipts.keys()) if (!used.has(assetId)) throw new Error(`Promotion receipt references unknown asset ${assetId}`);
  return result;
}

export function parsePromotionReceipt(value) {
  const receipt = object(value, 'promotion receipt');
  exactKeys(receipt, ['artifactSha256', 'assetId', 'lineage', 'provenance', 'rights', 'version'], 'promotion receipt', ['lineage', 'rights']);
  if (receipt.version !== 1 || typeof receipt.assetId !== 'string' || !hashPattern.test(String(receipt.artifactSha256))) throw new Error('Invalid promotion receipt identity');
  return {
    version: 1,
    assetId: receipt.assetId,
    artifactSha256: receipt.artifactSha256,
    provenance: provenance(receipt.provenance),
    ...(receipt.rights ? { rights: rights(receipt.rights) } : {}),
    ...(receipt.lineage ? { lineage: lineage(receipt.lineage) } : {}),
  };
}

function provenance(value) {
  const record = object(value, 'promotion provenance');
  exactKeys(record, ['model', 'promptVersion', 'provider', 'review', 'sourceJobHash', 'upstreamPieVerified'], 'promotion provenance', ['upstreamPieVerified']);
  if (typeof record.provider !== 'string' || typeof record.model !== 'string' || !models[record.provider]?.has(record.model)) throw new Error('Invalid promotion provider/model');
  if (!promptVersionPattern.test(String(record.promptVersion)) || !hashPattern.test(String(record.sourceJobHash))) throw new Error('Invalid promotion job provenance');
  const validUpstreamEvidence = record.provider === 'x666-openai-compatible'
    ? record.upstreamPieVerified === false
    : record.upstreamPieVerified === undefined;
  if (!validUpstreamEvidence) throw new Error('Invalid promotion upstream Pie evidence');
  return {
    provider: record.provider,
    model: record.model,
    ...(record.upstreamPieVerified === false ? { upstreamPieVerified: false } : {}),
    promptVersion: record.promptVersion,
    sourceJobHash: record.sourceJobHash,
    review: review(record.review),
  };
}

function review(value) {
  const record = object(value, 'promotion review');
  exactKeys(record, ['reviewedAt', 'reviewer', 'status'], 'promotion media review');
  const timestamp = typeof record.reviewedAt === 'string' ? Date.parse(record.reviewedAt) : Number.NaN;
  if (record.status !== 'approved' || typeof record.reviewer !== 'string' || record.reviewer.trim().length === 0 || Number.isNaN(timestamp)) throw new Error('Invalid promotion media review');
  return { status: 'approved', reviewer: record.reviewer, reviewedAt: record.reviewedAt };
}

function rights(value) {
  const record = object(value, 'promotion rights');
  exactKeys(record, ['holder', 'redistribution', 'rightsBasis', 'sourceType', 'sourceUrl', 'status'], 'promotion rights', ['holder', 'sourceUrl']);
  if (!['verified', 'unverified'].includes(record.status)
    || !['model-output', 'project-authored', 'licensed-source', 'third-party-source'].includes(record.sourceType)
    || !['allowed', 'restricted', 'unverified'].includes(record.redistribution)
    || typeof record.rightsBasis !== 'string' || record.rightsBasis.trim().length === 0) throw new Error('Invalid promotion rights');
  if (record.status === 'verified' && (record.redistribution !== 'allowed' || typeof record.holder !== 'string' || record.holder.trim().length === 0)) throw new Error('Verified promotion rights require allowed redistribution and a holder');
  if (record.sourceUrl !== undefined) assertHttps(record.sourceUrl, 'promotion rights sourceUrl');
  return record;
}

function lineage(value) {
  const record = object(value, 'promotion lineage');
  exactKeys(record, ['inputs', 'kind', 'processVersion'], 'promotion lineage');
  if (!['original', 'derivative', 'transcode', 'conversion'].includes(record.kind)
    || !promptVersionPattern.test(String(record.processVersion)) || !Array.isArray(record.inputs)) throw new Error('Invalid promotion lineage');
  const inputs = record.inputs.map((input) => {
    const item = object(input, 'promotion lineage input');
    exactKeys(item, ['assetId', 'role', 'sha256'], 'promotion lineage input', ['assetId']);
    if ((item.assetId !== undefined && (typeof item.assetId !== 'string' || item.assetId.length === 0))
      || typeof item.role !== 'string' || item.role.length === 0 || !hashPattern.test(String(item.sha256))) throw new Error('Invalid promotion lineage input');
    return item;
  });
  if ((record.kind === 'original') !== (inputs.length === 0)) throw new Error('Invalid promotion lineage parent count');
  return { ...record, inputs };
}

function assertHttps(value, label) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`Invalid ${label}`); }
  if (url.protocol !== 'https:') throw new Error(`Invalid ${label}`);
}

function object(value, label) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error(`Invalid ${label}`);
  return value;
}

function exactKeys(value, expected, label, optional = []) {
  const keys = Object.keys(value);
  const allowed = new Set(expected);
  const required = expected.filter((key) => !optional.includes(key));
  if (keys.some((key) => !allowed.has(key)) || required.some((key) => !keys.includes(key))) throw new Error(`Invalid ${label} fields`);
}
