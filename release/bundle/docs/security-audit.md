# Security Audit

- 无 `eval` 或 `new Function`。
- 正式 CDN 使用已验证的 commit-pinned runtime URL；tag 仅保留为 GitHub release metadata。
- 不加载不可信远程脚本；图片与 SVG 通过项目 CDN 路径解析。
- 玩家输入只作为文本状态保存，不作为 HTML 注入。
- 成人自愿边界写入卡、世界书和前端文案；无服从/抗拒破坏变量。
