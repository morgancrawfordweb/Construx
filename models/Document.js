const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


//This is for the user adds a project with some details.


const DocumentSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    },
  image: {
    type: String,
    required:true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Document", DocumentSchema);

