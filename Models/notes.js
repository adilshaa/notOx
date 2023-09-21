const mongoose = require("mongoose");

const noteModel = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  points: {
    type: String,
  },
  date: {
    type: Date,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

const Note = mongoose.model("note", noteModel);
module.exports = Note;
