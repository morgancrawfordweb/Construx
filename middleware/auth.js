const Company = require("../models/Company");

module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/");
    }
  },
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    } else {
      res.redirect("/dashboard");
    }
  },
  ensureCompanyAuth: function (req, res, next) {
    if (req.isAuthenticated() && req.user && req.user instanceof Company) {
      return next();
    } else {
      res.redirect("/companyLogin");
    }
  },
};
