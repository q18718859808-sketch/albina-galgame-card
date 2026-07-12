export function hasReleaseDifferences(release) {
  return release.missing.length > 0 || release.mismatch.length > 0 || release.stale.length > 0;
}
