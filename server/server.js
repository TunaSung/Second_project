const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
require('dotenv').config();

require('./models/Association')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const eventRoute = require('./routes/eventRoute')
const paymentRoutes = require("./routes/paymentRoutes");
const messageRoute = require('./routes/messageRoute')

const socketHandler = require('./socket/socketHandler')

const path = require('path')
const bodyParser = require('body-parser');

const sqlize = require('./config/database')

const app = express()
const server = http.createServer(app)
const origins = (process.env.CORS_ORIGINS || "http://localhost:5173").split(",");

const corsOptions = {
  origin: origins,
  credentials: true, // ← 這行會讓 res header 帶上 Access-Control-Allow-Credentials: true
};

app.use(cors(corsOptions)); // 全域套用

const io = new Server(server, {
  cors: corsOptions
})
socketHandler(io)

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use('/api/auth', authRoute)

app.use('/api/product', productRoute)

app.use('/api/cart', cartRoute)

app.use('/api/event', eventRoute)

app.use('/api/msg', messageRoute)

app.use('/api/payment', bodyParser.urlencoded({ extended: true }));
app.use('/api/payment', bodyParser.json());
app.use('/api/payment', paymentRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

sqlize.sync().then(() => {
    console.log("資料庫已同步");
});

if (process.env.NODE_ENV === "production") {
  const staticPath = path.join(__dirname, "public");
  app.use(express.static(staticPath)); // 提供前端的靜態檔案資源（如 JS, CSS）

  app.use((req, res) => { //v5 不能用 v4 的 app.get("*", handler);
    res.sendFile(path.join(staticPath, "index.html"));
  });
}

const PORT = process.env.PORT || 8080;
server.listen(PORT, "0.0.0.0", ()=>{
    console.log(`伺服器運行在 http://localhost:${PORT}`);
})