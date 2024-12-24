const express = require('express')

const router = express.Router()

const captainController = require('../controllers/captain.controllers')

const verifyToken = require('../middlewares/authMiddlewares')

router.get('/', verifyToken , captainController.profile)
router.post('/register', captainController.register)
router.post('/login', captainController.login)
router.patch('/toggle-availability' , verifyToken ,captainController.toggleAvailability)
router.get('/new-ride',captainController.listenForRides)

module.exports = router