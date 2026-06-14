# Albina Portrait Regeneration Plan

Scope: asset/front-end audit only. No worldbook, image, or code changes were made.

## Commands Run

```powershell
Get-ChildItem -LiteralPath 'assets\characters\albina','assets\avatar' -Recurse -File |
  Select-Object FullName,Length,LastWriteTime | Format-Table -AutoSize
```

```powershell
rg -n "manifest|assetUrl|characters\.albina|albinaSprites|sprite:|sprite\s*=|character|avatar|albina-avatar|normal\.png|fascia-open|white-canvas|golden-bough|ring-conspiracy" frontend/src -S
```

```powershell
Get-Content -LiteralPath 'frontend\src\core\assets.ts'
Get-Content -LiteralPath 'frontend\src\config.ts'
Get-Content -LiteralPath 'assets\manifest.json'
Get-Content -LiteralPath 'assets\manifest.template.json'
```

```powershell
python - <<'PY'
# PNG header/IDAT audit: dimensions, color type, alpha coverage,
# non-transparent bounding box, and basic risk flags.
PY
```

## Runtime Albina Portrait Inventory

All files under `assets/characters/albina/` are PNG RGBA, 900x1200, and have real transparency. No zero-byte, tiny, non-PNG, or duplicate-placeholder file was found by structural checks.

| File | Size | Dimensions | Alpha zero | Non-transparent bbox | Risk |
|---|---:|---:|---:|---|---|
| `amused.png` | 728.5 KB | 900x1200 | 75.33% | x30 y389 w840 h803 | short/low crop consistency risk |
| `armored.png` | 762.8 KB | 900x1200 | 72.91% | x65 y68 w770 h1089 | none structural |
| `combat.png` | 611.5 KB | 900x1200 | 78.13% | x62 y158 w776 h1020 | none structural |
| `endgame.png` | 618.3 KB | 900x1200 | 78.60% | x30 y352 w840 h827 | short/low crop consistency risk |
| `fascia-open.png` | 848.1 KB | 900x1200 | 58.34% | x76 y32 w737 h1120 | none structural |
| `focused.png` | 783.8 KB | 900x1200 | 70.77% | x30 y184 w809 h1008 | none structural |
| `furious.png` | 873.2 KB | 900x1200 | 70.79% | x46 y323 w797 h842 | short/low crop consistency risk |
| `golden-bough.png` | 648.2 KB | 900x1200 | 76.67% | x30 y422 w811 h743 | short/low crop consistency risk |
| `maestro.png` | 892.7 KB | 900x1200 | 65.55% | x103 y47 w693 h1145 | none structural |
| `normal.png` | 716.4 KB | 900x1200 | 75.23% | x57 y343 w813 h849 | short/low crop + bottom residue risk |
| `rain.png` | 714.7 KB | 900x1200 | 73.66% | x30 y230 w810 h949 | moderate crop consistency risk |
| `ring-conspiracy.png` | 753.0 KB | 900x1200 | 71.14% | x61 y177 w776 h984 | none structural |
| `shy.png` | 824.7 KB | 900x1200 | 66.09% | x67 y63 w803 h1129 | none structural |
| `smile.png` | 749.8 KB | 900x1200 | 75.18% | x30 y374 w840 h818 | short/low crop consistency risk |
| `surgical.png` | 829.7 KB | 900x1200 | 69.99% | x30 y245 w809 h947 | moderate crop consistency risk |
| `unarmored.png` | 1053.2 KB | 900x1200 | 55.43% | x87 y32 w726 h1140 | none structural |
| `white-canvas.png` | 566.5 KB | 900x1200 | 80.23% | x30 y373 w840 h819 | short/low crop consistency risk |
| `wounded.png` | 610.7 KB | 900x1200 | 77.09% | x59 y253 w782 h925 | moderate crop consistency risk |

## Avatar And Source Sheets

`assets/avatar/albina-avatar.png` is 768x1024 PNG RGBA, 593.1 KB, but it is fully opaque (`alpha_zero_pct = 0.0%`) and below the 900x1200 runtime sprite target. It is acceptable as a card/avatar image, but it should not be reused as a stage portrait without regeneration.

Additional generated Albina sheets exist:

| File | Size | Dimensions | Alpha | Runtime use |
|---|---:|---:|---|---|
| `assets/generated/source-sheets/albina_01.png` | 2234.0 KB | 1536x1024 | no | not referenced |
| `assets/generated/source-sheets/albina_02.png` | 2252.7 KB | 1536x1024 | no | not referenced |
| `assets/generated/source-sheets/albina_03.png` | 2198.7 KB | 1536x1024 | no | not referenced |
| `assets/generated/alpha-sheets/albina_01.png` | 1433.2 KB | 1536x1024 | yes | not referenced |
| `assets/generated/alpha-sheets/albina_02.png` | 1459.9 KB | 1536x1024 | yes | not referenced |
| `assets/generated/alpha-sheets/albina_03.png` | 1364.8 KB | 1536x1024 | yes | not referenced |

These sheets are useful as generation/crop references only. They are not drop-in stage portraits because their height is 1024, not 1200, and the source sheets have no alpha.

## Quality Risks

No file is an obvious technical placeholder by size, format, dimensions, or alpha. The real risk is production quality and continuity, not path existence.

High-priority risks:

