import { createHash } from 'node:crypto';

export function contentHashJobId(value: unknown): string {
  return `job_${contentHashJobDigest(value).slice(0, 32)}`;
}

export function contentHashJobDigest(value: unknown): string {
  return createHash('sha256').update(canonicalJson(value), 'utf8').digest('hex');
}

export function legacyContentHashJobId(value: unknown): string {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return contentHashJobId(value);
  const { provider: _provider, model: _model, promptVersion: _promptVersion, ...legacy } = value as Record<string, unknown>;
  return contentHashJobId(legacy);
}

function canonicalJson(value: unknown): string {
  if (value === null || typeof value !== 'object') return JSON.stringify(value) ?? 'null';
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(',')}]`;
  const record = value as Record<string, unknown>;
  const entries = Object.keys(record)
    .filter((key) => record[key] !== undefined)
    .sort()
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(record[key])}`);
  return `{${entries.join(',')}}`;
}
