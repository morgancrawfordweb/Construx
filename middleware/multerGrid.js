// const GridFsStorage = require('multer-gridfs-storage');
// const Grid = require('gridfs-stream');
// const documentsController = require(`../controllers/documents.js`)



// module.exports ={

// let gfs;

// conn.once('open',()=>{
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('uploads');
// })

// //  multer({
// //   storage: multer.diskStorage({}),
// //   fileFilter: (req, file, cb) => {
// //     let ext = path.extname(file.originalname);
// //     if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png" && ext !== ".pdf") {
// //       cb(new Error("File type is not supported"), false);
// //       return;
// //     }
// //     cb(null, true);
// //   },
// };