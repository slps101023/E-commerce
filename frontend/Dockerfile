# ==========================================
# 階段一：依賴安裝 (Deps)
# ==========================================
FROM node:20-alpine AS deps
# 某些 Node.js 套件在 Alpine 環境下需要編譯，這行用來安裝必要的工具
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 先複製 package.json 以利用 Docker 快取
COPY package*.json ./
# 安裝所有套件 (包含 devDependencies)
RUN npm install

# ==========================================
# 階段二：正式編譯 (Builder)
# ==========================================
FROM node:20-alpine AS builder
WORKDIR /app
# 從第一階段把安裝好的 node_modules 複製過來
COPY --from=deps /app/node_modules ./node_modules
# 複製所有的程式碼
COPY . .

# 執行 Next.js 打包 (這時候會因為 output: 'standalone' 產生精簡版伺服器)
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ==========================================
# 階段三：正式運行 (Runner)
# ==========================================
FROM node:20-alpine AS runner
WORKDIR /app

# 設定環境變數為正式模式
ENV NODE_ENV=production
# 關閉 Next.js 的匿名數據追蹤，加速啟動
ENV NEXT_TELEMETRY_DISABLED=1

# 建立一個非 root 的使用者來執行程式，提高安全性
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 【核心步驟】只複製運行所需的最小產物
# 1. 複製 public 目錄 (靜態資源，如圖片)
COPY --from=builder /app/public ./public

# 2. 核心：複製 standalone 目錄 (這就是編譯好的精簡伺服器)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# 3. 核心：複製 static 目錄 (Next.js 運作所需的 CSS/JS 成品)
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切換到非 root 使用者
USER nextjs

# Next.js standalone 預設監聽 3000 port
EXPOSE 3000
ENV PORT=3000

# 啟動 standalone 的 server.js (這行是固定的，不由 package.json 決定)
CMD ["node", "server.js"]