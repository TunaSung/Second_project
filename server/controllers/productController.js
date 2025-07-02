const { Product } = require('../models/Association')

exports.getAllProudcts = async (req, res) => {
    try {
        const products = await Product.findAll();
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

exports.uploadProudct = async (req, res) => {
    try {
        const {name, price, stock, hashTags, image} = req.body
        
        await Product.create({
            name: name,
            price: price,
            stock: stock,
            hashTags: hashTags,
            image: image
        })

        res.status(200).json({message: "Upload successfully"})
    } catch (error) {
        res.status(500).json({error: "Upload failed", details: error.message}) 
    }
}
