const mongoose = require('mongoose')

const Complaint = mongoose.model('complaint', {
    title: String,
    description: String,
    category: { type: String, default: "other" },
    flatNumber: String,
    raisedById: String,
    status: { type: String, default: "open" } // open, in_progress, resolved
})

module.exports = Complaint
