import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer 
      className="bg-red-600 text-white py-4 cursor-pointer"
      onClick={() => navigate('/cart')}
    >
      <div className='flex items-center justify-center flex-row'>
        <span className="text-lg text-white hover:text-white">
          <i className="fas fa-shopping-cart me-2"></i>Go to Cart
        </span>
      </div>
    </footer>
  );
};

export default Footer;
