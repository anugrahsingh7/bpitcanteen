const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true },
  otp: { type: String }, // Store OTP temporarily
  otpExpires: { type: Date }, // Expiry time for OTP
});

module.exports = mongoose.model("User", userSchema);
