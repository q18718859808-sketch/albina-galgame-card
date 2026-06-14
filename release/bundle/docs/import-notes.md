# Import Notes

1. 导入并启用 `worldbooks/pure/albina_rp_static_worldbook.pure.json`。
2. 需要更完整背景时，继续启用 `worldbooks/pure/` 下其他 `.pure.json` 文件。
3. 导入 `card/albina.card.png` 或 `card/albina.card.json`。
4. 在酒馆助手或 JS-Slash-Runner 执行：

```js
import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.22/dist/albina-galgame-card/console/index.js'
```

前端会写入聊天变量 `albinaGalgameCardGameSaveV1`，并维护动态背景包。AI 不应直接改数值、路线、CG 解锁或长期事实。

