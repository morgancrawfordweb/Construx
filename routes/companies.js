const express = require("express");
const router = express.Router();
const companyAuthController = require("../controllers/companyAuth");
const companyController = require("../controllers/company");
const homeController = require("../controllers/home");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const subscriptionController = require("../controllers/subscriptions")



//!Company Routes

//Getting the subscriptions page.
router.get("/subscriptionPage", companyController.getSubscriptionPage);




module.exports = router