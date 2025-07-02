const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模組，用於生成和驗證 JWT
require('dotenv').config();
const { User } = require('../models/Association');


const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; // 獲取 Token
        if (!token) {
            return res.status(401).json({ message: '未提供身份驗證令牌' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // 驗證 Token
        const user = await User.findByPk(decoded.id); // 根據解碼的 ID 查找用戶資料

        if (!user) {
            return res.status(404).json({ message: `用戶不存在, decoded: ${JSON.stringify(decoded)}` });
        }

        req.user = user; // 把用戶資料存放到 req.user 中
        next(); // 繼續處理請求
    } catch (error) {
        console.error('驗證錯誤:', error);
        res.status(401).json({ message: '無效的身份驗證令牌' });
    }
};

module.exports = authenticate;
