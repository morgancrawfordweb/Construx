const mongoose = require("mongoose");



// THis is to specifically add in the events in a makeshift calendar. Date picker, with the description of the event you have, then sort them all by the closest date entered.
const EventSchema = new mongoose.Schema({

  // Optional if you want to add extra descriptions inside of the event.
    eventDescription:{
      type: String, 
    },
    //*Organization creates what type of events they want to hold/be called. "Meeting", "Standup","Party"//
    eventType:{
        type:String,
        required:true,
    },
    //*Date of the event taking place
    date:{
      type:Date,
      required:true
    },
    emergency:{
      type:Boolean,
      default:false,
    },
    dateSubmitted:{
      type:Date,
      default:Date.now(),
      required:true
    },
    submittedBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:'User',
    },
    project:{
      type: mongoose.Schema.Types.ObjectId, 
      ref:"Project",
    },
    organization:{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Organization",
    }
})


module.exports = mongoose.model("Event", EventSchema)