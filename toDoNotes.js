//!These are my notes of things to do while I'm working. This will help my flow and give me things to do while I work and stire up some ideas.

const templates = require("./controllers/templates")

//TODO
//?
//!
//*

//COMPLETED Double check and make sure that locations DONT cross projects. Maybe check req.params.id and hook those two things together.

//COMPLETED  Be able to delete a TaskSheet

//COMPLETED  Be able to store checklists inside mongoDB and then populate them per project.
//COMPLETED Make the templates collapsible per location

//COMPLETED Add a signature for attached to the tasks.

//COMPLETED Have the tasksheet check the user ID and the projectID to make sure only the company that created the sheet can use it, and they only show up on certain projectID

//COMPLETED Create a list of already created templates in the "Create Template Page" to make sure you dont add more than one template. Copy code from the drop-down menu

//COMPLETED - creating a feed to let you know what templates you have already created on the template.ejs page. But am getting a server 500 error. Template not defined? Not quite sure.

//COMPLETED- Work on seperating the work locations by the project. Check the way that the documents grab the PARAms from the project. It should work the same way.

//COMPLETED - Application is grabbing every template regardless if it is true/false in the Select Template Dropdown menu. 

//COMPLETED - When I delete a work location, it just deletes the first one and not the specific work location. If I have Locations 1, 2, and 3, and I delete #2. . . It deletes the first one. AND I can ALSO delete the originals which is NOT good.

//TODO Be able to delete original templates

//TODO be able to edit tasks in templates

//TODO be able to remove signatures at another button press. Right now it just duplicates signature.

//TODO Actually design the App in figma and create a dashboard that looks better.

//TODO Use google maps API to create addresses and add them to the the project. Render the map on the project dashboard.

//TODO Work on creating a more Unique Identifier when determining companyID. Hash CompanyId

//TODO Create an EJS page to view the entire checklist. This will be the basis of creating the page to print off for a report.


//?THIS IS SUCH A GREAT IDEA
//TODO From the template EJS, I want to make it to where you can see the tasks and who signed it, and then eventually I want to make it to where you can print off/save your checklist like a report.
//!
//!
//!
//!
//!






