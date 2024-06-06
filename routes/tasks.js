const express = require('express');
const router = express.Router();
// const upload = require("../middleware/multer");
const tasksController = require("../controllers/tasks");

const {ensureAuth, ensureGuest} = require('../middleware/auth');


// Tasks=[taskDuty,initial]
//  I need a way to create a checklist Template. This template will need to be generated and attached to a Project. Each Company can make as many templates as they would like. The Template will have this structure to it.

//Template Name "NEW NAME FOR TEMPALTE"
//Project "REF PROJECT"
//Location "FORM LABEL"
//TASK "FORM LABEL" - Initials will be the users first initial and last initial //!These should be put requests
// 
// 
// 
// 
// 
// 
// 

//Create a task sheet maybe in a modal? 
//!This will need to be ("/createTaskSheet/:id?") Lets just keep it generic and make the list and then reference it when we pull it for a project. Not sure how to do that yet
router.post("/createTaskSheet", ensureAuth,  tasksController.createTaskSheet);
router.get("/createTaskSheetPage/:id?", ensureAuth, tasksController.getCreateTaskSheetPage);


//?I need to get the whole task
//for whole list of task sheet
// router.get("/:id",ensureAuth, tasksController.getTaskSheet)
// router.delete("/deleteTaskSheet/:projectId/:taskSheetId", ensureAuth, tasksController.deleteTaskSheet);



module.exports = router;
