const Template = require("../models/Template.js");
const User = require("../models/User.js");
const Project = require("../models/Project");
const toastify = require("../")

module.exports = {


  //*This gets the page to fill out your template to be used at a later time.//
  getTemplatePage: (req,res)=>{
      res.render("template.ejs")
  },

//*This will render your workLocations on your project pages
getTemplateFeed: async (req,res)=>{
  try{
    const template = await Template.findById(req.params.id)

    res.render('project.ejs', {template: template});
  }catch(err){

    console.log(`${err}, there was an error in the getting your template`)
  }
  },

  //*This code gets the templates that your company has created.
  //*Not quite ready yet
  getCompanyTemplates: async (req,res)=>{
    try{
      const templates = await Template.findById(req.params.id)

      res.render("template.ejs", {templates:templates});
    }catch{
      console.log(`${err}, there was an error in the getting your template`)
    }
  },

//*This is to be used to actually create your new template on the template.ejs page. You can use this for any list of duties you need your employee's to check.
createTemplate: async (req, res) => {
        try {
          const createdUser = await User.findById(req.user.id)
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
          isOriginal: true
        });  
          

          console.log("Task sheet has been created");
          res.redirect("/template/createTemplatePage");
        } catch (err) {
          console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },

      //*This uses the templates that you have already created, and adds additional items to your template and creates a New template called a work location. This way the original tempalte doesnt get modified.
  createNewWorkLocation: async (req,res)=>{
    //Choose between templates and then clone that object but add the parameters of Location
      //use this to find all of the templates that were created with users that share the same companyId
      try {
        const { selectedTemplate, location } = req.body;
        const template = await Template.findById(selectedTemplate);
        // const
  
        if (!template) {
          return res.status(404).send('Template not found');
        }
  
        // Clone the template and add additional parameters
        const newTemplate = new Template({
          templateName: template.templateName,
          location,
          tasks: template.tasks,
          project: req.params.id,
          companyIdNumber: req.user.companyIdNumber,
          user: req.user.id,
          isOriginal: false
        });
  
        await newTemplate.save();
        res.redirect("/project/"+req.params.id)

    }catch(err){
      console.log(err)
    }
  },

  //*Deletes a work location. Most likely not going to be used but it is able to delete specific work locations.
  deleteWorkLocation: async (req, res) => {
    try {
      await Template.findByIdAndDelete({ _id: req.params.id })
      console.log("document has been removed")
      res.redirect("/project/"+req.params.projectId);
    } catch (err) {
      console.log(`${err}, there was an error in deleting this working location.`);
    }
},

//*Gives the ability to sign off on a task and record the date of it.
signTask: async ( req,res ) => {
  try{
    console.log('You have signed off on this')
  }catch{}
}
}


  //!7.16.24--This is some code that I am not using and the site is functioning. Comeing back from 3 week break.
    //*This will be used for creating copies of the main templates for each project used
  // populateTemplate: async ( req,res )=>{
  //   //i need to have a form called populate, you will have a modal that pops up that asks for the location name.      
  //   try {
  //     const userId = req.user._id;  // Assuming the user's ID is stored in req.user
  //     const user = await User.findById(userId);
  //     const userName = user.name.trim();

  //     // Find the project by ID
  //     const project = await Project.findById(req.params.projectId);

  //     // Find the template by project ID and task ID
  //     const template = await Template.findOne({
  //       _id: project.template,
  //       "tasks._id": req.params.taskId
  //     });

  //     if (!template) {
  //       return res.status(404).send("Task not found");
  //     }

  //     // Find the task
  //     const task = template.tasks.id(req.params.taskId);

  //     // Append the signature
  //     task.signature.push({
  //       userId: userId,
  //       userName: userName,
  //       dateCompleted: new Date()
  //     });

  //     // Save the template
  //     await template.save();

  //     res.redirect(`/projects/${req.params.projectId}`);
  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).send('An error occurred while signing off the task.');
  //   }
  // },

  
