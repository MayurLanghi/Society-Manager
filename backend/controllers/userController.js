const User = require('../models/User')

const getUsers = (req, res) => {
    User.find()
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const approveUser = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true })
        .then(data => res.send(data))
}

const setUserStatus = (req, res) => {
    User.findByIdAndUpdate(req.params.id, { isActive: req.body.isActive }, { new: true })
        .then(data => res.send(data))
}

module.exports = { getUsers, approveUser, setUserStatus }
