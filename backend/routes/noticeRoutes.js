const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getNotices, addNotice, deleteNotice } = require('../controllers/noticeController')

router.get('/', checkLogin, getNotices)
router.post('/', checkLogin, addNotice)
router.delete('/:id', checkLogin, deleteNotice)

module.exports = router
