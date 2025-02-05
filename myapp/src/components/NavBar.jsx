import React, { useState, useEffect } from "react";
import { NavLink, Link, Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import Cookie from "js-cookie";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cartItems } = useCart();
  const [shake, setShake] = useState(false);
  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = () => {
    scrollToTop();
    setIsOpen(false);
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      const interval = setInterval(() => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [cartItems.length]);

  // console.log(cartItems);

  // Calculate total number of items in cart
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // Add the logic for logout, such as clearing user data (excluding Cookies.remove)
    // You can also clear any other state or context if needed
    Cookie.remove("token");
    toast.success("Successfully logged out");
    navigate("/");
    // setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <NavLink to="/snacks" className="flex items-center space-x-3">
            <span className="text-gray-800 text-md font-bold tracking-tight ms-[-8px]">
              BPIT CANTEEN
              <i className="fa-solid fa-utensils ml-2 text-orange-500"></i>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <NavLink
              to="snacks"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500  transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
              Snacks
            </NavLink>
            <NavLink
              to="Momos"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
              Momos
            </NavLink>
            <NavLink
              to="Chinese"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
              Chinese
            </NavLink>
            <NavLink
              to="SouthIndian"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
              South Indian
            </NavLink>
            <NavLink
              to="IndianItems"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
            Indian Items
            </NavLink>
            <NavLink
              to="Meals"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
            Meals
            </NavLink>
            <NavLink
              to="Deserts"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
            Deserts
            </NavLink>
            <NavLink
              to="MilkShakes"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
            Milk Shakes
            </NavLink>
            <NavLink
              to="beverages"
              onClick={handleNavClick}
              className={({ isActive }) =>
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${
                  isActive ? "text-orange-500" : ""
                }`
              }
            >
              Beverages
            </NavLink>
          </div>

          {/* Cart and Mobile Menu Buttons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-md text-white text-sm font-medium"
            >
              Log Out
            </button>
            <Link to="/cart" className="relative">
              <motion.div
                animate={{
                  rotate: shake ? [0, -10, 10, -10, 10, 0] : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </motion.div>
            </Link>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <i
                className={`fa-solid ${
                  isOpen ? "fa-times" : "fa-bars"
                } text-xl text-gray-600`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <div className="flex flex-col space-y-2 px-4 py-3">
              <NavLink
                to="snacks"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Snacks
              </NavLink>
              <NavLink
                to="Momos"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Momos
              </NavLink>
              <NavLink
                to="Chinese"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Chinese
              </NavLink>
              <NavLink
                to="SouthIndian"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                South Indian
              </NavLink>
              <NavLink
                to="IndianItems"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Indian Items
              </NavLink>
              <NavLink
                to="Meals"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Meals
              </NavLink>
              <NavLink
                to="Deserts"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Deserts
              </NavLink>
              <NavLink
                to="MilkShakes"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Milk Shakes
              </NavLink>
              <NavLink
                to="beverages"
                onClick={handleNavClick}
                className="text-gray-600 hover:text-orange-500 py-2"
              >
                Beverages
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
