const express = require("express");

const app = express();

const mongoose = require("mongoose");
const UserRouter = require("./Routers/users");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://adilsha:Ou18gIWTNdwWvesz@cluster0.zxfop6m.mongodb.net/notox"
  )
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.use("/user", UserRouter);

app.listen(3000, () => {
  console.log("Server connected" + "  " + 3000);
});


module.exports = app;
