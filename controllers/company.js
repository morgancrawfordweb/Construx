const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const passport = require("passport-local")


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
  postInviteNewUser: async (req, res) => {
    try {

      
      // // Use MailerToGo SMTP or your chosen SMTP provider details
      // let mailertogo_host = process.env.MAILERTOGO_SMTP_HOST;
      // let mailertogo_port = process.env.MAILERTOGO_SMTP_PORT || 2120; // Default mail port
      // let mailertogo_user = process.env.MAILERTOGO_SMTP_USER;
      // let mailertogo_password = process.env.MAILERTOGO_SMTP_PASSWORD;
      // let mailertogo_domain = process.env.MAILERTOGO_DOMAIN || "construx.herokuapp.com";
  
      // Set up the transporter using your custom SMTP service
      const formData = require('form-data');
      const Mailgun = require('mailgun.js');
      const mailgun = new Mailgun(formData);
      const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY || 'pubkey-b2e3f6f29ea771b6e6c2651fb7801fc9'});
      
      mg.messages.create('sandbox-123.mailgun.org', {
        from: `${company.companyEmail}`, // Must match your domain
        to: newUser,
        subject: "Invitation to Join Construx",
        text: `You're invited to join Construx! Click the link to sign up: ${signupUrl}`,
        html: `
          <h3>You're Invited to Join Construx</h3>
          <p>Click the link below to complete your signup process:</p>
          <a href="${signupUrl}">Sign Up</a>
        `,
      })
      .then(msg => console.log(msg)) // logs response data
      .catch(err => console.log(err)); // logs any error
  
      const company = req.user;
      const newUser = req.body.newUserEmail;
  
      // Generate the JWT token
      const token = jwt.sign(
        { email: newUser, companyId: req.user.companyId },
        process.env.JWT_SECRET, // Store your secret in an environment variable
        { expiresIn: '6h' }
      );
  
      const signupUrl = `https://construx.herokuapp.com/signup?token=${token}`;
  
      // Mail content
      let mailOptions = {
        from: `${company.companyEmail}`, // Must match your domain
        to: newUser,
        subject: "Invitation to Join Construx",
        text: `You're invited to join Construx! Click the link to sign up: ${signupUrl}`,
        html: `
          <h3>You're Invited to Join Construx</h3>
          <p>Click the link below to complete your signup process:</p>
          <a href="${signupUrl}">Sign Up</a>
        `,
      };
  
      // Send the email
      // let info = await transporter.sendMail(mailOptions);
      // console.log('Email sent: ' + info.response);
  
      res.render("companyProfile.ejs", { company: req.user });
    } catch (err) {
      console.log(err);
      res.render("companyProfile.ejs", { company: req.user });
    }
  },
    

    postRegisterNewUser: async (req,res)=>{
      try{

        const { firstName, lastName, password, phoneNumber } = req.body;
        const companyId = req.params.companyId;
        const email = req.params.email;

      }catch(err){
        console.log(err)
      }
    },

    //End of Module
  }