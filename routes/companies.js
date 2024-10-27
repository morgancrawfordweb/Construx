const express = require("express");
const router = express.Router();
const companyAuthController = require("../controllers/companyAuth");
const companyController = require("../controllers/company");
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const subscriptionController = require("../controllers/subscriptions")



//!Company Routes

//Getting the subscriptions page.
router.get("/subscriptionPage", companyController.getSubscriptionPage);

//Creates and sends the invite link for the app
router.post("/inviteNewUser", ensureCompanyAuth, companyController.postInviteNewUser)


//This route is to signup the user after accepting the invitation via email link
router.post("/signupInvitedUser", ensureCompanyAuth, companyController.postSignupInvitedUser)
 

//This gets the new page to signup the invited users
router.get("/invitedUserSignupPage", authController.getInvitedUserSignupPage);


module.exports = router