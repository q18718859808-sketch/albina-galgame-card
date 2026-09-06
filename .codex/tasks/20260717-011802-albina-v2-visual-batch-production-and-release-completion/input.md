# Albina v2 visual batch production and release completion

## Goal

在保留 Albina 独立酒馆前端、确定性剧情和现有用户改动的前提下，完成可审计、可恢复的视觉资产批量生产链路，并在正史视觉、媒体质量、运行时、E2E 与发布门槛真实通过后交付 v2.0.0。批量生成只能使用经过本轮兼容性验证、并绑定到本任务内容 hash 的用户授权图像通道；本轮候选为 x666、abrdns、huibaolinks、asaiuta 的 OpenAI-compatible `gpt-image-2`，不得把候选渠道冒充 Pie。视频继续使用 Pie `seedance-1.5-pro`。运行时不得调用媒体 API，也不得包含密钥。用户已明确授权产品完成后的远端 push；正式 tag 仍受 final 门禁约束。

## Scope

- 验证人物纯色背景生成、色键去背、透明通道检查、账本、锁、幂等与人工审核链路。
- 固化 Albina、Callisto、Ren、Dante、Faust、Vergilius 的官方视觉参考来源、固定 revision、文件 hash 与“仅生产参考、不直接分发”约束。
- 修订视觉生产计划，纠正复用 CG 的场景/角色/动作漂移，为正史复盘场景补齐专属视觉任务。
- 按参考根图、角色立绘编辑、静态 CG 编辑三层执行批量生产；未审核产物不得进入发布清单。
- 用批准的关键帧重制 Seedance 动画 CG，生成桌面/移动双编码与静态降级。
- 更新并验证 manifest、promotion receipts、release status、卡片、构建产物和一键导入链路。
- 保护 `tools/**` 生产现场，不修改、清理、暂存或提交其中内容。

## Acceptance criteria

- [ ] 纯色背景技术样片经本地去背后具有真实 alpha，边缘无明显色溢，原始响应、hash、尝试号与审核结论完整落账。
- [ ] 正史角色任务全部绑定固定官方参考与 hash；外观未冻结的正史角色和相关 CG 不得提交生产。
- [ ] 视觉生产 DAG 无环、无未知引用、job/prompt 一一对应，所有复用 CG 均与实际场景人物和动作一致。
- [ ] 所有正式图像、立绘、静态/动画 CG 均有批准的视觉审核、provider/model/upstream 契约和 hash-bound receipt；manifest 缺失数为零。
- [ ] `tools/media/production/jobs/index.json` SHA-256 保持 `771FF2BDA5615FFA7F2BA8AE4374F2B9281878395A29BE60386C9FA8A352CD74`，`tools/media/production/.ledger.json` Git object 保持 `551e85abbb3d14742e5af32b4109312cebe5e247`。
- [ ] `npm run verify`、专项视觉测试、E2E、桌面/移动与 Tavern Helper 导入验证全部通过。
- [ ] RC 检查点可以按用户授权提交并推送；只有在 release status 不再是 RC、严格门槛真实满足且权利结论明确后，才允许创建 `v2.0.0` tag 和验证 jsDelivr。
- [ ] 工程任务包最终由 `Invoke-CodexVerification.ps1` 标记为 `verified`。

## Non-goals

- 不恢复音乐生成；不把官方 OST 文件打包进发布物。
- 不转换为 BigMalove 框架，不引入父窗口 Overlay、jQuery DOM 接管、远程动态脚本或运行时媒体生成。
- 不把 Albina 的 AU 路线、原创主角或卡片原创剧情冒充 ProjectMoon 正史。
- 不绕过 Cloudflare、Bilibili 或 YouTube 的反机器人/访问控制，不下载或重新分发权利不明的官方素材。
- 不伪造 Pie 上游、来源、视觉审核、权利或严格 readiness 状态。
- 不将技术样片、拒绝图、未审核图、原始响应、密钥或生产临时文件晋升到发布目录。
