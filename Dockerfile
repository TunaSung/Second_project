# syntax=docker/dockerfile:1.6

# ==== Build client ====
FROM node:20-alpine AS client
WORKDIR /app/client

COPY client/package*.json ./
# npm 快取
RUN --mount=type=cache,id=npm-cache,target=/root/.npm npm ci

COPY client/ ./
RUN --mount=type=cache,id=vite-cache,target=/root/.cache \
    npm run build -- --logLevel info

# ==== Build server ====
FROM node:20-alpine AS server
WORKDIR /app/server

COPY server/package*.json ./
RUN --mount=type=cache,id=npm-cache,target=/root/.npm npm ci --omit=dev
COPY server/ ./

# 把前端產物放到靜態目錄
COPY --from=client /app/client/dist ./public

ENV PORT=8080 NODE_ENV=production
EXPOSE 8080
CMD ["node", "server.js"]
