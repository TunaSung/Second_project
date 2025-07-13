const { Product } = require('../models/Association')
const { ProductInOrder } = require('../models/Association')
const { Order } = require('../models/Association')
const { User } = require('../models/Association')
const { Category } = require('../models/Association')
const { Op } = require("sequelize");

exports.getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.body;

        const category = await Category.findByPk(categoryId);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        let whereCategoryIds = [];

        if (category.parentId === null) {
            const subcategories = await Category.findAll({ where: { parentId: categoryId } });
            whereCategoryIds = subcategories.map(sub => sub.id);
        } else {
            whereCategoryIds = [categoryId];
        }
        
        const whereClause = {
            isAvailable: true,
            categoryId: { [Op.in]: whereCategoryIds },
        };

        // const userId = req.user?.id ?? null;

        // if (userId !== null) {
        //     whereClause.sellerId = { [Op.ne]: userId };
        // }

        const products = await Product.findAll({
            where: whereClause,
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message})
    }
}

exports.getProductSearch = async (req, res) => {
    try {
        const { keyword } = req.query;
        if (!keyword) {
        return res.status(400).json({ error: "Missing keyword" });
        }
        

        const products = await Product.findAll({
        where: {
            name: {
            [Op.like]: `%${keyword}%`
            },
            isAvailable: true,
        },
        order: [['createdAt', 'DESC']],
        });

    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: 'Search failed', details: error.message });
  }
}

exports.getCategory = async (req, res) => {
    try {
        const categories = await Category.findAll({where: {parentId: null}});
        const subcategories = await Category.findAll({where: {img: null}})
        
        if(categories){
            return res.status(201).json({categories, subcategories});
        } else {
            return res.status(404).json({ message: "Can't find categories" });
        }
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message}) 
    }
}

exports.getMyShop = async (req, res) => {
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
}

exports.getHistory =  async (req, res) => {
    try {
        const userId = req.user.id

        let completedOrder = await Order.findAll({
            where:{
                userId: userId,
                status: 'paid'
            },
            include: [
                {
                    model: ProductInOrder,
                    where: {status: 'paid'},
                    attributes: ['id', 'amount', 'updatedAt'] ,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price', 'imageUrls']
                        }
                    ]
                },
                {
                    model: User,
                    where: {id: userId},
                    attributes: ['username']
                }
                
            ],
            order: [['updatedAt', 'DESC']],
            attributes: ['id', 'merchantTradeNo', 'updatedAt']
        })

        let pendingOrder = await Order.findAll({
            where:{
                userId: userId,
                status: 'pending'
            },
            include: [
                {
                    model: ProductInOrder,
                    where: {status: 'unpaid'},
                    attributes: ['id', 'amount', 'updatedAt'] ,
                    include: [
                        {
                            model: Product,
                            attributes: ['id', 'name', 'price', 'imageUrls']
                        }
                    ]
                },
                {
                    model: User,
                    where: {id: userId},
                    attributes: ['username']
                }
                
            ],
            order: [['updatedAt', 'DESC']],
            attributes: ['id', 'merchantTradeNo', 'updatedAt']
        })

        completedOrder = completedOrder.length > 0 ? completedOrder : []
        pendingOrder = pendingOrder.length > 0 ? pendingOrder : []


        return res.status(200).json({message: "找到訂單ㄌ",completedOrder, pendingOrder});
    } catch (error) {
        res.status(500).json({error: "fetch products failed", details: error.message}) 
    }
}

exports.uploadProduct = async (req, res) => {
    try {
        const {name, price, stock, hashTags, category} = req.body
        const userId = req.user.id
        
        const imageUrls = req.files.map(file => `/uploads/products/${file.filename}`);
        
        await Product.create({
            name: name,
            price: price,
            stock: stock,
            hashTags: hashTags,
            imageUrls: imageUrls,
            sellerId: userId,
            categoryId: category
            
        })

        res.status(200).json({message: "Upload successfully"})
    } catch (error) {
        res.status(500).json({error: "Upload failed", details: error.message}) 
    }
}


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