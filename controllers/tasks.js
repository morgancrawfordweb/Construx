const TaskSheet = require("../models/TaskSheet.js");
const User = require("../models/User.js");
const Task = require("../models/Task.js");

module.exports = {


  //*This gets the page to fill out your template to be used at a later time.//
  getCreateTaskSheetPage: (req,res)=>{
      res.render("tasksheet.ejs")
  },


  //*This is to grab the templates to use across multiple projects//
  getTaskTemplates: async (req,res)=>{
    const taskTemplates = await TaskSheet.find();
    res.render('taskSheets/index',{taskTemplates})
  },

//*This will render your selected task sheet for your project.
  getTaskSheet: async (req,res)=>{
  try{
    const taskSheet = await TaskSheet.findById(req.params.id);
    res.render('taskSheet.ejs', {taskSheet: taskSheet});
  }catch(err){
    console.log(`${err}, there was an error in the getTaskSheet`)
  }
  },


//*This is to be used to actually create your new template. You can use this for any list of duties you need your employee's to check.
  createTaskSheetTemplate: async (req, res) => {
        try {
          //grab the user who created it for reference purposes
          const createdUser = await User.findById(req.user.id)

          await TaskSheet.create({
            templateName: req.body.templateName,
            tasks: req.body.tasks,
            user: req.user.id,
            companyIdNumber: createdUser.companyIdNumber,
          });
          console.log("Task sheet has been created");
          res.redirect("/getCreateTaskSheetPage");
        } catch (err) {
          console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },

  //*This will be used for creating copies of the main templates for each project used
  // generateTaskSheetFromTemplate: async ( req,res )=>{
  //   try {
  //     const { templateId, location } = req.body;
  //     const template = await TaskSheet.findById(templateId);
  //     if (!template) {
  //       return res.status(404).send('Template not found');
  //     }
  //     await TaskSheet.create({
  //       templateName: template.templateName,
  //       location: req.body.location,
  //       tasks: template.tasks.map(task => ({ taskDetail: task.taskDetail, signature: [] })),
  //       project: req.params.id,
  //       companyIdNumber: req.user.companyIdNumber,
  //     });
  //     console.log("Task sheet has been created from template");
  //     res.redirect(`/projects/${req.params.id}`);
  //   } catch (err) {
  //     console.error(err);
  //     // Handle errors appropriately
  //     res.status(500).send('An error occurred while creating the task sheet from template.');
  //   }
  // },

  // //*This will be used to add your intials to the checklist
  // signTask: async ( req,res )=>{
  //   try {
  //     const userName = await User.findById()
  //     const task = await Task.findById()


  //     res.redirect(`/projects/${req.params.id}`);
  //   } catch (err) {
  //     console.error(err);
  //     // Handle errors appropriately
  //     res.status(500).send('An error occurred while creating the task sheet from template.');
  //   }
  // },

  
}