//!These are my notes of things to do while I'm working. This will help my flow and give me things to do while I work and stire up some ideas.

//TODO
//?
//!
//*

//TODO Double check and make sure that locations DONT cross projects. Maybe check req.params.id and hook those two things together.

///// TODO  Be able to delete a TaskSheet

/////TODO  Be able to store checklists inside mongoDB and then populate them per project.
/////TODO Make the templates collapsible per location

//TODO Add a signature for attached to the tasks.

//TODO Have the tasksheet check the user ID and the projectID to make sure only the company that created the sheet can use it, and they only show up on certain projectID

//TODO Create a list of already created templates in the "Create Template Page" to make sure you dont add more than one template. Copy code from the drop-down menu

//TODO - creating a feed to let you know what templates you have already created on the template.ejs page. But am getting a server 500 error. Template not defined? Not quite sure.

//TODO - Work on seperating the work locations by the project. Check the way that the documents grab the PARAms from the project. It should work the same way.

///// TODO - Application is grabbing every template regardless if it is true/false in the Select Template Dropdown menu. 

/////TODO - When I delete a work location, it just deletes the first one and not the specific work location. If I have Locations 1, 2, and 3, and I delete #2. . . It deletes the first one. AND I can ALSO delete the originals which is NOT good.
            /////?Maybe something that is going on with the button in the way that it is nested in the forEach loop?


// //! I havent added it to the controllers and!!!!!
// //! projects: req.project.id



