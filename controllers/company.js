const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");
const Invite = require ("../models/Invite");
const crypto = require('crypto')
const nodemailer = require("nodemailer")
const path = require('path')
const ejs = require('ejs')



module.exports = {
  getCompanyProfile: async (req, res) => {
      try {
          const employees = await User.find({company: req.user.company})
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
//   getInviteNewUser: async (req,res) => {



// },
// postInviteNewUser: async (req,res) => {

//   try {
//     const { email } = req.body;
//     const company = req.user_id; // Assume the logged-in user is associated with the company
//     console.log(company)

//     // Generate a secure token
//     const token = crypto.randomBytes(32).toString('hex');

//     // Set token expiration (e.g., 48 hours)
//     const expiresAt = Date.now() + 48;

//     // Save the invite to the database
//     await Invite.create({ token, companyId, email, expiresAt });

//     // Send the invite link to the user (e.g., via email)
//     const inviteLink = `${req.protocol}://${req.get('host')}/signup?token=${token}`;

//     nodemailer.createTransport({
//       host: "construx.herokuapp.com",
//       port: 'PORT',
//       secure: true,
//       auth:{
//         firstName: 'firstName',
//         lastName: 'lastName'
//       }
//     })

//     var message = {
//       from: `${company.companyEmail}`,
//       to: email,
//       subject: `You have been invited to join ${company.name}'s team!`,
//       text: `Click on the this link ${inviteLink} to be taken to this website to register your new user account`,
//       html: `Click on the this link ${inviteLink} to be taken to this website to register your new user account`,
//     };

//     // Use your preferred method to send the email containing the inviteLink
// let transport = nodemailer.createTransport(inviteLink)
//     res.status(200).send('Invite sent successfully.');
//   } catch (err) {
//     res.status(500).send('Error sending invite.');
//   }
// },
}