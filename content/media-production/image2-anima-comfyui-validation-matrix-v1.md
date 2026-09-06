# Image2 / Anima / ComfyUI 增强工作流验证矩阵 v1

- **核验日期**：2026-09-05（Asia/Shanghai）
- **项目根**：`D:/创作/albina-v2-complete`
- **执行边界**：仅联网与本地文件研究、结构和兼容性核验；未生成图片、未上传、未付费调用。
- **目标**：为 WisArt Image2 edit、Latent/Anima text-only、本地 ComfyUI 原生 workflow 及外围增强建立逐项可复核的证据、输入输出契约、版本/模型边界、许可风险和回退规则。
- **重要环境事实**：本次 shell 中未找到 `comfy` CLI（`command -v comfy` 无输出），因此**未完成 comfy CLI/runtime discovery**。`.verification/comfyui-8199.*.log` 仅作为历史启动日志证据，不能替代本次现场 discovery。

## 1. 结论分级

| 等级 | 含义 | 当前可用边界 |
|---|---|---|
| **已证实** | 官方正文、项目实现/fixture 或本地结构检查明确支持 | 可建立 staging probe；仍须遵守人工审查和费用/授权门禁 |
| **有条件候选** | 节点或外围仓库公开了通用形状，但目标模型/版本/权重尚未实测 | 只能隔离单图 probe，不得写入生产合同或批量队列 |
| **未证实** | 仅有搜索摘要、节点名称、通用经验或上游能力推断 | 不得宣称支持；须先建立脱敏 fixture/单图验证 |
| **禁止直接采用** | 已知字段、模型、LoRA、许可或身份边界不匹配 | 不得接入 Albina 主链；失败回退已验证基线 |

## 2. 总矩阵

