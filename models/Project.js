const mongoose = require("mongoose");


//This is for the user adds a project with some details.

const ProjectSchema = new mongoose.Schema({
  projectName: { type: String, require: true},
  projectNumber: { type: String,  require: true},
  projectDescription: {type: String, require: true},
  projectAddress:{type: String},
  assignedEmployee: [{
     type: String,
    }],
  companyIdNumberId:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
  companyIdNumber:{type: String, ref:"User"},
  companyName:{type: mongoose.Schema.Types.ObjectId, ref:"Company"},
  user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
  employeeIdNumber:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  createdBy:{type: String, ref:"User"},
  createdById:{type: mongoose.Schema.Types.ObjectId, ref:"User"},
  taskSheet:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:"TaskSheet"
  }

  //!progress tracker for the schema.
  //!maybe get each TD and a name to follow or something
  // progressTracker:[{
  //   type: String,
  // }]
  
});


module.exports = mongoose.model("Project", ProjectSchema);