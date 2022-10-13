const Document = require("../models/Document");
const Project = require("../models/Project");

module.exports = {

  getDocument: async (req, res) => {
    try {
      const project = await Project.find().sort({createdAt:"desc"}).lean();
      const documents = await Document.find({project: req.params.id}).sort({createdAt: "desc"}).lean();
      res.render("project.ejs", { project: project, user: req.user, documents: documents });
    } catch (err) {
      console.log(err);
    }
  },
  createNewDocument: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Document.create({
        project: req.params.id,
        file: result.secure_url,
        cloudinaryId: result.public_id,
      });
      console.log("New Document has been added!");
      res.redirect("/project");
    } catch (err) {
      console.log(err);
    }
  },}