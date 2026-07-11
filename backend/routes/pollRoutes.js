const express = require('express')
const router = express.Router()
const checkLogin = require('../middleware/auth')
const { getPolls, addPoll, vote } = require('../controllers/pollController')

router.get('/', checkLogin, getPolls)
router.post('/', checkLogin, addPoll)
router.put('/:id/vote', checkLogin, vote)

module.exports = router
