const express = require('express');
const router = express.Router();
const {createPaymentForm, paymentCallback, paymentStatus} = require('../controllers/paymentController');
const authenticate = require('../middleware/JWT')


router.post('/toggle_status', authenticate, paymentStatus);
router.post('/create_payment', createPaymentForm);
router.post('/callback', paymentCallback);

module.exports = router;
