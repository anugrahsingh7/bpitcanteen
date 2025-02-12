const Vendor = require("../models/vendorModel");

exports.getVendorInfo = async function (req, res) {
  try {
    const vendor = await Vendor.find();
    return res.status(200).json({ vendor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateVendorInfo = async function (req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    console.log(status);
    console.log(req.body);
    // if (!status) {
    //   return res.status(400).json({ message: "Status is required" });
    // }

    const vendor = await Vendor.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    return res.status(200).json({ vendor });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
