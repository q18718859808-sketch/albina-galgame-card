# 世界书源证据刷新覆盖

这份覆盖记录描述 `albina-canto-i-viii-x-intervallo-refresh-v1.json` 的证据层，不改变原有 16 条卡内世界书，也不把玩家路线或 AU/IF 条目提升为正史。

本批次覆盖 29 个已有正史候选 UID：Canto I、II、III、IV、V、VI、VII、VIII 各 1 条，Canto X 1 条，Intervallo 10 条，以及 10 条与章节关联的身份、异常和音乐锚点。每条记录都绑定 `targetIds`，包含至少两条 `atomicFacts`、一个明确的 `narrativeBoundary`、本地已知 `claimIds` 和固定 revision 的 `sourceRefs`；每个来源同时保留 `locator`、`revisionId` 与 `checkedAt`。

Canto X 采用保守策略：当前批次只确认章节索引和时间线边界，不写具体对白、战斗结果或阿尔比娜事件。Canto I–VIII 与 Intervallo 的记录只刷新章节骨架、场景压力和已存在条目的使用边界；它们不能覆盖 Canto IX 的阿尔比娜正史，也不能把玩家相遇、存活、重构、恋爱或新结局写成原作事实。

审计器会同时载入 Canto IX overlay 与本批次 overlay，验证来源 ID、wiki revision、定位、checkedAt、目标 UID 和原子事实结构。运行 `node scripts/audit-limbus-worldbook.mjs` 后，本批次的实测结果为：已验证刷新记录 37 条，已刷新目标 UID 43 个，正史候选待刷新队列由 332 条降至 304 条；剩余候选仍然保持未刷新状态，不以计数替代证据。
