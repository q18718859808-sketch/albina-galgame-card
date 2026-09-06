# Implementation plan: Albina Tavern Helper CDN Completion

1. [x] Inspect the current card builder, embedded PNG metadata, release scripts, and existing Tavern Helper tests.
2. [x] Independently extract the exact working script schema from prior Albina cards and the 8-bit reference.
3. [x] Compare current output against those references and write a failing regression test for every confirmed mismatch.
4. [x] Repair the canonical card builder/configuration and regenerate JSON, PNG, dist, and release mirrors without touching media production work.
5. [x] Run focused tests, typecheck, build, asset/release audits, PNG metadata round-trip, and browser harness E2E.
6. [x] Independently review CDN content types, URL immutability/fallback behavior, script ordering, security boundaries, and final artifact parity.
7. [x] Publish the immutable `v2.0.0-rc.2` tag and verify the final card against the real public CDN on desktop and mobile.
8. [x] Run the task manifest verification and record final artifacts and evidence.
