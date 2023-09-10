const mongoose = require("mongoose");

const noteModel = new mongoose.Schema({
  title: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  points: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
  },
  userd: {
    // type: mongoose.Schema.Types.ObjectId,
    type:Number,
  },
});

const Note = mongoose.model("note", noteModel);
module.exports = Note;
