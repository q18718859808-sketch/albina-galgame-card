# Krea2 Advanced 原生 diffusers 兼容性报告

日期：2026-08-19

项目：`D:\创作\albina-v2-complete`

目标：评估本机现有 Krea2 safetensors 是否能被 `EricRollei/Krea2_ComfyUI_Advanced`（项目记录的提交 `1dbb085d655c071ef9609ce68f67a3adec0aa571`，作为 v1.5.0 参考基线）原生 diffusers 节点使用。

## 结论

当前不能使用。状态是 **blocked**，不是“只需把现有文件改名或移动到 `models/diffusers`”。

本机已有的 Krea2 权重是 ComfyUI diffusion-model 单文件格式，目标节点要求的是 Hugging Face Diffusers repository layout。两者不是同一个装载契约。当前 Python 环境还缺少两个目标 API，目标 `Eric_Krea2` 节点包也不存在；本机已有的是 `comfyui-krea2edit` 等其他 Krea2 节点。

本次检查没有安装或升级依赖，没有下载模型，没有启动 ComfyUI，没有提交任何生图请求，也没有修改现有生产合同。

## 本机证据

运行环境：

| 项目 | 结果 |
| --- | --- |
| ComfyUI | `0.28.3`，Python `3.12.10` |
| GPU | NVIDIA GeForce RTX 4070 Laptop GPU，约 8 GB VRAM |
| diffusers | `0.34.0` |
| `diffusers.Krea2Pipeline` | 不存在 |
| transformers | `4.53.0` |
| `transformers.Qwen3VLModel` | 不存在 |
| 目标节点包 `Eric_Krea2` | 不存在 |
| `models/diffusers` | 只有 `put_diffusers_models_here` 占位文件 |

发现的相关模型文件：

| 文件 | 读取结果 | 判断 |
| --- | --- | --- |
| `models/diffusion_models/krea2_turbo_fp8_scaled.safetensors` | 13,141,730,784 bytes，686 tensors；含 `_quantization_metadata`，键名为 `blocks.*` | ComfyUI 原生 Krea2 Turbo 单文件/量化权重，不是 Diffusers repo layout |
| `models/diffusion_models/redcraft23FP8_30Krea2.safetensors` | 13,141,769,680 bytes，942 tensors；键名含 `model.diffusion_model.*`；无 safetensors metadata | ComfyUI/Redcraft 包装权重，不是 Diffusers repo layout |
| `models/diffusion_models/redcraft23FP8_30Krea2_clean.safetensors` | 与上项同尺寸、同类键名 | 同上 |
| `models/text_encoders/qwen3vl_4b_fp8_scaled.safetensors` | 存在 | ComfyUI 文本编码器文件，不能替代 `Qwen3VLModel` Python API |
| `models/vae/qwen_image_vae.safetensors` | 存在 | ComfyUI VAE 文件，不能替代 Diffusers 组件目录 |

已存在的 `comfyui-krea2edit` README 只要求“支持原生 Krea2 的 ComfyUI 版本 + Raw/Turbo Comfy 权重 + Qwen3-VL 4B 编码器”，并明确它是另一套节点；这不能证明 `Eric_Krea2` 已安装或可直接复用。

## 上游要求

目标仓库 README 的硬要求是：

* 使用真正的 Hugging Face `Krea2Pipeline`，不是 ComfyUI 侧重实现。
* Diffusers 必须包含 `Krea2Pipeline`。README 指出该支持合入 `0.39.0.dev0` 之后的构建，版本字符串可能仍保持 `0.39.0.dev0`，因此普通版本安装不能作为充分证明。
* `transformers` 必须提供 `Qwen3VLModel`。目标提交的 `requirements.txt` 写的是 `transformers>=4.57.0`。
* 权重必须是 Krea-2 Raw 和 Krea-2 Turbo 的 Diffusers layout，例如独立的 `Krea-2-Raw`、`Krea-2-Turbo` 目录，而不是 ComfyUI 的单 `.safetensors` diffusion model 文件。
* 目标节点包自带 `Eric Krea2 Loader`、`Eric Krea2 Generate`、`Eric Krea2 VAE Encode`、`Eric Krea2 Vision Prompt`、`Eric Krea2 Multi-Stage Ultra V2` 等节点，包名/显示前缀为 `Eric_Krea2`。
* 安装说明要求从 Hugging Face diffusers git 强制重装并使用 `--no-deps`；requirements 仍会要求 `diffusers @ git+...` 和 `transformers>=4.57.0`。
* 可选的 FlashAttention/SageAttention 与 upscale VAE 不属于第一阶段硬要求；upscale VAE 可能在首次使用时自动下载，落地时应显式禁用或隔离该路径。

