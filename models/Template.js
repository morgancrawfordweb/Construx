const mongoose = require("mongoose")
const bcrypt = require("bcrypt");


//this is a schema to act as an activity tracker. The calendar is still seperate. The project will be imported
const TemplateSchema = new mongoose.Schema({
    //example - Grading Inspection Checklist
    templateName:{
        type:String,
        required:true,
    },
    //example - project >[location,location, . . .] will be used when generating a checklist from the tempate.
    //Grading Inspection Checklist: location:39, location:12 . . .
    location:{
        type:String,
    },

    //Create taskDetail immediately when creating a task.
    tasks: [{
            //Task detail is the name of the task that needs to be taken care of
        taskDetail: {
            type: String,  
            required: true,
        },
        reference:{
            type: String,
        },
        //Signature of the person who completed it pulled from my UserId.name.trim()
        signature: [{
            initial: {
                type: String,
                ref: "User",
            },
            //The day that the person completed it. 
            dateCompleted: {
                type: Date,
                default: Date.now(),
            },
        }],
        
        //The template that the task is related to.
        template: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Template",
        },
    }],
    //when the template is generated we need a way to grab the params on the project and add that to them. This way checklists stay per project.
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        Ref: "Project",
    },
    projectName:{
        type: String,
        ref: "Project"
    },
    //whoever created the checklist, only other users that share a companyId can see the checklists
    companyId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"Company",
    },
    //The user who created the checklist
    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref:"User",
    },
    //This will check and see if it is an original. We set original to true with not putting in a location. When there is no location, it is set as an original.
    isOriginal:{
        type: Boolean,
    },
    progressTracker:{
        type:Number,
    }


})

  



module.exports = mongoose.model("Template", TemplateSchema);

