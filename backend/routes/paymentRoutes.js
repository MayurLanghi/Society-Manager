const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getPayments, addPayment } = require('../controllers/paymentController')

router.get('/', checkLogin, getPayments)
router.post('/', checkLogin, addPayment)

module.exports = router
