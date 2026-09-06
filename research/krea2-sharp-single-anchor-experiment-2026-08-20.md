# Krea2 单锚点锐化候选：静态计划与验证边界

本记录定义一个可复现但**不执行推理**的单锚点 Krea2 锐化候选。它的目标是评估更清晰的高频材质分离，同时保持 Albina 的 canonical RGBA 几何、透明 alpha、固定六 LoRA、固定随机种子和直接原始分辨率审查门禁。

计划文件是 `content/media-production/krea2-sharp-single-anchor-experiment-v1.json`；纯静态 planner/validator 是 `scripts/lib/krea2-single-anchor-experiment.mjs`；只读 CLI 是 `scripts/run-krea2-albina-sharp-single-anchor-plan.mjs`。

该计划严格只允许一项未来 staging 输出：一个 canonical source、`batchSize: 1`、`maxOutputs: 1` 和固定 seed `2026082001`。它不是 A/B sweep，不允许附加 reference 图、LoRA 重排或重权、裁切、翻转、inset、批量生成或提升到 production。

候选保留两个有界阶段。第一阶段以 canonical RGBA 在中性底色上展平后作为 latent origin，使用 592 × 1768、28 steps、denoise 0.12。第二阶段只能来自第一阶段 decode 的 RGB，使用精确 2× 的 1184 × 3536、30 steps、denoise 0.06。最终输出必须恢复 canonical alpha；Krea2 只拥有 RGB 材质与线条细节，不拥有几何或轮廓。

验证器会拒绝以下情况：不是六条既定 LoRA（含顺序和 strength）、非固定或阶段间不一致 seed、非单输出/非 batch、非 8 对齐 canvas、第二阶段不是 2×、高于有界 denoise、不是 canonical latent origin、没有 alpha restore，或把自动视觉检查当成直接审查替代品。它也要求 `gpuInferenceStarted=false` 与 `enqueueAllowed=false`，因此不能被用于启动 ComfyUI。

只读验证示例：

```powershell
node scripts/run-krea2-albina-sharp-single-anchor-plan.mjs --plan content/media-production/krea2-sharp-single-anchor-experiment-v1.json
```

在以后获得单次 staging 执行授权时，执行端必须另行构建工作流并在提交前验证：计划 hash、canonical hash、工作流/拓扑 hash、六 LoRA 链、固定 seed、最终 output hash 和具名的原始分辨率直接审查记录。该计划本身不授权该步骤，更不授权 promotion。
