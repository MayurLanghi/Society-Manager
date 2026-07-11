const mongoose = require('mongoose')

const Payment = mongoose.model('payment', {
    maintenanceId: String,
    residentId: String,
    amount: Number,
    method: { type: String, default: "upi" },
    paidAt: { type: Date, default: Date.now }
})

module.exports = Payment
