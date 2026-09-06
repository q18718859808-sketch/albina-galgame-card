# Albina 世界书迁移边界

当前发布卡内的 `16` 条不是完整世界书，而是可随卡导入的最小 canon-anchor 包：15 条 Albina/Canto IX 原作边界条目，加 1 条玩家档案运行时条目。它的职责是保证角色卡单独导入后仍有稳定的身份、外观、Fascia、9-14/9-18/9-37/9-43 时间线和 AU/IF 分界；它不替代完整世界观资料包。

完整历史包位于旧项目 `albina-cdn-release/dist/albina-galgame-card/worldbooks`。本次只读盘点写入 `research/legacy-worldbooks/inventory-v1.json`，并为每个旧条目写入 `content/worldbook/legacy-worldbook-migration-v1.json`。原文件不覆盖、不改写，研究快照以 SHA-256 固定。

盘点结果（2026-08-11）是 46 个 JSON 文件、5283 条条目，2496 个 UID 在旧包内重复或跨层重复。该总盘点只能用于发现重复、旧 revision 与文件边界，不能把“RP 用途说明”错误等同于 AU 内容。完整世界审核改用 `npm run worldbook:audit:limbus` 生成的三轴 ledger：每条内容分别记录原作事实状态、Galgame 叙事用途和正史时间定位。只有明确 AU/IF 连续性标记的条目才进入 AU 包；Canto、Intervallo、LCB、都市势力、敌对生态和 E.G.O/身份材料都应作为可审核的原作世界候选。

物化后的运行结构采用互斥 UID 分层，不再把 `16` 条最小包误称为完整世界书。`content/worldbook/albina-worldbook-packages-v1.manifest.json` 是可执行包清单：L1 是 7 条 P0 阿尔比娜核心，L2 是 33 条 P1 第九章与主要角色，L3 是 80 条 P2 世界扩展，Plot 是从 P2 单独抽出的 22 条完整 Canto/Intervallo 时间线，L4 是 37 条 P3 战斗、异常、罪与 E.G.O 机制，L5 是 156 条 P4 已逐文章复核的身份资料，AU/IF 是 6 条明确连续性扩展。缺少来源引用的 258 条 RP/runtime 材料已完整物化到 quarantine 包，但强制默认禁用；1,882 条 manifest bridge 只进入 source-index 包，也强制默认禁用且不参与运行时注入。以上全量集合恰为 599 substantive candidates 加 1,882 bridge/index，包间 UID 不重复。

L0 `albina-worldbook-l0-minimal-anchors-v1.json` 是当前 16 条卡内锚点的独立镜像，只用于单卡最小预设；它和完整分层集合互斥，不能叠加后再计算“完整世界书”条数。默认完整核心预设只启用 L1、L2 和 Plot，共 62 条、13,578 个 UTF-16 正文字符、0 个常亮正文字符。L3、L4、L5、AU 均为显式 opt-in；quarantine 与 source-index 被列入 `neverRuntime`。静态预算只统计启用条目，关键词库存字符数不等于单回合实际注入量，最终上下文成本仍需在隔离 SillyTavern 中按触发场景实测。

所有分层包由 `content/worldbook/materialize-layered-worldbooks.mjs` 从审计 ledger 可重复生成。生成器会先按 `research/legacy-worldbooks/inventory-v1.json` 中的固定根目录读取旧包，再核对每个来源包 SHA-256，最后按 `(legacyFile, uid)` 回读原条目；哈希不符、来源 UID 缺失、跨包 UID 重复或条目未分配都会直接失败。`tests/worldbook/layered-worldbooks.test.ts` 独立验证 UID 全覆盖、599/1,882 计数、默认启用策略、禁用注入、manifest 文件哈希和预算上限。

原作剧情分析仍然有效并且继续作为正式输入：`content/canon-sources-v1.json` 保存 18 条来源记录，`content/canon-claims-v1.json` 保存 18 条带分类和证据的 claim，`content/canon-coverage-v1.json` 负责映射，`content/dialogue/canon-recap.json` 提供 6 段可玩的 Canto IX 复盘。复盘顺序固定为 9-14 背景、9-18 首次直接出场、9-37 相遇与战斗升级、Albina/Fascia 身份核对、9-37 战斗边界、9-43 既定结局；完成 9-43 后才进入明确标记的 AU/IF 分支。

迁移原则是：旧条目只有在能映射到当前 claim 和当前来源 revision，且文本没有把推断或 RP 指导伪装成事实时，才可进入 canon-migrate；AU/IF/RP 只进入 au-migrate；来源 revision 过期、字段不完整、UID 冲突或边界不清的条目保持 needs-review；只有人工确认违反当前发布政策后才标 reject。未通过迁移审计前，不更新正式 release 镜像，也不宣称完整世界书或最终媒体发布完成。

## 酒馆世界书工作台

LorebookToolCall `v0.0.10` 仅保留为研究记录的可选外部工作台，当前 Albina 发行卡不会加载、捆绑或依赖它。原因是已审计源码的 AFPL 许可不适合作为本卡的远程运行时依赖。它提供的 `Glob`、`Grep`、`Read`、`Write`、`Edit`、`Delete`、`CreateLorebook`、`GetAttribute` 和 `SetAttribute` 能力只能在用户自行合法安装、明确授权、并使用专用 `Albina - ...` 世界书时进行可逆的维护试验；普通剧情流程不得自动写入或删除任何用户世界书。

当前正式路径仍是内嵌的 16 条 anchor 条目、经审计的完整资料库与 `TavernHelper.setVariables(..., { type: 'chat' })` 玩家档案/存档持久化，并提供 localStorage fallback。LorebookToolCall 缺失、未安装或权限被拒绝时，游戏启动与叙事运行不受影响；它也不能作为世界书运行时注入的验收依据。
