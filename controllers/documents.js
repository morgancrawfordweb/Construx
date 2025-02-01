const cloudinary = require("../middleware/cloudinary");
const Document = require("../models/Document");
const User = require("../models/User");
const Organization = require("../models/Organization")
// const Template = require("../models/Template")
// const toastify = require("../")


module.exports = {
  getDocument: async (req, res) => {
    try {
      const document = await Document.findById(req.params.id);
      res.render("project.ejs", { document: document});
    } catch (err) {
      console.log(err);
    }
  },
  createDocument: async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, { pages : true, flag : "attachment" });
      const organizationId = req.params.organizationId
      const projectId = req.params.projectId
      
      
      const newDocument = await Document.create({
        fileName: req.body.fileName,
        description: req.body.description,
        cloudinaryId: result.public_id,
        project: projectId,
        image: result.secure_url,
        uploadedById: req.user.id,
        dateSubmitted: new Date(),
        organization: organizationId
      });
      console.log('organizationId',organizationId)

      await Organization.updateOne(
        {_id: organizationId},
        {$addToSet: {documents: newDocument._id}}
      )

      console.log("Document has been added!");
      res.redirect(`/project/${organizationId}/${projectId}`);
    } catch (err) {
      console.log(err);
      
    }
  },
  deleteDocument: async (req, res) => {
      try {
        let document = await Document.findById({ _id: req.params.documentId });
        await cloudinary.uploader.destroy(document.cloudinaryId);

        const projectId = req.params.projectId
        const organizationId = req.params.organizationId
        console.log('organizationId', organizationId)
        console.log('projectId', projectId)

        await Document.deleteOne({ _id: req.params.documentId })
        console.log("document has been removed")
        res.redirect(`/project/${organizationId}/${projectId}`);
      } catch (err) {
        console.log(err);
      }
  },
  downloadDocument: async(req,res)=>{
    try{
      
      let document = await Document.findById(req.params.documentId);

      await cloudinary.uploader.download(document)

      document.downloadOne({_id: req.params.documentId})
      console.log('Downloading your document')
      res.redirect("/project/"+req.params.projectId);
      
    }catch(err){
      console.log(err);
    }
  },

  };