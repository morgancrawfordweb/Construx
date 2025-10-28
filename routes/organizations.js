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
const validateUser = require("../middleware/validateUserInOrganization");

//!Organization Routes

//Getting the subscriptions page.
router.get("/subscriptionPage", ensureAuth, organizationsController.getSubscriptionPage);

//Creates and sends the invite link for the app
router.post("/:organizationId/inviteNewUser", ensureAuth, organizationsController.postInviteNewUser)


//this route gets the organization
router.get("/:organizationId", validateUser, ensureAuth,  organizationsController.getOrganizationProfile);

//This route is used to create organizations. . . you will be the owner
router.post("/createOrganization", upload.single("file"),organizationsController.createOrganization);

//This route deletes an organization/company
router.delete("/deleteOrganization/:organizationId", ensureAuth, organizationsController.deleteOrganization);

router.delete("/deleteEmployee/:organizationId/:userId", ensureAuth, organizationsController.deleteEmployee)

//Adds event types for you organization to use later for event creation
router.post("/addEventType/:organizationId", organizationsController.addEventType);





module.exports = router