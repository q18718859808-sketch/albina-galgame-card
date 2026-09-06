# OpenAI Image API 图像编辑工作流核验（上游对照）

核验日期：2026-07-23（Asia/Shanghai）  
性质：只读官方资料核验；未调用图像 API，未读取或输出任何密钥。

## 结论

OpenAI 当前官方 `gpt-image-2` 指南明确支持通过 `POST /v1/images/edits` 进行图生图/多参考图编辑。原生 OpenAI 的 **multipart 多图字段**在 curl 示例中是重复的 `image[]`：

```text
-F "model=gpt-image-2"
-F "image[]=@first.png"
-F "image[]=@second.png"
-F "prompt=..."
```

这只是 **OpenAI 原生服务的上游契约**，不能替代代理/兼容服务的字段契约。WisArt 的当前前端文档包另行证明其 `/v1/images/edits` 要求重复同名 `image`，而不是 `image[]`；项目向 WisArt 发请求时必须以 WisArt 契约为准。因此，不能把上游 `image[]` 直接改写进 WisArt 请求。

## 官方证据

### 端点、图生图与多图

- 官方指南将 Image API 的图像编辑定义为修改已有图片，或以一张/多张参考图生成新图；对应端点为 `/v1/images/edits`。
- `Edit Images` 小节用 `gpt-image-2` 演示了四张参考图编辑，并在 curl 中四次重复 `image[]`。SDK 则传递 `image` 文件数组。
- OpenAI API Reference 的 `Create image edit` 搜索结果说明 GPT Image 编辑可提供最多 **16 张**输入图。
- 掩码可用于指定待替换区域；多图时掩码应用于第一张图。官方要求原图与掩码格式、尺寸相同，且单个文件小于 50 MB；掩码需含 alpha 通道。

### 字段与模型行为

| 项目 | 上游 OpenAI `gpt-image-2` 结论 | 对 WisArt 实现的含义 |
| --- | --- | --- |
| `model` | 官方编辑示例明确使用 `gpt-image-2`。 | 使用该模型名。 |
| `image` / `image[]` | 原生 multipart 多图示例为重复 `image[]`；SDK 形态是 `image: [file, ...]`。 | 不可照搬到 WisArt；其文档规定重复 `image`。 |
| `prompt` | 图像编辑必备的文字指令；官方参考页给出长度 1-32000。 | 传递完整审核过的资产提示词。 |
| `size` | `gpt-image-2` 支持 `size`；支持的分辨率受边长、16px 倍数、比例及总像素约束。 | 只有在 WisArt 文档列出时才向其 multipart 请求发送。 |
| `n` | Image API 支持一次返回多张图；官方参考页的编辑参数范围为 1-10。 | 本项目固定 `n=1`，便于逐图审核与追溯。 |
| `quality` | GPT Image 支持 `low`、`medium`、`high`、`auto`。 | 上游支持不代表 WisArt 编辑端点接受；WisArt 当前编辑参数表未列出，故不能发送。 |
| `input_fidelity` | 官方明确：对 `gpt-image-2` **必须省略**；该模型自动以高保真处理每张输入图，API 不允许更改。 | WisArt 编辑请求必须不发送。 |
| `mask` | 上游支持，受上述格式、尺寸与 alpha 限制。 | WisArt 当前文档称字段仅兼容接收、不参与生成，故不能用作身份或构图锁定。 |
| `response_format` | 官方 GPT Image 指南的返回路径是 `data[0].b64_json`，并说明 Image API 返回 base64 图像数据；`url` 不是该 `gpt-image-2` 上游示例的返回格式。 | `response_format=url` 是 WisArt 兼容层的已核验约定，不应从上游格式推断。 |
| 输出格式 | 默认 PNG，可请求 JPEG/WebP；JPEG/WebP 可设 `output_compression`。 | 只按 WisArt 已公开且已核验的请求字段使用。 |
| 透明背景 | `gpt-image-2` 当前不支持 `background: "transparent"`。 | 角色资产应使用平坦色键背景后进行本地去底与 alpha 验证，不能假设原生透明输出。 |

## 返回与审计

官方 SDK 示例从 `result.data[0].b64_json` 读取 Base64，再落盘为图像文件。生产链路应将供应商原始响应（脱敏）、下载/解码结果、产物 SHA-256、尺寸与人工审图结论一并保存；不能因为请求返回成功就自动批准资产。

官方也提示：GPT Image 的复杂请求可能耗时约两分钟，并可能在角色一致性、精确构图和文字渲染上失败。因此，手部五指、脚部五趾、无多余肢体、无文字/水印、身份一致及 Live2D 可拆分性仍须逐图人工审核，不是 API 参数可保证的结果。

## 来源

1. OpenAI 官方 Image generation guide，`Edit Images`、`Image input fidelity`、`Customize Image Output`：
   <https://developers.openai.com/api/docs/guides/image-generation#edit-images>
2. OpenAI 官方 Image generation guide，输出自定义与 `gpt-image-2` 尺寸/质量限制：
   <https://developers.openai.com/api/docs/guides/image-generation#customize-image-output>
3. OpenAI API Reference，Create image edit（检索结果与公开页面，记录多图上限及字段目录）：
   <https://developers.openai.com/api/reference/resources/images/methods/edit>

## 适用边界

本文件仅用于核验上游 API 行为，不能作为向 WisArt 发请求的唯一依据。项目对 WisArt 的实际字段、返回形态和功能限制，必须以同任务目录中的 `wisart-gpt-image-2-image-edit-workflow-evidence-20260723.md` 为准，并通过受控试点的真实回执确认。
