# WisArt `gpt-image-2` 图生图工作流核验

核验时间：2026-07-23（Asia/Shanghai）

## 结论

Albina 的唯一允许图像提供商应继续为 WisArt OpenAI-compatible API：
`https://wisart.kuaileshifu.com/v1`，模型固定为 `gpt-image-2`。图生图使用
`POST /v1/images/edits`，请求体是 `multipart/form-data`。每一张输入图都以**相同的
字段名 `image`**上传；多图不是 `image[]`，而是多个 `image` part。当前实现中
`form.append('image', ...)` 的方式与 WisArt 实际文档一致。

不要发送 `input_fidelity`。WisArt 的已发布 Images 编辑参数表没有这个字段。不要以
`mask` 作为控制手段：WisArt 文档说明它虽然为 OpenAI SDK 兼容而接收，但当前不参与生成。
不要请求 `background: "transparent"`：OpenAI 当前 `gpt-image-2` 文档说明该模型不支持
透明背景；角色图应继续使用纯洋红工作底并在本地严格抠图，最终交付透明 PNG。

## 证据

1. WisArt 公开的 API 文档页：<https://wisart.kuaileshifu.com/#/member/api-docs>。
   该单页应用的实时文档组件是
   <https://wisart.kuaileshifu.com/assets/ApiDocs-BPB-uO0Q.js>。组件中“编辑图片”一节明确写明：
   `POST /v1/images/edits`、`multipart/form-data`、`image: file | file[]`、最多 16 张，
   “可重复传 image 字段”，并给出 `-F "image=@/path/to/input.png"` 示例；同时列出
   `gpt-image-2`、`prompt`、`size`、`n`、`response_format`。
2. OpenAI 当前开发者文档的图像生成指南：
   <https://developers.openai.com/api/docs/guides/image-generation>；工具选项章节：
   <https://developers.openai.com/api/docs/guides/tools-image-generation#tool-options>。后者明确指出
   `gpt-image-2` 支持满足限制的 flexible size，但 transparent background 会失败。

## 可执行的多图语义

如果遵循“以图生图为主、画风基准线图作为参照、官方原图锁定人物身份”的最新要求，不能直接
上传用户提供的原始女主图到所有任务。这会把其脸、发型、服装、姿势和构图迁移到无关角色，
与“只学画风、不参考女主具体内容”冲突。

仓库中已经存在可用于图生图的去身份化风格板
`reference.user.albina-style-board`：
`staging/research/style-reference/albina-style-board-anonymous-palette.png`。它的来源账本说明已通过
强模糊和降采样/上采样去除了脸、身体、发型、服装、武器、排版和可读文字，仅保留冷白/炭黑、
克制金色、警示红与工业城市光影。正确的每次编辑输入顺序是：

1. 该去身份化风格板：只提供线条、色板、边缘处理、材质和光影，禁止继承人物/构图/文字。
2. 当前任务必需的官方角色或已审核角色参考：只锁定对应人物的身份、比例、服装、机械结构和道具。
3. 对背景任务，只提交第 1 张；对非 Albina 角色，绝不提交 Albina 官方参考。

同一请求的文字提示必须明确标注上述角色分工，并继续要求无文字、无水印、无 UI；人物任务还须
保留五指/五趾、关节、指甲、分离、受力及 Live2D 边界审核条件。

## 仓库核验

`scripts/lib/visual-production.mjs` 当前已正确：固定 WisArt + `gpt-image-2`；以重复 `image` 字段
构造 multipart；不发送 `image[]` 或 `input_fidelity`；角色图走本地洋红抠图；并用审核账本阻止未审图
扩散。`tests/assets/visual-production.test.ts` 已覆盖重复字段、字段顺序及抠图。

当前冻结合同的一个待整改点是 `styleReferenceMode: "text-only"`，且验证器明确禁止风格板进入编辑
请求。这可以防止原始女主泄漏，但没有充分落实“以可安全的去身份化风格板走图生图”的最新要求。
若执行这项要求，需将匿名风格板作为第一个重复 `image` 输入，并同步更新冻结计划、提示、验证器、
账本内容 hash 与回归测试；不可直接放行原始用户图片。

## 已运行验证

```text
npm test -- --run tests/assets/pilot-prompt-contracts.test.ts \
  tests/assets/canon-visual-sources.test.ts tests/assets/visual-production.test.ts

3 files passed, 26 tests passed
```

