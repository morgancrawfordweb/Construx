const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Company = require("../models/Company");

//Company login page//

exports.getCompanyLogin = (req, res) => {
    if (req.company) {
      return res.redirect("/companyProfile");
    }
    res.render("companyLogin", {
      title: "Company Login",
    });
  };
  
  exports.postCompanyLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.emailAddress))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.companyPassword))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/companyLogin");
    }
    req.body.emailAddress = validator.normalizeEmail(req.body.emailAddress, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("local", (err, company, info) => {
      if (err) {
        return next(err);
      }
      if (!company) {
        req.flash("errors", info);
        return res.redirect("/companyLogin");
      }
      req.logIn(company, (err) => {
        if (err) {
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in as the company Admin." });
        res.redirect(req.session.returnTo || "/companyProfile");
      });
    })(req, res, next);
  };
  
  exports.companyLogout = (req, res) => {
    req.logout(() => {
      console.log('Company Administrator has logged out.')
    })
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.user = null;
      res.redirect("/");
    });
  };

//This is to sign the company up to use the service.//

exports.getCompanySignup = (req, res) => {
    if (req.company) {
      return res.redirect("/companyProfile");
    }
    res.render("companySignup", {
      title: "Create Company Account",
    });
  };
  
  exports.postCompanySignup = (req, res, next) => {

    const validationErrors = [];
    if (!validator.isEmail(req.body.emailAddress))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
      if (!validator.isLength(req.body.companyIdNumber, { min: 8 }))
      validationErrors.push({
        msg: "This is a way for your employees to see your documents. We take ",
      });

    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    if (req.body.companyIdNumber !== req.body.confirmCompanyIdNumber)
      validationErrors.push({ msg: "Passwords do not match" });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../companySignup");
    }
    req.body.emailAddress = validator.normalizeEmail(req.body.emailAddress, {
      gmail_remove_dots: false,
    });

    const company = new Company({
      companyName: req.body.companyName,
      address: req.body.address,
      emailAddress: req.body.emailAddress,
      companyPassword: req.body.companyPassword,
      phoneNumber: req.body.phoneNumber,
      companyIdNumber: req.body.companyIdNumber,
    });
  
    Company.findOne(
      { $or: [{ companyIdNumber: req.body.companyIdNumber }, { companyName: req.body.companyName }] },
      (err, existingCompany) => {
        if (err) {
          return next(err);
        }
        if (existingCompany) {
          req.flash("errors", {
            msg: "Account with that address or company ID Number already exists.",
          });
          return res.redirect("../companySignup");
        }
        company.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(company, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/companyProfile");
          });
        });
      }
    )};