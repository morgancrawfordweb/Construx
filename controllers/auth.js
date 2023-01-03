const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");





exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("login", {
    title: "Login",
  });
};



exports.postLogin = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: "Password cannot be blank." });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("/login");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash("errors", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", { msg: "Success! You are logged in." });
      res.redirect(req.session.returnTo || "/profile");
    });
  })(req, res, next);
};

exports.logout = (req, res) => {
  req.logout(() => {
    console.log('User has logged out.')
  })
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
    res.redirect("/");
  });
};

exports.getSignup = (req, res) => {
  if (req.user) {
    return res.redirect("/profile");
  }
  res.render("signup", {
    title: "Create Account",
  });
};

exports.postSignup = (req, res, next) => {
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    company: req.body.company,
    companyIdNumber: req.body.companyIdNumber,
    employeeIdNumber: req.body.employeeIdNumber,
    securityQuestion: req.body.securityQuestion,
    securityAnswer: req.body.securityAnswer
  });

  User.findOne(
    { $or: [{ email: req.body.email }, { userName: req.body.userName }] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address or username already exists.",
        });
        return res.redirect("../signup");
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect("/profile");
        });
      });
    }
  )};

//   exports.getCompanyLogin = (req, res) => {
//     if (req.company) {
//       return res.redirect("/companyProfile");
//     }
//     res.render("companyLogin", {
//       title: "Company Login",
//     });
//   };
  
//   exports.postCompanyLogin = (req, res, next) => {
//     const validationErrors = [];
//     if (!validator.isEmail(req.body.emailAddress))
//       validationErrors.push({ msg: "Please enter a valid email address." });
//     if (validator.isEmpty(req.body.companyPassword))
//       validationErrors.push({ msg: "Password cannot be blank." });
  
//     if (validationErrors.length) {
//       req.flash("errors", validationErrors);
//       return res.redirect("/companyLogin");
//     }
//     req.body.emailAddress = validator.normalizeEmail(req.body.emailAddress, {
//       gmail_remove_dots: false,
//     });
  
//     passport.authenticate("local", (err, company, info) => {
//       if (err) {
//         return next(err);
//       }
//       if (!company) {
//         req.flash("errors", info);
//         return res.redirect("/companyLogin");
//       }
//       req.logIn(company, (err) => {
//         if (err) {
//           return next(err);
//         }
//         req.flash("success", { msg: "Success! You are logged in as the company Admin." });
//         res.redirect(req.session.returnTo || "/companyProfile");
//       });
//     })(req, res, next);
//   };
  
//   exports.companyLogout = (req, res) => {
//     req.logout(() => {
//       console.log('Company Administrator has logged out.')
//     })
//     req.session.destroy((err) => {
//       if (err)
//         console.log("Error : Failed to destroy the session during logout.", err);
//       req.user = null;
//       res.redirect("/");
//     });
//   };

// //This is to sign the company up to use the service.//

// exports.getCompanySignup = (req, res) => {
//     if (req.company) {
//       return res.redirect("/companyProfile");
//     }
//     res.render("companySignup", {
//       title: "Create Company Account",
//     });
//   };
  
//   exports.postCompanySignup = (req, res, next) => {

//     const validationErrors = [];
//     if (!validator.isEmail(req.body.emailAddress))
//       validationErrors.push({ msg: "Please enter a valid email address." });
//     if (!validator.isLength(req.body.companyPassword, { min: 8 }))
//       validationErrors.push({
//         msg: "Password must be at least 8 characters long",
//       });
//       if (!validator.isLength(req.body.companyIdNumber, { min: 8 }))
//       validationErrors.push({
//         msg: "This is a way for your employees to see your documents. We take ",
//       });

//     if (req.body.companyPassword !== req.body.confirmCompanyPassword)
//       validationErrors.push({ msg: "Passwords do not match" });

  
//     if (validationErrors.length) {
//       req.flash("errors", validationErrors);
//       return res.redirect("../companySignup");
//     }
//     req.body.emailAddress = validator.normalizeEmail(req.body.emailAddress, {
//       gmail_remove_dots: false,
//     });

//     const company = new Company({
//       companyName: req.body.companyName,
//       address: req.body.address,
//       emailAddress: req.body.emailAddress,
//       companyPassword: req.body.companyPassword,
//       phoneNumber: req.body.phoneNumber,
//       companyIdNumber: req.body.companyIdNumber,
//     });
  
//     Company.findOne(
//       { $or: [{ companyIdNumber: req.body.companyIdNumber }, { companyName: req.body.companyName }] },
//       (err, existingCompany) => {
//         if (err) {
//           return next(err);
//         }
//         if (existingCompany) {
//           req.flash("errors", {
//             msg: "Account with that address or company ID Number already exists.",
//           });
//           return res.redirect("../companySignup");
//         }
//         company.save((err) => {
//           if (err) {
//             return next(err);
//           }
//           req.logIn(company, (err) => {
//             if (err) {
//               return next(err);
//             }
//             res.redirect("/companyProfile");
//           });
//         });
//       }
//     )};

  




