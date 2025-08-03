const express = require('express')
const { getAllProducts, getCategory, getMyShop, getHistory, getProductSearch, uploadProduct, updateAvailable, updateMyShop} = require('../controllers/productController')
const authenticate = require('../middleware/JWT');
const multiUpload = require('../middleware/productUpload');


const router = express.Router()
router.get('/category', getCategory)
router.post('/products', getAllProducts)
router.get('/my-shop', authenticate, getMyShop)
router.get('/history', authenticate, getHistory)
router.post('/search', getProductSearch)
router.post('/upload', authenticate, multiUpload, uploadProduct)
router.post('/update/available', updateAvailable)
router.post('/update/my-shop', multiUpload, updateMyShop)

module.exports = router