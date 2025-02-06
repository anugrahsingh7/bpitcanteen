const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minLength: [8, "Password must be at least 8 characters long"],
    required: function () {
      // Password is only required if authType is 'local'
      return this.authType === "local";
    },
  },
  googleId: {
    type: String, // Store Google user ID for OAuth
    unique: true,
    sparse: true, // Allows unique values but also allows null
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
