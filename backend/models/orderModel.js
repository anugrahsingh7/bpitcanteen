// models/Order.js
const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [{ name: String, quantity: Number, price: Number }], // Order items
  totalAmount: { type: Number,default:0},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },  // Reference to User
  status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' }
}, { timestamps: true });


OrderSchema.pre('save', function(next) {
    this.totalAmount = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    next();
  });

module.exports = mongoose.model('Order', OrderSchema);
