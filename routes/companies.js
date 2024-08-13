const express = require("express");
const router = express.Router();
const companyAuthController = require("../controllers/companyAuth");
const companyController = require("../controllers/company");
const homeController = require("../controllers/home");
// const calendarController = require("../controllers/calendars");
const { ensureAuth, ensureGuest } = require("../middleware/auth");



//Company log-in
//This way you can add different bios and update your team etc.
// router.get("/companyLogin", companyAuthController.getCompanyLogin);
// router.post("/companyLogin", companyAuthController.postCompanyLogin);


// router.get("/companyLogout", companyAuthController.companyLogout);


// //Company Register Page
// router.get("/companies/registerCompany", companyAuthController.getCompanyRegister);
// router.post("/companies/registerCompany", companyAuthController.postCompanyRegister);



module.exports = router