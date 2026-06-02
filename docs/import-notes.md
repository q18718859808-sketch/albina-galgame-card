# Import Notes

1. 导入 `card/albina.card.png`。
2. 启用 `worldbooks/pure/albina_rp_static_worldbook.pure.json`。
3. 需要更完整背景时，继续启用 `worldbooks/pure/` 下其余 `.pure.json` 文件。
4. 酒馆助手脚本已嵌入角色卡；如需手动执行，使用：

```js
import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.2/dist/albina-galgame-card/console/index.js'
```

前端会写入聊天变量 `albinaGalgameCardGameSaveV1`，并维护动态背景记忆。叙事模型只写对白、旁白、心理、氛围和角色反应，不直接改数值、路线、CG 解锁或长期事实。
