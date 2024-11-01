import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  const handleRemoveItem = (index) => {
    const newCartItems = [...cartItems];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="container mx-auto p-4 bg-gray-50">
      <button
        onClick={() => navigate('/snacks')}
        className="mb-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
      >
        Back to Menu
      </button>
      
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-lg">Your cart is empty.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md p-6">
          <ul className="divide-y divide-gray-200">
            {cartItems.map((item, index) => (
              <li key={index} className="py-4 flex justify-between items-center">
                <div>
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <span className="text-gray-600 ml-2">${item.price}</span>
                </div>
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 px-3 py-1.5 rounded-lg transition duration-200"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleClearCart}
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
