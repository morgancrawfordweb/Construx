const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  company: {type: String, require:true},
  phoneNumber:{type:String, required:true},
  employeeIdNumber:{type:String,required:true, unique: true},
  companyIdNumber:{type:String,required:true},
  // roles: {
  //   type: [{
  //       type: String,
  //       enum: ['user', 'admin']
  //   }],
  //   default: ['user']
  // },
  securityQuestion: {type: String, unique: true},
  securityAnswer: {type: String, unique: true},
  // certifications:{type:String},
});

// Password hash middleware.

UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

//Security Answer Hash
UserSchema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("securityAnswer")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.securityAnswer, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.securityAnswer = hash;
      next();
    });
  });
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

module.exports = mongoose.model("User", UserSchema);
