const { Product } = require('../models/Association')
const authenticate = require('../middleware/JWT');

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
            return res.status(201).json({product});
        } else {
            return res.status(404).json({ message: "Can't find product" });
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
            return res.status(201).json({product});
        } else {
            return res.status(404).json({ message: "Can't find product" });
        }
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message}) 
    }
}]

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
            return res.status(404).json({message: "Product not found"})
        }

        product.isAvailable = !product.isAvailable
        await product.save()

        res.status(200).json({message: "Update successfullly"})
    } catch (error) {
        res.status(500).json({error: "Uupdate failed", details:error.message})
    }
}

exports.updateMyShop = async (req, res) => {
    try {
        const {productId, name, price, stock, hashTags} = req.body

        const product = await Product.findByPk(productId)

        console.log("🔥 收到更新請求：", {
            productId,
            name,
            price,
            stock,
            hashTags,
        });

        console.log("📦 收到圖片：", req.files);

        if(!product){
            return res.status(404).json({message: "Product not found"})
        }

        const imageUrls = req.files?.length 
            ? req.files.map(file => `/uploads/products/${file.filename}`)
            : product.imageUrls


        product.name = name
        product.price = price
        product.stock = stock
        product.hashTags = hashTags
        product.imageUrls = imageUrls
        await product.save()
        
        res.status(200).json({message: "Update successfully"})
    } catch (error) {
        console.error("❌ 更新失敗：", error);
        res.status(500).json({error: "Update failed", details:error.message})
    }
}