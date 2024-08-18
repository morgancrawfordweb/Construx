const mongoose = require("mongoose");

const InviteSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true,
      },
      companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d', // Automatically deletes the invite after 7 days
      },
      used: {
        type: Boolean,
        default: false,
      },
    });
    
    module.exports = mongoose.model('Invite', InviteSchema);
