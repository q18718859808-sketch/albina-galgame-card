export function hasReleaseDifferences(release) {
  return release.missing.length > 0 || release.mismatch.length > 0 || release.stale.length > 0;
}

export function isLegacyPublishablePath(path) {
  const normalized = path.replaceAll('\\', '/').replace(/^\.\//u, '');
  return /^(?:albina-bridge|cinema|console|sfe)(?:\/|$)|^video-injector\.js$/iu.test(normalized);
}
