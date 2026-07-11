const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const PORT = process.env.PORT || 3005

app.use(express.json())   //Middleware
app.use(cors())

connectDB()

app.get("/",(req,res)=>{
    res.send("Welcome to Society Management API")
})

app.use('/auth', require('./routes/authRoutes'))
app.use('/users', require('./routes/userRoutes'))
app.use('/visitors', require('./routes/visitorRoutes'))
app.use('/maintenance', require('./routes/maintenanceRoutes'))
app.use('/parking', require('./routes/parkingRoutes'))
app.use('/notices', require('./routes/noticeRoutes'))
app.use('/complaints', require('./routes/complaintRoutes'))
app.use('/payments', require('./routes/paymentRoutes'))
app.use('/polls', require('./routes/pollRoutes'))

app.listen(PORT,()=>{
    console.log(`Society Management backend running on ${PORT}`)
})
