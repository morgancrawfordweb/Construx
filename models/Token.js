//This is to hold onto the tokens that JWT produces for Email sign-ups

const mongoose = require("mongoose")


const TokenSchema = new mongoose.Schema({
    
    date:{type:Date}
})

module.exports = mongoose.model("Token", TokenSchema)