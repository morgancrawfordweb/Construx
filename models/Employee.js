const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  userName: {
    type: String,
    ref: "User", 
  },  
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  added: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);