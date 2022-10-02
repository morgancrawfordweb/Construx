const cloudinary = require("../middleware/cloudinary");
const Document = require("../models/Document");
const User = require("../models/User");

module.exports = {
  createDocument: async (req, res) => {
    try {

        const result = await cloudinary.uploader.upload(req.file.path);
        const pdfToPicture = cloudinary.v2.api.resource('sample_pdf', 
        { pages: true },
        function(error, result) {console.log(result, error); });
      // const createdBy = await User.findById(req.user.id)

      await Document.create({
        
        title: req.body.title,
        // image: result.secure_url,
        // cloudinaryId: result.public_id,
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
        await Document.deleteOne({ _id: req.params.documentid })
        console.log("document has been removed")
        res.redirect("/post/"+req.params.documentid);
      } catch (err) {
        console.log(err);
      }
  },  
};