const mongoose = require('mongoose')

const Poll = mongoose.model('poll', {
    question: String,
    options: [{ text: String, votes: [String] }], // votes = array of userIds
    deadline: Date,
    isActive: { type: Boolean, default: true }
})

module.exports = Poll
