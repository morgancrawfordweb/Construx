const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//this route gets the project
router.get("/:id", ensureAuth, projectsController.getProject);


//This route is used for uploading PDFS
router.post("/createProject", upload.single("file"), projectsController.createProject);

//This route deletes the projects
router.delete("/deleteProject/:id", projectsController.deleteProject);

//Adds employees to the project
router.post("/addEmployees/:id", projectsController.addEmployees)


module.exports = router;