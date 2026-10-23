# LongLove

[打开网站](https://tong0617c.github.io/LongLove/)

银白冰雪风格的个人字卡网站。GitHub Pages 发布目录：docs/。

支持随机聊天、模拟通话、寻踪、朋友圈、信箱、日历、伸手、记账、塔罗、虚拟商场与自由造句。

## 后台

backend/ 为独立 Cloudflare Worker，提供 D1 与 Cron + Bark 通知。GitHub Pages 本身不运行后台任务。见 [部署说明](https://tong0617c.github.io/LongLove/backend-setup.html)。密钥只设置在 Cloudflare Secrets。

## 数据

聊天数据位于本地 IndexedDB，连接个人后台后位于自己的 D1。仓库不包含聊天记录或密钥。跨网站地址的数据不会自动迁移，请从旧站导出后在新站导入。

## 来源与许可

基础聊天参考 [tong0617c/papercardforHUIT](https://github.com/tong0617c/papercardforHUIT)。

寻踪代码与功能灵感：**Mochi 字卡 · 小红书 @言序（1842523578）**。基于言序作品修改，禁止商用，保留原公告与许可。公开版寻踪示例文案由 LongLove 新写。

词库来自 jieba（MIT），见 docs/licenses/jieba.txt。冬日背景使用内置 ImageGen 生成；提示词摘要：银白霜花、雪景窗户、透明纸张拼贴，无文字、中央留白、低对比度。

## 验证

Node.js 24+：node --test tests/engine.test.mjs tests/backend.test.mjs tests/choice.test.mjs tests/stickers.test.mjs tests/delete.test.mjs tests/stitch.test.mjs
