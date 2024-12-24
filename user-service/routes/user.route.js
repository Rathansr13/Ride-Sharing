const express = require('express')

const router = express.Router()

const userController = require('../controllers/user.controllers')

const verifyToken = require('../middlewares/authMiddlewares')

router.get('/', verifyToken ,userController.profile)
router.post('/register',userController.register)
router.post('/login',userController.login)

module.exports = router