const express = require('express')
const http = require('http')
const cors = require('cors')
const { Server } = require('socket.io')
require('dotenv').config();

const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const cartRoute = require('./routes/cartRoute')
const eventRoute = require('./routes/eventRoute')
const paymentRoutes = require("./routes/paymentRoutes");

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

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

app.use('/api/auth', authRoute)

app.use('/api/product', productRoute)

app.use('/api/cart', cartRoute)

app.use('/api/event', eventRoute)

app.use('/api/payment', bodyParser.urlencoded({ extended: true }));
app.use('/api/payment', bodyParser.json());
app.use('/api/payment', paymentRoutes);

app.get("/health", (req, res) => {
  res.send("OK");
});

sqlize.sync().then(() => {
    console.log("資料庫已同步");
});

// if (process.env.NODE_ENV === "production") {
//   const staticPath = path.join(__dirname, "../frontend/dist");
//   console.log("serve 靜態檔案：", staticPath);
//   app.use(express.static(staticPath));
//   app.get("*", (req, res) =>
//     res.sendFile(path.join(staticPath, "index.html"))
//   );
// }

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`伺服器運行在 http://localhost:${PORT}`);
})
