const mongoose = require("mongoose")


//this is a schema to act as an activity tracker. The calendar is still seperate. The project will be imported
const TaskSheetSchema = new mongoose.Schema({
    templateName:{
        type:String,
        required:true,
    },
    taskName:{
            task:{
                type: String,
                required: true
            },
            signature:[
                {
                    initial:{
                        type: String,
                    },
                    dateCompleted:{
                        type: Date,
                        required:true,
                        default:Date.now(),
                    }
                }
            ],
    },
    //this will keep the tasks seperated by projectID
    project: {
        type: mongoose.Schema.Types.ObjectId, 
        Ref: "Project"
    },
})

module.exports = mongoose.model("TaskSheet", TaskSheetSchema);