| 分支/组件 | 官方或一手来源 | 节点、模型、版本证据 | 输入契约 | 输出契约 | 已证实 | 未证实 | 禁止直接采用 | 许可证/权益风险 | 当前判定 |
|---|---|---|---|---|---|---|---|---|---|
| **WisArt Image2 edit** | WisArt API 文档 bundle；项目证据 `.codex/tasks/20260723-122957-albina-final-card-cdn-media-and-release-completion/wisart-gpt-image-2-image-edit-workflow-evidence.md` | `tools/media/src/provider-clients.ts:25-71`；provider=`wisart-openai-compatible`，model=`gpt-image-2` | `POST https://wisart.kuaileshifu.com/v1/images/edits`（`joinApiUrl` 会消除默认 base 与 versioned path 的重复 `/v1`）；`multipart/form-data`；字段 `model`、`prompt`、`size`、重复 `image`；WisArt 文档最多 16 图；当前代码发送单图 | JSON `data[0].url` 或 `data[0].b64_json`；当前代码只接受第一项并做 HTTPS artifact URL / PNG-JPEG-WebP magic-byte 校验；真实尺寸必须另验 | WisArt 编辑传输形状、重复 `image` 字段、Bearer key、URL/base64 响应形状、当前代码的媒体魔数检查 | 多图运行时、实际 size 归一化、`quality`、`mask` 生成效果、透明输出、上游 OpenAI 字段在 WisArt 的兼容性；代码默认路径是否与目标 endpoint 正确拼接 | 发送 `image[]`；发送未在 WisArt 编辑表确认的 `input_fidelity`、`quality`、`background`、`output_format`；把 mask 当身份/解剖保证；把用户画风板作为身份图 | WisArt 服务条款、输入图授权和账单需单独确认；不能把 OpenAI 上游参数或价格转嫁到 WisArt；不得把 key、原图 URL 写入报告 | **主路径候选，须 fixture 门禁** |
| **WisArt Image2 generation** | 同上；项目实现 `provider-clients.ts:37-44` | JSON `POST .../images/generations`；model/prompt/size | JSON `model`、`prompt`、`size`；当前不发送 quality/background/output_format | 同 WisArt `imageArtifact`：URL/base64 第一项及媒体魔数 | 代码 JSON 传输与响应解析；文档列出 model | `quality` 在 generation 的实际可用值、透明背景、输出格式、尺寸归一化 | 用 generation 代替角色 reference-edit；将返回 HTTP 200 当作身份/人体/透明交付证明 | 同 WisArt 服务/授权/费用风险 | **仅作 text-only 或 fixture probe** |
| **Latent `/api/generate`** | 官方 `https://latent.moe/docs/api`；项目 `tools/media/src/latent-moe-client.ts:19-147` | 远端服务；异步 job，不是 Anima 模型 API | Bearer `lat_sk_...`；JSON `prompt` 1-2000、`negativePrompt` 0-2000、`seed`、`resolution`=`square/portrait/landscape`、`steps`=8-16、sampler、scheduler；单账号一个 in-flight；先 status | 202 job id；轮询 `/api/generate/{id}`；成功后 `/api/media/{artworkId}` 私有媒体；PNG/JPEG/WebP magic-byte 与 SHA-256 | 文本参数、异步/轮询、worker 检查、单任务锁、额度/409/429/503 边界；client dry-run 默认不执行 | source image、edit image、mask、LoRA、ControlNet、身份保真、CFG/多角色、实际底模 | 把 Latent 结果当 Albina 身份锁或 reference-edit；把 NovelAI protocol compatibility 当 fidelity；worker=0 时提交；断开轮询当作取消 | 周额度、私有媒体、key/原图授权与服务条款；实际调用需显式预算；不要上传未授权角色源图 | **隔离 text-only 候选** |
| **Anima Base v1 原生 ComfyUI** | ComfyUI 官方 `https://docs.comfy.org/tutorials/image/anima/anima`；官方 template raw JSON `https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_anima_base_v1.json` | 官方模型：`anima-base-v1.0.safetensors`；`qwen_3_06b_base.safetensors`；`qwen_image_vae.safetensors`；原生 `UNETLoader`、`CLIPLoader`、`VAELoader`；官方要求更新 ComfyUI，缺节点可能因版本/导入失败 | 纯 text prompt；`EmptyLatentImage` 尺寸；正/负 conditioning；固定 seed、steps、CFG、sampler、scheduler；**不需要输入图** | ComfyUI `IMAGE` → `SaveImage`；本地 PNG，尺寸由 EmptyLatentImage 决定；需另做 alpha/尺寸/人体/身份/画风门禁 | 2B anime/non-photorealistic text-to-image；原生节点与模型目录；官方示例默认约 30 steps、CFG 4；官方明确无 input image | reference image、mask、ControlNet、IP-Adapter、Albina 身份保真、透明 PNG、写实/复杂文字；任意当前版本无迁移成本 | 直接接 Krea2 六 LoRA、Krea2 checkpoint、SD/Flux ControlNet 或把纯文生图结果覆盖 canonical；把 prompt 中“五指”当保证 | CircleStone Labs / Anima 本地研究记录为 non-commercial license；HF 当前条款为准；不得用于未获授权商业/训练用途；模型和 LoRA 分别核对 | **隔离本地候选** |
| **Anima Preview workflow** | 同一 ComfyUI 官方页面与 template | `anima-preview3-base.safetensors` 替代 Base diffusion model；仍用 Qwen encoder/VAE 和原生节点 | 同 Base，text-only；Preview workflow 参数/节点版本需现场载入核验 | 同 Base，IMAGE/SaveImage | 官方页面确认 Preview 是早期访问 text-to-image workflow；模型目录确认 | Preview 与 Base 的输出差异、版本/节点迁移、任何 image-conditioning | 将 Preview 当生产基准或与 Base 混合权重/LoRA；未固定版本、seed、尺寸即比较质量 | 同 Anima non-commercial/模型条款 | **研究对照候选** |
| **本地 pilot workflow** | 本地 `staging/media/anima-krea2-research-pilot.workflow.json`；研究 JSON `content/media-production/anima-krea2-compatibility-research-v1.json` | workflow `version=0.4`，11 nodes/11 links/3 groups；Comfy core `KSampler ver=0.3.40`、`CLIPTextEncode ver=0.3.65`、`UNET/CLIPLoader ver=0.11.0`、`LoraLoaderModelOnly ver=0.12.3`；含 `DyPE_FLUX` commit `7dbea3...`；pilot 使用 `anima-aesthetic-v1.1` + `anima-research/fymrie1500.safetensors`，20 steps，1704x2304 | 正/负 prompt + EmptyLatent；Anima diffusion + Qwen encoder/VAE；Anima LoRA；DyPE_FLUX；无 LoadImage/Mask/ControlNet | 结构 JSON 可解析，节点/链接 id 无重复、断链为 0；历史研究记录声称一次 pilot 执行成功（非本次执行）；尺寸由 primitive 驱动 | 当前 ComfyUI 现场加载、缺节点、依赖版本、DyPE 对 Anima 适配、LoRA 实际许可/商用、固定尺寸对照 | 将该研究 pilot 的 `aesthetic-v1.1`、DyPE、20 steps、1704x2304 当官方 Base v1 合同；把历史 promptId/output 当本次 runtime 证明 | LoRA 路径来自本地 Downloads；研究记录声明 Anima/CircleStone non-commercial；须核验 LoRA 原始授权和再分发边界 | **结构已核验，runtime 仅历史证据** |
| **Hires Fix / 2-pass** | ComfyUI Examples `https://comfyanonymous.github.io/ComfyUI_examples/` | 官方示例分类；具体节点/模型取决于目标 workflow | 第一 pass latent/image；第二 pass 通常 decode 后低 denoise refine；必须固定 checkpoint、VAE、seed、尺寸和 denoise | IMAGE/latent；输出尺寸与 alpha 需像素检查 | 作为通用 ComfyUI workflow 形状存在 | Anima 是否可用 Hires/低 denoise、模型空间尺寸、身份/线稿保持、alpha 行为 | 直接把 Hires 当 Image2 API 增强按钮；不验证 latent 接线、denoise、tile drift 就 promotion | ComfyUI 示例本身不授予模型/权重许可；扩散模型、节点、LoRA 各自核验 | **有条件外围候选** |
| **Img2Img / Inpaint** | ComfyUI Examples；项目既有 Krea2 workflow/审查契约 | 常见 `LoadImage → VAEEncode/Mask → KSampler` 或 inpaint 专用节点；目标 Anima 节点兼容未证实 | 输入图必须有来源/角色作用记录；同尺寸 mask；denoise、seed、model/VAE 固定 | IMAGE；mask 区域合成可能有边缘/身份漂移，需保留原图回退 | 对 Krea2/通用 ComfyUI 形状可作研究参考；本项目审查要求记录 mask/bbox/seed/denoise | Anima 原生 image conditioning、mask 语义、Qwen VAE 的 inpaint 行为；WisArt mask 实际生成效果 | 把通用 SD/SDXL inpaint 节点直接套 Anima；用 mask 替代人工身份/解剖审查；覆盖原图 | 模型/节点许可分离核验；用户源图上传/处理须授权 | **禁止直接套用，需独立 probe** |
| **ControlNet / T2I-Adapter** | ComfyUI Examples；控制图语义由官方示例分类支持 | 常见 ControlNetApply/T2I-Adapter；本机历史日志显示 `comfyui_controlnet_aux` 与 `comfyui-krea2-controlnet`，不等于 Anima 兼容 | 与目标 checkpoint/ControlNet 配对的 Canny/Depth/OpenPose/lineart 控制图；预处理器输出须先预览；记录权重 SHA | conditioning/IMAGE → sampler；只能约束轮廓、姿势、空间关系 | 通用控制图形和本机 Krea2 周边曾加载；控制图不由 Apply 节点自动生成 | Anima 原生 ControlNet/IP-Adapter、目标权重、预处理器版本、结构保持效果；旧 `comfy_controlnet_preprocessors` 路径本次 404 | SD1.5/SDXL/Flux ControlNet 直接接 Anima；把 OpenPose 当五指/物理保证；采用未核对仓库/commit/license 的预处理器 | ControlNet/预处理模型及自定义节点分开核对；权重来源、SHA、商业再分发限制未知时不得发布 | **有条件外围候选，Anima 暂禁接入** |
| **Impact Pack Detailer / SEGS / Mask** | `https://github.com/ltdrdata/ComfyUI-Impact-Pack` 及 `LICENSE.txt` | README：V8.24 需 ComfyUI ≥0.3.63；V8.0 后 `Impact-Subpack` 另装；本机历史日志：Impact Pack V8.22、Subpack V1.3.5；节点包括 Detailer/FaceDetailer、MASK to SEGS、MaskPainter、Dilate/Blur | IMAGE + detector/SEGS/mask + model/clip/vae + denoise/seed；局部 bbox/Mask 必须可复核 | 局部 IMAGE/SEGS/mask；`SEGSDetailer` 不直接粘回原图，需 `SEGSPaste` 或显式合成；失败回退原图 | 节点能力、版本依赖、局部合成形状；README 明确 Subpack 分拆和额外依赖 | Anima checkpoint/CLIP/VAE 与 Detailer 完整兼容；检测模型、face/hand detector、SAM2 质量；对 Albina 身份和接触物理的实际改善 | 直接对 Anima 接入未经权重验证的检测器/Detailer；自动 retry 替代人工 review；把面部/手部修复当质量保证 | Impact Pack GPLv3；对外分发修改/二进制需保留许可、提供对应源代码、GPLv3 义务；模型/检测器许可另算 | **候选外围，先做单区域 probe** |
| **UltimateSDUpscale** | `https://github.com/ssitu/ComfyUI_UltimateSDUpscale`；仓库 LICENSE 为 GPLv3 | README：ComfyUI custom node；分块 image-to-image diffusion；本地历史日志加载该节点；仓库可见 2026-06-22 变更，但不得视为锁定 commit | 大图 IMAGE + 可兼容 diffusion model + sampler/denoise + tile/seam/ControlNet 可选参数 | 分块重绘后的 IMAGE；可能有 tile drift、接缝、身份/线稿变化；需原图 hash 和像素比较 | 分块 I2I 机制、减少显存、example workflows、安装方式 | Anima 模型空间/ControlNet hints、tile 参数、边缘和透明 alpha 保持、Albina identity fidelity | 直接把远端 API 输出送入节点而不落地/验 MIME；不锁定 tile/denoise 就 promotion；以放大分辨率替代内容审查 | GPLv3 强 copyleft：发布修改版需 GPLv3、标修改、提供源码、保留声明；模型/外部 submodule 许可另算 | **有条件外围候选** |
| **本地 alpha/抠图/交付门禁** | 项目 `character-redraw-review-contract-v1.json`；研究报告 §4.5 | 非 ComfyUI 模型能力；当前生产约束 | 输入 PNG/IMAGE；目标 `1024x1536`；洋红工作底或透明源；记录原始和每步 hash | 透明 PNG；真实宽高、alpha RGB 污染、边界与裁切证据 | 尺寸、透明、无文字/logo/watermark、anatomy/physics/identity/style/delivery 审查规则 | 任意远端透明声明、第三方自动抠图、自动审查独立 approval | 依赖提示词保证五指/五趾；远端透明字段未 fixture 即使用；缺人审证据就 promotion | 项目源图和用户画风板授权；不要公开源图、key、artifact URL；第三方抠图模型另核许可 | **强制输出门禁** |

