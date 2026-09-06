---
name: latent-moe-media
description: Use the Latent.moe image API as a guarded parallel media provider for research and non-canonical candidates.
---

Use the local client or the `albina-latent-moe` MCP server for Latent.moe requests. Read `content/media-production/latent-moe-provider-v1.json`, `content/media-production/latent-text-prompts-v1.json`, and `content/media-production/visual-rebuild-latent-v1.json` before production work.

Keep `LATENT_MOE_API_KEY` runtime-only; never write, print, test-fixture, or receipt it. The MCP surface defaults to dry-run. Call `latent_status` before an executed generation, refuse submission when `workersOnline` is zero, and keep generation serial per account. Use 8-16 steps and preserve the supplied negative prompt. Use `latent_poll`, `latent_cancel`, and `latent_fetch_media` only with returned IDs. `latent_resolve_public` returns reference metadata only and never sends credentials.

The user has explicitly disabled human authorization for this private local production. This does not disable source/prompt/job hash checks, provider contracts, direct review, promotion, rights, or release boundaries. Latent.moe remains a parallel provider, not the Krea2 six-LoRA baseline; its output is always `promotionAllowed: false` until the independent review and rights gates pass.

For the 22-job batch, use the production CLI with `--skip-pilot-gate --allow-unreviewed-references` only when the operator explicitly requests those bypasses. Do not auto-promote or auto-release any output.
