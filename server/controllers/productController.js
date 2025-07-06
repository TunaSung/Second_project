const { Product } = require('../models/Association')
const authenticate = require('../middleware/JWT');
const multer = require("multer");
const path = require("path");
const fs = require("fs");

exports.getAllProudcts = async (req, res) => {
    try {
        const products = await Product.findAll({where: {isAvailable: true}});
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message})
        
    }
}

exports.getOneProudct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if(product){
            res.status(201).json({product});
        } else {
            res.status(404).json({ message: "Can't find product" });
        }
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message}) 
    }
}

exports.getMyShop = [authenticate, async (req, res) => {
    try {
        const userId = req.user.id

        const product = await Product.findAll({
            where: {sellerId: userId},
            order: [['createdAt', 'DESC']]
        });
        
        if(product){
            res.status(201).json({product});
        } else {
            res.status(404).json({ message: "Can't find product" });
        }
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message}) 
    }
}]

// 建立儲存目錄（第一次啟動時會自動建立）
const uploadDir = path.join(__dirname, "..", "public", "uploads", "products");
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir, { recursive: true });
} 

// 設定 multer 儲存設定
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
exports.multiUpload = upload.array("imageUrls", 5);

exports.uploadProudct = [authenticate, async (req, res) => {
    try {
        const {name, price, stock, hashTags} = req.body
        const userId = req.user.id
        
        const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
        
        await Product.create({
            name: name,
            price: price,
            stock: stock,
            hashTags: hashTags,
            imageUrls: imageUrls,
            sellerId: userId
            
        })

        res.status(200).json({message: "Upload successfully"})
    } catch (error) {
        res.status(500).json({error: "Upload failed", details: error.message}) 
    }
}]


// 更改上架狀態
exports.updateAvailable = async (req, res) => {
    try {
        const { productId } = req.body

        const product = await Product.findByPk(productId)

        if(!product){
            res.status(404).json({message: "Product not found"})
        }

        product.isAvailable = !product.isAvailable
        await product.save()

        res.status(200).json({message: "Update successfullly"})
    } catch (error) {
        res.status(500).json({error: "Uupdate failed", details:error.message})
    }
}