const passport = require("passport");
const validator = require("validator");
const User = require("../models/User");
const Company = require("../models/Company")
const CryptoJS = require('crypto-js')
const Invite = require("../models/Invite")






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


  function generateCustomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+~';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  if (req.user) {
    return res.redirect("/profile");
  }
  //
  const generatedId = generateCustomId(30);

  res.render("signup", {
    title: "Create Account",
    generatedId: generatedId
  });
};

exports.postSignup = async (req, res, next) => {
  
  const validationErrors = [];
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: "Please enter a valid email address." });
  if (!validator.isLength(req.body.password, { min: 8 }))
    validationErrors.push({
      msg: "Password must be at least 8 characters long",
    });
  if (req.body.password !== req.body.confirmPassword)
    validationErrors.push({ msg: "Passwords do not match" });

    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password || !req.body.phoneNumber || !req.body.userId) {
      validationErrors.push({ msg: "All fields are required." });
    }

  if (validationErrors.length) {
    req.flash("errors", validationErrors);
    return res.redirect("../signup");
  }
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_remove_dots: false,
  });


  try {
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { userId: req.body.userId }]
    });
    
    if (existingUser) {
      req.flash("errors", { msg: "Account with that email address or userId already exists." });
      return res.redirect("../signup");
    }
      // Check for invite token
      if (req.body.token) {
        const invite = await Invite.findOne({ token: req.body.token });
        
        if (!invite) {
          req.flash("errors", { msg: "Invalid or expired invite link." });
          return res.redirect("../signup");
        }
        
        company = await Company.findById(invite.companyId);
        if (!company) {
          req.flash("errors", { msg: "Associated company not found." });
          return res.redirect("../signup");
        }
      } else if (req.body.companyId) {
        const hashedCompanyId = CryptoJS.SHA256(req.body.companyId).toString(CryptoJS.enc.Hex);
        company = await Company.findOne({ companyId: hashedCompanyId });
        
        if (!company) {
          req.flash("errors", { msg: "Company not found. Please check your company ID." });
          return res.redirect("../signup");
        }
      }


      let company = null
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    userId: req.body.userId,
    companyId: req.body.companyId,
    company: company ? company._id : null,
    
  });


    if (req.body.companyId) {
      const hashedCompanyId = CryptoJS.SHA256(req.body.companyId).toString(CryptoJS.enc.Hex);

      const company = await Company.findOne({ companyId: hashedCompanyId });
      if (company) {
        console.log(company)
        company.users.push(user._id);
        await company.save();

      } else {
        req.flash("errors", { msg: "Company not found. Please check your company ID." });
        return res.redirect("../signup");
      }
    }
    
    

    await user.save();
    req.logIn(user, (err) => {
      if (err) return next(err);
      res.redirect("/profile");
    });
    if (req.body.token) {
      await Invite.findByIdAndDelete(invite._id);
    }
  } catch (err) {
    return next(err);
  }
};
  




