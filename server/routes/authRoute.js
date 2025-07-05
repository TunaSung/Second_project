const express = require('express')
const { getUserInfo, signUp, signIn, updateProfileInfo, updateCreditCard, updateAvatarUrl } = require('../controllers/authController')
const authenticate = require('../middleware/JWT');

const router = express.Router()
router.get('/', authenticate, getUserInfo)
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.put('/update/info', authenticate, updateProfileInfo)
router.put('/update/card', authenticate, updateCreditCard)
router.post('/update/avatar', authenticate, updateAvatarUrl)

module.exports = router