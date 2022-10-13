const express = require("express");
const router = express.Router();
const documentsController = require("../controllers/documents");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Post Routes - simplified for now


// router.get("/:id", ensureAuth, commentsController.getComment);

router.post("/createNewDocument/:id", documentsController.createNewDocument);


module.exports = router;