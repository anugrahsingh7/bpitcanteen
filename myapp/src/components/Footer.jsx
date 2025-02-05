import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-white">About Us</h3>
            <p className="text-sm text-black">
              BPIT Canteen serves delicious meals to students and faculty. 
              We pride ourselves on quality food and excellent service.
            </p>
          </div>

          {/* Quick Links */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Devlopers</h3>
            <ul className="space-y-2">
              <li>
                <a href="" className="text-black font-bold text-sm transition-colors duration-300">
                  Vaibhav Sinha
                </a>
              </li>
              <li>
                <a href="" className="text-black font-bold  text-sm transition-colors duration-300">
                 Anugrah Singh
                </a>
              </li>
              <li>
                <a href="" className="text-black font-bold  text-sm transition-colors duration-300">
                 Sumit Joshi
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Contact Us</h3>
            <ul className="space-y-2 text-sm text-black">
              <li className="flex items-center">
                <i className="fa-solid fa-location-dot mr-2"></i>
                BPIT, PSP-4, Dr. K.N. Katju Marg, Sector 17, Rohini, Delhi
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-phone mr-2"></i>
                +91 1234567890
              </li>
              <li className="flex items-center">
                <i className="fa-solid fa-envelope mr-2"></i>
                canteen@bpitindia.com
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Opening Hours</h3>
            <ul className="space-y-2 text-sm text-black">
              <li>Monday - Friday: 8:00 AM - 6:00 PM</li>
              <li>Saturday: 9:00 AM - 4:00 PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-white">
              © {new Date().getFullYear()} BPIT Canteen. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="https://facebook.com" className="text-white hover:text-orange-500 transition-colors duration-300">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="https://instagram.com" className="text-white hover:text-orange-500 transition-colors duration-300">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="https://twitter.com" className="text-white hover:text-orange-500 transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
