# WisArt `gpt-image-2` 图生图试点工作流证据

日期：2026-07-23（Asia/Shanghai）  
范围：公开、只读文档与本仓库当前实现；未携带密钥，未提交生成请求。

## 结论

Albina normal 应继续走 `POST https://wisart.kuaileshifu.com/v1/images/edits` 的 `multipart/form-data` 编辑工作流，而不是纯文生图。唯一上传的图像输入应是已冻结的官方 Albina 无装甲站立图；用户提供的含人物原图不得上传。用户图的画风只经由已审核的文字 style bible 使用。这样能够同时满足“官方图锁定角色身份”和“用户图只提供画风、绝不转移女主身份”的要求。

当前 WisArt 兼容层不是 OpenAI API 的逐字段等价实现。生产请求的 multipart 图片字段必须使用可重复的 `image`，不是 `image[]`；`mask` 当前只兼容接收、不参与生成；`background` 等兼容字段会被安全忽略。因此不能为此通道发送 `background=transparent`，也不能把 mask 当作精确锁定身份或抠图的机制。

`gpt-image-2` 本身也不支持原生透明背景。立绘透明 PNG 的可靠路径是：让模型在明确、无渐变、无阴影的单色洋红键控背景上输出，然后只用本地非模型后处理生成 alpha PNG，并对透明边界、残留键色和五指/身份进行人工验收。当前仓库已实现键控与 alpha 失败门，不应跳过。

## 外部证据

