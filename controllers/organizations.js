const User = require("../models/User");
const Organization = require("../models/Organization");
const Template = require("../models/Template");
const Project = require("../models/Project")
const Document = require("../models/Document");
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const passport = require("passport-local")

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });


module.exports = {

  //used to be projects
  getOrganizationProfile: async (req, res) => {
    try {
      const user = await User.findOne({_id: req.user._id});
      const organizationId = req.params.organizationId
      const organization = await Organization.findById(organizationId).lean()
      const userEmails = organization.users.map(users => users.email)
      const templates = await Template.find({organization: organizationId}).sort({ createdAt: "desc" }).lean();
      const projects = await Project.find({organization: organizationId}).sort({ createdAt: "desc" }).lean();
      const users = await User.find({ email: { $in: userEmails } }).select('firstName lastName email role').lean();


      //TODO Need to create a "Check the user if they are in the organization, if they aren't dont render and give a 404 where the org cant be found or 500 error where it cant be rendered."
      //TODO I'm able to use the URL to go to organizations that i may not be involved in.

      //?if users.contains(user)
      console.log(users.includes(user._id))
      console.log('users',users)
      console.log('user',user)

      res.render("organizationProfile.ejs", {  organizationId: organizationId, organization: organization, user: req.user, userEmails: userEmails, projects: projects, templates: templates, users: users });

    } catch (err) {
      console.log(err);
    }
  },
    getSubscriptionPage: async (req,res) => {
      try{
          // const user = await User.findOne({})
          // const organization = await Organization.findOne({_id: req.params.id})
          

          res.render("subscription.ejs", {organization: req.user})

      }catch(err){
          console.log(err)
      }
  },

  //Creates the invitation for the user to join. Add a user to your organization and give them "user" permissions.
  postInviteNewUser: async (req, res) => {
    try {
      //TODO I need to check and see if a user's email exists in the database, if it does then run the function and compare the checkEmail with the newUser, if not return an error that says " This users email does not exist "
      const newUserEmail = req.body.newUserEmail;
      const organizationId = req.params.organizationId
      const userId = req.params.id

      // const user = await User.findOne({_id: req.user_id})
      const organization = await Organization.findById(organizationId) 
      // const newUserId = await User.findOne({_id: newUserEmail})
      const existingUser = await User.findOne({email: newUserEmail})

    // const existingUserId = existingUser._id

      //Users have a network. here is the 

    if (!organizationId) {
      console.log(organizationId)
      console.log(`/organization/"${organizationId}`)
      return res.status(404).send("No organization found");
    }

        // Ensure the organization.users array exists
        organization.users = organization.users || [];
        // Check if the email already exists in the organization
        const existingUserInOrg = organization.users.find(user => user.email === newUserEmail);
        const newUserId = existingUser ? existingUser._id : null;
        // const addToUser = users.network.find(network=>{
        // })
        // const checkInUser = users
        //!Prevents you from adding a user that has not been created yet.
        if (existingUserInOrg) {
          console.log("existingUserInOrg", existingUser)
          return res.status(400).send(`User with ${newUserEmail} is already part of the organization.`);

        }else if(!existingUser){
          console.log("Checking for existing user", "organizationUserId", newUserId)
          return res.status(404).send(`User with ${newUserEmail} does not exist yet`)
        }
        console.log("existingUser",existingUser)
    // Add the new user email to the organization
    organization.users.push({ 
      userId: existingUser._id,
      email: newUserEmail, 
      role: 'user' 
    });

    existingUser.network.push({
      organizationId: organization,
      organizationName: organization.organizationName,
      roles: 'user',
    })
    await organization.save();
    await existingUser.save();
    

      //!Saving all of the above just incase

      // const addNewUser = await Organization.findOneAndUpdate({
      //       {"users": newUser}
      // })
  
      

      // res.render("organizationProfile.ejs", {  organizationId: organizationId, organization: organization, employees: employees, projects: projects, templates: templates, });
      res.redirect(`/organization/${organizationId}`);
    } catch (err) {
      console.log(err);
      res.status(500).send("An error occured.");
    }
  },

    

  // postSignupInvitedUser: async (req,res)=>{
  //     try{

  //       const { firstName, lastName, password, phoneNumber } = req.body;
  //       const organizationId = req.params.organizationId;
  //       const email = req.params.email;
  //       res.render
  //     }catch(err){
  //       console.log(err)
  //     }
  //   },


    //Going to grab all of the organizations that are IN YOUR NETWORK. THINGS YOU OWN AND DONT OWN
    getNetworkProfile: async (req, res) => {
      try {

        
        const user = await User.findById(req.user.id).lean()
        const organizations = await Organization.find({ createdBy: req.user._id});

        const organizationId = user.network.map((organization) => organization.organizationId);

        // const network = user.network
        const myNetwork = await Organization.find({
          _id: { $in: organizationId },
        }).lean();
        // const test = user.myNetwork.forEach(network=>{
        //   console.log(network.organizationName)
        // })

        // const emailWithOrganization = await Organization.find({ users: users }).lean();
 
   
        //* I need a way to check the organization and look at the users. Then if the user in the array matches yours, then render your organization
        
        //req ? {do this... check user ? {do this... check .id}}
        // const event = await Event.find({user: req.user.id})
        // const coworkers = await User.find({organizationId: req.user.organizationId});
        // console.log("inNetwork", test)
        // console.log("myNetwork", myNetwork)
        res.render("network.ejs", {myNetwork: myNetwork, organizations: organizations, user: req.user});
      } catch (err) {
        console.log(err);
      }
    },

    //Organization you have ownership of. Your role should be 'Owner'
    //Each Organization will be the following:
    //Organization->Projects->Work Locations, Templates, etc
    //Organization replaces Company in this case. 
    //Any organization that you are not the owner of you are in their network and are their "partner?"
  
    createOrganization: async (req, res) => {
      try {
  
        const createdUser = await User.findById(req.user.id)

        console.log("createdUser",createdUser)
        await Organization.create({
          organizationName: req.body.organizationName,
          createdBy: createdUser,
          users: [{
            email: req.user.email,
            userId: createdUser,
            role: 'owner',
          }],

        });


        console.log("Organization has been created");
        res.redirect("/networkProfile");
      } catch (err) {
        console.log(err);
        // alert('Their is already a organization with those parameters in the database.')
      }
    },
    deleteOrganization: async (req, res) => {
      try {
        // Find post by id
        // let organization = await Organization.findById({ _id: req.params.id });
        // Delete image from cloudinary
        // await cloudinary.uploader.destroy(organization.cloudinaryId);
        // Delete post from db
        await Organization.deleteOne({ _id: req.params.organizationId });
        console.log("This organization has been deleted");
        res.redirect("/networkProfile");
      } catch (err) {
        res.redirect("/networkProfile");
      }
    },
    // addProfilePicture: async(req,res)=>{
    //   try{
    //     const user = await User.findById(req.user.id)
    //   }
    // }
    //TODO Since the array is a string, we need it to change. My bigger task is to reference these employees, to each person who shares a character code. Then grab from their names. That way it is always updated with the usernames or users.
  

    deleteEmployee: async(req,res)=>{
      try{
        const {organizationId, userId} = req.params
        // const organization = await Organization.findById(organizationId)

        // organization.users.pull({ email: newUserEmail, role: 'user' });
        // await organization.save();
        const organization = await Organization.findById(organizationId)

        const user = await User.findById(userId);
        if (!userId && !organizationId) {
            return res.status(400).send("Organization or User does not exist");
        }

        // const creator = await Organization.findOneAndUpdate({organization: organization.createdBy == user ? console.log('true',user):console.log('false')})
        //!If my role="owner" then dont render or dont delete, otherwise you can delete
        //TODO I'm getting a some weird values when i delete. Im getting null for my organizations "createdBy", making I'm looking for the wrong type?
        //TODO I can't delete other user gives status of User cant remove themself when i try to remove the owner of the organization.
        if(user._id.toString() == organization.createdBy.toString()){
          console.log('userId and organizationCreatedBy are the same')
          console.log('organization',organization.createdBy)
          console.log('user', user._id)
          // console.log('Creator', creator)
          return res.status(400).send("User can't remove themself from the organization. Try deleting the organization.");
         

        }else if (!user){
          return res.status(400).send("This user can't be found")
        }else if (!organization){
          return res.status(400).send("This organization can't be found")
        }else if (user._id.toString() == organization.createdBy.toString()){
          return res.status(400).send(`${user.firstName} owns this organization, unable to be removed`)
        }else if(user._id.toString() !== organization.createdBy.toString()){
          // Removes user from organization
          await Organization.findByIdAndUpdate(
        
          organizationId,
          { $pull: { users: { email: user.email } } }, // Remove the user from the `users` array
          { new: true }, // Return the updated document      
          )

          await User.findByIdAndUpdate(

            user,{
              $pull: {network:{ }}
            }
          )
        // await Organization.deleteOne(
        //   {_id: organizationId},
        //   {$pull: {users: users}},
        // );
        console.log(`${user.firstName} was removed from ${organization.organizationName}`)
        res.redirect(`/organization/${organizationId}`);
      }} catch(err) {
        console.log(err)
      }}
  };
  
  

    //End of Module

          // Generate the JWT token
      // const token = jwt.sign(
      //   { email: newUser, organizationId: organization.organizationId },
      //   process.env.JWT_SECRET, // Store your secret in an environment variable
      //   { expiresIn: '6h' }
      // );
  
      // const signupUrl = `https://construx.herokuapp.com/organization/invitedUserSignupPage`;
      // // token=${token}
  
      // //MAILGUN
      // const formData = require('form-data');
      // const Mailgun = require('mailgun.js');
      // const mailgun = new Mailgun(formData);
      // const mg = mailgun.client({username: 'api', key: process.env.MAILGUN_API_KEY});
      
      // mg.messages.create("sandbox288a9b2cf2004aafacc08d3590a97d40.mailgun.org", {
      //   from: "Excited User <mailgun@sandbox288a9b2cf2004aafacc08d3590a97d40.mailgun.org>",
      //   to: [newUser],
      //   subject: "Come Join Me!",
      //   text: "Testing some Mailgun awesomeness!",
      //   html: `<h1>Come join me at ${signupUrl}</h1>`
      // })
