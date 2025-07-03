const express = require('express')
const { addToCart, getCart, updateAmount, deleteItem } = require('../controllers/cartController')

const router = express.Router()

router.post('/add', addToCart)
router.get('/', getCart)
router.post('/update', updateAmount)
router.delete('/delete', deleteItem)

module.exports = router