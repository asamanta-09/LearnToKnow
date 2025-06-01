const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  title:{
    type:String,
    required:true,
  },
  image:{
    type:String,
  },
  pdf: {
    type: String,
    required: true,
  },
});

const Notes = mongoose.model("Notes", NoteSchema);
module.exports = Notes;
