const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const passport = require("passport-local")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


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

  //Creates the invitation for the user to join
  postInviteNewUser: async (req, res) => {
    try {

 
      const company = req.user;
      const newUser = req.body.newUserEmail;
  
      // Generate the JWT token
      const token = jwt.sign(
        { email: newUser, companyId: company.companyId },
        process.env.JWT_SECRET, // Store your secret in an environment variable
        { expiresIn: '6h' }
      );
  
      const signupUrl = `https://construx.herokuapp.com/invitedUserSignupPage`;
      // token=${token}
  
      //MAILGUN
      const formData = require('form-data');
      const Mailgun = require('mailgun.js');
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
      
      mg.messages.create("sandbox288a9b2cf2004aafacc08d3590a97d40.mailgun.org", {
        from: "Excited User <mailgun@sandbox288a9b2cf2004aafacc08d3590a97d40.mailgun.org>",
        to: [newUser],
        subject: "Come Join Me!",
        text: "Testing some Mailgun awesomeness!",
        html: `<h1>Come join me at ${signupUrl}</h1>`
      })
  
  
      res.render("companyProfile.ejs", { company: req.user });
    } catch (err) {
      console.log(err);
      res.render("companyProfile.ejs", { company: req.user });
    }
  },

    

  postSignupInvitedUser: async (req,res)=>{
      try{

        const { firstName, lastName, password, phoneNumber } = req.body;
        const companyId = req.params.companyId;
        const email = req.params.email;
        res.render
      }catch(err){
        console.log(err)
      }
    },
  

    //End of Module
  }