const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


//This is for the user adds a project with some details.

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, unique: true },
  projectNumber: { type: String, unique: true },
  cloudinaryId: {type: String, unique: true },
  projectDocument: {type: String, require: true},
  projectDescription: {type: String, require: true},
  assignedEmployee: { type: String, require: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});


module.exports = mongoose.model("Project", ProjectSchema);