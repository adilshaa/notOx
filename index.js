const express = require("express");

const app = express();

const mongoose = require("mongoose");

const cors = require("cors");
const UserRouter = require("./Routers/users");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
mongoose
  .connect("mongodb://0.0.0.0:27017/notox")
  .then((res) => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

app.use("/user", UserRouter);

app.listen(3000, () => {
  console.log("Server connected" + "  " + 3000);
});

module.exports = app;
