# Albina Media Production Index Integrity

## Goal

Restore deterministic media production inventory generation so it reflects the current authoritative Albina script and visual state instead of stale pre-RC counts.

## Scope

- Derive the speech summary from the actual unique fixed voice jobs.
- Treat the empty approved `pending-gallery-cgs.json` and empty manifest media job list as zero legacy image jobs.
- Freeze the current inventory at 0 legacy images, 166 speech jobs, and 29 legacy video jobs without reintroducing retired music jobs.
- Preserve the separate v2 visual rebuild plan and all user-produced staging artifacts.

## Acceptance criteria

- [ ] Capability tests are defined and pass.
- [ ] Regression checks are defined and pass.
- [ ] All verification commands pass.
- [ ] Generated inventory is byte reproducible and contains 195 jobs.
- [ ] No provider request or paid generation is performed.

## Non-goals

- Generating the 67 v2 images or 24 v2 videos.
- Changing provider credentials, rights assertions, or visual promotion policy.
- Rewriting existing staging ledgers or production artifacts.
