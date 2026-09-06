# Frontend / ThreeJSVFX / TavernForge acceptance

This note records the runtime checks for the frontend-owned acceptance line. It
does not cover Krea2 production, worldbook authoring, or formal asset release.

## Local browser evidence

The local Playwright browser and system Chrome are available. The VFX suite
uses the Vite development server and checks both desktop and mobile projects.
It verifies a nonblank animated WebGL canvas, pixel changes over time, choice
hit testing through the visual layer, explicit static quality, reduced-motion
fallback, and the static canvas effect marker.

The TavernForge harness suite verifies player-profile persistence, route choice,
save/reload, gameplay-panel keyboard behavior, offline fallback, and that no
retired video asset is requested.

Commands:

```powershell
npx playwright test tests/e2e/vfx-visual.spec.ts --project=desktop --project=mobile --reporter=list
npx playwright test tests/e2e/tavern-helper.spec.ts --project=desktop --project=mobile --reporter=list
```

## Real SillyTavern boundary

The real-host suite is only valid after an isolated SillyTavern instance has
Albina imported and selected. Set `SILLYTAVERN_E2E_URL` to that instance and
run:

```powershell
$env:SILLYTAVERN_E2E_URL='http://127.0.0.1:8913'
npx playwright test tests/e2e/sillytavern-runtime.acceptance.spec.ts --project=desktop --reporter=list
```

On 2026-08-19, `http://127.0.0.1:8913` returned a healthy SillyTavern page,
but no `[data-albina-launcher]` was present. Both real-host cases therefore
failed at the import/selection prerequisite. This is an unverified host state,
not a frontend pass, and must not be reported as successful runtime acceptance.

The real-host Playwright suite now emits a structured diagnosis when this
prerequisite is missing: URL/title, character-list marker count, visible
character-card names, iframe count, and the absence of the Albina launcher.
This distinguishes a clean unselected Tavern page from a frontend/CDN mount
failure without modifying the host session.
