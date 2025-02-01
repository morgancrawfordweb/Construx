const express = require("express");
const router = express.Router();
const organizationAuthController = require("../controllers/organizationAuth");
const organizationsController = require("../controllers/organizations");
const homeController = require("../controllers/home");
const upload = require("../middleware/multer");
const authController = require("../controllers/auth");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const subscriptionController = require("../controllers/subscriptions")



//!Organization Routes

//Getting the subscriptions page.
router.get("/subscriptionPage", ensureAuth, organizationsController.getSubscriptionPage);

//Creates and sends the invite link for the app
router.post("/:organizationId/inviteNewUser", ensureAuth, organizationsController.postInviteNewUser)

//This route is to signup the user after accepting the invitation via email link
// router.post("/signupInvitedUser", organizationsController.postSignupInvitedUser)
 
//This gets the new page to signup the invited users
// router.get("/:organizationId/invitedUserSignupPage", authController.getInvitedUserSignupPage);




//this route gets the organization
router.get("/:organizationId", ensureAuth, organizationsController.getOrganizationProfile);

//This route is used to create organizations. . . you will be the owner
router.post("/createOrganization", upload.single("file"),organizationsController.createOrganization);

//This route deletes an organization/company
router.delete("/deleteOrganization/:organizationId", ensureAuth, organizationsController.deleteOrganization);



router.delete("/deleteEmployee/:organizationId/:userId", ensureAuth, organizationsController.deleteEmployee)





module.exports = router