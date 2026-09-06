# Image2 / Anima 与 ComfyUI 工作流研究报告 v1

- **检索日期**：2026-09-04（Asia/Shanghai）
- **范围**：仅研究与取证；未执行生图、上传、付费调用，也未修改冻结 plan、prompt、job hash 或现有生产源文件。
- **项目根**：`D:/创作/albina-v2-complete`
- **结论性质**：本报告把“接口已由本项目请求/响应或官方页面明确证明”和“仅有通用 ComfyUI 形状”严格分开；搜索摘要不能单独证明兼容。

## 1. 执行摘要与结论分级

### 1.1 关键判断

1. 项目当前的 `gpt-image-2` 是 **WisArt OpenAI-compatible 适配器**，不是已经验证的 OpenAI 直连。`tools/media/src/provider-clients.ts:37-53` 仅实现 `/v1/images/generations` JSON 和 `/v1/images/edits` multipart；编辑请求字段为 `model`、`prompt`、重复的 `image`、`size`。仓库内 2026-07-23 WisArt 文档核验明确记录：最多 16 张、重复 `image` 字段、`quality` 不在编辑参数表、`input_fidelity` 不发送，`mask` 为兼容字段且当前不参与生成。
2. `gpt-image-2` 的上游 OpenAI 能力不能自动转嫁给 WisArt。OpenAI 官方 API 页面本次 `WebFetch` 返回 `Forbidden`，所以本次检索不把搜索索引中关于任意尺寸、透明背景、mask、quality 的摘要当作已验证的 WisArt 能力。上游字段需在直连端点和实际请求/响应 fixture 验证后才可采用。
3. **Anima 不是一个已经发现的远端生图 API**。本项目证据是本地 ComfyUI 模型分支：官方 ComfyUI 文档明确将 Anima 定义为 2B、动漫/非写实、原生 `UNETLoader + CLIPLoader + VAELoader` 的纯 text-to-image，且“不需要输入图”。本地 `staging/media/anima-krea2-research-pilot.workflow.json` 已有一次运行记录，但这证明的是本地工作流可运行，不证明参考图、mask、ControlNet 或远端 Anima API。
4. 项目所谓 Latent API 是 `https://latent.moe` 的异步服务，不等同于 Anima 模型 API。官方 Latent 文档和 `tools/media/src/latent-moe-client.ts:19-27` 只明确 `prompt`、`negativePrompt`、`seed`、`resolution`、`steps`、`sampler`、`scheduler`；没有 `source_image`、`mask`、`LoRA` 或 `ControlNet` 字段。因此它可作为 text-only 探索分支，不可宣称为参考图角色重绘接口。
5. ComfyUI 的 ControlNet、Detailer、分块超分等是**外围增强形状**，不是 Image2/WisArt 或 Latent API 原生能力。只有当目标本地 checkpoint/节点类型/权重已被单独验证时才能接入；把 SD1.5/SDXL 的 ControlNet 直接接到 Anima 是未证实或不适配的推断。

### 1.2 分级表

| 分级 | 已确认项目 | 对 Albina 的使用边界 |
|---|---|---|
| **可直接验证** | WisArt `gpt-image-2` `/v1/images/edits` multipart；重复 `image`；编辑尺寸字段；本地 Anima 原生文生图节点；Latent API 的文本/负面词/seed/分辨率/采样参数；ComfyUI 官方 Anima 模板 | 可按现有 provider 与本地文件合同运行，但本次不运行生成 |
| **可作为外围增强** | ComfyUI 输入/输出节点、VAE 编解码、低去噪 img2img、Canny/Depth/OpenPose 预处理、Impact Pack 的 mask/SEGS/Detailer、Ultimate SD Upscale 分块放大、Alpha/洋红抠图和像素门禁 | 必须锁定目标模型，逐节点验证；不改变身份来源和审查契约 |
| **未证实** | OpenAI 直连端点在本环境的 gpt-image-2 具体参数；WisArt 编辑的 `quality`、transparent background、mask 实际生成效果；Anima 参考图/mask/ControlNet；Latent API 的参考图、LoRA、ControlNet；任意第三方“一键全能”模板对 Anima 的兼容 | 不得写入生产合同，不得以搜索摘要或节点名称宣称支持 |
| **不适配/禁止直接采用** | 把 Krea2 六 LoRA、Krea2 权重、Anima 权重互换；把 Latent text-only 结果当身份锁；使用未审第三方节点包替代现有生产基线；依靠提示词保证五指、五趾或物理接触 | 保持 Anima/Krea2/WisArt 分支隔离；失败回退现有已验证链 |

