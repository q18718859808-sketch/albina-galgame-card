# 阿尔比娜 Galgame Card

SillyTavern Route A 独立前端卡。角色卡通过酒馆助手加载固定 CDN 脚本，脚本在父页面挂载 iframe 前端，前端负责 GameSave、路线、数值、CG、场景和动态背景记忆；叙事模型只负责对白、旁白、心理、氛围和角色反应。

```js
import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v1.0.22/dist/albina-galgame-card/console/index.js'
```

纯净导入包位于 `release/pure-import/`。建议导入：

- `release/pure-import/card/albina.card.png`
- `release/pure-import/worldbooks/pure/albina_rp_static_worldbook.pure.json`
- 需要更多背景时，再启用 `release/pure-import/worldbooks/pure/` 下其余 `.pure.json` 文件

工程校验材料和写作队列保留在项目目录中，不属于普通 RP 导入内容。

