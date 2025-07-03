const express = require('express')
const { getAllProudcts, getOneProudct, uploadProudct, getMyShop} = require('../controllers/productController')

const router = express.Router()
router.get('/products', getAllProudcts)
router.get('/product/:id', getOneProudct)
router.get('/my-shop', getMyShop)
router.post('/upload', uploadProudct)

module.exports = router