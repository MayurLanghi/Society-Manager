const Maintenance = require('../models/Maintenance')

const getBills = (req, res) => {
    let filter = {}
    if (req.userRole === "resident") {
        filter.residentId = req.userId
    }
    Maintenance.find(filter)
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addBill = async (req, res) => {
    try {
        const m = new Maintenance(req.body)
        const data = await m.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const markPaid = (req, res) => {
    Maintenance.findByIdAndUpdate(req.params.id, { status: "paid" }, { new: true })
        .then(data => res.send(data))
}

module.exports = { getBills, addBill, markPaid }
