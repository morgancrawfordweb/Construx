const express = require("express");
const router = express.Router();
const companyAuthController = require("../controllers/companyAuth");
const companyController = require("../controllers/company");
const homeController = require("../controllers/home");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const subscriptionController = require("../controllers/subscriptions")


//Handles all subscribing logic.
// app.post("/create-subscription", ensureCompanyAuth, subscriptionController.createSubscription)

module.exports = router