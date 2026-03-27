# 基底映像檔
FROM node:24-alpine

# 設定工作目錄
WORKDIR /server

# 複製 package.json 並安裝依賴
COPY package*.json ./
RUN npm install --production

# 複製程式碼
COPY . .

# 曝露網站運行的 Port
EXPOSE 5000

# 啟動指令
CMD ["npm", "start"]