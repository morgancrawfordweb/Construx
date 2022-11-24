const cloudinary = require("../middleware/cloudinary");
const Document = require("../models/Document");

// const User = require("../models/User");


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
      
      await Document.create({
        
        fileName: req.body.fileName,
        description: req.body.description,
        cloudinaryId: result.public_id,
        project: req.params.id,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        user: req.user.id,

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
    }}
  };