## 3. 逐分支验证合同

### 3.1 WisArt Image2 edit（主路径，但未完成现场 fixture）

**已核对输入/输出**

- `WisArtImageClient.editImage()` 接收 `{ model: 'gpt-image-2', prompt, image: Uint8Array, width, height }`，构造 `FormData` 字段 `model`、`prompt`、单个 `image`、`size`（`tools/media/src/provider-clients.ts:46-53`）。
- 响应只消费 `data[0]`，优先 `url`，否则 `b64_json`；URL 必须 HTTPS，二进制只接受 PNG/JPEG/WebP magic bytes（`tools/media/src/provider-clients.ts:82-122`）。
- WisArt 一手证据允许多图时重复字段名 `image`，上限 16；不要发送 `image[]`。当前 client 的单图方法不能宣称已验证多图 runtime。
- 当前代码默认 `baseUrl='https://wisart.kuaileshifu.com/v1'`，调用路径写为 `/v1/images/edits`。在任何实际调用前，必须用不含密钥的 URL-join 单元 fixture 确认不会形成错误的 `/v1/v1` 路径；这只是代码合同核验，不授权联网生成。

**验证项**

| Probe | 只验证什么 | 通过证据 | 失败回退 |
|---|---|---|---|
| E1 脱敏 URL/headers | endpoint 拼接、Bearer header、无 key 泄漏 | fetch mock 捕获 URL/headers/body；不得真实请求 | 保持当前 adapter，不排队 |
| E2 单图 multipart | 字段名、文件名、size 字符串、content type | fixture 检查 `image` 存在且 `image[]` 不存在 | 回退已验证 WisArt request contract |
| E3 多图顺序 | 角色源图前、样式板不作为图像身份输入；最多 16 图 | 脱敏 multipart fixture 记录每个 `image` 的顺序/sha/角色 | 只使用现有单图合同，禁止追加未记录图 |
| E4 响应媒体 | `url`/`b64_json`、magic bytes、mime | 本地 fixture 分别覆盖 PNG/JPEG/WebP、非法 bytes、空 data | 标记 provider error，不重试变更字段 |
| E5 尺寸/alpha | 请求 `size` 不是交付证明 | 脱敏响应图真实宽高和 alpha 检查 | staging reject，不 promotion |
| E6 mask/quality/透明 | 仅确认 WisArt 端是否支持，不默认采用 | 目标端点官方正文或脱敏响应明确支持，且单图 staging 人审 | 当前合同继续省略字段，使用本地洋红抠图 |

