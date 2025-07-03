const express = require('express')
const { register, login, updateProfileInfo, updateCreditCard, updateAvatarUrl } = require('../controllers/authController')

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.post('/update/info', updateProfileInfo)
router.post('/update/card', updateCreditCard)
router.post('/update/avatar', updateAvatarUrl)

module.exports = router