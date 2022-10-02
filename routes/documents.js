const express = require('express');
const router = express.Router();
const upload = require("../middleware/multer");
const documentsController = require("../controllers/documents");
const {ensureAuth, ensureGuest} = require('../middleware/auth');



// router.get("/:id", ensureAuth, documentsController.getDocument);

router.post("/createDocument/:id", upload.single("file"), documentsController.createDocument);

router.delete("/deleteDocument/:project._id/:document._id", documentsController.deleteDocument);


// upload.single("file"),
module.exports = router;