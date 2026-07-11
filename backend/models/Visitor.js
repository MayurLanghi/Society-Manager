const mongoose = require('mongoose')

const Visitor = mongoose.model('visitor', {
    name: String,
    phone: String,
    purpose: { type: String, default: "guest" },
    flatToVisit: String,
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: Date,
    status: { type: String, default: "pending" } 
})

module.exports = Visitor
