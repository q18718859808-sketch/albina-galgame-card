# Albina v2.0.0 Complete Edition Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Albina as a reproducible, deterministic, fully voiced SillyTavern galgame card whose runtime consumes only pre-generated CDN assets.

**Architecture:** Albina remains the authoritative game-state application. A recovered Vue/Pinia/TypeScript frontend consumes versioned `GameScriptV2`, `SceneCue`, `AssetManifestV2`, and `SaveV2` data. A separate Node/Python production toolchain calls Pie models offline and promotes only validated artifacts into the canonical `dist/albina-galgame-card` tree.

**Tech Stack:** Vue 3, Pinia, TypeScript, Vite, Vitest, Playwright, Zod, Node.js, Python, ffmpeg/ffprobe, Sharp, Pie OpenAI-compatible APIs.

## Global Constraints

- Keep Albina as the narrative and state authority; do not migrate to the BigMalove runtime.
- Reimplement useful BigMalove behavior without copying its unlicensed source.
- Use only Pie for `gpt-image-2`, `seedance-1.5-pro`, `music-2.6`, and `speech-2.8-hd`.
- No runtime media generation, API credentials, dynamic remote-script execution, parent-window overlay, or jQuery DOM takeover.
- The canonical release tree is `dist/albina-galgame-card`; `release/github-cdn-root` is generated output only.
- Preserve the existing 46-scene backbone, make every choice consequential, and provide true/normal/bad endings for each of three routes.
- Main-story text is deterministic and fully voiced; optional free chat is text-only and cannot mutate authoritative state.
- Class-Live2D portraits are validated eight-frame strips; the Cubism PoC is not a production dependency.
- Never overwrite user changes from the original checkout; all work occurs on `codex/albina-v2-complete`.

---

### Task 1: Reproducible source baseline

**Files:**
- Create: `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`
- Create: `src/main.ts`, `src/App.vue`, `src/styles.css`, `src/legacy/legacy-runtime.ts`
- Create: `tests/baseline/legacy-bundle.test.ts`, `scripts/build-release.mjs`

**Interfaces:**
- Produces `npm run build`, `npm run typecheck`, `npm test`, and `npm run release:sync`.
- Keeps the v1.0.44 bundle available as a compatibility oracle while new modules are recovered incrementally.

- [ ] Add a failing test that verifies the source build exposes the Albina application mount and the canonical CDN base resolver.
- [ ] Add Vue/Pinia/TypeScript/Vite/Vitest dependencies and strict compiler configuration.
- [ ] Create the source entry, root component, and legacy compatibility module without changing the existing release bundle.
- [ ] Implement a deterministic release build and generated release-tree sync.
- [ ] Run `npm ci`, `npm run typecheck`, `npm test`, and `npm run build`; all must pass.
- [ ] Commit as `build: restore reproducible albina source baseline`.

### Task 2: Authoritative schemas and save migration

**Files:**
- Create: `src/domain/game-script.ts`, `src/domain/scene-cue.ts`, `src/domain/assets.ts`, `src/domain/save.ts`
- Create: `src/domain/migrate-save-v1.ts`, `tests/domain/*.test.ts`

**Interfaces:**
- Produces `GameScriptV2`, `SceneCue`, `AssetManifestV2`, `PortraitAsset`, `MediaJob`, and `SaveV2`.
- Produces `migrateSaveV1(input: unknown): SaveV2` and schema validators.

- [ ] Write failing tests for valid schemas, invalid references, v1 migration, damaged-save recovery, and deterministic serialization.
- [ ] Implement strict schemas with explicit version fields and no passthrough unknown state.
- [ ] Implement v1.0.44 migration preserving route, scene, values, inventory, quests, CG, logs, and player profile.
- [ ] Run domain tests and typecheck; all must pass.
- [ ] Commit as `feat: add authoritative v2 game and save schemas`.

### Task 3: Deterministic story compiler and endings

**Files:**
- Create: `content/game-script-v2.json`, `content/dialogue/*.json`, `scripts/compile-story.mjs`
- Create: `tests/story/reachability.test.ts`, `tests/story/choices.test.ts`

**Interfaces:**
- Consumes domain schemas from Task 2.
- Produces compiled `dist/albina-galgame-card/data/game-script-v2.json`.

- [ ] Extract the 46 current scene anchors and 87 current choices from the legacy bundle.
- [ ] Add three ending nodes per route and explicit eligibility rules for true, normal, and bad endings.
- [ ] Replace dynamic main-story generation with fixed dialogue records and deterministic choice-result text.
- [ ] Ensure every choice changes a persistent value, flag, unlock, availability condition, scene branch, or ending qualification.
- [ ] Add reachability tests for all scenes and nine endings and reject unknown references or dead ends.
- [ ] Commit as `feat: compile deterministic fully voiced story graph`.

### Task 4: Runtime services and selective BigMalove capability reimplementation

