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


// EJS for signTask?/template/signTask/<%=project._id%>/<%=template._id%>/<%=taskSignature[i]._id %>?_method=DELETE

router.put("/signTask/:projectId/:templateId/:objectId/:taskId", ensureAuth, templatesController.signTask);

//*Deletes task successfully
router.delete("/deleteWorkLocation/:projectId/:id?", ensureAuth, templatesController.deleteWorkLocation)
module.exports = router;
 