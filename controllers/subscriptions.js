const User = require("../models/User")
const Company = require("../models/Company");
const Project = require("../models/Project");
// const stripe = require("stripe")

module.exports = {
    getSubscriptionPage: async (req,res) => {
        try{
            // const user = await User.findOne({})
            // const company = await Company.findOne({_id: req.params.id})
            

            // res.render("subscription.ejs", {company: req.company, user: user})

        }catch(err){
            console.log(err)
        }
    },
    subscribeToTier: async (req,res) => {

        // const stripe = 
    }

};