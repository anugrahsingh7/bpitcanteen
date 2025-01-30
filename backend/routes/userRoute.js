const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const twilio = require("twilio");

// Initialize Twilio Client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Generate and send OTP
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone)
    return res.status(400).json({ message: "Phone number is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpExpires = new Date(
      Date.now() + Number(process.env.OTP_EXPIRATION)
    ); // Expire in 5 min

    // Store OTP in DB
    let user = await User.findOne({ phone });
    if (!user) user = new User({ phone });
    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error sending OTP", error: error.message });
  }
});

module.exports = router;
