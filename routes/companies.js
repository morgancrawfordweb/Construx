const express = require("express");
const router = express.Router();
const companyAuthController = require("../controllers/companyAuth");
const companyController = require("../controllers/company");
const homeController = require("../controllers/home");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");


router.get("/", homeController.getIndex);
router.get("/companyProfile", ensureAuth, companyController.getCompanyProfile);

//Company log-in
//This way you can add different bios and update your team etc.
router.get("/companyLogin", companyAuthController.getCompanyLogin);
router.post("/companyLogin", companyAuthController.postCompanyLogin);


router.get("/companyLogout", companyAuthController.companyLogout);


//Company Sign up
router.get("/companySignup", companyAuthController.getCompanySignup);
router.post("/companySignup", companyAuthController.postCompanySignup);



module.exports = router