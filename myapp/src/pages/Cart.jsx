import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Cart() {
  const { cartItems, updateQuantity, clearCart } = useCart();
  const [instructions, setInstructions] = useState({});

  const handleInstructionChange = (itemId, value) => {
    setInstructions(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-gray-600 mb-8">Add some delicious items to your cart!</p>
          <Link 
            to="/snacks" 
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Menu
          </Link>
        </motion.div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <motion.h2 
          className="text-3xl font-bold text-gray-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Your Cart
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            to="/snacks" 
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-semibold transition-colors duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Menu
          </Link>
        </motion.div>
      </div>
      
      <div className="space-y-4">
        {cartItems.map((item, index) => (
          <motion.div 
            key={item.id} 
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-center p-4">
              <motion.img 
                src={item.image} 
                alt={item.name} 
                className="w-24 h-24 object-cover rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              />
              
              <div className="flex-grow ml-6">
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-green-600 font-semibold">₹{item.price}</p>
                
                <div className="mt-2 max-w-[250px]">
                  <motion.div
                    initial={false}
                    animate={{ height: 'auto' }}
                    className="relative"
                  >
                    <input
                      type="text"
                      placeholder="Add cooking instructions"
                      value={instructions[item.id] || ''}
                      onChange={(e) => handleInstructionChange(item.id, e.target.value)}
                      className="w-full text-sm px-3 py-1.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500 transition-colors duration-200 placeholder-gray-400"
                    />
                    {instructions[item.id] && (
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        onClick={() => handleInstructionChange(item.id, '')}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </motion.button>
                    )}
                  </motion.div>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-gray-50 p-2 rounded-lg">
                <motion.button 
                  onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                  className="bg-white text-gray-600 h-8 w-8 rounded-lg flex items-center justify-center shadow-sm hover:shadow transition-shadow duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </motion.button>
                
                <span className="w-8 text-center font-semibold text-gray-800">
                  {item.quantity}
                </span>
                
                <motion.button 
                  onClick={() => updateQuantity(item.id, Math.min(10, item.quantity + 1))}
                  className={`h-8 w-8 rounded-lg flex items-center justify-center shadow-sm hover:shadow transition-shadow duration-200
                    ${item.quantity >= 10 
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'bg-white text-gray-600'
                    }`}
                  whileHover={item.quantity < 10 ? { scale: 1.1 } : {}}
                  whileTap={item.quantity < 10 ? { scale: 0.95 } : {}}
                  disabled={item.quantity >= 10}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </motion.button>
              </div>

              <div className="ml-6 text-right min-w-[100px]">
                <div className="font-bold text-lg text-gray-800">₹{item.price * item.quantity}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div 
        className="mt-8 bg-white p-6 rounded-xl shadow-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: cartItems.length * 0.1 }}
      >
        <div className="flex justify-between items-center text-xl mb-6">
          <span className="font-semibold text-gray-800">Total Amount</span>
          <span className="font-bold text-green-600">₹{total}</span>
        </div>
        <div className="space-y-3">
          <motion.button 
            className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Proceed to Payment
          </motion.button>
          
          <motion.button 
            onClick={clearCart}
            className="w-full bg-white hover:bg-red-50 text-red-500 border border-red-500 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Clear Cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

export default Cart;
