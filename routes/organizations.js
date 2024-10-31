const express = require("express");
const router = express.Router();
const organizationAuthController = require("../controllers/organizationAuth");
const organizationController = require("../controllers/organization");
const homeController = require("../controllers/home");
const authController = require("../controllers/auth");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const subscriptionController = require("../controllers/subscriptions")



//!Organization Routes

//Getting the subscriptions page.
router.get("/subscriptionPage", organizationController.getSubscriptionPage);

//Creates and sends the invite link for the app
router.post("/inviteNewUser", organizationController.postInviteNewUser)


//This route is to signup the user after accepting the invitation via email link
router.post("/signupInvitedUser", organizationController.postSignupInvitedUser)
 

//This gets the new page to signup the invited users
router.get("/invitedUserSignupPage", authController.getInvitedUserSignupPage);


module.exports = router