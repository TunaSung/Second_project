// middleware/upload.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// 建立儲存目錄（如果不存在）
const uploadDir = path.join(__dirname, "..", "public", "uploads", "products");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// multer 設定
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `product${Date.now()}${ext}`);
    },
});

const upload = multer({ storage });

module.exports = upload.array("imageUrls", 5);