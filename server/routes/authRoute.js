const express = require('express')
const { register, login, updateProfileInfo } = require('../controllers/authController')

const router = express.Router()
router.post('/register', register)
router.post('/login', login)
router.post('/edit', updateProfileInfo)

module.exports = router