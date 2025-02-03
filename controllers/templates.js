const Template = require("../models/Template.js");
const User = require("../models/User.js");
const Project = require("../models/Project");
const Organization = require("../models/Organization")
const toastify = require("../")

module.exports = {


  //*This gets the page to fill out your template to be used at a later time.//
  getCreateTemplatePage: async (req,res)=>{

    
    try{
      const user = await User.find({organizationId: req.params.id});
      const organizationId = req.params.organizationId
      

      // const template = await Template.find({organization: organizationId})
      const organizationName = await Template.findById(req.params.id).populate("organization").lean()
      // const organizationId = template.organization.id;

      const previousPage = req.get('referer') || '/';

      const templates = await Template.find({organization: organizationId});
      const organization = await Organization.findById(req.params.id).populate("organization").lean()

      // console.log('organization', organization)
      // console.log("organizationId", organizationId)
      console.log("template", templates)
      // console.log("organizationName", organizationName)


      res.render("template.ejs", {templates:templates, 
        organizationId:organizationId,
        organization: organization,
        
        previousPage})
    }catch(err){
      console.log(err)
    }
  },


//*This will render your selected task sheet for your project.
getTemplateFeed: async (req,res)=>{
  try{
    
    // const projectId = req.params.projectId
    // const organizationId = req.params.organizationId
    // const template = await Template.findById({organization: organizationId})
    // console.log('getTemplateFeed',projectId)

    
    // console.log('template',template)
    // res.render('project.ejs', {template: template});
console.log('hello')    
  }catch(err){

    console.log(`${err}, there was an error in the getting your template`)
  }
  },
//*This is to be used to actually create your new template on the template.ejs page. You can use this for any list of duties you need your employee's to check.
createTemplate: async (req, res) => {
        try {

          const organizationId = req.params.organizationId
          const createdUser = await User.findById(req.user.id)
          const newTaskDetail = req.body.taskDetail
          const newReference = req.body.reference

          const newTask = newTaskDetail.map((taskDetail, index)=>({
            taskDetail: taskDetail,
            reference: newReference[index] || null,
            signature: []
          }))


          const newTemplate = await Template.create({
          templateName: req.body.templateName,
          tasks: newTask,
          user: req.user.id,
          organization: organizationId,
          reference: req.body.reference,
          isOriginal: true
        });  

        console.log("newTemplate", newTemplate)
        console.log('organizationId', organizationId)
        await Organization.updateOne(
          { _id: organizationId},
          { $addToSet: { templates: newTemplate._id } },
        );


          console.log("Task sheet has been created");
          res.redirect(`/template/${organizationId}/createTemplatePage`);
        } catch (err) {
          console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },

      //*This uses the templates that you have already created, and adds additional items to your template and creates a New template called a work location. This way the original tempalte doesnt get modified.
  createNewWorkLocation: async (req,res)=>{
    //Choose between templates and then clone that object but add the parameters of Location
      //use this to find all of the templates that were created with users that share the same organizationId

      
      try {
        const projectId = req.params.projectId
        const project = await Project.findById(projectId)
        const organizationId = req.params.organizationId
        const { selectedTemplate, location } = req.body;
        const template = await Template.findById(selectedTemplate);
  
        if (!template) {
          return res.status(404).send('Template not found');
        }
  
        console.log('This is my project',project)
        console.log('This is my org',organizationId)
        // Clone the template and add additional parameters
        const newWorkLocation = new Template({
          templateName: template.templateName,
          location,
          tasks: template.tasks,
          project: projectId,
          organizationId: organizationId,
          projectName: project.projectName,
          user: req.user.id,
          isOriginal: false
        });
  
        await newWorkLocation.save();
        res.redirect(`/project/${organizationId}/${projectId}`)

    }catch(err){
      console.log(err)
    }
  },

  //*Deletes a work location. Most likely not going to be used but it is able to delete specific work locations.
  deleteWorkLocation: async (req, res) => {
    try {
      //Find the user and check to see what permissions you have
      const user = await User.find({organizationId: req.params.id});
      const organizationId = req.params.organizationId
      const projectId = req.params.projectId

      await Template.deleteOne({ _id: req.params.id })
      console.log("document has been removed")
      res.redirect(`/project/${organizationId}/${projectId}`)
    } catch (err) {
      console.log(`${err}, there was an error in deleting this working location.`);
    }
},
deleteTemplate: async (req, res) => {
  const organizationId = req.params.organizationId
  console.log(organizationId)
  try {
   await Template.deleteOne({ _id: req.params.templateId })
    console.log(`Company template has been removed`)
    res.redirect(`/template/${organizationId}/createTemplatePage`);
  } catch (err) {
    console.log(`${err}, there was an error in deleting this organization template.`);
  }
},

//*Gives the ability to sign off on a task and record the date of it.
signTask: async (req, res) => {
    try {
      
      const user = await User.findOne({_id: req.user._id});
      const scrollPosition = req.body.scrollPosition
      const { organizationId, projectId, templateId, objectId, taskId } = req.params;
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
        res.redirect(`/project/${organizationId}/${projectId}?scrollPosition=${scrollPosition}&openTask=${taskId}`);
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
        const scrollPosition = req.body.scrollPosition
        const { organizationId, projectId, templateId, objectId, taskId, signatureId } = req.params;
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
          res.redirect(`/project/${organizationId}/${projectId}?scrollPosition=${scrollPosition}&openTask=${taskId}`);
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
        const { templateId, taskId, organizationId } = req.params
        const { taskDetail, reference } = req.body

        // Use array filters to target the specific task
        const result = await Template.findOneAndUpdate(
          { "_id": templateId, "tasks._id": taskId },
          {
            $set: {
              "tasks.$.taskDetail":  taskDetail ,
              "tasks.$.reference": reference
              }
            },

          { new: true }
        );
        if(result){
          console.log(`You have successfully updated ${result}!`)
         res.redirect(`/template/${organizationId}/createTemplatePage`);
       }else{
        console.log('Task or Template not found');
        res.status(404).send('Task or Template not found');
      }
    } 
      catch (err) {
         console.log(`${err}, there was an error in Editing this task or reference`);
       };
    },
} 
