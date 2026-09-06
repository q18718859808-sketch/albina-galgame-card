---
name: albina-media-production
description: Run the Albina card's guarded Krea2 and Latent.moe image production workflow with fixed provenance, direct image review, and promotion gates.
---

Use this skill for image generation, restyling, asset review, or promotion in `D:/创作/albina-v2-complete`.

The current dual-provider visual route uses `albina-wisart` for the migration plan and `albina-latent-moe` for the Latent plan. WisArt uses `WISART_API_KEY`, `https://wisart.kuaileshifu.com/v1`, and `gpt-image-2`; Latent.moe uses `LATENT_MOE_API_KEY`, `https://latent.moe`, and the async generation API. Keep both credentials runtime-only; never write, print, test-fixture, receipt, or MCP response them. Both MCP surfaces default to dry-run, and only an explicit `execute: true` may submit a provider request.

For the migration plan, read the frozen style board, prompt freeze, source index, canon claims, and `content/media-production/visual-rebuild-migration-v1.json`. For the Latent plan, read `latent-text-prompts-v1.json` and `visual-rebuild-latent-v1.json`. The user explicitly disabled human authorization for this private local production, but source/prompt/job hash checks, provider contracts, direct review, promotion, rights, and release boundaries remain active.

The local Krea2 route remains a separate canonical route. It must use the pinned ComfyUI workflow and complete six-LoRA chain. Do not mix Krea2 inputs into WisArt or Latent requests.

Every generated image is blocked until an operator directly reads the original-resolution PNG. Hashes, geometry checks, GCLI/Gemini analysis, and automated vision are advisory and cannot create a direct-review verdict. Do not promote an image without a matching receipt, source hash, fixed production-chain evidence, direct-review record, and rights approval.

To discover the available tools, start the project MCP server configured by `.mcp.json`. Prefer `albina_production_status` and `albina_list_jobs` before generation. Use one generation job at a time to conserve GPU capacity; do not launch a whole batch through the MCP surface.

Before the first Albina state-variant job, call `albina_variant_production_contract`. It checks all 11 queued targets against their one canonical source, structure-lock settings, AU-reference isolation, and the fixed six-LoRA baseline without using the GPU. State variants must use `albina_run_staged_variant`, the current two-pass high-frequency route. `albina_run_krea2_job` deliberately rejects them so an old single-pass batch route cannot be called by mistake.

`albina_run_staged_variant` defaults to a dry-run. Its only mutating form is `execute: true`; it produces one staging image, never promotes it, and must be followed by direct original-resolution inspection before a review verdict can be recorded.

The obsolete low-denoise latent-origin route is not an acceptance path for Albina identity. The optional `albina_run_reference_conditioned_pilot` starts from a fresh target latent and uses the canonical image only through the audited Krea image-guide/reference-conditioning nodes. Run it once as a pilot; do not batch it or promote it without direct reading.
