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
    const name = releasePath.slice('worldbooks/'.length);
    const allowed = new Set([
      'albina_canon_worldbook_v1.json',
      'albina_worldbook_packages_v1.json',
      'albina-worldbook-l1-albina-core-v1.json',
      'albina-worldbook-l2-canto-ix-main-cast-v1.json',
      'albina-worldbook-l3-world-expansion-v1.json',
      'albina-worldbook-plot-full-timeline-v1.json',
      'albina-worldbook-l4-mechanics-v1.json',
      'albina-worldbook-l5-reviewed-identities-v1.json',
      'albina-worldbook-au-if-v1.json',
    ]);
    return !allowed.has(name);
  }
  const assetPath = releasePath.replace(/^assets\//u, '');
  return /^(?:original_albina_sprites|original_bg_story|original_cg)(?:\/|$)/u.test(assetPath)
    || assetPath === 'sprite-atlas/_progress.json'
    || /^sprite-atlas\/(?:albina|original_[^/]+)(?:\/|$)/u.test(assetPath)
    || /^videos(?:\/|$)/u.test(assetPath)
    || /^video\/animated(?:\/|$)/u.test(assetPath);
}

export function isPrivateEnvironmentPath(path) {
  const name = path.replaceAll('\\', '/').split('/').at(-1) ?? '';
  return /^\.env(?:\.|$)/iu.test(name) && name.toLowerCase() !== '.env.example';
}
