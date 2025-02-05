const Menu = require("../models/MenuItem");

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
    const menuItem = await Menu.create(req.body);
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

module.exports = {
  getMenuItems,
  createMenuItem,
};
