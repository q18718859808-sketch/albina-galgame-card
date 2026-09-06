# Player Profile Acceptance

The host-only verifier is `node scripts/verify-sillytavern-host.mjs`. It only probes the loopback CSRF endpoint and prints the discovered SillyTavern/TavernForge paths plus an isolated PowerShell install command; it does not import a card, start a process, or change global configuration. `api-ready-runtime-ui-unverified` means the host handshake passed, not that Tavern Helper executed the card script.

The real-instance import entrypoint is `node scripts/verify-sillytavern-import.mjs`. It probes or starts an isolated local SillyTavern, imports `card/albina.card.png`, then reads `/api/characters/all` to verify that the imported character actually contains exactly 16 worldbook entries and the same entry-id order as the card. This API evidence is separate from browser UI evidence.

Use the discovered local installation explicitly when needed:

```powershell
$env:TAVERN_FORGE_ROOT='C:\Users\张一帆\.agents\skills\tavern-forge'
$env:SILLYTAVERN_ROOT='D:\sillytavern\SillyTavernLauncher\SillyTavernLauncher1.3.9\SillyTavern'
node scripts/verify-sillytavern-import.mjs --port 8911 --keep-running
```

Use `--base http://127.0.0.1:<port>` to target an already-running local instance; `--port <port>` remains supported for the default loopback form. Use `--no-start` to require an already-running instance, `--skip-browser` when only API import evidence is wanted, and `--headed` when the browser must be visible. A missing `server.js`, unreachable port, or page without the selected Albina card is recorded as `blocked` or `unverified`; it is never reported as a pass.

For browser acceptance, first import and select Albina in the real Tavern page, then run:

```powershell
$env:SILLYTAVERN_E2E_URL='http://127.0.0.1:8911'
npx playwright test tests/e2e/sillytavern-runtime.acceptance.spec.ts --project=desktop
```

That suite observes the launcher and shell, player-profile submission, chat-variable visibility, reload restoration, unmount cleanup, and static/pure-text behavior when media is unavailable. Without `SILLYTAVERN_E2E_URL`, Playwright skips the real-host suite; the skip is an unmet prerequisite, not a successful acceptance.

The contract-only entrypoint remains `node scripts/verification/verify-player-profile.mjs`. It checks the schema, InitVar, update rules, chat-scoped `{ type: 'chat' }` write contract, EJS `getvar` reader, optional tool-call boundary, fallback key, and preservation of the original 16 embedded entries. It does not claim that the real Tavern UI, EJS model context, or TavernHelper persistence was observed.

The project harness tests in `tests/e2e/tavern-helper.spec.ts` and `tests/e2e/storage-fallback.spec.ts` exercise the frontend in an isolated browser harness. They are useful regression tests, but do not replace the real SillyTavern acceptance above.
