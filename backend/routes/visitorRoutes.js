const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getVisitors, addVisitor, approveVisitor, checkoutVisitor } = require('../controllers/visitorController')

router.get('/', checkLogin, getVisitors)
router.post('/', checkLogin, addVisitor)
router.put('/:id/approve', checkLogin, approveVisitor)
router.put('/:id/checkout', checkLogin, checkoutVisitor)

module.exports = router
