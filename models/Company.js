const bcrypt = require("bcrypt");
const mongoose = require("mongoose");


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyIdNumber: {
    type: String,
    required: true,
    unique: true,
  },
  subscription: {
    stripeCustomerId: {
      type: String,
      required: true,
    },
    stripeSubscriptionId: {
      type: String,
      required: true,
    },
    tier: {
      type: String,
      enum: ['Basic', 'Standard', 'Premium'],
      required: true,
    },
    projectsCount: {
      type: Number,
      default: 0,
    },
  },
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Company = mongoose.model('Company', CompanySchema);
module.exports = Company;



//comanyID hash middleware
CompanySchema.pre("save", function save(next) {
  const company = this;
  if (!company.isModified("companyPassword")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(company.companyPassword, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      company.companyPassword = hash;
      next();
    });
  });
});



//CompanyID Hash
// CompanySchema.pre("save", function save(next) {
//   const company = this;
//   if (!company.isModified("companyIdNumber")) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(company.companyIdNumber, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       company.companyIdNumber = hash;
//       next();
//     });
//   });
// });




//helper method for validating companies passwords
CompanySchema.methods.compareCompanyPassword = function compareCompanyPassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};



// Helper method for validating companies ID number.

// CompanySchema.methods.compareCompanyIdNumber = function compareCompanyIdNumber(
//   candidateCompanyIdNumber,
//   cb
// ) {
//   bcrypt.compare(candidateCompanyIdNumber, this.companyIdNumber, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };


module.exports = mongoose.model("Company", CompanySchema);
