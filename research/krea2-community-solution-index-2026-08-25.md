# Krea2 社区生产方案索引（2026-08-25）

本索引将 Krea2 相关方案按能力拆开评估：生成主干、结构控制、身份/编辑、风格参考、高分辨率、双阶段采样、条件重平衡，以及读图/提示词辅助。原有六 LoRA 工作流保留为一个本地候选基线，`sixLoraCompatibility` 只表示能否组合，不再作为所有候选必须满足的硬门槛。

当前没有任何社区方案因为仓库 README 或节点连线就获得正式资产资格。`priority-pilot` 只表示值得在 ComfyUI 恢复后做一次固定 seed、单图、可回滚的 A/B；它不表示已安装、已跑通或已通过 Albina 直读审查。未知 commit、未知权重、未知许可证和远程服务均保持阻断。

最值得优先比较的三条生成方向是：`ConditioningKrea2Rebalance`，用于判断当前输出发糊是否来自条件层幅度失衡；`Krea-2-Two-Stage-Sampler` 或 `ComfyUI-DyPE`，用于判断高分辨率/双阶段是否改善机械边缘与空间细节；`ComfyUI-Krea2-StyleTransfer`，只用去身份化的风格样本，不把另一张 Albina 图当作内容参考。`Krea2_ComfyUI_Advanced` 的质量上限可能最高，但当前被 Diffusers API、节点包、权重布局和显存条件阻断，不能直接宣称可用。

读图侧优先考察 `ComfyUI_Qwen3-VL-Instruct`、`ComfyUI-Krea2TextEncoder` 和低占用的 Qwen3-VL GGUF 节点。它们可用于反推提示词、制作 ROI、辅助发现脸部/服装/结构漂移，但不能替代原图直读，也不能单独批准发布。

Latent.moe 已纳入索引，但它是远程、串行、配额约束的服务，不是本地 Krea2 生产链。它可以承担非 canonical 的背景、AU 或基准对照，不能成为阿尔比娜身份资产的正式来源，且生成资产授权仍需单独确认。

完整字段、固定版本、许可证证据、本地状态与下一步顺序见：`content/media-production/krea2-community-solution-index-v3.json`。

本次只完成索引与静态分类，没有安装节点、下载权重、启动离线 ComfyUI，也没有消耗新的 GPU 推理算力。后续实机试验必须在运行端点恢复后按单图顺序进行，并在每张候选图输出后直接打开原始分辨率读图。
