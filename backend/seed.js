require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const connectDB = require('./config/db')
const User = require('./models/User')

connectDB()

bcrypt.hash("Admin@123", 10)
.then(hashed => {
    const admin = new User({
        name: "Society Admin",
        email: "admin@society.com",
        password: hashed,
        phone: "9999999999",
        role: "admin",
        isApproved: true
    })
    return admin.save()
})
.then(() => {
    console.log("Admin created! Login with admin@society.com / Admin@123")
    process.exit(0)
})
.catch(err => {
    console.log("error", err.message)
    process.exit(1)
})
