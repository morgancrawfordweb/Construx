const mongoose = require("mongoose");


const WorkDaySchema = new mongoose.Schema({
    projectName:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectName"
    },
    projectNumber:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectNumber"
    },
    assignedEmployee: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "AssignedEmployee"
    },
    scheduledWorkDay:{
      type: Date,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    
})


module.exports = mongoose.model("WorkDay", WorkDaySchema)