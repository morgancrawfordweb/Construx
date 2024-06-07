const express = require('express');
const router = express.Router();
// const upload = require("../middleware/multer");
const tasksController = require("../controllers/tasks");

const {ensureAuth, ensureGuest} = require('../middleware/auth');


//Create a task sheet maybe in a modal? 
//!This will need to be ("/createTaskSheet/:id?") Lets just keep it generic and make the list and then reference it when we pull it for a project. Not sure how to do that yet
router.get('/', tasksController.getTaskTemplates)
router.get("/getCreateTaskSheetPage", ensureAuth, tasksController.getCreateTaskSheetPage);
router.get("/", tasksController.getTaskSheet)

router.post("/createTaskSheetTemplate", tasksController.createTaskSheetTemplate);

// router.post("/generateSheetFromTemplate", ensureAuth,  tasksController.generateTaskSheetFromTemplate);


//*Put method to change the document and put your signature on the task
// router.put('/signTask', tasksController.signTask)

module.exports = router;