| 主题 | 证据 | 对 Albina 的约束 |
| --- | --- | --- |
| 图像编辑与多图参考 | OpenAI [Image generation: Edit images](https://developers.openai.com/api/docs/guides/image-generation#edit-images) 的 `gpt-image-2` 示例以 `/v1/images/edits` 上传一张或多张参考图。官方 multipart cURL 多图示例重复使用 `image[]`。 | OpenAI 原生接口可用重复数组字段；这不能覆盖 WisArt 对同一兼容层的具体字段约定。 |
| 输入保真度 | 同页 “Image input fidelity” 说明 `gpt-image-2` 对全部图像输入自动使用高保真，不能设置 `input_fidelity`。 | 没有每张图的“只画风/只身份”参数或强度旋钮；把用户人物图作为第二张输入会让它也以高保真参与，存在身份、姿势和服装污染风险。 |
| mask 语义 | 同页 “Edit an image using a mask” 说明 mask 仅作提示，未必精确遵从；存在多张输入时 mask 作用在第一张图。 | 即便原生 API 下，mask 也不能取代身份锁定。WisArt 当前还声明 mask 不参与生成，故本试点不发送 mask。 |
| 尺寸与质量 | OpenAI [Customize image output](https://developers.openai.com/api/docs/guides/image-generation#customize-image-output) 规定 `gpt-image-2` 支持 `low`、`medium`、`high`、`auto`；尺寸边最长不超过 3840、边长是 16 的倍数、长宽比不超过 3:1、总像素在 655,360 至 8,294,400。 | `2336x3504` 为 8,185,344 像素，两个边均可被 16 整除，比例为 1.5，处于官方上限内；该超 2K 级输出属官方标注的 experimental，必须以实物结果验收，不能把“8K 级”当作原生 8K 保证。 |
| 透明背景 | 上述官方输出文档明确 `gpt-image-2` 不支持 `background: "transparent"`。 | 不发送该字段，也不把成功返回的 PNG 直接认定为透明；必须后处理和验收 alpha。 |
| WisArt 编辑字段 | WisArt 登录页对应的公开前端文档资源 [`ApiDocs-DW-1Yj5j.js`](https://wisart.kuaileshifu.com/assets/ApiDocs-DW-1Yj5j.js)，2026-07-23 读取的 SHA-256 为 `2322432a3949f999c012125c29aad23f62def423d9c78862af193d157aefb94d`。其中 `/v1/images/edits` 示例是 `-F "image=@/path/to/input.png"`，参数为 `image: file | file[]`，并明确“可重复传 image 字段”、最多 16 张。 | WisArt 生产请求必须重复使用 `image`。若以后需要多图，按语义优先级固定上传顺序并记录到收据；不得在无一次受控实证的情况下改成 `image[]`。 |
| WisArt 非等价字段 | 同一公开资源：编辑接口列出 `model`、`prompt`、`size`、`n`、`response_format`、`mask`；其中 `mask` 标为“兼容 OpenAI SDK 字段；当前不参与生成”。生成接口把 `background / moderation / output_format / output_compression / user` 标为“兼容接收；当前生成通道会安全忽略不支持的字段”。 | 编辑试点不发 `mask`、`input_fidelity`、`background`。`quality` 不写进 multipart edit，除非 WisArt 后续文档或一次受控兼容测试证明支持。 |
| WisArt 输出与尺寸 | 同一公开资源称 `/v1/images/edits` 支持 `response_format: url | b64_json`，并说明尺寸可接收具体尺寸，但可能按最近比例和面积推导输出规格。 | 真实 `b64_json` 试点在约两分钟后返回 HTTP 504；URL 形式已返回 HTTP 200，但流速约 17 KB/s。生产保留 URL，给已成功生成的图像一次有界的 15 分钟下载机会，随后仍须实际探测尺寸和 alpha，再缩放/键控到发布用 `1024x1536`。 |

## 当前仓库的对照结果

`scripts/lib/visual-production.mjs` 的 `editRequest` 当前与 WisArt 文档一致：按原始 reference 数组顺序重复追加 `image`，编辑表单包含 `model`、`prompt`、`n=1`、`size`、`response_format=url`，不含 `image[]`、`input_fidelity`、`mask` 或 `quality`。对应回归测试 `tests/assets/visual-production.test.ts` 明确断言以上字段和原始顺序，避免将 OpenAI 原生 cURL 格式误套到 WisArt。

`visual.image.portrait.albina.normal` 当前冻结为：`reference-edit`、唯一 `referenceSourceIds: ["canon.visual.albina.unarmored-standing"]`、`styleReferenceMode: "text-only"`、母版 `2336x3504`、发布物 `1024x1536` 的 alpha PNG。用户原图与其匿名画风板均受生产校验禁止作为请求图像输入。官方身份图的 SHA-256 是 `e68f9d04dda42e9ab86dcb686663057619c8dfbeff5f7d70078a083b0228aa55`；用户原始风格基准 SHA-256 是 `1f13c373aaf95122686be9ca3d01d481743abd3a058e9e11cd8af6520c0a0fb4`；匿名调色板 SHA-256 是 `d5f8ae93dca27a756c280714c7bea571fd5bfae477aceb48001013a87f509762`。

`preparePortrait` 已具备本地色键转 alpha 及失败门：交付物必须是 `1024x1536`，存在透明通道，边界透明比例足够高，并且没有显著不透明键色或残余洋红。这是本地确定性后处理，不是替代图像模型，符合“只使用 WisArt `gpt-image-2` 生成图像”的限制。

## 单一 Albina normal 试点规范

### 固定请求

```text
POST /v1/images/edits
Content-Type: multipart/form-data

model = gpt-image-2
n = 1
size = 2336x3504
response_format = url
image = <canon.visual.albina.unarmored-standing.png>
prompt = <冻结 prompt，补充下述色键背景条款>
```

不得发送：第二张用户人物图、`image[]`、`input_fidelity`、`mask`、`background=transparent`、`quality`。认证只从临时进程环境取得，不能写入脚本、报告、响应归档或命令历史。

### 必加的透明交付条款

当前 prompt 不能只写“透明背景”，因为模型与 WisArt 均没有该原生能力。追加以下文本，不改变角色、姿势或官方身份约束：

```text
For local alpha-key extraction only, render the entire canvas behind the character and Fascia as one perfectly flat #FF00FF magenta chroma-key field. No gradient, texture, border, vignette, floor, contact shadow, cast shadow, reflection, glow spill, or magenta inside Albina or Fascia. Keep the full figure and Fascia separated from the canvas with clean non-feathered readable edges. The image itself contains no text, logo, watermark, UI, or framing.
```

洋红应仅用于背景，原因是 Albina 的白、黑、金、浅灰和 Fascia 不应使用该纯色。生成后键控不可接受时，拒绝结果并只针对背景条款重试；不得改用另一模型或把伪透明底直接发布。

### 角色与风格职责分离

```text
Image 1 (uploaded): official Albina unarmored standing image.
Role: sole identity, pose, silhouette, anatomy, eye mapping, cable ponytail,
mechanical body, mechanical hands, and Fascia authority.

User original image: never uploaded.
Role: offline human-reviewed style observations only.

Style clause: dense controlled 2D anime linework, flat color, restrained
painterly shading, cool white/charcoal structure, restrained gold, warning-red
energy, industrial cinematic lighting. Do not transfer a person, face, body,
hair, eyes, clothes, weapon, pose, composition, typography, or UI from the
user reference.
```

若将来确实需要多图编辑，第一张仍必须是官方身份图，因为 OpenAI 的 mask 也只会作用于第一张；第二张只可为无人物、无姿势、无服装、无文字的抽象调色板。即使如此，先做一次单资产试验并人工比对，原因是 `gpt-image-2` 对每张输入都高保真处理，公开 API 不提供“第二张仅风格”的硬隔离参数。对当前 Albina 身份锚点，不上传任何风格图是更强的隔离方案。

### 试点验收顺序

1. 请求收据记录端点、`model`、multipart 字段名/排序、请求哈希、HTTP 状态、WisArt 请求 ID 和下载文件 SHA-256；不得记录 Authorization 值。
2. 先检查下载文件不是空白，且下载 URL 仍为批准的 WisArt 主机；探测实际尺寸与格式。
3. 仅本地执行色键转 alpha、等比缩放和尺寸验证；透明边界、残余键色任一失败即拒绝。
4. 由人工逐项审核：画面左黑眼/画面右白眼、线缆束高马尾、白色义体与黑色机械结构、Fascia 未变为普通剑、两只机械手均五指且未握剑手可独立计数、全身与 Fascia 不裁切、没有额外肢体/文字/水印。
5. 仅全部通过才批准 normal；装甲、表情和 CG 仍以该已批准 normal 为唯一上游锚点，不能把失败尝试当成父参考。

## 不可跳过的限制

- OpenAI 官方的 `image[]` 与 WisArt 文档的重复 `image` 不同；当前项目已选择后者并有测试。最终真实兼容性证据只能来自一笔受控的 WisArt `gpt-image-2` 试点请求，而不是猜测或盲改字段。
- 两套公开文档都不承诺角色绝对一致、手脚绝对正确或透明 PNG；这些必须靠单图输入、严格 prompt、不放行的人工视觉审查和本地文件验收共同保证。
- 官方把超过 2K 的输出标为 experimental；即使请求格式完全正确，也必须把尺寸、透明、身份和手部结果作为事实验收，而不是事前承诺。
