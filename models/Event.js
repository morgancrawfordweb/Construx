const mongoose = require("mongoose");



// THis is to specifically add in the events in a makeshift calendar. Date picker, with the description of the event you have, then sort them all by the closest date entered.
const EventSchema = new mongoose.Schema({
    title:{
      type: String,
      required: true 
    },
    eventType:[{
      eventName:{
        type:String,
        required:true
      }
    }],
    date:{
      type:Date,
      required:true
    },
    emergency:{
      type:Boolean,
      default:false,
      required:true
    },
    dateSubmitted:{
      type:Date,
      default:Date.now(),
      required:true
    }
    
})


module.exports = mongoose.model("Event", EventSchema)