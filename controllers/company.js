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
    
  
  }