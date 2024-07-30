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

//COMPLETED  Be able to delete original templates


//COMPLETED be able to remove signatures at another button press. Right now it just duplicates signature.

//TODO Actually design the App in figma and create a dashboard that looks better.

//TODO Use google maps API to create addresses and add them to the the project. Render the map on the project dashboard.

//TODO Work on creating a more Unique Identifier when determining companyID. Hash CompanyId

//TODO Create an EJS page to view the entire checklist. This will be the basis of creating the page to print off for a report.

//TODO Figure a way to have the objects named as the taskdetail instead of Object. Might have to change the schema

//?Ideas that would be fun to work on.
//TODO From the template EJS, I want to make it to where you can see the tasks and who signed it, and then eventually I want to make it to where you can print off/save your checklist like a report.

//TODO Create a way to let you know what percentage of projects are completed maybe per location.
	
//TODO Take total number of tasks and divide them by the number of tasks that have signatures then do the same for the projects and work locations. Be able to display the graph inside of your dashboard. and say "X% of tasks have been completed."

//TODO -Maybe create another widget that will tell me what percentage of my tasks are X or Y.

//TODO Display a percentage of what signatures are by a certain employee, and then maybe use those for your profile? Something like "MC has signed off on X% percentage of work on this project.






