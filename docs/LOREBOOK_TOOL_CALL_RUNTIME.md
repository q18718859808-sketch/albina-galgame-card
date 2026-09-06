# Optional LorebookToolCall runtime boundary

Albina does not bundle, import, register, invoke, or otherwise control LorebookToolCall. The audited upstream workbench is AFPL-licensed and is therefore a separately user-installed, explicitly authorized research/maintenance tool rather than an Albina release dependency.

`src/runtime/lorebook-tool-call.ts` is deliberately a capability/status adapter. With its default options it returns `disabled` and does not require SillyTavern or any function-tool API. When a caller explicitly sets `enabled: true`, it uses only the upstream-confirmed `SillyTavern.isToolCallingSupported()` and `SillyTavern.canPerformToolCalls('function')` checks. No unconfirmed registry inspection is used, so the adapter never claims to know whether the third-party extension is installed.

The optional workbench descriptor can carry a selected layered-worldbook preset or explicit package IDs as read-only planning data. IDs are accepted only when they exist in the checked-in worldbook manifest and are not listed by the manifest's `neverRuntime` preset; unknown IDs fail closed. This does not import, register, write, edit, or delete a worldbook. The descriptor records `autoInstall=false`, `autoRegister=false`, and `autoWrite=false`, with the embedded L0 and local-storage path remaining the fallback.

The optional descriptor accepts only a dedicated worldbook named `Albina - ...`, recommends the `albina.` entry naming convention, and exposes no mutation methods. The upstream extension authorizes at the whole-worldbook scope, not by entry prefix; the convention is therefore not an access-control boundary. Creation, backup, user permission prompts, write/edit/delete actions, and teardown remain owned by the separately installed extension. If it is absent, unsupported, denied, malformed, or disabled, Albina continues using its existing TavernHelper chat-variable persistence and localStorage fallback.

The adapter reports the fixed research commit `b8eb5703ee945c40c29bdb6f6c9502224b9d6143`, not a claimed upstream release version. The matching repository URL, bundle hash, license status, and audit record are held in `D:\创作\framework-research\tavern-integrations\integration-provenance.json`.

Before a user performs workbench maintenance, they must install a compatible upstream copy themselves, use its visible permission flow, and operate only on a dedicated Albina worldbook. This boundary is not evidence that a particular installation, permission result, or mutation succeeded; those paths require isolated SillyTavern verification.
