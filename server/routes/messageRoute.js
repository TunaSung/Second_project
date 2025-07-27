const express = require('express')
const { getRooms, getRoomMessages, getLastMsg } = require('../controllers/messageController')
const authenticate = require('../middleware/JWT');

const router = express.Router()

router.get('/rooms', authenticate, getRooms)
router.get('/:roomId/messages', getRoomMessages)
router.get('/:roomId/last', getLastMsg)

module.exports = router