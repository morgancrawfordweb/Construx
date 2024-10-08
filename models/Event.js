const mongoose = require("mongoose");


const EventSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true 
    },
    projectNumber:{
      type: String,
    },
    employee:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    start:{
      type:Date
    },
    end:{
      type:Date
    }
    
})


module.exports = mongoose.model("Event", EventSchema)