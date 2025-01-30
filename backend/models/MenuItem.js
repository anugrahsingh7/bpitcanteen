const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Menu item must have a name"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Menu item must have a price"],
  },
  category: {
    type: String,
    enum: ["Beverage", "Snack", "Lunch", "Dinner"],
    required: [true, "Menu item must have a category"],
  },
  image: {
    type: String, // URL to the item's image
    default: "https://via.placeholder.com/150", // Placeholder image if none is provided
  },
  available: {
    type: Boolean,
    default: true, // Whether the item is currently available
  },
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
