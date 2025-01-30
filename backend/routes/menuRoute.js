const express = require("express");
const router = express.Router();
const menuController = require("../controllers/menuController");
router
  .route("/")
  .get(menuController.getMenuItems)
  .post(menuController.createMenuItem);

module.exports = router;
