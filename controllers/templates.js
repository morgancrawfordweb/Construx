const Template = require("../models/Template.js");
const User = require("../models/User.js");
const Project = require("../models/Project");
const toastify = require("../")

module.exports = {


  //*This gets the page to fill out your template to be used at a later time.//
  getTemplate: (req,res)=>{
      res.render("template.ejs")
  },


  //*This is to grab the templates to use across multiple projects//
  // getTaskTemplates: async (req,res)=>{
  //   const taskTemplates = await TaskSheet.find();
  //   res.render('taskSheets/index',{taskTemplates})
  // },

//*This will render your selected task sheet for your project.
getTemplateFeed: async (req,res)=>{
  try{
    const templates = await Template.findById(req.params.id)

    res.render('project.ejs', {templates: templates});
  }catch(err){
    console.log(`${err}, there was an error in the getting your template`)
  }
  },


//*This is to be used to actually create your new template. You can use this for any list of duties you need your employee's to check.
createTemplate: async (req, res) => {
    

        try {
          const createdUser = await User.findById(req.user.id)
          // const taskSheet = await TaskSheet.findById(req.taskSheet.id)
          // Need this for when you populate
          // const project = await Project.findById(req.params.id)
          // const newTaskSheet = await TaskSheet.findById(req.params.id)
          const newTaskDetail = req.body.taskDetail
          const newTask = newTaskDetail.map(taskDetail=>({
            taskDetail: taskDetail,
            signature: []
          }))


          await Template.create({
          templateName: req.body.templateName,
          tasks: newTask,
          user: req.user.id,
          companyIdNumber: createdUser.companyIdNumber,
          // project: project.id,
        });  
          

          console.log("Task sheet has been created");
          res.redirect("/template/template");
        } catch (err) {
          console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },

  //*This will be used for creating copies of the main templates for each project used
  // populateTaskSheet: async ( req,res )=>{
  //   //i need to have a form called populate, you will have a modal that pops up that asks for the location name.      
  //   try {
  //     const taskSheetTemplate = await TaskSheet.findOne();
  //     const task = await Task.findById()

  //     //modify location on table and 
  //    res.render("project.ejs", {taskSheetTemplate: taskSheetTemplate, task:task});
  //         } catch (err) {
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