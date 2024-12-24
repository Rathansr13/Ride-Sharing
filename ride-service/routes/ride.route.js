const express = require('express')

const router = express.Router()

const userAuth = require('../middlewares/authMiddlewares')
const rideController = require('../controllers/ride.controllers')


router.post('/create-ride' ,userAuth,rideController.createRide)

module.exports = router