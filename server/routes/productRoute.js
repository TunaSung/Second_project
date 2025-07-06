const express = require('express')
const { getAllProudcts, getOneProudct, uploadProudct, multiUpload, getMyShop} = require('../controllers/productController')
const authenticate = require('../middleware/JWT');

const router = express.Router()
router.get('/products', getAllProudcts)
router.get('/product/:id', getOneProudct)
router.get('/my-shop', authenticate, getMyShop)
router.post('/upload', authenticate, multiUpload, uploadProudct)

module.exports = router