- Several scene-critical sprites have large empty top margins and shorter non-transparent bounding boxes: `normal`, `white-canvas`, `golden-bough`, `endgame`, `furious`, `smile`, and `amused`. In a bottom-anchored galgame stage, these can appear smaller or lower than full-height states such as `fascia-open`, `unarmored`, `armored`, `maestro`, and `shy`.
- Current portraits look like independent generated crops, not expression/outfit variants from one locked master sheet. This can make Albina read as multiple nearby designs across scene changes.
- `normal.png` and the derived avatar show a small bottom residue/artifact near the lower edge. This should be alpha-cleaned in any replacement batch.
- `assets/avatar/albina-avatar.png` is fully opaque with a dark background. This is fine for a card thumbnail, but it is a risk if any future UI expects transparent avatar art.
- The source sheets are not runtime-ready: they are 1536x1024 sheets, and the non-alpha sheets cannot be directly used as transparent sprites.

Scene-critical files to regenerate first:

1. `normal.png`
2. `white-canvas.png`
3. `shy.png`
4. `golden-bough.png`
5. `endgame.png`
6. `ring-conspiracy.png`
7. `furious.png`
8. `albina-avatar.png`

The remaining manifest states should be regenerated if time remains: `smile`, `surgical`, `combat`, `armored`, `unarmored`, `amused`, `focused`, `wounded`, `fascia-open`, `maestro`, and `rain`.

## Front-End Reference Chain

`frontend/src/components/GalStage.vue` renders scene characters with:

```ts
:src="assetUrl(`characters/${char.id}/${char.sprite}.png`)"
```

`frontend/src/core/assets.ts` resolves paths as:

- local bundled console mode: `../assets/<encoded path>` relative to the console script;
- CDN mode: `${CDN_BASE}/assets/<encoded path>`.

`assets/manifest.json` and `assets/manifest.template.json` both list all 18 Albina runtime sprites under `characters.albina`.

Current scene references found in `frontend/src/core/scenes.ts`:

| Scene sprite | Path | Exists | Listed in manifest |
|---|---|---:|---:|
| `albina/normal` | `assets/characters/albina/normal.png` | yes | yes |
| `albina/white-canvas` | `assets/characters/albina/white-canvas.png` | yes | yes |
| `albina/shy` | `assets/characters/albina/shy.png` | yes | yes |
| `albina/golden-bough` | `assets/characters/albina/golden-bough.png` | yes | yes |
| `albina/endgame` | `assets/characters/albina/endgame.png` | yes | yes |
| `albina/ring-conspiracy` | `assets/characters/albina/ring-conspiracy.png` | yes | yes |
| `albina/furious` | `assets/characters/albina/furious.png` | yes | yes |

No missing Albina sprite path was found in the current front-end scene chain or manifest. The avatar file is not referenced by the front-end source or manifest.

Separate non-asset issue: `frontend/src/config.ts` currently has mojibake display strings for `PROJECT_NAME` and `BUTTON_NAME`. This does not break portrait loading, but it is a visible UI text quality issue if the button/title are rendered.

## Two-Hour Delivery Plan

This plan prioritizes a usable high-quality card over exhaustive art polish.

### 0-10 min: Lock Replacement Contract

- Keep filenames and folders unchanged so no code or manifest edit is needed.
- Required runtime format: PNG RGBA, 900x1200, transparent background.
- Required stage alignment: head centered near x=450, character bbox bottom y=1140-1195, full-body bbox top usually y=40-160 except deliberately distant poses.
- Reject text, watermark, panel border, opaque background, broken alpha fringe, and bottom residue.

### 10-45 min: Regenerate Scene-Critical Batch

Generate or repaint one consistent Albina master design, then export the seven scene-used variants:

- `normal`: default masked white-gold prosthetic body, Fascia visible.
- `white-canvas`: exposed combat/body-canvas state, same face and silhouette.
- `shy`: softer expression, same costume anchors.
- `golden-bough`: golden light state, not a different character.
- `endgame`: final-route intensity, same base anatomy and headgear.
- `ring-conspiracy`: gallery/Ring mood, same base.
- `furious`: high-tension combat state, same base.

Also regenerate `assets/avatar/albina-avatar.png` from the same `normal` master as a 768x1024 opaque or semi-opaque thumbnail. If the downstream card system accepts transparent thumbnails, prefer transparent PNG.

### 45-75 min: Expand To Manifest Coverage

If generation throughput allows, export the remaining 11 states from the same master:

- `smile`, `surgical`, `combat`, `armored`, `unarmored`, `amused`, `focused`, `wounded`, `fascia-open`, `maestro`, `rain`.

If time is tight, keep old non-scene states temporarily because the current front-end route does not render them in initial scenes. Do not change manifest keys during the two-hour delivery window.

### 75-95 min: Alpha And Alignment Pass

Run the PNG audit again. Hard fail any replacement with:

- width/height not exactly 900x1200 for stage sprites;
- no alpha channel;
- fully opaque stage sprite;
- non-transparent bbox below 700 px high for a full-body state unless intentionally distant;
- bottom-edge residue;
- head/eye line drifting enough to jump between consecutive scenes.

### 95-115 min: Front-End Smoke Test

Run path and build checks:

```powershell
python - <<'PY'
# Re-run manifest/path existence and scene reference check.
PY
```

```powershell
npm --prefix frontend run build
```

Then rebuild the release package using the existing project script and run the current card/bundle validators.

### 115-120 min: Visual Spot Check

Open the local front-end or release bundle and inspect at least:

- opening scene: `normal`;
- route scene: `white-canvas`;
- confession/soft scene: `shy`;
- ending scene: `golden-bough` or `endgame`;
- conflict scene: `ring-conspiracy` and `furious`.

Accept the two-hour build only if the seven scene-used portraits appear to be the same Albina design and no path falls back to broken image icons.

