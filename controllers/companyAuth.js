const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Company = require("../models/Company");

//Company login page//

exports.getCompanyLogin = (req, res) => {
    if (req.company) {
      return res.redirect("/companyProfile.ejs");
    }
    res.render("companyLogin", {
      title: "Company Login",
    });
  };
  
  exports.postCompanyLogin = (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.companyEmail))
      validationErrors.push({ msg: "Please enter a valid companyEmail address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("/companyLogin");
    }
    req.body.companyEmail = validator.normalizeEmail(req.body.companyEmail, {
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
      req.logIn(name, (err) => {
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

exports.getCompanyRegister = (req, res) => {

  function generateCustomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  //
  const generatedId = generateCustomId(36);

    if (req.company) {
      return res.redirect("../companyProfile.ejs");
    }
    res.render("registerCompany", {
      title: "Create Company Account",
      generatedId: generatedId,
    });
  };


  
  exports.postCompanyRegister = (req, res, next) => {

    const validationErrors = [];
    if (!validator.isEmail(req.body.companyEmail))
      validationErrors.push({ msg: "Please enter a valid email address address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
      if (!validator.isLength(req.body.companyId, { min: 12 }))
      validationErrors.push({
        msg: "Your companyId must be at least 12 characters long",
      });

      //Checks if passwords are matching
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    //Checks if companyId's are matching
    if (req.body.companyId !== req.body.companyId)
      validationErrors.push({ msg: "Company Id's do not match" });

  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../companySignup");
    }
    req.body.companyEmail = validator.normalizeEmail(req.body.companyEmail, {
      gmail_remove_dots: false,
    });

    const company = new Company({
      name: req.body.name,
      companyEmail: req.body.companyEmail,
      password: req.body.password,
      companyId: req.body.companyId,
    });
  
    Company.findOne(
      { $or: [{ name: req.body.name }, { companyId: req.body.companyId }] },
      (err, existingCompany) => {
        if (err) {
          return next(err);
        }
        if (existingCompany) {
          req.flash("errors", {
            msg: "Account with that company name or companyId already exists.",
          });
          return res.redirect("../registerCompany");
        }
        company.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(company, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("../companyProfile");
          });
        });
      }
    )};
