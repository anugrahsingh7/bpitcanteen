const express = require("express");
const router = express.Router();
const multer = require("multer");

// Multer configuration (for temporary storage before ImageKit upload)
const upload = multer({ dest: "uploads/" }); // Stores images temporarily in "uploads/" folder

const menuController = require("../controllers/menuController");

// Get all menu items
router.get("/", menuController.getMenuItems);

// Create menu item with image upload
router.post("/", upload.single("image"), menuController.createMenuItem);

// Update & Delete menu items
router
  .route("/:id")
  .patch(menuController.updateMenuItem)
  .delete(menuController.deleteMenuItem);

module.exports = router;
