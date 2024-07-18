const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Event = require("../models/Event")
// const Company = require("../models/Company");
const Employee = require("../models/Employee");
const Template = require("../models/Template")
// var popup = require("popups");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //? I think this gives me all of the projects that i created with my userId
      const projects = await Project.find({ user: req.user.id}); //req ? {do this... check user ? {do this... check .id}}
      const event = await Event.find({user: req.user.id})
      res.render("profile.ejs", {projects: projects, user: req.user, company: req.company,event: event});
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      //?node: UUID -> Creates a unique number for companyID
      //! Need to sort by users companyId to get 
      const user = await User.findOne({_id: req.user._id});
      const projects = await Project.find({companyIdNumber: user?.companyIdNumber}).sort({ createdAt: "desc" }).lean();

      res.render("feed.ejs", {projects: projects});

    } catch (err) {
      console.log(err)
      // popup.alert({content:"Their is already a project with those parameters that exists"});
    }
  },
  getProject: async (req, res) => {
    try {
      const user = await User.find({companyIdNumber: req.params.id});
    //   const company = await Company.find({companyIdNumber: req.params.id});
      const project = await Project.findById(req.params.id);
      const documents = await Document.find({project: req.params.id}).sort({createdAt: "asc"}).lean();
      const employees = await Project.find({assignedEmployee: req.params.id}).sort({createdAt: "desc"}).lean();
      const templates = await Template.find({companyIdNumber: req.user.companyIdNumber})

      res.render("project.ejs", { project: project, user: req.user, documents: documents, employees: employees, templates: templates});

    } catch (err) {
      console.log(err);
    }
  },

  createProject: async (req, res) => {
    try {
      const createdUser = await User.findById(req.user.id)

      await Project.create({
        projectName: req.body.projectName,
        projectNumber: req.body.projectNumber,
        projectDescription: req.body.projectDescription,
        user: req.user.id,
        companyIdNumber: createdUser.companyIdNumber,
        createdBy: createdUser.userName,
        createdById: req.user.id,
      });
      console.log("Project has been created");
      res.redirect("/profile");
    } catch (err) {
      // console.log(err);
      // alert('Their is already a project with those parameters in the database.')
    }
  },
  deleteProject: async (req, res) => {
    try {

      await Project.deleteOne({ _id: req.params.id });
      console.log("This project has been deleted");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
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
      const projectId= req.params.id
      const employees = req.body.employees
      //I think later on I want to be able to reference the users, but for now, lets just do string names.
    await Project.updateOne(
        { _id: projectId},
        { $addToSet: { employees: employees } },
      );
      
      console.log('Employee added')
      res.redirect('/project/'+req.params.id);
    }catch(err){
      console.log(err)
    }
  },
  deleteEmployee: async(req,res)=>{
    try{
      const projectId= req.params.id
      const employees = await Projects.employees.updateOne({_id: req.params.id})
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
