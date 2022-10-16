const cloudinary = require("../middleware/cloudinary");
const Project = require("../models/Project");
const Document = require("../models/Document");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const projects = await Project.find({ user: req.user.id });
      res.render("profile.ejs", { projects: projects, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const projects = await Project.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { projects: projects });
    } catch (err) {
      console.log(err);
    }
  },
  getProject: async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      const documents = await Document.find({project: req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("project.ejs", { project: project, user: req.user, documents: documents });
    } catch (err) {
      console.log(err);
    }
  },

  createProject: async (req, res) => {
    try {
      // Im not allowed to upload PDF's to couldinary as it can be malware. Need to find a conversion script to change from PDF to .jpg || .png
      // const result = await cloudinary.uploader.upload(req.file.path);

      await Project.create({
        projectName: req.body.projectName,
        projectNumber: req.body.projectNumber,
        projectDescription: req.body.projectDescription,
        assignedEmployee: req.body.assignedEmployee,
        // cloudinaryId: result.public_id,
        user: req.user.id,
      });
      console.log("Project has been created");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
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
