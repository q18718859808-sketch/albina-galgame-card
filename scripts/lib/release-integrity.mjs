export function hasReleaseDifferences(release) {
  return release.missing.length > 0 || release.mismatch.length > 0 || release.stale.length > 0;
}

export function isLegacyPublishablePath(path) {
  const normalized = path.replaceAll('\\', '/').replace(/^\.\//u, '');
  return /(?:^|\/)(?:albina-bridge|cinema|console|sfe)(?:\/|$)|(?:^|\/)video-injector\.js$/iu.test(normalized);
}

export function isExcludedReleaseAssetPath(path) {
  const releasePath = path.replaceAll('\\', '/').replace(/^\.\//u, '');
  if (releasePath.startsWith('worldbooks/')) {
    return releasePath !== 'worldbooks/albina_canon_worldbook_v1.json';
  }
  const assetPath = releasePath.replace(/^assets\//u, '');
  return /^(?:original_albina_sprites|original_bg_story|original_cg)(?:\/|$)/u.test(assetPath)
    || assetPath === 'sprite-atlas/_progress.json'
    || /^sprite-atlas\/(?:albina|original_[^/]+)(?:\/|$)/u.test(assetPath)
    || /^videos(?:\/|$)/u.test(assetPath)
    || /^video\/animated\/(?:desktop|runtime)\/(?:ed_[^/]+|op|prologue)\.mp4$/u.test(assetPath);
}

export function isPrivateEnvironmentPath(path) {
  const name = path.replaceAll('\\', '/').split('/').at(-1) ?? '';
  return /^\.env(?:\.|$)/iu.test(name) && name.toLowerCase() !== '.env.example';
}
