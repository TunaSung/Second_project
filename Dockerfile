# ==== 建立 client (Vite) ====
FROM node:20-alpine AS client

# 先安裝依賴
COPY client/package*.json ./
RUN npm ci

# 打包前端
COPY client/ ./
RUN npm run build

# ==== 建立 server (Express) ====
FROM node:20-alpine AS server
WORKDIR /app

# 複製 server 原始碼
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm ci --omit=dev
WORKDIR /app
COPY server/ ./server

WORKDIR /app/server
RUN npm install

# === 設定啟動 ===
ENV PORT=8080
EXPOSE 8080
CMD ["node", "server.js"]
