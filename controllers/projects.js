const User = require("../models/User");
const Project = require("../models/Project");
const Document = require("../models/Document");
const Company = require("../models/Company");
// var popup = require("popups");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id});
      res.render("profile.ejs", {projects: projects, user: req.user, company: req.company });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      //! Sort order Descended to get most recent projects in feed.
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { projects: projects });
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

   
      res.render("project.ejs", { project: project, user: req.user, documents: documents });


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
        assignedEmployee: req.body.assignedEmployee,
        user: req.user.id,
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
};
