const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User");
const Company = require("../models/Company");



// module.exports = function (passport) {
//   passport.use(
//     new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
//       // First, try to find the user by email
//       User.findOne({ email: email.toLowerCase() }, (err, user) => {
//         if (err) return done(err);
//         if (!user) {
//           // If no user is found, try to find the company
//           Company.findOne({ companyEmail: companyEmail.toLowerCase() }, (err, company) => {
//             if (err) return done(err);
//             if (!company) {
//               // No user or company found with the provided email
//               return done(null, false, { msg: `Email ${email} not found.` });
//             }
//             if (!company.password) {
//               return done(null, false, {
//                 msg: "Your company was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your company profile.",
//               });
//             }
//             // Compare the company password
//             company.compareCompanyPassword(password, (err, isMatch) => {
//               if (err) return done(err);
//               if (isMatch) return done(null, company);
//               return done(null, false, { msg: "Invalid email or password." });
//             });
//           });
//         } else {
//           // Compare the user password
//           if (!user.password) {
//             return done(null, false, {
//               msg: "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
//             });
//           }
//           user.comparePassword(password, (err, isMatch) => {
//             if (err) return done(err);
//             if (isMatch) return done(null, user);
//             return done(null, false, { msg: "Invalid email or password." });
//           });
//         }
//       });
//     })
//   );

//   // Serialize the user or company for the session
//   passport.serializeUser((entity, done) => {
//     done(null, { id: entity.id, type: entity instanceof User ? "User" : "Company" });
//   });

//   // Deserialize the user or company based on type
//   passport.deserializeUser((obj, done) => {
//     if (obj.type === "User") {
//       User.findById(obj.id, (err, user) => done(err, user));
//     } else if (obj.type === "Company") {
//       Company.findById(obj.id, (err, company) => done(err, company));
//     }
//   });
// };

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

  // Company Strategy
  passport.use(
    "company",
    new LocalStrategy({ usernameField: "companyEmail" }, (companyEmail, password, done) => {
      Company.findOne({ companyEmail: companyEmail.toLowerCase() }, (err, company) => {
        if (err) {
          return done(err);
        }
        if (!company) {
          return done(null, false, { msg: `Email ${companyEmail} not found.` });
        }
        if (!company.password) {
          return done(null, false, {
            msg: "Your company account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your company profile.",
          });
        }
        company.compareCompanyPassword(password, (err, isMatch) => {
          if (err) {
            return done(err);
          }
          if (isMatch) {
            return done(null, company);
          }
          return done(null, false, { msg: "Invalid email or password." });
        });
      });
    })
  );

  // Serialize and Deserialize User
  passport.serializeUser((entity, done) => {
    done(null, { id: entity.id, type: entity instanceof User ? 'User' : 'Company' });
  });

  passport.deserializeUser((obj, done) => {
    const Model = obj.type === 'User' ? User : Company;
    Model.findById(obj.id, (err, entity) => done(err, entity));
  });
};
