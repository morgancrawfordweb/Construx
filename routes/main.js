const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const calendarController = require("../controllers/calendars");
const forgotPasswordController = require("../controllers/forgotPassword");
const settingsController = require("../controllers/settings");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Main Routes - simplified for now
router.get("/", homeController.getIndex);
// router.get("/", homeController.getCalendar);
router.get("/profile", ensureAuth, projectsController.getProfile);


router.get("/feed", ensureAuth, projectsController.getFeed);

router.get("/calendar", ensureAuth, calendarController.getCalendar);

router.get("/settings", settingsController.getSettings);


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);


router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);


//Company log-in
//This way you can add different bios and update your team etc.
router.get("/companyLogin", authController.getCompanyLogin);
router.post("/companyLogin", authController.postCompanyLogin);

router.get("/companyLogout", authController.companyLogout);


//Company Sign up
router.get("/companySignup", authController.getCompanySignup);
router.post("/companySignup", authController.postCompanySignup);








router.get("/forgotPassword", forgotPasswordController.getForgotPassword);
router.put("/forgotPassword", forgotPasswordController.updateOldPassword);



module.exports = router;
