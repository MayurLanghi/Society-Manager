const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getUsers, approveUser, setUserStatus } = require('../controllers/userController')

router.get('/', checkLogin, getUsers)
router.put('/:id/approve', checkLogin, approveUser)
router.put('/:id/status', checkLogin, setUserStatus)

module.exports = router
