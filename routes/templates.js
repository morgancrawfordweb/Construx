const express = require('express');
const router = express.Router();
// const upload = require("../middleware/multer");
const templatesController = require("../controllers/templates");

const {ensureAuth, ensureGuest} = require('../middleware/auth');


//Create a task sheet maybe in a modal? 
//!This will need to be ("/createTaskSheet/:id?") Lets just keep it generic and make the list and then reference it when we pull it for a project. Not sure how to do that yet
// router.get('/', tasksController.getTaskTemplates)

//*This will render your selected task sheet for your project.
router.get("/getTemplateFeed/:id", ensureAuth, templatesController.getTemplateFeed);


//*This gets the EJS page to create the template
router.get("/createTemplatePage", templatesController.getTemplate);

//This creates the BASIC worksheet template. Example - Grading Checklist 
router.post("/createTemplate/:id?", templatesController.createTemplate);

//*Route for creating a new work location from the project working
router.post("/createNewWorkLocation/:id?", ensureAuth, templatesController.createNewWorkLocation)

// 
//?This is the route to duplicate the task sheet for the specific project. so it COULD MAYBE have to have "/:projectId/populateTaskSheet" But im not sure yet.
// router.post("/populateTaskSheet", ensureAuth,  templatesController.populateTemplate);

//Route for letting me add my signature.

// EJS for signTask?/template/signTask/<%=project._id%>/<%=template._id%>/<%=taskSignature[i]._id %>?_method=DELETE

// router.put("/:projectId/:taskId", ensureAuth, templatesController.signTask)

//Route for getting the modal to allow me to add a work location. I want this to be a small box so you know that you are still on the project.ejs page
// router.get("/getWorkLocationCreator", ensureAuth, templatesController.getWorkLocationCreationPage)

// router.get("/:projectId'/templateId", ensureAuth, templatesController.deleteTemplate)

//*Put method to change the document and put your signature on the task
router.delete("/deleteWorkLocation/:projectId/:templateId", ensureAuth, templatesController.deleteWorkLocation)
module.exports = router;
 