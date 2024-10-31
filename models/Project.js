const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//This is for the user adds a project with some details.

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, require: true},
  projectNumber: { type: String,  require: true},
  projectDescription: {type: String, require: true},
  projectAddress:{type: String},
  assignedEmployee: [{
     type: String,
    }],
    

  // organizationId:{type: mongoose.Schema.Types.ObjectId, ref:"Organization"},
  // companyName:{type: mongoose.Schema.Types.ObjectId, ref:"Organization"},


  organizationId:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  organization:{type: mongoose.Schema.Types.ObjectId, ref:"Organization"},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  template:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"Template"
  },
  progressTracker:{
    type: Number,
    ref:'Template'
  },
  // currentWeather:{

  // }
  
});




module.exports = mongoose.model("Project", ProjectSchema);