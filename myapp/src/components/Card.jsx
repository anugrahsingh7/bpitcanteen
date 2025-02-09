import React from 'react';
import { useCart } from '../context/CartContext';


const Card = ({ id, image, name, price, description, bestseller, isVeg }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const { cartItems, addToCart, updateQuantity } = useCart();
  
  const cartItem = cartItems.find(item => item.id === id);
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    if (quantity === 0) {
      addToCart({ id, name, price, image }, 1);
    } else {
      updateQuantity(id, Math.min(10, quantity + 1));
    }
  };

  const handleRemoveFromCart = () => {
    updateQuantity(id, Math.max(0, quantity - 1));
  };

  // Add function to slice description
  const shortDescription = description.split(' ').slice(0, 4).join(' ') + '...';

  return (
    <div className="relative w-80 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      {/* Image Container */}
      <div className="relative h-40 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"/>
        
        {/* Modern Veg/NonVeg Symbol - Top Right */}
        <div className="absolute top-2 right-2">
          {isVeg ? (
            // Veg Icon
            <div className="bg-white rounded-md shadow-md p-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" 
                  stroke="#22C55E" 
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" fill="#22C55E"/>
                <path d="M12 7V12M12 12L15 15M12 12L9 15" 
                  stroke="#22C55E" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          ) : (
            // Non-Veg Icon
            <div className="bg-[#f2eee9] rounded-md shadow-md p-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12Z" 
                  stroke="#EF4444" 
                  strokeWidth="2"
                />
                <circle cx="12" cy="12" r="4" fill="#EF4444"/>
                <path d="M9 9L15 15M15 9L9 15" 
                  stroke="#EF4444" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          )}
        </div>
        
        {/* Bestseller Badge - Top Left */}
        <div className="absolute top-2 left-2">
          {bestseller && (
            <div className="bg-gradient-to-r from-amber-500 to-red-500 text-white px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 shadow-lg">
              <svg 
                className="w-3.5 h-3.5" 
                viewBox="0 0 24 24" 
                fill="currentColor" 
              >
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
              <span className="tracking-wide">Bestseller</span>
            </div>
          )}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4">
        <h2 className="text-lg font-bold text-[#502214] mb-1">{name}</h2>
        <p className="text-[#502214] text-opacity-75 text-xs mb-2">
          {shortDescription}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[#502214] hover:text-opacity-75 font-semibold ml-1 focus:outline-none"
          >
            Read more
          </button>
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-[#502214]">₹{price}</span>
          
          {quantity === 0 ? (
            <button 
              onClick={handleAddToCart}
              className="border border-[#502214] bg-transparent border-opacity-90 text-[#502214] hover:bg-[#f8f1e7] font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 flex items-center gap-1.5 text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button 
                onClick={handleRemoveFromCart}
                className="bg-[#f8f1e7] text-[#502214] border-[#502214] border border-opacity-80 hover:opacity-75 h-7 w-7 rounded-lg flex items-center justify-center transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="w-6 text-center font-semibold text-[#502214] text-sm">
                {quantity}
              </span>
              
              <button 
                onClick={handleAddToCart}
                disabled={quantity >= 10}
                className={`h-7 w-7 rounded-lg flex items-center justify-center transition-colors duration-200 
                  ${quantity >= 10 
                    ? 'bg-[#f8f1e7] text-[#502214] border-[#502214] border border-opacity-10 cursor-not-allowed' 
                    : 'bg-[#502214] bg-opacity-90 hover:bg-opacity-100 text-white'
                  }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute top-1/4 left-8 right-8 backdrop-blur-sm bg-[#f8f1e7] z-10 p-4 rounded-lg shadow-lg">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="absolute top-2 right-2 text-[#502214] hover:text-opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <h2 className="text-lg font-bold mb-2 text-[#502214]">{name}</h2>
          <p className="text-[#502214] text-opacity-75 font-medium text-sm max-h-32 overflow-y-auto">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
