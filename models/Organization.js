 const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const CryptoJS = require('crypto-js')


const Organization = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  // All of the current users and everything that they can create gets stored here inside of these arrays.
  users: [{
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    firstName:{type:String, ref:"User"},
    lastName:{type:String, ref:"User"},
    email: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'owner'],
      default: 'user',
      required: true
    },
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
});


module.exports = mongoose.model('Organization', Organization);

  //Give everyone a default free subscription of up to 5 projects. Add a possibility of a subscription.
  // subscription: {
  //   stripeCustomerId: {
  //     type: String,
  //     unique: true
  //   },
  //   stripeSubscriptionId: {
  //     type: String,
  //     unique: true,
  //   },
  //   subscriptionTier:{
  //     tier: [{
  //         type: String,
  //         enum: ['Basic', 'Standard', 'Premium', 'Unlimited'], 
  //      }],
  //     //  Basic=10-25, Standard= 25-50, Premium 50-150, Unlimited 150+
  //     default:['Free'], //0-10 projects
  // },
  // },

