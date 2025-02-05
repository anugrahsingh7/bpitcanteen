import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import Cookie from "js-cookie";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls profile dropdown
  const { cartItems } = useCart();
  const { setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  // Dummy user data (Replace with actual user data from context or API)
  const user = {
    fullName: "Anugrah Singh",
    email: "anugrah@example.com",
  };

  const handleNavClick = () => {
    setIsOpen(false); // Close mobile menu when a link is clicked
  };

  const toggleProfileMenu = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    Cookie.remove("token");
    toast.success("Successfully logged out");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <NavLink to="/snacks" className="flex items-center space-x-3">
            <span className="text-gray-800 text-md font-bold tracking-tight">
              BPIT CANTEEN <i className="fa-solid fa-utensils ml-2 text-orange-500"></i>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-5">
            <NavLink to="snacks" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Snacks</NavLink>
            <NavLink to="Chinese" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Chinese</NavLink>
            <NavLink to="SouthIndian" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">South Indian</NavLink>
            <NavLink to="IndianItems" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Indian</NavLink>
            <NavLink to="Mess" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Mess</NavLink>
            <NavLink to="Deserts" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Deserts</NavLink>
            <NavLink to="beverages" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Beverages</NavLink>
          </div>

          {/* Profile, Cart, and Menu Buttons */}
          <div className="flex items-center space-x-3 relative">
            {/* Profile Button */}
            <div className="relative flex justify-center items-center">
              <button
                className="text-orange-500 text-[1.65rem] p-[0.3rem] rounded-full hover:bg-opacity-10 hover:bg-black font-bold cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <CgProfile />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 top-7 bg-white shadow-lg rounded-lg p-4 border">
                  <p className="text-gray-800 font-semibold">{user.fullName}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <hr className="my-2" />
                  <Link to="OrderHistory">
                  <button
                    onClick={() => navigate("/order-history")}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md text-sm font-medium"
                  >
                    View Order History
                  </button>
                  </Link>
                  <Link to="ForgetPassword">
                  <button
                    
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-white mt-2 py-2 rounded-md text-sm font-medium"
                  >
                    Change Password
                  </button>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium mt-2"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>

            {/* Cart Button */}
            <Link to="/cart" className="relative p-[0.35rem] rounded-full hover:bg-opacity-10 hover:bg-black">
              <motion.div animate={{ rotate: isOpen ? [0, -10, 10, -10, 10, 0] : 0 }} transition={{ duration: 0.5 }}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <i className={`fa-solid ${isOpen ? "fa-times" : "fa-bars"} text-xl text-gray-600`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-3 mt-4 bg-white shadow-lg rounded-lg p-4 absolute left-0 right-0">
            <NavLink to="snacks" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Snacks</NavLink>
            <NavLink to="Chinese" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Chinese</NavLink>
            <NavLink to="SouthIndian" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">South Indian</NavLink>
            <NavLink to="IndianItems" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Indian</NavLink>
            <NavLink to="Mess" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Mess</NavLink>
            <NavLink to="Deserts" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Deserts</NavLink>
            <NavLink to="beverages" onClick={handleNavClick} className="text-gray-600 hover:text-orange-500 font-medium">Beverages</NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
