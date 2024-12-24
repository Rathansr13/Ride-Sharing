const mongoose = require('mongoose')

function connect(){
    
 mongoose.connect(process.env.MONGO_URL).then( ()=>{
    console.log("connected to db")
 }).catch((err)=>{
   console.log(err)
    console.log("Failed to connect db")
 })
}


module.exports = connect