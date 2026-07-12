# Albina v2.0.0 CDN 导入

在 Tavern Helper 的经典脚本环境中粘贴下面的入口。它只注入一次经典加载器；加载器随后以动态 `import()` 载入 `albina-source.js`，因此不会把 ESM 静态导入交给经典脚本解析器。

```js
(function(){var src='https://cdn.jsdelivr.net/gh/q18718859808-sketch/albina-galgame-card@v2.0.0/dist/albina-galgame-card/source/albina-classic-loader.js';if(document.querySelector('script[data-albina-classic-loader="v2"]'))return;var script=document.createElement('script');script.src=src;script.async=true;script.dataset.albinaClassicLoader='v2';document.head.appendChild(script)}());
```

公开发布根只有 `dist/albina-galgame-card`。运行时不调用任何媒体生成 API，也不包含生成凭据。

用于本地验证的路径为：

```text
http://localhost:4173/albina-classic-loader.js
```
