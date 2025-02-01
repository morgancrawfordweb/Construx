const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
  email: {
    type: String,
    ref: "User", 
  },  
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true
  },
  token: {
    type:String,
    required:true
  },
  expiresAt: {
    type: Date,
    required:true,
  },
  accepted:{
    type: Boolean,
    required: true
  }
});

module.exports = mongoose.model("Invite", InviteSchema);