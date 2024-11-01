import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-red-600 text-xl font-semibold flex items-center gap-2 cursor-pointer"><img className='w-10 h-10' src="https://images.shiksha.com/mediadata/images/1652095604phpLTdf0U.jpeg" alt="logo" />CANTEEN
        <i className="fa-solid fa-utensils ms-[-5px]"></i>
        </div>
        <div className="hidden md:flex space-x-4 font-semibold text-md">
        <NavLink to="snacks" className="text-blue-600 hover:text-white">Snacks</NavLink>
          <NavLink to="breakfast" className="text-blue-600 hover:text-white">Breakfast</NavLink>
          <NavLink to="lunch" className="text-blue-600 hover:text-white">Lunch</NavLink>
          <NavLink to="dinner" className="text-blue-600 hover:text-white">Dinner</NavLink>
          
          <NavLink to="beverages" className="text-blue-600 hover:text-white">Beverages</NavLink>
        </div>
        <div className="md:hidden">
          <button 
            onClick={toggleMenu}
            className="text-blue-500 text-2xl hover:text-white focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
        {/* Mobile menu */}
        {isOpen && (
          <div className="absolute top-16 left-0 right-0 bg-yellow-500 md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink to="snacks" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-white px-3 py-2">Snacks</NavLink>
              <NavLink to="breakfast" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-white px-3 py-2">Breakfast</NavLink>
              <NavLink to="lunch" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-white px-3 py-2">Lunch</NavLink>
              <NavLink to="dinner" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-white px-3 py-2">Dinner</NavLink>
              
              <NavLink to="beverages" onClick={() => setIsOpen(false)} className="block text-blue-600 hover:text-white px-3 py-2">Beverages</NavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
