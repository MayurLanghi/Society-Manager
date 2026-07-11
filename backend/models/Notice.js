const mongoose = require('mongoose')

const Notice = mongoose.model('notice', {
    title: String,
    content: String,
    priority: { type: String, default: "medium" },
    postedBy: String
})

module.exports = Notice
