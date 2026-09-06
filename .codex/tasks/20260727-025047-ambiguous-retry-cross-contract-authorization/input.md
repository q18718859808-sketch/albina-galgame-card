# ambiguous retry cross-contract authorization

## Goal

Allow an explicitly authorized retry of ambiguous visual attempt 11 when the current visual contract differs from the superseded contract, while preserving the old attempt's immutable ledger provenance.

## Scope

- Extend ambiguous retry authorization and ledger-link validation to bind the superseded contract and the current contract independently.
- Bind the current prompt hash, ordered reference inputs, and authorized new request key against tampering.
- Preserve backward compatibility for existing same-contract version 1 authorization evidence.
- Extend the retry CLI's explicit expected-value gate when required by the public contract.

## Acceptance criteria

- [ ] Capability tests are defined and pass.
- [ ] Regression checks are defined and pass.
- [ ] Cross-contract authorization accepts the intended old attempt/current contract pair.
- [ ] Tampering with reference order/hash, current contract, prompt hash, or new request key is rejected.
- [ ] Archived attempt 11 retains its old source-job hash and request key.
- [ ] Existing same-contract version 1 evidence remains valid.
- [ ] `pnpm exec vitest run tests/assets/visual-production.test.ts` passes.
- [ ] `pnpm run typecheck` passes.

## Non-goals

- Sending any image-provider or other network request.
- Rewriting existing ledger history or production evidence.
- Changing unrelated media, release, application, or build artifacts.
