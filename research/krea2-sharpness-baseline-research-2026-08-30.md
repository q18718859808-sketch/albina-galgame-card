# Krea2 清晰度基线研究

本次将三张带有 ComfyUI `prompt` 元数据的历史图片作为证据样本，提取出它们的模型、采样参数、LoRA 链和后处理节点。三张图的共同部分不是更高的 steps，而是 `beta57`、8 steps、`832x1216` 初始 latent，以及采样后明确接入的 4x Anime 超分和 Lanczos 缩放链。

## 结论

清晰度主要来自四个因素的组合：`redcraft23FP8_30Krea2.safetensors` 的 Krea2 主干，适合线稿/动画材质的 LoRA profile，`4x_fatal_Anime_500000_G.pth` 的 4x 像素超分，以及超分后 `0.375` 倍 Lanczos 回缩。最终有效倍率约为 1.5x，既增加线条和局部材质细节，又避免直接保留 4x 放大带来的过锐和伪纹理。末端 `ColorsCorrectNode` 使用中性参数，作用更接近稳定输出链和颜色接口，而不是主动锐化。

三张样本都使用 seed `777001`、8 steps 和 `denoise=1.0`，但 LoRA profile 不同：一张使用 `bold-inked-anime-realism-comfy`，一张使用 `luminous-anime-film-comfy`，一张使用 `luminous-anime-film-comfy + Krea2Rella + meion`。因此不能把某一个 LoRA 认定为唯一清晰度来源；应把后处理链作为第一优先级固定变量，把 LoRA 组合作为第二优先级单变量 A/B。

## 与当前基线的边界

通用清晰度 profile 已写入 `content/media-production/krea2-sharpness-baseline-v1.json`，默认用于普通 Krea2 txt2img 研究和清晰度 A/B。它不替换 Albina canonical 基线。Albina canonical 仍必须保持六条生产 LoRA 的固定顺序和强度、canonical latent origin、RGBA 几何权威、alpha restore、单图 receipt 以及原始分辨率直接审查。历史清晰图是自由角色/风格样本，不能证明其适合 Albina 身份保持。

## 推荐验证顺序

第一步固定模型、seed、prompt、832x1216 latent 和现有 LoRA，只比较“无后处理”和“4x Anime -> 0.375 Lanczos -> neutral color correction”。第二步固定后处理链，只比较 `luminousFilm` 与 `boldInk` 两个 profile。第三步才比较 `luminousRellaMeion`，因为它同时改变了三个 LoRA，不能与前两步混作单变量结论。

每次只生成一张，记录 workflow hash、节点拓扑 hash、seed、输入 prompt、LoRA 顺序和 strength、输出 hash 与原始分辨率直读记录。自动清晰度指标只能作为筛选信号，不能替代对眼睛、手、轮廓、服装边缘、细线和局部伪纹理的直接检查。

## 当前资产检查

以下资产已在本机 ComfyUI 模型目录中找到：主模型、Qwen3-VL 编码器、Qwen Image VAE、`bold-inked-anime-realism-comfy`、`luminous-anime-film-comfy`、`masterpieces-v51`、`z3zz4`、`Krea2Rella`、`meion`、`ichika`，以及 `4x_fatal_Anime_500000_G.pth`。因此该 profile 具备复现前提，但尚未因为本次研究自动启动 GPU 生成，也未获得 Albina canonical promotion 资格。

## 风险和限制

历史图片只有 API `prompt` 元数据，没有完整 UI workflow；因此能确认执行节点和参数，但不能确认 UI 布局、禁用节点或所有前端显示字段。清晰度提升也可能部分来自 prompt、构图和主体面积，而不只是节点链。要把它转为正式质量结论，必须执行固定 prompt 的单变量 A/B，并保留输出和审查证据。