## 2. Image2（实际为 WisArt OpenAI-compatible `gpt-image-2`）适配工作流

### 2.1 已取证的项目实现

- provider 类型固定为 `wisart-openai-compatible`，模型固定 `gpt-image-2`：`tools/media/src/provider.ts:1-5,27-38`。
- 生成：`POST /v1/images/generations`，JSON 为 `model`、`prompt`、`size`；当前适配器不暴露 `quality`、`background`、`output_format`：`tools/media/src/provider-clients.ts:37-43`。
- 编辑：`POST /v1/images/edits`，`multipart/form-data`；当前实现发送 `model`、`prompt`、`image=input.png`、`size`：`tools/media/src/provider-clients.ts:46-53`。
- 响应只接受第一项 `data[0].url` 或 `data[0].b64_json`，并执行 HTTPS artifact URL / PNG-JPEG-WebP magic-byte 检查：`tools/media/src/provider-clients.ts:82-122`。
- 仓库内 WisArt 原始文档证据（`.../wisart-gpt-image-2-image-edit-workflow-evidence.md`，核验 2026-07-23）记录编辑最多 16 张，重复字段名必须是 `image` 而不是 `image[]`；编辑参数表不列 `quality`；`input_fidelity` 不发送；WisArt 文档称 `mask` 兼容接收但当前不参与生成。

### 2.2 建议的适配图形

```text
canonical RGBA + 当前角色必要参考
        │  （身份/几何角色输入）
        ├── image 1..N：官方角色/场景参考（仅声明的身份或场景作用）
        └── image N+1：用户画风板（始终最后；只作线密度/色板/材质/光影）
                │
       WisArt /v1/images/edits
       model=gpt-image-2, prompt, size=1024x1536
                │
      响应 b64/URL → 下载与 magic-byte 检查
                │
       本地洋红工作底 → 抠图 → alpha 清理
                │
       尺寸/边界/无文字/解剖/物理/画风审查
```

- 不把 `mask` 当作身份或解剖保证。需要局部修改时，必须先在本地生成同尺寸、含 alpha 的掩码并确认 provider 文档与 fixture 真正支持；在当前 WisArt 证据下，局部 mask 路线属于未证实。
- 不向当前 WisArt 编辑请求添加 `input_fidelity`、`quality`、`background: transparent` 或任意 OpenAI-only 字段。尤其透明 PNG 不能由上游文档推断为 WisArt 输出能力；当前项目做法是纯洋红工作底后本地严格抠图。
- 生产图尺寸在现有队列为 `1024x1536`，但任何具体尺寸仍必须以返回图的真实宽高验收；请求字段本身不是交付证据。

### 2.3 上游 OpenAI 与 provider 边界

OpenAI 官方开发者页面（见来源清单）搜索结果显示有 Image Edit、输入图、mask、`quality`、`size`、`background`、`output_format` 等字段；但本次对官方正文的抓取返回 `Forbidden`，故本报告将这些标为“待直连验证”，不把它们转化成 WisArt 合同。特别是官方 API 的 `image/images` 字段命名、GPT Image 模型版本和 transparent preview 可能随文档版本变化，必须在目标 endpoint 用脱敏 fixture 重新验证。

