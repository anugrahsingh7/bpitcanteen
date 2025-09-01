// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create an order
router.post("/create-order", orderController.createOrder);
router.get("/get-orders", orderController.getOrders);
router.get("/:id", orderController.getOrder);
router.patch("/:id", orderController.updateOrder);
router.post("/verify-payment", orderController.verifyPayment);
router.post("/test-whatsapp", orderController.testWhatsApp);

module.exports = router;
