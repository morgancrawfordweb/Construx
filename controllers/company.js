const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");



module.exports = {
  getCompanyProfile: async (req, res) => {
      try {
        const projects = await Project.find({ user: req.user.id}); //req ? {do this... check user ? {do this... check .id}}
        
        
        res.render("companyProfile.ejs", { projects:projects, company: req.company });
      } catch (err) {
        console.log(err);
      }
    },
  
  }