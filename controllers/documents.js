const cloudinary = require("../middleware/cloudinary");
const Document = require("../models/Document");
const User = require("../models/User");
const Template = require("../models/Template")
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
      const uploadUser = await User.findById(req.user.id)
      const result = await cloudinary.uploader.upload(req.file.path, { pages : true, flag : "attachment" });
      
      await Document.create({
        fileName: req.body.fileName,
        description: req.body.description,
        cloudinaryId: result.public_id,
        project: req.params.id,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,
        uploadedBy: uploadUser.userName,
        uploadedById: req.user.id,
      });

      console.log("Document has been added!");
      res.redirect("/project/"+req.params.id);
    } catch (err) {
      console.log(err);
      
    }
  },
  deleteDocument: async (req, res) => {
      try {
        let document = await Document.findById({ _id: req.params.documentId });
        await cloudinary.uploader.destroy(document.cloudinaryId);

        await Document.deleteOne({ _id: req.params.documentId })
        console.log("document has been removed")
        res.redirect("/project/"+req.params.projectId);
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
    

    //This portion of my documents controller relates to my template manipulting.
    //For my use it will be for checklists, Maybe DFR's????

    getTemplate: async(req,res)=>{
      try{
        const template = await Template.findById(req.params.id)
        res.render("project.ejs", {template: template});

      }catch(err){
        console.log(err)
      }
    },
    createTemplate: async(req,res)=>{
      try{
        const uploadUser = await User.findById(req.user.id)
        const result = await cloudinary.uploader.upload(req.file.path, {pages:true, flag: attachment})

        await Template.create({
          name: req.body.name,
          image: result.secure_url,
          cloudinaryId: result.public_id,
          createdBy: uploadUser.userName,
          companyIdNumber: uploadUser.companyIdNumber,
          project: req.params.id
        })
        console.log('Template added to the database')
        res.redirect("/profile"+ req.params.id)

      }catch(err){
        console.log(err)
      }
    },
    // renderTemplate: async(req,res)=>{
    //   try{
    //       // const project = await Project.findById(req.params.id)
    //       const originalTemplate = await Template.findById(req.params.id)
    //       const uploadedUser = await User.findById(req.user.id)
    //       const result = await cloudinary.uploader.upload(req.file.path, { pages : true, flag : "attachment" });

    //       const newTemplate = new Template({
    //         name: originalTemplate.name,
    //         location: req.body.location,
    //         createdBy: uploadedUser.userName,
    //         image: originalTemplate.image,
    //         cloudinaryId: result.public_id,
    //         companyIdNumber: uploadedUser.companyIdNumber,
    //         project: req.params.id,
    //       })
    //   }catch(err){
    //     console.log(err)
    //   }
    // },
    editTemplate: async(req,res)=>{
      try{

      }catch(err){
        console.log(err)
      }
    },

  };