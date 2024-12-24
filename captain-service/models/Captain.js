const mongoose = require('mongoose')
const { type } = require('os')
const { isArrayBufferView } = require('util/types')

const captainSchema = new mongoose.Schema({
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
    },

    isAvailable :{
        type : Boolean,
        default : false
    }
})

module.exports = mongoose.model('Captain',captainSchema)