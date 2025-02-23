const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Event = require("../models/Event")
const Organization = require("../models/Organization");
const Employee = require("../models/Employee");
const Template = require("../models/Template")
// var popup = require("popups");

module.exports = {
  getFeed: async (req, res) => {
    try {
      //?node: UUID -> Creates a unique number for organizationID
      //! Need to sort by users organizationId to get 
      const organizationId = req.params.organizationId
      const user = await User.findOne({_id: req.user._id});
      const organization = await Organization.findById(organizationId).lean()

      //need to check out if organization.users[i].user or something to find out if my user exists then i can see this project for these organizations.
      const projects = await Project.find({organization: organizationId}).sort({ createdAt: "desc" }).lean();

      // console.log('organization', organization)
      // console.log('projects', projects)
      // console.log('organizationId', organizationId)

      res.render("feed.ejs", {projects: projects, user: user, organization: organization, organizationId: organizationId});

    } catch (err) {
      console.log(err)
      // popup.alert({content:"Their is already a project with those parameters that exists"});
    }
  },
  getProject: async (req, res) => {
    try {
      const organizationId = req.params.organizationId;
      const projectId = req.params.projectId
      const templateId = req.params.templateId
      const user = await User.find({organizationId: req.params.id});
    //   const organization = await Organization.find({organizationId: req.params.id});
      const project = await Project.findById(req.params.projectId);
      const documents = await Document.find({project: req.params.projectId}).sort({createdAt: "asc"}).populate('uploadedById', 'firstName lastName').lean();
      const employees = await Project.find({assignedEmployee: req.params.projectId}).sort({createdAt: "desc"}).lean();
      const templates = await Template.find({organization: organizationId});
      const workLocations = await Template.find({project: req.params.projectId}).lean();
      const organization = await Project.findById(req.params.projectId).populate("organization").lean()


      
      //*Checks how many signatures were signed and renders them on the EJS
      workLocations.forEach(location => {
        location.totalSignatures = location.tasks.filter(task => 
          task.signature.length >= 1).length;
      });

      // console.log(workLocations)
    // Helper function to check if a file is an image
    const isImageFile = (image) => {
      if (!image) return false; // Check if filename is undefined or null
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
      const fileExtension = image.split('.').pop().toLowerCase();
      // console.log(image)
      return imageExtensions.includes(fileExtension);
    };

  
    // Separate documents into images and non-images
    const imageDocuments = documents.filter(doc => isImageFile(doc.image));
    const nonImageDocuments = documents.filter(doc => !isImageFile(doc.image));

    // console.log("Image Documents:", imageDocuments);
    // console.log("Non-Image Documents:", nonImageDocuments);
    // console.log("Organization", organizationId)
      
      res.render("project.ejs", { project: project, user: req.user, imageDocuments: imageDocuments, nonImageDocuments:nonImageDocuments, employees: employees, templates: templates, workLocations: workLocations, organization: organization, organizationId: organizationId, projectId: projectId});

    } catch (err) {
      console.log(err);
    }
  },

  createProject: async (req, res) => {
    try {
      const createdUser = await User.findById(req.user.id)
      const organizationId = req.params.organizationId

      const organization = await Organization.findById(organizationId);

      console.log("req.params", req.params)
      console.log("organization",organization)
      console.log("organizationId",organizationId)

      const newProject = await Project.create({
        projectName: req.body.projectName,
        projectNumber: req.body.projectNumber,
        projectDescription: req.body.projectDescription,
        user: req.user.id,
        organization: organizationId,
      });
      console.log('newProject const', newProject)
      console.log('organizationId const', organization)

      console.log("Project has been created");

      await Organization.updateOne(
        { _id: organizationId},
        { $addToSet: { projects: newProject._id } },
      );

      res.redirect(`/organization/${organizationId}`);
    } catch (err) {
      console.log(err);
      // alert('Their is already a project with those parameters in the database.')
    }
  },
  deleteProject: async (req, res) => {
    try {

      let project = await Project.findById({_id: req.params.projectId})
      if(!project){
        console.log("This project couldn't be found")
        return res.redirect(`/organization`)
      }
      let organizationId = project.organization.toString()
      let projectId = req.params.id
      const user = req.user

      //finds the organization in my users network
      const userOrg = user.network.find(organization => organization.organizationId.toString() === organizationId)
      // const inNetwork = user.network.map(user => user.role)
      console.log("userORg",userOrg)
      // console.log("user.network",user.network)

      //! Right now i Need a way to compare the organization. If user.organization == req.params && if the user.role inside of that organization is user then to do this, then if it isnt do that.

    //   if (!userOrg) {
    //     console.log("User is not part of this organization");
    //     return res.redirect(`/organization/${organizationId}`);
    // }

    if (userOrg.role === "user") {
        console.log("You are not an owner, you cannot delete this project.");
        return res.redirect(`/organization/${organizationId}`);
    } 
    
    if (userOrg.role === "owner") {
        console.log("You are an owner project will be deleted.");
        await Project.deleteOne({ _id: req.params.projectId });
        await Organization.findByIdAndUpdate(
          organizationId,
          {$pull: {projects: project._id}}
        )
        console.log("Project deleted successfully");
        return res.redirect(`/organization/${organizationId}`);
    }

    } catch (err) {
      console.log(err)
      res.redirect("/organization");
    }
  },
  // addProfilePicture: async(req,res)=>{
  //   try{
  //     const user = await User.findById(req.user.id)
  //   }
  // }
  //TODO Since the array is a string, we need it to change. My bigger task is to reference these employees, to each person who shares a character code. Then grab from their names. That way it is always updated with the usernames or users.

  //*But right now if I want to do something easier, it would be just to remove the item in the array with a button
  addEmployee: async(req,res)=>{
    try{
      const projectId= req.params.projectId
      const assignedEmployee = req.body.assignedEmployee
      //I think later on I want to be able to reference the users, but for now, lets just do string names.
    await Project.updateOne(
        { _id: projectId},
        { $addToSet: { assignedEmployee: assignedEmployee } },
      );
      
      console.log('Employee added')
      res.redirect('/project/'+req.params.projectId);
    }catch(err){
      console.log(err)
    }
  },
      //*Adding in the employee directory in the organization profile use inviteNewUser
    // addEmployee: async(req,res)=>{
    //   try{
    //     const organizationId= req.params.id
    //     const assignedEmployee = req.body.assignedEmployee
    //     //I think later on I want to be able to reference the users, but for now, lets just do string names.
    //   await Organization.updateOne(
    //       { _id: organizationId},
    //       { $addToSet: { assignedEmployee: assignedEmployee } },
    //     );
        
    //     console.log('Employee added')
    //     res.redirect('/organization/'+req.params.id);
    //   }catch(err){
    //     console.log(err)
    //   }
    // },
  deleteEmployee: async(req,res)=>{
    try{
      const projectId= req.params.projectId
      const employees = await Projects.employees.updateOne({_id: req.params.projectId})
      await Project.deleteOne(
        {_id: projectId},
        {$pull: {employees: employees}},
      );
      console.log("Employee removed from project")
    }catch(err){
      console.log(err)
    }
  },
};