**禁止项**：不把 OpenAI 直连文档字段自动转给 WisArt；不把 `mask`、`input_fidelity`、`quality`、`background` 或 `output_format` 作为当前生产字段；不将用户画风板或其衍生图作为身份参考图。

### 3.2 Latent API 与 Anima text-only

Latent API 和本地 Anima 不是同一能力：Latent 是远端异步服务，Anima 是本地 ComfyUI 模型分支。两者都只能在当前证据下做 text-only 候选。

**Latent dry-run 合同**

- 调用 `generate(input, { execute: false })` 只返回规范化 request；不得提交。
- 若获授权执行，必须先 `status()`，`workersOnline >= 1`，保持单账号单任务；记录 job id、状态、参数、响应媒体 hash。
- `resolution=portrait` 实际是 `920x1536`，不是项目角色交付的 `1024x1536`；结果必须重新栅格化/审查，不得当作交付尺寸。
- `negativePrompt` 没有站点默认值；`steps` 只允许 8-16；CFG、多角色 characterPrompts、source image、mask、LoRA、ControlNet 不在当前 client/API 合同中。

**Anima 本地合同**

- Base v1 模型文件及目录：`models/diffusion_models/anima-base-v1.0.safetensors`、`models/text_encoders/qwen_3_06b_base.safetensors`、`models/vae/qwen_image_vae.safetensors`。
- Preview 使用 `anima-preview3-base.safetensors` 替代 diffusion model；Base 与 Preview 必须分开记录。
- 固定比较必须锁定：ComfyUI commit/version、workflow JSON SHA、模型文件 SHA、encoder/VAE SHA、LoRA SHA（若有）、prompt/negative、seed、尺寸、steps、CFG、sampler、scheduler、GPU/精度。
- 官方页面要求更新 ComfyUI；模板缺节点可能是 ComfyUI 过旧或 custom node 启动导入失败。由于本次 `comfy` CLI 缺失，不得写“当前 runtime 已发现”。

