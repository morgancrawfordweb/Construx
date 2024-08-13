






const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const projectsController = require("../controllers/projects");
const forgotPasswordController = require("../controllers/forgotPassword");
const { ensureAuth, ensureCompanyAuth, ensureGuest } = require("../middleware/auth");
const companyController = require("../controllers/company")
const companyAuthController = require("../controllers/companyAuth");



app.post("/create-subscription", ensureCompanyAuth, subscriptionController.createSubscription)
app.get("/subscription-page")




module.exports = router;
