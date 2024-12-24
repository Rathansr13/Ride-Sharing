const express = require('express')
const app = express()
const cors = require('cors')
const proxy = require('express-http-proxy')

app.use(cors())
app.use(express.json())

app.use('/user',proxy('http://localhost:3001'))
app.use('/captain',proxy('http://localhost:3002'))
app.use('/ride', proxy('http://localhost:3005'))


app.get('/' , ()=>{
    console.log("Gateway server running")
})

app.listen(8000,()=>{
    console.log("Server running at 8000")
})