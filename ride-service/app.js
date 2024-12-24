const express = require('express')

const app = express()

const dotenv  = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')
const db = require('./config/db')
db()

const rabbitMq  = require('./services/rabbit')
rabbitMq.connect()
const rideRoute = require('./routes/ride.route')

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api',rideRoute)


module.exports = app