// routes/orderRoutes.js
const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // Add these in your .env file
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const order = new Order({ items, user: userId });
    await order.save();
    const razorpayOrder = await razorpay.orders.create({
      amount: order.totalAmount * 100, // Convert to paise (INR)
      currency: "INR",
      receipt: `receipt_${order._id}`,
    });
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();

    // Update the user with the new order reference
    await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

    res.status(201).json({
      message: "Order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create order", error });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name");
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.verifyPayment = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;

  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    // Update order status in the database
    await Order.findOneAndUpdate({ razorpayOrderId: razorpay_order_id });

    res
      .status(200)
      .json({ success: true, message: "Payment verified successfully" });
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};
