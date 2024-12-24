const mongoose = require('mongoose')
const { type } = require('os')

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    email:{
        type : String,
        required : true,
        unique : true
    },

    age :{
        type : Number,
        require : true
    },

    password :{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('User',userSchema)