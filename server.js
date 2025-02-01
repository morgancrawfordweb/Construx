const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const connectDB = require("./config/database");
// const fullCalendar = require("fullcalendar")
// const fs = require('fs')
const path = require('path')
const cryptoJS = require('crypto-js')
// const stripe = require('stripe')

//node-module of pdf-lib. This will give me the ability to create a new PDF , hopefully be able to create new checklists from an HTML form
// const pdfDocument= require("pdf-lib")


//logging in or creating companies for the application
const mainRoutes = require("./routes/main");

// supposed to store a calendar among other things
const eventRoutes = require("./routes/events")

//holding onto all of the meat for the project
const projectRoutes = require("./routes/projects");
const documentRoutes = require("./routes/documents");
const templateRoutes = require("./routes/templates");

//Supposed to be for companies, Right now Im just going to treat a organization as a user
const organizationRoutes = require("./routes/organizations");

//Supposed to be for companies, Right now Im just going to treat a organization as a user
const subscriptionRoutes  = require("./routes/subscriptions");




//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));


//Body Parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// app.use(companyPassport.initialize());
// app.use(companyPassport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", mainRoutes);
app.use("/event", eventRoutes);
app.use("/project", projectRoutes);
app.use("/document", documentRoutes);
app.use("/organization", organizationRoutes);
// app.use("/subscription", subscriptionRoutes);
app.use("/template", templateRoutes);

//Server Running
app.listen(process.env.PORT || PORT, () => {
  console.log("Server is running, you better catch it!");
});


