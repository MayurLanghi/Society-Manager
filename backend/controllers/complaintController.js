const Complaint = require('../models/Complaint')

const getComplaints = (req, res) => {
    let filter = {}
    if (req.userRole === "resident") {
        filter.raisedById = req.userId
    }
    Complaint.find(filter)
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addComplaint = async (req, res) => {
    try {
        const c = new Complaint({ ...req.body, flatNumber: req.flatNumber, raisedById: req.userId })
        const data = await c.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const updateStatus = (req, res) => {
    Complaint.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        .then(data => res.send(data))
}

module.exports = { getComplaints, addComplaint, updateStatus }
