const mongoose = require("mongoose");

//I want the user to be able to upload templates of a document and then re-create those as other documents that get loaded onto the web application.

const TemplateSchema = new mongoose.Schema({
    name: {
        type: String
    },
    location:{
        type: String,
    },
    image: {
        type: String,
        require: true,
    },
    cloudinaryId: {
        type: String,
        require: true,
    },
    //ability to see every other company doc like we can with the projects.
    companyIdNumber:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    //attaching it to the project
    project:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Project"
    }
    
});


module.exports = mongoose.model("Template", TemplateSchema);