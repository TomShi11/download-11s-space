# download.11s.space

11s 软件下载中心 — 静态站点，部署于 GitHub Pages + Vercel。

## 目录

```
├── index.html          # 首页
├── css/style.css       # 样式
├── js/main.js          # 交互
├── assets/             # 图标资源
├── downloads/          # 安装包（DeskNote-Setup-x.y.z.exe）
├── vercel.json         # Vercel 配置
└── CNAME               # 自定义域名 download.11s.space
```

## 本地预览

```bash
npx serve .
```

## 部署到 Vercel

```bash
npm i -g vercel
vercel            # 首次登录并关联项目
vercel --prod
```

域名：在 Vercel 项目 → Settings → Domains 中添加 `download.11s.space`，
并按提示把域名解析到 `cname.vercel-dns.com`。

## 部署到 GitHub Pages（备用线路）

仓库：https://github.com/TomShi11/download-11s-space
Settings → Pages → Branch 选 `main`（根目录），CNAME 已配置为 `download.11s.space`。

## 发布新版本

1. 将新安装包放入 `downloads/`，并更新 `index.html` 中的版本号、文件名与校验值。
2. 提交并推送，Vercel 自动发布。
