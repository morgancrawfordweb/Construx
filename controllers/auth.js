const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Organization = require("../models/Organization")





exports.getLogin = (req, res) => {
  if (req.user) {
    return res.redirect("/networkProfile");
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

  passport.authenticate("user", (err, user, info) => {
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
      res.redirect(req.session.returnTo || "/networkProfile");
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
//creates a customID for user  

  
  res.render("signup", {
    title: "Create Account",
  });
};

  //generate a randomID for your 
  function generateCustomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const generatedCollaboratorId = generateCustomId(34)


exports.postSignup = async (req, res, next) => {
try{

  

  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });

  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.phoneNumber) {
      validationErrors.push({ msg: "All fields are required." });
    }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });

  const organization = await Organization.findOne({"users.email":req.body.email})


  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    collaboratorInviteId : generatedCollaboratorId,
    network: organization
        ? [{ organizationName: organization.organizationName, organization: organization._id, roles: 'user' }]
        : [],
  });

  User.findOne(
    { $or: [{ email: req.body.email }, 
      // { firstName: req.body.firstName }, { lastName: req.body.lastName }
    ] },
    (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        req.flash("errors", {
          msg: "Account with that email address already exists",
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
          res.redirect("/networkProfile");
        });
      });
    
  });

}catch(err){
    console.log(err)

  
    
};
}
  
  exports.getInvitedUserSignupPage = async (req,res,next)=>{


    res.render("invitedUserSignup", {
      title: "Create Account",
      
    });
  };






