const express = require('express')
const { getAllProudcts, getOneProudct, uploadProudct} = require('../controllers/productController')

const router = express.Router()
router.get('/products', getAllProudcts)
router.get('/product/:id', getOneProudct)
router.post('/upload', uploadProudct)

module.exports = router