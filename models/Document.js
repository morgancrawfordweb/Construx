const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


//This is for the user adds a project with some details.

const DocumentSchema = new mongoose.Schema({
  documentName: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    require: true,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
});


module.exports = mongoose.model("Document", DocumentSchema);

