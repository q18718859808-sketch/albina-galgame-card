---
name: wisart-image-api
description: Use the WisArt OpenAI-compatible image API for Albina migration generation and reference editing through the local MCP server, with runtime-only credentials and explicit execution gates.
agent_created: true
---

Use the `albina-wisart` MCP server for WisArt image generation and editing. Read the migration plan and its frozen prompt/source/style-board inputs before submitting any production request.

Use `WISART_API_KEY` at runtime only. Never write, print, test-fixture, or include the key in receipts, prompts, MCP responses, or logs. The base URL is `https://wisart.kuaileshifu.com/v1`; the image model is `gpt-image-2`. `wisart_status` checks credential presence and the `/models` endpoint without exposing the key.

Keep `wisart_generate` and `wisart_edit` in dry-run mode unless the operator explicitly sets `execute: true`. Submit one image at a time, preserve the returned provider metadata and output hash, and treat URL artifacts as HTTPS-only. Every result is staging-only with `promotionAllowed: false`; direct image review, provenance, rights, promotion, and release remain separate gates.

For the full migration batch, use the project CLI with `--plan-variant migration --all --skip-pilot-gate --allow-unreviewed-references` only after the operator explicitly requests those bypasses. Do not change frozen source hashes, do not mix Krea2 conditioning inputs into WisArt, and do not run release synchronization or release push from this skill.
