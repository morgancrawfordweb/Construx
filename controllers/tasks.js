const TaskSheet = require("../models/TaskSheet.js")

module.exports = {
  getCreateTaskSheetPage:(req,res)=>{
      res.render("tasksheet.ejs")
  },
  createTaskSheet: async (req, res) => {
        try {
          
          await TaskSheet.create({
            templateName: req.body.templateName,
            taskTitle: req.body.taskTitle,
            task: req.body.task,
          });
          console.log("Task sheet has been created");
          res.redirect("/profile/"+req.params.id);
        } catch (err) {
          // console.log(err);
          // alert('Their is already a project with those parameters in the database.')
        }
      },
  
      // createTaskSheetTemplate: async (req, res) => {
      //   try {
      //     const taskSheet = await TaskSheet.updateOne({ user: req.user.id}); 

      //     await TaskSheet.create({
      //       taskName: req.body.taskName,
      //       dateCompleted: Date,
      //     })

      //     res.render("task.ejs", {projects: projects, taskSheet: taskSheet});
      //   } catch (err) {
      //     console.log(err);
      //   }
      // },
      // deleteTaskSheet: async( req, res ) => {
      //   try{
          
      //     await TaskSheet.deleteOne({_id: req.params.id});
      //     console.log('Task Deleted')
      //     res.render("project.ejs");
      //   }catch(err){
      //     console.log(err)
      //   }
      // }

}