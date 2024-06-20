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
        });  
          

          console.log("Task sheet has been created");
          res.redirect("/template/template");
        } catch (err) {
          console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },

  //*This will be used for creating copies of the main templates for each project used
  populateTemplate: async ( req,res )=>{
    //i need to have a form called populate, you will have a modal that pops up that asks for the location name.      
    try {
      const userId = req.user._id;  // Assuming the user's ID is stored in req.user
      const user = await User.findById(userId);
      const userName = user.name.trim();

      // Find the project by ID
      const project = await Project.findById(req.params.projectId);

      // Find the template by project ID and task ID
      const template = await Template.findOne({
        _id: project.template,
        "tasks._id": req.params.taskId
      });

      if (!template) {
        return res.status(404).send("Task not found");
      }

      // Find the task
      const task = template.tasks.id(req.params.taskId);

      // Append the signature
      task.signature.push({
        userId: userId,
        userName: userName,
        dateCompleted: new Date()
      });

      // Save the template
      await template.save();

      res.redirect(`/projects/${req.params.projectId}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred while signing off the task.');
    }
  },

  
}