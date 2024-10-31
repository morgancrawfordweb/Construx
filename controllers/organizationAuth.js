const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Organization = require("../models/Organization");

//Organization login page//

exports.getOrganizationLogin = (req, res) => {
    if (req.organization) {
      return res.redirect("/organizationProfile");
    }
    res.render("organizationLogin", {
      title: "OrganizationLogin",
    });
  };
  
  exports.postOrganizationLogin = (req, res, next) => {
    const validationErrors = [];

    if (!validator.isEmail(req.body.organizationEmail))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (validator.isEmpty(req.body.password))
      validationErrors.push({ msg: "Password cannot be blank." });
  
    if (validationErrors.length) {
      console.log(validationErrors)
      req.flash("errors", validationErrors);
      return res.redirect("/organizationLogin");
    }

    req.body.organizationEmail = validator.normalizeEmail(req.body.organizationEmail, {
      gmail_remove_dots: false,
    });
  
    passport.authenticate("organization", (err, organization, info) => {
      if (err) {
        console.log(err, '1')
        return next(err);
      }
      if (!organization) {
        req.flash("errors", info);
        console.log(err)
        console.log(organization)
        console.log(info, '2')
        return res.redirect("/organizationLogin");
      }
      req.logIn(organization, (err) => {
        if (err) {
          console.log(err, '3')
          return next(err);
        }
        req.flash("success", { msg: "Success! You are logged in as the organization Admin." });
        res.redirect(req.session.returnTo || "/organizationProfile");
      });
    })(req, res, next);
  };
  
  exports.organizationLogout = (req, res) => {
    req.logout(() => {
      console.log('Organization Administrator has logged out.')
    })
    req.session.destroy((err) => {
      if (err)
        console.log("Error : Failed to destroy the session during logout.", err);
      req.organization = null;
      res.redirect("/");
    });
  };

//This is to sign the organization up to use the service.//

exports.getOrganizationRegister = (req, res) => {
  function generateCustomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const generatedId = generateCustomId(36);
   if(req.user){
     return res.redirect("/organizationProfile")
   }
    res.render("registerOrganization", {
      title: "Create Organization Account",
      generatedId: generatedId,
    });
  };


  
  exports.postOrganizationRegister = (req, res, next) => {

    const validationErrors = [];
    if (!validator.isEmail(req.body.organizationEmail))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
      if (!validator.isLength(req.body.organizationId, { min: 12 }))
      validationErrors.push({
        msg: "Your organizationId must be at least 12 characters long",
      });

      //Checks if passwords are matching
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    //Checks if organizationId's are matching
    if (req.body.organizationId !== req.body.confirmOrganizationId)
      validationErrors.push({ msg: "Organization Id's do not match" });

  
    if (validationErrors.length) {
      req.flash("errors", validationErrors);
      return res.redirect("../registerOrganization");
    }
    req.body.organizationEmail = validator.normalizeEmail(req.body.organizationEmail, {
      gmail_remove_dots: false,
    });

    const organization = new Organization({
      name: req.body.name,
      organizationEmail: req.body.organizationEmail,
      password: req.body.password,
      organizationId: req.body.organizationId,
    });
  
    Organization.findOne(
      { $or: [{ name: req.body.name }, { organizationId: req.body.organizationId }] },
      (err, existingCompany) => {
        if (err) {
          return next(err);
        }
        if (existingCompany) {
          req.flash("errors", {
            msg: "Account with that organization name or organizationId already exists.",
          });
          return res.redirect("../registerOrganization");
        }
        organization.save((err) => {
          if (err) {
            return next(err);
          }
          req.logIn(organization, (err) => {
            if (err) {
              return next(err);
            }
            res.redirect("/organizationProfile");
          });
        });
      }
    )};

    // exports.postRegisterNewUser = (req, res, next) => {
    //   const validationErrors = [];
    //   if (!validator.isLength(req.body.password, { min: 8 }))
    //     validationErrors.push({
    //       msg: "Password must be at least 8 characters long",
    //     });

    //   if (req.body.password !== req.body.confirmPassword)
    //     validationErrors.push({ msg: "Passwords do not match" });
    
    //     if (!req.body.firstName || !req.body.lastName || !req.body.password || !req.body.phoneNumber) {
    //       validationErrors.push({ msg: "All fields are required." });
    //     }
    
    //   if (validationErrors.length) {
    //     req.flash("errors", validationErrors);
    //     return res.redirect("../signup");
    //   }
    //   req.body.email = validator.normalizeEmail(req.body.email, {
    //     gmail_remove_dots: false,
    //   });
    
    //   const user = new User({
    //     firstName: req.body.firstName,
    //     lastName: req.body.lastName,
    //     phoneNumber: req.body.phoneNumber,
    //     password: req.body.password,

    //     //need this to grab the users information based on the email clicked for the link and then the 
    //     email: req.params.email,
    //     organizationId: req.params.organizationId,
    //   });
    
      
    
    //   User.findOne(
    //     { $or: [{ email: req.body.email }, 
    //       // { firstName: req.body.firstName }, { lastName: req.body.lastName }
    //     ] },
    //     (err, existingUser) => {
    //       if (err) {
    //         return next(err);
    //       }
    //       if (existingUser) {
    //         req.flash("errors", {
    //           msg: "Account with that email address already exists",
    //         });
    //         return res.redirect("../signup");
    //       }
    //       user.save((err) => {
    //         if (err) {
    //           return next(err);
    //         }
    //         req.logIn(user, (err) => {
    //           if (err) {
    //             return next(err);
    //           }
    //           res.redirect("/profile");
    //         });
    //       });
    //     },
    
        
    //   )};

    // &Nj1eC7xC@_3alu8F(93jOY)V+@K1)GATUSA
