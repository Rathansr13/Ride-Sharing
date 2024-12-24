const express = require('express')

const app = express()

const dotenv  = require('dotenv')
dotenv.config()

const cookieParser = require('cookie-parser')

const db = require('./config/db')
const rabbitMq = require('./services/rabbit')
const captainRoute= require('./routes/captain.route')

rabbitMq.connect()
db()

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use('/api',captainRoute)


module.exports = app