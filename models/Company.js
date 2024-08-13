 const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CryptoJS = require('crypto-js')


const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
  companyId: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true
  },
  companyEmail: { 
    type: String,
    required: true, 
    unique: true,
  },
  // All of the current users and everything that they can create gets stored here inside of these arrays.
  users:[{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  }],
  documents:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Documents'
  }],
  templates:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Templates'
  }],

  //Give everyone a default free subscription of up to 5 projects. Add a possibility of a subscription.
  subscription: {
    stripeCustomerId: {
      type: String,
      unique: true
    },
    stripeSubscriptionId: {
      type: String,
      unique: true,
    },
    subscriptionTier:{
      tier: [{
          type: String,
          enum: ['Basic', 'Standard', 'Premium', 'Unlimited'], 
       }],
      //  Basic=10-25, Standard= 25-50, Premium 50-150, Unlimited 150+
      default:['Free'], //0-10 projects
  },
  },

});



//comanyID hash middleware
CompanySchema.pre("save", function save(next) {
  const company = this;
  if (!company.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(company.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      company.password = hash;
      next();
    });
  });
});

//properly hashes the companyId to add more security to documents and templates.
CompanySchema.pre('save', function(next) {
  if (this.isModified('companyId')) {
    this.companyId = CryptoJS.SHA256(this.companyId).toString(CryptoJS.enc.Hex);
  }
  next();
});



//helper method for validating companies passwords
CompanySchema.methods.compareCompanyPassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};



module.exports = mongoose.model('Company', CompanySchema);
