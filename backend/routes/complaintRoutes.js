const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getComplaints, addComplaint, updateStatus } = require('../controllers/complaintController')

router.get('/', checkLogin, getComplaints)
router.post('/', checkLogin, addComplaint)
router.put('/:id/status', checkLogin, updateStatus)

module.exports = router