## 3. Anima / Latent API 适配工作流

### 3.1 Anima 的真实已证能力

官方 ComfyUI 页面标题为 **“Anima Base v1 ComfyUI workflow example”**。页面明确：Anima 是 CircleStone Labs / Comfy Org 的 2B text-to-image 模型，面向 anime 和 non-photorealistic illustration；使用原生 `UNETLoader`、`CLIPLoader`、`VAELoader`，Qwen-3 0.6B text encoder；**No input image needed / pure text-to-image**。官方页面给出模型文件：

- `models/diffusion_models/anima-base-v1.0.safetensors`
- `models/text_encoders/qwen_3_06b_base.safetensors`
- `models/vae/qwen_image_vae.safetensors`
- Preview 工作流另用 `anima-preview3-base.safetensors`

官方模板由 Subgraph 封装；本项目导出的模板（`staging/media/anima-krea2-research-pilot.workflow.json`）可见主链：`CLIPLoader → CLIPTextEncode(+/-) → KSampler → VAEDecode → SaveImage`，并包含 `EmptyLatentImage`；其序列化版本为 ComfyUI `0.3.40/0.3.65` 节点混合，不能假定在任意当前 ComfyUI 版本无迁移成本。官方文档提示缺节点通常需要更新 ComfyUI 或确认节点启动导入成功。

本地兼容研究文件 `content/media-production/anima-krea2-compatibility-research-v1.json:55-75` 另记录官方示例默认 `30 steps / CFG 4 / er_sde / simple`，并验证 Anima 与 Krea2 权重、LoRA 不可互换。该文件记录的 pilot 使用 `anima-aesthetic-v1.1`、Anima LoRA、20 steps，并非当前官方 Base v1 参数合同。

官方页面同时列出局限：无写实定位、复杂高分辨率文字较弱、base 风格较朴素。未看到官方正文证明 Anima 原生 `reference image`、`mask`、`ControlNet` 或 `IP-Adapter` 支持。

### 3.2 Latent.moe API 的真实已证能力

官方 **“API documentation · Latent”** 页面（访问日期 2026-09-04）明确：

- `POST /api/generate`，Bearer `lat_sk_...`，异步返回 job id；
- `prompt` 1–2000 字符；`negativePrompt` 0–2000；`seed`；
- `resolution`: `square`（1024×1024）、`portrait`（920×1536）、`landscape`（1536×920）；
- `steps`: 8–16；`sampler`: euler、euler_ancestral、dpmpp 系列、ddim；`scheduler`: beta、normal、simple、exponential；
- 结果为私有 artwork，随后用 `/api/media/{artworkId}` 读取；每账号单个 in-flight job，并有 weekly allowance、queue、worker 和 429/503 边界；
- 文档中的 NovelAI compatibility 也是协议映射，不是参考图/身份保真承诺。

项目 client 与该文档一致：`tools/media/src/latent-moe-client.ts:19-27,65-76,141-147`。client 只构造上述文本参数，且 `status()` 后在 `workersOnline < 1` 时拒绝提交：`tools/media/src/latent-moe-client.ts:59-72`。没有可验证的 source image、edit image、mask image、LoRA 或 ControlNet 请求字段；因此 Anima/Latent API 的参考图重绘结论为**未证实，不适配当前角色重绘主链**。

### 3.3 Anima 分支建议

```text
text prompt + negative prompt + fixed seed
        │
  官方 Anima Base/Preview 原生 ComfyUI
  UNET + Qwen text encoder + Qwen VAE
        │
  可选：低去噪解码后修整（必须另验模型兼容）
        │
  分块放大 / 局部 Detailer（外围，非 Anima 原生）
        │
  本地 alpha、尺寸、解剖、物理、画风门禁
```

