const Parking = require('../models/Parking')

const getSlots = (req, res) => {
    Parking.find()
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addSlot = async (req, res) => {
    try {
        const p = new Parking(req.body)
        const data = await p.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const assignSlot = (req, res) => {
    const { flatNumber, vehicleNumber } = req.body
    Parking.findByIdAndUpdate(req.params.id, { isOccupied: true, flatNumber, vehicleNumber }, { new: true })
        .then(data => res.send(data))
}

const releaseSlot = (req, res) => {
    Parking.findByIdAndUpdate(req.params.id, { isOccupied: false, flatNumber: "", vehicleNumber: "" }, { new: true })
        .then(data => res.send(data))
}

module.exports = { getSlots, addSlot, assignSlot, releaseSlot }
