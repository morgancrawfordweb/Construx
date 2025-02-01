const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");


module.exports = function (passport) {
  // User Strategy
  passport.use(
    "user",
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found.` });
        }
        if (!user.password) {
          return done(null, false, {
            msg:
              "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
          });
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, user);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );
    // Serialize and Deserialize User
    passport.serializeUser((entity, done) => {
      done(null, { id: entity.id, type: entity instanceof User ? 'User' : 'Organization' });
    });
  
    passport.deserializeUser((obj, done) => {
      const Model = obj.type === 'User' ? User : Organization;
      Model.findById(obj.id, (err, entity) => done(err, entity));
    });
  }
  // Organization Strategy
//   passport.use(
//     "organization",
//     new LocalStrategy({ usernameField: "organizationEmail" }, (organizationEmail, password, done) => {
//       Organization.findOne({ organizationEmail: organizationEmail.toLowerCase() }, (err, organization) => {
//         if (err) {
//           return done(err);
//         }
//         if (!organization) {
//           return done(null, false, { msg: `Email ${organizationEmail} not found.` });
//         }
//         if (!organization.password) {
//           return done(null, false, {
//             msg: "Your organization account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your organization profile.",
//           });
//         }
//         organization.compareOrganizationPassword(password, (err, isMatch) => {
//           if (err) {
//             return done(err);
//           }
//           if (isMatch) {
//             return done(null, organization);
//           }
//           return done(null, false, { msg: "Invalid email or password." });
//         });
//       });
//     })
//   );


