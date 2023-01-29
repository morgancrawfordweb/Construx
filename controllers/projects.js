const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
// const Company = require("../models/Company");
const Employee = require("../models/Employee");
// var popup = require("popups");

module.exports = {
  getProfile: async (req, res) => {
    try {
      //? I think this gives me all of the projects that i created with my userId
      const projects = await Project.find({ user: req.user.id}); //req ? {do this... check user ? {do this... check .id}}
      res.render("profile.ejs", {projects: projects, user: req.user, company: req.company });
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
    //   const user = await User.find({companyIdNumber: req.params.id});
    //   const company = await Company.find({companyIdNumber: req.params.id});
      const project = await Project.findById(req.params.id);
      const documents = await Document.find({project: req.params.id}).sort({createdAt: "asc"}).lean();
      const employees = await Employee.find({project: req.params.id}).sort({createdAt: "desc"}).lean();

      res.render("project.ejs", { project: project, user: req.user, documents: documents, employees: employees });

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
      // Find post by id
      // let project = await Project.findById({ _id: req.params.id });
      // Delete image from cloudinary
      // await cloudinary.uploader.destroy(project.cloudinaryId);
      // Delete post from db
      await Project.deleteOne({ _id: req.params.id });
      console.log("This project has been deleted");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
  addEmployees: async(req,res)=>{
    try{

      await Employee.addOne({
        userName: req.body.userName,
        project: req.params.id,
      })
      console.log('employee added')
      res.redirect('/project/'+req.params.id);
    }catch(err){
      console.log(err)
    }
  }
};
