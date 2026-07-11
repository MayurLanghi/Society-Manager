const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    try {
        console.log("Register data:", req.body)
        const { name, email, password, phone, flatNumber } = req.body

        const existing = await User.findOne({ email })
        if (existing) {
            return res.send("Email already registered")
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = new User({
            name, email, phone, flatNumber,
            password: hashedPassword,
            role: "resident",
            isApproved: false
        })
        const data = await newUser.save()
        res.send({ message: "Registered! Wait for admin approval.", id: data._id })
    } catch (err) {
        res.send("error " + err.message)
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if (!user) {
            return res.send("Wrong email or password")
        }

        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.send("Wrong email or password")
        }

        if (user.role === "resident" && !user.isApproved) {
            return res.send("Your account is waiting for admin approval")
        }

        const token = jwt.sign(
            { id: user._id, role: user.role, flatNumber: user.flatNumber },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        )

        res.send({
            token,
            name: user.name,
            role: user.role,
            flatNumber: user.flatNumber,
            _id: user._id
        })
    } catch (err) {
        res.send("error " + err.message)
    }
}

module.exports = { register, login }