**Files:**
- Create: `src/runtime/host-adapter.ts`, `src/runtime/typewriter.ts`, `src/runtime/audio.ts`, `src/runtime/portraits.ts`
- Create: `src/runtime/gallery.ts`, `src/runtime/storage.ts`, `src/runtime/special-cg.ts`, `tests/runtime/*.test.ts`

**Interfaces:**
- Produces a scoped `AlbinaRuntime` with host, audio, portrait, gallery, storage, and special-CG services.
- Consumes only `SceneCue`, `AssetManifestV2`, and `SaveV2`.

- [ ] Implement a Tavern Helper adapter that contains every host API call and never accesses parent DOM selectors.
- [ ] Implement cancellable typewriter, BGM crossfade, voice queue, audio focus, and autoplay recovery.
- [ ] Implement eight-frame portrait playback with static fallback and reduced-motion support.
- [ ] Implement IndexedDB asset cache, gallery unlocks, special-CG queue, and save thumbnails.
- [ ] Add lifecycle tests proving chat changes, load, and unmount release RAF, Canvas, Blob URLs, and audio.
- [ ] Commit as `feat: add isolated albina runtime services`.

### Task 5: Offline Pie media orchestrator

**Files:**
- Create: `tools/media/package.json`, `tools/media/src/*.ts`, `tools/media/jobs/*.json`
- Create: `tools/media/tests/*.test.ts`, `.env.example`

**Interfaces:**
- Produces CLI commands `media inventory`, `media generate`, `media validate`, and `media promote`.
- Implements image, image-edit, video, speech, and music adapters returning normalized artifacts.

- [ ] Add tests using recorded redacted responses for all four Pie model families.
- [ ] Load credentials only from `PIE_API_KEY`; fail before network access when absent.
- [ ] Implement content-hash job IDs, single-writer ledger, retries, cooldown, and resumable downloads.
- [ ] Encode speech JSON as UTF-8 and restrict voices to probed OpenAI-compatible IDs.
- [ ] Treat music 504 as ambiguous, apply five-minute cooldown, and require three consecutive valid probes before bulk music jobs.
- [ ] Add validation for image dimensions/alpha, strip frame count, audio duration/non-silence/loudness, and video dimensions/FPS/duration.
- [ ] Commit as `feat: add offline pie media production pipeline`.

### Task 6: Canonical asset inventory and release repair

**Files:**
- Create: `content/asset-manifest-v2.json`, `scripts/audit-assets.mjs`
- Modify: `dist/albina-galgame-card/manifest.json`, card CDN references, bridge loaders

**Interfaces:**
- Produces a zero-missing-reference asset manifest and generated runtime lookup tables.

- [ ] Inventory both current release trees and classify every duplicate, missing, stale, or mismatched file.
- [ ] Promote `dist/albina-galgame-card` as the only source and generate the secondary release tree.
- [ ] Replace root-relative audio URLs and mixed CDN tags with the versioned CDN resolver.
- [ ] Register all completed portrait strips and preserve the eight failed jobs as pending media jobs.
- [ ] Run the asset auditor and require zero unresolved references before commit.
- [ ] Commit as `fix: unify albina release and asset manifest`.

### Task 7: Full media production and promotion

**Files:**
- Generate: `staging/media/**`
- Promote: `dist/albina-galgame-card/assets/**`

**Interfaces:**
- Consumes the story and asset inventories.
- Produces approved production assets and completed manifest records.

- [ ] Freeze character references, palette, outfits, expressions, scene briefs, dialogue, and cue sheets.
- [ ] Generate and validate every required background, static CG, portrait state, and eight-frame strip with `gpt-image-2` edit-first workflows.
- [ ] Produce animated CG for the prologue, route scenes 3/5/8/11/15, nine endings, OP, and three EDs with approved image keyframes and `seedance-1.5-pro`.
- [ ] Produce fixed-dialogue speech with `speech-2.8-hd`, normalize loudness, and generate cue timing metadata.
- [ ] Pass the music stability gate, then generate the 23 existing cue IDs plus OP and three route ED masters, instrumental variants, and loop versions.
- [ ] Promote only approved artifacts; regenerate or reject every failed validation.
- [ ] Commit manifests and web delivery assets; keep archival masters outside the web bundle.

### Task 8: Integration, E2E, security, and final release

**Files:**
- Create: `tests/e2e/*.spec.ts`, `.github/workflows/verify.yml`, `SECURITY.md`
- Modify: runtime UI and card package as required by verified failures

**Interfaces:**
- Produces the final importable Albina v2.0.0 card and CDN tree.

- [ ] Add desktop/mobile Tavern Helper harness tests covering import, title, routes, choices, saves, gallery, media playback, reduced motion, offline fallback, and autoplay recovery.
- [ ] Add secret scanning, manifest validation, reproducible-build verification, and dist/release hash checks to CI.
- [ ] Verify all nine endings, full fixed-dialogue voice coverage, complete music cues, portrait animation coverage, and animated-CG fallback paths.
- [ ] Verify no runtime API calls, credentials, unapproved assets, root-relative media URLs, or cross-version CDN paths remain.
- [ ] Run the full test/build/audit suite and create the final v2.0.0 release commit.

