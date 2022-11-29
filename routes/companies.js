const express = require("express");
const router = express.Router();
const companyController = require("../controllers/company");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Company log-in
//This way you can add different bios and update your team etc.
router.get("/companyLogin", companyController.getCompanyLogin);
router.post("/companyLogin", companyController.postCompanyLogin);

router.get("/companyLogout", companyController.companyLogout);


//Company Sign up
router.get("/companySignup", companyController.getCompanySignup);
router.post("/companySignup", companyController.postCompanySignup);


module.exports = router