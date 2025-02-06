const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/userModel");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
router.route("/").get(authController.protect, userController.getAllUsers);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router
  .route("/:id")
  .get(userController.getUser)
  .delete(userController.deleteUser);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/resetPassword/:token", authController.resetPassword);
router.get("/me", authController.protect, userController.getMe);
module.exports = router;
