import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import Cookie from "js-cookie";
import { useUser } from "../context/userContext";
import toast from "react-hot-toast";
import { CgProfile } from "react-icons/cg";
import { MdRestaurantMenu } from "react-icons/md";
import { FaTimes } from "react-icons/fa";
import { GiCoffeeCup } from "react-icons/gi";
import { GiCakeSlice } from "react-icons/gi";
import { GiNoodles } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { BiSolidBowlRice } from "react-icons/bi";
import { GiBread } from "react-icons/gi";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false); // Controls mobile menu
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls profile dropdown
  const { cartItems } = useCart();
  const { isLoggedIn, setIsLoggedIn } = useUser();
  const navigate = useNavigate();

  // Dummy user data (Replace with actual user data from context or API)
  const { user } = useUser();

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
    <nav className="bg-[#f8f1e7] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-2 py-1">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <NavLink to="/snacks" className="flex items-center space-x-3">
            <span className=" text-md font-bold tracking-tight flex bg-transparent p-1">
              <img
                className="w-[8.2rem] h-12"
                src="/logo/logo-removebg.png"
                alt="logo"
              />
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7 font-hello">
            <NavLink
              to="snacks"
              onClick={handleNavClick}
              
              
              className="text-[#502214]   flex justify-center text-opacity-85 hover:text-opacity-100 items-center hover:scale-105  font-semibold transition-all duration-300 ease-in-out "
            >
              <IoFastFood className="me-[0.1rem] text-2xl" />
              SNACKS
            </NavLink>
            <NavLink
              to="Chinese"
              onClick={handleNavClick}
              className="text-[#502214] flex justify-center text-opacity-85 hover:text-opacity-100  items-center  hover:scale-105 font-bold transition-all duration-300 ease-in-out"
            >
              <GiNoodles className="me-[0.1rem] text-2xl" />
              CHINESE
            </NavLink>
            <NavLink
              to="SouthIndian"
              onClick={handleNavClick}
              className="text-[#502214]  flex justify-center  text-opacity-85 hover:text-opacity-100 items-center hover:scale-105 font-bold transition-all duration-300 ease-in-out"
            >
              <GiBread className="me-[0.1rem] text-2xl" />
              SOUTH INDIAN
            </NavLink>
            <NavLink
              to="IndianItems"
              onClick={handleNavClick}
              className="text-[#502214]  flex justify-center text-opacity-85 hover:text-opacity-100  items-center hover:scale-105 font-bold transition-all duration-300 ease-in-out"
            >
              <BiSolidBowlRice className="me-[0.1rem] text-2xl" />
              INDIAN
            </NavLink>
            <NavLink
              to="Deserts"
              onClick={handleNavClick}
              className="text-[#502214] flex justify-center text-opacity-85 hover:text-opacity-100  items-center  hover:scale-105 font-bold transition-all duration-300 ease-in-out"
            >
              {" "}
              <GiCakeSlice className="me-[0.1rem] text-2xl" /> DESERT
            </NavLink>
            <NavLink
              to="beverages"
              onClick={handleNavClick}
              className="text-[#502214]  flex justify-center text-opacity-85 hover:text-opacity-100  items-center  hover:scale-105 font-bold transition-all duration-300 ease-in-out"
            >
              <GiCoffeeCup className="me-[0.1rem] text-2xl" /> BEVERAGES
            </NavLink>
          </div>

          {/* Profile, Cart, and Menu Buttons */}
          <div className="flex items-center space-x-1 relative">
            {/* Profile Button */}
            <div className="relative flex justify-center items-center">
              <button
                className="text-[#502214] text-[1.95rem] p-[0.3rem] rounded-full hover:bg-opacity-10 hover:bg-black font-bold cursor-pointer"
                onClick={toggleProfileMenu}
              >
                <CgProfile />
              </button>

              {/* Profile Dropdown Menu */}
              {isLoggedIn ? (
                isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-68 top-8 bg-[#ffffff] bg-opacity-95 backdrop-blur-sm shadow-lg rounded-lg p-4 overflow-hidden transition-all duration-300 ease-in-out">
                    <p className="text-[#502214] font-bold text-lg break-words">
                      {user.name}
                    </p>
                    <p className="text-[#502214] font-medium text-opacity-70 text-sm break-words">
                      {user.email}
                    </p>
                    <hr className="my-4 border-[#502214]  border-opacity-30" />
                    <Link to="OrderHistory">
                      <button
                        onClick={() => navigate("/order-history")}
                        className="w-full  border border-[#502214] hover:bg-[#f8f1e7] text-[#502214] py-2 rounded-md text-sm font-semibold"
                      >
                        View Order History
                      </button>
                    </Link>
                    <Link to="ForgetPassword">
                      <button className="w-full  border border-[#502214] hover:bg-[#f8f1e7] text-[#502214] mt-2 py-2 rounded-md text-sm font-semibold">
                        Change Password
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-md text-sm font-bold mt-2"
                    >
                      Log Out
                    </button>
                  </div>
                )
              ) : (
                <Link to="/login">Please login to view</Link>
              )}
            </div>

            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative text-[#502214] p-[0.35rem] rounded-full hover:bg-opacity-10 hover:bg-black"
            >
              <motion.div
                animate={{ rotate: isOpen ? [0, -10, 10, -10, 10, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <svg
                  className="w-[1.80rem] h-[1.80rem]"
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
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#502214] text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-[0.35rem] rounded-full hover:bg-opacity-10 hover:bg-black transition-colors duration-200"
            >
              <i className=" text-[1.85rem] text-[#502214] transition-all duration-300 ease-in-out">
                {" "}
                {isOpen ? <FaTimes /> : <MdRestaurantMenu />}
              </i>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className=" lg:hidden flex flex-col space-y-2 mt-4 m-4 bg-[#ffffff] shadow-lg rounded-lg py-8  ps-7 pe-16  absolute left-0 right-0">
            <NavLink
              to="snacks"
              onClick={handleNavClick}
              className="text-[#502214] text-opacity-85 hover:text-opacity-100  text-xl pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <IoFastFood className="me-[0.1rem] text-2xl" />
              SNACKS
            </NavLink>
            <NavLink
              to="Chinese"
              onClick={handleNavClick}
              className="text-[#502214] text-opacity-85 hover:text-opacity-100 text-xl pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <GiNoodles className="me-[0.1rem] text-2xl" />
              CHINESE
            </NavLink>
            <NavLink
              to="SouthIndian"
              onClick={handleNavClick}
              className="text-[#502214] text-opacity-85 hover:text-opacity-100 text-xl  pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <GiBread className="me-[0.1rem] text-2xl" />
              SOUTH INDIAN
            </NavLink>
            <NavLink
              to="IndianItems"
              onClick={handleNavClick}
              className="text-[#502214]  text-xl text-opacity-85 hover:text-opacity-100 pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <BiSolidBowlRice className="me-[0.1rem] text-2xl" />
              INDIAN
            </NavLink>
            <NavLink
              to="Deserts"
              onClick={handleNavClick}
              className="text-[#502214]  text-xl  text-opacity-85 hover:text-opacity-100 pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <GiCakeSlice className="me-[0.1rem] text-2xl" />
              DESERTS
            </NavLink>
            <NavLink
              to="beverages"
              onClick={handleNavClick}
              className="text-[#502214]  text-xl  text-opacity-85 hover:text-opacity-100 pb-2 border-opacity-15 font-medium border-b border-[#502214] flex items-center"
            >
              <GiCoffeeCup className="me-[0.1rem] text-2xl" /> BEVERAGES
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
