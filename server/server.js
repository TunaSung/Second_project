const express = require('express')
const cors = require('cors')
const authRoute = require('./routes/authRoute')
const productRoute = require('./routes/productRoute')
const sqlize = require('./config/database')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)

sqlize.sync().then(() => {
    console.log("資料庫已同步");
});

const PORT = 3000
app.listen(PORT, ()=>{
    console.log(`伺服器運行在 http://localhost:${PORT}`);
})
