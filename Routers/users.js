const express = require('express')
const userController = require('../Controllers/users')

const Router = express()

Router.post('/signup', userController.signupUser)
Router.post('/signin', userController.signinUser)
Router.post("/addnote", userController.addNote);
Router.get("/notes", userController.getNotes);

Router.post("/editnote", userController.editNote);

module.exports=Router