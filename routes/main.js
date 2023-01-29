const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const calendarController = require("../controllers/calendars");
const forgotPasswordController = require("../controllers/forgotPassword");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Main Routes - simplified for now
router.get("/", homeController.getIndex);
// router.get("/", homeController.getCalendar);
router.get("/profile", ensureAuth, projectsController.getProfile);


router.get("/feed", ensureAuth, projectsController.getFeed);

router.get("/calendar", ensureAuth, calendarController.getCalendar);


router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);


router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);










router.get("/forgotPassword", forgotPasswordController.getForgotPassword);
router.put("/forgotPassword", forgotPasswordController.updateOldPassword);



module.exports = router;