Anima 适合固定 prompt/seed 的非 canonical 质量比较、画风探索和背景草稿；不应作为必须保留 Albina 身份、机械结构、左右眼、线缆方向的唯一角色生成器。若日后要接参考图或结构控制，应新增独立“Anima reference/control probe”合同，先以一张图和脱敏响应验证节点类型、权重版本、输入分辨率与回退策略；不得把通用 SD/Flux/Qwen workflow 的节点直接套用。

## 4. 推荐 ComfyUI workflow 架构（分层）

### 4.1 输入层

1. **身份/几何输入**：只放当前任务声明允许的官方角色图、已审核角色图或场景图；不混入无关角色。
2. **画风输入**：用户画风板必须是**最后一张输入**（现有合同的 `deidentified-image-last`），只允许影响线密度、平涂—克制绘影平衡、材质边缘、冷白/炭黑/金色/警示红、工业冷光。不得把它解释为身份、姿势或构图参考。
3. **canonical RGBA**：现有几何权威是 `588x1766`、未镜像源像素坐标；不能水平翻转、内缩生成、中心粘贴或未记录缩放。角色最终请求尺寸仍按现有生产合同 `1024x1536`，之后必须以像素证据验证。
4. **结构辅助图（可选）**：Canny/lineart、depth、OpenPose、分割 mask 只能在目标模型/节点明确兼容后使用；先预览控制图再排队。

### 4.2 主生成层

- **Image2/WisArt**：编辑 endpoint 为主，官方角色输入在前，画风板最后；当前只发送已证字段。透明交付走本地洋红抠图，不依赖远端透明声明。
- **Anima 本地**：官方 Base/Preview 原生 Subgraph 或展开后的 `UNETLoader → CLIPLoader → VAELoader → CLIPTextEncode → EmptyLatentImage → KSampler → VAEDecode`。固定 seed 的比较应固定模型文件、ComfyUI 版本、尺寸、prompt 和 sampler；不要接 Krea2 LoRA。
- **Latent.moe**：text-only 异步候选；调用前必须 dry-run/status，worker 为 0 时不提交，串行保持单 job；不要把其结果直接 promotion。

### 4.3 结构控制层

- ComfyUI 官方示例确认 ControlNet/T2I-Adapter 是通用条件控制图形，但控制图必须是与模型/ControlNet 对应的预处理图，`ControlNetApply` 不会自动把普通图变成 depth/Canny。官方示例还提供 Hires Fix、Img2Img、Inpainting、LoRA、Upscale 等独立工作流。
- `comfy_controlnet_preprocessors` 搜索结果指向的旧路径本次返回 GitHub 404，故不采用该路径作为已验证安装来源。预处理器仓库或替代仓库应重新核对 owner、默认分支、license、commit 和权重 SHA-256。
- `ComfyUI-Impact-Pack` 可作为可信候选：`Detailer (SEGS)`、`FaceDetailer`、`MASK to SEGS`、`Dilate/Blur Mask`、SAM/检测器等。其 README 页面最新提交可见 `429d015`（2026-04-19），并提示 V8.24 需要 ComfyUI ≥0.3.63、V8.0 后 `Impact-Subpack` 需另装；这些节点依然不是 Anima 原生能力。
- 对姿态/骨骼：OpenPose/Depth/Canny 适合外围约束姿势、轮廓和空间关系；不等于五指、关节、接触物理审查。对手脚必须保留人工 100% 检查。

### 4.4 增强层

