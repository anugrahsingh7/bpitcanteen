// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Create an order
router.post("/create-order", orderController.createOrder);
router.get("/get-orders", orderController.getOrders);
router.post("/verify-payment", orderController.verifyPayment);

module.exports = router;
