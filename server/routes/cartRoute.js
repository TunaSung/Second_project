const express = require('express')
const { addToCart, getCart, updateAmount, deleteItem } = require('../controllers/cartController')
const authenticate = require('../middleware/JWT')

const router = express.Router()

router.post('/add', authenticate, addToCart)
router.get('/', authenticate, getCart)
router.post('/update', authenticate, updateAmount)
router.delete('/delete', authenticate, deleteItem)

module.exports = router