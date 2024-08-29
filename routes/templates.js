const express = require('express');
const router = express.Router();
// const upload = require("../middleware/multer");
const templatesController = require("../controllers/templates");

const {ensureAuth, ensureGuest} = require('../middleware/auth');


//Create a task sheet maybe in a modal? 
//!This will need to be ("/createTaskSheet/:id?") Lets just keep it generic and make the list and then reference it when we pull it for a project. Not sure how to do that yet
// router.get('/', tasksController.getTaskTemplates)

//*This will render your selected task sheet for your project.
router.get("/createTemplatePage/:id", ensureAuth, templatesController.getTemplateFeed);

//*This gets the EJS page to create the template.
router.get("/createTemplatePage",ensureAuth, templatesController.getCreateTemplatePage);

//*This is supposed to get all of your company templates. This way you can what you have created or not.
// router.get("/getCompanyTemplates/:id?",ensureAuth, templatesController.getCompanyTemplates)

//*This creates the ORIGINAL template for the NewWorkLocation to work
router.post("/createTemplate/:id?",ensureAuth, templatesController.createTemplate);

//*Route for creating a new work location from the project working
router.post("/createNewWorkLocation/:id?", ensureAuth, templatesController.createNewWorkLocation)

//*This route is for putting your signature on a task
router.put("/signTask/:projectId/:templateId/:objectId/:taskId", ensureAuth, templatesController.signTask);

//*Deletes a signature.
router.delete("/deleteSignature/:projectId/:objectId/:templateId/:taskId/:signatureId?", ensureAuth, templatesController.deleteSignature);

//*Deletes task successfully in the project.
router.delete("/deleteWorkLocation/:projectId/:id?", ensureAuth, templatesController.deleteWorkLocation);

//*Deletes original company templates.
router.delete("/deleteTemplate/:templateId", ensureAuth, templatesController.deleteTemplate);

//*Edit original company templates.
router.put("/editTaskInTemplate/:templateId/:taskId", ensureAuth, templatesController.editOriginalTemplate);





module.exports = router;
 