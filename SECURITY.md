# Security policy

Albina v2.0.0 is an offline-asset runtime. The importable card and CDN tree never contain Pie or other provider credentials and never call image, video, music, or speech generation APIs while playing.

Report a suspected credential, unsafe remote-script loader, path traversal, or save-import issue privately to the repository owner. Do not include working credentials in a report. Before release, run `npm run security:scan`, `npm run assets:audit`, and `node scripts/verify-release.mjs`.

The legacy v1.0.44 bundle remains only as a compatibility fallback. The primary v2 frontend does not take over parent-window DOM, execute arbitrary HTML skins, or expose a `window.galgame` singleton.

An historical CloseAPI credential was discovered in a generation helper that had accidentally been published under the v1 bridge tools directory. The helper and every generation script are removed from both canonical and mirrored Web trees in v2.0.0. The exposed credential must be revoked and rotated by its provider/account owner; repository cleanup cannot invalidate an external secret.
