const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
// const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


//this route gets the project
router.get("/:organizationId/:projectId", ensureAuth, projectsController.getProject);

//This route is used for uploading PDFS
router.post("/createProject/:organizationId", upload.single("file"), projectsController.createProject);

//This route deletes the projects
router.delete("/:organizationId/deleteProject/:projectId", projectsController.deleteProject);

//Adds employees to the project
router.post("/:organizationId/addEmployees/:projectId", projectsController.addEmployee)


router.delete("/:organizationId/deleteEmployees/:projectId/:employeeId", projectsController.deleteEmployee)





module.exports = router