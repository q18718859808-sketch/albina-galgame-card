# P2 Identity / Association Batch Plan

Scope: metadata-only planning for P2 pages with `status=pending_manual_paraphrase` and `priority=P2_rp_support`. No worldbook body is included here.

## Selection Constraints

- Included 24 pages, all verified against `docs/limbus_lore_rewrite_queue.json` as `P2_rp_support` and `pending_manual_paraphrase`.
- Excluded sprites, theme packs, categories, event/story episode pages, Midspring pages, and obvious abnormality-only pages.
- Requested nearby clusters `Cinq`, `Zwei`, `Blade Lineage`, `Kurokumo`, `The Ring`, and `House of Spiders` were not selected because their matching pending pages are `P3_backlog` or already covered by P0, not P2.

## Selected Pages

| Title | Length | Revision | Selection reason |
|---|---:|---:|---|
| Camille/Enemy | 6362 | 167845 | directly matches the requested Camille anchor and gives a compact character-combat page for RP stance, threat language, and confrontation pacing. |
| Öufi Assoc. Director/Enemy | 5466 | 171350 | only P2 association-titled page in this filter; useful for Association hierarchy and professional fixer framing. |
| District 20 Yurodiviye Captain/Enemy | 12352 | 155589 | organization-linked captain role; useful for revolutionary/cell leadership combat ecology. |
| Guido/Enemy | 18526 | 167484 | N Corp-aligned named enemy useful for fanatic command behavior and pressure tactics. |
| Kromer/Enemy/Kromer | 19082 | 167270 | N Corp leadership antagonist page; useful for ideological threat posture without pulling event pages. |
| Old G Corp. Head Manager/Enemy | 6439 | 167190 | corporate-war remnant command role; useful for old-Corp hierarchy and battlefield management cues. |
| Shi Huazhen/Enemy | 19757 | 171428 | Shi-linked combatant page; supports assassin/section combat style grouping. |
| Shi Sijing/Enemy | 20421 | 167874 | Shi-linked combatant page; pairs with the other Shi pages for faction behavior comparison. |
| Shi Yihua/Enemy | 13955 | 167875 | Shi-linked combatant page; adds another named profile for section-level texture. |
| Shiomi Yoru/Enemy | 30475 | 171427 | Shi-linked combatant page with higher article weight; likely useful as the lead Shi profile. |
| Jun/Enemy | 8978 | 155540 | named combatant suitable for role ecology and low-level faction encounter writing. |
| Kira/Enemy | 33133 | 169517 | named enemy page with substantial length; useful for antagonist combat behavior. |
| Kira/Assist Unit | 9441 | 167202 | same character in support-unit framing; useful for contrast between enemy and ally/support portrayal. |
| Jia Mu/Enemy/Jia Mu | 15523 | 171423 | named enemy page from the Jia cluster; useful for local faction politics and encounter stakes. |
| Jia Xichun/Assist Unit | 34517 | 167924 | major support-unit metadata page; useful for ally-facing combat ecology and RP hooks. |
| Kong Qiu/Enemy | 40160 | 171394 | large named enemy page; useful for command presence and set-piece combat tone. |
| Lei Heng/Enemy | 41705 | 172317 | large named enemy page; supports the same regional character-combat cluster. |
| Wang Qingshan/Enemy | 18009 | 171398 | named enemy page; useful as a lower-to-mid tier profile in the regional cluster. |
| Wei/Enemy | 14812 | 171395 | named enemy page; adds breadth to the regional hostile roster. |
| Xue Pan/Enemy | 15304 | 171378 | named enemy page; adds another social-role combatant for faction texture. |
| Hohenheim/Enemy | 28352 | 167944 | substantial named enemy page; useful for antagonist mechanics and confrontation patterning. |
| Hohenheim/Assist Unit | 9316 | 171450 | same character support framing; useful for ally/enemy dual-role contrast. |
| Moses/Assist Unit | 9752 | 171454 | support-unit page for investigative/fixer-adjacent RP hooks. |
| Vergilius/Assist Unit | 24709 | 167934 | high-value support-unit profile for guide/mentor combat ecology and tone calibration. |

## Suggested Worldbook Grouping

1. Camille and Association-facing duelists: `Camille/Enemy`, `Öufi Assoc. Director/Enemy`.
2. City organization pressure: `District 20 Yurodiviye Captain/Enemy`, `Old G Corp. Head Manager/Enemy`.
3. N Corp fanatic command ecology: `Guido/Enemy`, `Kromer/Enemy/Kromer`.
4. Shi combat section profile: `Shi Huazhen/Enemy`, `Shi Sijing/Enemy`, `Shi Yihua/Enemy`, `Shiomi Yoru/Enemy`.
5. Kira dual framing: `Kira/Enemy`, `Kira/Assist Unit`, plus `Jun/Enemy` as nearby named combatant context.
6. Jia-linked ally/hostile contrast: `Jia Mu/Enemy/Jia Mu`, `Jia Xichun/Assist Unit`, `Kong Qiu/Enemy`.
7. Regional hostile roster: `Lei Heng/Enemy`, `Wang Qingshan/Enemy`, `Wei/Enemy`, `Xue Pan/Enemy`.
8. Hohenheim dual-role profile: `Hohenheim/Enemy`, `Hohenheim/Assist Unit`.
9. Investigator/guide support ecology: `Moses/Assist Unit`, `Vergilius/Assist Unit`.

## Notes For Main Thread

- This batch intentionally avoids event/midspring/abnormality pages to reduce conflict with the P2 event-support worldbook line.
- The manifest stores only page metadata from the allpages manifest: title, pageid, length, last revision, touched timestamp, and URLs.
- If the next line needs `Cinq`, `Zwei`, `Blade Lineage`, `Kurokumo`, `The Ring`, or `House of Spiders`, promote or explicitly allow `P3_backlog` pages first.
