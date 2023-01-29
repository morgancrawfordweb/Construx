const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const documentsController = require("../controllers/documents");

const {ensureAuth, ensureGuest} = require('../middleware/auth');



router.get("/:id", ensureAuth, documentsController.getDocument);

router.get("/dowloadDocument/:projectId/:documentId", ensureAuth, documentsController.downloadDocument);

router.post("/createDocument/:id?", ensureAuth, upload.single('file'), documentsController.createDocument);

router.delete("/deleteDocument/:projectId/:documentId", ensureAuth, documentsController.deleteDocument);



module.exports = router;





















































//////////////////////////////////////////////////////////////////////
//Below is the code im trying out for the grid FS storage
// const express = require('express');
// const documentRouter = express.Router();
// const mongoose = require('mongoose');
// const Document = require('../models/Document');
// const config = require('../config');
// const documents = require('../controllers/documents');

// module.exports = (upload) => {
//     const url = config.mongoURI;
//     const connect = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true });

//     let gfs;

//     connect.once('open', () => {
//         // initialize stream
//         gfs = new mongoose.mongo.GridFSBucket(connect.db, {
//             bucketName: "uploads"
//         });
//     });

//     /*
//         POST: Upload a single image/file to Image collection
//     */
//     documentRouter.route('/')
//         .post(upload.single('file'), (req, res, next) => {
//             console.log(req.body);
//             // check for existing Documents
//             Document.findOne({ description: req.body.description })
//                 .then((document) => {
//                     console.log(document);
//                     if (document) {
//                         return res.status(200).json({
//                             success: false,
//                             message: 'Document already exists in DB',
//                         });
//                     }

//                     let newDocument = new Document({
//                         description: req.body.description,
//                         filename: req.file.filename,
//                         fileId: req.file.id,
//                     });

//                     newDocument.save()
//                         .then((document) => {

//                             res.status(200).json({
//                                 success: true,
//                                 document,
//                             });
//                         })
//                         .catch(err => res.status(500).json(err));
//                 })
//                 .catch(err => res.status(500).json(err));
//         })
//         .get((req, res, next) => {
//             Document.find({})
//                 .then(documents => {
//                     res.status(200).json({
//                         success: true,
//                         documents,
//                     });
//                 })
//                 .catch(err => res.status(500).json(err));
//         });

//     /*
//         GET: Delete a Document from the collection
//     */
//     documentRouter.route('/delete/:id')
//         .get((req, res, next) => {
//             Document.findOne({ _id: req.params.id })
//                 .then((document) => {
//                     if (document) {
//                         Document.deleteOne({ _id: req.params.id })
//                             .then(() => {
//                                 return res.status(200).json({
//                                     success: true,
//                                     message: `File with ID: ${req.params.id} deleted`,
//                                 });
//                             })
//                             .catch(err => { return res.status(500).json(err) });
//                     } else {
//                         res.status(200).json({
//                             success: false,
//                             message: `File with ID: ${req.params.id} not found`,
//                         });
//                     }
//                 })
//                 .catch(err => res.status(500).json(err));
//         });

//     /*
//         GET: Fetch most recently added record
//     */
//     documentRouter.route('/recent')
//         .get((req, res, next) => {
//             Document.findOne({}, {}, { sort: { '_id': -1 } })
//                 .then((document) => {
//                     res.status(200).json({
//                         success: true,
//                         document,
//                     });
//                 })
//                 .catch(err => res.status(500).json(err));
//         });

//     /*
//         POST: Upload multiple files upto 3
//     */
//     // documentRouter.route('/multiple')
//     //     .post(upload.array('file', 3), (req, res, next) => {
//     //         res.status(200).json({
//     //             success: true,
//     //             message: `${req.files.length} files uploaded successfully`,
//     //         });
//     //     });

//     /*
//         GET: Fetches all the files in the uploads collection
//     */
//     documentRouter.route('/files')
//         .get((req, res, next) => {
//             gfs.find().toArray((err, files) => {
//                 if (!files || files.length === 0) {
//                     return res.status(200).json({
//                         success: false,
//                         message: 'No files available'
//                     });
//                 }

//                 files.map(file => {
//                     if (file.contentType === 'document/pdf') {
//                         file.isDocument = true;
//                     } else {
//                         file.isDocument = false;
//                     }
//                 });

//                 res.status(200).json({
//                     success: true,
//                     files,
//                 });
//             });
//         });

//     /*
//         GET: Fetches a particular file by filename
//     */
//     documentRouter.route('/file/:filename')
//         .get((req, res, next) => {
//             gfs.find({ filename: req.params.filename }).toArray((err, files) => {
//                 if (!files[0] || files.length === 0) {
//                     return res.status(200).json({
//                         success: false,
//                         message: 'No files available',
//                     });
//                 }

//                 res.status(200).json({
//                     success: true,
//                     file: files[0],
//                 });
//             });
//         });

//     /* 
//         GET: Fetches a particular Document and render on browser
//     */
//     documentRouter.route('/document/:filename')
//         .get((req, res, next) => {
//             gfs.find({ filename: req.params.filename }).toArray((err, files) => {
//                 if (!files[0] || files.length === 0) {
//                     return res.status(200).json({
//                         success: false,
//                         message: 'No files available',
//                     });
//                 }

//                 if (files[0].contentType === 'document/pdf') {
//                     // render image to browser
//                     gfs.openDownloadStreamByName(req.params.filename).pipe(res);
//                 } else {
//                     res.status(404).json({
//                         err: 'Not an document',
//                     });
//                 }
//             });
//         });

//     /*
//         DELETE: Delete a particular file by an ID
//     */
//     documentRouter.route('/file/del/:id')
//         .post((req, res, next) => {
//             console.log(req.params.id);
//             gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
//                 if (err) {
//                     return res.status(404).json({ err: err });
//                 }

//                 res.status(200).json({
//                     success: true,
//                     message: `File with ID ${req.params.id} is deleted`,
//                 });
//             });
//         });

//     return documentRouter;
// };