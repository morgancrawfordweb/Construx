const cloudinary = require("../middleware/cloudinary");
const Document = require("../models/Document");
const User = require("../models/User");
// const storage = new GridFsStorage({ url });

module.exports = {
  createDocument: async (req, res) => {
    try {

      const result = await cloudinary.uploader.upload(req.file.path);
      // const convert = cloudinary.image("multi_page_pdf.jpg", {density: 20})
      
      await Document.create({
        
        title: req.body.title,
        image: result.secure_url,
        cloudinaryId: result.public_id,
        project: req.params.id,
        
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
  // downloadDocument: async(req,res)=>{
  //   try{
      
  //     let document = await Document.findById({_id: req.params.documentId});

  //     await storage.uploader.download(req.file.path)

  //     await Document.downloadOne({_id: req.params.documentId})
  //     console.log('Downloading your document')
  //     res.redirect("/project/"+req.params.projectId);
      
  //   }catch(err){
  //     console.log(err);
  //   }
  // } 
};