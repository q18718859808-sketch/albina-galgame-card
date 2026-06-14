# Raster Asset Generation Notes

All primary character sprites, CGs, and backgrounds are generated raster assets. Official/wiki images were used only as visual reference for outfit and equipment checking; no official image file is packed as a released asset.

## Style Lock

- CG illustration, hard urban action battle narrative.
- Cold, lethal battlefield-ruin atmosphere.
- Stark cinematic light/shadow contrast.
- Sharp combat dynamics and film storyboard composition.
- Dark cold dominant palette.
- Albina equipment target: white prosthetic body, black mechanical joints/wires, gold highlights, white iron-maiden armor, chained spiked headband, white mask with golden eye motifs, Fascia white-gold greatsword with skeletal interior hints.

## Portrait Quality Standard

- Main visual ratio: vertical hero-poster composition, target `1080x1920` or equivalent 9:16 portrait crop.
- Runtime sprite ratio: `900x1200` PNG RGBA with transparent background, bottom-aligned for the galgame stage.
- Card/avatar crop: `768x1024`, derived from the same master design as the runtime sprite.
- Required look: dense mobile-game key visual quality, hard black/white/gold contrast, cinematic rim light, brush-swipe shapes, shard-like motion accents, strong full-body silhouette, readable face and equipment.
- Forbidden in generated deliverables: text, letters, numbers, signatures, logos, watermarks, UI badges, barcode-like marks, copyright strips, speech bubbles, panel captions, fake stamps, and any visible poster typography.
- No generated image is accepted if it changes Albina into a different character design, loses the white prosthetic body, removes the black mechanical joints, drops the white-gold iron-maiden armor, or makes Fascia read as an unrelated weapon.
- For a two-hour delivery build, scene-used sprites take priority: `normal`, `white-canvas`, `shy`, `golden-bough`, `endgame`, `ring-conspiracy`, and `furious`.

## Source Sheets

- `albina_01` -> `assets/generated/source-sheets/albina_01.png`
- `albina_02` -> `assets/generated/source-sheets/albina_02.png`
- `albina_03` -> `assets/generated/source-sheets/albina_03.png`
- `protagonist_01` -> `assets/generated/source-sheets/protagonist_01.png`
- `protagonist_02` -> `assets/generated/source-sheets/protagonist_02.png`
- `supporting` -> `assets/generated/source-sheets/supporting.png`
- `cg_01` -> `assets/generated/source-sheets/cg_01.png`
- `cg_02` -> `assets/generated/source-sheets/cg_02.png`
- `cg_03` -> `assets/generated/source-sheets/cg_03.png`
- `cg_04` -> `assets/generated/source-sheets/cg_04.png`
- `cg_05` -> `assets/generated/source-sheets/cg_05.png`
- `bg_01` -> `assets/generated/source-sheets/bg_01.png`
- `bg_02` -> `assets/generated/source-sheets/bg_02.png`

## Final Counts

- Albina sprites: 18 transparent PNG.
- Protagonist sprites: 12 transparent PNG.
- Supporting character sprites: 12 transparent PNG.
- CG: 30 JPG panels, including 24 main route CGs and 6 extra combat transition panels.
- Backgrounds: 12 JPG panels.
