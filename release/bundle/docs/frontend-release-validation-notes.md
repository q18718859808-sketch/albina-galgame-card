# Frontend Release Validation Notes

Date: 2026-06-02

Superseded: v1.0.17 remote release validation passed on 2026-06-04. See `docs/remote-cdn-v1.0.17-verification.json`.

Scope: frontend/resource-chain validation only. No build scripts were run, and `assets/`, `card/`, `worldbooks/`, `release/`, `dist/`, `frontend/`, `tools/`, and `scripts/` were not modified.

## Checked Files

- `frontend/src/components/GalStage.vue`
- `frontend/src/core/assets.ts`
- `frontend/src/core/scenes.ts`
- `assets/manifest.json`
- `assets/manifest.template.json`
- `card/albina.card.json`

## Resource Chain Result

`GalStage.vue` renders character sprites through:

```text
assetUrl(`characters/${char.id}/${char.sprite}.png`)
```

`frontend/src/core/scenes.ts` currently references 14 character sprite pairs. All scene sprite references are declared in both `assets/manifest.json` and `assets/manifest.template.json`, and every referenced file exists under `assets/`.

Focused Albina sprite checks:

| Sprite | Manifest path | Exists |
| --- | --- | --- |
| `normal` | `characters/albina/normal.png` | yes |
| `white-canvas` | `characters/albina/white-canvas.png` | yes |
| `shy` | `characters/albina/shy.png` | yes |
| `golden-bough` | `characters/albina/golden-bough.png` | yes |
| `endgame` | `characters/albina/endgame.png` | yes |
| `ring-conspiracy` | `characters/albina/ring-conspiracy.png` | yes |
| `furious` | `characters/albina/furious.png` | yes |

## Card JSON Result

`card/albina.card.json` was read with Python as UTF-8. Core character fields loaded cleanly and did not contain Unicode replacement characters in the checked fields: `name`, `description`, `personality`, `scenario`, `first_mes`, and `mes_example`.

Tavern Helper CDN import remains pinned to jsDelivr:

```text
https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.17/dist/albina-galgame-card/console/index.js
```

The current release path is version-pinned with `@v1.0.17`, not `main`, `master`, or `latest`; the immutable deploy URL is recorded in `docs/github-deploy-result.json`.

## Commands Run

Passed:

```powershell
python scripts\validate_assets.py .
```

Output:

```text
Asset validation passed.
```

Passed:

```powershell
python scripts\st_card_tool.py validate card\albina.card.png
```

Output:

```text
valid
```

Not applicable:

```powershell
git status --short
```

Output indicated `D:\codex\albina-galgame-card` is not a Git repository, so no Git-based dirty-worktree conclusions were made.

## Pending Main-Thread Final Validation

After the main thread finishes merging new portraits/worldbooks, it should rebuild and audit the release outputs. Suggested commands, based on the existing project scripts:

```powershell
python scripts\build_release_bundle.py .
python scripts\build_pure_import_bundle.py
python scripts\validate_assets.py .
python scripts\st_card_tool.py validate card\albina.card.png
python scripts\validate_project.py .
python scripts\audit_release.py .
python scripts\audit_cdn_bundle.py .
```

The frontend build is performed by `scripts\build_release_bundle.py` via `npm install --no-audit --no-fund` and `npm run build` in `frontend/`; it was intentionally not run in this validation pass.