- **两段低去噪 refine**：沿用项目既有高频 staging 思路，第一段保持 canonical latent/材质，第二段从第一段 decode 图像开始，只做低去噪细节；不得引入第二张无关身份参考。
- **分块放大**：`ssitu/ComfyUI_UltimateSDUpscale` README 明确它通过大图分块的 image-to-image diffusion 提高细节、降低硬件要求，并有 `example_workflows/`；仓库页面可见最新提交 2026-06-22。它需要对应的扩散模型/采样条件，不能直接作为 API 的“增强按钮”。控制 tile 的 denoise 应先小范围验证，避免 tile drift、接缝、身份漂移。
- **局部 Detailer**：Impact Pack 的 face/SEGS/Mask Detailer 适合作为候选修整；必须保留原图作为合成基底，记录 mask、bbox、seed、denoise 和模型版本；修复失败时回退原图，不以自动重试代替人工验收。
- **颜色/线稿保持**：优先使用低去噪、lineart/Canny/不透明度混合或局部 mask；不要将颜色/线稿保持误写成模型“保证”。
- **透明抠图**：所有角色图最后经过本地 alpha 恢复、洋红边缘清理、透明像素 RGB 污染检查；远端或第三方透明输出均需单独验证。

### 4.5 输出门禁层

必须同时满足：

- 真实宽高为 `1024x1536`，透明 PNG；全头到鞋、不裁切，头顶/鞋底/侧边锚点正确；
- 透明区域无洋红/色键 RGB 污染；无文本、logo、水印、伪 UI；
- **anatomy**：所有可见手五指可数、关节连续；脚趾/脚踝/承重体积自然；无额外/缺失/融合肢体；
- **physics**：重心、支撑面、握持、衣物/装甲/线缆/道具遮挡与接触合理；
- **identity**：Albina 左右眼结构、机械身体、Fascia、机械手、线缆方向和比例锚点保持；
- **style**：与用户基准画风板比较线密度、平涂—绘影、机械边缘、材质分离、工业冷光与色板；
- 通过现有 `character-redraw-review-contract-v1` 的全量证据规则：原图 100% 审核、手脚/道具 crop、基准板对照、像素交付记录。自动视觉只能 advisory，不能独立 approval。

## 5. 对 Albina 角色重绘的具体接入方式

1. **主路径仍是现有 Image2/WisArt reference-edit**：保留透明 PNG 的本地后处理，不改冻结输入顺序或 hash。用户画风板在每次允许的多图请求中最后进入；前面的官方 Albina 参考只承担 Albina 身份、机械结构和必要服装/姿势作用。
2. **Anima 仅做隔离候选**：若用于角色探索，只能从 text-only 或本地原生 Anima workflow 开始；记录模型文件 SHA、ComfyUI 版本、prompt、negative、seed、尺寸和采样参数。输出先进入 `_discarded`/staging 级别，不能覆盖 canonical RGBA，也不能替换 Image2 角色交付。
3. **结构控制不可跳过契约**：即使未来 Anima 节点接受 Canny/Depth/OpenPose，也只能控制轮廓/姿势/空间关系。Albina anatomy/physics/identity/style/delivery 仍必须由现有审查契约逐项通过。
4. **保持用户画风板最后输入**：任何外围 refiner 或 ComfyUI 合成图都应在“角色/几何来源 → 主生成 → 结构控制 → 局部增强”后，将画风板作为最后视觉样式来源；若某节点只接受一个参考图，则不能用第二张无记录图片替代，必须回退到文字风格约束或另立 probe。
5. **冻结边界**：本报告不授权改写已有 67-job/22-Latent 计划，不授权新增参考图，不授权批量生成，不授权 promotion/release。任何实际试验应单图 staging、固定 seed、完整 receipt、原分辨率人工审查后再决定。

## 6. 风险、费用、版权与失败恢复

