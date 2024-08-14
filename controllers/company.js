const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");



module.exports = {
  getCompanyProfile: async (req, res) => {
      try {
          const employees = await User.find({companyId: req.user.companyId})
        res.render("companyProfile.ejs", { company: req.user, employees:employees });
      } catch (err) {
        console.log(err);
      }
    },
    getSubscriptionPage: async (req,res) => {
      try{
          // const user = await User.findOne({})
          // const company = await Company.findOne({_id: req.params.id})
          

          res.render("subscription.ejs", {company: req.user})

      }catch(err){
          console.log(err)
      }
  },
    
  
  }