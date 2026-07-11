const Poll = require('../models/Poll')

const getPolls = (req, res) => {
    Poll.find()
    .then(data => res.send(data))
    .catch(err => console.error(err))
}

const addPoll = async (req, res) => {
    try {
        const { question, options, deadline } = req.body
        const formattedOptions = options.map(text => ({ text, votes: [] }))
        const poll = new Poll({ question, options: formattedOptions, deadline })
        const data = await poll.save()
        res.send(data)
    } catch (err) {
        res.send("error " + err.message)
    }
}

const vote = async (req, res) => {
    try {
        const poll = await Poll.findById(req.params.id)
        const option = poll.options.id(req.body.optionId)

        const alreadyVoted = option.votes.includes(req.userId)
        if (alreadyVoted) {
            return res.send("You already voted")
        }

        option.votes.push(req.userId)
        await poll.save()
        res.send("Vote recorded")
    } catch (err) {
        res.send("error " + err.message)
    }
}

module.exports = { getPolls, addPoll, vote }
