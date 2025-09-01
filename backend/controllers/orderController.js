// routes/orderRoutes.js
const express = require("express");
const Order = require("../models/orderModel");
const User = require("../models/userModel");
const Razorpay = require("razorpay");
const crypto = require("crypto");
const whatsappService = require("../services/whatsappMetaService");

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create an order
exports.createOrder = async (req, res) => {
  const { items } = req.body;

  try {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const razorpayOrder = await razorpay.orders.create({
      amount: totalAmount * 100,
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    });
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
exports.getOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).populate("user", "name email");
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId,
    items,
    mobileNumber,
    instructions,
  } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    try {
      const order = new Order({
        items,
        user: userId,
        phoneNumber: mobileNumber,
        transactionId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        instructions,
      });

      await order.save();

      // Link order to user
      await User.findByIdAndUpdate(userId, { $push: { orders: order._id } });

      // Send WhatsApp confirmation message
      try {
        const populatedOrder = await Order.findById(order._id).populate('user', 'name email');
        await whatsappService.sendOrderConfirmationMessage(populatedOrder);
        console.log(`WhatsApp confirmation message sent for order ${order._id}`);
      } catch (whatsappError) {
        console.error('WhatsApp confirmation message error:', whatsappError);
        // Don't fail the order if WhatsApp fails
      }

      res.status(200).json({
        success: true,
        message: "Payment verified, order saved",
        order,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Error saving order", error });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Get the current order to check if status is changing to completed
    const currentOrder = await Order.findById(id);
    
    const updatedOrder = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate('user', 'name email');

    // Send WhatsApp message if order status is changed to "completed"
    if (status === "completed" && currentOrder && currentOrder.status !== "completed") {
      try {
        const messageSent = await whatsappService.sendOrderCompletionMessage(updatedOrder);
        if (messageSent) {
          console.log(`WhatsApp message sent for order ${id}`);
        } else {
          console.log(`Failed to send WhatsApp message for order ${id}`);
        }
      } catch (whatsappError) {
        console.error('WhatsApp service error:', whatsappError);
        // Don't fail the order update if WhatsApp fails
      }
    }

    return res.status(200).json({
      status: "success",
      data: updatedOrder,
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

// Test WhatsApp service endpoint
exports.testWhatsApp = async (req, res) => {
  try {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
      return res.status(400).json({
        status: "error",
        message: "Phone number and message are required"
      });
    }

    const result = await whatsappService.sendMessage(phoneNumber, message);
    
    return res.status(200).json({
      status: "success",
      message: result ? "WhatsApp message sent successfully" : "Failed to send WhatsApp message",
      result: result
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};
