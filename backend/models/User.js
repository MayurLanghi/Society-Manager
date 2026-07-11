const mongoose = require('mongoose')

const User = mongoose.model('user', {
    name: String,
    email: String,
    password: String,
    phone: String,
    role: { type: String, default: "resident" }, // admin, resident, guard
    flatNumber: String,
    isApproved: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
})

module.exports = User
