import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item, quantity) => {
    setCartItems(prev => {
      const existingItem = prev.find(i => i.id === item.id);
      if (existingItem) {
        return prev.map(i => 
          i.id === item.id 
            ? {...i, quantity: Math.min(10, i.quantity + quantity)}
            : i
        );
      }
      return [...prev, { ...item, quantity }];
    });
  };

  const updateQuantity = (itemId, quantity) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      addToCart, 
      updateQuantity, 
      cartCount,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 