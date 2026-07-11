const mongoose = require('mongoose')

const Maintenance = mongoose.model('maintenance', {
    flatNumber: String,
    residentId: String,
    month: Number,
    year: Number,
    amount: Number,
    dueDate: Date,
    status: { type: String, default: "pending" } // pending, paid
})

module.exports = Maintenance
