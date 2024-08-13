const express = require("express");
const router = express.Router();
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const companyController = require("../controllers/company")
const companyAuthController = require("../controllers/companyAuth");
const subscriptionsController = require("../controllers/subscriptions")



//Get the subscription page
// router.get("/subscriptionSignup", ensureCompanyAuth, subscriptionsController.getSubscription);



module.exports = router;
