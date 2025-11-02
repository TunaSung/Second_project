// server.js
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const { app, corsOptions } = require('./app');
const socketHandler = require('./socket/socketHandler');
const { connectDB } = require('./config/database');

require('./models/Association');

(async () => {
  try {
    // 僅在本機時做 sync（避免 prod 誤同步）
    const enableSync = process.env.NODE_ENV !== 'production';
    await connectDB({ sync: enableSync });

    const server = http.createServer(app);
    const io = new Server(server, { cors: corsOptions });
    socketHandler(io);

    const PORT = process.env.PORT || 8080;
    server.listen(PORT, '0.0.0.0', () => {
      console.log(`伺服器運行在 http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('資料庫連線失敗：', err);
    process.exit(1);
  }
})();
