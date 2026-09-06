# Krea2 社区生产链候选索引

日期：2026-08-19

本记录来自公开 GitHub API / raw README 的低成本检索。AnySearch skill 在当前环境没有可执行 runtime 或 MCP 入口，因此没有将 AnySearch 标记为已执行；本记录不使用任何未验证的模型下载或生产结果。

## 候选项目

| 项目 | 固定 commit | 许可证 | 主要能力 | 当前决策 |
| --- | --- | --- | --- | --- |
| `wildminder/ComfyUI-DyPE` | `874f59066f4d2c6f7fbbd4149fe5bc6f07099aa3` | Apache-2.0 | Krea2/Qwen 高分辨率位置外推，支持 DyPE 与 SEGA | 最高优先级 staging 候选；只在目标分辨率明显高于原生尺寸时接入 |
| `nkxx188/ComfyUI-Krea2-StyleTransfer` | `b30d495ab7e5626a2effc72a071430297643b718` | MIT | 单图训练无关风格参考，低内容泄漏，推荐模式保持 Krea2 质量 | 次优先级 staging 候选；参考图只负责风格，不得取代 canonical latent origin |
| `huwhitememes/comfyui-krea2-conditioning` | `729cda4fade982988a375b01928f515458407a5c` | README 标记 Apache-2.0 继承，但仓库 API license 为 NOASSERTION | 12 层 Qwen3-VL tap 的 RMS-renormalized 条件重平衡 | 仅做条件强度 A/B；许可证需人工复核后才能进入正式链 |
| `lbouaraba/comfyui-krea2edit` | `86f886dac23013d88996e3a2e99093ba44d322fb` | Apache-2.0 | Krea2 Identity Edit，像素路径 + Qwen3-VL grounded encode | 仅限非 canonical 的局部编辑或 AU 资产；禁止替代 Albina canonical geometry |
| `ethanfel/ComfyUI-Krea2TextEncoder` | `38da10b0d4655098d867c14af10093baa76a85c4` | MIT | 让 Qwen3-VL 读取参考图并生成视觉条件，支持 mask crop | 仅作图像理解辅助；不能宣称提供真正 latent 级身份锁 |

## 读取到的工程事实

`ComfyUI-DyPE` 的 README 明确将 Krea2 归入 Qwen 架构，节点位于模型加载器之后，改的是 DiT 的位置编码，不修改 CLIP 或 VAE。它适合解决高分辨率重复、细节坍缩和空间结构退化，但不是身份保持方案。对于当前项目，应只在目标分辨率超过 Krea2 原生训练范围时做单张固定 seed staging A/B。

`ComfyUI-Krea2-StyleTransfer` 的 README 把 `low_scale_end` 与 `ref_k_strength` 解耦，推荐单参考图模式，并明确三张以上参考图会让信号竞争。它最适合补足统一画风，但参考图必须是风格样本，不能把 Albina 原型当作内容参考再次注入，否则会重现过去的内容泄漏和形象漂移。

`comfyui-krea2-conditioning` 的 README 指出旧版全局乘数会放大条件幅度并导致 likeness drift；新版本默认 RMS renormalization，只改变各层比例而保持整体幅度。它可能解释当前六 LoRA 链中细节偏软的问题，但必须先确认实际节点在本机 `/object_info` 出现，再做固定 seed 单变量对照。

`comfyui-krea2edit` 的 README 要求 Krea2 Raw/Turbo、Qwen3-VL 4B 和 identity-edit LoRA，并强调 `fit`、`target_latent`、不超过 2MP 等限制。它是编辑器，不是 canonical 几何保持器；当前 Albina 只允许把它用于非 canonical AU 变体、局部材质编辑或场景合成。

`ComfyUI-Krea2TextEncoder` 的 README 明确说明 VAE reference latent 会被 Krea2 DiT 忽略，真正作用来自视觉条件；因此它可以用于“读图反推提示词/视觉描述”，不能被写成像素级 identity lock。它也说明 system prompt 交互方式是 out-of-distribution，应默认关闭。

## 本机兼容性快照

当前 ComfyUI `/object_info` 已发现：`Krea2EditModelPatch`、`Krea2EditGroundedEncode`、`Krea2StyleReferenceNode`。未发现 DyPE、SEGA、Krea2 Conditioning Control 或 Krea2 Text Encoder 节点，因此本次没有安装、没有下载模型、没有启动候选工作流。

现有正式基线仍然是 `D:\创作\krea2_verified_production_workflow.json`，六个 LoRA 的顺序与权重保持不变。任何候选节点都只能插入 staging A/B；若候选不能同时保留六个 LoRA、canonical latent origin、逐张读图和完整 receipt，则自动回退现有基线。

## 下一次低算力实验边界

只允许三张固定 seed：Albina canonical 角色一张、现有背景一张、CG 一张。每次只改一个变量，优先顺序为：Conditioning Control 的 RMS-renormalized balanced/detail、StyleTransfer 单参考 recommended、DyPE/SEGA 的高分辨率位置补偿。每张输出必须与 canonical 原图并排直接读图；任何成人比例、轮廓、眼睛左右关系、机械部件、服装分区、手脚或构图漂移立即拒绝。三张 A/B 没有通过，不得批量扩展。
