const mongoose = require("mongoose");
const vendorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vendor must have a name"],
    trim: true,
  },
  contact: {
    type: String,
    required: [true, "Vendor must have a contact"],
    trim: true,
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = Vendor;
