const Payment = require('../models/Payment')
const Maintenance = require('../models/Maintenance')

const getPayments = (req, res) => {
    let filter = {}
    if (req.userRole === "resident") {
        filter.residentId = req.userId
    }
    Payment.find(filter)
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addPayment = async (req, res) => {
    try {
        const { maintenanceId, amount, method } = req.body
        const p = new Payment({ maintenanceId, amount, method, residentId: req.userId })
        const data = await p.save()

        await Maintenance.findByIdAndUpdate(maintenanceId, { status: "paid" })

        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

module.exports = { getPayments, addPayment }
