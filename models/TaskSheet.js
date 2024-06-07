const mongoose = require("mongoose")
const TaskSchema = require('../models/Task').schema

//this is a schema to act as an activity tracker. The calendar is still seperate. The project will be imported
const TaskSheetSchema = new mongoose.Schema({
    //example - Grading Inspection
    templateName:{
        type:String,
        required:true
    },
    //example - project >[location,location, . . .]
    location:{
        type:String,
    },
    tasks: 
            [TaskSchema]
    ,
    //this will keep the tasks seperated by projectID
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        Ref: "Project"
    },
    companyIdNumber:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User"
    },


})

module.exports = mongoose.model("TaskSheet", TaskSheetSchema);