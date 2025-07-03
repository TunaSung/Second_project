const express = require('express')
const { signUp, signIn, updateProfileInfo, updateCreditCard, updateAvatarUrl } = require('../controllers/authController')

const router = express.Router()
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.post('/update/info', updateProfileInfo)
router.post('/update/card', updateCreditCard)
router.post('/update/avatar', updateAvatarUrl)

module.exports = router