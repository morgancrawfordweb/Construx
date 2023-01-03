const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


//This is for the user adds a project with some details.


const DocumentSchema = new mongoose.Schema({
fileName: {
    required: true,
    type: String,
},
description: {
    type: String,
},
project:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Project',
},
image: {
    type: String,
    require: true,
  },
cloudinaryId: {
    type: String,
    require: true,
  },
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},
createdAt: {
    default: Date.now(),
    type: Date,
},
uploadedById: {
  type: mongoose.Schema.Types.ObjectId,
  ref:"User",
},
uploadedBy:{
  type: String,
  ref:"User",
}
});

module.exports = mongoose.model("Document", DocumentSchema);

