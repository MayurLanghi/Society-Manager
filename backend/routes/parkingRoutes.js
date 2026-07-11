const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getSlots, addSlot, assignSlot, releaseSlot } = require('../controllers/parkingController')

router.get('/', checkLogin, getSlots)
router.post('/', checkLogin, addSlot)
router.put('/:id/assign', checkLogin, assignSlot)
router.put('/:id/release', checkLogin, releaseSlot)

module.exports = router
