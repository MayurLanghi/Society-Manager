const mongoose = require('mongoose')

const Parking = mongoose.model('parking', {
    slotNumber: String,
    type: { type: String, default: "four_wheeler" },
    isOccupied: { type: Boolean, default: false },
    flatNumber: String,
    vehicleNumber: String
})

module.exports = Parking
