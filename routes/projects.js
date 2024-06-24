const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const projectsController = require("../controllers/projects");
// const tasksController = require("../controllers/tasks");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//this route gets the project
router.get("/:id", ensureAuth, projectsController.getProject);


//This route is used for uploading PDFS
router.post("/createProject", upload.single("file"), projectsController.createProject);

//This route deletes the projects
router.delete("/deleteProject/:id", projectsController.deleteProject);

//Adds employees to the project
router.post("/addEmployees/:id", projectsController.addEmployee)
router.delete("/deleteEmployees/:projectId/:employeeId", projectsController.deleteEmployee)




// router.get("/:id", tasksController.getTask)
// router.post("/addRow/:id", tasksController.addRow)
// router.post("/addColumn/:id", tasksController.addColumn)
//deleting tasks and locations to shrink the spreadsheet

// router.put("/initialTask/:id", taskController.initialTask)
      /*<form action="project/addRow/<%=project._id%>" method="POST">*/
    //     <input type="text" name="locationName" placeholder="Location Name" required />
    //     <input type="submit" value="Add Row" />
    //   </form>
  
    //   <form action="project/addColumn/<%project._id%>" method="POST">
    //     <input type="text" name="taskName" placeholder="Task Name" required />
    //     <input type="submit" value="Add Column" />
    //   </form>
    //   <br>





module.exports = router