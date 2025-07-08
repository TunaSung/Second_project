const express = require('express')
const { getAllProudcts, getOneProudct, uploadProudct, getMyShop, updateAvailable, updateMyShop} = require('../controllers/productController')
const authenticate = require('../middleware/JWT');
const multiUpload = require('../middleware/upload');


const router = express.Router()
router.get('/products', getAllProudcts)
router.get('/product/:id', getOneProudct)
router.get('/my-shop', authenticate, getMyShop)
router.post('/upload', authenticate, multiUpload, uploadProudct)
router.post('/update/available', updateAvailable)
router.post('/update/my-shop', multiUpload, updateMyShop)

module.exports = router