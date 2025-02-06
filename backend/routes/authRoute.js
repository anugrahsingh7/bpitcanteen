const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/userModel");
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google redirects to
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const { user, token } = req.user;

    // Return JWT token to the client
    res.cookie("token", token, { secure: false, httpOnly: false });
    res.redirect("http://localhost:5173/snacks");
  }
);

module.exports = router;
