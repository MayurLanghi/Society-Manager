const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getBills, addBill, markPaid } = require('../controllers/maintenanceController')

router.get('/', checkLogin, getBills)
router.post('/', checkLogin, addBill)
router.put('/:id/pay', checkLogin, markPaid)

module.exports = router
