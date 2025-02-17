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

  const shortDescription = description.split(' ').slice(0, 4).join(' ') + '...';

  return (
    <div className="flex w-[22.5rem]  md:w-96 h-36 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">

      {/* Image Section */}
      <div className="w-1/3  overflow-y-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      {/* Content Section */}
      <div className="w-2/3 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-bold text-[#502214]">{name}</h2>
          <p className="text-[#502214] text-opacity-75 text-xs mt-1">
            {shortDescription}
            <button onClick={() => setIsModalOpen(true)} className="text-[#502214] hover:text-opacity-75 font-semibold ml-1 focus:outline-none">
              Read more
            </button>
          </p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-[#502214]">₹{price}</span>
          {quantity === 0 ? (
            <button onClick={handleAddToCart} className="border border-[#502214] bg-transparent text-[#502214] hover:bg-[#f8f1e7] font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 text-sm">
              Add
            </button>
          ) : (
            <div className="flex items-center gap-1.5">
              <button onClick={handleRemoveFromCart} className="bg-[#f8f1e7] text-[#502214] border border-[#502214] h-7 w-7 rounded-lg flex items-center justify-center">
                -
              </button>
              <span className="w-6 text-center font-semibold text-[#502214] text-sm">{quantity}</span>
              <button onClick={handleAddToCart} disabled={quantity >= 10} className={`h-7 w-7 rounded-lg flex items-center justify-center ${quantity >= 10 ? 'bg-[#f8f1e7] text-[#502214] border border-[#502214] cursor-not-allowed' : 'bg-[#502214] text-white'}`}>
                +
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="absolute top-1/4 left-8 right-8 backdrop-blur-sm bg-[#f8f1e7] z-10 p-4 rounded-lg shadow-lg">
          <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-[#502214] hover:text-opacity-75">
            ✕
          </button>
          <h2 className="text-md font-bold mb-1 text-[#502214]">{name}</h2>
          <p className="text-[#502214] text-opacity-75 font-medium text-xs max-h-32 overflow-y-auto">{description}</p>
        </div>
      )}
    </div>
  );
};

export default Card;
