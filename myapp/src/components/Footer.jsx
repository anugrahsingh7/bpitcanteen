import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#502214] text-white ">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4 text-[#e9b52a]">About Us</h3>
            <p className="text-sm   text-white text-opacity-75 hover:text-opacity-100">
              BPIT Canteen serves delicious meals to students and faculty. 
              We pride ourselves on quality food and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4 text-[#e9b52a]">Site Developers</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://www.linkedin.com/in/-vaibhav-sinha?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="  text-white text-opacity-75 hover:text-opacity-100 font-bold text-sm transition-colors duration-300">
                  Vaibhav Sinha
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/anugrah-singh-161089266?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="  text-white text-opacity-75 hover:text-opacity-100 font-bold  text-sm transition-colors duration-300">
                 Anugrah Singh
                </a>
              </li>
              <li>
                <a href="" className="  text-white text-opacity-75 hover:text-opacity-100 font-bold  text-sm transition-colors duration-300">
                 Sumit Joshi
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4 text-[#e9b52a]">Contact Us</h3>
            <ul className="space-y-2 text-sm   ">
              <a href="https://maps.app.goo.gl/U1s58U7VAdrjh8xZ6" className="flex items-center text-white text-opacity-75 hover:text-opacity-100">
                <i className="fa-solid fa-location-dot mr-2"></i>
                BPIT, PSP-4, Dr. K.N. Katju Marg, Sector 17, Rohini, Delhi
              </a>
              <li 
              onClick={() => window.location.href = "tel:+910123456789"}
              className="flex items-center text-white text-opacity-75 hover:text-opacity-100 cursor-pointer">
                <i className="fa-solid fa-phone mr-2"></i>
                +91 0123456789
              </li>
              <li
               onClick={() => window.location.href = "mailto:canteen@bpitindia.com"}
               className="flex items-center text-white text-opacity-75 hover:text-opacity-100 cursor-pointer">
                <i className="fa-solid fa-envelope mr-2"></i>
                canteen@bpitindia.com
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-4 text-[#e9b52a]">Opening Hours</h3>
            <ul className="space-y-2 text-sm   text-white text-opacity-75 hover:text-opacity-100">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-[#e9b52a] cursor-not-allowed">
              © {new Date().getFullYear()} BPIT Canteen. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" className="text-white hover:text-[#e9b52a] transition-colors duration-300">
                <i className="fab fa-facebook text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-[#e9b52a] transition-colors duration-300">
                <i className="fab fa-instagram text-2xl"></i>
              </a>
              <a href="https://twitter.com" className="text-white hover:text-[#e9b52a] transition-colors duration-300">
                <i className="fab fa-twitter text-2xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
