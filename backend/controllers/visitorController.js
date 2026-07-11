const Visitor = require('../models/Visitor')

const getVisitors = (req, res) => {
    // residents should only see visitors coming to their own flat
    let filter = {}
    if (req.userRole === "resident") {
        filter.flatToVisit = req.flatNumber
    }
    Visitor.find(filter)
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addVisitor = async (req, res) => {
    try {
        console.log("New visitor:", req.body)
        const v = new Visitor(req.body)
        const data = await v.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const approveVisitor = (req, res) => {
    Visitor.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true })
        .then(data => res.send(data))
}

const checkoutVisitor = (req, res) => {
    Visitor.findByIdAndUpdate(req.params.id, { status: "checked_out", checkOutTime: new Date() }, { new: true })
        .then(data => res.send(data))
}

module.exports = { getVisitors, addVisitor, approveVisitor, checkoutVisitor }
