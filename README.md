# E-Commerce 購物網站
![Next.js](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js)
![Express.js](https://img.shields.io/badge/Express.js-white?style=flat&logo=express&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)

這是一個以前後端分離為核心的全端電子商務專案，前端提供商品瀏覽與購物流程，後端提供登入註冊與商品 API，並以 Docker Compose 統一啟動服務。

## 專案簡介

- 前端：Next.js (App Router) + React + Tailwind CSS
- 後端：Express.js + Node.js
- 資料庫：PostgreSQL (透過 `DATABASE_URL` 連線)
- 部署方式：Docker + Docker Compose

## 核心功能

- 使用者系統：註冊、登入、登出、JWT 驗證
- 商品展示：商品列表讀取與渲染
- 購物車模組：新增/移除商品、顯示總金額

## 系統需求

- Docker 24+
- Docker Compose v2+
- (可選) Node.js 20+、pnpm 9+（本機開發模式）

## 快速啟動（Docker）

1. 下載專案

```bash
git clone https://github.com/slps101023/E-commerce.git
cd E-commerce
```

2. 建立根目錄 `.env`

```bash
cp .env.example .env
```

或手動建立並填入：

```env
PORT=5000
DATABASE_URL=postgresql://<db_user>:<db_password>@<db_host>:5432/<db_name>
JWT_KEY=replace_with_a_strong_secret
SALT_ROUNDS=10
FRONTEND_URL=http://localhost:3000
```

3. 檢查前端 API 位址

目前 `docker-compose.yml` 內的 `NEXT_PUBLIC_API_BASE_URL` 使用固定 IP。
若你在本機開發，建議改成：

```yaml
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

4. 啟動服務

```bash
docker compose up -d --build
```

5. 開啟網站

- 前端：http://localhost:3000
- 後端：http://localhost:5000

## 常用 Docker 指令

```bash
# 查看服務狀態
docker compose ps

# 查看即時日誌
docker compose logs -f

# 停止服務
docker compose stop

# 停止並移除容器
docker compose down
```

## 本機開發模式（不使用 Docker）

### 前端

```bash
cd frontend
pnpm install
pnpm dev
```

### 後端

```bash
cd server
pnpm install
pnpm dev
```

## 專案結構

```text
E-commerce/
├─ frontend/                 # Next.js 前端
│  ├─ app/                   # App Router 頁面與功能
│  ├─ components/            # 共用 UI 元件
│  └─ public/                # 靜態資源
├─ server/                   # Express 後端 API
│  └─ index.js               # API 入口
├─ docker-compose.yml        # 容器編排設定
├─ .env.example              # 環境變數範本
└─ README.md
```

## API 總覽

基底路徑：`/api`

- `GET /products`：取得商品列表
- `POST /auth/register`：註冊
- `POST /auth/login`：登入（寫入 cookie）
- `GET /auth/me`：取得目前登入者
- `POST /auth/logout`：登出（清除 cookie）

## 環境變數說明

- `PORT`：後端服務埠號（預設 5000）
- `DATABASE_URL`：PostgreSQL 連線字串
- `JWT_KEY`：JWT 簽章密鑰
- `SALT_ROUNDS`：bcrypt 雜湊成本
- `FRONTEND_URL`：CORS 允許來源
- `NEXT_PUBLIC_API_BASE_URL`：前端呼叫 API 的基底網址

## 常見問題排查

1. 前端無法呼叫 API
- 確認 `NEXT_PUBLIC_API_BASE_URL` 是否可連到後端。
- 確認後端容器是否有對外開 `5000`。

2. 登入後仍顯示未登入
- 檢查瀏覽器是否成功收到 `token` cookie。
- 檢查 `FRONTEND_URL` 是否與實際前端網址一致。

3. 後端啟動失敗
- 檢查 `.env` 是否提供 `DATABASE_URL`、`JWT_KEY`、`SALT_ROUNDS`。
- 檢查資料庫連線資訊與防火牆設定。

## 後續可擴充

- 加入商品分類與關鍵字搜尋
- 加入訂單系統與付款流程
- 補齊單元測試與整合測試
- 導入 CI/CD（例如 GitHub Actions）


