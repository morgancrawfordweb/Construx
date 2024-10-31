const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const forgotPasswordController = require("../controllers/forgotPassword");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const organizationController = require("../controllers/organization")
// const organizationAuthController = require("../controllers/organizationAuth");



//Main Routes - simplified for now
router.get("/", homeController.getIndex);

router.get("/profile", ensureAuth, projectsController.getProfile);
// router.put("/profile/addProfilePicture", ensureAuth, projectsController.addProfilePicture)


router.get("/feed", ensureAuth, projectsController.getFeed);


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);


router.get("/logout", authController.logout);


router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);

router.get("/about", homeController.getAbout)

router.get("/forgotPassword", forgotPasswordController.getForgotPassword);
router.put("/forgotPassword", forgotPasswordController.updateOldPassword);
//*
// !
// *
// router.get("/organizationProfile", organizationController.getOrganizationProfile);
//Company log-in
//This way you can add different bios and update your team etc.
// router.get("/organizationLogin", organizationAuthController.getOrganizationLogin);
// router.post("/organizationLogin", organizationAuthController.postOrganizationLogin);

//Logs you out of your organization dashboard
// router.get("/organizationLogout", organizationAuthController.organizationLogout);

//Company Register Page
// router.get("/registerOrganization", organizationAuthController.getOrganizationRegister);
// router.post("/registerOrganization", organizationAuthController.postOrganizationRegister);



module.exports = router;
