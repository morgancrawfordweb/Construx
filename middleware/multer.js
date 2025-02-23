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