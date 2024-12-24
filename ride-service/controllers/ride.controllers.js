const Ride  = require('../models/Ride')
const {subscribeToQueue,publishToQueue} = require('../services/rabbit')

module.exports.createRide = async(req,res)=>{
  const {pickup , destination} = req.body

  const newRide  = new Ride({
    pickup,
    destination,
    user : req.user._id
  })
  publishToQueue('new-Ride' , JSON.stringify(newRide))
  newRide.save()
  res.status(200).json({
    message : newRide
  })
}