## 兼容性判定

| Gate | 当前状态 | 影响 |
| --- | --- | --- |
| Diffusers `Krea2Pipeline` | 失败 | 节点无法按其原生 pipeline 路径启动 |
| Transformers `Qwen3VLModel` | 失败 | Vision Prompt/原生 Qwen3-VL conditioning 无法满足 |
| `Eric_Krea2` 节点包 | 失败 | 目标节点类不存在；`comfyui-krea2edit` 不是替代品 |
| Raw Diffusers 权重 | 失败/未发现 | 目标要求的 Raw checkpoint 缺失 |
| Turbo Diffusers 权重 | 失败/格式不符 | 已有 Turbo 是 Comfy 单文件，不是目标目录布局 |
| 现有 six-LoRA 链 | 文件齐全 | 仅说明 LoRA 资产可作为后续迁移输入，不能解除上述 gate |
| 当前生产链 | 可用证据已有 | 应继续使用现有 ComfyUI 基线，不切换候选节点 |

## 最短可执行落地路径

1. 在与现有生产 ComfyUI 隔离的副本/独立 Python 环境中准备目标节点包，不能覆盖生产环境的依赖或 custom node 目录。
2. 在获得授权的前提下准备 **Raw 和 Turbo 两套 Diffusers layout**，保持典型组件目录与配置文件完整；不要把现有 Comfy `.safetensors` 改名为 Diffusers 模型，也不要把它们声明为兼容。
3. 在隔离环境执行只针对候选环境的依赖安装：目标 diffusers git 构建、满足 `Qwen3VLModel` 的 transformers，以及节点包要求的非 ComfyUI 依赖。先记录锁定版本和 Python/torch/CUDA 组合，再安装。
4. 做只读 import gate：确认 `diffusers.Krea2Pipeline`、`transformers.Qwen3VLModel`、`Eric_Krea2` 节点映射以及 Raw/Turbo 目录必需文件；任何一项失败都停止。
5. 仅当所有 gate 通过后，再在 staging 做一次固定 seed 的最小候选验证，绑定完整 receipt、原图分辨率检查和现有 six-LoRA 不变性检查。该步骤属于后续执行，不在本次审计中进行。
6. 通过直接图像审查和许可/权重条款审查后，才考虑候选升级；在此之前维持现有生产合同与当前 ComfyUI 基线。

最短路径的真正前置条件是：**获得 Raw/Turbo Diffusers 权重与其许可依据，并允许在隔离环境安装/升级 Python 依赖**。在用户当前给定的禁止条件下，只能完成审计，不能完成落地。

## 硬阻断

* 当前 `diffusers 0.34.0` 没有 `Krea2Pipeline`。
* 当前 `transformers 4.53.0` 没有 `Qwen3VLModel`；上游要求至少 `4.57.0`。
* `Eric_Krea2` 节点包不在本机，现有 `comfyui-krea2edit` 的节点接口和实现边界不同。
* 本机没有 Raw Diffusers layout；发现的 Turbo 权重是 ComfyUI 单文件量化格式，不能被当作目标 Diffusers layout 使用。
* 用户明确禁止安装/升级依赖和下载大模型，因此本轮不能解除前三项和权重项阻断。
* 当前硬件约 8 GB VRAM；即使软件 gate 通过，也不能在未做显存/CPU offload 评估前承诺目标节点的多阶段高分辨率路径可执行。

## 生产边界

现有 `content/media-production/krea2-canonical-production-contract-v1.json`、`krea2-advanced-adapter-v1.json` 和已验证基线保持原样。本报告只作为 research 结论，不改变 six-LoRA 顺序/强度，不授权候选生成，不授权 promotion，也不替换当前生产链。

## 复核命令记录

本次只读检查使用了本机目录枚举、safetensors header/metadata 读取、ComfyUI embedded Python 的 import/property 探针，以及上游 GitHub raw README、requirements 和 `__init__.py` 读取。未执行 pip、git clone、模型下载、ComfyUI API 请求或生成工作流。

