# Tavern Helper CDN 写入取证（2026-07-29）

本文件只记录可复核的卡片元数据与真实 CDN 运行结果，不能替代最终版的发布门禁。

## 结论

Albina 当前 RC 卡的唯一 Tavern Helper 脚本已按可用历史版本与原始 8-bit 卡的同一数据模型写入：`data.extensions.tavern_helper` 是对象，含 `scripts` 数组与 `variables` 对象；启用的脚本含 `type`、`enabled`、`name`、`id`、`content`、`info`、`button`、`data` 八个字段。`content` 是一行、末尾换行、固定 tag 的 ES module import。不要改用 `TavernHelper_scripts`、扁平 `buttons` 或未固定版本的 CDN URL。

## 直接来源

| 来源 | SHA-256 | 读取到的 Tavern Helper 结构 |
| --- | --- | --- |
| `D:\\codex\\8bit-reference\\8bit-card.json` | `95f1e529a7d3a2cfd617773ce3875fc2bf448ef61ac200982ec4f3a6d310beff` | `tavern_helper: { scripts: [script], variables: {} }` |
| `D:\\创作\\albina_v1.0.26_最新带tavern_helper脚本.png` | `7b27d4840bbcbbf8dc8ba235b38dc3535581bbe3255fa91b6df160727d265152` | 同上；CDN 为固定 `v1.0.26` |
| `D:\\创作\\albina_v1.0.27_修复CDN路径.png` | `71a0ae68f188ab8c006c62ff1e1733380b2e1bdc5466ae9c76815450b66b14e0` | 同上；CDN 为固定 `v1.0.27` |
| `D:\\创作\\albina_v1.0.28_精简CDN.png` | `185e62d82a7c21b2a3f11b85bbedafbc100b1ae3b7affd9472a3f9397d86243d` | 同上；CDN 为固定 `v1.0.28` |
| `D:\\创作\\albina_v1.0.29_修复CDN路径.png` | `1ff9f117b5a947c42290670108561dab484deef4e5afc3be0f71b57c2a1bb51d` | 同上；CDN 为固定 `v1.0.26` |

上述四张 PNG 均直接解析其 PNG `tEXt/chara` chunk 后取得 Character Card V3 JSON，而不是从旧修复脚本或人工记忆推断。

8-bit 的启用脚本字段集合恰为：

```json
{
  "type": "script",
  "enabled": true,
  "name": "8bit",
  "id": "<uuid>",
  "content": "import '<tag-pinned-url>'\\n",
  "info": "",
  "button": {
    "enabled": true,
    "buttons": [{ "name": "<event-name>", "visible": true }]
  },
  "data": {}
}
```

## 当前 Albina RC 合同

`card/albina.card.json`、`card/character-card.template.json`、嵌入 PNG 元数据和 `content/tavern-helper-v1.json` 一致使用：

```json
{
  "tavern_helper": {
    "scripts": [{
      "type": "script",
      "enabled": true,
      "name": "Albina",
      "id": "7f664fa2-7123-484f-bafb-bc812ae1103f",
      "content": "import 'https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0-rc.2/dist/albina-galgame-card/source/albina-classic-loader.js'\\n",
      "info": "",
      "button": {
        "enabled": true,
        "buttons": [{ "name": "打开阿尔比娜前端", "visible": true }]
      },
      "data": {}
    }],
    "variables": {}
  }
}
```

`v2.0.0-rc.2` 是固定 tag，不使用 `latest`、`main`、`master` 或浮动范围。该对象的外层路径、`script` 字段集合、按钮嵌套位置和 import 语法均与原始 8-bit 卡及四个可用 Albina 历史卡相同；人物名、按钮名和 URL 按本项目替换。

## 当日真实 CDN/运行验证

2026-07-29 直接请求 jsDelivr（不是本地拦截）得到：

| 文件 | HTTP/MIME | SHA-256 |
| --- | --- | --- |
| `card/albina.card.png` | `200 image/png` | `6b2375de2ceff6de5c7205af39c2e7b514b1b2a03cf84441c5ffa4adf1fa99fc` |
| `card/albina.card.json` | `200 application/json; charset=utf-8` | `046526c73949ca14d5d862594b74e0457e3620cacbe791cc506e89f0692fe0c3` |
| `source/albina-classic-loader.js` | `200 application/javascript; charset=utf-8` | `70edae63ce162a4555a15889c32c242d4490fca99e6011744c45f824075b0455` |
| `source/albina-source.js` | `200 application/javascript; charset=utf-8` | `1da310e8b61e63ed03712dc22c6d4ba8726ed5080897587b8d8869d3de0925b1` |
| `source/albina-source.css` | `200 text/css; charset=utf-8` | `3bc9a2f1d3bedcd40aa149bfbb1e834c6151059d23375c218c03f0e70d5cced7` |

随后运行 `.codex/tasks/20260720-123439-albina-tavern-helper-cdn-completion/verify-public-import.mjs --tag v2.0.0-rc.2`。桌面（1440×900）与移动（390×844）均直接加载上述三个 runtime 文件，Tavern Helper iframe 内无 launcher，宿主页面恰有一个 launcher 与一个样式表；点击后标题页可见，且没有页面或控制台错误。

## 发布边界

当前工作树的未发布 `albina-source.js` 与固定 RC CDN 的哈希不同，因此不能把本地后续改动伪称为已经上线的 `v2.0.0-rc.2`。最终媒体和代码完成后，必须先冻结 canonical JSON/PNG/`dist`/`release`，再使用新的不可变版本 tag 重新执行本文件的真实 CDN 导入验证；不得覆盖现有 RC tag。
