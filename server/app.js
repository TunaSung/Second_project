// app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const authRoute = require('./routes/authRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const eventRoute = require('./routes/eventRoute');
const paymentRoutes = require('./routes/paymentRoutes');
const messageRoute = require('./routes/messageRoute');

const app = express();

const origins = (process.env.CORS_ORIGINS || 'http://localhost:5173').split(',');
const corsOptions = { origin: origins, credentials: true };

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoute);
app.use('/api/product', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/event', eventRoute);
app.use('/api/msg', messageRoute);

app.use('/api/payment', bodyParser.urlencoded({ extended: true }));
app.use('/api/payment', bodyParser.json());
app.use('/api/payment', paymentRoutes);

app.get('/health', (req, res) => res.send('OK'));

// 前端靜態檔（Production）
if (process.env.NODE_ENV === 'production') {
  const staticPath = path.join(__dirname, 'public');
  app.use(express.static(staticPath));
  // v5 fallback：用 app.use，而非 app.get('*')
  app.use((req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'));
  });
}

module.exports = { app, corsOptions };
