# Security Policy

Albina v2 is an offline-asset runtime. The importable card and publishable Web tree contain no media-provider credentials, provider endpoints, generation calls, proxy services, arbitrary remote script sources, or generation tools.

The v1.0.44 console bundle is retained only under `tests/fixtures` as a deterministic extraction oracle. Bridge, SFE, Cinema, console, and the legacy video injector are forbidden from both generated Web trees.

Report suspected credentials, unsafe loaders, path traversal, or save-import issues privately to the repository owner without including a working secret. Before release, run `npm run verify`, `npm run card:check`, and `node scripts/verify-release.mjs`.

This checkout publishes the immutable `v2.0.0-rc.2` release candidate. The final `v2.0.0` target remains reserved until `completeEdition` is true and the immutable final tag has been verified.
