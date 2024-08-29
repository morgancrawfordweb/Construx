const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const forgotPasswordController = require("../controllers/forgotPassword");
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const companyController = require("../controllers/company")
const companyAuthController = require("../controllers/companyAuth");



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


router.get("/how-to-instructional", homeController.getHowToInstructional)
// router.get("/about", homeController.getAbout)


router.get("/forgotPassword", forgotPasswordController.getForgotPassword);
router.put("/forgotPassword", forgotPasswordController.updateOldPassword);








//*
// !
// *
router.get("/companyProfile", ensureCompanyAuth, companyController.getCompanyProfile);
//Company log-in
//This way you can add different bios and update your team etc.
router.get("/companyLogin", companyAuthController.getCompanyLogin);
router.post("/companyLogin", companyAuthController.postCompanyLogin);

//Logs you out of your company dashboard
router.get("/companyLogout", companyAuthController.companyLogout);

//Company Register Page
router.get("/registerCompany", companyAuthController.getCompanyRegister);
router.post("/registerCompany", companyAuthController.postCompanyRegister);



module.exports = router;
