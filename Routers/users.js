const express = require('express')
const userController = require('../Controllers/users')

const Router = express()

Router.post('/signup', userController.signupUser)

module.exports=Router