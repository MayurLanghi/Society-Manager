const Notice = require('../models/Notice')

const getNotices = (req, res) => {
    Notice.find()
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addNotice = async (req, res) => {
    try {
        const n = new Notice({ ...req.body, postedBy: req.userId })
        const data = await n.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const deleteNotice = (req, res) => {
    Notice.findByIdAndDelete(req.params.id)
    .then(() => res.send("Deleted Successfully"))
}

module.exports = { getNotices, addNotice, deleteNotice }
