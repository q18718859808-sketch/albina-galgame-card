export const LEGACY_BUNDLE_VERSION = '1.0.44';
export const LEGACY_BUNDLE_PATH = 'dist/albina-galgame-card/console/index.js';

export const CANONICAL_CDN_BASE =
  'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card';

export function resolveCanonicalCdnAsset(path: string): string {
  if (!path) return '';
  if (/^https?:\/\//u.test(path)) return path;

  const encodedPath = path
    .replace(/^\//u, '')
    .split('/')
    .map((segment) => encodeURIComponent(segment))
    .join('/');

  return `${CANONICAL_CDN_BASE}/assets/${encodedPath}`;
}
