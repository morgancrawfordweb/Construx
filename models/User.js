const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CryptoJS = require('crypto-js')

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true },
  password: String,
  phoneNumber:{type:String, required: true },

  //Holds onto the organizations that you are apart of. This will not include your own organization, just the ones you are apart of.
  network:[{
        organizationId:{type: mongoose.Schema.Types.ObjectId, ref:"Organization"},
        organizationName: {type: String, ref: "Organization"},
        role: { 
              type: String,
              enum: ['user', 'admin', 'owner'],
              default: 'user',
              required: true,
        },
  }],
  
  // securityQuestion: {type: String, unique: true},
  // securityAnswer: {type: String, unique: true},
  profilePicture:{type: String},
  // certifications:{
  //   type:[{
  //     type:String
  //   }]},
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

//properly hashes the organizationId to add more security to documents and templates.
// UserSchema.pre('save', function(next) {
//   if (this.isModified('organizationId')) {
//     this.organizationId = CryptoJS.SHA256(this.organizationId).toString(CryptoJS.enc.Hex);
//   }
//   next();
// });


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
