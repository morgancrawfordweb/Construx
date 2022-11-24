const multer = require("multer");
// const path = require("path");

module.exports = multer({
  storage: multer.diskStorage({}),
  // fileFilter: (req, file, cb) => {
  //   let ext = path.extname(file.originalname);
    // if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png"
    // && ext !== ".pdf") {
    //   cb(new Error("File type is not supported"), false);
    //   return;
    // }
  //   cb(null, true);
  // },
});


// module.exports = ({
//  storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: function(req, file, cb) {
//     // null as first argument means no error
//     cb(null, Date.now() + "-" + file.originalname);
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