### 3.3 本地 pilot workflow 结构核验

对 `staging/media/anima-krea2-research-pilot.workflow.json` 的只读结构检查结果：

```text
JSON 可解析：是
workflow version：0.4
nodes：11
links：11
groups：3
重复 node id：0
重复 link id：0
断链（源/目标节点不存在）：0
SHA-256：ddc147344be7979796163e832fef536f4587cb0a1f4a9ebfe49362f3b5d37b80
字节数：32792
```

拓扑为：`UNETLoader → LoraLoaderModelOnly → DyPE_FLUX → KSampler → VAEDecode → SaveImage`，另有 `CLIPLoader → CLIPTextEncode(+/-) → KSampler`、`VAELoader → VAEDecode`、`EmptyLatentImage → KSampler`。没有 `LoadImage`、`VAEEncode`、`ControlNetApply`、`Inpaint` 或 `Mask` 节点，因此当前 pilot 不是 image-to-image/inpaint workflow。

其研究记录中的运行输出为 `1704x2304`，使用 `anima-aesthetic-v1.1`、Anima LoRA、20 steps；这是历史 pilot 证据，不是官方 Base v1 合同，也不是本次运行结果。官方 Base 示例约 30 steps/CFG 4；两者必须分开标识。

## 4. 共同输出门禁与记录字段

