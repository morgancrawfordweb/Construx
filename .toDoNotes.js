//!These are my notes of things to do while I'm working. This will help my flow and give me things to do while I work and stire up some ideas.

//TODO
//?
//!
//*

//*COMPLETED Double check and make sure that locations DONT cross projects. Maybe check req.params.id and hook those two things together.

//*COMPLETED  Be able to delete a TaskSheet

//*COMPLETED  Be able to store checklists inside mongoDB and then populate them per project.
//*COMPLETED Make the templates collapsible per location

//*COMPLETED Add a signature for attached to the tasks.

//*COMPLETED Have the tasksheet check the user ID and the projectID to make sure only the company that created the sheet can use it, and they only show up on certain projectID

//*COMPLETED Create a list of already created templates in the "Create Template Page" to make sure you dont add more than one template. Copy code from the drop-down menu

//*COMPLETED - creating a feed to let you know what templates you have already created on the template.ejs page. But am getting a server 500 error. Template not defined? Not quite sure.

//*COMPLETED- Work on seperating the work locations by the project. Check the way that the documents grab the PARAms from the project. It should work the same way.

//*COMPLETED - Application is grabbing every template regardless if it is true/false in the Select Template Dropdown menu. 

//*COMPLETED - When I delete a work location, it just deletes the first one and not the specific work location. If I have Locations 1, 2, and 3, and I delete #2. . . It deletes the first one. AND I can ALSO delete the originals which is NOT good.

//*COMPLETED  Be able to delete original templates

//*COMPLETED be able to remove signatures at another button press. Right now it just duplicates signature.

//*COMPLETED - Properly hased with cryptoJS to secure your companyIdNumber

//*COMPLETED Actually design the App in figma and create a dashboard that looks better.

//TODO Use google maps API to create addresses and add them to the the project. Render the map on the project dashboard.

//*COMPLETED  Work on creating a more Unique Identifier when determining companyID. Hash CompanyId

//TODO Create an EJS page to view the entire checklist. This will be the basis of creating the page to print off for a report.

//*COMPLETED Figure a way to have the objects named as the taskdetail instead of Object. Might have to change the schema

//TODO When i delete a project I want to be able to remove everything associated with the project, so that way my database doesnt get innundated with old objects.

//?Ideas that would be fun to work on.
//TODO From the template EJS, I want to make it to where you can see the tasks and who signed it, and then eventually I want to make it to where you can print off/save your checklist like a report.

//TODO When i sign a task, my open task just goes to the first task and opens it instead of the one i actually signed. Scroll position = undefined whenever i sign or delete a signature. Need to make sure the scroll position is good. 


//TODO Create a way to let you know what percentage of projects are completed maybe per location.

//*COMPLETED Deleting a picture res.redirects my organizationId to undefined.

//*COMPLETED Deleting a work location gives me /project/:projectId/:projectId instead of organizationId/projectId

//TODO When deleting a project, the uploads are not deleted with it also.
	
//*COMPLETED  Take total number of tasks and divide them by the number of tasks that have signatures then do the same for the projects and work locations. Be able to display the graph inside of your dashboard. and say "X% of tasks have been completed."

//TODO -Maybe create another widget that will tell me what percentage of my tasks are X or Y.

//TODO Display a percentage of what signatures are by a certain employee, and then maybe use those for your profile? Something like "MC has signed off on X% percentage of work on this project.

//*COMPLETED create a new UUID for companies whenever they sign up.

//*COMPLETED Right now all company templates show up on each other company. I need to make it to where only the organizations created show their own templates.

//!TIN LIST
//!TIN LIST
//!TIN LIST
//!TIN LIST
//!TIN LIST
//TODO Add authentication  to make sure you can't go to other organizations through copy/pasting into the URL. 


//!SAAS Capability Consider MongoDB costs, Heroku Costs
//TODO Use stripe to accept forms of payment.
    //? Need a way for users to sign-up and enter payment information.
    //? Secure payments through stripe and use API for monthly subscription charges.
    //? Charge users per number of projects created.
        //*Free users get up to 5-10 ongoing projects at a time? Paid users are charged in different amounts of projects. Project tier maybe?
        //*Dont want to go off number of users because 1 user could make 10k projects and not be charged extra. 
    //? Protect code from github.
    //? Creating a Company side to attach payments.
        //*Company can hold all of the payment information, and relate the companyIdNumber to this.
        //*Create a way to ensure UUID wouldn't


// I need to have the company portion working before things get serious.

// Be able to register a company with 

// number of projects the company has;
// create a company number
// create a company name
// create an array of users that share that same company number. 

// When you sign up, if you have the same company number AND name as the registered company, then you get access to all of the available documents that were created. This way people cant spook anything.





// Create each user with a 24 digit code that can be used for personal projects and for whomever wants to be on there team.

// The form will give each user