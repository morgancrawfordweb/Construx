const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  address:{type: String, unique:true},
  emailAddress: { type: String, unique: true },
  companyPassword: String,
  phoneNumber:{type: String, unique:true},
  companyIdNumber: String,
//   hoursOfOperation: {type: Date, required: false}

  // listOfEmployees:[{
  //   user: {type: mongoose.Schema.Types.ObjectId, ref: "employeeIdNumber"},
  //   usercompany: {type: mongoose.Schema.Types.ObjectId, ref: "companyIdNumber"},
  // }]
  
});


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
