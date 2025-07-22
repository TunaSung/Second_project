const express = require('express')
const { getRoomMessages } = require('../controllers/messageController')

const router = express.Router()

router.get('/:roomId', getRoomMessages)

module.exports = router