const sourceTypes = new Set(['model-output', 'project-authored', 'licensed-source', 'third-party-source']);

export function analyzeMediaReadiness(manifest) {
  const paths = new Map();
  for (const asset of manifest.assets) {
    if (!['image', 'video'].includes(asset.kind)) continue;
    const records = paths.get(asset.path) ?? [];
    records.push(asset);
    paths.set(asset.path, records);
  }
  const assets = [...paths.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([path, records]) => {
    const candidates = records.map((record) => ({ record, issues: readinessIssues(record) }));
    candidates.sort((left, right) => left.issues.length - right.issues.length);
    const best = candidates[0];
    return { path, assetIds: records.map((record) => record.id).sort(), ready: best.issues.length === 0, issues: best.issues };
  });
  const byRoot = {};
  for (const asset of assets) {
    const root = asset.path.split('/')[0] ?? '(root)';
    const group = byRoot[root] ?? { total: 0, ready: 0, blocked: 0 };
    group.total += 1;
    group[asset.ready ? 'ready' : 'blocked'] += 1;
    byRoot[root] = group;
  }
  return {
    total: assets.length,
    ready: assets.filter((asset) => asset.ready).length,
    blocked: assets.filter((asset) => !asset.ready).length,
    byRoot,
    blockers: assets.filter((asset) => !asset.ready),
  };
}

function readinessIssues(asset) {
  const issues = [];
  if (asset.rights?.status !== 'verified' || asset.rights?.redistribution !== 'allowed') issues.push('rights');
  if (!asset.lineage) issues.push('lineage');
  if (asset.rights?.sourceType === 'model-output' && !validProvenance(asset)) issues.push('provenance');
  if (!sourceTypes.has(asset.rights?.sourceType)) issues.push('source-type');
  return [...new Set(issues)].sort();
}

function validProvenance(asset) {
  const value = asset.provenance;
  if (!value || !/^[a-f0-9]{64}$/iu.test(value.sourceJobHash ?? '') || !/^[a-z0-9][a-z0-9._-]*$/iu.test(value.promptVersion ?? '')) return false;
  const review = value.review;
  if (review?.status !== 'approved' || typeof review.reviewer !== 'string' || review.reviewer.trim().length === 0 || Number.isNaN(Date.parse(review.reviewedAt))) return false;
  if (asset.kind === 'image') {
    return (value.provider === 'wisart-openai-compatible' && value.model === 'gpt-image-2')
      || (value.provider === 'comfyui-local-krea2' && value.model === 'redcraft23FP8_30Krea2.safetensors')
      || (value.provider === 'latent-moe' && value.model === 'latent-moe-async');
  }
  if (asset.kind === 'video') return value.provider === 'pie' && value.model === 'seedance-1.5-pro';
  if (asset.kind === 'audio') return value.provider === 'pie' && value.model === 'speech-2.8-hd';
  return false;
}
