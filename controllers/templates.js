const Template = require("../models/Template.js");
const User = require("../models/User.js");
const Project = require("../models/Project");
const toastify = require("../")

module.exports = {


  //*This gets the page to fill out your template to be used at a later time.//
  getCreateTemplatePage: async (req,res)=>{
    try{
      const templates = await Template.find({companyId: req.user.companyId});

      res.render("template.ejs",{templates:templates})
    }catch(err){
      console.log(err)
    }
  },


//*This will render your selected task sheet for your project.
getTemplateFeed: async (req,res)=>{
  try{
    console.log('getTemplateFeed')
    const template = await Template.findById(req.params.id)

    

    res.render('project.ejs', {template: template});
  }catch(err){

    console.log(`${err}, there was an error in the getting your template`)
  }
  },
//*This is to be used to actually create your new template on the template.ejs page. You can use this for any list of duties you need your employee's to check.
createTemplate: async (req, res) => {
        try {
          const createdUser = await User.findById(req.user.id)
          const newTaskDetail = req.body.taskDetail
          const newReference = req.body.reference

          const newTask = newTaskDetail.map((taskDetail, index)=>({
            taskDetail: taskDetail,
            reference: newReference[index] || null,
            signature: []
          }))


          await Template.create({
          templateName: req.body.templateName,
          tasks: newTask,
          user: req.user.id,
          companyId: createdUser.companyId,
          reference: req.body.reference,
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
      const project = await Project.findById(req.params.id)
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
          companyId: req.user.companyId,
          projectName: project.projectName,
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
      await Template.deleteOne({ _id: req.params.id })
      console.log("document has been removed")
      res.redirect("/project/"+req.params.projectId);
    } catch (err) {
      console.log(`${err}, there was an error in deleting this working location.`);
    }
},
deleteTemplate: async (req, res) => {
  try {
   await Template.deleteOne({ _id: req.params.templateId })
    console.log(`Company template has been removed`)
    res.redirect("/template/createTemplatePage");
  } catch (err) {
    console.log(`${err}, there was an error in deleting this company template.`);
  }
},

//*Gives the ability to sign off on a task and record the date of it.
signTask: async (req, res) => {
    try {
      
      const user = await User.findOne({_id: req.user._id});

      const { projectId, templateId, objectId, taskId } = req.params;
      console.log('Received Parameters:', { projectId, templateId, objectId, taskId });
      console.log('Request User:', req.user);

      // Use array filters to target the specific task
      const result = await Template.findOneAndUpdate(
        { "_id": templateId, "tasks._id": taskId },
        {
          $push: {
            "tasks.$[task].signature": {
              initial: `${req.user.firstName} ${req.user.lastName}`, // Updated here
              dateCompleted: new Date()
            }
          }
        },
        {
          new: true,
          arrayFilters: [{ "task._id": taskId }]
        }
      );

      if (result) {
        console.log('Update successful:', result);
        res.redirect("/project/" + projectId);
      } else {
        console.log('Task or Template not found');
        res.status(404).send('Task or Template not found');
      }
    } catch (err) {
      console.error('Server Error:', err);
      res.status(500).send('Server Error');
    }
  },
    //*Deletes a work location. Most likely not going to be used but it is able to delete specific work locations.
    deleteSignature: async (req, res) => {
      try {
      
        const user = await User.findOne({_id: req.user._id});
  
        const { projectId, templateId, objectId, taskId, signatureId } = req.params;
        console.log('Received Parameters:', { projectId, templateId, objectId, taskId });
        console.log('Request User:', req.user);
  
        // Use array filters to target the specific task
        const result = await Template.findOneAndUpdate(
          { "_id": templateId, "tasks._id": taskId },
          {
            $pull: {
              "tasks.$.signature": { _id: signatureId }
              }
            },
          
          { new: true }
        );
  
        if (result) {
          console.log('Update successful:', result);
          res.redirect("/project/" + projectId);
        } else {
          console.log('Task or Template not found');
          res.status(404).send('Task or Template not found');
        }
      } catch (err) {
        console.error('Server Error:', err);
        res.status(500).send('Server Error');
      }
    },
    editOriginalTemplate: async (req,res)=>{
      try {
        
        const updateTemplate = await Template.findByIdAndUpdate({ _id: req.params.templateId })

         res.redirect("/template/createTemplatePage");
       } catch (err) {
         console.log(`${err}, there was an error in deleting this company template.`);
       };
    },
} 
