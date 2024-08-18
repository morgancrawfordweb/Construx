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
    

  // companyId:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
  // companyName:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},


  companyId:{type: String, ref:"User"},
  company:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
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