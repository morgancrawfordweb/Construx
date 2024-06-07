const mongoose = require("mongoose")




const TaskSchema = new mongoose.Schema({
    taskDetail:{
        type: String,
        required: true
    },
    signature:[
        {
            initial:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            dateCompleted:{
                type: Date,
                default:Date.now(),
            }
        }
    ]
})


module.exports = mongoose.model("Task", TaskSchema);