任何候选输出在 promotion 前必须有：

1. 原图、完整图 100% 查看记录；手脚、道具/接触/遮挡 crop（可见时）。
2. 真实宽高；透明 PNG；无裁切；透明像素无洋红/色键 RGB 污染。
3. 无文本、logo、水印、伪 UI、条码；无外部角色/风格板泄漏。
4. `anatomy`：可见手五指可数、关节连续；足部/脚趾/踝和承重自然；无额外、缺失、融合肢体。
5. `physics`：重心、支撑、握持、线缆/装甲/衣物/道具遮挡和接触合理。
6. `identity`：Albina 左右眼/机械身体/Fascia/机械手/线缆方向/比例锚点保持；canonical/AU 边界不漂移。
7. `style`：基准板的线密度、平涂—克制绘影、机械边缘、色板与工业冷光一致。
8. receipt 至少记录：分支、workflow SHA、节点/模型/LoRA 名称与 SHA、ComfyUI 版本/commit、输入 role/sha、prompt hash、negative hash、seed、尺寸、steps、CFG、sampler、scheduler、denoise、mask/bbox、输出 SHA、人工 review 结果。

自动视觉或 Detailer 只能 advisory；缺任一证据、出现 critical failure 或结构未知时，判定 reject 并回退上一个 staging anchor。

## 5. 许可与权益核验清单

| 对象 | 当前证据 | 处理规则 |
|---|---|---|
| Anima diffusion/encoder/VAE | 项目研究记录声明 `circlestone-labs-non-commercial-license`；HF 页面是控制来源 | 在任何商业或公开再分发前重新读取当前 HF license；记录文件 URL、版本、SHA；non-commercial 未解除前不得用于商业交付 |
| `fymrie1500.safetensors` Anima LoRA | 项目记录本地 SHA `6F9D...C13E9`、baseModel=`anima`；原始授权未在本矩阵中重新核验 | 仅 Anima 分支；禁止接 Krea2；公开/商业使用前取得 LoRA 作者和底模授权 |
| ComfyUI-Impact-Pack | 官方仓库 `LICENSE.txt` 为 GPLv3 | 若对外分发修改版/二进制，须 GPLv3、保留声明、标记修改、提供对应源码；节点许可不等于 detector/model 许可 |
| ComfyUI_UltimateSDUpscale | 官方仓库 `LICENSE` 为 GPLv3 | 同 Impact Pack；外部 submodule、扩散模型、ControlNet 另核验；不得因节点 GPL 推断输出或模型可商用 |
| ControlNet/预处理器/检测器/SAM | 每个仓库和权重独立许可；旧 `comfy_controlnet_preprocessors` URL 本次 404 | 重新核对 owner、默认分支、commit、license、权重 SHA；无证据不安装/不发布 |
| WisArt/Latent 服务 | 服务条款、额度和输入授权属于服务边界 | 实际调用前显式授权、预算和隐私确认；key、原图、artifact URL 不写入公开 workflow/报告 |