- **接口漂移**：OpenAI 上游与 WisArt 兼容层字段不一定相同；仅当目标端点的脱敏 HTTP fixture 覆盖字段、状态码、响应媒体、尺寸和 alpha 后才升级为已证合同。
- **费用与队列**：gpt-image-2 输入图按图像 token/请求计费的上游说明不能自动套到 WisArt 账单；Latent 有独立 weekly allowance，断开轮询不等于取消，worker 为 0 仍可能排队。所有实际调用前需明确授权和成本预算；本次没有调用。
- **失败恢复**：保存原始 canonical 与每一步 hash；请求失败只重试同一授权 job，不改变 prompt/参考顺序；ComfyUI OOM、缺节点、tile drift、mask 黑块或 alpha 污染时回退到上一个已审 staging anchor。禁止用 `--no-verify`、删除锁文件或跳过 review 解决失败。
- **版本/依赖**：官方 Anima 模板要求较新 ComfyUI；第三方 Impact/Ultimate 节点与旧 workflow 可能有 API、节点类型、依赖和模型目录变化。先在隔离 ComfyUI 复制环境加载模板并检查 missing nodes，再考虑候选 probe。
- **版权/许可证**：Anima 项目文件及衍生 LoRA 的许可必须以 Hugging Face 当前 license 为准；本项目既有研究记录为 CircleStone Labs non-commercial license，不能把本地输出或 LoRA 用于未获授权的商业/训练用途。第三方节点、ControlNet、upscale 和检测模型分别核对 license、再分发限制和下载来源；保留来源 URL、commit、SHA-256。
- **隐私/上传**：角色源图、用户画风板、API key 和远端 artifact URL 不能写入公开 workflow、日志、fixture 或报告；WisArt/Latent 上传前必须确认授权范围。报告只记录能力和本地路径，不包含密钥。
- **内容质量**：提示词中的“五指”“可审查”等不是保证。局部修复可能生成额外指、融合关节、浮空道具、衣物穿插和身份漂移；必须在人审中拒绝并回退。

## 7. 来源清单（检索日期 2026-09-04）

### 官方 / 一手

1. **ComfyUI — Anima Base v1 ComfyUI workflow example**，页面标题同上；访问日期 2026-09-04。明确 Anima 2B、anime/non-photorealistic、原生 UNET/CLIP/VAE、纯 text-to-image、模型目录、Base/Preview 模板和局限。  
   URL: https://docs.comfy.org/tutorials/image/anima/anima
2. **ComfyUI Examples**，页面标题 `ComfyUI Examples`；页面未提供可确认的仓库更新时间。列出 Hires Fix/2-pass Txt2Img、Img2Img、Inpainting、LoRA、Upscale、ControlNets/T2I-Adapter，并说明示例图包含 workflow metadata 可拖入加载。  
   URL: https://comfyanonymous.github.io/ComfyUI_examples/
3. **Comfy-Org official Anima Base workflow JSON**，模板名称 `Text to Image (Anima Base v1.0)`；本次读取 JSON，未执行下载/生成。可见 `UNETLoader`、`CLIPLoader`、`VAELoader`、`CLIPTextEncode`、`EmptyLatentImage`、`KSampler`、`VAEDecode`、`SaveImage`，默认主分支约 30 steps/CFG 4，含可选 Turbo 分支；模板版本信息随 ComfyUI 变化，需现场复核。  
   URL: https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_anima_base_v1.json
4. **Latent — API documentation**，页面标题 `API documentation · Latent`；访问日期 2026-09-04。明确认证、`/api/generate` 异步参数、resolution/steps/sampler/scheduler、私有结果、队列/额度和 worker 行为；未定义 source image/mask/LoRA/ControlNet 字段。  
   URL: https://latent.moe/docs/api
5. **OpenAI — Image generation API**，页面标题 `Image generation | OpenAI API`；搜索索引检索日期 2026-09-04。搜索结果指向编辑、输入图、mask、quality、size、background、output_format 等；本次正文抓取返回 `Forbidden`，故本报告将上游参数全部视为待直连验证，不宣称已与 WisArt 兼容。  
   URL: https://developers.openai.com/api/docs/guides/image-generation
6. **OpenAI — Create image edit API reference**，页面标题 `Create image edit`；搜索索引检索日期 2026-09-04。搜索结果列出 model/image(s)/mask/quality/size/output_format 等字段；本次官方正文抓取返回 `Forbidden`，不能替代实际 fixture。  
   URL: https://developers.openai.com/api/reference/resources/images/methods/edit

