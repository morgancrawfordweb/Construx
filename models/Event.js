const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
    title:{
      type: String
    },
    projectNumber:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectNumber"
    },
    employee:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"UserName"
    },
    start:{
      type:Date,
    },
    end:{
      type:Date
    }
    
})


module.exports = mongoose.model("Event", EventSchema)