import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <NavLink to="/" className="flex items-center space-x-3">
           
            <span className="text-gray-800 text-md font-bold tracking-tight ms-[-8px]">
              BPIT CANTEEN
              <i className="fa-solid fa-utensils ml-2 text-orange-500"></i>
            </span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="snacks" 
              className={({ isActive }) => 
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${isActive ? 'text-orange-500' : ''}`
              }
            >Snacks</NavLink>
            <NavLink 
              to="breakfast"
              className={({ isActive }) => 
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${isActive ? 'text-orange-500' : ''}`
              }
            >Breakfast</NavLink>
            <NavLink 
              to="lunch"
              className={({ isActive }) => 
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${isActive ? 'text-orange-500' : ''}`
              }
            >Lunch</NavLink>
            <NavLink 
              to="dinner"
              className={({ isActive }) => 
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${isActive ? 'text-orange-500' : ''}`
              }
            >Dinner</NavLink>
            <NavLink 
              to="beverages"
              className={({ isActive }) => 
                `text-gray-600 hover:text-orange-500 transition-colors duration-200 font-medium ${isActive ? 'text-orange-500' : ''}`
              }
            >Beverages</NavLink>
          </div>

          {/* Cart and Mobile Menu Buttons */}
          <div className="flex items-center space-x-4">
            <NavLink to="/cart" className="relative p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
              <i className="fa-solid fa-shopping-cart text-xl text-gray-600 hover:text-orange-500"></i>
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </NavLink>
            
            <button 
              onClick={toggleMenu}
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
            >
              <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'} text-xl text-gray-600`}></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg">
            <div className="flex flex-col space-y-2 px-4 py-3">
              <NavLink to="snacks" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-orange-500 py-2">Snacks</NavLink>
              <NavLink to="breakfast" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-orange-500 py-2">Breakfast</NavLink>
              <NavLink to="lunch" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-orange-500 py-2">Lunch</NavLink>
              <NavLink to="dinner" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-orange-500 py-2">Dinner</NavLink>
              <NavLink to="beverages" onClick={() => setIsOpen(false)} className="text-gray-600 hover:text-orange-500 py-2">Beverages</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
