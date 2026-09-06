# 媒体就绪门禁诊断（2026-08-30）

## 结论摘要

`audit-media-readiness.mjs --strict` 当前：**total 61 / ready 0 / blocked 61**。

61 项 blocked 的构成不是「资产文件缺失」——所有文件均存在于 `dist/albina-galgame-card/assets/`。阻塞分两类：

| 分组 | 数量 | 证据状态 | 阻塞原因 | 出路 |
|---|---|---|---|---|
| A. 证据完备，仅缺权利签署 | 16（12 bg + 4 角色） | lineage ✓ + provenance ✓（review approved）| `rights.status = unverified` | 人工权利审查签署（**需用户决策**） |
| B. 证据链完全空白 | 45（22 cg + 23 角色变体） | provenance/lineage 全无 | 未走 Krea2 生产/绑定流程 | 解除生图暂停 → 生产 → 绑定 → 审查 |

**ready 恒为 0 的根因**：`readinessIssues` 要求 `rights.status === 'verified' && redistribution === 'allowed'`，且生产台账策略 `unverifiedRightsBlockPromotion: true`。没有任何脚本路径能绕过人工权利审查把该项置绿——这是发布门禁的硬性设计。

## 门禁判定机制（scripts/lib/media-readiness.mjs）

一条资产 ready 需同时满足：
1. `rights.status = 'verified'` 且 `rights.redistribution = 'allowed'`
2. `lineage` 非空
3. `rights.sourceType ∈ {model-output, project-authored, licensed-source, third-party-source}`
4. 若 `sourceType = model-output`：provenance 需 `sourceJobHash`（64 位 hex）+ `promptVersion` + `review.status = approved` + reviewer/reviewedAt 完整

## 分组 A：16 项证据完备，待权利签署

全部满足条件 2-4，仅差条件 1。收据来自 `content/media-receipts/`，视觉审查均已 approved（reviewer: `codex-direct-original-resolution-review`）。

| 资产 | sourceJobHash（前 8 位） | 现状 |
|---|---|---|
| bg/backstreets_rain.jpg | 9c8f4c59 | lineage ✓ provenance ✓ rights unverified |
| bg/city_rooftop.jpg | ed399173 | 同上 |
| bg/golden_bough.jpg | fee03fac | 同上 |
| bg/lce_lab.jpg | a23b83d1 | 同上 |
| bg/limbus_bus.jpg | ae803f31 | 同上 |
| bg/mirror_corridor.jpg | 0ce8ff26 | 同上 |
| bg/nest_station.jpg | 9aa85f71 | 同上 |
| bg/outskirts_dawn.jpg | 4b1979e0 | 同上 |
| bg/rain_room.jpg | c12bbed4 | 同上 |
| bg/ring_atelier.jpg | 7a7e16d4 | 同上 |
| bg/spider_gallery.jpg | 44c55982 | 同上 |
| bg/white_canvas.jpg | 945f3986 | 同上 |
| characters/albina/armored.png | 29a00200 | 同上 |
| characters/albina/normal.png | fb1dd9f6 | 同上 |
| characters/ren/normal.png | e89bcc5e | 同上 |
| characters/vergilius/normal.png | f15540b1 | 同上 |

**待用户决策字段**（每条）：`rights.status = verified`、`rights.redistribution = allowed`、`rights.holder`（持有人，如用户本人/项目主体）、`rights.rightsBasis`（依据说明）。

**执行路径（用户确认后）**：按既有收据结构补 rights 字段 → 重跑 `audit-assets.mjs` 重建 manifest（`attachPromotionProvenance` 有 sha256 一致性校验，哈希不符会抛错留原状）→ 复跑 `audit-media-readiness.mjs --strict` 验证 16 项转 ready。

## 分组 B：45 项证据链空白

manifest 中无 provenance/lineage 记录（非「未绑定」，是「无收据可绑」）。

**22 cg**：araya_rooftop / art_resonance / backstreet_pursuit / combat_transition_01 / conspiracy_contract / fascia_heartbeat / golden_bough_ending / golden_bough_rebuild / hollow_torso_reveal / lce_raid / limbus_bus_night / maestro_shadow / opening_rain / rain_confession / rebuild_awakening / ren_interruption / ring_conspiracy_ending / ring_invitation / surgery_of_memory / trust_threshold / white_canvas_choice / white_canvas_ending

**23 角色变体**：albina（combat / endgame / fascia-open / furious / golden-bough / maestro / rain / ring-conspiracy / shy / surgical / white-canvas）+ callisto/normal + dante/normal + faust/normal + golden_apparition/normal + lce_doctor/normal + protagonist（battle / resolve / serious / shadow / tender / wet-hair）+ ring_agent/normal

**出路**：解除生图暂停 → 走 Krea2 staged high-frequency 管线生产 → 收据生成 → `attachPromotionProvenance` 绑定 → 视觉审查 → 权利审查。任一环节缺失该组保持 blocked（不伪造完成）。

## 行动项

1. 【需用户决策】分组 A 的权利签署：确认 16 项均为本地 Krea2 生成、自持权利、允许再分发后，可执行批量签署 + manifest 重建（预计 ready 16/61）。
2. 【需用户决策】分组 B 的 45 项：保持 blocked 待生图恢复，或明确其他处置。
3. 【保持】发布流水线（release:sync / release:push）未触碰；`v2.0.0` final 需全部 61 项 ready 后才可评估。
4. 【保持】git 提交策略待确认。

## 红线

- 不代签任何 `rights.status = verified`（权利归属与再分发结论属人工决策，助手不可代替）。
- 不为分组 B 伪造生产收据或 provenance。
- 不因「文件存在」而宣称媒体 ready——门禁以证据链为准。
