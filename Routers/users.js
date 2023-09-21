const express = require("express");
const userController = require("../Controllers/users");
const { veifyRequestes} = require("../Middlewares/jwt.auth");

const Router = express();
Router.post("/signup", userController.signupUser);
Router.post("/signin", userController.signinUser);
Router.get("/authenticating",userController.authentication);
Router.get("/notes", veifyRequestes, userController.getNotes);

Router.get("/addnote", veifyRequestes, userController.addNote);
Router.post("/updatenotsdesc/:id",veifyRequestes,userController.updateDesc);
Router.post("/updatenotstitle/:id", veifyRequestes, userController.updateTitle);
Router.delete("/deleteNote/:id", veifyRequestes, userController.deleteNote);
module.exports = Router;