## 6. 推荐试验顺序与回退

1. **先做离线结构/fixture**：WisArt URL/body/response fixture；Latent dry-run；Anima workflow parse/hash；ComfyUI object-info/版本记录。
2. **再做单图 staging probe（需另行授权）**：固定 seed、固定 prompt、单一变量；不覆盖 canonical，不批量，不上传无授权源图。
3. **外围一次只加一项**：先低 denoise Img2Img/Hires，再独立 Inpaint/Mask，再独立 ControlNet，再 Detailer，再 UltimateSDUpscale；每步保留基底和 hash。
4. **任何失败均回退**：缺节点、OOM、tile drift、mask 黑块、alpha 污染、身份漂移、人体/物理失败时，回退上一个已审 staging anchor；不改变 prompt/参考顺序来盲重试。
5. **promotion 条件**：只有完整 receipt + 原分辨率人工 review + `character-redraw-review-contract-v1` 全项通过，才可讨论 promotion；本矩阵本身不授权生成或发布。

## 7. 来源清单

### 官方 / 一手来源

1. ComfyUI Anima：`https://docs.comfy.org/tutorials/image/anima/anima`
2. Comfy-Org Anima Base workflow：`https://raw.githubusercontent.com/Comfy-Org/workflow_templates/main/templates/image_anima_base_v1.json`
3. ComfyUI Examples：`https://comfyanonymous.github.io/ComfyUI_examples/`
4. Latent API documentation：`https://latent.moe/docs/api`
5. Impact Pack README：`https://github.com/ltdrdata/ComfyUI-Impact-Pack`
6. Impact Pack license：`https://raw.githubusercontent.com/ltdrdata/ComfyUI-Impact-Pack/Main/LICENSE.txt`
7. UltimateSDUpscale README：`https://github.com/ssitu/ComfyUI_UltimateSDUpscale`
8. UltimateSDUpscale license：`https://raw.githubusercontent.com/ssitu/ComfyUI_UltimateSDUpscale/main/LICENSE`
9. OpenAI image guide（上游能力仅待直连验证，不能转嫁 WisArt）：`https://developers.openai.com/api/docs/guides/image-generation`
10. OpenAI image edit reference（同上）：`https://developers.openai.com/api/reference/resources/images/methods/edit`

### 项目内一手来源

- `tools/media/src/provider-clients.ts:25-122`
- `tools/media/src/latent-moe-client.ts:19-153`
- `.codex/tasks/20260723-122957-albina-final-card-cdn-media-and-release-completion/wisart-gpt-image-2-image-edit-workflow-evidence.md`
- `content/media-production/anima-krea2-compatibility-research-v1.json`
- `content/media-production/character-redraw-review-contract-v1.json`
- `content/media-production/krea2-img2img-baseline-v1.json`
- `staging/media/anima-krea2-research-pilot.workflow.json`
- `.verification/comfyui-8199.stdout.log`、`.verification/comfyui-8199.stderr.log`（历史日志，只读证据）

## 最终判定

当前只可把 **WisArt `gpt-image-2` edit（经过脱敏 HTTP fixture 门禁）**视为 Image2 角色重绘主路径；把 **Anima 原生 ComfyUI Base/Preview** 和 **Latent text-only** 保持为隔离探索；把 Hires/Img2Img/Inpaint/ControlNet/Impact Detailer/UltimateSDUpscale 视为逐节点、逐模型、逐许可验证的外围层。Anima 与 Krea2 权重/LoRA 不互换，任何未证实的参考图、mask、ControlNet、透明或身份保证不得进入生产合同。