### GitHub 原仓库 / 可复用外围节点

7. **`comfyanonymous/ComfyUI_examples`**，上游示例仓库；用于 workflow metadata 与通用图形分类，不代表目标模型兼容。  
   URL: https://github.com/comfyanonymous/ComfyUI_examples
8. **`ltdrdata/ComfyUI-Impact-Pack`**，标题 `ComfyUI-Impact-Pack`；页面可见最新提交 `429d015`，2026-04-19。提供 Detailer/FaceDetailer、SEGS、Mask、SAM/检测器等；README 另有 ComfyUI ≥0.3.63、Impact-Subpack 分离安装等版本边界。  
   URL: https://github.com/ltdrdata/ComfyUI-Impact-Pack
9. **`ssitu/ComfyUI_UltimateSDUpscale`**，标题 `ComfyUI nodes for the Ultimate Stable Diffusion Upscale script`；页面可见节点变更提交 2026-06-22。说明大图分块 image-to-image diffusion、安装方式、`example_workflows/`；它依赖可兼容的扩散模型与参数，不能直接增强远端 API。  
   URL: https://github.com/ssitu/ComfyUI_UltimateSDUpscale
10. **ComfyUI ControlNet 使用说明（镜像/二次整理，非目标模型证明）**；说明 ControlNet/T2I-Adapter 需要对应预处理图，普通图不会自动转换。由于本次检索到的原 `Fannovel16/comfyui_controlnet_preprocessors` URL 返回 404，未把它列为可安装已证来源。  
    URL: https://github.com/Ericsunsk/comfyui-skill/blob/main/references/docs/tutorials/controlnet/controlnet.md
11. **`jjdejong/ComfyUI-Hand-Fixing`**，社区 workflow 集合；搜索结果声称 Hand Fix → Face Enhance → Ultimate SD Upscale、ControlNet Tile、Impact Pack 等，但这些是社区经验，不是 Anima 或 Image2 兼容证明。本报告仅作为 anatomy/增强形状参考，不采用其参数作为项目合同。  
    URL: https://github.com/jjdejong/ComfyUI-Hand-Fixing

### 项目内一手记录

12. `tools/media/src/provider-clients.ts:15-123`：WisArt/Hhhl provider 实现与字段边界。
13. `tools/media/src/latent-moe-client.ts:19-147`：Latent API 请求字段、worker 检查、8–16 steps、单任务锁和媒体抓取。
14. `.codex/tasks/20260723-122957-albina-final-card-cdn-media-and-release-completion/wisart-gpt-image-2-image-edit-workflow-evidence.md`：WisArt 编辑多图、字段顺序、mask/input_fidelity/quality 边界；核验 2026-07-23。
15. `content/media-production/anima-krea2-compatibility-research-v1.json:55-108`：本地 Anima 模型、Qwen encoder/VAE、LoRA 隔离、官方示例参数和 pilot 记录；研究日期 2026-08-30。
16. `content/media-production/character-redraw-review-contract-v1.json:5-83`：用户画风板最后输入、anatomy/physics/identity/style/delivery 审查及证据规则。
17. `content/media-production/krea2-canonical-production-contract-v1.json:17-91`：canonical RGBA、模型画布、alpha 恢复、六 LoRA 隔离、双阶段低去噪 staging 和禁止项。

## 最终建议

现阶段只把 **WisArt 已核验的 gpt-image-2 编辑链**作为 Image2 角色重绘主路径；把 **Anima 原生 ComfyUI text-to-image + Latent text-only API**视为隔离探索/非 canonical 候选；把 ControlNet、Impact Detailer、Ultimate SD Upscale、抠图和 alpha 检查视为需要逐节点、逐模型验证的外围增强。任何 API 能力若没有实际文档或脱敏请求/响应 fixture，都不得宣称支持；任何候选输出在 anatomy/physics/identity/style/delivery 审查完成前都不得 promotion 或 release。
