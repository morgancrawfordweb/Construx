const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  title: { 
    type: String,
    required: true,
    },
  image: {
    type: String,
  },
  cloudinaryId: {
    type: String,
    require: true,
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project"
  },
  createdAt:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Document", DocumentSchema);

