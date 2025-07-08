const { Product } = require('../models/Association')
const { ProductInOrder } = require('../models/Association')
const { Order } = require('../models/Association')
const authenticate = require('../middleware/JWT')

exports.addToCart = [authenticate, async (req, res) => {
    try {
        const {productId, amount} = req.body
        const userId = req.user.id

        let order = await Order.findOne({
            where: {
                userId: userId,
                status: "pending",
                merchantTradeNo: null
            }
        })

        if(!order){
            order = await Order.create({
                userId: userId,
                status: "pending",
                merchantTradeNo: null
            })
        }
        
        const productInOrder = await ProductInOrder.findOne({
            where: {
                orderId: order.id,
                productId: productId
            }
        })

        if(productInOrder){
            productInOrder.amount += amount
            await productInOrder.save() 
        }else{
            await ProductInOrder.create({
                orderId: order.id,
                productId: productId,
                amount: amount
            })
        }

        res.status(200).json({message: "Add successfully"})
    } catch (error) {
        res.status(500).json({error: "Add failed", details: error.message})
    }
}]

exports.getCart = [authenticate, async (req, res) => {
    try {
        const userId = req.user.id

        const order = await Order.findOne({
            where: {
                userId: userId,
                status: "pending",
                merchantTradeNo: null
            },
            include: [{
                model: ProductInOrder,
                attributes: ["id", "amount"],
                include: [{
                    model: Product,
                    attributes: ["id", "name", "price", "stock", "imageUrls", "hashTags"]
                }]
            }]
        })

        if(!order){
            return res.status(400).json({message: "Get failed"})
        }else{
            return res.status(200).json({message: "Get successfully", order})
        }

    } catch (error) {
        res.status(500).json({error: "Get failed", details: error.message})
    }
}]

exports.updateAmount = [authenticate, async (req, res) => {
    try {
        const { productId, amount } = req.body;
        const userId = req.user.id

        const order = await Order.findOne({
            where:{
                userId: userId,
                status: "pending",
                merchantTradeNo: null
            }
        })
        if (!order) {
            return res.status(404).json({ message: "找不到使用者的待處理訂單" });
        }

        
        const productInOrder = await ProductInOrder.findOne({
            where: {
                orderId: order.id,
                productId: productId
            }
        })
        
        if (!productInOrder) {
            return res.status(404).json({ message: "該商品不在購物車中" });
        }

        productInOrder.amount = amount
        await productInOrder.save()

        res.status(200).json({message: "update successfully"})
    } catch (error) {
        res.status(500).json({error: "update amount failed", details: error.message})
    }
}]

exports.deleteItem = [authenticate, async (req, res) => {
    try {
        const { productId } = req.body;
        const userId = req.user.id

        const order = await Order.findOne({
            where:{
                userId: userId,
                status: "pending",
                merchantTradeNo: null
            }
        })

        if (!order) {
            return res.status(404).json({ message: "找不到使用者的待處理訂單" });
        }

        const productInOrder = await ProductInOrder.findOne({
            where: {
                orderId: order.id,
                productId: productId
            }
        })

        if (!productInOrder) {
            return res.status(404).json({ message: "該商品不在購物車中" });
        }

        await productInOrder.destroy()

        res.status(200).json({message: "delete successfully"})
    } catch (error) {
        res.status(500).json({error: "delete item failed", details: error.message})
    }
}]