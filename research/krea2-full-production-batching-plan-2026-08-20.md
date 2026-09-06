# Krea2 full-production batching plan

Date: 2026-08-20

Status: static planning artifact only. No GPU inference, queue submission, model installation, asset generation, promotion, or executable-code change was performed.

## Decision

The formal image scope is 61 surfaces: 12 backgrounds, 22 CGs, and 27 portraits. Current evidence establishes only 8/61 direct-reviewed canonical staging equivalents; the remaining 53 are a backlog, not approved output.

The companion manifest uses “batch” to mean a review-and-scheduling wave. It does not authorize a GPU batch. Every surface remains an independent `batchSize: 1` job with one receipt, one output hash, one direct original-resolution review, and one rights decision. Only one job may be active at a time.

## Locked contract

The exact six-LoRA chain is immutable: `z3zz4-k2-4_c1-st5000` 0.55, `Krea2Rella_c1-st8000` 0.65, `onineko_k2_v1` 0.45, `meion_krea2_style_v7.0_c1-st4000` 0.45, `masterpieces-v51` 0.45, and `ichika-k2_c1-st5000` 0.35. `krea2_identity_edit_v1_2` remains after all six style LoRAs at strength 1 and cannot replace or interrupt them.

Canonical geometry remains authoritative. Albina keeps the canonical RGBA source, unmirrored coordinate system, nine design anchors, full-canvas redraw, alpha restoration, and no-inset rule. Style references may supply line/material/palette language only; they cannot become a second identity or content source. Supporting/AU characters require an explicit character-bible source and named human identity approval.

## Wave order

`W00-baseline-reconciliation` rechecks the eight traceable mappings without generation. A direct-review record is reusable only when its candidate hash matches the current staged output; rights remain a separate gate.

`W01-character-anchors` establishes golden apparition, LCE doctor, ring agent, and protagonist coverage. `W02-albina-portrait-variants` then covers the eleven missing Albina variants, each independently reviewed. `W03-backgrounds` covers all twelve formal backgrounds; `bg-ring-corridor` is separate staging evidence and cannot silently replace a formal ID. `W04-opening-conflict-cgs` precedes `W05-route-cgs`, so route CGs cannot bootstrap missing character identity.

## Per-surface evidence packet

Before any future authorized invocation, bind the canonical source hash, uploaded canonical hash and recorded transform, workflow hash, topology hash, exact six-LoRA chain, seed, model canvas, output hash, and direct-review path. The production audit must bind the actual invocation and output, not just a declared chain. Direct review must read the original-resolution image and may veto automated or paired review. Promotion remains false until rights evidence and an independent release decision are complete.

## Visible-delta gate and rejected latent-copy path

A low-denoise img2img/latent-copy result that is materially indistinguishable from its canonical input is explicitly rejected as a finished production render. A valid receipt, fixed six-LoRA chain, preserved geometry, or different output hash does not turn an imperceptible restyle into an accepted asset. Review records must label this outcome `no-visible-delta`; it blocks further invocation of the same topology until a reviewer approves a different, bounded material objective.

For acceptance, the direct reviewer compares canonical input and candidate at the same full-canvas scale and at 100% in declared detail regions. The candidate must show at least two reviewer-locatable improvements such as line separation, mechanical segmentation, material-edge definition, controlled shading transitions, or surface texture without text/logo artifacts. The review note must name the regions and state why each change improves the production target.

The candidate is rejected if those two meaningful improvements cannot be identified at 100%, if it is functionally a latent copy, or if its visible change is obtained through identity, anatomy, silhouette, side-assignment, crop, composition, or protected-region drift. This gate adds a required proof of useful visual change; it does not weaken the canonical design lock or replace direct human review.

## Compute discipline and stop rules

Use one output per invocation, one active job at a time, and stop on the first failed gate. Do not install or invoke an unverified advanced adapter, new node pack, extra reference stack, LoRA sweep, concurrent queue, or high-VRAM-only text worker. Any dependency, weight, topology, resource, rejected latent-copy/no-visible-delta result, identity, crop, inset, side-assignment, seam, text, logo, watermark, receipt, or rights failure returns the plan to the verified six-LoRA baseline and blocks wave expansion.

## Evidence boundary

The plan is grounded in `content/media-production/krea2-canonical-production-contract-v1.json`, `krea2-verified-baseline-v1.json`, `krea2-staged-production-manifest-v1.json`, `albina-canonical-design-contract-v1.json`, `research/formal-image-krea2-staging-gap-map-2026-08-20.md`, and the focused formal coverage tests for Krea2 production receipts, six-LoRA preservation, single-stage execution, and direct-review separation. Existing research also records that the advanced adapter is dependency/weight gated and is not a production fallback.

No claim in this plan grants release approval, replaces human review, or authorizes GPU execution.
