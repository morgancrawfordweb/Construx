const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");


module.exports = {
    getCompanyProfile: async (req, res) => {
      try {
        const companies = await Company.find({ company: req.company.id});
        res.render("companyProfile.ejs", {companies: companies });
      } catch (err) {
        console.log(err);
      }
    }}