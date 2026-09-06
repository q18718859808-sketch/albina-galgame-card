# Formal image to Krea2 staging gap map

Date: 2026-08-20

## Decision

The current formal set is exactly 61 image surfaces: 12 backgrounds, 22 CGs, and 27 portrait declarations. This count excludes the `file.*` manifest records because they duplicate the same physical image paths for file-integrity use.

Use a strict definition of "traceable": a formal asset must have a semantic counterpart in the canonical Krea2 staging list, an existing direct-review JSON whose `candidateSha256` matches the staged output, and an accepted staging decision. This is staging traceability only; it is not release approval. Every accepted candidate remains `promotionAllowed: false` and has unverified rights.

Result: **8 / 61 traceable to a direct-reviewed canonical Krea2 staging equivalent; 53 / 61 not traceable.**

## Traceable formal assets (8)

| Formal asset | Direct-reviewed canonical staging equivalent | Decision |
| --- | --- | --- |
| `bg.lce_lab` | `bg-lce-lab` | accepted-as-background-style-sample |
| `portrait.albina.normal` | `albina-unarmored` | accepted-as-staging-anchor |
| `portrait.albina.armored` | `albina-armored` | accepted-as-staging-asset |
| `portrait.callisto.normal` | `callisto` | accepted-as-style-consistency-sample |
| `portrait.dante.normal` | `dante` | accepted-as-staging-asset |
| `portrait.faust.normal` | `faust` | accepted-as-staging-asset |
| `portrait.ren.normal` | `ren` | accepted-as-staging-asset |
| `portrait.vergilius.normal` | `vergilius` | accepted-as-staging-asset |

The candidate pack records the same target paths for the seven portrait mappings. The LCE candidate is named as the formal LCE background equivalent, but is a PNG staging candidate rather than a byte-identical replacement for the formal JPG. No candidate has release permission.

## Not traceable to a direct-reviewed equivalent (53)

### Backgrounds (11)

`bg.backstreets_rain`, `bg.city_rooftop`, `bg.golden_bough`, `bg.limbus_bus`, `bg.mirror_corridor`, `bg.nest_station`, `bg.outskirts_dawn`, `bg.rain_room`, `bg.ring_atelier`, `bg.spider_gallery`, `bg.white_canvas`.

`bg-ring-corridor` is directly reviewed in canonical staging, but it is a new candidate path (`assets/bg/ring_corridor.png`), not an item in the current 12-background formal manifest. It is useful style/scene evidence only, not a trace for any listed formal background.

### CGs (22)

`cg.araya_rooftop`, `cg.art_resonance`, `cg.backstreet_pursuit`, `cg.combat_transition_01`, `cg.conspiracy_contract`, `cg.fascia_heartbeat`, `cg.golden_bough_ending`, `cg.golden_bough_rebuild`, `cg.hollow_torso_reveal`, `cg.lce_raid`, `cg.limbus_bus_night`, `cg.maestro_shadow`, `cg.opening_rain`, `cg.rain_confession`, `cg.rebuild_awakening`, `cg.ren_interruption`, `cg.ring_conspiracy_ending`, `cg.ring_invitation`, `cg.surgery_of_memory`, `cg.trust_threshold`, `cg.white_canvas_choice`, `cg.white_canvas_ending`.

The 12 accepted canonical CG staging assets (`cg-9-14-*`, `cg-9-18-*`, `cg-9-37-*`, and `cg-9-43-*`) are canon-scene staging material with no one-to-one formal CG ID or path. They must not be claimed as equivalents for the authored-route CG set.

### Portraits (20)

`portrait.albina.combat`, `portrait.albina.endgame`, `portrait.albina.fascia-open`, `portrait.albina.furious`, `portrait.albina.golden-bough`, `portrait.albina.maestro`, `portrait.albina.rain`, `portrait.albina.ring-conspiracy`, `portrait.albina.shy`, `portrait.albina.surgical`, `portrait.albina.white-canvas`, `portrait.golden_apparition.normal`, `portrait.lce_doctor.normal`, `portrait.protagonist.battle`, `portrait.protagonist.resolve`, `portrait.protagonist.serious`, `portrait.protagonist.shadow`, `portrait.protagonist.tender`, `portrait.protagonist.wet-hair`, `portrait.ring_agent.normal`.

The staging manifest explicitly leaves `protagonist`, `golden_apparition`, `lce_doctor`, and `ring_agent` pending. It contains one approved unarmored Albina anchor and one armored Albina asset, not evidence for the other 11 Albina expressions/route variants.

## Ordered production backlog

1. **Clear the staging-to-release decision for the eight mapped candidates.** Verify rights, create the required promotion evidence, then decide asset-by-asset whether each candidate replaces its formal counterpart. Do not treat this mapping as authorization to promote.
2. **Complete missing character anchors:** `golden_apparition`, `lce_doctor`, `ring_agent`, and a configurable/player-safe `protagonist` anchor. Each needs a canonical or explicitly AU visual contract before a direct-reviewed single-image staging run.
3. **Derive the remaining Albina portrait family from the two accepted anchors:** first `combat`, `fascia-open`, and `furious` (combat/readability dependency); then `rain`, `shy`, and `surgical`; finally `golden-bough`, `white-canvas`, `ring-conspiracy`, `maestro`, and `endgame` (route/end-state variants). Review each as its own output; do not inherit approval from the normal or armored anchor.
4. **Cover backgrounds by gameplay dependency:** `mirror_corridor`, `ring_atelier`, `spider_gallery`, `golden_bough`, and `white_canvas` first; then `backstreets_rain`, `rain_room`, `city_rooftop`, `lce_lab` variant decision, `limbus_bus`, `nest_station`, and `outskirts_dawn`. Treat `bg-ring-corridor` as a separate formal-manifest decision, not a substitution for an existing ID.
5. **Produce route CGs in narrative order:** `opening_rain` and `hollow_torso_reveal`; the conflict set (`combat_transition_01`, `ren_interruption`, `lce_raid`, `maestro_shadow`, `fascia_heartbeat`); then each route's core/ending CGs: white-canvas, golden-bough-rebuild, and ring-conspiracy; finish the remaining connective CGs (`araya_rooftop`, `art_resonance`, `backstreet_pursuit`, `limbus_bus_night`, `rain_confession`, `surgery_of_memory`, `trust_threshold`).
6. **Only after direct review and rights evidence, reconcile formal manifest paths, assets, and release surfaces.** This is deliberately outside this research task.

## Evidence inspected

- `content/asset-manifest-v2.json`: 34 primary image records plus 27 portrait declarations; 61 formal image surfaces after excluding duplicate `file.*` records.
- `content/media-production/krea2-staged-production-manifest-v1.json`: 21 accepted canonical staging entries and explicit pending categories.
- `staging/release-candidate/krea2-v1/candidate-manifest.json`: exact target paths for the eight mappings and `releasePromotionAllowed: false` for every candidate.
- All 21 referenced files under `staging/media/krea2-canonical-production/characters/*.direct-review.json`: each exists, is accepted, and its `candidateSha256` equals the SHA-256 calculated from the current staged output.
- `content/media-production/krea2-canonical-production-contract-v1.json`: direct review is mandatory and promotion is prohibited by default.

No image generation, asset promotion, manifest update, or non-research file modification was performed.
