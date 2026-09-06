# Implementation plan: ambiguous retry cross-contract authorization

1. Explore the public authorization, ledger-link, and CLI seams plus existing test conventions.
2. Add one cross-contract authorization regression slice and confirm RED at the expected invariant.
3. Make the smallest authorization and provenance implementation change and confirm GREEN.
4. Add only the CLI/type contract needed to bind caller expectations, with a focused RED/GREEN cycle.
5. Run every automatic verification command in the manifest without invoking a provider request.
6. Review the final diff for immutable history, strict ordered references, backward compatibility, and ledger side effects.
