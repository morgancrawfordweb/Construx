const multer = require("multer");
const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !==".pdf" && ext !==".png" && ext !==".img"&& ext !==".jpg"&& ext !==".jpeg"){
      cb(new Error("File type is not supported, try using a pdf!"), false);
      return;
    }
    cb(null, true);
  },
});


// module.exports = ({
//  storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function(req, file, cb) {
//       if(ext !==".pdf"|| ext !==".png"|| ext !==".img"){
//       cb(new Error("File type is not supported, try using a pdf!"), false);
//       //       return;
//       //     } 

// cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// })



  // let encode_file = null;
  // let fileName = "";
  // if (req.file) {
  //   fileName = req.file.originalname;
  //   var filepath = path.join(__dirname, req.file.path);
  //   console.log(filepath);
  //   var stream = fs.readFileSync(filepath);
  //   encode_file = stream.toString("base64");
  // }
