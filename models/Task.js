// const mongoose = require("mongoose")

// const TaskSchema = new mongoose.Schema({
//     taskDetail:{
//         type: Array,
//     },
//     signature:[
//         {
//             initial:{
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "User"
//             },
//             dateCompleted:{
//                 type: Date,
//                 default:Date.now(),
//             }
//         }
//     ],
//     taskSheet:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"Tasksheet"
//     },
// })


// module.exports = mongoose.model("Task", TaskSchema);