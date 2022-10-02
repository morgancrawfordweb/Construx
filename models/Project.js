const mongoose = require("mongoose");


//This is for the user adds a project with some details.

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, require: true },
  projectNumber: { type: String,  require: true, unique: true },
  projectDescription: {type: String, require: true },
  assignedEmployee: { type: String, require: true },
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
});


module.exports = mongoose.model("Project", ProjectSchema);