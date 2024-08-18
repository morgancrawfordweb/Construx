const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CryptoJS = require('crypto-js')

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  phoneNumber:{type:String, required:true },
  // Check company name and companyId, if they match through validation then they will go through

  //This is for the individual ID. This is mainly for other users to add each other to each others projects. Much like a discord tag
  userId: {type: String, required: true},

  //If you are registering for a company, you will be given this number. You will be able to use this number the same way we have been for the companyId
  companyId: { type: String, required: false, sparse: true },

  roles: {
    type: [{
        type: String,
        enum: ['user', 'employer']
    }],
    default: ['user']
  },
  // securityQuestion: {type: String, unique: true},
  // securityAnswer: {type: String, unique: true},
  profilePicture:{type: String},
  // certifications:{
  //   type:[{
  //     type:String
  //   }]},
    //This will look at the companyId and extract the reference type through the 36 digit code
    company: {type: mongoose.Schema.Types.ObjectId, ref:"Company"},
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

//properly hashes the companyId to add more security to documents and templates.
UserSchema.pre('save', function(next) {
  if (this.isModified('companyId')) {
    this.companyId = CryptoJS.SHA256(this.companyId).toString(CryptoJS.enc.Hex);
  }
  next();
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
