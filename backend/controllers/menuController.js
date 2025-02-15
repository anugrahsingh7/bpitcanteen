const Menu = require("../models/MenuItem");
const ImageKit = require("imagekit");
const fs = require("fs");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});


const getMenuItems = async function (req, res) {
  try {
    const { category } = req.query; // Extract category from query string

    let query = {};
    if (category) {
      query.category = category; // Add category filter if it exists in the query string
    }
    const menuItems = await Menu.find(query);
    return res.status(200).json({
      status: "success",
      data: menuItems,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch menu items",
    });
  }
};

const createMenuItem = async function (req, res) {
  try {

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    const uploadedResponse = await imagekit.upload({
      file: fs.readFileSync(filePath), // Reads the file
      fileName: req.file.originalname,
      folder: "/menu_items", // Optional folder in ImageKit
    });

    fs.unlinkSync(filePath);
    
    const menuItemData = {
      ...req.body,
      image: uploadedResponse.url,
    };

    const menuItem = await Menu.create(menuItemData);
    return res.status(201).json({
      status: "success",
      data: menuItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const updateMenuItem = async function (req, res) {
  try {
    const { id } = req.params;
    const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({
        status: "error",
        message: "Menu item not found",
      });
    }
    return res.status(200).json({
      status: "success",
      data: updatedItem,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).json({
        status: "error",
        message: "Menu item not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Menu item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};


module.exports = {
  getMenuItems,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  
};
