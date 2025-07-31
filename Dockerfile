# ==== 建立 client (Vite) ====
FROM node:18 AS client

WORKDIR /app/client
COPY client/ ./
RUN npm install && npm run build

# ==== 建立 server (Express) ====
FROM node:18 AS server

WORKDIR /app
COPY server/ ./server
COPY --from=client /app/client/dist ./server/public 

WORKDIR /app/server
RUN npm install

# === 設定啟動 ===
EXPOSE 3000
CMD ["node", "server.js"]
