const mongoose = require('mongoose');

const UserOTPVerificationSchema = new mongoose.Schema({
  userID: String,
  otp: String,
  creatdAt: Date,
  expiresAt: Date
});
module.exports = mongoose.model(
  'UserOTPVerification',
  UserOTPVerificationSchema
);
