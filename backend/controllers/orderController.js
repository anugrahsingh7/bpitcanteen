// routes/orderRoutes.js
const express = require('express');
const Order = require('../models/orderModel');
const User = require('../models/userModel');

// Create an order
exports.createOrder = async (req, res) => {
  const { userId, items } = req.body;

  try {
    const order = new Order({ items, user: userId });
    const savedOrder = await order.save();

    // Update the user with the new order reference
    await User.findByIdAndUpdate(userId, { $push: { orders: savedOrder._id } });

    res.status(201).json({ message: 'Order created successfully', order: savedOrder });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create order', error });
  }
}

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}