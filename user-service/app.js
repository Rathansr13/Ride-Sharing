const express = require('express')

const app = express()

const dotenv  = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')

const db = require('./config/db')
const rabbitMq  = require('./services/rabbit')
const userRoute = require('./routes/user.route')

db()
rabbitMq.connect()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api',userRoute)


module.exports = app